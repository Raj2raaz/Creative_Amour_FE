import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTrash, FaMinus, FaPlus, FaShoppingBag } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

const Cart = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { cart, loading, updateCartItem, removeFromCart, clearCart, fetchCart } = useCart();
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    if (user) {
      fetchCart();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const handleUpdateQuantity = async (itemId, currentQuantity, change) => {
    const newQuantity = currentQuantity + change;
    if (newQuantity < 1) return;

    try {
      setUpdating(true);
      await updateCartItem(itemId, newQuantity);
      toast.success('Cart updated');
    } catch (error) {
      toast.error(error.message || 'Failed to update cart');
    } finally {
      setUpdating(false);
    }
  };

  const handleRemoveItem = async (itemId) => {
    if (!window.confirm('Remove this item from cart?')) return;

    try {
      await removeFromCart(itemId);
      toast.success('Item removed from cart');
    } catch (error) {
      toast.error(error.message || 'Failed to remove item');
    }
  };

  const handleClearCart = async () => {
    if (!window.confirm('Clear all items from cart?')) return;

    try {
      await clearCart();
      toast.success('Cart cleared');
    } catch (error) {
      toast.error(error.message || 'Failed to clear cart');
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-[#fef8f5] flex flex-col items-center justify-center py-20 px-5">
        <FaShoppingBag size={64} className="text-gray-400 mb-5" />
        <h2 className="text-3xl font-bold text-gray-800 mb-3">Please Login</h2>
        <p className="text-gray-600 mb-8 text-center max-w-md">
          You need to login to view your cart
        </p>
        <button className="px-8 py-3 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-lg hover:opacity-90 transition-opacity" onClick={() => navigate('/login')}>
          Login
        </button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fef8f5] flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary"></div>
      </div>
    );
  }

  if (!cart || !cart.items || cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-[#fef8f5] flex flex-col items-center justify-center py-20 px-5">
        <FaShoppingBag size={64} className="text-gray-400 mb-5" />
        <h2 className="text-3xl font-bold text-gray-800 mb-3">Your Cart is Empty</h2>
        <p className="text-gray-600 mb-8 text-center max-w-md">
          Add some items to get started!
        </p>
        <button className="px-8 py-3 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-lg hover:opacity-90 transition-opacity" onClick={() => navigate('/products')}>
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#fef8f5] py-10 px-5">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Shopping Cart ({cart.items.length} {cart.items.length === 1 ? 'item' : 'items'})
          </h1>
          {cart.items.length > 0 && (
            <button
              onClick={handleClearCart}
              className="px-5 py-2.5 bg-transparent border-2 border-red-500 text-red-500 rounded-lg font-semibold text-sm flex items-center gap-2 hover:bg-red-50 transition-colors"
            >
              <FaTrash />
              Clear Cart
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8">
          {/* Cart Items */}
          <div className="space-y-4">
            {cart.items.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-xl p-5 shadow-md grid grid-cols-[120px_1fr_auto] gap-5 items-center"
              >
                {/* Product Image */}
                <div
                  onClick={() => navigate(`/products/${item.product._id}`)}
                  className="bg-gray-100 rounded-lg overflow-hidden cursor-pointer aspect-square"
                >
                  <img
                    src={item.product.images?.[0]?.url || 'https://via.placeholder.com/120'}
                    alt={item.product.name}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  />
                </div>

                {/* Product Info */}
                <div>
                  <h3
                    onClick={() => navigate(`/products/${item.product._id}`)}
                    className="text-lg font-semibold text-accent mb-2 cursor-pointer hover:text-secondary transition-colors"
                  >
                    {item.product.name}
                  </h3>

                  {item.customization && Object.keys(item.customization).length > 0 && (
                    <div className="mb-2.5 flex flex-wrap gap-2">
                      {Object.entries(item.customization).map(([key, value]) => (
                        <span
                          key={key}
                          className="inline-block px-2.5 py-1 bg-gray-100 rounded-full text-xs text-gray-600"
                        >
                          {key}: {value}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="text-xl font-bold text-secondary mb-4">
                    ₹{item.price}
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2.5">
                      <button
                        onClick={() => handleUpdateQuantity(item._id, item.quantity, -1)}
                        disabled={updating || item.quantity <= 1}
                        className="w-8 h-8 rounded-full border-2 border-secondary bg-white text-secondary flex items-center justify-center hover:bg-secondary hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <FaMinus size={12} />
                      </button>
                      
                      <span className="text-base font-semibold min-w-[30px] text-center">
                        {item.quantity}
                      </span>
                      
                      <button
                        onClick={() => handleUpdateQuantity(item._id, item.quantity, 1)}
                        disabled={updating}
                        className="w-8 h-8 rounded-full border-2 border-secondary bg-white text-secondary flex items-center justify-center hover:bg-secondary hover:text-white transition-colors disabled:opacity-50"
                      >
                        <FaPlus size={12} />
                      </button>
                    </div>

                    <span className="text-gray-600 text-sm">
                      Subtotal: ₹{item.totalPrice}
                    </span>
                  </div>
                </div>

                {/* Remove Button */}
                <button
                  onClick={() => handleRemoveItem(item._id)}
                  className="p-2.5 text-red-500 hover:text-red-700 transition-colors text-xl"
                  title="Remove from cart"
                >
                  <FaTrash />
                </button>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="sticky top-24 h-fit">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h2 className="text-2xl font-bold mb-5 text-gray-800">Order Summary</h2>

              <div className="border-b border-gray-200 pb-4 mb-4 space-y-2.5">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">₹{cart.subtotal}</span>
                </div>

                {cart.discount > 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Discount</span>
                    <span className="font-semibold text-green-600">-₹{cart.discount}</span>
                  </div>
                )}

                {cart.tax > 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax</span>
                    <span className="font-semibold">₹{cart.tax}</span>
                  </div>
                )}

                {cart.shipping > 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-semibold">₹{cart.shipping}</span>
                  </div>
                )}
              </div>

              <div className="flex justify-between mb-6 text-xl">
                <span className="font-bold">Total</span>
                <span className="font-bold text-secondary">
                  ₹{cart.totalAmount}
                </span>
              </div>

              <button
                onClick={() => navigate('/checkout')}
                className="w-full py-4 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-lg text-base hover:opacity-90 transition-opacity mb-3"
              >
                Proceed to Checkout
              </button>

              <button
                onClick={() => navigate('/products')}
                className="w-full py-4 bg-transparent border-2 border-secondary text-secondary rounded-lg font-semibold text-base hover:bg-secondary hover:text-white transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
