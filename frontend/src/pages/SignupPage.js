import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import toast from 'react-hot-toast';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const SignupPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    first_name: '',
    last_name: ''
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
    
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    setIsLoading(true);

    try {
      const signupData = {
        email: formData.email,
        password: formData.password,
        first_name: formData.first_name,
        last_name: formData.last_name
      };

      await axios.post(`${API}/auth/register`, signupData);
      
      // Auto-login after successful registration
      const loginResponse = await axios.post(`${API}/auth/login`, {
        email: formData.email,
        password: formData.password
      });
      
      // Store token and user data
      localStorage.setItem('token', loginResponse.data.access_token);
      localStorage.setItem('user', JSON.stringify(loginResponse.data.user));
      
      toast.success('Welcome to your cosmic sanctuary! ✨');
      navigate('/writing-room');
    } catch (error) {
      console.error('Signup error:', error);
      toast.error(error.response?.data?.detail || 'Unable to create account. Please try again.');
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
              Create Your <span className="handwritten text-cosmic-rose">Sanctuary</span>
            </h1>
            <p className="cosmic-text">
              Begin your journey of healing, reflection, and authentic growth.
            </p>
          </div>

          {/* Signup Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="cosmic-title text-sm mb-2 block">First Name</label>
                <input
                  type="text"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  required
                  className="cosmic-input"
                  placeholder="Your first name"
                />
              </div>
              
              <div>
                <label className="cosmic-title text-sm mb-2 block">Last Name</label>
                <input
                  type="text"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  className="cosmic-input"
                  placeholder="Your last name"
                />
              </div>
            </div>

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
                placeholder="At least 6 characters"
              />
            </div>

            <div>
              <label className="cosmic-title text-sm mb-2 block">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="cosmic-input"
                placeholder="Confirm your password"
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
                  Creating your sanctuary...
                </span>
              ) : (
                'Create Account ✨'
              )}
            </button>
          </form>

          {/* Terms */}
          <div className="mt-4 text-center">
            <p className="cosmic-text text-xs">
              By creating an account, you agree to our{' '}
              <Link to="/terms" className="hover:text-cosmic-rose transition-colors">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link to="/privacy" className="hover:text-cosmic-rose transition-colors">
                Privacy Policy
              </Link>
            </p>
          </div>

          {/* Links */}
          <div className="mt-6 text-center">
            <div className="border-t border-glass-medium pt-4">
              <p className="cosmic-text text-sm mb-2">
                Already have an account?
              </p>
              <Link to="/login" className="ghost-button w-full">
                Sign In
              </Link>
            </div>
          </div>
        </motion.div>

        {/* What You'll Get */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 cosmic-card p-6"
        >
          <h3 className="cosmic-title text-lg mb-4 text-center">
            What You'll Get
          </h3>
          <ul className="space-y-3 cosmic-text text-sm">
            <li className="flex items-start">
              <span className="text-cosmic-rose mr-2 mt-1">✨</span>
              <div>
                <strong>Private Journal Space:</strong> Save and organize your entries securely
              </div>
            </li>
            <li className="flex items-start">
              <span className="text-cosmic-rose mr-2 mt-1">✨</span>
              <div>
                <strong>Premium Prompts:</strong> Access deeper guided reflection exercises
              </div>
            </li>
            <li className="flex items-start">
              <span className="text-cosmic-rose mr-2 mt-1">✨</span>
              <div>
                <strong>Progress Tracking:</strong> See your growth and healing journey over time
              </div>
            </li>
            <li className="flex items-start">
              <span className="text-cosmic-rose mr-2 mt-1">✨</span>
              <div>
                <strong>Community Connection:</strong> Join a supportive space for deep feelers
              </div>
            </li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
};

export default SignupPage;
