import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, Mail, Lock, ArrowRight, ArrowLeft, ShieldCheck, Info, User, Phone } from 'lucide-react';
import { useUserAuth } from '../context/UserAuthContext';
import { useCart } from '../context/CartContext';

const Login = () => {
  const [mode, setMode] = useState('signin'); // 'signin' | 'register'
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const authContext = useUserAuth() || {};
  const { login, register } = authContext;

  const cartContext = useCart() || {};
  const setIsCartOpen = cartContext.setIsCartOpen;

  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || location.state?.from || location.state?.redirectTo || '/dashboard';
  const redirectMessage = location.state?.message;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (mode === 'signin') {
        if (!login) {
          setError('Authentication service unavailable.');
          return;
        }
        const res = await login(email, password);
        if (res && res.success) {
          if (location.state?.openCart && setIsCartOpen) {
            setIsCartOpen(true);
          }
          navigate(from);
        } else {
          setError(res?.message || 'Invalid credentials. Please try again.');
        }
      } else {
        if (!register) {
          setError('Registration service unavailable.');
          return;
        }
        const res = await register(name, email, password, phone);
        if (res && res.success) {
          if (location.state?.openCart && setIsCartOpen) {
            setIsCartOpen(true);
          }
          navigate(from);
        } else {
          setError(res?.message || 'Registration failed. Please try again.');
        }
      }
    } catch (err) {
      setError(err?.message || 'An unexpected authentication error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-moon-black text-moon-cream flex items-center justify-center px-6 py-12 relative overflow-hidden z-10 font-sans">
      {/* Ambient Floating Golden Light Mesh */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          x: [-15, 15, -15],
          y: [-10, 10, -10],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-moon-gold/10 rounded-full blur-[190px] pointer-events-none"
      />

      {/* Steam / Dark Blurred Coffee Aesthetic Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-moon-gold/5 via-transparent to-moon-black/90 pointer-events-none" />

      {/* Main Glassmorphic Login Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md glass-card p-8 sm:p-10 rounded-3xl border border-moon-gold/30 shadow-2xl relative z-10 space-y-6 backdrop-blur-xl"
      >
        {/* Top Navigation: Return to Moon & Bean */}
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="group inline-flex items-center gap-2 px-4 py-2 rounded-full glass-pill border border-white/10 text-xs font-sans text-moon-muted hover:text-moon-gold hover:border-moon-gold/40 transition-all duration-300"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform duration-300 text-moon-gold" />
            <span>Return to Moon &amp; Bean</span>
          </Link>

          <span className="font-mono text-[10px] text-moon-gold/80 uppercase tracking-widest flex items-center gap-1">
            <ShieldCheck size={13} /> SECURE
          </span>
        </div>

        {/* Branding Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full glass-pill border border-moon-gold/40 text-moon-gold mb-1">
            <Sparkles size={20} />
          </div>
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-moon-gold block font-light">
            MOON &amp; BEAN MEMBER PORTAL
          </span>
          <h1 className="font-cinzel text-2xl sm:text-3xl text-moon-cream font-medium tracking-wider uppercase">
            {mode === 'signin' ? 'SIGN IN' : 'CREATE ACCOUNT'}
          </h1>
          <p className="font-sans text-xs text-moon-muted font-light leading-relaxed">
            {mode === 'signin'
              ? 'Enter your credentials to access live reservations, order history, and exclusive member perks.'
              : 'Join Moon & Bean for table bookings, order tracking, and complimentary tasting experiences.'}
          </p>
        </div>

        {/* Mode Selector Tabs */}
        <div className="grid grid-cols-2 p-1 bg-white/5 border border-white/10 rounded-full">
          <button
            type="button"
            onClick={() => {
              setMode('signin');
              setError('');
            }}
            className={`py-2 text-xs font-sans font-semibold rounded-full uppercase tracking-wider transition duration-300 ${
              mode === 'signin'
                ? 'bg-moon-gold text-moon-black shadow-md'
                : 'text-stone-300 hover:text-white'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('register');
              setError('');
            }}
            className={`py-2 text-xs font-sans font-semibold rounded-full uppercase tracking-wider transition duration-300 ${
              mode === 'register'
                ? 'bg-moon-gold text-moon-black shadow-md'
                : 'text-stone-300 hover:text-white'
            }`}
          >
            Create Account
          </button>
        </div>

        {/* Redirect Info Banner */}
        {redirectMessage && (
          <div className="p-3.5 rounded-xl bg-moon-gold/15 border border-moon-gold/40 text-moon-gold text-xs font-sans flex items-center gap-2.5 shadow-lg">
            <Info size={16} className="shrink-0 text-moon-gold" />
            <span>{redirectMessage}</span>
          </div>
        )}

        {/* Error Alert */}
        {error && (
          <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-sans flex items-center gap-2.5">
            <span className="shrink-0 text-rose-400">⚠️</span>
            <span>{error}</span>
          </div>
        )}

        {/* Form Inputs */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'register' && (
            <>
              <div className="space-y-1.5">
                <label className="font-sans text-xs text-moon-muted">Full Name</label>
                <div className="relative">
                  <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-moon-muted" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 py-3 font-sans text-xs text-moon-cream placeholder-moon-muted/40 focus:outline-none focus:ring-1 focus:ring-moon-gold/50 focus:border-moon-gold focus:bg-white/[0.08] transition duration-300"
                    placeholder="Eleanor Vance"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="font-sans text-xs text-moon-muted">Phone (Optional)</label>
                <div className="relative">
                  <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-moon-muted" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 py-3 font-sans text-xs text-moon-cream placeholder-moon-muted/40 focus:outline-none focus:ring-1 focus:ring-moon-gold/50 focus:border-moon-gold focus:bg-white/[0.08] transition duration-300"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
              </div>
            </>
          )}

          <div className="space-y-1.5">
            <label className="font-sans text-xs text-moon-muted">Email Address</label>
            <div className="relative">
              <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-moon-muted" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 py-3 font-sans text-xs text-moon-cream placeholder-moon-muted/40 focus:outline-none focus:ring-1 focus:ring-moon-gold/50 focus:border-moon-gold focus:bg-white/[0.08] transition duration-300"
                placeholder="guest@moonandbean.com"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="font-sans text-xs text-moon-muted">Password</label>
            <div className="relative">
              <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-moon-muted" />
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 py-3 font-sans text-xs text-moon-cream placeholder-moon-muted/40 focus:outline-none focus:ring-1 focus:ring-moon-gold/50 focus:border-moon-gold focus:bg-white/[0.08] transition duration-300"
                placeholder="••••••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-moon-gold text-moon-black font-sans text-xs uppercase tracking-widest font-semibold rounded-full flex items-center justify-center gap-2 hover:bg-moon-amber transition duration-300 shadow-xl shadow-moon-gold/20 mt-3 group"
          >
            <span>
              {loading
                ? mode === 'signin'
                  ? 'Authenticating...'
                  : 'Creating Account...'
                : mode === 'signin'
                ? 'SIGN IN TO MOON & BEAN'
                : 'CREATE MOON & BEAN ACCOUNT'}
            </span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        <div className="text-center font-mono text-[11px] text-moon-muted pt-2 border-t border-white/10">
          Staff or Management?{' '}
          <Link to="/admin/login" className="text-moon-gold hover:underline">
            Admin Portal Access
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
