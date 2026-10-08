import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, ShoppingBag, Sparkles, Thermometer, Flame, Coffee } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useModalScrollLock } from '../../hooks/useModalScrollLock';

// Beverage Customization Options
const temperatureOptions = ['Hot Barista Pour', 'Over Hand-Cut Ice'];
const strengthOptions = ['Standard Double', 'Triple Extra Shot', 'Decaf Swiss Water'];
const milkOptions = ['Oat Milk', 'Whole Milk', 'Almond Milk', 'No Milk (Black)'];
const finishOptions = ['Unsweetened Pure', 'Raw Honey Blossom', 'Madagascar Vanilla', 'Smoked Sea Salt'];

// Fresh Bakery & Dessert Options
const bakeryTempOptions = ['Warm Oven Baked', 'Room Temperature'];
const accompanimentOptions = ['Cultured French Butter', 'Honey Clotted Cream', 'No Spread'];
const presentationOptions = ['Dine-In Lounge Serve', 'Luxury Takeaway Box'];

const ItemModal = ({ item, isOpen, onClose }) => {
  const { addToCart } = useCart();
  useModalScrollLock(isOpen);

  // Beverage State
  const [temperature, setTemperature] = useState('Hot Barista Pour');
  const [strength, setStrength] = useState('Standard Double');
  const [milk, setMilk] = useState('Oat Milk');
  const [finish, setFinish] = useState('Unsweetened Pure');

  // Bakery State
  const [bakeryTemp, setBakeryTemp] = useState('Warm Oven Baked');
  const [accompaniment, setAccompaniment] = useState('Cultured French Butter');
  const [presentation, setPresentation] = useState('Dine-In Lounge Serve');

  const [quantity, setQuantity] = useState(1);
  const [addedRipple, setAddedRipple] = useState(false);

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

  if (!item) return null;

  const isBeverage = item.category !== 'Fresh Bakery & Desserts';

  const handleAdd = () => {
    const customOptions = isBeverage
      ? {
          Temperature: temperature,
          Milk: milk,
          Strength: strength,
          Finish: finish,
        }
      : {
          Serve: bakeryTemp,
          Spread: accompaniment,
          Packaging: presentation,
        };

    addToCart(item, customOptions, quantity);
    setAddedRipple(true);

    setTimeout(() => {
      setAddedRipple(false);
      onClose();
    }, 400);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          data-lenis-prevent="true"
          className="fixed inset-0 z-[9995] flex items-center justify-center p-3 sm:p-6 overflow-y-auto overscroll-contain"
        >
          {/* Dark Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-moon-black/85 backdrop-blur-md"
          />

          {/* Modal Card */}
          <motion.div
            data-lenis-prevent="true"
            onWheel={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative z-10 w-full max-w-2xl max-h-[88vh] rounded-3xl glass-card border border-white/10 shadow-2xl my-auto flex flex-col overflow-hidden"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full glass-pill flex items-center justify-center text-moon-muted hover:text-moon-cream hover:border-moon-gold/50 transition duration-300"
            >
              <X size={18} />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-12 overflow-hidden flex-1 min-h-0">
              {/* Product Cover Image */}
              <div className="md:col-span-5 relative h-48 md:h-full min-h-[200px] shrink-0 bg-moon-dark">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-moon-black via-transparent to-transparent opacity-60 md:hidden" />
              </div>

              {/* Product Customizer Detail Column */}
              <div className="md:col-span-7 flex flex-col min-h-0 overflow-hidden bg-[#141210]">
                {/* Scrollable Customization Options */}
                <div
                  data-lenis-prevent="true"
                  className="overflow-y-auto overscroll-contain p-6 sm:p-7 space-y-5 flex-1"
                >
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-moon-gold">
                    {item.origin || item.category}
                  </span>
                  <h3 className="font-cinzel text-2xl text-moon-cream font-medium">
                    {item.name}
                  </h3>
                  <span className="font-cinzel text-xl text-moon-gold font-semibold block mt-1">
                    ${typeof item.price === 'number' ? item.price.toFixed(2) : item.price}
                  </span>
                </div>

                <p className="font-sans text-xs text-moon-muted font-light leading-relaxed">
                  {item.description}
                </p>

                {/* Flavor Notes Tags */}
                {item.flavorNotes && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {item.flavorNotes.map((note, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-full text-[10px] font-sans bg-moon-gold/10 text-moon-gold border border-moon-gold/20"
                      >
                        {note}
                      </span>
                    ))}
                  </div>
                )}

                {/* Custom Options Selectors for Beverages */}
                {isBeverage ? (
                  <div className="space-y-4 pt-3 border-t border-white/10">
                    {/* 1. Serving Temperature */}
                    <div className="space-y-1.5">
                      <label className="font-mono text-[10px] uppercase tracking-wider text-moon-muted flex items-center gap-1.5">
                        <Thermometer size={12} className="text-moon-gold" />
                        <span>Temperature</span>
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {temperatureOptions.map((opt) => (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => setTemperature(opt)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-sans transition ${
                              temperature === opt
                                ? 'bg-moon-gold text-moon-black font-semibold'
                                : 'glass-pill text-moon-cream hover:border-moon-gold/40'
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* 2. Espresso Strength / Shot */}
                    <div className="space-y-1.5">
                      <label className="font-mono text-[10px] uppercase tracking-wider text-moon-muted flex items-center gap-1.5">
                        <Coffee size={12} className="text-moon-gold" />
                        <span>Espresso Extraction Profile</span>
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {strengthOptions.map((opt) => (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => setStrength(opt)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-sans transition ${
                              strength === opt
                                ? 'bg-moon-gold text-moon-black font-semibold'
                                : 'glass-pill text-moon-cream hover:border-moon-gold/40'
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* 3. Milk Choice */}
                    <div className="space-y-1.5">
                      <label className="font-mono text-[10px] uppercase tracking-wider text-moon-muted">
                        Milk Alternative
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {milkOptions.map((opt) => (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => setMilk(opt)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-sans transition ${
                              milk === opt
                                ? 'bg-moon-gold text-moon-black font-semibold'
                                : 'glass-pill text-moon-cream hover:border-moon-gold/40'
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* 4. Sweetness & Botanical Finish */}
                    <div className="space-y-1.5">
                      <label className="font-mono text-[10px] uppercase tracking-wider text-moon-muted flex items-center gap-1.5">
                        <Sparkles size={12} className="text-moon-gold" />
                        <span>Sweetness &amp; Finish</span>
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {finishOptions.map((opt) => (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => setFinish(opt)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-sans transition ${
                              finish === opt
                                ? 'bg-moon-gold text-moon-black font-semibold'
                                : 'glass-pill text-moon-cream hover:border-moon-gold/40'
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Custom Options Selectors for Fresh Bakery & Desserts */
                  <div className="space-y-4 pt-3 border-t border-white/10">
                    {/* 1. Bakery Serving Temperature */}
                    <div className="space-y-1.5">
                      <label className="font-mono text-[10px] uppercase tracking-wider text-moon-muted flex items-center gap-1.5">
                        <Flame size={12} className="text-moon-gold" />
                        <span>Service Style</span>
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {bakeryTempOptions.map((opt) => (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => setBakeryTemp(opt)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-sans transition ${
                              bakeryTemp === opt
                                ? 'bg-moon-gold text-moon-black font-semibold'
                                : 'glass-pill text-moon-cream hover:border-moon-gold/40'
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* 2. Artisan Accompaniment */}
                    <div className="space-y-1.5">
                      <label className="font-mono text-[10px] uppercase tracking-wider text-moon-muted">
                        Artisan Accompaniment
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {accompanimentOptions.map((opt) => (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => setAccompaniment(opt)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-sans transition ${
                              accompaniment === opt
                                ? 'bg-moon-gold text-moon-black font-semibold'
                                : 'glass-pill text-moon-cream hover:border-moon-gold/40'
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* 3. Dining Presentation */}
                    <div className="space-y-1.5">
                      <label className="font-mono text-[10px] uppercase tracking-wider text-moon-muted">
                        Dining Presentation
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {presentationOptions.map((opt) => (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => setPresentation(opt)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-sans transition ${
                              presentation === opt
                                ? 'bg-moon-gold text-moon-black font-semibold'
                                : 'glass-pill text-moon-cream hover:border-moon-gold/40'
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
                </div>

                {/* Sticky Pinned Quantity & Add Action Row */}
                <div className="p-4 sm:p-6 border-t border-white/10 bg-[#141210]/95 backdrop-blur-md shrink-0 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3 glass-pill px-3 py-1.5 rounded-full">
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="text-moon-muted hover:text-moon-cream"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="font-mono text-xs text-moon-cream w-4 text-center">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => q + 1)}
                      className="text-moon-muted hover:text-moon-cream"
                    >
                      <Plus size={14} />
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={handleAdd}
                    className={`flex-grow py-3 px-6 rounded-full font-sans text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 transition duration-300 ${
                      addedRipple
                        ? 'bg-emerald-500 text-white scale-95'
                        : 'bg-moon-gold text-moon-black hover:bg-moon-amber shadow-lg shadow-moon-gold/20'
                    }`}
                  >
                    <ShoppingBag size={14} />
                    <span>
                      {addedRipple ? 'Added to Order!' : `Add • $${(item.price * quantity).toFixed(2)}`}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ItemModal;
