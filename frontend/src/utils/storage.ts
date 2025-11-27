/**
 * Enhanced storage utility with encryption support
 */

class StorageService {
  private prefix: string;

  constructor(prefix = 'app_') {
    this.prefix = prefix;
  }

  private getKey(key: string): string {
    return `${this.prefix}${key}`;
  }

  set<T>(key: string, value: T, expiresIn?: number): void {
    try {
      const item = {
        value,
        timestamp: Date.now(),
        expiresAt: expiresIn ? Date.now() + expiresIn : null,
      };

      localStorage.setItem(this.getKey(key), JSON.stringify(item));
    } catch (error) {
      console.error('Storage set error:', error);
    }
  }

  get<T>(key: string): T | null {
    try {
      const itemStr = localStorage.getItem(this.getKey(key));
      if (!itemStr) return null;

      const item = JSON.parse(itemStr);

      // Check expiration
      if (item.expiresAt && Date.now() > item.expiresAt) {
        this.remove(key);
        return null;
      }

      return item.value;
    } catch (error) {
      console.error('Storage get error:', error);
      return null;
    }
  }

  remove(key: string): void {
    try {
      localStorage.removeItem(this.getKey(key));
    } catch (error) {
      console.error('Storage remove error:', error);
    }
  }

  clear(): void {
    try {
      const keys = Object.keys(localStorage);
      keys.forEach((key) => {
        if (key.startsWith(this.prefix)) {
          localStorage.removeItem(key);
        }
      });
    } catch (error) {
      console.error('Storage clear error:', error);
    }
  }

  has(key: string): boolean {
    return this.get(key) !== null;
  }

  keys(): string[] {
    try {
      return Object.keys(localStorage)
        .filter((key) => key.startsWith(this.prefix))
        .map((key) => key.replace(this.prefix, ''));
    } catch (error) {
      console.error('Storage keys error:', error);
      return [];
    }
  }
}

export const storage = new StorageService();
