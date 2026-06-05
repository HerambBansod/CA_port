<?php
// Temporary script to test send_smtp_email with inline logo attachment on the server
$smtp_user = "aurex@sourcekode.space";
$smtp_pass = "Qwerty@1q2w3e!!";

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
        } else {
            $email_message .= "<!-- logo file not found at $logoPath -->\r\n";
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

$body = '
<div style="max-width: 600px; margin: 30px auto; border: 1px solid #DDE8F3; border-radius: 8px; box-shadow: 0 4px 20px rgba(8,33,74,0.06); background-color: #FFFFFF;">
    ' . $emailHeader . '
    <div style="padding: 44px 36px; font-family: \'Inter\', \'Helvetica Neue\', Helvetica, Arial, sans-serif; color: #0A1F3F; line-height: 1.6;">
        <h2 style="font-size: 22px; font-weight: 700; color: #08214A; margin-top: 0; margin-bottom: 20px; border-bottom: 2px solid #F3F7FA; padding-bottom: 12px;">Live Server Integration Test</h2>
        <p style="margin-bottom: 18px; font-size: 15px; color: #52657A;">This test email verifies that the PHP script executing on the Hostinger server is successfully connecting via SMTP, constructing a multipart/related message structure, and embedding the logo file as an inline CID attachment.</p>
    </div>
    ' . $emailFooter . '
</div>';

try {
    send_smtp_email("info@aurex.sg", "AUREX Live Server PHP SMTP Verification Test", $body, ["Karanv000@gmail.com", "dev@sourcekode.in"]);
    echo "SUCCESS: Email sent successfully!";
} catch (Exception $e) {
    echo "ERROR: " . $e->getMessage();
}
