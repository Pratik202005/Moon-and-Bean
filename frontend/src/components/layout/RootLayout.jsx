import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import CustomCursor from '../ui/CustomCursor';
import Preloader from '../ui/Preloader';
import ToastNotification from '../ui/ToastNotification';
import SmoothScrollWrapper from './SmoothScrollWrapper';
import CartDrawer from '../ui/CartDrawer';
import useScrollReset from '../../hooks/useScrollReset';

const LayoutContent = () => {
  // Execute scroll reset on route change
  useScrollReset();
  const [toast, setToast] = useState(null);

  // Intro preloader state check via sessionStorage
  const [hasVisitedSession, setHasVisitedSession] = useState(() => {
    return !!sessionStorage.getItem('moon_and_bean_intro_played');
  });

  const [introFinished, setIntroFinished] = useState(() => {
    return !!sessionStorage.getItem('moon_and_bean_intro_played');
  });

  const handlePreloaderComplete = () => {
    sessionStorage.setItem('moon_and_bean_intro_played', 'true');
    setHasVisitedSession(true);
    setIntroFinished(true);
  };

  return (
    <SmoothScrollWrapper>
      <div className="relative min-h-screen bg-moon-black text-moon-cream selection:bg-moon-gold/30 selection:text-moon-cream font-sans overflow-x-hidden">
        {/* Luxury Entrance Preloader - Only runs on first session visit */}
        {!hasVisitedSession && (
          <Preloader onComplete={handlePreloaderComplete} />
        )}

        {/* Custom Dynamic Spring Physics Cursor */}
        <CustomCursor />

        {/* Global Film Grain SVG Overlay */}
        <div className="fixed inset-0 pointer-events-none bg-noise z-[9990] opacity-60" />

        {/* Fixed Header Navbar */}
        <Header />

        {/* Slide-out Cart Drawer */}
        <CartDrawer />

        {/* Interactive Toast Alert */}
        <ToastNotification toast={toast} onClose={() => setToast(null)} />

        {/* Page Content Outlet */}
        <div className="relative z-10">
          <Outlet context={{ introFinished }} />
        </div>

        {/* Luxury Editorial Footer */}
        <Footer />
      </div>
    </SmoothScrollWrapper>
  );
};

const RootLayout = () => {
  return <LayoutContent />;
};

export default RootLayout;
