import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, ShieldCheck } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="relative bg-moon-black text-moon-cream border-t border-white/[0.08] pt-20 pb-12 px-6 md:px-24 overflow-hidden select-none">
      {/* Subtle Background Glow */}
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-moon-gold/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-16">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
          {/* Brand Column */}
          <div className="md:col-span-5 space-y-6">
            <Link to="/" className="font-cinzel text-3xl tracking-[0.25em] text-moon-cream font-bold block">
              MOON <span className="text-moon-gold">&amp;</span> BEAN
            </Link>

            <p className="font-sans text-xs text-moon-muted font-light leading-relaxed max-w-sm">
              An artisanal roastery &amp; coffee house dedicated to twilight micro-lots, velvety espresso blends, and curated night &amp; day tasting experiences.
            </p>
          </div>

          {/* Quick Links Column */}
          <div className="md:col-span-3 space-y-4">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-moon-gold font-medium block">
              Navigation
            </span>
            <ul className="space-y-2.5 font-sans text-xs text-moon-muted">
              <li>
                <Link to="/" className="hover:text-moon-gold transition duration-300">
                  Home Experience
                </Link>
              </li>
              <li>
                <Link to="/menu" className="hover:text-moon-gold transition duration-300">
                  Craft Menu
                </Link>
              </li>
              <li>
                <Link to="/story" className="hover:text-moon-gold transition duration-300">
                  Our Ritual &amp; Story
                </Link>
              </li>
              <li>
                <Link to="/reservation" className="hover:text-moon-gold transition duration-300">
                  Private Reservation
                </Link>
              </li>
            </ul>
          </div>

          {/* Salon Coordinates Column */}
          <div className="md:col-span-4 space-y-4">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-moon-gold font-medium block">
              Tasting Salon
            </span>
            <div className="space-y-2 font-sans text-xs text-moon-muted font-light leading-relaxed">
              <p className="flex items-center gap-2">
                <Compass size={14} className="text-moon-gold shrink-0" />
                <span>Sanctuary Avenue • Moon &amp; Bean Lounge</span>
              </p>
              <p>Daily Tastings: 08:00 — 23:00</p>
              <p className="pt-2 text-moon-cream font-mono text-[11px]">
                reservations@moonandbean.com
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Micro Copyright Bar */}
        <div className="pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row justify-between items-center gap-4 font-mono text-[10px] text-moon-muted">
          <span>© 2026 MOON &amp; BEAN LUXURY ROASTERY. ALL RIGHTS RESERVED.</span>

          <div className="flex items-center gap-6">
            <Link
              to="/admin/login"
              className="flex items-center gap-1.5 hover:text-moon-gold transition tracking-wider text-moon-gold/70"
            >
              <ShieldCheck size={12} />
              <span>STAFF ACCESS</span>
            </Link>
            <span className="tracking-widest">DESIGNED FOR CONNOISSEURS</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
