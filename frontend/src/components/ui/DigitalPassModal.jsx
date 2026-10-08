import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Calendar, Clock, MapPin, Users, QrCode, CheckCircle, ShieldCheck } from 'lucide-react';
import SpecularGlow from './SpecularGlow';
import { useModalScrollLock } from '../../hooks/useModalScrollLock';

const DigitalPassModal = ({ isOpen, onClose, passData }) => {
  useModalScrollLock(isOpen);

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

  if (!isOpen || !passData) return null;

  const { bookingRef, name, date, timeSlot, zone, guests, status } = passData;

  return (
    <AnimatePresence>
      <div
        data-lenis-prevent="true"
        className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-4 overflow-y-auto overscroll-contain"
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-moon-black/90 backdrop-blur-md"
        />

        {/* Collectible Luxury Ticket Stub Modal */}
        <motion.div
          data-lenis-prevent="true"
          onWheel={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.92, y: 25 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 25 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="w-full max-w-sm max-h-[90vh] overflow-y-auto overscroll-contain bg-gradient-to-b from-[#181513] via-[#12100f] to-[#0d0b0a] border border-moon-gold/50 rounded-3xl p-6 relative z-10 shadow-[0_25px_60px_rgba(0,0,0,0.85),0_0_30px_rgba(212,175,55,0.15)] text-moon-cream group my-auto"
        >
          <SpecularGlow />

          {/* Card Top 24k Gold Foil Ribbon */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-amber-600 via-yellow-200 to-amber-600 shadow-[0_2px_10px_rgba(212,175,55,0.5)]" />

          {/* Left Inward Ticket Notch Cutout */}
          <div className="absolute -left-3.5 top-[58%] -translate-y-1/2 w-7 h-7 rounded-full bg-moon-black border border-moon-gold/50 shadow-inner z-20 pointer-events-none" />

          {/* Right Inward Ticket Notch Cutout */}
          <div className="absolute -right-3.5 top-[58%] -translate-y-1/2 w-7 h-7 rounded-full bg-moon-black border border-moon-gold/50 shadow-inner z-20 pointer-events-none" />

          {/* Background Watermark Crest */}
          <div className="absolute -right-10 -bottom-10 w-44 h-44 rounded-full border border-moon-gold/5 pointer-events-none flex items-center justify-center">
            <span className="font-cinzel text-8xl text-moon-gold/[0.03] select-none font-bold">M</span>
          </div>

          {/* Pass Header */}
          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-2">
              <Sparkles size={15} className="text-moon-gold" />
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-moon-gold font-medium">
                MOON &amp; BEAN SANCTUARY PASS
              </span>
            </div>
            <button
              onClick={onClose}
              className="w-7 h-7 rounded-full glass-pill border border-white/10 hover:border-moon-gold/40 flex items-center justify-center text-moon-muted hover:text-moon-cream transition"
            >
              <X size={14} />
            </button>
          </div>

          {/* Embossed Holographic 24k Gold Crest & Member Title */}
          <div className="flex items-center justify-between gap-4 pt-2 pb-1 border-b border-white/10">
            <div className="space-y-0.5">
              <span className="font-mono text-[9px] uppercase tracking-widest text-moon-muted block">
                VIP SALON RESERVATION
              </span>
              <h3 className="font-cinzel text-xl text-moon-cream font-medium tracking-wide">
                {name || 'Valued Member'}
              </h3>
              <div className="flex items-center gap-1.5 font-mono text-[10px] text-emerald-400">
                <CheckCircle size={11} />
                <span>{status || 'Table Confirmed'}</span>
              </div>
            </div>

            {/* Rotating Shimmering Gold Seal */}
            <div className="relative group shrink-0">
              <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-amber-500/20 via-yellow-200/25 to-amber-700/20 border-2 border-dashed border-moon-gold/70 flex items-center justify-center relative shadow-[0_0_15px_rgba(212,175,55,0.3)]">
                {/* Slow Rotating Ring */}
                <div className="absolute inset-0 rounded-full border border-amber-300/40 animate-[spin_20s_linear_infinite]" />
                <div className="text-center space-y-0.5">
                  <ShieldCheck size={16} className="text-moon-gold mx-auto drop-shadow-[0_0_5px_rgba(212,175,55,0.8)]" />
                  <span className="font-mono text-[7px] text-amber-200 font-bold block uppercase tracking-tighter leading-none">
                    SANCTUARY
                  </span>
                </div>
              </div>
              {/* Foil Shimmer Flare */}
              <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-transparent via-white/15 to-transparent opacity-0 group-hover:opacity-100 transition duration-500 pointer-events-none" />
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-3.5 font-sans text-xs pt-1">
            <div className="space-y-1 bg-white/[0.02] p-2.5 rounded-xl border border-white/5">
              <div className="text-[10px] font-mono uppercase text-moon-muted flex items-center gap-1">
                <Calendar size={11} className="text-moon-gold" /> Date
              </div>
              <div className="font-medium text-moon-cream font-mono text-xs">{date}</div>
            </div>

            <div className="space-y-1 bg-white/[0.02] p-2.5 rounded-xl border border-white/5">
              <div className="text-[10px] font-mono uppercase text-moon-muted flex items-center gap-1">
                <Clock size={11} className="text-moon-gold" /> Time Flight
              </div>
              <div className="font-medium text-moon-cream font-mono text-xs">{timeSlot}</div>
            </div>

            <div className="space-y-1 bg-white/[0.02] p-2.5 rounded-xl border border-white/5">
              <div className="text-[10px] font-mono uppercase text-moon-muted flex items-center gap-1">
                <MapPin size={11} className="text-moon-gold" /> Salon Zone
              </div>
              <div className="font-medium text-moon-cream capitalize text-xs">{zone?.replace('-', ' ')}</div>
            </div>

            <div className="space-y-1 bg-white/[0.02] p-2.5 rounded-xl border border-white/5">
              <div className="text-[10px] font-mono uppercase text-moon-muted flex items-center gap-1">
                <Users size={11} className="text-moon-gold" /> Party
              </div>
              <div className="font-medium text-moon-cream text-xs">{guests}</div>
            </div>
          </div>

          {/* Perforated Gold Tear Line */}
          <div className="relative py-1">
            <div className="w-full border-t-2 border-dashed border-moon-gold/40 shadow-[0_0_8px_rgba(212,175,55,0.3)]" />
          </div>

          {/* QR Verification Stub Section */}
          <div className="bg-black/40 border border-moon-gold/25 rounded-2xl p-4 text-center space-y-3 relative overflow-hidden">
            {/* Subtle Metallic Foil Sheen Line */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-moon-gold/5 to-transparent pointer-events-none" />

            <div className="inline-flex p-3 bg-gradient-to-b from-amber-50 to-moon-cream rounded-xl text-moon-black shadow-[0_5px_20px_rgba(0,0,0,0.5)] border border-amber-300/40 relative">
              <QrCode size={95} />
            </div>

            <div className="space-y-1">
              <div className="font-mono text-xs text-moon-gold tracking-[0.2em] font-semibold">
                № {bookingRef}
              </div>
              <p className="text-[10px] font-sans text-moon-muted leading-tight">
                OFFICIAL SANCTUARY PASS • TABLE CONFIRMED<br />
                <span className="text-[9px] opacity-75 font-mono">Present pass at Concierge check-in</span>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default DigitalPassModal;
