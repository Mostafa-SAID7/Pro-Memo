/**
 * Keyboard Shortcuts Hook
 */

import { useEffect, useCallback } from 'react';

interface ShortcutConfig {
  key: string;
  ctrl?: boolean;
  shift?: boolean;
  alt?: boolean;
  meta?: boolean;
  handler: (event: KeyboardEvent) => void;
  description?: string;
}

export function useKeyboardShortcuts(shortcuts: ShortcutConfig[]) {
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      for (const shortcut of shortcuts) {
        const keyMatches = event.key.toLowerCase() === shortcut.key.toLowerCase();
        const ctrlMatches = shortcut.ctrl === undefined || event.ctrlKey === shortcut.ctrl;
        const shiftMatches = shortcut.shift === undefined || event.shiftKey === shortcut.shift;
        const altMatches = shortcut.alt === undefined || event.altKey === shortcut.alt;
        const metaMatches = shortcut.meta === undefined || event.metaKey === shortcut.meta;

        if (keyMatches && ctrlMatches && shiftMatches && altMatches && metaMatches) {
          event.preventDefault();
          shortcut.handler(event);
          break;
        }
      }
    },
    [shortcuts]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);
}

// Common keyboard shortcuts
export const SHORTCUTS = {
  COMMAND_PALETTE: { key: 'k', ctrl: true, description: 'Open command palette' },
  NEW_PROJECT: { key: 'n', ctrl: true, shift: true, description: 'Create new project' },
  NEW_TASK: { key: 't', ctrl: true, shift: true, description: 'Create new task' },
  SEARCH: { key: 'f', ctrl: true, description: 'Search' },
  SAVE: { key: 's', ctrl: true, description: 'Save' },
  CLOSE: { key: 'Escape', description: 'Close modal/dialog' },
  HELP: { key: '?', shift: true, description: 'Show keyboard shortcuts' },
};
