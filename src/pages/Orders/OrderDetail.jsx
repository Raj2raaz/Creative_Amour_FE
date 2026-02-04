import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaBox, FaCheckCircle, FaTruck, FaClock, FaTimes, FaArrowLeft } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import api from '../../utils/api';

const OrderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      toast.error('Please login to view order details');
      navigate('/login');
      return;
    }
    fetchOrderDetails();
  }, [id, user, navigate]);

  const fetchOrderDetails = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/orders/${id}`);
      if (response.data.success) {
        setOrder(response.data.order);
      }
    } catch (error) {
      toast.error('Failed to fetch order details');
      console.error(error);
      navigate('/orders');
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <FaClock className="text-yellow-500 text-2xl" />;
      case 'processing':
        return <FaBox className="text-blue-500 text-2xl" />;
      case 'shipped':
        return <FaTruck className="text-purple-500 text-2xl" />;
      case 'delivered':
        return <FaCheckCircle className="text-green-500 text-2xl" />;
      case 'cancelled':
        return <FaTimes className="text-red-500 text-2xl" />;
      default:
        return <FaClock className="text-gray-500 text-2xl" />;
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
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fef8f5] flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary"></div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-[#fef8f5] flex flex-col items-center justify-center">
        <FaBox size={64} className="text-gray-400 mb-5" />
        <h2 className="text-3xl font-bold text-gray-800 mb-3">Order Not Found</h2>
        <button
          onClick={() => navigate('/orders')}
          className="px-8 py-3 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-lg hover:opacity-90 transition-opacity"
        >
          Back to Orders
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fef8f5] py-10 px-5">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate('/orders')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6 font-medium"
        >
          <FaArrowLeft /> Back to Orders
        </button>

        {/* Order Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-800 mb-2">Order Details</h1>
              <p className="text-gray-600">Order #{order.orderNumber}</p>
              <p className="text-sm text-gray-500">Placed on {formatDate(order.createdAt)}</p>
            </div>
            <span className={`px-6 py-3 rounded-full text-base font-semibold border flex items-center gap-2 ${getStatusColor(order.orderStatus)}`}>
              {getStatusIcon(order.orderStatus)}
              {order.orderStatus.charAt(0).toUpperCase() + order.orderStatus.slice(1)}
            </span>
          </div>

          {/* Order Timeline */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="font-semibold text-gray-800 mb-4">Order Timeline</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white">
                  <FaCheckCircle />
                </div>
                <div>
                  <p className="font-semibold text-gray-800">Order Placed</p>
                  <p className="text-sm text-gray-600">{formatDate(order.createdAt)}</p>
                </div>
              </div>

              {order.orderStatus !== 'cancelled' && (
                <>
                  <div className="flex items-start gap-4">
                    <div className={`w-8 h-8 rounded-full ${order.orderStatus === 'processing' || order.orderStatus === 'shipped' || order.orderStatus === 'delivered' ? 'bg-blue-500' : 'bg-gray-300'} flex items-center justify-center text-white`}>
                      <FaBox />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">Processing</p>
                      <p className="text-sm text-gray-600">
                        {order.orderStatus === 'processing' || order.orderStatus === 'shipped' || order.orderStatus === 'delivered' ? 'Order is being prepared' : 'Pending'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className={`w-8 h-8 rounded-full ${order.orderStatus === 'shipped' || order.orderStatus === 'delivered' ? 'bg-purple-500' : 'bg-gray-300'} flex items-center justify-center text-white`}>
                      <FaTruck />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">Shipped</p>
                      <p className="text-sm text-gray-600">
                        {order.orderStatus === 'shipped' || order.orderStatus === 'delivered' ? 'Order is on the way' : 'Pending'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className={`w-8 h-8 rounded-full ${order.orderStatus === 'delivered' ? 'bg-green-500' : 'bg-gray-300'} flex items-center justify-center text-white`}>
                      <FaCheckCircle />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">Delivered</p>
                      <p className="text-sm text-gray-600">
                        {order.orderStatus === 'delivered' ? formatDate(order.deliveredAt) : 'Pending'}
                      </p>
                    </div>
                  </div>
                </>
              )}

              {order.orderStatus === 'cancelled' && (
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center text-white">
                    <FaTimes />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">Order Cancelled</p>
                    <p className="text-sm text-gray-600">{formatDate(order.cancelledAt)}</p>
                    {order.cancellationReason && (
                      <p className="text-sm text-gray-500 mt-1">Reason: {order.cancellationReason}</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-6">
          <h3 className="font-semibold text-gray-800 mb-4">Items Ordered</h3>
          <div className="space-y-4">
            {order.items.map((item, index) => (
              <div key={index} className="flex gap-4 pb-4 border-b border-gray-200 last:border-0">
                <img
                  src={item.image?.url || (typeof item.image === 'string' ? item.image : null) || 'https://via.placeholder.com/100?text=No+Image'}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-800">{item.name}</h4>
                  <p className="text-gray-600 mt-1">Quantity: {item.quantity}</p>
                  <p className="text-primary font-semibold mt-2">₹{(item.price * item.quantity).toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Shipping Address */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="font-semibold text-gray-800 mb-4">Shipping Address</h3>
            <div className="text-gray-600 space-y-1">
              <p className="font-semibold text-gray-800">{order.shippingAddress?.fullName}</p>
              <p>{order.shippingAddress?.phone}</p>
              <p>{order.shippingAddress?.address}</p>
              <p>{order.shippingAddress?.city}, {order.shippingAddress?.state}</p>
              <p>{order.shippingAddress?.pincode}</p>
            </div>
          </div>

          {/* Payment & Price Summary */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="font-semibold text-gray-800 mb-4">Payment Information</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Payment Method</span>
                <span className="font-semibold text-gray-800">
                  {order.paymentInfo?.method === 'razorpay' ? 'Online Payment' : 'Cash on Delivery'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Payment Status</span>
                <span className={`font-semibold ${order.paymentInfo?.status === 'completed' ? 'text-green-600' : 'text-yellow-600'}`}>
                  {order.paymentInfo?.status === 'completed' ? 'Paid' : 'Pending'}
                </span>
              </div>

              <div className="border-t border-gray-200 pt-3 mt-3">
                <div className="flex justify-between text-gray-600 mb-2">
                  <span>Subtotal</span>
                  <span>₹{order.subtotal?.toLocaleString()}</span>
                </div>
                {order.shippingCharges > 0 && (
                  <div className="flex justify-between text-gray-600 mb-2">
                    <span>Shipping</span>
                    <span>₹{order.shippingCharges?.toLocaleString()}</span>
                  </div>
                )}
                {order.tax > 0 && (
                  <div className="flex justify-between text-gray-600 mb-2">
                    <span>Tax</span>
                    <span>₹{order.tax?.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between text-lg font-bold text-gray-800 pt-2 border-t border-gray-300">
                  <span>Total</span>
                  <span className="text-primary">₹{order.totalAmount?.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Button */}
        {(order.orderStatus === 'pending' || order.orderStatus === 'processing') && (
          <div className="mt-6">
            <button
              onClick={() => {
                if (window.confirm('Are you sure you want to cancel this order?')) {
                  toast.info('Cancel order feature coming soon!');
                }
              }}
              className="w-full md:w-auto px-8 py-3 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-colors"
            >
              Cancel Order
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderDetail;
