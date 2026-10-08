import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Users, Clock, MapPin, Printer, ArrowRight, Sparkles, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ZONES } from './FloorPlanPicker';
import SpecularGlow from './SpecularGlow';
import { useModalScrollLock } from '../../hooks/useModalScrollLock';

const ReservationModal = ({ isOpen, onClose, reservationData }) => {
  useModalScrollLock(isOpen);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!reservationData) return null;

  const zoneInfo = ZONES.find((z) => z.id === reservationData.zone) || ZONES[0];

  const handlePrint = () => {
    window.print();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          data-lenis-prevent="true"
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 overflow-y-auto overscroll-contain"
        >
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-moon-black/85 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            data-lenis-prevent="true"
            onWheel={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ type: 'spring', damping: 28, stiffness: 320 }}
            className="relative z-10 w-full max-w-lg rounded-3xl glass-card border-2 border-moon-gold/60 gold-glow p-8 sm:p-10 shadow-2xl text-center space-y-8 my-auto overflow-y-auto overscroll-contain max-h-[90vh]"
          >
            {/* Background Ambient Glow */}
            <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-64 h-64 bg-moon-gold/20 rounded-full blur-3xl pointer-events-none" />

            {/* Celebratory Icon Header */}
            <div className="space-y-3 relative z-10">
              <div className="w-16 h-16 rounded-full bg-moon-gold/10 text-moon-gold border border-moon-gold/40 flex items-center justify-center mx-auto">
                <Sparkles size={28} className="animate-pulse" />
              </div>
              <span className="font-mono text-xs uppercase tracking-[0.35em] text-moon-gold font-light block">
                Reservation Confirmed
              </span>
              <h2 className="font-cinzel text-3xl sm:text-4xl text-moon-cream font-medium">
                Sanctuary Pass
              </h2>
            </div>

            {/* Digital Pass Ticket Card */}
            <div className="rounded-2xl bg-moon-black/80 border border-moon-gold/40 p-6 space-y-6 text-left relative overflow-hidden group">
              <SpecularGlow />
              {/* Reference Code & Barcode */}
              <div className="flex justify-between items-center border-b border-white/10 pb-4 font-mono text-xs">
                <div>
                  <span className="text-moon-muted block text-[10px] uppercase">Pass Code</span>
                  <span className="text-moon-gold font-bold text-sm tracking-wider">
                    {reservationData.refCode || 'MNB-8821-X'}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-moon-muted block text-[10px] uppercase">Status</span>
                  <span className="text-emerald-400 font-semibold uppercase text-[11px] flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    Guaranteed
                  </span>
                </div>
              </div>

              {/* Guest & Zone Metadata */}
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 text-moon-gold font-mono text-[10px] uppercase">
                    <Users size={12} />
                    <span>Guests</span>
                  </div>
                  <p className="font-cinzel text-moon-cream text-base font-medium">
                    {reservationData.guests}
                  </p>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 text-moon-gold font-mono text-[10px] uppercase">
                    <Calendar size={12} />
                    <span>Date</span>
                  </div>
                  <p className="font-cinzel text-moon-cream text-base font-medium">
                    {reservationData.date}
                  </p>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 text-moon-gold font-mono text-[10px] uppercase">
                    <Clock size={12} />
                    <span>Time Slot</span>
                  </div>
                  <p className="font-cinzel text-moon-cream text-base font-medium">
                    {reservationData.timeSlot}
                  </p>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 text-moon-gold font-mono text-[10px] uppercase">
                    <MapPin size={12} />
                    <span>Zone</span>
                  </div>
                  <p className="font-cinzel text-moon-cream text-base font-medium truncate">
                    {zoneInfo.name}
                  </p>
                </div>
              </div>

              {/* Guest Name & Notes */}
              <div className="pt-3 border-t border-white/10 flex justify-between items-center text-xs">
                <div>
                  <span className="text-moon-muted text-[10px] uppercase block font-mono">Reserved For</span>
                  <span className="font-sans text-moon-cream font-medium">
                    {reservationData.name}
                  </span>
                </div>
                {reservationData.occasion && (
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-mono uppercase bg-moon-gold/10 text-moon-gold border border-moon-gold/30">
                    {reservationData.occasion}
                  </span>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
              <button
                onClick={handlePrint}
                className="w-full sm:w-1/2 py-3.5 px-6 rounded-full glass-pill text-moon-cream text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 hover:border-moon-gold/50 transition duration-300"
              >
                <Printer size={15} />
                <span>Print Pass</span>
              </button>

              <Link
                to="/"
                onClick={onClose}
                className="w-full sm:w-1/2 py-3.5 px-6 rounded-full bg-moon-gold text-moon-black text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 hover:bg-moon-amber transition duration-300 shadow-lg shadow-moon-gold/20"
              >
                <span>Return Home</span>
                <ArrowRight size={15} />
              </Link>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ReservationModal;
