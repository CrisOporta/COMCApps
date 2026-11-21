import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router';
import { getRouteTitle, setDocumentTitle } from '@/shared/lib/pageTitle';
import { PrelineScript } from '@/shared/components/ui/PrelineScript';
import { startRouteProgress, stopRouteProgress } from './routeProgressStore';

export function RouteTitleWatcher() {
  const location = useLocation();

  useEffect(() => {
    setDocumentTitle(getRouteTitle(location.pathname));
    if (!location.hash) {
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    }
  }, [location.pathname, location.hash]);

  useEffect(() => {
    startRouteProgress();
    const timer = setTimeout(() => {
      stopRouteProgress();
    }, 240);
    return () => {
      clearTimeout(timer);
      stopRouteProgress();
    };
  }, [location.pathname, location.search]);

  return (
    <>
      <PrelineScript />
      <Outlet />
    </>
  );
}
