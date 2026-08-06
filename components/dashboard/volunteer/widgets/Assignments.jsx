import React from 'react';
import WidgetCard from './WidgetCard';
import { CalendarCheck, Headphones, Users, ChevronDown, Clock } from 'lucide-react';
import clsx from 'clsx';

const assignments = [
  {
    role: 'Registration Desk',
    event: 'Spring Gala 2024',
    date: 'May 24, 9:00 AM',
    status: 'Confirmed',
    icon: CalendarCheck
  },
  {
    role: 'Event Support',
    event: 'Tech Symposium',
    date: 'May 25, 2:00 PM',
    status: 'Confirmed',
    icon: Headphones
  },
  {
    role: 'Crowd Management',
    event: 'NGO Symposium',
    date: 'May 28, 10:00 AM',
    status: 'Pending',
    icon: Users
  }
];

export default function Assignments() {
  return (
    <WidgetCard 
      title="My Assignments" 
      action={
        <button className="flex items-center gap-1 text-xs bg-vol-border/50 hover:bg-vol-border text-gray-300 px-3 py-1 rounded-full transition-colors">
          <span>Active</span>
          <ChevronDown size={14} />
        </button>
      }
    >
      <div className="flex-1 p-5 flex flex-col gap-4 justify-center">
        {assignments.map((assignment, idx) => {
          const Icon = assignment.icon;
          const isConfirmed = assignment.status === 'Confirmed';
          
          return (
            <div key={idx} className="flex items-center gap-4 group">
              <div className="w-10 h-10 rounded-full bg-vol-accent/10 border border-vol-accent/20 flex items-center justify-center shrink-0 text-vol-accent2 group-hover:bg-vol-accent/20 transition-colors">
                <Icon size={18} />
              </div>
              
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-white truncate mb-0.5">{assignment.role}</h3>
                <p className="text-xs text-gray-400 truncate mb-1">{assignment.event}</p>
                <div className="flex items-center gap-1 text-[11px] text-gray-500">
                  <Clock size={12} className="shrink-0" />
                  <span>{assignment.date}</span>
                </div>
              </div>

              <div className="shrink-0">
                <span className={clsx(
                  "px-2 py-1 rounded text-[10px] font-medium border",
                  isConfirmed 
                    ? "bg-vol-success/10 text-vol-success border-vol-success/20" 
                    : "bg-vol-warning/10 text-vol-warning border-vol-warning/20"
                )}>
                  {assignment.status}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="p-4 pt-0">
        <button className="w-full py-2.5 rounded-lg bg-vol-accent/10 hover:bg-vol-accent/20 text-vol-accent2 font-medium text-sm transition-colors border border-vol-accent/20">
          Manage Assignments
        </button>
      </div>
    </WidgetCard>
  );
}
