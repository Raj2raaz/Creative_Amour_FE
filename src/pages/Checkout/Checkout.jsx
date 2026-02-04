import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaShoppingBag, FaCreditCard, FaMoneyBillWave, FaCheckCircle, FaPlus, FaEdit, FaTrash, FaMapMarkerAlt } from 'react-icons/fa';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import api from '../../utils/api';

const Checkout = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { cart, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [loadingAddresses, setLoadingAddresses] = useState(true);
  const [step, setStep] = useState(1); // 1: Shipping, 2: Payment, 3: Confirmation
  
  const [savedAddresses, setSavedAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [showNewAddressForm, setShowNewAddressForm] = useState(false);
  
  const [shippingInfo, setShippingInfo] = useState({
    fullName: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    country: 'India'
  });

  const [paymentMethod, setPaymentMethod] = useState('online'); // online or cod
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState(null);

  useEffect(() => {
    if (!user) {
      toast.error('Please login to checkout');
      navigate('/login');
      return;
    }

    if (!cart || !cart.items || cart.items.length === 0) {
      toast.error('Your cart is empty');
      navigate('/cart');
      return;
    }

    // Fetch saved addresses
    fetchAddresses();
  }, [user, cart, navigate]);

  const fetchAddresses = async () => {
    try {
      setLoadingAddresses(true);
      const response = await api.get('/addresses');
      if (response.data.success) {
        setSavedAddresses(response.data.addresses);
        // Auto-select default address
        const defaultAddr = response.data.addresses.find(addr => addr.isDefault);
        if (defaultAddr) {
          setSelectedAddressId(defaultAddr._id);
          setShippingInfo({
            fullName: defaultAddr.fullName,
            phone: defaultAddr.phone,
            address: defaultAddr.address,
            city: defaultAddr.city,
            state: defaultAddr.state,
            pincode: defaultAddr.pincode,
            country: 'India'
          });
        } else if (response.data.addresses.length === 0) {
          setShowNewAddressForm(true);
        }
      }
    } catch (error) {
      console.error('Error fetching addresses:', error);
      setShowNewAddressForm(true);
    } finally {
      setLoadingAddresses(false);
    }
  };

  const handleSelectAddress = (address) => {
    setSelectedAddressId(address._id);
    setShippingInfo({
      fullName: address.fullName,
      phone: address.phone,
      address: address.address,
      city: address.city,
      state: address.state,
      pincode: address.pincode,
      country: 'India'
    });
    setShowNewAddressForm(false);
  };

  const handleDeleteAddress = async (addressId) => {
    if (!window.confirm('Delete this address?')) return;
    
    try {
      const response = await api.delete(`/addresses/${addressId}`);
      if (response.data.success) {
        toast.success('Address deleted');
        setSavedAddresses(response.data.addresses);
        if (selectedAddressId === addressId) {
          setSelectedAddressId(null);
          const newDefault = response.data.addresses.find(addr => addr.isDefault);
          if (newDefault) {
            handleSelectAddress(newDefault);
          } else {
            setShowNewAddressForm(true);
          }
        }
      }
    } catch (error) {
      toast.error('Failed to delete address');
    }
  };

  const handleSaveNewAddress = async () => {
    if (!validateShipping()) return;
    
    try {
      const response = await api.post('/addresses', {
        ...shippingInfo,
        isDefault: savedAddresses.length === 0
      });
      if (response.data.success) {
        toast.success('Address saved');
        setSavedAddresses(response.data.addresses);
        const newAddr = response.data.addresses[response.data.addresses.length - 1];
        setSelectedAddressId(newAddr._id);
        setShowNewAddressForm(false);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to save address');
    }
  };

  const handleInputChange = (e) => {
    setShippingInfo({
      ...shippingInfo,
      [e.target.name]: e.target.value
    });
  };

  const validateShipping = () => {
    const { fullName, phone, address, city, state, pincode } = shippingInfo;
    
    if (!fullName.trim()) {
      toast.error('Please enter your full name');
      return false;
    }
    if (!phone.trim() || phone.length < 10) {
      toast.error('Please enter a valid phone number');
      return false;
    }
    if (!address.trim()) {
      toast.error('Please enter your address');
      return false;
    }
    if (!city.trim()) {
      toast.error('Please enter your city');
      return false;
    }
    if (!state.trim()) {
      toast.error('Please enter your state');
      return false;
    }
    if (!pincode.trim() || pincode.length !== 6) {
      toast.error('Please enter a valid 6-digit pincode');
      return false;
    }
    
    return true;
  };

  const handleContinueToPayment = (e) => {
    e.preventDefault();
    if (validateShipping()) {
      setStep(2);
    }
  };

  const calculateTotal = () => {
    if (!cart || !cart.items) return 0;
    return cart.items.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  };

  const handleRazorpayPayment = async (orderData) => {
    try {
      const options = {
        key: 'rzp_test_S6edd6ao475dhW', // Razorpay Key ID
        amount: orderData.razorpayOrder.amount,
        currency: 'INR',
        name: 'Creative Amour',
        description: 'Purchase from Creative Amour',
        order_id: orderData.razorpayOrder.id,
        handler: async function (response) {
          try {
            // Verify payment
            const verifyRes = await api.post('/orders/verify-payment', {
              orderId: orderData.order._id,
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature
            });

            if (verifyRes.data.success) {
              await clearCart();
              setOrderId(orderData.order._id);
              setOrderPlaced(true);
              setStep(3);
              toast.success('Payment successful! Order placed.');
            }
          } catch (error) {
            toast.error('Payment verification failed');
            console.error(error);
          }
        },
        prefill: {
          name: shippingInfo.fullName,
          contact: shippingInfo.phone
        },
        theme: {
          color: '#ffbe98'
        }
      };

      const razorpay = new window.Razorpay(options);
      razorpay.on('payment.failed', function (response) {
        toast.error('Payment failed. Please try again.');
        console.error(response.error);
      });
      razorpay.open();
    } catch (error) {
      toast.error('Failed to initialize payment');
      console.error(error);
    }
  };

  const handlePlaceOrder = async () => {
    if (!validateShipping()) {
      setStep(1);
      return;
    }

    setLoading(true);
    try {
      const total = calculateTotal();
      
      // Debug: Check image structure
      console.log('Cart items:', cart.items);
      if (cart.items.length > 0) {
        console.log('First item images array:', cart.items[0].product.images);
        console.log('First image object:', cart.items[0].product.images?.[0]);
        console.log('Image URL:', cart.items[0].product.images?.[0]?.url);
      }
      
      const orderData = {
        items: cart.items.map(item => {
          const imageUrl = item.product.images?.[0]?.url || 'https://via.placeholder.com/100?text=No+Image';
          console.log('Processing item:', item.product.name, 'Image URL:', imageUrl);
          return {
            product: item.product._id,
            name: item.product.name,
            image: imageUrl,
            quantity: item.quantity,
            price: item.product.price
          };
        }),
        shippingAddress: {
          fullName: shippingInfo.fullName,
          phone: shippingInfo.phone,
          address: shippingInfo.address,
          city: shippingInfo.city,
          state: shippingInfo.state,
          pincode: shippingInfo.pincode
        },
        paymentMethod: paymentMethod === 'online' ? 'razorpay' : 'cod',
        subtotal: total,
        shippingCharges: 0,
        tax: 0,
        totalAmount: total
      };

      console.log('Sending order data:', orderData);

      const response = await api.post('/orders', orderData);

      if (response.data.success) {
        if (paymentMethod === 'online') {
          // Open Razorpay payment modal
          handleRazorpayPayment(response.data);
        } else {
          // COD order
          await clearCart();
          setOrderId(response.data.order._id);
          setOrderPlaced(true);
          setStep(3);
          toast.success('Order placed successfully!');
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to place order');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (!cart || !cart.items || cart.items.length === 0) {
    return null;
  }

  // Order Confirmation Step
  if (step === 3 && orderPlaced) {
    return (
      <div className="min-h-screen bg-[#fef8f5] py-10 px-5">
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8 text-center">
          <FaCheckCircle className="text-green-500 text-6xl mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Order Placed Successfully!</h1>
          <p className="text-gray-600 mb-2">Thank you for your order.</p>
          <p className="text-gray-600 mb-8">Order ID: <span className="font-semibold">{orderId}</span></p>
          
          <div className="bg-gray-50 rounded-lg p-6 mb-6 text-left">
            <h3 className="font-semibold text-gray-800 mb-3">Shipping Address:</h3>
            <p className="text-gray-600">{shippingInfo.fullName}</p>
            <p className="text-gray-600">{shippingInfo.phone}</p>
            <p className="text-gray-600">{shippingInfo.address}</p>
            <p className="text-gray-600">{shippingInfo.city}, {shippingInfo.state} - {shippingInfo.pincode}</p>
          </div>

          <div className="flex gap-4 justify-center">
            <button
              onClick={() => navigate('/orders')}
              className="px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-lg hover:opacity-90 transition-opacity"
            >
              View Orders
            </button>
            <button
              onClick={() => navigate('/products')}
              className="px-6 py-3 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fef8f5] py-10 px-5">
      <div className="max-w-6xl mx-auto">
        {/* Progress Steps */}
        <div className="flex justify-center items-center mb-8">
          <div className="flex items-center">
            <div className={`flex items-center justify-center w-10 h-10 rounded-full ${step >= 1 ? 'bg-gradient-to-r from-primary to-secondary text-white' : 'bg-gray-300 text-gray-600'} font-semibold`}>
              1
            </div>
            <span className={`ml-2 mr-8 ${step >= 1 ? 'text-gray-800' : 'text-gray-400'} font-medium`}>Shipping</span>
            
            <div className={`h-1 w-16 ${step >= 2 ? 'bg-gradient-to-r from-primary to-secondary' : 'bg-gray-300'} mx-2`}></div>
            
            <div className={`flex items-center justify-center w-10 h-10 rounded-full ${step >= 2 ? 'bg-gradient-to-r from-primary to-secondary text-white' : 'bg-gray-300 text-gray-600'} font-semibold`}>
              2
            </div>
            <span className={`ml-2 ${step >= 2 ? 'text-gray-800' : 'text-gray-400'} font-medium`}>Payment</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {step === 1 && (
              <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">Shipping Information</h2>
                  {savedAddresses.length > 0 && !showNewAddressForm && (
                    <button
                      onClick={() => setShowNewAddressForm(true)}
                      className="flex items-center gap-2 px-4 py-2 text-primary border-2 border-primary rounded-lg hover:bg-primary hover:text-white transition-colors"
                    >
                      <FaPlus /> Add New Address
                    </button>
                  )}
                </div>

                {loadingAddresses ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-primary mx-auto"></div>
                  </div>
                ) : (
                  <>
                    {/* Saved Addresses */}
                    {savedAddresses.length > 0 && !showNewAddressForm && (
                      <div className="space-y-3 mb-6">
                        <p className="text-gray-600 font-medium mb-3">Select a delivery address:</p>
                        {savedAddresses.map((addr) => (
                          <div
                            key={addr._id}
                            onClick={() => handleSelectAddress(addr)}
                            className={`border-2 ${selectedAddressId === addr._id ? 'border-primary bg-primary/5' : 'border-gray-300'} rounded-lg p-4 cursor-pointer transition-all hover:border-primary relative`}
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                  <input
                                    type="radio"
                                    checked={selectedAddressId === addr._id}
                                    onChange={() => handleSelectAddress(addr)}
                                    className="mr-2"
                                  />
                                  <FaMapMarkerAlt className="text-primary" />
                                  <p className="font-semibold text-gray-800">{addr.fullName}</p>
                                  {addr.isDefault && (
                                    <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full">Default</span>
                                  )}
                                </div>
                                <p className="text-gray-600 text-sm ml-8">{addr.phone}</p>
                                <p className="text-gray-600 text-sm ml-8">{addr.address}</p>
                                <p className="text-gray-600 text-sm ml-8">{addr.city}, {addr.state} - {addr.pincode}</p>
                              </div>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDeleteAddress(addr._id);
                                }}
                                className="text-red-500 hover:text-red-700 p-2"
                              >
                                <FaTrash />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* New Address Form */}
                    {(showNewAddressForm || savedAddresses.length === 0) && (
                      <form onSubmit={handleContinueToPayment} className="space-y-4">
                        {savedAddresses.length > 0 && (
                          <div className="flex justify-between items-center mb-4">
                            <p className="text-gray-700 font-medium">Enter new address:</p>
                            <button
                              type="button"
                              onClick={() => {
                                setShowNewAddressForm(false);
                                if (savedAddresses.length > 0) {
                                  const defaultAddr = savedAddresses.find(a => a.isDefault) || savedAddresses[0];
                                  handleSelectAddress(defaultAddr);
                                }
                              }}
                              className="text-gray-600 hover:text-gray-800"
                            >
                              Cancel
                            </button>
                          </div>
                        )}

                        <div>
                          <label className="block text-gray-700 font-medium mb-2">Full Name *</label>
                          <input
                            type="text"
                            name="fullName"
                            value={shippingInfo.fullName}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                            placeholder="Enter your full name"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-gray-700 font-medium mb-2">Phone Number *</label>
                          <input
                            type="tel"
                            name="phone"
                            value={shippingInfo.phone}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                            placeholder="10-digit mobile number"
                            maxLength="10"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-gray-700 font-medium mb-2">Address *</label>
                          <textarea
                            name="address"
                            value={shippingInfo.address}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                            placeholder="House No., Street, Landmark"
                            rows="3"
                            required
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-gray-700 font-medium mb-2">City *</label>
                            <input
                              type="text"
                              name="city"
                              value={shippingInfo.city}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                              placeholder="City"
                              required
                            />
                          </div>

                          <div>
                            <label className="block text-gray-700 font-medium mb-2">State *</label>
                            <input
                              type="text"
                              name="state"
                              value={shippingInfo.state}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                              placeholder="State"
                              required
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-gray-700 font-medium mb-2">Pincode *</label>
                            <input
                              type="text"
                              name="pincode"
                              value={shippingInfo.pincode}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                              placeholder="6-digit pincode"
                              maxLength="6"
                              required
                            />
                          </div>

                          <div>
                            <label className="block text-gray-700 font-medium mb-2">Country</label>
                            <input
                              type="text"
                              name="country"
                              value={shippingInfo.country}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50"
                              disabled
                            />
                          </div>
                        </div>

                        {showNewAddressForm && savedAddresses.length > 0 && (
                          <button
                            type="button"
                            onClick={handleSaveNewAddress}
                            className="w-full py-3 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 transition-colors mb-2"
                          >
                            Save Address
                          </button>
                        )}

                        <button
                          type="submit"
                          className="w-full mt-2 py-3 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-lg hover:opacity-90 transition-opacity"
                        >
                          Continue to Payment
                        </button>
                      </form>
                    )}

                    {/* Continue button for saved address selection */}
                    {!showNewAddressForm && savedAddresses.length > 0 && selectedAddressId && (
                      <button
                        onClick={handleContinueToPayment}
                        className="w-full py-3 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-lg hover:opacity-90 transition-opacity"
                      >
                        Continue to Payment
                      </button>
                    )}
                  </>
                )}
              </div>
            )}

            {step === 2 && (
              <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">Payment Method</h2>
                  <button
                    onClick={() => setStep(1)}
                    className="text-primary hover:text-secondary font-medium"
                  >
                    Edit Shipping
                  </button>
                </div>

                {/* Shipping Address Preview */}
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <h3 className="font-semibold text-gray-800 mb-2">Shipping To:</h3>
                  <p className="text-gray-600 text-sm">{shippingInfo.fullName} | {shippingInfo.phone}</p>
                  <p className="text-gray-600 text-sm">{shippingInfo.address}, {shippingInfo.city}</p>
                  <p className="text-gray-600 text-sm">{shippingInfo.state} - {shippingInfo.pincode}</p>
                </div>

                {/* Payment Options */}
                <div className="space-y-4 mb-6">
                  <div
                    onClick={() => setPaymentMethod('online')}
                    className={`border-2 ${paymentMethod === 'online' ? 'border-primary bg-primary/5' : 'border-gray-300'} rounded-lg p-4 cursor-pointer transition-all hover:border-primary`}
                  >
                    <div className="flex items-center">
                      <input
                        type="radio"
                        checked={paymentMethod === 'online'}
                        onChange={() => setPaymentMethod('online')}
                        className="mr-3"
                      />
                      <FaCreditCard className="text-primary text-2xl mr-3" />
                      <div>
                        <p className="font-semibold text-gray-800">Online Payment</p>
                        <p className="text-sm text-gray-600">Pay via Razorpay (Card/UPI/Netbanking)</p>
                      </div>
                    </div>
                  </div>

                  <div
                    onClick={() => setPaymentMethod('cod')}
                    className={`border-2 ${paymentMethod === 'cod' ? 'border-primary bg-primary/5' : 'border-gray-300'} rounded-lg p-4 cursor-pointer transition-all hover:border-primary`}
                  >
                    <div className="flex items-center">
                      <input
                        type="radio"
                        checked={paymentMethod === 'cod'}
                        onChange={() => setPaymentMethod('cod')}
                        className="mr-3"
                      />
                      <FaMoneyBillWave className="text-green-600 text-2xl mr-3" />
                      <div>
                        <p className="font-semibold text-gray-800">Cash on Delivery</p>
                        <p className="text-sm text-gray-600">Pay when you receive</p>
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handlePlaceOrder}
                  disabled={loading}
                  className="w-full py-3 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Processing...' : `Place Order - ₹${calculateTotal().toLocaleString()}`}
                </button>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-5">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Order Summary</h3>
              
              <div className="space-y-3 mb-4 max-h-60 overflow-y-auto">
                {cart.items.map((item) => (
                  <div key={item._id} className="flex gap-3 pb-3 border-b border-gray-200">
                    <img
                      src={item.product.images?.[0]?.url || 'https://via.placeholder.com/80?text=No+Image'}
                      alt={item.product.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-gray-800 text-sm">{item.product.name}</p>
                      <p className="text-gray-600 text-sm">Qty: {item.quantity}</p>
                      <p className="text-primary font-semibold">₹{(item.product.price * item.quantity).toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-2 border-t border-gray-300 pt-4">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>₹{calculateTotal().toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="text-green-600 font-medium">FREE</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-gray-800 pt-2 border-t border-gray-300">
                  <span>Total</span>
                  <span className="text-primary">₹{calculateTotal().toLocaleString()}</span>
                </div>
              </div>

              <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-3">
                <p className="text-green-700 text-sm text-center">
                  🎉 You're getting FREE delivery on this order!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
