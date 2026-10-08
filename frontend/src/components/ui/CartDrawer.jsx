import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useUserAuth } from '../../context/UserAuthContext';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import CheckoutModal from './CheckoutModal';

const CartDrawer = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    removeFromCart,
    updateQuantity,
    subtotal,
    tax,
    total,
  } = useCart();

  const { user } = useUserAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);

  const handleProceedToCheckout = () => {
    if (!user) {
      setIsCartOpen(false);
      navigate('/login', {
        state: {
          from: location.pathname || '/menu',
          openCart: true,
          message: 'Please sign in to complete your tasting order.',
        },
      });
      return;
    }
    setIsCheckoutModalOpen(true);
  };

  return (
    <>
      <AnimatePresence>
        {isCartOpen && (
          <div className="fixed inset-0 z-[9999] overflow-hidden">
            {/* Backdrop Blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-moon-black/75 backdrop-blur-sm"
            />

            {/* Slide-out Panel */}
            <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 28, stiffness: 300 }}
                className="w-screen max-w-md bg-moon-dark border-l border-white/10 p-6 sm:p-8 flex flex-col justify-between shadow-2xl relative z-10"
              >
                {/* Header */}
                <div className="flex items-center justify-between border-b border-white/10 pb-5">
                  <div className="flex items-center gap-3">
                    <ShoppingBag size={20} className="text-moon-gold" />
                    <h3 className="font-cinzel text-xl text-moon-cream font-medium">
                      Your Selection ({cartItems.reduce((a, b) => a + b.quantity, 0)})
                    </h3>
                  </div>

                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="w-8 h-8 rounded-full glass-pill flex items-center justify-center text-moon-muted hover:text-moon-cream"
                  >
                    <X size={16} />
                  </button>
                </div>

                {/* Items List Container */}
                <div className="flex-1 overflow-y-auto py-6 space-y-4 my-2">
                  {cartItems.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center space-y-4 text-moon-muted">
                      <div className="w-16 h-16 rounded-full glass-pill flex items-center justify-center text-moon-gold/50">
                        <ShoppingBag size={28} />
                      </div>
                      <p className="font-cinzel text-base text-moon-cream">
                        Your order is empty
                      </p>
                      <p className="font-sans text-xs max-w-xs">
                        Explore our Master Reserve menu to select single-origin roasts and artisanal pastries.
                      </p>
                    </div>
                  ) : (
                    cartItems.map((item) => (
                      <div
                        key={item.cartItemId}
                        className="p-4 rounded-xl glass-card border border-white/10 flex gap-4 items-center justify-between"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 rounded-lg object-cover border border-white/10 shrink-0"
                        />

                        <div className="flex-1 min-w-0 space-y-1">
                          <h4 className="font-cinzel text-sm text-moon-cream truncate">
                            {item.name}
                          </h4>
                          <span className="font-cinzel text-xs text-moon-gold font-medium block">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>

                          {/* Custom Option Tags */}
                          {item.options && (
                            <div className="flex flex-wrap gap-1 pt-0.5">
                              {Object.entries(item.options).map(([key, val]) => (
                                <span
                                  key={key}
                                  className="text-[9px] font-mono text-moon-muted bg-white/5 px-1.5 py-0.5 rounded"
                                >
                                  {val}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Quantity Controls & Remove */}
                        <div className="flex flex-col items-end gap-2 shrink-0">
                          <button
                            onClick={() => removeFromCart(item.cartItemId)}
                            className="text-moon-muted hover:text-rose-400 transition"
                          >
                            <Trash2 size={14} />
                          </button>

                          <div className="flex items-center gap-2 glass-pill px-2 py-1 rounded-full text-xs">
                            <button
                              onClick={() => updateQuantity(item.cartItemId, -1)}
                              className="text-moon-muted hover:text-moon-cream"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="font-mono text-[11px] text-moon-cream w-3 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.cartItemId, 1)}
                              className="text-moon-muted hover:text-moon-cream"
                            >
                              <Plus size={12} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Footer Summary & Action */}
                {cartItems.length > 0 && (
                  <div className="border-t border-white/10 pt-5 space-y-4">
                    <div className="space-y-1.5 text-xs font-sans text-moon-muted">
                      <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span className="font-mono text-moon-cream">${subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Estimated Tax (8%)</span>
                        <span className="font-mono text-moon-cream">${tax.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between font-semibold text-sm pt-2 border-t border-white/10 text-moon-cream">
                        <span>Total Due</span>
                        <span className="font-mono text-moon-gold text-base">${total.toFixed(2)}</span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <button
                        onClick={handleProceedToCheckout}
                        className="w-full py-4 bg-moon-gold text-moon-black font-sans text-xs uppercase tracking-widest font-semibold rounded-full flex items-center justify-center gap-2 hover:bg-moon-amber transition duration-300 shadow-xl shadow-moon-gold/20"
                      >
                        <span>Proceed to Luxury Checkout</span>
                        <ArrowRight size={16} />
                      </button>

                      <Link
                        to="/reservation"
                        onClick={() => setIsCartOpen(false)}
                        className="w-full py-2.5 glass-pill text-moon-cream font-sans text-[11px] uppercase tracking-wider text-center rounded-full hover:border-moon-gold/40 transition"
                      >
                        Or Book Cupping Reservation
                      </Link>
                    </div>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>

      <CheckoutModal
        isOpen={isCheckoutModalOpen}
        onClose={() => setIsCheckoutModalOpen(false)}
      />
    </>
  );
};

export default CartDrawer;
