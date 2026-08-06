import React from 'react';
import WidgetCard from './WidgetCard';
import { MapPin, Clock } from 'lucide-react';

const shifts = [
  {
    date: { month: 'MAY', day: '24' },
    event: 'Spring Gala 2024',
    role: 'Registration Desk',
    time: '9:00 AM - 1:00 PM',
    location: 'Main Auditorium',
    status: 'Upcoming'
  },
  {
    date: { month: 'MAY', day: '25' },
    event: 'Tech Symposium',
    role: 'Event Support',
    time: '2:00 PM - 6:00 PM',
    location: 'Tech Block, Room 201',
    status: 'Upcoming'
  }
];

export default function UpcomingShifts() {
  return (
    <WidgetCard 
      title="My Upcoming Shifts" 
      action={<button className="text-xs bg-vol-border/50 hover:bg-vol-border text-gray-300 px-3 py-1 rounded-full transition-colors">View All</button>}
    >
      <div className="flex-1 p-5 flex flex-col gap-4">
        {shifts.map((shift, idx) => (
          <div key={idx} className="flex gap-4 p-4 rounded-xl bg-vol-bg border border-vol-border/50 hover:border-vol-border transition-colors">
            <div className="flex flex-col items-center justify-center w-12 h-12 rounded-lg bg-vol-card border border-vol-border shrink-0">
              <span className="text-[10px] font-bold text-gray-400 uppercase">{shift.date.month}</span>
              <span className="text-lg font-bold text-white leading-none">{shift.date.day}</span>
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start gap-2 mb-1">
                <h3 className="font-semibold text-white truncate text-sm">{shift.event}</h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-vol-accent/20 text-vol-accent2 border border-vol-accent2/20">
                  {shift.status}
                </span>
              </div>
              <p className="text-xs text-gray-400 mb-2">{shift.role}</p>
              
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-1.5 text-[11px] text-gray-500">
                  <Clock size={12} className="shrink-0" />
                  <span className="truncate">{shift.time}</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-gray-500">
                  <MapPin size={12} className="shrink-0" />
                  <span className="truncate">{shift.location}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="p-4 pt-0">
        <button className="w-full py-2.5 rounded-lg bg-vol-accent/10 hover:bg-vol-accent/20 text-vol-accent2 font-medium text-sm transition-colors border border-vol-accent/20">
          View Full Schedule
        </button>
      </div>
    </WidgetCard>
  );
}
