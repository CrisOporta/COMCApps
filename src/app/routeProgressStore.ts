let globalRouteActive = 0;
const listeners = new Set<() => void>();

export function getRouteActiveCount(): number {
  return globalRouteActive;
}

export function subscribeRouteProgress(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function startRouteProgress(): void {
  globalRouteActive++;
  listeners.forEach(fn => fn());
}

export function stopRouteProgress(): void {
  globalRouteActive = Math.max(0, globalRouteActive - 1);
  listeners.forEach(fn => fn());
}
