export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface ToastOptions {
  title?: string;
  duration?: number;
  id?: string;
}

export interface ToastItem {
  id: string;
  type: ToastType;
  title: string;
  message: string;
  duration: number;
  createdAt: number;
}

type ToastListener = (toasts: ToastItem[]) => void;

class ToastStore {
  private toasts: ToastItem[] = [];
  private listeners = new Set<ToastListener>();

  public subscribe(listener: ToastListener): () => void {
    this.listeners.add(listener);
    listener([...this.toasts]);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify(): void {
    const copy = [...this.toasts];
    this.listeners.forEach(listener => listener(copy));
  }

  public show(type: ToastType, message: string, options?: ToastOptions): string {
    const existing = this.toasts.find(t => t.type === type && t.message === message);
    if (existing) {
      existing.createdAt = Date.now();
      if (options?.duration) existing.duration = options.duration;
      this.notify();
      return existing.id;
    }

    const id = options?.id ?? `toast-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    const duration = options?.duration ?? 3800;
    const defaultTitles: Record<ToastType, string> = {
      success: 'Listo',
      error: 'Error',
      info: 'Información',
      warning: 'Atención',
    };

    const newToast: ToastItem = {
      id,
      type,
      title: options?.title ?? defaultTitles[type],
      message,
      duration,
      createdAt: Date.now(),
    };

    this.toasts = [...this.toasts.slice(-3), newToast];
    this.notify();
    return id;
  }

  public success(message: string, options?: ToastOptions): string {
    return this.show('success', message, options);
  }

  public error(message: string, options?: ToastOptions): string {
    return this.show('error', message, options);
  }

  public info(message: string, options?: ToastOptions): string {
    return this.show('info', message, options);
  }

  public warning(message: string, options?: ToastOptions): string {
    return this.show('warning', message, options);
  }

  public dismiss(id: string): void {
    this.toasts = this.toasts.filter(t => t.id !== id);
    this.notify();
  }

  public clear(): void {
    this.toasts = [];
    this.notify();
  }
}

export const toast = new ToastStore();
