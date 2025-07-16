import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import toast from 'react-hot-toast';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const YesAndRoom = ({ isUnlocked = false }) => {
  const [user, setUser] = useState(null);
  const [activePrompt, setActivePrompt] = useState(null);
  const [entries, setEntries] = useState({});
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  const yesAndPrompts = [
    {
      id: 1,
      content: "There's a version of you that held grief in one hand and still reached for joy with the other.\nFeel free to explore that..."
    },
    {
      id: 2,
      content: "You can be tired and still worthy.\nYou can be unsure and still becoming.\nWhat if that was always enough?"
    },
    {
      id: 3,
      content: "\"This doesn't make sense\" and \"This is still sacred\" can both be true.\nWhere are you holding contradictions quietly?"
    },
    {
      id: 4,
      content: "Who are you beneath the survival story?"
    },
    {
      id: 5,
      content: "You haven't failed if you're still feeling.\nSit with the part of you that still aches and still hopes."
    },
    {
      id: 6,
      content: "Some days, healing looks like softening.\nSome days, like saying no.\nWhat does it look like today?"
    },
    {
      id: 7,
      content: "\"Yes, this hurt\"\nAnd\n\"Yes, I am healing\"\n\nCan both live here?"
    },
    {
      id: 8,
      content: "Where did you shrink in order to stay loved and what happens if you expand now?"
    },
    {
      id: 9,
      content: "This version of you is not a detour.\nIt's a chapter.\nWrite to her like she matters."
    },
    {
      id: 10,
      content: "If the truth could be more than one thing…\nWhat else might be true?"
    },
    {
      id: 11,
      content: "You don't have to abandon the past to belong to the present.\nHow can both be held without letting either define you?"
    },
    {
      id: 12,
      content: "What does it feel like to honour who you've been, without apologizing for who you're becoming?"
    }
  ];

  useEffect(() => {
    checkUserStatus();
  }, []);

  const checkUserStatus = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const userResponse = await axios.get(`${API}/auth/me`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUser(userResponse.data);
      } catch (error) {
        localStorage.removeItem('token');
      }
    }
  };

  const handleUnlock = async () => {
    if (!user) {
      toast.error('Please log in to purchase access');
      return;
    }

    setIsProcessingPayment(true);
    try {
      // Create checkout session for Yes...And room
      const response = await axios.post(`${API}/payments/checkout/session`, 
        ['yes-and-room'], // This would be a product ID for the Yes...And room
        {
          headers: { 'Content-Type': 'application/json' }
        }
      );
      
      if (response.data.url) {
        window.location.href = response.data.url;
      }
    } catch (error) {
      console.error('Error creating checkout session:', error);
      toast.error('Unable to process purchase at this time.');
    } finally {
      setIsProcessingPayment(false);
    }
  };

  const handleSaveEntry = (promptId, content) => {
    if (!user) {
      toast.error('Please log in to save your entries');
      return;
    }

    // Save to local state
    setEntries(prev => ({
      ...prev,
      [promptId]: content
    }));

    // TODO: Save to backend
    toast.success('Entry saved ✨');
  };

  const handleDownload = (promptId) => {
    const content = entries[promptId] || '';
    const prompt = yesAndPrompts.find(p => p.id === promptId);
    
    if (!content) {
      toast.error('No content to download');
      return;
    }

    const downloadContent = `Yes...And Room - Prompt ${promptId}\n\n${prompt.content}\n\n---\n\n${content}`;
    const blob = new Blob([downloadContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `yes-and-prompt-${promptId}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleClear = (promptId) => {
    setEntries(prev => ({
      ...prev,
      [promptId]: ''
    }));
  };

  if (!isUnlocked) {
    // Teaser/Preview View
    return (
      <div className="min-h-screen py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            {/* Premium Room Header */}
            <div className="glass-card p-8 md:p-12 mb-12">
              <div className="text-6xl mb-6">💫</div>
              <h1 className="cosmic-title text-4xl md:text-5xl mb-4">
                Yes<span className="handwritten text-cosmic-rose">…And</span>
              </h1>
              <p className="cosmic-text text-lg mb-6 opacity-80">
                A Premium Journaling Room by Perspectives by Mary
              </p>
              
              <div className="space-y-4 cosmic-text text-xl leading-relaxed max-w-2xl mx-auto">
                <p className="handwritten text-cosmic-gold text-2xl">
                  The truth isn't always singular. Neither are you.
                </p>
                
                <p>This room is for those in the in-between, not who they were, not quite who they're becoming.</p>
                
                <p>In here, we hold space for contradictions.</p>
                <p>For grief and joy. Fear and hope. For you to be tired and still showing up.</p>
                
                <div className="handwritten text-cosmic-rose text-xl mt-8">
                  This is not self-help. This is self-honoring.
                </div>
              </div>
            </div>

            {/* What's Included */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="glass-card p-8 mb-12"
            >
              <h2 className="cosmic-title text-2xl mb-6">🖋️ Inside this room, you'll get:</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 cosmic-text text-lg">
                <div className="flex items-start space-x-3">
                  <span className="text-cosmic-rose text-xl">✨</span>
                  <span>12 soul-stirring prompts from Mary's Yes… And book</span>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-cosmic-rose text-xl">🏠</span>
                  <span>A private writing space beneath each prompt</span>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-cosmic-rose text-xl">📥</span>
                  <span>The ability to download your reflections</span>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-cosmic-rose text-xl">🌙</span>
                  <span>A room designed for emotional permission, not perfection</span>
                </div>
              </div>
            </motion.div>

            {/* Purchase Options */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <button
                onClick={handleUnlock}
                disabled={isProcessingPayment}
                className="cosmic-button text-lg px-8 py-4"
              >
                {isProcessingPayment ? 'Processing...' : '✨ Unlock for $9'}
              </button>
              <button className="ghost-button text-lg px-8 py-4">
                🌀 Become a member
              </button>
            </motion.div>

            {!user && (
              <p className="cosmic-text text-sm mt-6 opacity-60">
                <a href="/login" className="text-cosmic-rose hover:underline">Log in</a> or{' '}
                <a href="/signup" className="text-cosmic-rose hover:underline">create an account</a> to purchase
              </p>
            )}
          </motion.div>
        </div>
      </div>
    );
  }

  // Unlocked Premium View
  return (
    <div className="min-h-screen py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Message */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="cosmic-title text-4xl mb-8">
            🌿 Welcome to the <span className="handwritten text-cosmic-rose">"Yes… And"</span> Room
          </h1>
          
          <div className="glass-card p-8 max-w-2xl mx-auto">
            <div className="space-y-4 cosmic-text text-lg leading-relaxed">
              <p>You don't need to arrive with clarity. You just need to arrive.</p>
              <p>Let this space be your companion through the contradictory, the quiet, and the complicated.</p>
              <div className="handwritten text-cosmic-gold text-xl">
                Take your time. Let the words meet you where you are.
              </div>
            </div>
          </div>
        </motion.div>

        {/* Prompt Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {yesAndPrompts.map((prompt, index) => (
            <motion.div
              key={prompt.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="cosmic-card"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <span className="cosmic-title text-lg">Prompt {prompt.id}</span>
                  <button
                    onClick={() => setActivePrompt(activePrompt === prompt.id ? null : prompt.id)}
                    className="text-cosmic-rose hover:text-cosmic-gold transition-colors"
                  >
                    {activePrompt === prompt.id ? '▼' : '▶'}
                  </button>
                </div>
                
                <blockquote className="cosmic-text text-lg leading-relaxed italic mb-6">
                  {prompt.content.split('\n').map((line, i) => (
                    <span key={i}>
                      {line}
                      {i < prompt.content.split('\n').length - 1 && <br />}
                    </span>
                  ))}
                </blockquote>

                {activePrompt === prompt.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="border-t border-glass-medium pt-6"
                  >
                    <textarea
                      placeholder="Let your thoughts flow here..."
                      value={entries[prompt.id] || ''}
                      onChange={(e) => setEntries(prev => ({ ...prev, [prompt.id]: e.target.value }))}
                      className="cosmic-input w-full h-64 resize-none text-lg leading-relaxed mb-4"
                      style={{ background: 'transparent', border: 'none' }}
                    />
                    
                    <div className="flex justify-end gap-3">
                      <button
                        onClick={() => handleSaveEntry(prompt.id, entries[prompt.id] || '')}
                        className="ghost-button text-sm"
                      >
                        💾 Save
                      </button>
                      <button
                        onClick={() => handleDownload(prompt.id)}
                        className="ghost-button text-sm"
                        disabled={!entries[prompt.id]}
                      >
                        📥 Download
                      </button>
                      <button
                        onClick={() => handleClear(prompt.id)}
                        className="ghost-button text-sm"
                      >
                        ♻️ Clear
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <a href="/writing-room" className="ghost-button">
            ← Back to Writing Room
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default YesAndRoom;
