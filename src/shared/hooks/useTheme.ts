import { useEffect, useSyncExternalStore } from 'react';

export type ThemeMode = 'light' | 'dark' | 'system';

const STORAGE_KEY = 'comcapps_theme';
const listeners = new Set<() => void>();

function getSystemPrefersDark(): boolean {
  if (typeof window === 'undefined' || !window.matchMedia) return false;
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

export function getStoredThemeMode(): ThemeMode {
  if (typeof window === 'undefined') return 'system';
  const val = localStorage.getItem(STORAGE_KEY);
  if (val === 'dark' || val === 'light' || val === 'system') return val;
  return 'system';
}

function getThemeSnapshot(): string {
  const mode = getStoredThemeMode();
  const sysDark = getSystemPrefersDark();
  return `${mode}:${sysDark ? '1' : '0'}`;
}

const emit = () => listeners.forEach(listener => listener());

function subscribe(listener: () => void) {
  listeners.add(listener);
  window.addEventListener('storage', listener);

  const mql =
    typeof window !== 'undefined' && window.matchMedia
      ? window.matchMedia('(prefers-color-scheme: dark)')
      : null;

  const handleMediaChange = () => {
    if (getStoredThemeMode() === 'system') {
      emit();
    }
  };

  mql?.addEventListener?.('change', handleMediaChange);

  return () => {
    listeners.delete(listener);
    window.removeEventListener('storage', listener);
    mql?.removeEventListener?.('change', handleMediaChange);
  };
}

export function useTheme() {
  const snapshotStr = useSyncExternalStore(subscribe, getThemeSnapshot, () => 'system:0');
  const [themeMode] = snapshotStr.split(':') as [ThemeMode];

  const isDark = themeMode === 'dark' || (themeMode === 'system' && getSystemPrefersDark());
  const theme: 'light' | 'dark' = isDark ? 'dark' : 'light';

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
    document.documentElement.style.backgroundColor = isDark ? '#030303' : '#fbfbfb';
    document.documentElement.style.colorScheme = isDark ? 'dark' : 'light';
  }, [isDark]);

  return {
    theme,
    themeMode,
    isDark,
    setTheme(newMode: ThemeMode) {
      localStorage.setItem(STORAGE_KEY, newMode);
      emit();
    },
    toggle() {
      const next: ThemeMode = isDark ? 'light' : 'dark';
      localStorage.setItem(STORAGE_KEY, next);
      emit();
    },
  };
}
