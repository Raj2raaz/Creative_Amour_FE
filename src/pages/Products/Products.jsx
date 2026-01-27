import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { FaStar, FaShoppingCart } from 'react-icons/fa';
import { toast } from 'react-toastify';
import api from '../../utils/api';
import { dummyCategories, dummyProducts, getProductsByCategory } from '../../data/dummyData';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

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
    <div className="w-full bg-[#fef8f5] py-10">
      <div className="max-w-7xl mx-auto px-5">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-10 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Our Products
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 items-start">
          {/* Left Sidebar - Filters */}
          <div className="bg-white p-6 rounded-xl shadow-lg lg:sticky lg:top-24 h-fit">
            <h3 className="text-xl font-semibold text-accent mb-5">Filters</h3>

            {/* Search */}
            <div className="mb-5">
              <label className="block font-semibold mb-2 text-gray-700">Search</label>
              <input
                type="text"
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary transition-colors"
                placeholder="Search products..."
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
              />
            </div>

            {/* Category */}
            <div className="mb-5">
              <label className="block font-semibold mb-2 text-gray-700">Category</label>
              <select
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary transition-colors bg-white"
                value={filters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
              >
                <option value="">All Categories</option>
                {categories.map(cat => (
                  <option key={cat._id} value={cat._id}>{cat.name}</option>
                ))}
              </select>
            </div>

            {/* Price Range */}
            <div className="mb-5">
              <label className="block font-semibold mb-2 text-gray-700">Price Range</label>
              <div className="flex gap-2 items-center">
                <input
                  type="number"
                  className="flex-1 px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary transition-colors"
                  placeholder="Min"
                  value={filters.minPrice}
                  onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                />
                <span className="text-gray-500">-</span>
                <input
                  type="number"
                  className="flex-1 px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary transition-colors"
                  placeholder="Max"
                  value={filters.maxPrice}
                  onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                />
              </div>
            </div>

            {/* Sort By */}
            <div className="mb-5">
              <label className="block font-semibold mb-2 text-gray-700">Sort By</label>
              <select
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary transition-colors bg-white"
                value={filters.sortBy}
                onChange={(e) => handleFilterChange('sortBy', e.target.value)}
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
                className="w-full py-2.5 bg-bg-light border-2 border-secondary text-secondary rounded-lg font-semibold text-sm hover:bg-secondary hover:text-white transition-colors"
              >
                Clear All Filters
              </button>
            )}
          </div>

          {/* Right Side - Products */}
          <div>
            {/* Search Info Banner */}
            {filters.search && (
              <div className="bg-blue-50 px-5 py-3 rounded-lg mb-5 flex justify-between items-center">
                <span className="text-gray-700">
                  Showing results for: <strong>"{filters.search}"</strong>
                </span>
                <button
                  onClick={() => handleFilterChange('search', '')}
                  className="text-secondary font-semibold hover:underline"
                >
                  Clear
                </button>
              </div>
            )}

            {/* Products Count */}
            <div className="mb-5 text-gray-600">
              <strong>{products.length}</strong> products found
            </div>

            {/* Products Grid */}
            {loading ? (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary"></div>
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-16 text-gray-500">
                <p className="text-lg">No products found</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <div
                    key={product._id}
                    className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                    onClick={() => navigate(`/products/${product._id}`)}
                  >
                    <div className="relative overflow-hidden h-64">
                      <img
                        src={product.images[0]?.url || 'https://via.placeholder.com/300'}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
                        {product.name}
                      </h3>
                      <div className="text-2xl font-bold text-secondary mb-2">
                        ₹{product.discountPrice || product.price}
                      </div>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <FaStar 
                              key={i} 
                              className={i < Math.round(product.rating || product.ratings?.average || 0) ? 'text-yellow-500' : 'text-gray-300'} 
                              size={16}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-600">
                          ({product.numReviews || product.ratings?.count || 0})
                        </span>
                      </div>
                      <button
                        className="w-full py-2.5 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                        onClick={(e) => handleAddToCart(e, product._id)}
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
