import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>Creative Amour</h3>
          <p>Handcrafted with love. Discover unique earrings and paintings made with passion and creativity.</p>
        </div>

        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul className="footer-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/products">Products</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Customer Service</h3>
          <ul className="footer-links">
            <li><Link to="/orders">Track Order</Link></li>
            <li><Link to="/returns">Returns</Link></li>
            <li><Link to="/shipping">Shipping Info</Link></li>
            <li><Link to="/faq">FAQ</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Contact Us</h3>
          <p>Email: info@creativeamour.com</p>
          <p>Phone: +91 12345 67890</p>
          <p>Address: Mumbai, India</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Creative Amour. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
