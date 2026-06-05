<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    echo json_encode(["success" => false, "message" => "Method not allowed"]);
    exit;
}

// Read raw JSON input
$inputData = json_decode(file_get_contents("php://input"), true);

if (!$inputData) {
    echo json_encode(["success" => false, "message" => "Invalid input data"]);
    exit;
}

// Honeypot anti-spam verification
// Spambots usually autofill every visible and hidden field.
// If the website field is filled, we silently discard the submission.
$honeypot = isset($inputData["website"]) ? trim($inputData["website"]) : "";
if (!empty($honeypot)) {
    // Return a dummy success to trick the spambot into thinking it succeeded
    echo json_encode(["success" => true, "message" => "Enquiry processed successfully."]);
    exit;
}

// reCAPTCHA v3 verification
$recaptcha_secret = "6LfO_QgtAAAAAMe-p1BNSxTod0Uxd6FHUfe0uATs";
$recaptcha_token = isset($inputData["recaptcha_token"]) ? trim($inputData["recaptcha_token"]) : "";

if (empty($recaptcha_token)) {
    echo json_encode(["success" => false, "message" => "Security verification failed. Missing token."]);
    exit;
}

$verify_url = "https://www.google.com/recaptcha/api/siteverify";
$verify_data = [
    'secret' => $recaptcha_secret,
    'response' => $recaptcha_token
];

$options = [
    'http' => [
        'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
        'method'  => 'POST',
        'content' => http_build_query($verify_data)
    ]
];
$context  = stream_context_create($options);
$response = file_get_contents($verify_url, false, $context);

if ($response === false) {
    echo json_encode(["success" => false, "message" => "Security service unavailable. Please try again."]);
    exit;
}

$responseKeys = json_decode($response, true);
if (empty($responseKeys["success"]) || (isset($responseKeys["score"]) && $responseKeys["score"] < 0.5)) {
    echo json_encode(["success" => false, "message" => "Security verification failed. You appear to be a bot."]);
    exit;
}

$formType = isset($inputData["type"]) ? $inputData["type"] : "detailed";

// Extract and sanitize fields
$clientEmail = isset($inputData["email"]) ? filter_var(trim($inputData["email"]), FILTER_SANITIZE_EMAIL) : "";
$clientName = isset($inputData["name"]) ? htmlspecialchars(trim($inputData["name"])) : "Valued Client";
$company = isset($inputData["company"]) ? htmlspecialchars(trim($inputData["company"])) : "";
$role = isset($inputData["role"]) ? htmlspecialchars(trim($inputData["role"])) : "";
$sector = isset($inputData["sector"]) ? htmlspecialchars(trim($inputData["sector"])) : "";
$messageContent = isset($inputData["message"]) ? htmlspecialchars(trim($inputData["message"])) : "";

