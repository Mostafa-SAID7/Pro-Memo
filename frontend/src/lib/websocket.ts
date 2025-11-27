// WebSocket Client for Real-time Features

import { api } from './api';

type EventCallback = (data: any) => void;

class WebSocketClient {
  private ws: WebSocket | null = null;
  private url: string;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectDelay = 3000;
  private listeners: Map<string, Set<EventCallback>> = new Map();
  private isConnecting = false;

  constructor() {
    const wsUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
    this.url = wsUrl.replace('http', 'ws');
  }

  connect() {
    if (this.ws?.readyState === WebSocket.OPEN || this.isConnecting) {
      return;
    }

    const token = api.getToken();
    if (!token) {
      console.warn('No auth token available for WebSocket connection');
      return;
    }

    this.isConnecting = true;

    try {
      this.ws = new WebSocket(`${this.url}?token=${token}`);

      this.ws.onopen = () => {
        console.log('✅ WebSocket connected');
        this.isConnecting = false;
        this.reconnectAttempts = 0;
        this.emit('connected', {});
      };

      this.ws.onmessage = (event) => {
        try {
          const message = JSON.parse(event.data);
          this.handleMessage(message);
        } catch (error) {
          console.error('Failed to parse WebSocket message:', error);
        }
      };

      this.ws.onerror = (error) => {
        console.error('WebSocket error:', error);
        this.isConnecting = false;
      };

      this.ws.onclose = () => {
        console.log('WebSocket disconnected');
        this.isConnecting = false;
        this.ws = null;
        this.emit('disconnected', {});
        this.attemptReconnect();
      };
    } catch (error) {
      console.error('Failed to create WebSocket connection:', error);
      this.isConnecting = false;
    }
  }

  private handleMessage(message: any) {
    const { event, data } = message;
    
    if (event) {
      this.emit(event, data);
    }
  }

  private attemptReconnect() {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      console.error('Max reconnection attempts reached');
      return;
    }

    this.reconnectAttempts++;
    console.log(`Attempting to reconnect (${this.reconnectAttempts}/${this.maxReconnectAttempts})...`);

    setTimeout(() => {
      this.connect();
    }, this.reconnectDelay * this.reconnectAttempts);
  }

  disconnect() {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
    this.listeners.clear();
  }

  on(event: string, callback: EventCallback) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event)!.add(callback);
  }

  off(event: string, callback: EventCallback) {
    const callbacks = this.listeners.get(event);
    if (callbacks) {
      callbacks.delete(callback);
    }
  }

  private emit(event: string, data: any) {
    const callbacks = this.listeners.get(event);
    if (callbacks) {
      callbacks.forEach(callback => {
        try {
          callback(data);
        } catch (error) {
          console.error(`Error in ${event} callback:`, error);
        }
      });
    }
  }

  send(event: string, data: any) {
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({ event, data }));
    } else {
      console.warn('WebSocket is not connected');
    }
  }

  isConnected(): boolean {
    return this.ws?.readyState === WebSocket.OPEN;
  }
}

// Create singleton instance
export const wsClient = new WebSocketClient();

// Event types for type safety
export const WS_EVENTS = {
  // Connection events
  CONNECTED: 'connected',
  DISCONNECTED: 'disconnected',
  
  // Task events
  TASK_CREATED: 'task:created',
  TASK_UPDATED: 'task:updated',
  TASK_DELETED: 'task:deleted',
  TASK_STATUS_CHANGED: 'task:status_changed',
  
  // Project events
  PROJECT_CREATED: 'project:created',
  PROJECT_UPDATED: 'project:updated',
  PROJECT_DELETED: 'project:deleted',
  
  // Notification events
  NOTIFICATION_NEW: 'notification:new',
  
  // User events
  USER_ONLINE: 'user:online',
  USER_OFFLINE: 'user:offline',
  USER_TYPING: 'user:typing',
  
  // Comment events
  COMMENT_ADDED: 'comment:added',
} as const;
