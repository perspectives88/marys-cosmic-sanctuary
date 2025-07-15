import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import toast from 'react-hot-toast';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(`${API}/auth/login`, formData);
      
      // Store token and user data
      localStorage.setItem('token', response.data.access_token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      
      toast.success('Welcome back to your sanctuary! ✨');
      navigate('/writing-room');
    } catch (error) {
      console.error('Login error:', error);
      toast.error(error.response?.data?.detail || 'Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-20">
      <div className="max-w-md w-full mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="cosmic-card p-8"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="cosmic-title text-3xl mb-4">
              Welcome <span className="handwritten text-cosmic-rose">Back</span>
            </h1>
            <p className="cosmic-text">
              Enter your sacred space for reflection and growth.
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="cosmic-title text-sm mb-2 block">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="cosmic-input"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label className="cosmic-title text-sm mb-2 block">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="cosmic-input"
                placeholder="Enter your password"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="cosmic-button w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <div className="cosmic-spinner w-5 h-5 mr-2"></div>
                  Signing in...
                </span>
              ) : (
                'Sign In ✨'
              )}
            </button>
          </form>

          {/* Links */}
          <div className="mt-6 text-center space-y-4">
            <div>
              <Link to="/forgot-password" className="cosmic-text text-sm hover:text-cosmic-rose transition-colors">
                Forgot your password?
              </Link>
            </div>
            
            <div className="border-t border-glass-medium pt-4">
              <p className="cosmic-text text-sm mb-2">
                Don't have an account yet?
              </p>
              <Link to="/signup" className="ghost-button w-full">
                Create Your Sanctuary
              </Link>
            </div>
          </div>

          {/* Demo Account */}
          <div className="mt-6 p-4 glass bg-cosmic-purple/20 rounded-lg">
            <div className="text-center">
              <div className="cosmic-title text-sm mb-2">Demo Account</div>
              <div className="cosmic-text text-xs mb-3">
                Try the writing room with a demo account:
              </div>
              <div className="cosmic-text text-xs">
                Email: demo@marysanctuary.com<br />
                Password: demo123
              </div>
            </div>
          </div>
        </motion.div>

        {/* Benefits of Account */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 cosmic-card p-6"
        >
          <h3 className="cosmic-title text-lg mb-4 text-center">
            Your Account Benefits
          </h3>
          <ul className="space-y-2 cosmic-text text-sm">
            <li className="flex items-center">
              <span className="text-cosmic-rose mr-2">✨</span>
              Save and organize your journal entries
            </li>
            <li className="flex items-center">
              <span className="text-cosmic-rose mr-2">✨</span>
              Access premium guided prompts
            </li>
            <li className="flex items-center">
              <span className="text-cosmic-rose mr-2">✨</span>
              Track your healing journey over time
            </li>
            <li className="flex items-center">
              <span className="text-cosmic-rose mr-2">✨</span>
              Receive exclusive content and updates
            </li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;
