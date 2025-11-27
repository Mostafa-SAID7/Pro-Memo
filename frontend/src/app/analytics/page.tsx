'use client';

/**
 * Analytics Dashboard Page
 */

import { useEffect, useState } from 'react';
import { analyticsApi } from '@/lib/analyticsApi';
import { PieChart } from '@/components/Charts/PieChart';
import { BarChart } from '@/components/Charts/BarChart';
import { LineChart } from '@/components/Charts/LineChart';
import { Card } from '@/components/Card';
import { LoadingSpinner } from '@/components/LoadingSpinner';

export default function AnalyticsPage() {
  const [loading, setLoading] = useState(true);
  const [overview, setOverview] = useState<any>(null);
  const [userAnalytics, setUserAnalytics] = useState<any>(null);

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    try {
      setLoading(true);
      const [overviewData, userData] = await Promise.all([
        analyticsApi.getDashboardOverview(),
        analyticsApi.getUserAnalytics(),
      ]);
      setOverview(overviewData);
      setUserAnalytics(userData);
    } catch (error) {
      console.error('Failed to load analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!overview || !userAnalytics) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500">No analytics data available</p>
      </div>
    );
  }

  // Prepare chart data
  const taskStatusData = Object.entries(userAnalytics.tasksByStatus).map(([name, value]) => ({
    name: name.replace('-', ' ').toUpperCase(),
    value: value as number,
  }));

  const projectData = Object.entries(userAnalytics.tasksByProject).map(([name, value]) => ({
    name,
    tasks: value as number,
  }));

  const completionTrendData = Object.entries(userAnalytics.completionTrend).map(([date, count]) => ({
    name: date,
    completed: count as number,
  }));

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Analytics Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Track your productivity and project insights
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <div className="p-6">
              <div className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Projects</div>
              <div className="text-3xl font-bold text-gray-900 dark:text-gray-100 mt-2">
                {overview.metrics.totalProjects}
              </div>
              <div className="text-sm text-green-600 mt-2">
                {overview.metrics.activeProjects} active
              </div>
            </div>
          </Card>

          <Card>
            <div className="p-6">
              <div className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Tasks</div>
              <div className="text-3xl font-bold text-gray-900 dark:text-gray-100 mt-2">
                {overview.metrics.totalTasks}
              </div>
              <div className="text-sm text-blue-600 mt-2">
                {overview.metrics.inProgressTasks} in progress
              </div>
            </div>
          </Card>

          <Card>
            <div className="p-6">
              <div className="text-sm font-medium text-gray-600 dark:text-gray-400">Completed Tasks</div>
              <div className="text-3xl font-bold text-gray-900 dark:text-gray-100 mt-2">
                {overview.metrics.completedTasks}
              </div>
              <div className="text-sm text-green-600 mt-2">
                {userAnalytics.summary.completionRate}% completion rate
              </div>
            </div>
          </Card>

          <Card>
            <div className="p-6">
              <div className="text-sm font-medium text-gray-600 dark:text-gray-400">Overdue Tasks</div>
              <div className="text-3xl font-bold text-gray-900 dark:text-gray-100 mt-2">
                {overview.metrics.overdueTasks}
              </div>
              <div className="text-sm text-red-600 mt-2">
                {overview.metrics.upcomingDeadlines} upcoming
              </div>
            </div>
          </Card>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Task Status Distribution */}
          <Card>
            <div className="p-6 h-96">
              <PieChart 
                data={taskStatusData} 
                title="Task Status Distribution"
              />
            </div>
          </Card>

          {/* Tasks by Project */}
          <Card>
            <div className="p-6 h-96">
              <BarChart 
                data={projectData}
                dataKeys={['tasks']}
                title="Tasks by Project"
              />
            </div>
          </Card>

          {/* Completion Trend */}
          <Card className="lg:col-span-2">
            <div className="p-6 h-96">
              <LineChart 
                data={completionTrendData}
                dataKeys={['completed']}
                title="Completion Trend (Last 7 Days)"
              />
            </div>
          </Card>
        </div>

        {/* Summary Stats */}
        <Card>
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Productivity Summary
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Average Completion Time</div>
                <div className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-1">
                  {userAnalytics.summary.avgCompletionTime} days
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Tasks in Progress</div>
                <div className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-1">
                  {userAnalytics.summary.inProgressTasks}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Completion Rate</div>
                <div className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-1">
                  {userAnalytics.summary.completionRate}%
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
