import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaTwitter, FaPinterest, FaHeart, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-[#fef8f5] text-[#2d1810] pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
        {/* Brand Section */}
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4">
            Creative Amour
          </h2>
          <p className="text-sm text-[#666] leading-relaxed mb-6">
            Discover unique handcrafted jewelry, paintings, and wall art made with passion and creativity. 
            Every piece tells a story.
          </p>
          <div className="flex gap-4">
            <a 
              href="https://facebook.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="Facebook"
              className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-secondary text-white flex items-center justify-center hover:opacity-80 transition-opacity"
            >
              <FaFacebook />
            </a>
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="Instagram"
              className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-secondary text-white flex items-center justify-center hover:opacity-80 transition-opacity"
            >
              <FaInstagram />
            </a>
            <a 
              href="https://twitter.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="Twitter"
              className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-secondary text-white flex items-center justify-center hover:opacity-80 transition-opacity"
            >
              <FaTwitter />
            </a>
            <a 
              href="https://pinterest.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="Pinterest"
              className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-secondary text-white flex items-center justify-center hover:opacity-80 transition-opacity"
            >
              <FaPinterest />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-secondary mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="text-sm text-[#666] hover:text-secondary transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link to="/products" className="text-sm text-[#666] hover:text-secondary transition-colors">
                Shop All Products
              </Link>
            </li>
            <li>
              <Link to="/about" className="text-sm text-[#666] hover:text-secondary transition-colors">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/contact" className="text-sm text-[#666] hover:text-secondary transition-colors">
                Contact Us
              </Link>
            </li>
            <li>
              <Link to="/wishlist" className="text-sm text-[#666] hover:text-secondary transition-colors">
                My Wishlist
              </Link>
            </li>
          </ul>
        </div>

        {/* Customer Care */}
        <div>
          <h3 className="text-lg font-semibold text-secondary mb-4">Customer Care</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/orders" className="text-sm text-[#666] hover:text-secondary transition-colors">
                Track Your Order
              </Link>
            </li>
            <li>
              <Link to="/profile" className="text-sm text-[#666] hover:text-secondary transition-colors">
                My Account
              </Link>
            </li>
            <li>
              <Link to="/cart" className="text-sm text-[#666] hover:text-secondary transition-colors">
                Shopping Cart
              </Link>
            </li>
            <li>
              <a href="#shipping" className="text-sm text-[#666] hover:text-secondary transition-colors">
                Shipping Policy
              </a>
            </li>
            <li>
              <a href="#returns" className="text-sm text-[#666] hover:text-secondary transition-colors">
                Returns & Refunds
              </a>
            </li>
          </ul>
        </div>

        {/* Get In Touch */}
        <div>
          <h3 className="text-lg font-semibold text-secondary mb-4">Get In Touch</h3>
          <ul className="space-y-3">
            <li className="flex gap-3">
              <FaEnvelope className="text-secondary mt-1 flex-shrink-0" />
              <div>
                <strong className="block text-sm text-[#2d1810]">Email</strong>
                <a href="mailto:info@creativeamour.com" className="text-sm text-[#666] hover:text-secondary transition-colors">
                  info@creativeamour.com
                </a>
              </div>
            </li>
            <li className="flex gap-3">
              <FaPhone className="text-secondary mt-1 flex-shrink-0" />
              <div>
                <strong className="block text-sm text-[#2d1810]">Phone</strong>
                <a href="tel:+919876543210" className="text-sm text-[#666] hover:text-secondary transition-colors">
                  +91 98765 43210
                </a>
              </div>
            </li>
            <li className="flex gap-3">
              <FaMapMarkerAlt className="text-secondary mt-1 flex-shrink-0" />
              <div>
                <strong className="block text-sm text-[#2d1810]">Online Store</strong>
                <span className="text-sm text-[#666]">Delivering across India</span>
              </div>
            </li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-[#e0d5cf] pt-8">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <p className="text-sm text-[#666]">
            &copy; {new Date().getFullYear()} Creative Amour. All rights reserved.
          </p>
          <div className="flex items-center gap-3 text-sm text-[#666]">
            <a href="#privacy" className="hover:text-secondary transition-colors">
              Privacy Policy
            </a>
            <span>•</span>
            <a href="#terms" className="hover:text-secondary transition-colors">
              Terms of Service
            </a>
            <span>•</span>
            <a href="#cookies" className="hover:text-secondary transition-colors">
              Cookie Policy
            </a>
          </div>
          <p className="text-sm text-[#666] flex items-center gap-1">
            Made with <FaHeart className="text-red-500 inline" /> for art lovers
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
