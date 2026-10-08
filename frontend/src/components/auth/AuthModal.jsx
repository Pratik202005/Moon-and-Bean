import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, User, Phone, Sparkles, ArrowRight, AlertCircle, ShieldCheck } from 'lucide-react';
import { useUserAuth } from '../../context/UserAuthContext';
import { useModalScrollLock } from '../../hooks/useModalScrollLock';

const AuthModal = ({ isOpen, onClose, onSuccess }) => {
  useModalScrollLock(isOpen);
  const [tab, setTab] = useState('signin');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  const { login, register, loading } = useUserAuth();

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    let res;
    if (tab === 'signin') {
      res = await login(email, password);
    } else {
      res = await register(name, email, password, phone);
    }

    if (res.success) {
      if (onSuccess) onSuccess();
      onClose();
    } else {
      setError(res.message || 'Authentication failed');
    }
  };

  const modalNode = (
    <AnimatePresence>
      <div
        data-lenis-prevent="true"
        className="fixed inset-0 z-[99999] flex items-center justify-center p-4 overflow-y-auto overscroll-contain"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-moon-black/85 backdrop-blur-md"
        />

        <motion.div
          data-lenis-prevent="true"
          onWheel={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="w-full max-w-md max-h-[90vh] overflow-y-auto overscroll-contain glass-card p-6 sm:p-8 rounded-3xl border border-moon-gold/40 shadow-2xl relative z-10 space-y-6 my-auto"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles size={18} className="text-moon-gold" />
              <span className="font-mono text-[10px] uppercase tracking-widest text-moon-gold">
                MOON &amp; BEAN CONNOISSEUR EXPERIENCE
              </span>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full glass-pill flex items-center justify-center text-moon-muted hover:text-moon-cream"
            >
              <X size={16} />
            </button>
          </div>

          {/* Tab Switcher */}
          <div className="flex border-b border-white/10">
            <button
              type="button"
              onClick={() => {
                setTab('signin');
                setError('');
              }}
              className={`flex-1 py-3 text-xs uppercase tracking-wider font-sans border-b-2 transition ${
                tab === 'signin'
                  ? 'border-moon-gold text-moon-cream font-semibold'
                  : 'border-transparent text-moon-muted hover:text-moon-cream'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => {
                setTab('register');
                setError('');
              }}
              className={`flex-1 py-3 text-xs uppercase tracking-wider font-sans border-b-2 transition ${
                tab === 'register'
                  ? 'border-moon-gold text-moon-cream font-semibold'
                  : 'border-transparent text-moon-muted hover:text-moon-cream'
              }`}
            >
              Create Account
            </button>
          </div>

          {error && (
            <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-sans flex items-center gap-2.5">
              <AlertCircle size={16} className="shrink-0 text-rose-400" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {tab === 'register' && (
              <div className="space-y-1">
                <label className="text-xs font-sans text-moon-muted">Full Name</label>
                <div className="relative">
                  <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-moon-muted" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Lady / Lord Connoisseur"
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs font-sans text-moon-cream focus:outline-none focus:border-moon-gold/60"
                  />
                </div>
              </div>
            )}

            <div className="space-y-1">
              <label className="text-xs font-sans text-moon-muted">Email Address</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-moon-muted" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="guest@domain.com"
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs font-sans text-moon-cream focus:outline-none focus:border-moon-gold/60"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-sans text-moon-muted">Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-moon-muted" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs font-sans text-moon-cream focus:outline-none focus:border-moon-gold/60"
                />
              </div>
            </div>

            {tab === 'register' && (
              <div className="space-y-1">
                <label className="text-xs font-sans text-moon-muted">Phone Number (Optional)</label>
                <div className="relative">
                  <Phone size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-moon-muted" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 (555) 019-2834"
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs font-sans text-moon-cream focus:outline-none focus:border-moon-gold/60"
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-moon-gold text-moon-black font-sans text-xs uppercase tracking-widest font-semibold rounded-full flex items-center justify-center gap-2 hover:bg-moon-amber transition duration-300 shadow-xl shadow-moon-gold/20 mt-2"
            >
              <span>{loading ? 'Processing...' : tab === 'signin' ? 'Sign In' : 'Create Account'}</span>
              <ArrowRight size={16} />
            </button>
          </form>

          {/* Staff Helper Link */}
          <div className="pt-3 border-t border-white/10 text-center font-mono text-[11px] text-moon-muted">
            <span>Are you a staff member? </span>
            <Link
              to="/admin/login"
              onClick={onClose}
              className="text-moon-gold hover:underline font-medium inline-flex items-center gap-1"
            >
              <ShieldCheck size={12} />
              <span>Access Admin Portal</span>
            </Link>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );

  return typeof document !== 'undefined' ? createPortal(modalNode, document.body) : null;
};

export default AuthModal;
