import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ScrollTrigger } from '../lib/gsapConfig';

const useScrollReset = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      // Reset standard window scroll to top
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }

    // Refresh GSAP ScrollTrigger instances for new page height
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);
  }, [pathname, hash]);
};

export default useScrollReset;
