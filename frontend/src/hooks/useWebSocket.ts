// WebSocket Hook

import { useEffect, useCallback } from 'react';
import { wsClient, WS_EVENTS } from '@/lib/websocket';

export function useWebSocket() {
  useEffect(() => {
    wsClient.connect();

    return () => {
      // Don't disconnect on unmount, keep connection alive
    };
  }, []);

  const on = useCallback((event: string, callback: (data: any) => void) => {
    wsClient.on(event, callback);
    return () => wsClient.off(event, callback);
  }, []);

  const send = useCallback((event: string, data: any) => {
    wsClient.send(event, data);
  }, []);

  const isConnected = useCallback(() => {
    return wsClient.isConnected();
  }, []);

  return { on, send, isConnected, WS_EVENTS };
}
