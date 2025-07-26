import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import toast from 'react-hot-toast';
import ReCAPTCHA from 'react-google-recaptcha';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    inquiry_type: 'general'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState(null);
  const recaptchaRef = useRef();

  const inquiryTypes = [
    { value: 'general', label: 'General Inquiry' },
    { value: 'speaking', label: 'Speaking Engagement' },
    { value: 'collaboration', label: 'Collaboration Opportunity' },
    { value: 'media', label: 'Media/Press' },
    { value: 'support', label: 'Support/Technical' }
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setIsSubmitting(true);

    try {
      await axios.post(`${API}/contact`, formData);
      toast.success('Message sent successfully! I\'ll get back to you within 2 business days. <span className="text-cosmic-gold">⁎</span>');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        inquiry_type: 'general'

