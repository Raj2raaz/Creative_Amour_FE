import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaStar, FaShoppingCart } from 'react-icons/fa';
import { toast } from 'react-toastify';
import api from '../../utils/api';
import { dummyCategories, getFeaturedProducts } from '../../data/dummyData';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

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
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-secondary"></div>
      </div>
    );
  }

  return (
    <div className="py-10">
      <div className="max-w-7xl mx-auto px-4">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-br from-primary to-secondary text-white py-24 md:py-28 px-5 md:px-20 text-center rounded-[20px] mb-20 overflow-hidden shadow-[0_10px_40px_rgba(201,87,65,0.3)]
          before:content-[''] before:absolute before:-top-1/2 before:-right-[10%] before:w-[400px] before:h-[400px] before:bg-white/10 before:rounded-full before:animate-[float_6s_ease-in-out_infinite]
          after:content-[''] after:absolute after:-bottom-[30%] after:-left-[5%] after:w-[300px] after:h-[300px] after:bg-white/[0.08] after:rounded-full after:animate-[float_8s_ease-in-out_infinite_reverse]">
          <h1 className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-[64px] mb-6 font-bold relative z-10 tracking-tight animate-[fadeInUp_0.8s_ease-out]">
            Welcome to Creative Amour
          </h1>
          <p className="text-white/95 text-lg sm:text-xl md:text-[22px] max-w-[650px] mx-auto mb-10 relative z-10 leading-relaxed animate-[fadeInUp_0.8s_ease-out_0.2s_backwards]">
            Discover unique handcrafted earrings and paintings, made with love and passion
          </p>
          <button 
            className="relative z-10 bg-gradient-to-br from-secondary to-[#b84535] text-white px-12 py-4 text-lg rounded-lg hover:shadow-[0_12px_32px_rgba(0,0,0,0.3)] hover:-translate-y-1 transition-all duration-300 shadow-[0_8px_24px_rgba(0,0,0,0.2)] animate-[fadeInUp_0.8s_ease-out_0.4s_backwards]"
            onClick={() => navigate('/products')}
          >
            Shop Now
          </button>
        </div>

        {/* Categories Section */}
        <h2 className="text-center mb-12 text-secondary text-3xl sm:text-4xl md:text-5xl lg:text-[42px] font-bold relative pb-5
          after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-20 after:h-1 after:bg-gradient-to-r after:from-primary after:to-secondary after:rounded-sm">
          Shop by Category
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-20">
          {categories.map((category) => (
            <div
              key={category._id}
              className="group bg-white rounded-[20px] overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.1)] transition-all duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)] cursor-pointer h-80 relative border-2 border-transparent
                hover:-translate-y-2.5 hover:scale-[1.02] hover:shadow-[0_12px_40px_rgba(201,87,65,0.25)] hover:border-primary
                after:content-[''] after:absolute after:inset-0 after:bg-gradient-to-br after:from-transparent after:to-secondary/10 after:opacity-0 after:transition-opacity after:duration-400 after:ease-out hover:after:opacity-100"
              onClick={() => navigate(`/products?category=${category._id}`)}
            >
              <img
                src={category.image?.url || 'https://via.placeholder.com/400x300?text=Category'}
                alt={category.name}
                className="w-full h-full object-cover transition-transform duration-[600ms] ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:scale-110"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-6 pt-10 text-white z-20 transition-[padding] duration-400 ease-out group-hover:pb-10">
                <h3 className="text-white text-3xl mb-2.5 font-bold tracking-tight transition-transform duration-400 ease-out group-hover:-translate-y-1">
                  {category.name}
                </h3>
                <p className="text-white/95 text-base leading-relaxed">
                  {category.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Featured Products */}
        {featuredProducts.length > 0 && (
          <>
            <h2 className="text-center mb-12 text-secondary text-3xl sm:text-4xl md:text-5xl lg:text-[42px] font-bold relative pb-5
              after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-20 after:h-1 after:bg-gradient-to-r after:from-primary after:to-secondary after:rounded-sm">
              Featured Products
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 mb-10">
              {featuredProducts.map((product) => (
                <div
                  key={product._id}
                  className="group bg-white rounded-2xl overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.08)] transition-all duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)] cursor-pointer border border-transparent relative
                    hover:-translate-y-2 hover:scale-[1.02] hover:shadow-[0_12px_32px_rgba(201,87,65,0.2)] hover:border-primary
                    before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-br before:from-primary/10 before:to-secondary/10 before:opacity-0 before:transition-opacity before:duration-400 before:ease-out before:pointer-events-none before:z-10 hover:before:opacity-100"
                  onClick={() => navigate(`/products/${product._id}`)}
                >
                  <img
                    src={product.images[0]?.url || 'https://via.placeholder.com/300'}
                    alt={product.name}
                    className="w-full h-48 md:h-72 lg:h-80 object-cover bg-[#fef8f5] group-hover:scale-110 transition-transform duration-[600ms] ease-[cubic-bezier(0.4,0,0.2,1)]"
                  />
                  <div className="p-4 md:p-6 relative z-20">
                    <h3 className="text-base md:text-lg font-semibold text-[#1a1a1a] mb-2 overflow-hidden text-ellipsis whitespace-nowrap group-hover:text-secondary transition-colors duration-300">
                      {product.name}
                    </h3>
                    <div className="text-xl md:text-2xl font-bold text-secondary mb-3 flex items-center gap-2">
                      ₹{product.discountPrice || product.price}
                    </div>
                    <div className="flex items-center gap-2.5 text-sm text-[#666] mb-4">
                      <span className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <FaStar 
                            key={i} 
                            className={i < Math.round(product.rating || product.ratings?.average || 0) ? 'text-[#ffa500]' : 'text-gray-300'} 
                          />
                        ))}
                      </span>
                      <span>({product.numReviews || product.ratings?.count || 0})</span>
                    </div>
                    <button
                      className="w-full bg-gradient-to-br from-secondary to-[#b84535] text-white py-2 md:py-3 rounded-lg hover:shadow-[0_6px_20px_rgba(201,87,65,0.4)] hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2 text-sm md:text-base"
                      onClick={(e) => handleAddToCart(e, product._id)}
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
