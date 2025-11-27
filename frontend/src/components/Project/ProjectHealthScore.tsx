'use client';

/**
 * Project Health Score Component
 */

import { useEffect, useState } from 'react';
import { Activity01Icon, AlertCircleIcon, CheckmarkCircle01Icon } from 'hugeicons-react';

interface HealthFactor {
  factor: string;
  impact: number;
  value: string;
}

interface ProjectHealth {
  score: number;
  status: 'healthy' | 'needs-attention' | 'at-risk' | 'critical';
  factors: HealthFactor[];
}

interface ProjectHealthScoreProps {
  projectId: string;
}

export function ProjectHealthScore({ projectId }: ProjectHealthScoreProps) {
  const [health, setHealth] = useState<ProjectHealth | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadHealth();
  }, [projectId]);

  const loadHealth = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/ai/project-health/${projectId}`);
      const data = await response.json();
      setHealth(data.data);
    } catch (error) {
      console.error('Failed to load project health:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="animate-pulse bg-gray-100 dark:bg-gray-800 rounded-lg p-6 h-48"></div>
    );
  }

  if (!health) {
    return null;
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy':
        return 'text-green-600 dark:text-green-400';
      case 'needs-attention':
        return 'text-yellow-600 dark:text-yellow-400';
      case 'at-risk':
        return 'text-orange-600 dark:text-orange-400';
      case 'critical':
        return 'text-red-600 dark:text-red-400';
      default:
        return 'text-gray-600 dark:text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy':
        return <CheckmarkCircle01Icon className="w-6 h-6" />;
      case 'needs-attention':
      case 'at-risk':
        return <Activity01Icon className="w-6 h-6" />;
      case 'critical':
        return <AlertCircleIcon className="w-6 h-6" />;
      default:
        return <Activity01Icon className="w-6 h-6" />;
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    if (score >= 50) return 'text-orange-600';
    return 'text-red-600';
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Project Health
        </h3>
        <div className={`flex items-center gap-2 ${getStatusColor(health.status)}`}>
          {getStatusIcon(health.status)}
          <span className="font-medium capitalize">{health.status.replace('-', ' ')}</span>
        </div>
      </div>

      {/* Score Circle */}
      <div className="flex items-center justify-center mb-6">
        <div className="relative w-32 h-32">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="64"
              cy="64"
              r="56"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              className="text-gray-200 dark:text-gray-700"
            />
            <circle
              cx="64"
              cy="64"
              r="56"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              strokeDasharray={`${(health.score / 100) * 351.86} 351.86`}
              className={getScoreColor(health.score)}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className={`text-3xl font-bold ${getScoreColor(health.score)}`}>
                {health.score}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Score</div>
            </div>
          </div>
        </div>
      </div>

      {/* Factors */}
      {health.factors.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Health Factors
          </h4>
          {health.factors.map((factor, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900 rounded-lg"
            >
              <div className="flex-1">
                <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  {factor.factor}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {factor.value}
                </div>
              </div>
              <div className={`text-sm font-medium ${factor.impact < 0 ? 'text-red-600' : 'text-green-600'}`}>
                {factor.impact > 0 ? '+' : ''}{factor.impact}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Recommendations */}
      {health.score < 85 && (
        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <h4 className="text-sm font-medium text-blue-900 dark:text-blue-100 mb-2">
            Recommendations
          </h4>
          <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
            {health.factors.map((factor, index) => (
              <li key={index}>• Address {factor.factor.toLowerCase()}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
