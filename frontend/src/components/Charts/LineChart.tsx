'use client';

/**
 * Line Chart Component
 */

import { LineChart as RechartsLine, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface LineChartProps {
  data: Array<{ name: string; [key: string]: any }>;
  dataKeys: string[];
  colors?: string[];
  title?: string;
}

const DEFAULT_COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'];

export function LineChart({ data, dataKeys, colors = DEFAULT_COLORS, title }: LineChartProps) {
  return (
    <div className="w-full h-full">
      {title && (
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">{title}</h3>
      )}
      <ResponsiveContainer width="100%" height="100%">
        <RechartsLine data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          {dataKeys.map((key, index) => (
            <Line 
              key={key} 
              type="monotone" 
              dataKey={key} 
              stroke={colors[index % colors.length]}
              strokeWidth={2}
            />
          ))}
        </RechartsLine>
      </ResponsiveContainer>
    </div>
  );
}
