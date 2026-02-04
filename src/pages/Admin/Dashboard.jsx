import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingBag, FaUsers, FaBoxOpen, FaDollarSign, FaExclamationTriangle, FaClock, FaTruck, FaCheckCircle } from 'react-icons/fa';
import api from '../../utils/api';
import { toast } from 'react-toastify';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalUsers: 0,
    totalRevenue: 0,
    pendingOrders: 0,
    processingOrders: 0,
    shippedOrders: 0,
    deliveredOrders: 0,
    recentOrders: [],
    lowStockProducts: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const { data } = await api.get('/admin/stats');
      setStats(data.stats);
    } catch (error) {
      toast.error('Failed to load dashboard stats');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Stats cards configuration
  const statsCards = [
    {
      title: 'Total Revenue',
      value: `₹${stats.totalRevenue.toLocaleString()}`,
      icon: FaDollarSign,
      color: 'from-green-400 to-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Total Orders',
      value: stats.totalOrders,
      icon: FaShoppingBag,
      color: 'from-blue-400 to-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Total Products',
      value: stats.totalProducts,
      icon: FaBoxOpen,
      color: 'from-purple-400 to-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Total Users',
      value: stats.totalUsers,
      icon: FaUsers,
      color: 'from-pink-400 to-pink-600',
      bgColor: 'bg-pink-50'
    }
  ];

  const orderStatusCards = [
    {
      title: 'Pending',
      value: stats.pendingOrders,
      icon: FaClock,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50'
    },
    {
      title: 'Processing',
      value: stats.processingOrders,
      icon: FaClock,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Shipped',
      value: stats.shippedOrders,
      icon: FaTruck,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Delivered',
      value: stats.deliveredOrders,
      icon: FaCheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">Welcome back! Here's what's happening with your store today.</p>
        </div>

        {/* Main Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statsCards.map((stat, index) => (
            <div key={index} className={`${stat.bgColor} rounded-lg shadow-md p-6 transition-transform hover:scale-105`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`bg-gradient-to-br ${stat.color} p-3 rounded-lg`}>
                  <stat.icon className="text-white text-2xl" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Status Overview */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Order Status Overview</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {orderStatusCards.map((status, index) => (
              <div key={index} className={`${status.bgColor} rounded-lg p-4 text-center`}>
                <status.icon className={`${status.color} text-3xl mx-auto mb-2`} />
                <p className="text-sm text-gray-600 mb-1">{status.title}</p>
                <p className="text-2xl font-bold text-gray-900">{status.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Orders & Low Stock Products */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Orders */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">Recent Orders</h2>
              <Link to="/admin/orders" className="text-sm text-blue-600 hover:text-blue-800">
                View All →
              </Link>
            </div>
            <div className="space-y-3">
              {stats.recentOrders.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No orders yet</p>
              ) : (
                stats.recentOrders.map((order) => (
                  <div key={order._id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div>
                      <p className="font-semibold text-gray-900">{order.user?.name || 'Guest'}</p>
                      <p className="text-sm text-gray-600">{order.items?.length || 0} items</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-900">₹{order.totalAmount}</p>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        order.orderStatus === 'delivered' ? 'bg-green-100 text-green-800' :
                        order.orderStatus === 'shipped' ? 'bg-purple-100 text-purple-800' :
                        order.orderStatus === 'processing' ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {order.orderStatus}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Low Stock Alert */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <FaExclamationTriangle className="text-orange-500" />
                Low Stock Alert
              </h2>
              <Link to="/admin/products" className="text-sm text-blue-600 hover:text-blue-800">
                View All →
              </Link>
            </div>
            <div className="space-y-3">
              {stats.lowStockProducts.length === 0 ? (
                <p className="text-gray-500 text-center py-8">All products well stocked!</p>
              ) : (
                stats.lowStockProducts.map((product) => (
                  <div key={product._id} className="flex justify-between items-center p-3 bg-orange-50 rounded-lg border border-orange-200">
                    <div>
                      <p className="font-semibold text-gray-900">{product.name}</p>
                      <p className="text-sm text-gray-600">{product.category?.name || 'Uncategorized'}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-orange-600">{product.stock} left</p>
                      <p className="text-xs text-gray-500">₹{product.price}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link to="/admin/products" className="flex flex-col items-center justify-center p-6 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg text-white hover:shadow-lg transition-shadow">
              <FaBoxOpen className="text-3xl mb-2" />
              <span className="font-semibold">Manage Products</span>
            </Link>
            <Link to="/admin/orders" className="flex flex-col items-center justify-center p-6 bg-gradient-to-br from-green-400 to-green-600 rounded-lg text-white hover:shadow-lg transition-shadow">
              <FaShoppingBag className="text-3xl mb-2" />
              <span className="font-semibold">View Orders</span>
            </Link>
            <Link to="/admin/users" className="flex flex-col items-center justify-center p-6 bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg text-white hover:shadow-lg transition-shadow">
              <FaUsers className="text-3xl mb-2" />
              <span className="font-semibold">Manage Users</span>
            </Link>
            <Link to="/admin/categories" className="flex flex-col items-center justify-center p-6 bg-gradient-to-br from-pink-400 to-pink-600 rounded-lg text-white hover:shadow-lg transition-shadow">
              <FaBoxOpen className="text-3xl mb-2" />
              <span className="font-semibold">Categories</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
