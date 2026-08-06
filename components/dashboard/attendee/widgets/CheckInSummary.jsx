import React from 'react';
import WidgetCard from '../../volunteer/widgets/WidgetCard';
import { MapPin, Users, XCircle, CheckCircle } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Checked In', value: 100 },
];
const COLORS = ['#3b82f6'];

export default function CheckInSummary() {
  return (
    <WidgetCard 
      title="Check-in Summary" 
      action={<button className="text-xs bg-vol-border/50 hover:bg-vol-border text-gray-300 px-3 py-1 rounded-full transition-colors border border-vol-border">View All</button>}
    >
      <div className="flex-1 p-5 flex flex-col justify-between">
        
        <div className="flex items-center gap-6 mb-4">
          <div className="relative w-24 h-24 shrink-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={35}
                  outerRadius={45}
                  startAngle={90}
                  endAngle={-270}
                  dataKey="value"
                  stroke="none"
                >
                  <Cell fill="#3b82f6" />
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-xl font-bold text-white leading-tight">100%</span>
              <span className="text-[8px] text-gray-400 text-center leading-tight">Check-in<br/>Rate</span>
            </div>
            {/* Background ring */}
            <svg className="absolute inset-0 w-full h-full -z-10 pointer-events-none" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="10" />
            </svg>
          </div>

          <div className="flex-1 min-w-0 border-l border-vol-border/30 pl-4">
            <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">Last Check-in</p>
            <h3 className="text-sm font-semibold text-white truncate mb-0.5">Tech Symposium</h3>
            <p className="text-[11px] text-gray-300 mb-1">May 25, 2024 • 2:05 PM</p>
            <div className="flex items-center gap-1.5 text-[11px] text-gray-500 mb-2">
              <MapPin size={12} className="shrink-0" />
              <span className="truncate">Tech Block, Room 201</span>
            </div>
            <span className="inline-block px-2 py-0.5 rounded text-[10px] font-medium bg-vol-success/10 text-vol-success border border-vol-success/20">
              Successfully Checked-in
            </span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 pt-4 border-t border-vol-border/30">
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5 text-blue-400 mb-1">
              <Users size={14} />
              <span className="text-lg font-bold text-white">12</span>
            </div>
            <span className="text-[10px] text-gray-500">Total Check-ins</span>
          </div>
          
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5 text-vol-warning mb-1">
              <XCircle size={14} />
              <span className="text-lg font-bold text-white">0</span>
            </div>
            <span className="text-[10px] text-gray-500">Missed Events</span>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-1.5 text-vol-success mb-1">
              <CheckCircle size={14} />
              <span className="text-lg font-bold text-white">100%</span>
            </div>
            <span className="text-[10px] text-gray-500">On-time Rate</span>
          </div>
        </div>

      </div>
    </WidgetCard>
  );
}
