import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/AuthContext';

const GoogleCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { setUser, setToken } = useAuth();

  useEffect(() => {
    const token = searchParams.get('token');
    const error = searchParams.get('error');

    if (error) {
      toast.error('Google authentication failed. Please try again.');
      navigate('/login');
      return;
    }

    if (token) {
      // Store token
      localStorage.setItem('token', token);
      setToken(token);

      // Fetch user data
      fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            setUser(data.user);
            toast.success('Successfully signed in with Google!');
            navigate('/');
          } else {
            toast.error('Failed to fetch user data');
            navigate('/login');
          }
        })
        .catch(err => {
          toast.error('Authentication failed');
          navigate('/login');
        });
    } else {
      navigate('/login');
    }
  }, [searchParams, navigate, setUser, setToken]);

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh'
    }}>
      <div style={{ textAlign: 'center' }}>
        <h2>Signing you in...</h2>
        <p>Please wait while we complete the authentication process.</p>
      </div>
    </div>
  );
};

export default GoogleCallback;
