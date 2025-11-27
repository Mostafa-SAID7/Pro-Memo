// API Client Index - Central export for all API clients

export { api } from './api';
export { projectApi } from './projectApi';
export { taskApi } from './taskApi';
export { analyticsApi } from './analyticsApi';
export { aiApi } from './aiApi';
export { notificationApi } from './notificationApi';
export { searchApi } from './searchApi';

// Re-export types
export type { User, AuthResponse } from './api';
export type { Project, CreateProjectData, UpdateProjectData } from './projectApi';
export type { Task, CreateTaskData, UpdateTaskData } from './taskApi';
export type { DashboardStats, TaskAnalytics, ProjectAnalytics, ProductivityMetrics, Trends } from './analyticsApi';
export type { AISuggestion, TaskAnalysis, CompletionPrediction } from './aiApi';
export type { Notification } from './notificationApi';
export type { SearchResult } from './searchApi';
