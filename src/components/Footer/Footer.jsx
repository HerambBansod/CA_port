 
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { IoIosMail,IoMdCall } from "react-icons/io";
import { PiBuildingOfficeFill } from "react-icons/pi";
import "./Footer.css"; // Import the CSS file

export default function Footer() {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        {/* Branding & CTA */}
        <div className="footer-section-brand">
          <h1>Lets collab and save some money</h1>
          <button className="contact-btn">Contact Us</button>
        </div>

        {/* Quick Links */}
        <div className="footer-section-quick-link">
          <h2>Quick Links</h2>
          <ul>
            <li><a href="#"><MdKeyboardDoubleArrowRight/> Home</a></li>
            <li><a href="#"><MdKeyboardDoubleArrowRight/> About Us</a></li>
            <li><a href="#"><MdKeyboardDoubleArrowRight/> Services</a></li>
            <li><a href="#"><MdKeyboardDoubleArrowRight/> Blog</a></li>
          </ul>
        </div>

        {/* Contact Details */}
        <div className="footer-section-deatils">
          <h2> Contact</h2>
          <p><IoIosMail/> Email: support@example.com</p>
          <p><IoMdCall /> Phone: +123 456 7890</p>
          <p><PiBuildingOfficeFill/> Address: 123 Street, City, Country</p>
        </div>

        {/* Social Media Links */}
        <div className="footer-section social-section">
          <h2>Follow Us</h2>
          <div className="social-icons">
            <a href="#"><FaFacebook /></a>
            <a href="#"><FaTwitter /></a>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaLinkedin /></a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} YourCompany. All rights reserved.</p>
      </div>
    </footer>
  );
}

