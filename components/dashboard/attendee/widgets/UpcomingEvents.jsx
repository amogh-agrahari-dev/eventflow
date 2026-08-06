import React from 'react';
import WidgetCard from '../../volunteer/widgets/WidgetCard';
import { MapPin } from 'lucide-react';
import clsx from 'clsx';

const events = [
  {
    title: 'Spring Gala 2024',
    date: 'May 24, 2024 • 9:00 AM',
    venue: 'Main Auditorium',
    status: 'Registered',
    imageGradient: 'from-orange-500 to-amber-700'
  },
  {
    title: 'Tech Symposium',
    date: 'May 25, 2024 • 2:00 PM',
    venue: 'Tech Block, Room 201',
    status: 'Registered',
    imageGradient: 'from-blue-600 to-purple-600'
  },
  {
    title: 'NGO Symposium',
    date: 'May 28, 2024 • 10:00 AM',
    venue: 'Seminar Hall',
    status: 'Waitlisted',
    imageGradient: 'from-amber-600 to-orange-800'
  }
];

export default function UpcomingEvents() {
  return (
    <WidgetCard 
      title="Upcoming Events" 
      action={<button className="text-xs bg-vol-border/50 hover:bg-vol-border text-gray-300 px-3 py-1 rounded-full transition-colors border border-vol-border">View All</button>}
    >
      <div className="flex-1 p-5 flex flex-col gap-4">
        {events.map((event, idx) => (
          <div key={idx} className="flex gap-4 p-3 rounded-xl hover:bg-vol-border/30 transition-colors group">
            <div className={clsx("w-14 h-14 rounded-lg bg-gradient-to-br shrink-0 shadow-inner", event.imageGradient)}></div>
            
            <div className="flex-1 min-w-0 flex flex-col justify-center">
              <div className="flex justify-between items-start gap-2 mb-1">
                <h3 className="font-semibold text-white text-sm truncate group-hover:text-vol-accent2 transition-colors">{event.title}</h3>
                <span className={clsx(
                  "px-2 py-0.5 rounded text-[10px] font-medium border shrink-0",
                  event.status === 'Registered' 
                    ? "bg-vol-accent/20 text-vol-accent2 border-vol-accent/20" 
                    : "bg-vol-warning/10 text-vol-warning border-vol-warning/20"
                )}>
                  {event.status}
                </span>
              </div>
              
              <div className="flex flex-col gap-1 mt-1">
                <p className="text-[11px] text-gray-400 truncate">{event.date}</p>
                <div className="flex items-center gap-1.5 text-[11px] text-gray-500">
                  <MapPin size={12} className="shrink-0" />
                  <span className="truncate">{event.venue}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="p-4 pt-0">
        <button className="w-full py-2.5 rounded-lg bg-vol-accent/10 hover:bg-vol-accent/20 text-vol-accent2 font-medium text-sm transition-colors border border-vol-accent/20">
          Browse All Events
        </button>
      </div>
    </WidgetCard>
  );
}
