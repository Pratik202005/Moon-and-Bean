import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Compass, Flame, Droplets, Coffee, ShieldCheck, ArrowRight } from 'lucide-react';
import HomeStory from '../components/sections/HomeStory';
import HomeGallery from '../components/sections/HomeGallery';
import HomeCTA from '../components/sections/HomeCTA';

const Story = () => {
  const craftPillars = [
    {
      icon: Compass,
      number: '01',
      title: 'High-Altitude Sourcing',
      subtitle: '2,200m Micro-Lots',
      description:
        'We forge direct trade partnerships with multi-generational smallholder farmers in Ethiopia, Panama, and Colombia. Every lot is shade-grown, hand-harvested, and strictly grade 1.',
    },
    {
      icon: Flame,
      number: '02',
      title: 'Twilight Roasting Curve',
      subtitle: 'Precision Small-Batch',
      description:
        'Each origin profile is meticulously developed in micro-batches under infrared convective heat to caramelize natural berry and floral notes without introducing bitter acridity.',
    },
    {
      icon: Droplets,
      number: '03',
      title: 'Slow Extraction Rituals',
      subtitle: 'Water Chemistry & Pressure',
      description:
        'Every cup utilizes reverse-osmosis remineralized brewing water tailored to exact TDS targets, whether pulled through 9-bar saturated groups or 24-hour slow-drip Kyoto towers.',
    },
    {
      icon: Coffee,
      number: '04',
      title: 'The Sanctuary Lounge',
      subtitle: 'Intimate Tasting Sessions',
      description:
        'Designed as an oasis from the urban tempo, our velvet salon features low ambient lighting, tactile raw stone, and unhurried flight tastings guided by certified Q-graders.',
    },
  ];

  const origins = [
    {
      region: 'Guji, Ethiopia',
      elevation: '2,100 — 2,250m',
      process: 'Natural / Sun-Dried',
      notes: 'Wild Jasmine, Bergamot, Black Currant',
      coords: "09°01'N 38°44'E",
    },
    {
      region: 'Boquete, Panama',
      elevation: '1,800 — 1,950m',
      process: 'Anaerobic Washed',
      notes: 'White Peach, Honeycomb, Meyer Lemon',
      coords: "08°46'N 82°26'W",
    },
    {
      region: 'Huila, Colombia',
      elevation: '1,750 — 1,900m',
      process: 'Double Fermentation',
      notes: 'Dark Cocoa, Bourbon Vanilla, Dried Fig',
      coords: "02°55'N 75°18'W",
    },
  ];

  return (
    <main className="min-h-screen bg-moon-black text-moon-cream pt-32 pb-24 overflow-hidden">
      {/* Background Ambient Radial Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-moon-gold/5 rounded-full blur-[180px] pointer-events-none" />

      {/* Hero Header Section */}
      <section className="relative px-6 md:px-16 max-w-7xl mx-auto text-center space-y-6 pb-20">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill border border-moon-gold/30">
          <Sparkles size={14} className="text-moon-gold animate-pulse" />
          <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.3em] text-moon-gold font-light">
            OUR HERITAGE &amp; PHILOSOPHY
          </span>
        </div>

        <h1 className="font-cinzel text-5xl sm:text-7xl md:text-8xl text-moon-cream font-medium tracking-wide">
          The Story of <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-moon-cream via-moon-gold to-moon-amber">
            Moon &amp; Bean
          </span>
        </h1>

        <p className="font-sans text-sm sm:text-base md:text-lg text-moon-muted font-light leading-relaxed max-w-2xl mx-auto">
          Born out of a fascination with twilight roasts, lunar tranquility, and uncompromising coffee artistry. We elevate every cup into an unhurried, multisensory experience.
        </p>

        {/* Quick Heritage Metric Counter */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-10 max-w-4xl mx-auto border-t border-white/10">
          <div className="space-y-1">
            <span className="font-cinzel text-3xl sm:text-4xl text-moon-gold font-bold">2,200m</span>
            <p className="font-mono text-[10px] uppercase tracking-widest text-moon-muted">Peak Altitude</p>
          </div>
          <div className="space-y-1">
            <span className="font-cinzel text-3xl sm:text-4xl text-moon-gold font-bold">100%</span>
            <p className="font-mono text-[10px] uppercase tracking-widest text-moon-muted">Direct Ethical Trade</p>
          </div>
          <div className="space-y-1">
            <span className="font-cinzel text-3xl sm:text-4xl text-moon-gold font-bold">48h</span>
            <p className="font-mono text-[10px] uppercase tracking-widest text-moon-muted">Cold Fermentation</p>
          </div>
          <div className="space-y-1">
            <span className="font-cinzel text-3xl sm:text-4xl text-moon-gold font-bold">18</span>
            <p className="font-mono text-[10px] uppercase tracking-widest text-moon-muted">Exclusive Tables</p>
          </div>
        </div>
      </section>

      {/* Main Interactive Story Showcase */}
      <HomeStory />

      {/* Four Craft Pillars */}
      <section className="relative px-6 md:px-16 max-w-7xl mx-auto py-24 space-y-16">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="font-mono text-xs text-moon-gold uppercase tracking-[0.3em] font-light">
            THE FOUR PILLARS
          </span>
          <h2 className="font-cinzel text-3xl sm:text-5xl text-moon-cream font-medium">
            Our Roastery Discipline
          </h2>
          <p className="font-sans text-xs sm:text-sm text-moon-muted font-light leading-relaxed">
            Every step in our ritual is deliberate, engineered for depth, character, and tranquility.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {craftPillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.number}
                className="glass-card p-8 rounded-3xl border border-white/10 hover:border-moon-gold/40 transition duration-500 space-y-5 flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl glass-pill flex items-center justify-center text-moon-gold group-hover:scale-110 transition duration-300">
                      <Icon size={22} />
                    </div>
                    <span className="font-mono text-xs text-moon-gold/50 font-semibold tracking-widest">
                      {pillar.number}
                    </span>
                  </div>

                  <h3 className="font-cinzel text-xl text-moon-cream font-medium pt-2">
                    {pillar.title}
                  </h3>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-moon-gold block">
                    {pillar.subtitle}
                  </span>
                  <p className="font-sans text-xs text-moon-muted font-light leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/5 flex items-center gap-2 text-[10px] font-mono text-moon-muted uppercase tracking-wider">
                  <ShieldCheck size={12} className="text-moon-gold" />
                  <span>Certified Craft Standard</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Single-Origin Terroirs Section */}
      <section className="relative px-6 md:px-16 max-w-7xl mx-auto py-20 space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
          <div className="space-y-2">
            <span className="font-mono text-xs text-moon-gold uppercase tracking-[0.3em]">
              TERROIR SPOTLIGHT
            </span>
            <h2 className="font-cinzel text-3xl sm:text-4xl text-moon-cream font-medium">
              Where Our Beans Originate
            </h2>
          </div>
          <Link
            to="/menu"
            className="inline-flex items-center gap-2 text-xs font-sans uppercase tracking-widest text-moon-gold hover:text-moon-cream transition"
          >
            <span>Explore Current Harvests</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {origins.map((origin) => (
            <div
              key={origin.region}
              className="glass-card p-8 rounded-3xl border border-white/10 space-y-4 hover:border-moon-gold/30 transition"
            >
              <div className="flex justify-between items-center text-xs font-mono text-moon-gold">
                <span>{origin.coords}</span>
                <span className="px-2.5 py-0.5 rounded-full bg-moon-gold/10 border border-moon-gold/20 text-[10px]">
                  {origin.process}
                </span>
              </div>
              <h3 className="font-cinzel text-2xl text-moon-cream">{origin.region}</h3>
              <div className="space-y-1.5 pt-2 text-xs font-sans">
                <p className="text-moon-muted">
                  Elevation: <span className="text-moon-cream font-mono">{origin.elevation}</span>
                </p>
                <p className="text-moon-muted">
                  Flavor Profile: <span className="text-moon-gold font-light">{origin.notes}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Atmospheric Gallery Showcase */}
      <HomeGallery />

      {/* Reservation & Tasting Invitation CTA */}
      <HomeCTA />
    </main>
  );
};

export default Story;
