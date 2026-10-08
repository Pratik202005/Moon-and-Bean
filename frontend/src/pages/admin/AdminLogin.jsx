import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { Lock, Mail, Sparkles, ArrowRight, AlertCircle, ArrowLeft, Shield } from 'lucide-react';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, loading } = useAdminAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const res = await login(email, password);
    if (res.success) {
      navigate('/admin');
    } else {
      setError(res.message || 'Invalid admin credentials');
    }
  };

  return (
    <div className="min-h-screen bg-moon-black text-moon-cream flex items-center justify-center px-6 relative overflow-hidden font-sans">
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

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md glass-card p-8 sm:p-10 rounded-3xl border border-moon-gold/30 shadow-2xl relative z-10 space-y-8 backdrop-blur-xl"
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
            <Shield size={13} /> ATELIER
          </span>
        </div>

        {/* Header Branding */}
        <div className="text-center space-y-2.5">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full glass-pill border border-moon-gold/40 text-moon-gold mb-1">
            <Sparkles size={20} />
          </div>
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-moon-gold block font-light">
            MOON &amp; BEAN MANAGEMENT ATELIER
          </span>
          <h1 className="font-cinzel text-3xl text-moon-cream font-medium tracking-wider uppercase">
            ADMIN LOGIN
          </h1>
          <p className="font-sans text-xs text-moon-muted font-light leading-relaxed">
            Sign in with authorized administrator credentials to access real-time seating &amp; order telemetry.
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-sans flex items-center gap-2.5">
            <AlertCircle size={16} className="shrink-0 text-rose-400" />
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1.5">
            <label className="font-sans text-xs text-moon-muted">Admin Email</label>
            <div className="relative">
              <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-moon-muted" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 py-3 font-sans text-xs text-moon-cream placeholder-moon-muted/40 focus:outline-none focus:ring-1 focus:ring-moon-gold/50 focus:border-moon-gold focus:bg-white/[0.08] transition duration-300"
                placeholder="admin@moonandbean.com"
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
            <span>{loading ? 'Authenticating...' : 'ADMIN LOGIN'}</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
