import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import "./App.css";

// Import all pages
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import SpeakingPage from "./pages/SpeakingPage";
import ShopPage from "./pages/ShopPage";
import WritingRoomPage from "./pages/WritingRoomPage";
import BlogPage from "./pages/BlogPage";
import BlogPostPage from "./pages/BlogPostPage";
import TestimonialsPage from "./pages/TestimonialsPage";
import ContactPage from "./pages/ContactPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import SuccessPage from "./pages/SuccessPage";
import YesAndRoom from "./components/YesAndRoom";

// Import components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <main className="min-h-screen">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/speaking" element={<SpeakingPage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/writing-room" element={<WritingRoomPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:id" element={<BlogPostPage />} />
            <Route path="/testimonials" element={<TestimonialsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/success" element={<SuccessPage />} />
            <Route path="/yes-and" element={<YesAndRoom isUnlocked={false} />} />
            <Route path="/yes-and/unlocked" element={<YesAndRoom isUnlocked={true} />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
      <Toaster position="top-center" />
    </div>
  );
}

export default App;
