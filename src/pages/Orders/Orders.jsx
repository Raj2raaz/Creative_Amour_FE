import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaBox, FaShippingFast, FaCheckCircle, FaTruck, FaClock, FaTimes } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import api from '../../utils/api';

const Orders = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    if (!user) {
      toast.error('Please login to view orders');
      navigate('/login');
      return;
    }
    fetchOrders();
  }, [user, navigate]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await api.get('/orders');
      if (response.data.success) {
        console.log('Fetched orders:', response.data.orders);
        if (response.data.orders.length > 0) {
          console.log('First order items:', response.data.orders[0].items);
          console.log('First item image:', response.data.orders[0].items[0]?.image);
        }
        setOrders(response.data.orders);
      }
    } catch (error) {
      toast.error('Failed to fetch orders');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <FaClock className="text-yellow-500" />;
      case 'processing':
        return <FaBox className="text-blue-500" />;
      case 'shipped':
        return <FaTruck className="text-purple-500" />;
      case 'delivered':
        return <FaCheckCircle className="text-green-500" />;
      case 'cancelled':
        return <FaTimes className="text-red-500" />;
      default:
        return <FaClock className="text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'processing':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'shipped':
        return 'bg-purple-100 text-purple-800 border-purple-300';
      case 'delivered':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fef8f5] flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary"></div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-[#fef8f5] flex flex-col items-center justify-center py-20 px-5">
        <FaBox size={64} className="text-gray-400 mb-5" />
        <h2 className="text-3xl font-bold text-gray-800 mb-3">No Orders Yet</h2>
        <p className="text-gray-600 mb-8 text-center max-w-md">
          Start shopping and your orders will appear here!
        </p>
        <button
          onClick={() => navigate('/products')}
          className="px-8 py-3 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-lg hover:opacity-90 transition-opacity"
        >
          Start Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fef8f5] py-10 px-5">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">My Orders</h1>

        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              {/* Order Header */}
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                <div className="flex flex-wrap justify-between items-center gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Order Number</p>
                    <p className="font-semibold text-gray-800">{order.orderNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Order Date</p>
                    <p className="font-semibold text-gray-800">{formatDate(order.createdAt)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Total Amount</p>
                    <p className="font-semibold text-primary">₹{order.totalAmount?.toLocaleString()}</p>
                  </div>
                  <div>
                    <span className={`px-4 py-2 rounded-full text-sm font-semibold border flex items-center gap-2 ${getStatusColor(order.orderStatus)}`}>
                      {getStatusIcon(order.orderStatus)}
                      {order.orderStatus.charAt(0).toUpperCase() + order.orderStatus.slice(1)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="p-6">
                <div className="space-y-3">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex gap-4 items-center">
                      <img
                        src={item.image?.url || (typeof item.image === 'string' ? item.image : null) || 'https://via.placeholder.com/80?text=No+Image'}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800">{item.name}</h3>
                        <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                        <p className="text-primary font-semibold">₹{item.price?.toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Shipping Address */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h4 className="font-semibold text-gray-800 mb-2">Shipping Address</h4>
                  <p className="text-gray-600 text-sm">{order.shippingAddress?.fullName}</p>
                  <p className="text-gray-600 text-sm">{order.shippingAddress?.phone}</p>
                  <p className="text-gray-600 text-sm">{order.shippingAddress?.address}</p>
                  <p className="text-gray-600 text-sm">
                    {order.shippingAddress?.city}, {order.shippingAddress?.state} - {order.shippingAddress?.pincode}
                  </p>
                </div>

                {/* Payment Info */}
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-600">Payment Method</p>
                      <p className="font-semibold text-gray-800">
                        {order.paymentInfo?.method === 'razorpay' ? 'Online Payment' : 'Cash on Delivery'}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Payment Status</p>
                      <p className={`font-semibold ${order.paymentInfo?.status === 'completed' ? 'text-green-600' : 'text-yellow-600'}`}>
                        {order.paymentInfo?.status === 'completed' ? 'Paid' : 'Pending'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-6 flex gap-3">
                  <button
                    onClick={() => navigate(`/orders/${order._id}`)}
                    className="flex-1 py-2 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-lg hover:opacity-90 transition-opacity"
                  >
                    View Details
                  </button>
                  {(order.orderStatus === 'pending' || order.orderStatus === 'processing') && (
                    <button
                      onClick={() => {
                        if (window.confirm('Are you sure you want to cancel this order?')) {
                          // Add cancel order logic here
                          toast.info('Cancel order feature coming soon!');
                        }
                      }}
                      className="px-6 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-colors"
                    >
                      Cancel Order
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Orders;
