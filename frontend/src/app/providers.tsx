'use client';

import { ThemeProvider } from 'next-themes';
import { ReactNode } from 'react';
import { AuthProvider } from '@/contexts/AuthContext';
import { CommandPalette } from '@/components/CommandPalette';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <AuthProvider>
        {children}
        <CommandPalette />
      </AuthProvider>
    </ThemeProvider>
  );
}
