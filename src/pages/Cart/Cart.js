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
      <div className="container" style={{ padding: '100px 20px', textAlign: 'center' }}>
        <FaShoppingBag size={64} color="var(--text-light)" style={{ marginBottom: '20px' }} />
        <h2>Please Login</h2>
        <p style={{ color: 'var(--text-light)', marginBottom: '30px' }}>
          You need to login to view your cart
        </p>
        <button className="btn btn-primary" onClick={() => navigate('/login')}>
          Login
        </button>
      </div>
    );
  }

  if (loading) {
    return <div className="spinner" style={{ margin: '100px auto' }}></div>;
  }

  if (!cart || !cart.items || cart.items.length === 0) {
    return (
      <div className="container" style={{ padding: '100px 20px', textAlign: 'center' }}>
        <FaShoppingBag size={64} color="var(--text-light)" style={{ marginBottom: '20px' }} />
        <h2>Your Cart is Empty</h2>
        <p style={{ color: 'var(--text-light)', marginBottom: '30px' }}>
          Add some items to get started!
        </p>
        <button className="btn btn-primary" onClick={() => navigate('/products')}>
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h1>Shopping Cart ({cart.items.length} {cart.items.length === 1 ? 'item' : 'items'})</h1>
        {cart.items.length > 0 && (
          <button
            onClick={handleClearCart}
            style={{
              padding: '10px 20px',
              backgroundColor: 'transparent',
              border: '2px solid #dc3545',
              color: '#dc3545',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '14px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <FaTrash />
            Clear Cart
          </button>
        )}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: '30px' }}>
        {/* Cart Items */}
        <div>
          {cart.items.map((item) => (
            <div
              key={item._id}
              style={{
                backgroundColor: 'white',
                borderRadius: '12px',
                padding: '20px',
                marginBottom: '15px',
                boxShadow: 'var(--shadow)',
                display: 'grid',
                gridTemplateColumns: '120px 1fr auto',
                gap: '20px',
                alignItems: 'center'
              }}
            >
              {/* Product Image */}
              <div
                onClick={() => navigate(`/products/${item.product._id}`)}
                style={{
                  backgroundColor: '#f5f5f5',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  aspectRatio: '1/1'
                }}
              >
                <img
                  src={item.product.images?.[0]?.url || 'https://via.placeholder.com/120'}
                  alt={item.product.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>

              {/* Product Info */}
              <div>
                <h3
                  onClick={() => navigate(`/products/${item.product._id}`)}
                  style={{
                    fontSize: '18px',
                    marginBottom: '8px',
                    color: 'var(--accent-color)',
                    cursor: 'pointer'
                  }}
                >
                  {item.product.name}
                </h3>

                {item.customization && Object.keys(item.customization).length > 0 && (
                  <div style={{ marginBottom: '10px' }}>
                    {Object.entries(item.customization).map(([key, value]) => (
                      <span
                        key={key}
                        style={{
                          display: 'inline-block',
                          padding: '4px 10px',
                          backgroundColor: '#f0f0f0',
                          borderRadius: '12px',
                          fontSize: '12px',
                          marginRight: '8px',
                          color: 'var(--text-light)'
                        }}
                      >
                        {key}: {value}
                      </span>
                    ))}
                  </div>
                )}

                <div style={{ fontSize: '20px', fontWeight: '700', color: 'var(--secondary-color)', marginBottom: '15px' }}>
                  ₹{item.price}
                </div>

                {/* Quantity Controls */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <button
                      onClick={() => handleUpdateQuantity(item._id, item.quantity, -1)}
                      disabled={updating || item.quantity <= 1}
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        border: '2px solid var(--secondary-color)',
                        backgroundColor: 'white',
                        color: 'var(--secondary-color)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        opacity: item.quantity <= 1 ? 0.5 : 1
                      }}
                    >
                      <FaMinus size={12} />
                    </button>
                    
                    <span style={{ fontSize: '16px', fontWeight: '600', minWidth: '30px', textAlign: 'center' }}>
                      {item.quantity}
                    </span>
                    
                    <button
                      onClick={() => handleUpdateQuantity(item._id, item.quantity, 1)}
                      disabled={updating}
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        border: '2px solid var(--secondary-color)',
                        backgroundColor: 'white',
                        color: 'var(--secondary-color)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <FaPlus size={12} />
                    </button>
                  </div>

                  <span style={{ color: 'var(--text-light)', fontSize: '14px' }}>
                    Subtotal: ₹{item.totalPrice}
                  </span>
                </div>
              </div>

              {/* Remove Button */}
              <button
                onClick={() => handleRemoveItem(item._id)}
                style={{
                  padding: '10px',
                  backgroundColor: 'transparent',
                  border: 'none',
                  color: '#dc3545',
                  cursor: 'pointer',
                  fontSize: '20px'
                }}
                title="Remove from cart"
              >
                <FaTrash />
              </button>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div style={{ position: 'sticky', top: '20px', height: 'fit-content' }}>
          <div
            style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              padding: '25px',
              boxShadow: 'var(--shadow)'
            }}
          >
            <h2 style={{ marginBottom: '20px', fontSize: '22px' }}>Order Summary</h2>

            <div style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '15px', marginBottom: '15px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <span style={{ color: 'var(--text-light)' }}>Subtotal</span>
                <span style={{ fontWeight: '600' }}>₹{cart.subtotal}</span>
              </div>

              {cart.discount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <span style={{ color: 'var(--text-light)' }}>Discount</span>
                  <span style={{ fontWeight: '600', color: '#28a745' }}>-₹{cart.discount}</span>
                </div>
              )}

              {cart.tax > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <span style={{ color: 'var(--text-light)' }}>Tax</span>
                  <span style={{ fontWeight: '600' }}>₹{cart.tax}</span>
                </div>
              )}

              {cart.shipping > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-light)' }}>Shipping</span>
                  <span style={{ fontWeight: '600' }}>₹{cart.shipping}</span>
                </div>
              )}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '25px', fontSize: '20px' }}>
              <span style={{ fontWeight: '700' }}>Total</span>
              <span style={{ fontWeight: '700', color: 'var(--secondary-color)' }}>
                ₹{cart.totalAmount}
              </span>
            </div>

            <button
              onClick={() => navigate('/checkout')}
              className="btn btn-primary"
              style={{ width: '100%', padding: '15px', fontSize: '16px' }}
            >
              Proceed to Checkout
            </button>

            <button
              onClick={() => navigate('/products')}
              style={{
                width: '100%',
                padding: '15px',
                marginTop: '10px',
                backgroundColor: 'transparent',
                border: '2px solid var(--secondary-color)',
                color: 'var(--secondary-color)',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '16px'
              }}
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
