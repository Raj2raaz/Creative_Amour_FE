import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHeart, FaShoppingCart, FaTrash, FaStar } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

const Wishlist = () => {
  const { wishlist, loading, removeFromWishlist, fetchWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      fetchWishlist();
    }
  }, [user]);

  const handleRemove = async (productId) => {
    try {
      await removeFromWishlist(productId);
      toast.success('Removed from wishlist');
    } catch (error) {
      toast.error('Failed to remove from wishlist');
    }
  };

  const handleAddToCart = async (productId, productName) => {
    try {
      await addToCart(productId, 1);
      toast.success(`${productName} added to cart!`);
    } catch (error) {
      toast.error('Failed to add to cart');
    }
  };

  const handleMoveToCart = async (productId, productName) => {
    try {
      await addToCart(productId, 1);
      await removeFromWishlist(productId);
      toast.success(`${productName} moved to cart!`);
    } catch (error) {
      toast.error('Failed to move to cart');
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-[#fef8f5] flex items-center justify-center py-20">
        <div className="text-center">
          <FaHeart className="text-6xl text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Please Login</h2>
          <p className="text-gray-600 mb-6">You need to login to view your wishlist</p>
          <button
            onClick={() => navigate('/login')}
            className="px-8 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-semibold hover:opacity-90"
          >
            Login Now
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#fef8f5]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  const wishlistItems = wishlist?.products || [];

  return (
    <div className="min-h-screen bg-[#fef8f5] py-10">
      <div className="max-w-7xl mx-auto px-5">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            My Wishlist
          </h1>
          <p className="text-gray-600">
            {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'} saved for later
          </p>
        </div>

        {wishlistItems.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-16 text-center">
            <FaHeart className="text-6xl text-gray-300 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Wishlist is Empty</h2>
            <p className="text-gray-600 mb-8">
              Start adding products you love by clicking the heart icon on product cards
            </p>
            <button
              onClick={() => navigate('/products')}
              className="px-8 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-semibold hover:opacity-90"
            >
              Browse Products
            </button>
          </div>
        ) : (
          <>
            {/* Action Buttons */}
            <div className="mb-6 flex gap-4">
              <button
                onClick={() => {
                  wishlistItems.forEach(item => handleMoveToCart(item._id, item.name));
                }}
                className="px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg font-semibold hover:opacity-90 flex items-center gap-2"
              >
                <FaShoppingCart /> Move All to Cart
              </button>
            </div>

            {/* Wishlist Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {wishlistItems.map((product) => (
                <div
                  key={product._id}
                  className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 relative group"
                >
                  {/* Remove Button */}
                  <button
                    onClick={() => handleRemove(product._id)}
                    className="absolute top-3 right-3 z-10 bg-white rounded-full p-2 shadow-md hover:bg-red-50 transition-colors"
                    title="Remove from wishlist"
                  >
                    <FaTrash className="text-red-500 text-sm" />
                  </button>

                  {/* Product Image */}
                  <div
                    className="relative overflow-hidden h-64 cursor-pointer"
                    onClick={() => navigate(`/products/${product._id}`)}
                  >
                    <img
                      src={product.images?.[0]?.url || 'https://via.placeholder.com/300'}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="p-4">
                    <h3
                      className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2 cursor-pointer hover:text-primary"
                      onClick={() => navigate(`/products/${product._id}`)}
                    >
                      {product.name}
                    </h3>
                    
                    {/* Price */}
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl font-bold text-secondary">
                        ₹{product.discountPrice || product.price}
                      </span>
                      {product.discountPrice && (
                        <span className="text-sm text-gray-500 line-through">
                          ₹{product.price}
                        </span>
                      )}
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <FaStar
                            key={i}
                            className={
                              i < Math.round(product.ratings?.average || 0)
                                ? 'text-yellow-500'
                                : 'text-gray-300'
                            }
                            size={14}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">
                        ({product.ratings?.count || 0})
                      </span>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleMoveToCart(product._id, product.name)}
                        className="flex-1 py-2.5 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                      >
                        <FaShoppingCart size={14} />
                        Move to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Continue Shopping */}
            <div className="mt-10 text-center">
              <button
                onClick={() => navigate('/products')}
                className="px-8 py-3 bg-white border-2 border-secondary text-secondary rounded-lg font-semibold hover:bg-secondary hover:text-white transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
