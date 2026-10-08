import React, { useState, useRef } from 'react';
import { gsap } from '../../lib/gsapConfig';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import SpecularGlow from '../ui/SpecularGlow';

const spotlightItems = [
  {
    id: '01',
    name: 'Midnight Obsidian Ristretto',
    category: 'Signature Roast',
    price: '$8.00',
    notes: 'Dark Cocoa • Wild Bergamot • Smoked Cedar',
    origin: 'Sidama Micro-Lot • Ethiopia (2,100m)',
    image: 'https://images.unsplash.com/photo-1512568400610-62da28bc8a13?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: '02',
    name: 'Highland Gesha Chemex',
    category: 'Specialty Single-Origin',
    price: '$14.50',
    notes: 'White Jasmine • Ripe Nectarine • Wild Honey',
    origin: 'Boquete Valley • Panama (1,980m)',
    image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: '03',
    name: 'Kyoto 24-Hour Cold Drip',
    category: 'Cold Extraction',
    price: '$11.50',
    notes: 'Dark Molasses • Cedar Wood • Bittersweet Cocoa',
    origin: 'Sumatra Mandheling • Indonesia (1,600m)',
    image: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: '04',
    name: 'Valrhona Dark Ganache Tart',
    category: 'Fresh Patisserie',
    price: '$14.00',
    notes: 'Grand Cru Chocolate • Salted Toffee • Roasted Hazelnut',
    origin: 'Valrhona Grand Cru • France',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=800&auto=format&fit=crop',
  },
];

const HomeMenu = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);
  const previewImageRef = useRef(null);

  const activeItem = spotlightItems[activeIndex];

  // Cross-dissolve image morph animation on index change
  const handleItemHover = (index) => {
    if (index === activeIndex) return;

    gsap.fromTo(
      previewImageRef.current,
      { opacity: 0.3, scale: 1.08 },
      { opacity: 1, scale: 1, duration: 0.6, ease: 'power2.out' }
    );
    setActiveIndex(index);
  };

  return (
    <section
      ref={containerRef}
      id="menu-preview"
      className="relative min-h-screen bg-moon-dark py-36 px-6 md:px-24 border-t border-white/[0.06] overflow-hidden"
    >
      {/* Background Ambient Radial Glow */}
      <div className="absolute top-1/3 right-10 w-[600px] h-[600px] bg-moon-gold/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-white/10 pb-8">
          <div className="space-y-3">
            <span className="font-sans text-xs uppercase tracking-[0.35em] text-moon-gold font-light block">
              Curated Taste Selection
            </span>
            <h2 className="font-cinzel text-4xl sm:text-6xl text-moon-cream">
              Signature Spotlight
            </h2>
          </div>
          <Link
            to="/menu"
            className="inline-flex items-center gap-2 font-sans text-xs uppercase tracking-widest text-moon-gold border-b border-moon-gold/40 pb-1 hover:border-moon-gold hover:text-moon-amber transition duration-300 group"
          >
            Explore Master Menu
            <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>

        {/* Interactive Spotlight Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Hover List Accordion */}
          <div className="lg:col-span-7 space-y-4">
            {spotlightItems.map((item, index) => {
              const isActive = index === activeIndex;

              return (
                <div
                  key={item.id}
                  onMouseEnter={() => handleItemHover(index)}
                  data-cursor="TASTE"
                  className={`p-6 sm:p-8 rounded-xl transition-all duration-500 cursor-pointer border relative overflow-hidden group ${isActive
                      ? 'glass-card border-moon-gold/50 shadow-2xl scale-[1.02]'
                      : 'border-white/5 hover:border-white/20 bg-white/[0.01] hover:bg-white/[0.03] opacity-70 hover:opacity-100'
                    }`}
                >
                  <SpecularGlow />

                  <div className="relative z-[1] flex justify-between items-center">
                    <div className="space-y-1">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs text-moon-gold tracking-widest">
                          {item.id}
                        </span>
                        <span className="font-mono text-[10px] text-moon-muted uppercase tracking-wider">
                          {item.category}
                        </span>
                      </div>
                      <h3 className="font-cinzel text-2xl sm:text-3xl text-moon-cream font-medium">
                        {item.name}
                      </h3>
                    </div>

                    <span className="font-cinzel text-2xl text-moon-gold font-semibold shrink-0">
                      {item.price}
                    </span>
                  </div>

                  {/* Flavor Notes Accordion Expand */}
                  {isActive && (
                    <div className="relative z-[1] mt-4 pt-4 border-t border-white/10 flex items-center gap-2 text-xs font-sans text-moon-muted">
                      <Sparkles size={14} className="text-moon-gold shrink-0" />
                      <span>{item.notes}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Sticky Dynamic Preview Frame */}
          <div className="lg:col-span-5 sticky top-36">
            <div
              data-cursor="DISCOVER"
              className="relative h-[480px] sm:h-[540px] rounded-2xl overflow-hidden glass-card p-4 border border-moon-gold/30 shadow-2xl group"
            >
              <SpecularGlow />
              <div className="relative z-[1] w-full h-full rounded-xl overflow-hidden">
                <img
                  ref={previewImageRef}
                  src={activeItem.image}
                  alt={activeItem.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-moon-black via-moon-black/30 to-transparent" />

                {/* Overlaid Card Info */}
                <div className="absolute bottom-6 left-6 right-6 p-6 glass-card rounded-xl space-y-2 border border-white/10">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-moon-gold">
                    Origin: {activeItem.origin}
                  </span>
                  <h4 className="font-cinzel text-lg text-moon-cream">
                    {activeItem.name}
                  </h4>
                  <p className="font-sans text-xs text-moon-muted font-light">
                    {activeItem.notes}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeMenu;
