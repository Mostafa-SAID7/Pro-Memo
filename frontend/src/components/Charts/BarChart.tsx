'use client';

/**
 * Bar Chart Component
 */

import { BarChart as RechartsBar, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface BarChartProps {
  data: Array<{ name: string; [key: string]: any }>;
  dataKeys: string[];
  colors?: string[];
  title?: string;
}

const DEFAULT_COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'];

export function BarChart({ data, dataKeys, colors = DEFAULT_COLORS, title }: BarChartProps) {
  return (
    <div className="w-full h-full">
      {title && (
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">{title}</h3>
      )}
      <ResponsiveContainer width="100%" height="100%">
        <RechartsBar data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          {dataKeys.map((key, index) => (
            <Bar key={key} dataKey={key} fill={colors[index % colors.length]} />
          ))}
        </RechartsBar>
      </ResponsiveContainer>
    </div>
  );
}
