import { useEffect, useRef, useSyncExternalStore } from 'react';
import NProgress from 'nprogress';
import { getRouteActiveCount, subscribeRouteProgress } from './routeProgressStore';

NProgress.configure({
  showSpinner: false,
  speed: 300,
  minimum: 0.14,
  trickle: true,
  trickleSpeed: 220,
});

export function RequestProgress() {
  const activeCount = useSyncExternalStore(
    subscribeRouteProgress,
    getRouteActiveCount,
    () => 0,
  );

  const isStartedRef = useRef(false);
  const doneTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (activeCount > 0) {
      if (doneTimeoutRef.current) {
        clearTimeout(doneTimeoutRef.current);
        doneTimeoutRef.current = null;
      }
      if (!isStartedRef.current) {
        isStartedRef.current = true;
        NProgress.start();
      } else {
        NProgress.inc(0.08);
      }
    } else if (isStartedRef.current && !doneTimeoutRef.current) {
      doneTimeoutRef.current = setTimeout(() => {
        isStartedRef.current = false;
        doneTimeoutRef.current = null;
        NProgress.done();
      }, 220);
    }
  }, [activeCount]);

  useEffect(() => {
    return () => {
      if (doneTimeoutRef.current) clearTimeout(doneTimeoutRef.current);
      NProgress.done();
    };
  }, []);

  return null;
}
