import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaHeart, FaUser, FaBars, FaTimes, FaSearch } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import './Navbar.css';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const { cartItemsCount } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
    setMobileMenuOpen(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
      setMobileMenuOpen(false);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          Creative Amour
        </Link>

        {/* Search Bar - Desktop */}
        <div className="navbar-search-desktop">
          <form onSubmit={handleSearch} className="search-form">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            <button type="submit" className="search-button">
              <FaSearch />
            </button>
          </form>
        </div>

        <div className="mobile-menu-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <FaTimes /> : <FaBars />}
        </div>

        <ul className={`navbar-menu ${mobileMenuOpen ? 'active' : ''}`}>
          {/* Search Bar - Mobile */}
          <li className="mobile-search">
            <form onSubmit={handleSearch} className="search-form">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
              <button type="submit" className="search-button">
                <FaSearch />
              </button>
            </form>
          </li>
          
          <li>
            <NavLink to="/" className="navbar-link" onClick={() => setMobileMenuOpen(false)}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/products" className="navbar-link" onClick={() => setMobileMenuOpen(false)}>
              Products
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" className="navbar-link" onClick={() => setMobileMenuOpen(false)}>
              About Us
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact" className="navbar-link" onClick={() => setMobileMenuOpen(false)}>
              Contact
            </NavLink>
          </li>
          {isAdmin && (
            <li>
              <NavLink to="/admin" className="navbar-link" onClick={() => setMobileMenuOpen(false)}>
                Admin
              </NavLink>
            </li>
          )}
          
          {/* Mobile User Menu Items */}
          {isAuthenticated && (
            <>
              <li className="mobile-only">
                <NavLink to="/wishlist" className="navbar-link" onClick={() => setMobileMenuOpen(false)}>
                  <FaHeart /> Wishlist
                </NavLink>
              </li>
              <li className="mobile-only">
                <NavLink to="/cart" className="navbar-link" onClick={() => setMobileMenuOpen(false)}>
                  <FaShoppingCart /> Cart {cartItemsCount > 0 && `(${cartItemsCount})`}
                </NavLink>
              </li>
              <li className="mobile-only">
                <NavLink to="/profile" className="navbar-link" onClick={() => setMobileMenuOpen(false)}>
                  <FaUser /> Profile
                </NavLink>
              </li>
              <li className="mobile-only">
                <NavLink to="/orders" className="navbar-link" onClick={() => setMobileMenuOpen(false)}>
                  My Orders
                </NavLink>
              </li>
              <li className="mobile-only">
                <button onClick={handleLogout} className="navbar-link logout-btn">
                  Logout
                </button>
              </li>
            </>
          )}
          
          {!isAuthenticated && (
            <>
              <li className="mobile-only">
                <NavLink to="/register" className="navbar-link" onClick={() => setMobileMenuOpen(false)}>
                  Sign Up
                </NavLink>
              </li>
              <li className="mobile-only mobile-login-btn">
                <NavLink 
                  to="/login" 
                  className="navbar-link" 
                  onClick={() => setMobileMenuOpen(false)}
                  style={{
                    backgroundColor: 'var(--secondary-color)',
                    color: 'white',
                    padding: '12px 20px',
                    borderRadius: '8px',
                    textAlign: 'center',
                    fontWeight: '600',
                    margin: '10px 0'
                  }}
                >
                  Login
                </NavLink>
              </li>
            </>
          )}
        </ul>

        <div className="navbar-icons">
          {isAuthenticated && (
            <>
              <Link to="/wishlist" className="navbar-icon">
                <FaHeart />
              </Link>
              <Link to="/cart" className="navbar-icon">
                <FaShoppingCart />
                {cartItemsCount > 0 && <span className="cart-badge">{cartItemsCount}</span>}
              </Link>
            </>
          )}

          {isAuthenticated ? (
            <div 
              className="navbar-user" 
              onClick={() => setUserDropdownOpen(!userDropdownOpen)}
              style={{ position: 'relative' }}
            >
              <FaUser />
              <span>{user?.name}</span>
              {userDropdownOpen && (
                <div className="user-dropdown">
                  <Link to="/profile" onClick={() => setUserDropdownOpen(false)}>Profile</Link>
                  <Link to="/orders" onClick={() => setUserDropdownOpen(false)}>My Orders</Link>
                  <button onClick={handleLogout}>Logout</button>
                </div>
              )}
            </div>
          ) : (
            <div className="mobile-only">
              <Link to="/login" className="btn btn-primary" style={{ padding: '8px 16px' }}>
                Login
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
