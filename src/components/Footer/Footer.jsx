import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import "./Footer.css"; // Import the CSS file

export default function Footer() {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        {/* Branding & CTA */}
        <div className="footer-section">
          <h1>Let's collab and save some money</h1>
          <button className="contact-btn">Contact Us</button>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h2>Quick Links</h2>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Services</a></li>
            <li><a href="#">Blog</a></li>
          </ul>
        </div>

        {/* Contact Details */}
        <div className="footer-section">
          <h2>Contact</h2>
          <p>Email: support@example.com</p>
          <p>Phone: +123 456 7890</p>
          <p>Address: 123 Street, City, Country</p>
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

