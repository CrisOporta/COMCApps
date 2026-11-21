import { useEffect } from 'react';

/**
 * Global Keyboard Navigation Hook (patrón OptimizaLey).
 * Soporta navegación accesible con Tab / Shift+Tab y atajos Alt / Shift+Alt.
 */
export function useKeyboardNavigation(): void {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Alt' && !e.ctrlKey && !e.metaKey) {
        const target = e.target as HTMLElement | null;
        if (
          target instanceof HTMLInputElement ||
          target instanceof HTMLTextAreaElement ||
          target?.isContentEditable
        ) {
          return;
        }

        e.preventDefault();

        const focusableSelector =
          'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
        const focusables = Array.from(document.querySelectorAll<HTMLElement>(focusableSelector)).filter(
          el =>
            el.offsetParent !== null &&
            !el.hasAttribute('disabled') &&
            el.getAttribute('aria-hidden') !== 'true' &&
            window.getComputedStyle(el).display !== 'none' &&
            window.getComputedStyle(el).visibility !== 'hidden',
        );

        if (focusables.length === 0) return;

        const activeEl = document.activeElement as HTMLElement | null;
        const currentIndex = activeEl ? focusables.indexOf(activeEl) : -1;

        const nextIndex = e.shiftKey
          ? currentIndex <= 0
            ? focusables.length - 1
            : currentIndex - 1
          : currentIndex === -1 || currentIndex >= focusables.length - 1
            ? 0
            : currentIndex + 1;

        const nextEl = focusables[nextIndex];
        if (nextEl) {
          const previous = document.querySelector('[data-focus-visible="true"]');
          if (previous && previous !== nextEl) {
            previous.removeAttribute('data-focus-visible');
          }

          nextEl.setAttribute('data-focus-visible', 'true');
          try {
            nextEl.focus({ focusVisible: true } as FocusOptions);
          } catch {
            nextEl.focus();
          }

          nextEl.addEventListener(
            'blur',
            () => {
              nextEl.removeAttribute('data-focus-visible');
            },
            { once: true },
          );
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
}
