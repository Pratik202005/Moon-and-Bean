import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Compass, ArrowLeft, UtensilsCrossed } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-moon-black text-moon-cream flex flex-col items-center justify-center px-6 relative overflow-hidden font-sans text-center">
      {/* Ambient Floating Gold Light Mesh */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-moon-gold/10 rounded-full blur-[190px] pointer-events-none"
      />

      {/* Dark Radial Gradient Steam Effect */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-moon-gold/5 via-transparent to-moon-black/90 pointer-events-none" />

      {/* Main Content Container */}
      <div className="max-w-2xl mx-auto relative z-10 space-y-8">
        {/* Floating Rotating Compass Glyph */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
            className="w-16 h-16 rounded-full border border-moon-gold/40 flex items-center justify-center text-moon-gold bg-moon-gold/5 backdrop-blur-md shadow-2xl"
          >
            <Compass size={28} />
          </motion.div>
        </motion.div>

        {/* 404 Breathing Outline Serif Typography */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <motion.h1
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            className="font-cinzel text-8xl sm:text-9xl md:text-[13rem] font-bold text-transparent bg-clip-text bg-gradient-to-b from-moon-gold via-moon-gold/40 to-transparent tracking-tighter select-none drop-shadow-2xl leading-none"
          >
            404
          </motion.h1>
          <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-moon-gold/80 block -mt-4 sm:-mt-6">
            LOST IN THE ROAST • MOON &amp; BEAN CORRIDOR
          </span>
        </motion.div>

        {/* Text Copywriting */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="space-y-3"
        >
          <h2 className="font-cinzel text-3xl sm:text-4xl text-moon-cream font-medium tracking-wide">
            This Moment Does Not Exist
          </h2>
          <p className="font-sans text-xs sm:text-sm text-moon-muted max-w-lg mx-auto font-light leading-relaxed">
            The blend, reservation pass, or page you are looking for has been moved, brewed away, or never existed in our master reserve.
          </p>
        </motion.div>

        {/* Action Navigation Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
        >
          {/* Primary Return to Home */}
          <Link
            to="/"
            className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-moon-gold text-moon-black font-sans text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 hover:bg-moon-amber transition-all duration-300 shadow-xl shadow-moon-gold/20 group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            <span>Return to Home</span>
          </Link>

          {/* Secondary Explore Menu */}
          <Link
            to="/menu"
            className="w-full sm:w-auto px-7 py-3.5 rounded-full glass-pill border border-moon-gold/40 text-moon-cream font-sans text-xs uppercase tracking-widest font-medium flex items-center justify-center gap-2 hover:bg-moon-gold/10 hover:border-moon-gold transition-all duration-300"
          >
            <UtensilsCrossed size={16} className="text-moon-gold" />
            <span>Explore Our Menu</span>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
