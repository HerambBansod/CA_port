import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <div className="footer-container">
        <h1>Let's Work Together and manage money</h1>
        <button className="footer-button">
            <Link to="/contact" className="footer-link">Get In Touch</Link>
        </button>
    </div>
  )
}
