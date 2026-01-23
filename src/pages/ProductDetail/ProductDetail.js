import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaStar, FaHeart, FaShoppingCart, FaRegHeart } from 'react-icons/fa';
import { toast } from 'react-toastify';
import api from '../../utils/api';
import { getProductById } from '../../data/dummyData';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addToCart } = useCart();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isInWishlist, setIsInWishlist] = useState(false);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const { data } = await api.get(`/products/${id}`);
      setProduct(data.product);
      setSelectedImage(0);
    } catch (error) {
      console.error('Error fetching product:', error);
      // Use dummy data as fallback
      const dummyProduct = getProductById(id);
      if (dummyProduct) {
        setProduct(dummyProduct);
      } else {
        toast.error('Product not found');
        navigate('/products');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    if (!user) {
      toast.info('Please login to add items to cart');
      navigate('/login');
      return;
    }

    try {
      await addToCart(product._id, quantity);
      toast.success('Added to cart!');
    } catch (error) {
      toast.error(error.message || 'Failed to add to cart');
    }
  };

  const handleToggleWishlist = async () => {
    if (!user) {
      toast.info('Please login to manage wishlist');
      navigate('/login');
      return;
    }

    try {
      if (isInWishlist) {
        await api.delete(`/wishlist/${product._id}`);
        setIsInWishlist(false);
        toast.success('Removed from wishlist');
      } else {
        await api.post('/wishlist', { productId: product._id });
        setIsInWishlist(true);
        toast.success('Added to wishlist');
      }
    } catch (error) {
      toast.error(error.message || 'Failed to update wishlist');
    }
  };

  if (loading) {
    return <div className="spinner" style={{ margin: '100px auto' }}></div>;
  }

  if (!product) {
    return (
      <div className="container" style={{ padding: '100px 20px', textAlign: 'center' }}>
        <h2>Product not found</h2>
        <button className="btn btn-primary" onClick={() => navigate('/products')}>
          Back to Products
        </button>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '40px 20px' }}>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr 1fr', 
        gap: '40px',
        marginBottom: '60px'
      }}>
        {/* Product Images */}
        <div>
          <div style={{
            backgroundColor: '#f5f5f5',
            borderRadius: '12px',
            overflow: 'hidden',
            marginBottom: '15px',
            aspectRatio: '1/1'
          }}>
            <img
              src={product.images[selectedImage]?.url || 'https://via.placeholder.com/600'}
              alt={product.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
          
          {product.images && product.images.length > 1 && (
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(4, 1fr)', 
              gap: '10px' 
            }}>
              {product.images.map((image, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  style={{
                    backgroundColor: '#f5f5f5',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    border: selectedImage === index ? '3px solid var(--secondary-color)' : 'none',
                    aspectRatio: '1/1'
                  }}
                >
                  <img
                    src={image.url}
                    alt={`${product.name} ${index + 1}`}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div>
          <h1 style={{ marginBottom: '10px', color: 'var(--accent-color)' }}>{product.name}</h1>
          
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '10px',
            marginBottom: '20px'
          }}>
            <div style={{ display: 'flex', gap: '3px' }}>
              {[...Array(5)].map((_, i) => (
                <FaStar 
                  key={i} 
                  color={i < Math.round(product.rating || 0) ? '#ffa500' : '#ddd'}
                  size={18}
                />
              ))}
            </div>
            <span style={{ color: 'var(--text-light)' }}>
              ({product.numReviews || 0} reviews)
            </span>
          </div>

          <div style={{ 
            fontSize: '32px', 
            fontWeight: '700', 
            color: 'var(--secondary-color)',
            marginBottom: '20px'
          }}>
            ₹{product.price}
          </div>

          <p style={{ 
            color: 'var(--text-light)', 
            lineHeight: '1.6',
            marginBottom: '30px'
          }}>
            {product.description}
          </p>

          {product.customizationOptions && product.customizationOptions.length > 0 && (
            <div style={{ marginBottom: '20px' }}>
              <strong>Customization Options:</strong>
              <div style={{ display: 'flex', gap: '10px', marginTop: '10px', flexWrap: 'wrap' }}>
                {product.customizationOptions.map((option, index) => (
                  <span
                    key={index}
                    style={{
                      padding: '8px 16px',
                      backgroundColor: '#f5f5f5',
                      borderRadius: '20px',
                      fontSize: '14px',
                      color: 'var(--text-color)'
                    }}
                  >
                    {option}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '10px',
            marginBottom: '20px'
          }}>
            <strong>Quantity:</strong>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                style={{
                  width: '35px',
                  height: '35px',
                  borderRadius: '50%',
                  border: '2px solid var(--secondary-color)',
                  backgroundColor: 'white',
                  color: 'var(--secondary-color)',
                  fontSize: '20px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                -
              </button>
              <span style={{ fontSize: '18px', fontWeight: '600', minWidth: '30px', textAlign: 'center' }}>
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                style={{
                  width: '35px',
                  height: '35px',
                  borderRadius: '50%',
                  border: '2px solid var(--secondary-color)',
                  backgroundColor: 'white',
                  color: 'var(--secondary-color)',
                  fontSize: '20px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                +
              </button>
            </div>
            <span style={{ color: 'var(--text-light)', fontSize: '14px' }}>
              ({product.stock} available)
            </span>
          </div>

          <div style={{ display: 'flex', gap: '15px', marginTop: '30px' }}>
            <button
              onClick={handleAddToCart}
              className="btn btn-primary"
              style={{ 
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                padding: '15px'
              }}
            >
              <FaShoppingCart />
              Add to Cart
            </button>
            
            <button
              onClick={handleToggleWishlist}
              className="btn"
              style={{
                padding: '15px 20px',
                backgroundColor: 'white',
                border: '2px solid var(--secondary-color)',
                color: 'var(--secondary-color)',
                fontSize: '20px'
              }}
            >
              {isInWishlist ? <FaHeart /> : <FaRegHeart />}
            </button>
          </div>

          {product.stock < 5 && product.stock > 0 && (
            <div style={{
              marginTop: '20px',
              padding: '12px',
              backgroundColor: '#fff3cd',
              color: '#856404',
              borderRadius: '8px',
              fontSize: '14px'
            }}>
              Only {product.stock} left in stock!
            </div>
          )}

          {product.stock === 0 && (
            <div style={{
              marginTop: '20px',
              padding: '12px',
              backgroundColor: '#f8d7da',
              color: '#721c24',
              borderRadius: '8px',
              fontSize: '14px'
            }}>
              Out of stock
            </div>
          )}
        </div>
      </div>

      {/* Reviews Section */}
      <div style={{ 
        backgroundColor: 'white', 
        padding: '30px', 
        borderRadius: '12px',
        boxShadow: 'var(--shadow)'
      }}>
        <h2 style={{ marginBottom: '20px' }}>Customer Reviews</h2>
        <p style={{ color: 'var(--text-light)' }}>
          Reviews will be displayed here once implemented.
        </p>
      </div>
    </div>
  );
};

export default ProductDetail;
