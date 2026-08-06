import React from 'react';
import WidgetCard from '../../volunteer/widgets/WidgetCard';
import { ArrowUp, Award, Trophy, Star } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, ResponsiveContainer, Cell } from 'recharts';

const lineData = [
  { value: 2 }, { value: 3 }, { value: 2 }, { value: 5 }, { value: 4 }, { value: 6 }, { value: 7 }
];

const barData = [
  { value: 4 }, { value: 6 }, { value: 3 }, { value: 7 }, { value: 5 }, { value: 9 }, { value: 12 }
];

export default function MyActivity() {
  return (
    <WidgetCard title="My Activity">
      <div className="flex-1 p-5 flex flex-col justify-between">
        
        {/* Events Attended */}
        <div className="flex items-center justify-between border-b border-vol-border/30 pb-3 mb-3">
          <div>
            <p className="text-[11px] text-gray-400 mb-0.5">Events Attended</p>
            <span className="text-2xl font-bold text-white leading-none">7</span>
            <div className="mt-1 text-gray-500 text-[10px]">This year</div>
          </div>
          <div className="w-24 h-12">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lineData}>
                <Line type="monotone" dataKey="value" stroke="#8B5CF6" strokeWidth={2} dot={{ r: 2, fill: '#8B5CF6', strokeWidth: 2, stroke: '#0B0F19' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Check-ins Completed */}
        <div className="flex items-center justify-between border-b border-vol-border/30 pb-3 mb-3">
          <div>
            <p className="text-[11px] text-gray-400 mb-0.5">Check-ins Completed</p>
            <span className="text-2xl font-bold text-white leading-none">12</span>
            <div className="flex items-center gap-1 mt-1 text-vol-success text-[10px] font-medium">
              <ArrowUp size={10} />
              <span>20% from last month</span>
            </div>
          </div>
          <div className="w-24 h-12">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData}>
                <Bar dataKey="value" radius={[2, 2, 0, 0]}>
                  {barData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === barData.length - 1 ? '#10b981' : '#064e3b'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Certificates Earned */}
        <div className="flex items-center justify-between border-b border-vol-border/30 pb-3 mb-3">
          <div>
            <p className="text-[11px] text-gray-400 mb-0.5">Certificates Earned</p>
            <span className="text-xl font-bold text-white leading-none">3</span>
          </div>
          <div className="w-8 h-8 rounded-full bg-vol-accent/10 flex items-center justify-center text-vol-accent2 border border-vol-accent/20">
            <Award size={16} />
          </div>
        </div>

        {/* Points Earned */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[11px] text-gray-400 mb-0.5">Points Earned</p>
            <span className="text-xl font-bold text-white leading-none">240</span>
            <div className="flex items-center gap-1 mt-1 text-vol-warning text-[10px] font-medium">
              <ArrowUp size={10} />
              <span>15% from last month</span>
            </div>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="flex gap-0.5 text-vol-warning">
              <Star size={10} fill="currentColor" />
              <Star size={10} fill="currentColor" />
              <Star size={10} fill="currentColor" />
            </div>
            <Trophy size={20} className="text-vol-warning" />
          </div>
        </div>

      </div>
    </WidgetCard>
  );
}
