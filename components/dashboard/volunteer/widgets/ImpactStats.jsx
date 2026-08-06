import React from 'react';
import WidgetCard from './WidgetCard';
import { ArrowUp } from 'lucide-react';
import { BarChart, Bar, ResponsiveContainer, Cell } from 'recharts';

const data = [
  { value: 20 },
  { value: 40 },
  { value: 30 },
  { value: 70 },
  { value: 40 },
  { value: 60 },
  { value: 50 },
  { value: 90 },
  { value: 70 },
  { value: 100 },
];

export default function ImpactStats() {
  return (
    <WidgetCard title="My Impact">
      <div className="flex-1 p-5 flex flex-col justify-between">
        <div className="flex items-end justify-between border-b border-vol-border/30 pb-4 mb-4">
          <div>
            <p className="text-sm text-gray-400 mb-1">Hours Contributed</p>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-bold text-white leading-none">48.5</span>
              <span className="text-sm text-gray-400">hours</span>
            </div>
            <div className="flex items-center gap-1 mt-2 text-vol-success text-xs font-medium">
              <ArrowUp size={12} />
              <span>12% this month</span>
            </div>
          </div>
          
          <div className="w-24 h-16">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <Bar dataKey="value" radius={[2, 2, 0, 0]}>
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === data.length - 1 ? '#8B5CF6' : '#4C1D95'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <div className="border-b border-vol-border/30 pb-4">
            <p className="text-sm text-gray-400 mb-1">Events Attended</p>
            <span className="text-2xl font-bold text-white leading-none">12</span>
          </div>

          <div>
            <p className="text-sm text-gray-400 mb-1">Check-ins Completed</p>
            <span className="text-2xl font-bold text-white leading-none">36</span>
            <div className="flex items-center gap-1 mt-2 text-vol-success text-xs font-medium">
              <ArrowUp size={12} />
              <span>8 this month</span>
            </div>
          </div>
        </div>
      </div>
    </WidgetCard>
  );
}
