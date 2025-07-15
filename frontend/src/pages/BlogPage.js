import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const BlogPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get(`${API}/blog/posts`);
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
      // Set demo posts for now
      setPosts(demoPosts);
    } finally {
      setLoading(false);
    }
  };

  // Demo blog posts
  const demoPosts = [
    {
      id: '1',
      title: 'Finding Light in the Darkness: A Letter to My Past Self',
      excerpt: 'What I would tell the woman who was drowning in transition, afraid she\'d never find her way back to herself.',
      content: `Dear Past Self,

I know you can't see it right now, but the darkness you're swimming through isn't trying to drown you—it's trying to teach you how to breathe underwater.

I know that sounds impossible when you're gasping for air, when every day feels like pushing through thick fog, when you look in the mirror and don't recognize the person staring back. I know because I was you, and in many ways, I still am you.

The woman writing this letter has learned something beautiful: healing isn't about fixing what's broken. It's about remembering what was never broken to begin with.

You are not too much. You are not too sensitive. You are not failing at life because you feel everything so deeply. Your sensitivity is your superpower, even when it feels like your kryptonite.

The transitions you're afraid of? They're not endings—they're birthings. And birth is messy and beautiful and terrifying all at once. You're not losing yourself in these changes; you're excavating yourself. You're becoming.

Keep writing. Keep feeling. Keep trusting that voice inside you that knows you're meant for something beautiful and big and healing. Your story matters. Your pain has purpose. Your healing will light the way for others.

You are braver than you believe, stronger than you seem, and more loved than you know.

With all my love and cosmic stardust,
Your Future Self ✨`,
      author: 'Mary',
      featured_image: 'https://images.unsplash.com/photo-1519810755548-39cd217da494',
      created_at: '2025-01-15T10:00:00Z',
      tags: ['healing', 'self-love', 'transformation', 'letter to self']
    },
    {
      id: '2',
      title: 'The Sacred Art of Sitting with Discomfort',
      excerpt: 'Why our culture of constant motion keeps us from the deep healing that only comes through stillness.',
      content: `We live in a world that tells us discomfort is the enemy. Feel sad? Take something. Feel anxious? Distract yourself. Feel uncertain? Make a plan immediately.

But what if discomfort isn't the enemy? What if it's the teacher we've been avoiding?

I've learned that our discomfort often holds our deepest wisdom. That restless feeling when we're in the wrong relationship, the anxiety that shows up when we're not living authentically, the grief that comes when we're ready to let go of who we used to be.

Sitting with discomfort doesn't mean being passive or wallowing. It means creating space for our feelings to exist without immediately trying to fix them. It means trusting that our emotional landscape has intelligence, even when we can't see the bigger picture.

In my own healing journey, I've discovered that the feelings I tried hardest to avoid were often pointing me toward the changes I needed to make. My anxiety wasn't just random suffering—it was my soul's way of saying, "This doesn't fit anymore."

So how do we sit with discomfort without being overwhelmed by it?

First, we breathe. We remind ourselves that feelings are temporary visitors, not permanent residents. We create rituals that honor our emotional experience—journaling, walking in nature, creating art, talking with trusted friends.

We also remember that discomfort often signals growth. Just like a snake sheds its skin when it outgrows it, we feel uncomfortable when we're ready to expand beyond our current limitations.

Your discomfort is not a flaw in your design. It's a feature. It's your inner wisdom speaking a language that only you can understand.

Trust it. Sit with it. Let it teach you.`,
      author: 'Mary',
      featured_image: 'https://images.unsplash.com/photo-1732352332941-7cb02a49edd8',
      created_at: '2025-01-10T14:30:00Z',
      tags: ['mindfulness', 'emotional wisdom', 'growth', 'healing']
    },
    {
      id: '3',
      title: 'When Your Identity Shifts: Navigating Who You\'re Becoming',
      excerpt: 'The beautiful, terrifying process of evolving beyond who you used to be—and how to navigate the in-between.',
      content: `Who are you when everything you thought you knew about yourself changes?

This question has been my companion through multiple identity shifts—from who I was before my healing journey to who I'm becoming, from the roles I played to the authentic self I'm uncovering.

Identity shifts are rarely linear. They're more like spiral staircases—you think you're going in circles, but actually, you're moving upward, just seeing familiar territory from a new perspective.

Maybe you're the high achiever who's learning that rest isn't lazy. Maybe you're the people-pleaser discovering your voice. Maybe you're the "strong one" learning it's okay to need support. These transitions can feel disorienting because we've often built our entire sense of self around these old patterns.

Here's what I've learned about navigating identity shifts:

1. **Honor the grief.** You're mourning who you used to be, and that's sacred work. It's okay to feel sad about leaving parts of yourself behind, even the parts that weren't serving you.

2. **Embrace the unknown.** The space between who you were and who you're becoming is where the magic happens. It's uncomfortable, but it's also full of possibility.

3. **Find your anchors.** What parts of you remain constant through all the changes? Your values, your capacity for love, your unique way of seeing the world—these are your home base.

4. **Be patient with the process.** Identity shifts take time. You don't have to have it all figured out tomorrow. You're allowed to explore, experiment, and change your mind.

5. **Surround yourself with people who see your becoming.** You need witnesses to your transformation—people who can hold space for both who you were and who you're becoming.

Remember: You're not broken because you're changing. You're not flighty because you're evolving. You're not failing because you're growing beyond your old limitations.

You're becoming. And becoming is beautiful.`,
      author: 'Mary',
      featured_image: 'https://images.unsplash.com/photo-1468186402854-9a641fd7a7c4',
      created_at: '2025-01-05T09:15:00Z',
      tags: ['identity', 'transformation', 'growth', 'self-discovery']
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="cosmic-spinner"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="cosmic-title text-5xl mb-6">
            Reflections & <span className="handwritten text-cosmic-rose">Insights</span>
          </h1>
          <p className="cosmic-text text-xl max-w-3xl mx-auto">
            Authentic thoughts on healing, growth, and the beautiful complexity of being human. 
            Stories from the journey of transformation.
          </p>
        </motion.div>

        {/* Featured Post */}
        {posts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-16"
          >
            <Link to={`/blog/${posts[0].id}`} className="block cosmic-card group">
              <div 
                className="w-full h-80 bg-cover bg-center rounded-xl mb-6"
                style={{
                  backgroundImage: `url(${posts[0].featured_image})`,
                }}
              >
                <div className="w-full h-full bg-gradient-to-t from-cosmic-navy/80 to-transparent rounded-xl flex items-end p-6">
                  <div className="handwritten text-cosmic-gold text-lg">Featured</div>
                </div>
              </div>
              
              <div className="p-6">
                <h2 className="cosmic-title text-3xl mb-4 group-hover:text-cosmic-rose transition-colors">
                  {posts[0].title}
                </h2>
                <p className="cosmic-text text-lg leading-relaxed mb-4">
                  {posts[0].excerpt}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {posts[0].tags.map((tag) => (
                    <span key={tag} className="text-sm cosmic-text opacity-60">
                      #{tag}
                    </span>
                  ))}
                </div>
                <div className="cosmic-text text-sm">
                  {new Date(posts[0].created_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
              </div>
            </Link>
          </motion.div>
        )}

        {/* Other Posts */}
        <div className="space-y-8">
          {posts.slice(1).map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: (index + 1) * 0.1 }}
            >
              <Link to={`/blog/${post.id}`} className="block cosmic-card group">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div 
                    className="w-full h-48 bg-cover bg-center rounded-xl"
                    style={{
                      backgroundImage: `url(${post.featured_image})`,
                    }}
                  />
                  
                  <div className="md:col-span-2">
                    <h3 className="cosmic-title text-2xl mb-3 group-hover:text-cosmic-rose transition-colors">
                      {post.title}
                    </h3>
                    <p className="cosmic-text leading-relaxed mb-4">
                      {post.excerpt}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {post.tags.map((tag) => (
                        <span key={tag} className="text-sm cosmic-text opacity-60">
                          #{tag}
                        </span>
                      ))}
                    </div>
                    <div className="cosmic-text text-sm">
                      {new Date(post.created_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Newsletter Signup */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-20 text-center glass-card p-8"
        >
          <h2 className="cosmic-title text-3xl mb-4">
            Never Miss a <span className="handwritten text-cosmic-gold">Reflection</span>
          </h2>
          <p className="cosmic-text text-lg mb-6">
            Get new blog posts, journaling prompts, and healing insights delivered directly to your inbox.
          </p>
          <div className="handwritten text-cosmic-rose text-xl mb-4">
            Newsletter launching soon... ✨
          </div>
          <a href="/contact" className="cosmic-button">
            Stay Connected
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default BlogPage;
9. frontend/src/pages/BlogPostPage.js
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const BlogPostPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPost();
  }, [id]);

  const fetchPost = async () => {
    try {
      const response = await axios.get(`${API}/blog/posts/${id}`);
      setPost(response.data);
    } catch (error) {
      console.error('Error fetching post:', error);
      // Set demo post for now
      setPost(getDemoPost(id));
    } finally {
      setLoading(false);
    }
  };

  // Demo post data
  const getDemoPost = (postId) => {
    const demoPosts = {
      '1': {
        id: '1',
        title: 'Finding Light in the Darkness: A Letter to My Past Self',
        content: `Dear Past Self,

I know you can't see it right now, but the darkness you're swimming through isn't trying to drown you—it's trying to teach you how to breathe underwater.

I know that sounds impossible when you're gasping for air, when every day feels like pushing through thick fog, when you look in the mirror and don't recognize the person staring back. I know because I was you, and in many ways, I still am you.

## The Gift Hidden in Darkness

The woman writing this letter has learned something beautiful: healing isn't about fixing what's broken. It's about remembering what was never broken to begin with.

You are not too much. You are not too sensitive. You are not failing at life because you feel everything so deeply. Your sensitivity is your superpower, even when it feels like your kryptonite.

The transitions you're afraid of? They're not endings—they're birthings. And birth is messy and beautiful and terrifying all at once. You're not losing yourself in these changes; you're excavating yourself. You're becoming.

> "Healing isn't about fixing what's broken. It's about remembering what was never broken to begin with."

## What I Know Now

Keep writing. Keep feeling. Keep trusting that voice inside you that knows you're meant for something beautiful and big and healing. Your story matters. Your pain has purpose. Your healing will light the way for others.

The nights you spent crying into your pillow, wondering if you'd ever feel whole again? Those tears were watering the seeds of your transformation. The days you could barely get out of bed weren't failures—they were necessary pauses in your becoming.

## Trust the Process

Every feeling you're having is valid. Every fear you're experiencing is understandable. And every step you're taking, no matter how small, is moving you toward the light you can't see yet.

You are braver than you believe, stronger than you seem, and more loved than you know.

With all my love and cosmic stardust,
Your Future Self ✨`,
        author: 'Mary',
        featured_image: 'https://images.unsplash.com/photo-1519810755548-39cd217da494',
        created_at: '2025-01-15T10:00:00Z',
        tags: ['healing', 'self-love', 'transformation', 'letter to self']
      },
      '2': {
        id: '2',
        title: 'The Sacred Art of Sitting with Discomfort',
        content: `We live in a world that tells us discomfort is the enemy. Feel sad? Take something. Feel anxious? Distract yourself. Feel uncertain? Make a plan immediately.

But what if discomfort isn't the enemy? What if it's the teacher we've been avoiding?

## Why We Avoid Discomfort

I've learned that our discomfort often holds our deepest wisdom. That restless feeling when we're in the wrong relationship, the anxiety that shows up when we're not living authentically, the grief that comes when we're ready to let go of who we used to be.

Sitting with discomfort doesn't mean being passive or wallowing. It means creating space for our feelings to exist without immediately trying to fix them. It means trusting that our emotional landscape has intelligence, even when we can't see the bigger picture.

## The Wisdom in Our Discomfort

In my own healing journey, I've discovered that the feelings I tried hardest to avoid were often pointing me toward the changes I needed to make. My anxiety wasn't just random suffering—it was my soul's way of saying, "This doesn't fit anymore."

> "Your discomfort is not a flaw in your design. It's a feature."

## How to Sit with Discomfort

So how do we sit with discomfort without being overwhelmed by it?

**First, we breathe.** We remind ourselves that feelings are temporary visitors, not permanent residents. We create rituals that honor our emotional experience—journaling, walking in nature, creating art, talking with trusted friends.

**We also remember that discomfort often signals growth.** Just like a snake sheds its skin when it outgrows it, we feel uncomfortable when we're ready to expand beyond our current limitations.

## Trust Your Inner Wisdom

Your discomfort is not a flaw in your design. It's a feature. It's your inner wisdom speaking a language that only you can understand.

Trust it. Sit with it. Let it teach you.`,
        author: 'Mary',
        featured_image: 'https://images.unsplash.com/photo-1732352332941-7cb02a49edd8',
        created_at: '2025-01-10T14:30:00Z',
        tags: ['mindfulness', 'emotional wisdom', 'growth', 'healing']
      },
      '3': {
        id: '3',
        title: 'When Your Identity Shifts: Navigating Who You\'re Becoming',
        content: `Who are you when everything you thought you knew about yourself changes?

This question has been my companion through multiple identity shifts—from who I was before my healing journey to who I'm becoming, from the roles I played to the authentic self I'm uncovering.

## The Spiral Staircase of Growth

Identity shifts are rarely linear. They're more like spiral staircases—you think you're going in circles, but actually, you're moving upward, just seeing familiar territory from a new perspective.

Maybe you're the high achiever who's learning that rest isn't lazy. Maybe you're the people-pleaser discovering your voice. Maybe you're the "strong one" learning it's okay to need support. These transitions can feel disorienting because we've often built our entire sense of self around these old patterns.

## Five Keys to Navigating Identity Shifts

Here's what I've learned about navigating identity shifts:

### 1. Honor the grief
You're mourning who you used to be, and that's sacred work. It's okay to feel sad about leaving parts of yourself behind, even the parts that weren't serving you.

### 2. Embrace the unknown
The space between who you were and who you're becoming is where the magic happens. It's uncomfortable, but it's also full of possibility.

### 3. Find your anchors
What parts of you remain constant through all the changes? Your values, your capacity for love, your unique way of seeing the world—these are your home base.

### 4. Be patient with the process
Identity shifts take time. You don't have to have it all figured out tomorrow. You're allowed to explore, experiment, and change your mind.

### 5. Surround yourself with people who see your becoming
You need witnesses to your transformation—people who can hold space for both who you were and who you're becoming.

> "You're not broken because you're changing. You're not flighty because you're evolving."

## Remember: Becoming is Beautiful

Remember: You're not broken because you're changing. You're not flighty because you're evolving. You're not failing because you're growing beyond your old limitations.

You're becoming. And becoming is beautiful.`,
        author: 'Mary',
        featured_image: 'https://images.unsplash.com/photo-1468186402854-9a641fd7a7c4',
        created_at: '2025-01-05T09:15:00Z',
        tags: ['identity', 'transformation', 'growth', 'self-discovery']
      }
    };

    return demoPosts[postId] || null;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="cosmic-spinner"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="cosmic-title text-3xl mb-4">Post Not Found</h1>
          <p className="cosmic-text mb-6">The blog post you're looking for doesn't exist.</p>
          <Link to="/blog" className="cosmic-button">
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  const formatContent = (content) => {
    return content
      .split('\n\n')
      .map((paragraph, index) => {
        if (paragraph.startsWith('## ')) {
          return (
            <h2 key={index} className="cosmic-title text-2xl mt-8 mb-4">
              {paragraph.replace('## ', '')}
            </h2>
          );
        } else if (paragraph.startsWith('### ')) {
          return (
            <h3 key={index} className="cosmic-title text-xl mt-6 mb-3">
              {paragraph.replace('### ', '')}
            </h3>
          );
        } else if (paragraph.startsWith('> ')) {
          return (
            <blockquote key={index} className="border-l-4 border-cosmic-lavender pl-6 italic my-6 text-cosmic-rose text-lg">
              {paragraph.replace('> ', '')}
            </blockquote>
          );
        } else if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
          return (
            <p key={index} className="cosmic-text mb-4 font-semibold">
              {paragraph.replace(/\*\*/g, '')}
            </p>
          );
        } else if (paragraph.trim() === '') {
          return null;
        } else {
          return (
            <p key={index} className="cosmic-text mb-4 leading-relaxed text-lg">
              {paragraph}
            </p>
          );
        }
      });
  };

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back to Blog */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Link to="/blog" className="cosmic-text hover:text-cosmic-rose transition-colors flex items-center">
            ← Back to Blog
          </Link>
        </motion.div>

        {/* Featured Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <div 
            className="w-full h-96 bg-cover bg-center rounded-3xl"
            style={{
              backgroundImage: `url(${post.featured_image})`,
            }}
          >
            <div className="w-full h-full bg-gradient-to-t from-cosmic-navy/60 to-transparent rounded-3xl"></div>
          </div>
        </motion.div>

        {/* Post Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-12"
        >
          <h1 className="cosmic-title text-4xl md:text-5xl mb-6 leading-tight">
            {post.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-4 cosmic-text mb-6">
            <span>By {post.author}</span>
            <span>•</span>
            <span>
              {new Date(post.created_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span key={tag} className="cosmic-text text-sm opacity-60">
                #{tag}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Post Content */}
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="blog-content glass-card p-8 md:p-12"
        >
          {formatContent(post.content)}
        </motion.article>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-12 text-center glass-card p-8"
        >
          <h2 className="cosmic-title text-2xl mb-4">
            Continue Your <span className="handwritten text-cosmic-rose">Journey</span>
          </h2>
          <p className="cosmic-text text-lg mb-6">
            Ready to explore your own healing and growth? Join our writing room for guided reflection.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/writing-room" className="cosmic-button">
              Start Journaling
            </Link>
            <Link to="/blog" className="ghost-button">
              Read More Posts
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BlogPostPage;
