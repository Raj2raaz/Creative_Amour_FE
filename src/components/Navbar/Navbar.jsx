import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaHeart, FaUser, FaBars, FaTimes, FaSearch } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [placeholder, setPlaceholder] = useState('');
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const { cartItemsCount } = useCart();
  const navigate = useNavigate();

  const placeholders = [
    'Search for earrings...',
    'Find acrylic paintings...',
    'Discover keyrings...',
    'Browse stickers & badges...',
    'Search products...'
  ];

  useEffect(() => {
    let currentIndex = 0;
    let currentText = '';
    let isDeleting = false;
    let timeout;

    const typeEffect = () => {
      const fullText = placeholders[placeholderIndex];
      
      if (!isDeleting) {
        currentText = fullText.substring(0, currentText.length + 1);
        setPlaceholder(currentText);
        
        if (currentText === fullText) {
          timeout = setTimeout(() => {
            isDeleting = true;
            typeEffect();
          }, 2000); // Wait 2s before deleting
          return;
        }
        timeout = setTimeout(typeEffect, 100); // Typing speed
      } else {
        currentText = fullText.substring(0, currentText.length - 1);
        setPlaceholder(currentText);
        
        if (currentText === '') {
          isDeleting = false;
          setPlaceholderIndex((prev) => (prev + 1) % placeholders.length);
          timeout = setTimeout(typeEffect, 500); // Wait 0.5s before next
          return;
        }
        timeout = setTimeout(typeEffect, 50); // Deleting speed (faster)
      }
    };

    typeEffect();

    return () => clearTimeout(timeout);
  }, [placeholderIndex]);

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
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent hover:opacity-80 transition-opacity">
          Creative Amour
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-1">
          <NavLink 
            to="/" 
            className={({isActive}) => `px-4 py-2 rounded-lg transition-colors ${isActive ? 'bg-primary/10 text-secondary font-semibold' : 'text-gray-700 hover:bg-gray-100'}`}
          >
            Home
          </NavLink>
          <NavLink 
            to="/products" 
            className={({isActive}) => `px-4 py-2 rounded-lg transition-colors ${isActive ? 'bg-primary/10 text-secondary font-semibold' : 'text-gray-700 hover:bg-gray-100'}`}
          >
            Products
          </NavLink>
          <NavLink 
            to="/about" 
            className={({isActive}) => `px-4 py-2 rounded-lg transition-colors ${isActive ? 'bg-primary/10 text-secondary font-semibold' : 'text-gray-700 hover:bg-gray-100'}`}
          >
            About
          </NavLink>
          <NavLink 
            to="/contact" 
            className={({isActive}) => `px-4 py-2 rounded-lg transition-colors ${isActive ? 'bg-primary/10 text-secondary font-semibold' : 'text-gray-700 hover:bg-gray-100'}`}
          >
            Contact
          </NavLink>
          {isAdmin && (
            <NavLink 
              to="/admin" 
              className={({isActive}) => `px-4 py-2 rounded-lg transition-colors ${isActive ? 'bg-primary/10 text-secondary font-semibold' : 'text-gray-700 hover:bg-gray-100'}`}
            >
              Admin
            </NavLink>
          )}
        </div>

        {/* Search Bar - Desktop */}
        <div className="hidden md:flex flex-1 max-w-md mx-4">
          <form onSubmit={handleSearch} className="w-full flex">
            <input
              type="text"
              placeholder={placeholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 px-4 py-2 border-2 border-gray-200 rounded-l-lg focus:outline-none focus:border-primary transition-colors placeholder:text-gray-400"
            />
            <button 
              type="submit" 
              className="px-4 py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-r-lg hover:opacity-90 transition-opacity"
            >
              <FaSearch />
            </button>
          </form>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="lg:hidden text-2xl text-secondary p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Mobile Menu */}
        <ul className={`${mobileMenuOpen ? 'flex' : 'hidden'} lg:hidden fixed top-16 left-0 right-0 bg-white shadow-lg flex-col p-4 space-y-2 max-h-[calc(100vh-4rem)] overflow-y-auto z-50`}>
          {/* Search Bar - Mobile */}
          <li className="mb-4">
            <form onSubmit={handleSearch} className="flex">
              <input
                type="text"
                placeholder={placeholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 px-4 py-2 border-2 border-gray-200 rounded-l-lg focus:outline-none focus:border-primary placeholder:text-gray-400"
              />
              <button 
                type="submit" 
                className="px-4 py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-r-lg"
              >
                <FaSearch />
              </button>
            </form>
          </li>
          
          <li>
            <NavLink 
              to="/" 
              className={({isActive}) => `block px-4 py-2 rounded-lg transition-colors ${isActive ? 'bg-primary/10 text-secondary font-semibold' : 'text-gray-700 hover:bg-gray-100'}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/products" 
              className={({isActive}) => `block px-4 py-2 rounded-lg transition-colors ${isActive ? 'bg-primary/10 text-secondary font-semibold' : 'text-gray-700 hover:bg-gray-100'}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Products
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/about" 
              className={({isActive}) => `block px-4 py-2 rounded-lg transition-colors ${isActive ? 'bg-primary/10 text-secondary font-semibold' : 'text-gray-700 hover:bg-gray-100'}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              About Us
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/contact" 
              className={({isActive}) => `block px-4 py-2 rounded-lg transition-colors ${isActive ? 'bg-primary/10 text-secondary font-semibold' : 'text-gray-700 hover:bg-gray-100'}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </NavLink>
          </li>
          {isAdmin && (
            <li>
              <NavLink 
                to="/admin" 
                className={({isActive}) => `block px-4 py-2 rounded-lg transition-colors ${isActive ? 'bg-primary/10 text-secondary font-semibold' : 'text-gray-700 hover:bg-gray-100'}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Admin
              </NavLink>
            </li>
          )}
          
          {/* Mobile User Menu Items */}
          {isAuthenticated && (
            <>
              <li>
                <NavLink 
                  to="/wishlist" 
                  className={({isActive}) => `flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${isActive ? 'bg-primary/10 text-secondary font-semibold' : 'text-gray-700 hover:bg-gray-100'}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <FaHeart /> Wishlist
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/cart" 
                  className={({isActive}) => `flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${isActive ? 'bg-primary/10 text-secondary font-semibold' : 'text-gray-700 hover:bg-gray-100'}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <FaShoppingCart /> Cart {cartItemsCount > 0 && `(${cartItemsCount})`}
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/profile" 
                  className={({isActive}) => `flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${isActive ? 'bg-primary/10 text-secondary font-semibold' : 'text-gray-700 hover:bg-gray-100'}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <FaUser /> Profile
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/orders" 
                  className={({isActive}) => `block px-4 py-2 rounded-lg transition-colors ${isActive ? 'bg-primary/10 text-secondary font-semibold' : 'text-gray-700 hover:bg-gray-100'}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  My Orders
                </NavLink>
              </li>
              <li>
                <button 
                  onClick={handleLogout} 
                  className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  Logout
                </button>
              </li>
            </>
          )}
          
          {!isAuthenticated && (
            <>
              <li>
                <NavLink 
                  to="/register" 
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign Up
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/login" 
                  className="block px-3 py-2 my-2 bg-secondary text-white text-center rounded-lg font-semibold hover:bg-accent transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Login
                </NavLink>
              </li>
            </>
          )}
        </ul>

        {/* Desktop Icons & User Menu */}
        <div className="hidden lg:flex items-center gap-4">
          {isAuthenticated && (
            <>
              <Link to="/wishlist" className="text-2xl text-secondary hover:text-accent transition-colors p-2">
                <FaHeart />
              </Link>
              <Link to="/cart" className="relative text-2xl text-secondary hover:text-accent transition-colors p-2">
                <FaShoppingCart />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                    {cartItemsCount}
                  </span>
                )}
              </Link>
            </>
          )}

          {isAuthenticated ? (
            <div className="relative">
              <button
                className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
              >
                <FaUser className="text-secondary" />
                <span className="font-medium text-gray-700">{user?.name}</span>
              </button>
              {userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                  <Link 
                    to="/profile" 
                    onClick={() => setUserDropdownOpen(false)}
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    Profile
                  </Link>
                  <Link 
                    to="/orders" 
                    onClick={() => setUserDropdownOpen(false)}
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    My Orders
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link 
              to="/login" 
              className="px-4 py-2 bg-gradient-to-r from-secondary to-accent text-white rounded-lg font-semibold hover:opacity-90 transition-opacity"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
