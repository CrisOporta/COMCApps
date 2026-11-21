import { useEffect } from 'react';
import { useLocation } from 'react-router';

export function PrelineScript() {
  const location = useLocation();

  useEffect(() => {
    import('preline')
      .then(mod => {
        const hs = mod.HSStaticMethods || window.HSStaticMethods;
        hs?.autoInit();
      })
      .catch(() => {
        // Ignorar en entornos sin DOM
      });
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (typeof window !== 'undefined' && window.HSStaticMethods) {
        window.HSStaticMethods.autoInit();
      }
    }, 100);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return null;
}
