import React from 'react';
import { Flame, Coffee, TreePine, Check } from 'lucide-react';
import SpecularGlow from './SpecularGlow';

export const ZONES = [
  {
    id: 'barista-bar',
    name: 'The Master Roastery & Bar',
    tagline: 'Front-Row Craft Extraction',
    description: 'Front-row polished stone counter seating directly facing our custom brass espresso machines and manual pour-over towers.',
    capacity: '1 - 2 Guests',
    icon: Coffee,
    badge: 'Barista Experience',
  },
  {
    id: 'velvet-lounge',
    name: 'The Nocturne Velvet Lounge',
    tagline: 'Intimate Twilight Sanctuary',
    description: 'Deep velvet banquettes, low acoustic levels, and warm ambient candlelight designed for leisurely tasting flights.',
    capacity: '2 - 6 Guests',
    icon: Flame,
    badge: 'Signature Lounge',
  },
  {
    id: 'roastery-terrace',
    name: 'The Lantern Roastery Terrace',
    tagline: 'Open-Air Garden Canopy',
    description: 'Bespoke heated terrace framed by lush botanicals, glowing amber lanterns, and an open evening breeze.',
    capacity: '2 - 8 Guests',
    icon: TreePine,
    badge: 'Garden Hearth',
  },
];

const FloorPlanPicker = ({ selectedZone, onSelectZone }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <span className="font-mono text-xs text-moon-gold uppercase tracking-widest">
          Select Seating Zone
        </span>
        <span className="font-sans text-[11px] text-moon-muted">
          All zones feature full 7-flight pairing access
        </span>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {ZONES.map((zone) => {
          const isSelected = selectedZone === zone.id;
          const Icon = zone.icon;

          return (
            <div
              key={zone.id}
              onClick={() => onSelectZone(zone.id)}
              className={`p-6 rounded-2xl transition-all duration-500 cursor-pointer border relative overflow-hidden group ${
                isSelected
                  ? 'glass-card border-moon-gold shadow-2xl gold-glow scale-[1.01]'
                  : 'glass-pill border-white/10 hover:border-white/20 hover:bg-white/[0.04]'
              }`}
            >
              <SpecularGlow />

              {/* Amber Pulse Glow on active selection */}
              {isSelected && (
                <div className="absolute top-0 right-0 w-32 h-32 bg-moon-gold/20 rounded-full blur-2xl pointer-events-none animate-pulse" />
              )}

              <div className="flex items-start justify-between gap-4 relative z-10">
                <div className="flex items-start gap-4">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center border shrink-0 transition ${
                      isSelected
                        ? 'bg-moon-gold text-moon-black border-moon-gold'
                        : 'glass-pill text-moon-gold border-white/10 group-hover:border-moon-gold/40'
                    }`}
                  >
                    <Icon size={20} />
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-cinzel text-lg text-moon-cream font-medium">
                        {zone.name}
                      </h4>
                      <span className="px-2 py-0.5 rounded-full text-[9px] font-mono uppercase tracking-wider bg-white/5 text-moon-muted border border-white/10">
                        {zone.badge}
                      </span>
                    </div>

                    <span className="font-mono text-xs text-moon-gold block">
                      {zone.tagline}
                    </span>

                    <p className="font-sans text-xs text-moon-muted font-light leading-relaxed pt-1">
                      {zone.description}
                    </p>
                  </div>
                </div>

                {/* Selected Checkmark Indicator */}
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 border transition ${
                    isSelected
                      ? 'bg-moon-gold text-moon-black border-moon-gold'
                      : 'border-white/20 text-transparent'
                  }`}
                >
                  <Check size={14} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FloorPlanPicker;
