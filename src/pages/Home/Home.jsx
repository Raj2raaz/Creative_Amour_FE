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
        <div className="relative bg-gradient-to-br from-primary via-[#d4756d] to-secondary text-white py-24 md:py-32 px-5 md:px-20 text-center rounded-[24px] mb-20 overflow-hidden shadow-[0_20px_60px_rgba(201,87,65,0.4)] border border-white/10
          before:content-[''] before:absolute before:-top-1/2 before:-right-[10%] before:w-[400px] before:h-[400px] before:bg-white/10 before:rounded-full before:blur-3xl before:animate-[float_8s_ease-in-out_infinite]
          after:content-[''] after:absolute after:-bottom-[30%] after:-left-[5%] after:w-[350px] after:h-[350px] after:bg-white/[0.08] after:rounded-full after:blur-2xl after:animate-[float_10s_ease-in-out_infinite_1s]">
          
          {/* Floating Decorative Circles */}
          <div className="absolute top-10 left-10 w-20 h-20 bg-white/5 rounded-full blur-xl animate-[float_7s_ease-in-out_infinite]"></div>
          <div className="absolute top-1/4 right-16 w-16 h-16 bg-white/10 rounded-full blur-lg animate-[float_9s_ease-in-out_infinite_2s]"></div>
          <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-white/5 rounded-full blur-lg animate-[float_6s_ease-in-out_infinite_1.5s]"></div>
          <div className="absolute top-1/2 right-1/4 w-24 h-24 bg-white/[0.03] rounded-full blur-2xl animate-[float_11s_ease-in-out_infinite_3s]"></div>
          <div className="absolute bottom-1/3 right-20 w-14 h-14 bg-white/[0.07] rounded-full blur-xl animate-[float_8s_ease-in-out_infinite_2.5s]"></div>
          
          {/* Twinkling Stars Effect - Slower and more elegant */}
          <div className="absolute top-12 left-16 w-2 h-2 bg-white rounded-full blur-[2px] animate-[twinkleMove_3s_ease-in-out_infinite]"></div>
          <div className="absolute top-20 right-32 w-3 h-3 bg-white/90 rounded-full blur-sm animate-[twinkleMove_3.5s_ease-in-out_infinite_0.5s]"></div>
          <div className="absolute top-32 left-1/3 w-2 h-2 bg-white/80 rounded-full blur-[2px] animate-[flash_2.5s_ease-in-out_infinite_1s]"></div>
          <div className="absolute top-1/4 right-1/4 w-3 h-3 bg-white rounded-full blur-[3px] animate-[twinkleMove_3.2s_ease-in-out_infinite_1.5s]"></div>
          <div className="absolute top-1/3 left-20 w-2 h-2 bg-white/70 rounded-full blur-sm animate-[flash_2.8s_ease-in-out_infinite_0.8s]"></div>
          <div className="absolute bottom-32 right-1/3 w-3 h-3 bg-white/90 rounded-full blur-[2px] animate-[twinkleMove_3.8s_ease-in-out_infinite_2s]"></div>
          <div className="absolute bottom-24 left-1/4 w-2 h-2 bg-white rounded-full blur-sm animate-[flash_2.3s_ease-in-out_infinite_0.3s]"></div>
          <div className="absolute bottom-1/3 right-24 w-2 h-2 bg-white/80 rounded-full blur-[3px] animate-[twinkleMove_3.5s_ease-in-out_infinite_1.8s]"></div>
          <div className="absolute top-1/2 left-1/4 w-3 h-3 bg-white/90 rounded-full blur-sm animate-[flash_2.6s_ease-in-out_infinite_1.2s]"></div>
          <div className="absolute top-40 right-20 w-2 h-2 bg-white rounded-full blur-[2px] animate-[twinkleMove_3.3s_ease-in-out_infinite_2.2s]"></div>
          <div className="absolute bottom-20 left-32 w-3 h-3 bg-white/85 rounded-full blur-[3px] animate-[flash_3s_ease-in-out_infinite_1.5s]"></div>
          <div className="absolute top-28 right-1/3 w-2 h-2 bg-white/75 rounded-full blur-sm animate-[twinkleMove_2.8s_ease-in-out_infinite_0.6s]"></div>
          <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-white rounded-full blur-[2px] animate-[flash_3.2s_ease-in-out_infinite_2.4s]"></div>
          <div className="absolute top-1/3 right-28 w-3 h-3 bg-white/80 rounded-full blur-[3px] animate-[twinkleMove_4s_ease-in-out_infinite_0.9s]"></div>
          
          {/* Animated Floating Orbs */}
          <div className="absolute top-16 left-1/4 w-8 h-8 bg-gradient-to-br from-white/20 to-white/5 rounded-full blur-md animate-[float_9s_ease-in-out_infinite]"></div>
          <div className="absolute bottom-28 right-1/4 w-10 h-10 bg-gradient-to-br from-white/15 to-white/5 rounded-full blur-lg animate-[float_12s_ease-in-out_infinite_1.5s]"></div>
          <div className="absolute top-1/3 right-12 w-6 h-6 bg-gradient-to-br from-white/25 to-white/10 rounded-full blur-sm animate-[float_7s_ease-in-out_infinite_2s]"></div>

          {/* Main Heading with enhanced animation */}
          <h1 className="text-white text-5xl sm:text-6xl md:text-7xl lg:text-[80px] xl:text-[88px] mb-6 font-engagement font-light relative z-10 tracking-wide leading-tight
            animate-[fadeInUp_1s_ease-out_0.2s_backwards]
            drop-shadow-[0_4px_12px_rgba(0,0,0,0.3)]">
            <span className="inline-block hover:scale-105 transition-transform duration-300">Artistry by</span>
            <br />
            <span className="inline-block bg-gradient-to-r from-white via-white to-white/90 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300">
              Creative Amour
            </span>
          </h1>

          {/* Tagline with staggered animation */}
          <p className="text-white/95 text-lg sm:text-xl md:text-2xl max-w-[700px] mx-auto mb-4 relative z-10 leading-relaxed font-medium
            animate-[fadeInUp_1s_ease-out_0.4s_backwards]
            drop-shadow-[0_2px_8px_rgba(0,0,0,0.2)]">
            Handmade Art & Curated Accessories
          </p>

          {/* Subtitle with delayed animation */}
          <p className="text-white/80 text-sm sm:text-base md:text-lg max-w-[600px] mx-auto mb-10 relative z-10 leading-relaxed
            animate-[fadeInUp_1s_ease-out_0.6s_backwards]">
            Created with love • Acrylic paintings • Artisan earrings • Keyrings & more
          </p>

          {/* Enhanced CTA Button with multiple effects */}
          <div className="relative z-10 inline-block animate-[fadeInUp_1s_ease-out_0.8s_backwards]">
            <button 
              className="group relative bg-white text-primary px-14 py-5 text-lg font-bold rounded-full overflow-hidden
                hover:scale-105 hover:shadow-[0_16px_48px_rgba(255,255,255,0.3)] 
                transition-all duration-500 ease-out
                before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-r before:from-secondary before:to-primary before:opacity-0 before:transition-opacity before:duration-500 hover:before:opacity-100"
              onClick={() => navigate('/products')}
            >
              <span className="relative z-10 group-hover:text-white transition-colors duration-500 flex items-center gap-3">
                Shop Now
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </button>
          </div>

          {/* Bottom decorative line */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
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