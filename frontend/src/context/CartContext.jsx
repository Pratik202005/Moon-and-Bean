import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      // Clear legacy localStorage cart if present
      localStorage.removeItem('moon_and_bean_cart');
      const session = sessionStorage.getItem('moon_and_bean_cart');
      return session ? JSON.parse(session) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [badgeBounce, setBadgeBounce] = useState(false);

  useEffect(() => {
    try {
      sessionStorage.setItem('moon_and_bean_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error(e);
    }
  }, [cartItems]);

  const addToCart = (item, customOptions = {}, quantity = 1) => {
    const optionsKey = JSON.stringify(customOptions);
    const cartItemId = `${item.id}-${optionsKey}`;

    setCartItems((prev) => {
      const existingIndex = prev.findIndex((i) => i.cartItemId === cartItemId);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [
          ...prev,
          {
            ...item,
            cartItemId,
            options: customOptions,
            quantity,
          },
        ];
      }
    });

    // Trigger cart badge animation bounce
    setBadgeBounce(true);
    setTimeout(() => setBadgeBounce(false), 800);
  };

  const removeFromCart = (cartItemId) => {
    setCartItems((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
  };

  const updateQuantity = (cartItemId, delta) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.cartItemId === cartItemId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const parsePrice = (price) => {
    if (typeof price === 'number') return isNaN(price) ? 0 : price;
    if (!price) return 0;
    const cleaned = String(price).replace(/[^0-9.]/g, '');
    const parsed = parseFloat(cleaned);
    return isNaN(parsed) ? 0 : parsed;
  };

  const cartCount = cartItems.reduce((acc, item) => acc + (Number(item.quantity) || 1), 0);
  const subtotal = cartItems.reduce(
    (acc, item) => acc + parsePrice(item.price) * (Number(item.quantity) || 1),
    0
  );
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        cartCount,
        subtotal,
        tax,
        total,
        badgeBounce,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
