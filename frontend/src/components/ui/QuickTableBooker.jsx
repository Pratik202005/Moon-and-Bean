import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, X } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import SpecularGlow from './SpecularGlow';

/**
 * QuickTableBooker - Floating Magnetic "Quick Table Booker" Bar
 *
 * Appears when scrolling past the Hero on the Home page.
 * Discreet and elegant: disappears when stationary (after inactivity),
 * when drawers (such as Cart) are open, or when arriving at the full footer CTA.
 */
const QuickTableBooker = () => {
  const { isCartOpen } = useCart();
  const [isPastHero, setIsPastHero] = useState(false);
  const [isNearBottom, setIsNearBottom] = useState(false);
  const [isStationary, setIsStationary] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  const stationaryTimeoutRef = useRef(null);

  // Reset stationary timer on activity (scroll or mouse movement)
  const wakeUpBar = () => {
    setIsStationary(false);
    if (stationaryTimeoutRef.current) {
      clearTimeout(stationaryTimeoutRef.current);
    }
    stationaryTimeoutRef.current = setTimeout(() => {
      // If user isn't hovering directly over the bar, gently tuck away
      setIsStationary(true);
    }, 4500); // 4.5 seconds of no activity
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const heroThreshold = window.innerHeight * 0.65;
      setIsPastHero(scrollY > heroThreshold);

      // Check if near bottom reservation CTA section (hide duplicate CTA)
      const docHeight = document.documentElement.scrollHeight;
      const winHeight = window.innerHeight;
      const bottomThreshold = docHeight - winHeight - 650;
      setIsNearBottom(scrollY > bottomThreshold);

      wakeUpBar();
    };

    const handleMouseMove = () => {
      wakeUpBar();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Initial check
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      if (stationaryTimeoutRef.current) {
        clearTimeout(stationaryTimeoutRef.current);
      }
    };
  }, []);

  // Determine visibility condition
  const shouldShow =
    isPastHero &&
    !isNearBottom &&
    !isCartOpen &&
    !isDismissed &&
    (!isStationary || isHovered);

  return (
    <AnimatePresence>
      {shouldShow && (
        <motion.div
          key="quick-table-booker"
          initial={{ opacity: 0, y: 35, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.95 }}
          transition={{ type: 'spring', damping: 26, stiffness: 320 }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-[92%] sm:w-auto max-w-xl"
        >
          <div className="relative rounded-full glass-card border border-moon-gold/35 shadow-[0_20px_50px_rgba(0,0,0,0.85),0_0_30px_rgba(212,175,55,0.15)] backdrop-blur-2xl bg-[#141210]/92 px-4 py-2.5 sm:px-6 sm:py-3 flex items-center justify-between gap-3 sm:gap-6 overflow-hidden group">
            {/* Dynamic Specular Sheen on Hover */}
            <SpecularGlow
              glowColor="rgba(212, 175, 55, 0.22)"
              borderColor="rgba(212, 175, 55, 0.7)"
              size={300}
              borderSize={220}
            />

            {/* Left Availability Indicator & Text */}
            <div className="relative z-[1] flex items-center gap-2.5 sm:gap-3.5 min-w-0">
              {/* Pulsing 24k Gold Indicator Dot */}
              <div className="relative flex h-2.5 w-2.5 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-moon-gold opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-moon-gold shadow-[0_0_8px_rgba(212,175,55,0.8)]" />
              </div>

              {/* Editorial Message */}
              <div className="truncate">
                <span className="hidden sm:inline font-cinzel text-xs md:text-sm text-moon-cream font-medium tracking-wide">
                  Exclusive Tasting Reservations Available Tonight
                </span>
                <span className="sm:hidden font-cinzel text-xs text-moon-cream font-medium tracking-wide">
                  Tasting Tables Available Tonight
                </span>
              </div>
            </div>

            {/* Right Action: Gold Pill Button & Close Button */}
            <div className="relative z-[1] flex items-center gap-2 shrink-0">
              <Link
                to="/reservation"
                className="px-4 py-2 sm:px-5 sm:py-2 rounded-full bg-gradient-to-r from-moon-gold to-amber-400 text-moon-black font-sans text-xs uppercase tracking-widest font-semibold flex items-center gap-1.5 hover:from-amber-400 hover:to-moon-gold transition duration-300 shadow-lg shadow-moon-gold/25 group/btn"
              >
                <span>Reserve Table</span>
                <ArrowRight
                  size={13}
                  className="group-hover/btn:translate-x-0.5 transition-transform"
                />
              </Link>

              {/* Discreet Dismiss Button */}
              <button
                type="button"
                onClick={() => setIsDismissed(true)}
                title="Dismiss for now"
                className="w-6 h-6 rounded-full flex items-center justify-center text-moon-muted/60 hover:text-moon-cream transition hover:bg-white/5"
              >
                <X size={12} />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default QuickTableBooker;
