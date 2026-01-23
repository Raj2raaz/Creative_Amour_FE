import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { FaStar, FaShoppingCart } from 'react-icons/fa';
import { toast } from 'react-toastify';
import api from '../../utils/api';
import { dummyCategories, dummyProducts, getProductsByCategory } from '../../data/dummyData';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import '../Home/Home.css';

const Products = () => {
  const [products, setProducts] = useState(dummyProducts);
  const [categories, setCategories] = useState(dummyCategories);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { user } = useAuth();

  const handleAddToCart = async (e, productId) => {
    e.stopPropagation();
    
    if (!user) {
      toast.info('Please login to add items to cart');
      navigate('/login');
      return;
    }

    try {
      await addToCart(productId, 1);
      toast.success('Added to cart!');
    } catch (error) {
      toast.error(error.message || 'Failed to add to cart');
    }
  };

  const [filters, setFilters] = useState({
    category: searchParams.get('category') || '',
    search: searchParams.get('search') || '',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    sortBy: searchParams.get('sortBy') || 'createdAt',
    order: searchParams.get('order') || 'desc'
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  const fetchCategories = async () => {
    try {
      const { data } = await api.get('/categories');
      setCategories(data.categories);
    } catch (error) {
      console.error('Error fetching categories:', error);
      // Keep using dummy data if API fails
    }
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      Object.keys(filters).forEach(key => {
        if (filters[key]) params.append(key, filters[key]);
      });
      
      const { data } = await api.get(`/products?${params.toString()}`);
      setProducts(data.products);
    } catch (error) {
      console.error('Error fetching products:', error);
      // Use dummy data as fallback
      setProducts(filters.category ? getProductsByCategory(filters.category) : dummyProducts);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    
    const params = new URLSearchParams();
    Object.keys(newFilters).forEach(k => {
      if (newFilters[k]) params.set(k, newFilters[k]);
    });
    setSearchParams(params);
  };

  return (
    <div className="home" style={{ padding: '40px 0' }}>
      <div className="container">
        <h1 className="section-title">Our Products</h1>

        <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '30px', alignItems: 'start' }}>
          {/* Left Sidebar - Filters */}
          <div className="products-sidebar" style={{ 
            backgroundColor: 'white', 
            padding: '25px', 
            borderRadius: '12px', 
            boxShadow: 'var(--shadow)',
            position: 'sticky',
            top: '100px'
          }}>
            <h3 style={{ marginBottom: '20px', fontSize: '20px', color: 'var(--accent-color)' }}>
              Filters
            </h3>

            {/* Search */}
            <div className="form-group" style={{ marginBottom: '20px' }}>
              <label className="form-label" style={{ fontWeight: '600', marginBottom: '8px', display: 'block' }}>
                Search
              </label>
              <input
                type="text"
                className="form-input"
                placeholder="Search products..."
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                style={{ width: '100%' }}
              />
            </div>

            {/* Category */}
            <div className="form-group" style={{ marginBottom: '20px' }}>
              <label className="form-label" style={{ fontWeight: '600', marginBottom: '8px', display: 'block' }}>
                Category
              </label>
              <select
                className="form-select"
                value={filters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
                style={{ width: '100%' }}
              >
                <option value="">All Categories</option>
                {categories.map(cat => (
                  <option key={cat._id} value={cat._id}>{cat.name}</option>
                ))}
              </select>
            </div>

            {/* Price Range */}
            <div style={{ marginBottom: '20px' }}>
              <label className="form-label" style={{ fontWeight: '600', marginBottom: '8px', display: 'block' }}>
                Price Range
              </label>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <input
                  type="number"
                  className="form-input"
                  placeholder="Min"
                  value={filters.minPrice}
                  onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                  style={{ flex: 1 }}
                />
                <span>-</span>
                <input
                  type="number"
                  className="form-input"
                  placeholder="Max"
                  value={filters.maxPrice}
                  onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                  style={{ flex: 1 }}
                />
              </div>
            </div>

            {/* Sort By */}
            <div className="form-group" style={{ marginBottom: '20px' }}>
              <label className="form-label" style={{ fontWeight: '600', marginBottom: '8px', display: 'block' }}>
                Sort By
              </label>
              <select
                className="form-select"
                value={filters.sortBy}
                onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                style={{ width: '100%' }}
              >
                <option value="createdAt">Newest</option>
                <option value="price">Price: Low to High</option>
                <option value="-price">Price: High to Low</option>
                <option value="ratings.average">Rating</option>
              </select>
            </div>

            {/* Clear Filters Button */}
            {(filters.search || filters.category || filters.minPrice || filters.maxPrice) && (
              <button
                onClick={() => {
                  setFilters({
                    category: '',
                    search: '',
                    minPrice: '',
                    maxPrice: '',
                    sortBy: 'createdAt',
                    order: 'desc'
                  });
                  setSearchParams({});
                }}
                style={{
                  width: '100%',
                  padding: '10px',
                  backgroundColor: 'var(--bg-light)',
                  border: '2px solid var(--secondary-color)',
                  color: 'var(--secondary-color)',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  fontSize: '14px'
                }}
              >
                Clear All Filters
              </button>
            )}
          </div>

          {/* Right Side - Products */}
          <div>
            {/* Search Info Banner */}
            {filters.search && (
              <div style={{
                backgroundColor: '#e8f4f8',
                padding: '12px 20px',
                borderRadius: '8px',
                marginBottom: '20px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <span>Showing results for: <strong>"{filters.search}"</strong></span>
                <button
                  onClick={() => handleFilterChange('search', '')}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--secondary-color)',
                    cursor: 'pointer',
                    fontWeight: '600'
                  }}
                >
                  Clear
                </button>
              </div>
            )}

            {/* Products Count */}
            <div style={{ marginBottom: '20px', color: 'var(--text-light)' }}>
              <strong>{products.length}</strong> products found
            </div>

            {/* Products Grid */}
            {loading ? (
              <div className="spinner"></div>
            ) : products.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-light)' }}>
                <p>No products found</p>
              </div>
            ) : (
              <div className="products-grid">
                {products.map((product) => (
                  <div
                    key={product._id}
                    className="product-card"
                    onClick={() => navigate(`/products/${product._id}`)}
                  >
                    <img
                      src={product.images[0]?.url || 'https://via.placeholder.com/300'}
                      alt={product.name}
                      className="product-image"
                    />
                    <div className="product-info">
                      <h3 className="product-name">{product.name}</h3>
                      <div className="product-price">₹{product.discountPrice || product.price}</div>
                      <div className="product-rating">
                        <span className="stars">
                          {[...Array(5)].map((_, i) => (
                              <FaStar key={i} color={i < Math.round(product.rating || product.ratings?.average || 0) ? '#ffa500' : '#ddd'} />
                            ))}
                          </span>
                          <span>({product.numReviews || product.ratings?.count || 0})</span>
                      </div>
                      <button
                        className="btn btn-primary"
                        onClick={(e) => handleAddToCart(e, product._id)}
                        style={{ width: '100%', marginTop: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                      >
                        <FaShoppingCart />
                        Add to Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
