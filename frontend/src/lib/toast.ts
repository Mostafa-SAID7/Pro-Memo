/**
 * Toast notification system
 * Lightweight toast notifications without external dependencies
 */

export type ToastType = 'success' | 'error' | 'warning' | 'info';

interface ToastOptions {
  message: string;
  type?: ToastType;
  duration?: number;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';
}

class ToastManager {
  private container: HTMLDivElement | null = null;

  private getContainer(): HTMLDivElement {
    if (!this.container) {
      this.container = document.createElement('div');
      this.container.id = 'toast-container';
      this.container.style.cssText = `
        position: fixed;
        z-index: 9999;
        pointer-events: none;
      `;
      document.body.appendChild(this.container);
    }
    return this.container;
  }

  private getPositionStyles(position: string): string {
    const positions: Record<string, string> = {
      'top-right': 'top: 1rem; right: 1rem;',
      'top-left': 'top: 1rem; left: 1rem;',
      'bottom-right': 'bottom: 1rem; right: 1rem;',
      'bottom-left': 'bottom: 1rem; left: 1rem;',
      'top-center': 'top: 1rem; left: 50%; transform: translateX(-50%);',
      'bottom-center': 'bottom: 1rem; left: 50%; transform: translateX(-50%);',
    };
    return positions[position] || positions['top-right'];
  }

  private getTypeStyles(type: ToastType): { bg: string; icon: string } {
    const styles = {
      success: { bg: '#10b981', icon: '✓' },
      error: { bg: '#ef4444', icon: '✕' },
      warning: { bg: '#f59e0b', icon: '⚠' },
      info: { bg: '#3b82f6', icon: 'ℹ' },
    };
    return styles[type];
  }

  show(options: ToastOptions): void {
    const {
      message,
      type = 'info',
      duration = 3000,
      position = 'top-right',
    } = options;

    const container = this.getContainer();
    const toast = document.createElement('div');
    const { bg, icon } = this.getTypeStyles(type);

    toast.style.cssText = `
      ${this.getPositionStyles(position)}
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 1rem 1.5rem;
      background: ${bg};
      color: white;
      border-radius: 0.5rem;
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
      font-size: 0.875rem;
      font-weight: 500;
      pointer-events: auto;
      animation: slideIn 0.3s ease-out;
      margin-bottom: 0.5rem;
      max-width: 400px;
    `;

    toast.innerHTML = `
      <span style="font-size: 1.25rem;">${icon}</span>
      <span>${message}</span>
    `;

    // Add animation styles
    if (!document.getElementById('toast-styles')) {
      const style = document.createElement('style');
      style.id = 'toast-styles';
      style.textContent = `
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-1rem);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slideOut {
          from {
            opacity: 1;
            transform: translateY(0);
          }
          to {
            opacity: 0;
            transform: translateY(-1rem);
          }
        }
      `;
      document.head.appendChild(style);
    }

    container.appendChild(toast);

    // Auto remove
    setTimeout(() => {
      toast.style.animation = 'slideOut 0.3s ease-out';
      setTimeout(() => {
        container.removeChild(toast);
        if (container.children.length === 0) {
          document.body.removeChild(container);
          this.container = null;
        }
      }, 300);
    }, duration);
  }

  success(message: string, duration?: number): void {
    this.show({ message, type: 'success', duration });
  }

  error(message: string, duration?: number): void {
    this.show({ message, type: 'error', duration });
  }

  warning(message: string, duration?: number): void {
    this.show({ message, type: 'warning', duration });
  }

  info(message: string, duration?: number): void {
    this.show({ message, type: 'info', duration });
  }
}

export const toast = new ToastManager();
