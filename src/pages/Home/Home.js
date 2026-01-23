import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaStar, FaShoppingCart } from 'react-icons/fa';
import { toast } from 'react-toastify';
import api from '../../utils/api';
import { dummyCategories, getFeaturedProducts } from '../../data/dummyData';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import './Home.css';

const Home = () => {
  const [categories, setCategories] = useState(dummyCategories);
  const [featuredProducts, setFeaturedProducts] = useState(getFeaturedProducts());
  const [loading, setLoading] = useState(true);
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

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [categoriesRes, productsRes] = await Promise.all([
        api.get('/categories'),
        api.get('/products/featured')
      ]);
      setCategories(categoriesRes.data.categories);
      setFeaturedProducts(productsRes.data.products);
    } catch (error) {
      console.error('Error fetching data:', error);
      // Keep using dummy data if API fails
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="spinner"></div>;
  }

  return (
    <div className="home">
      <div className="container">
        {/* Hero Section */}
        <div className="hero-section">
          <h1>Welcome to Creative Amour</h1>
          <p>Discover unique handcrafted earrings and paintings, made with love and passion</p>
          <button className="btn btn-primary" onClick={() => navigate('/products')}>
            Shop Now
          </button>
        </div>

        {/* Categories Section */}
        <h2 className="section-title">Shop by Category</h2>
        <div className="categories-grid">
          {categories.map((category) => (
            <div
              key={category._id}
              className="category-card"
              onClick={() => navigate(`/products?category=${category._id}`)}
            >
              <img
                src={category.image?.url || 'https://via.placeholder.com/400x300?text=Category'}
                alt={category.name}
                className="category-card-image"
              />
              <div className="category-card-overlay">
                <h3>{category.name}</h3>
                <p>{category.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Featured Products */}
        {featuredProducts.length > 0 && (
          <>
            <h2 className="section-title">Featured Products</h2>
            <div className="products-grid">
              {featuredProducts.map((product) => (
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
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