if (empty($clientEmail) || !filter_var($clientEmail, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(["success" => false, "message" => "A valid work email is required."]);
    exit;
}

if ($formType === "detailed") {
    if (empty($clientName) || empty($company) || empty($sector) || empty($messageContent)) {
        echo json_encode(["success" => false, "message" => "All required fields must be completed."]);
        exit;
    }
}

// Target email destinations
$smtp_user = "aurex@sourcekode.space";
$smtp_pass = "Qwerty@1q2w3e!!";
$teamEmail = "info@aurex.sg";
$bccList = ["Karanv000@gmail.com", "dev@sourcekode.in"];

// SMTP socket mailer function
function send_smtp_email($to, $subject, $body, $bcc = []) {
    global $smtp_user, $smtp_pass;
    
    $smtp_host = "ssl://smtp.hostinger.com";
    $smtp_port = 465;
    
    $socket = @fsockopen($smtp_host, $smtp_port, $errno, $errstr, 15);
    if (!$socket) {
        throw new Exception("Could not connect to SMTP server: $errstr ($errno)");
    }
    
    $read_response = function($socket, $expected) {
        $response = "";
        while ($line = fgets($socket, 515)) {
            $response .= $line;
            if (substr($line, 3, 1) == " ") {
                break;
            }
        }
        if (intval(substr($response, 0, 3)) != $expected) {
            throw new Exception("SMTP error: Expected $expected, got: $response");
        }
        return $response;
    };
    
    try {
        $read_response($socket, 220);
        
        fwrite($socket, "EHLO " . (isset($_SERVER['SERVER_NAME']) ? $_SERVER['SERVER_NAME'] : 'localhost') . "\r\n");
        $read_response($socket, 250);
        
        fwrite($socket, "AUTH LOGIN\r\n");
        $read_response($socket, 334);
        
        fwrite($socket, base64_encode($smtp_user) . "\r\n");
        $read_response($socket, 334);
        
        fwrite($socket, base64_encode($smtp_pass) . "\r\n");
        $read_response($socket, 235);
        
        fwrite($socket, "MAIL FROM: <$smtp_user>\r\n");
        $read_response($socket, 250);
        
        // Register all recipients in the envelope
        fwrite($socket, "RCPT TO: <$to>\r\n");
        $read_response($socket, 250);
        
        foreach ($bcc as $bcc_email) {
            fwrite($socket, "RCPT TO: <$bcc_email>\r\n");
            $read_response($socket, 250);
        }
        
        fwrite($socket, "DATA\r\n");
        $read_response($socket, 354);
        
        // Generate security-compliant headers to prevent spam classification
        $domain = "sourcekode.space";
        $msgId = "<" . uniqid('aurex_', true) . "@" . $domain . ">";
        
        $boundary = "boundary_" . uniqid('aurex_', true);
        
        $headers = [
            "MIME-Version: 1.0",
            "Content-Type: multipart/related; boundary=\"$boundary\"",
            "From: AUREX | Environmental Intelligence <" . $smtp_user . ">",
            "To: " . $to,
            "Subject: =?UTF-8?B?" . base64_encode($subject) . "?=",
            "Date: " . date("r"),
            "Message-ID: " . $msgId,
            "X-Mailer: PHP/" . phpversion(),
            "X-Priority: 3", // Normal Priority
            "Precedence: bulk", // Informs inbox this is a transactional notification
        ];
        
        // Build multipart body
        $email_message = "";
        
        // Text/HTML Part
        $email_message .= "--" . $boundary . "\r\n";
        $email_message .= "Content-Type: text/html; charset=UTF-8\r\n";
        $email_message .= "Content-Transfer-Encoding: 8bit\r\n\r\n";
        $email_message .= $body . "\r\n\r\n";
        
        // Inline Image Part (logo.png)
        $logoPath = __DIR__ . '/logo.png';
        if (file_exists($logoPath)) {
            $logoContent = file_get_contents($logoPath);
            $logoBase64 = base64_encode($logoContent);
            $logoChunked = chunk_split($logoBase64);
            
            $email_message .= "--" . $boundary . "\r\n";
            $email_message .= "Content-Type: image/png; name=\"logo.png\"\r\n";
            $email_message .= "Content-Transfer-Encoding: base64\r\n";
            $email_message .= "Content-ID: <aurex-logo>\r\n";
            $email_message .= "Content-Disposition: inline; filename=\"logo.png\"\r\n\r\n";
            $email_message .= $logoChunked . "\r\n";
        }
        
        $email_message .= "--" . $boundary . "--\r\n";
        
        $message = implode("\r\n", $headers) . "\r\n\r\n" . $email_message . "\r\n.\r\n";
        fwrite($socket, $message);
        $read_response($socket, 250);
        
        fwrite($socket, "QUIT\r\n");
        fclose($socket);
        return true;
    } catch (Exception $e) {
        fclose($socket);
        throw $e;
    }
}

// -------------------------------------------------------------
// HTML Email Templates (Premium Oceanic Minimal Styling)
// -------------------------------------------------------------

// Beautiful Navy Header with centered Logo Image from CDN/Host
$emailHeader = '
<div style="background-color: #08214A; padding: 36px 24px; text-align: center; border-top-left-radius: 8px; border-top-right-radius: 8px; border-bottom: 4px solid #0E63C7;">
    <table align="center" border="0" cellpadding="0" cellspacing="0" style="margin: 0 auto; width: 100%;">
        <tr>
            <td align="center" style="padding-bottom: 12px;">
                <a href="https://aurex.sourcekode.space" target="_blank" style="text-decoration: none;">
                    <img src="cid:aurex-logo" alt="AUREX Logo" height="38" style="display: block; outline: none; border: none; height: 38px; max-height: 38px;" />
                </a>
            </td>
        </tr>
        <tr>
            <td align="center" style="color: #24B7C9; font-family: \'Inter\', \'Helvetica Neue\', Helvetica, Arial, sans-serif; font-size: 11px; font-weight: 600; letter-spacing: 2px; text-transform: uppercase; padding-top: 4px;">
                Weather Technology & Environmental Intelligence
            </td>
        </tr>
    </table>
</div>';

// Premium Footer with clean lines, icons, and company information
$emailFooter = '
<div style="background-color: #061833; padding: 40px 24px; text-align: center; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px; font-family: \'Inter\', \'Helvetica Neue\', Helvetica, Arial, sans-serif; font-size: 12px; color: #8C9EB3; border-top: 1px solid rgba(255, 255, 255, 0.08);">
    <table align="center" border="0" cellpadding="0" cellspacing="0" style="margin: 0 auto; width: 100%; max-width: 500px;">
        <tr>
            <td align="center" style="padding-bottom: 14px;">
                <span style="font-weight: 700; color: #FFFFFF; font-size: 14px; letter-spacing: 0.5px;">AUREX GLOBAL LLP</span>
            </td>
        </tr>
        <tr>
            <td align="center" style="padding-bottom: 24px; font-size: 13px; line-height: 1.6; color: #8C9EB3;">
                60 Paya Lebar Road #06-28 • Paya Lebar Square • Singapore 409051<br>
                Direct: <a href="tel:+6569003948" style="color: #24B7C9; text-decoration: none; font-weight: 500;">+65 6900 3948</a> • Email: <a href="mailto:info@aurex.sg" style="color: #24B7C9; text-decoration: none; font-weight: 500;">info@aurex.sg</a>
            </td>
        </tr>
        <tr>
            <td align="center" style="border-top: 1px solid rgba(255, 255, 255, 0.08); padding-top: 20px; font-size: 11px; color: #52657A; line-height: 1.5;">
                This email is a confidential transaction notification. &copy; ' . date("Y") . ' AUREX. All rights reserved.<br>
                To learn more about our solutions, visit <a href="https://aurex.sourcekode.space" target="_blank" style="color: #24B7C9; text-decoration: none;">www.aurex.sg</a>.
            </td>
        </tr>
    </table>
</div>';

// 1. Client receipt confirmation email template
$clientSubject = "AUREX B2B Project Inquiry Received - Ref: " . strtoupper(uniqid());

if ($formType === "quick") {
    $clientBody = '
    <div style="max-width: 600px; margin: 30px auto; border: 1px solid #DDE8F3; border-radius: 8px; box-shadow: 0 4px 20px rgba(8,33,74,0.06); background-color: #FFFFFF;">
        ' . $emailHeader . '
        <div style="padding: 44px 36px; font-family: \'Inter\', \'Helvetica Neue\', Helvetica, Arial, sans-serif; color: #0A1F3F; line-height: 1.6;">
            <h2 style="font-size: 22px; font-weight: 700; color: #08214A; margin-top: 0; margin-bottom: 20px; border-bottom: 2px solid #F3F7FA; padding-bottom: 12px;">Thank You for Reaching Out</h2>
            <p style="margin-bottom: 18px; font-size: 15px; color: #52657A;">We have successfully received your request to discuss a project with our team. A meteorological intelligence specialist from our Singapore head office will contact you within 24 hours to schedule a consultation.</p>
            <p style="margin-bottom: 28px; font-size: 15px; color: #52657A;">During the call, we will review your sensor parameters, regional operating conditions, telemetry integration requirements, and target timeline to outline a resilient project strategy.</p>
            
            <div style="margin: 36px 0; padding: 22px 24px; background-color: #F5FAFF; border-left: 4px solid #0E63C7; border-radius: 0 8px 8px 0; border-top: 1px solid #DDE8F3; border-right: 1px solid #DDE8F3; border-bottom: 1px solid #DDE8F3;">
                <span style="font-size: 11px; font-weight: 700; color: #0E63C7; display: block; margin-bottom: 6px; letter-spacing: 1px; text-transform: uppercase;">REQUESTED BY</span>
                <span style="font-size: 16px; font-weight: 700; color: #08214A;">' . $clientEmail . '</span>
            </div>
            
            <p style="margin-bottom: 0; font-size: 14px; color: #52657A;">If you have any engineering specifications, maps, or data requirements to share in the meantime, feel free to reply directly to this message.</p>
        </div>
        ' . $emailFooter . '
    </div>';
} else {
    // Dynamic Sector Greeting / Details
    $sectorTitles = [
        "government" => "Government / Public Agency Sector",
        "infrastructure" => "Infrastructure & Utilities Sector",
        "aviation" => "Aviation & Meteorological Operations",
        "renewable" => "Renewing Energy Sector",
        "enterprise" => "Enterprise / Industrial Operations",
        "other" => "General Industrial Operations"
    ];
    $displaySector = isset($sectorTitles[$sector]) ? $sectorTitles[$sector] : "General Operations";

    $clientBody = '
    <div style="max-width: 600px; margin: 30px auto; border: 1px solid #DDE8F3; border-radius: 8px; box-shadow: 0 4px 20px rgba(8,33,74,0.06); background-color: #FFFFFF;">
        ' . $emailHeader . '
        <div style="padding: 44px 36px; font-family: \'Inter\', \'Helvetica Neue\', Helvetica, Arial, sans-serif; color: #0A1F3F; line-height: 1.6;">
            <h2 style="font-size: 22px; font-weight: 700; color: #08214A; margin-top: 0; margin-bottom: 20px; border-bottom: 2px solid #F3F7FA; padding-bottom: 12px;">Project Inquiry Received</h2>
            <p style="margin-bottom: 18px; font-size: 15px; color: #52657A;">Dear ' . $clientName . ',</p>
            <p style="margin-bottom: 20px; font-size: 15px; color: #52657A;">Thank you for contacting AUREX. Your B2B project inquiry has been logged successfully. An environmental intelligence specialist from our Singapore engineering office is reviewing your requirements.</p>
            
            <div style="background-color: #F5FAFF; border: 1px solid #DDE8F3; border-left: 4px solid #0E63C7; border-radius: 8px; padding: 24px; margin: 32px 0;">
                <h3 style="font-size: 12px; font-weight: 700; color: #08214A; margin-top: 0; margin-bottom: 16px; border-bottom: 1px solid #DDE8F3; padding-bottom: 10px; text-transform: uppercase; letter-spacing: 1px;">Log Details</h3>
                <table cellpadding="0" cellspacing="0" width="100%" style="font-size: 14px; line-height: 1.5;">
                    <tr>
                        <td style="padding: 10px 0; color: #52657A; width: 35%; font-weight: 600;">Company:</td>
                        <td style="padding: 10px 0; color: #08214A; font-weight: 700;">' . $company . '</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px 0; color: #52657A; font-weight: 600;">Job Title:</td>
                        <td style="padding: 10px 0; color: #0A1F3F;">' . ($role ? $role : 'N/A') . '</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px 0; color: #52657A; font-weight: 600;">Primary Sector:</td>
                        <td style="padding: 10px 0; color: #0E63C7; font-weight: 700;">' . $displaySector . '</td>
                    </tr>
                    <tr>
                        <td valign="top" style="padding: 14px 0 0 0; color: #52657A; font-weight: 600;">Message details:</td>
                        <td style="padding: 14px 0 0 0; color: #0A1F3F; font-family: inherit; font-size: 14px; line-height: 1.6; border-top: 1px dashed #DDE8F3;">
                            <div style="margin-top: 8px; background-color: #FFFFFF; padding: 16px 20px; border-radius: 6px; border: 1px solid #DDE8F3; font-size: 14px; color: #0A1F3F; line-height: 1.6;">
                                ' . nl2br($messageContent) . '
                            </div>
                        </td>
                    </tr>
                </table>
            </div>
            
            <p style="margin-bottom: 24px; font-size: 15px; color: #52657A;"><strong>Next Steps:</strong> We will review your sensor configurations and parameters. You can expect a response from our engineering team within 24 hours to schedule a detailed Zoom or Microsoft Teams project review.</p>
            
            <p style="margin-bottom: 0; font-size: 15px; color: #0A1F3F;">Best regards,<br><span style="color: #08214A; font-weight: 700;">The AUREX Team</span></p>
        </div>
        ' . $emailFooter . '
    </div>';
}

// 2. AUREX Internal team email template
$teamSubject = "Website Inquiry: " . ($formType === "quick" ? "Quick Email" : $clientName) . " (" . ($formType === "quick" ? $clientEmail : $company) . ")";

if ($formType === "quick") {
    $teamBody = '
    <div style="max-width: 600px; margin: 30px auto; border: 1px solid #DDE8F3; border-radius: 8px; background-color: #FFFFFF; font-family: \'Inter\', \'Helvetica Neue\', Helvetica, Arial, sans-serif; box-shadow: 0 4px 20px rgba(8,33,74,0.06);">
        <div style="background-color: #0E63C7; padding: 28px; text-align: center; border-top-left-radius: 8px; border-top-right-radius: 8px; color: #FFFFFF; border-bottom: 4px solid #08214A;">
            <h2 style="margin: 0; font-size: 18px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase;">NEW QUICK INQUIRY</h2>
        </div>
        <div style="padding: 36px; color: #0A1F3F; line-height: 1.6;">
            <p style="margin-top: 0; font-size: 15px; margin-bottom: 24px; color: #52657A;">A user has requested a project discussion from the homepage email box widget on the website.</p>
            <table cellpadding="0" cellspacing="0" width="100%" style="font-size: 14px; border: 1px solid #DDE8F3; border-radius: 6px; background-color: #F5FAFF;">
                <tr>
                    <td style="padding: 18px; font-weight: 600; color: #52657A; width: 30%;">Work Email:</td>
                    <td style="padding: 18px; color: #08214A; font-weight: 700; font-size: 15px;"><a href="mailto:' . $clientEmail . '" style="color: #0E63C7; text-decoration: none;">' . $clientEmail . '</a></td>
                </tr>
            </table>
            <p style="margin-top: 28px; font-size: 13px; color: #8C9EB3; text-align: center; border-top: 1px dashed #DDE8F3; padding-top: 20px;">Please follow up with the prospect within the standard 24-hour SLA window.</p>
        </div>
    </div>';
} else {
    $teamBody = '
    <div style="max-width: 600px; margin: 30px auto; border: 1px solid #DDE8F3; border-radius: 8px; background-color: #FFFFFF; font-family: \'Inter\', \'Helvetica Neue\', Helvetica, Arial, sans-serif; box-shadow: 0 4px 20px rgba(8,33,74,0.06);">
        <div style="background-color: #08214A; padding: 28px; text-align: center; border-top-left-radius: 8px; border-top-right-radius: 8px; color: #FFFFFF; border-bottom: 4px solid #0E63C7;">
            <h2 style="margin: 0; font-size: 18px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase;">NEW B2B PROJECT ENQUIRY</h2>
        </div>
        <div style="padding: 36px; color: #0A1F3F; line-height: 1.6;">
            <p style="margin-top: 0; font-size: 15px; margin-bottom: 24px; color: #52657A;">A client has submitted a detailed project inquiry through the main contact form.</p>
            
            <h3 style="font-size: 12px; font-weight: 700; color: #08214A; margin-top: 0; margin-bottom: 14px; border-bottom: 2px solid #F3F7FA; padding-bottom: 8px; text-transform: uppercase; letter-spacing: 0.8px;">SUBMISSION DETAILS</h3>
            <table cellpadding="0" cellspacing="0" width="100%" style="font-size: 14px; margin-bottom: 24px; border-collapse: collapse;">
                <tr style="border-bottom: 1px solid #E8EEF5;">
                    <td style="padding: 10px 0; color: #52657A; width: 35%; font-weight: 600;">Client Name:</td>
                    <td style="padding: 10px 0; color: #08214A; font-weight: 700;">' . $clientName . '</td>
                </tr>
                <tr style="border-bottom: 1px solid #E8EEF5;">
                    <td style="padding: 10px 0; color: #52657A; font-weight: 600;">Work Email:</td>
                    <td style="padding: 10px 0; color: #0E63C7; font-weight: 700;"><a href="mailto:' . $clientEmail . '" style="color: #0E63C7; text-decoration: none;">' . $clientEmail . '</a></td>
                </tr>
                <tr style="border-bottom: 1px solid #E8EEF5;">
                    <td style="padding: 10px 0; color: #52657A; font-weight: 600;">Company:</td>
                    <td style="padding: 10px 0; color: #08214A; font-weight: 700;">' . $company . '</td>
                </tr>
                <tr style="border-bottom: 1px solid #E8EEF5;">
                    <td style="padding: 10px 0; color: #52657A; font-weight: 600;">Job Title:</td>
                    <td style="padding: 10px 0; color: #0A1F3F;">' . ($role ? $role : 'N/A') . '</td>
                </tr>
                <tr style="border-bottom: 1px solid #E8EEF5;">
                    <td style="padding: 10px 0; color: #52657A; font-weight: 600;">Primary Sector:</td>
                    <td style="padding: 10px 0; color: #0A1F3F; text-transform: capitalize;">' . $sector . '</td>
                </tr>
                <tr>
                    <td valign="top" style="padding: 14px 0 0 0; color: #52657A; font-weight: 600;">Message details:</td>
                    <td style="padding: 14px 0 0 0; color: #0A1F3F; line-height: 1.6; font-family: inherit;">
                        <div style="background-color: #F5FAFF; padding: 16px 20px; border-radius: 6px; border: 1px solid #DDE8F3; font-size: 14px; color: #0A1F3F;">
                            ' . nl2br($messageContent) . '
                        </div>
                    </td>
                </tr>
            </table>
            
            <p style="font-size: 13px; color: #8C9EB3; text-align: center; margin-top: 32px; border-top: 1px dashed #DDE8F3; padding-top: 20px;">You can respond directly to the prospect by hitting reply to this inquiry email.</p>
        </div>
    </div>';
}

try {
    // 1. Send receipt confirmation to the client (using clientEmail as "To")
    send_smtp_email($clientEmail, $clientSubject, $clientBody);

    // 2. Send detailed notification to AUREX Team (using info@aurex.sg as "To")
    // Include Karanv000@gmail.com and dev@sourcekode.in in BCC
    send_smtp_email($teamEmail, $teamSubject, $teamBody, $bccList);

    echo json_encode(["success" => true, "message" => "Enquiry processed successfully."]);
} catch (Exception $e) {
    echo json_encode(["success" => false, "message" => "Deployment mail service error: " . $e->getMessage()]);
}
