import React from 'react';
import WidgetCard from '../../volunteer/widgets/WidgetCard';
import { CalendarCheck } from 'lucide-react';
import clsx from 'clsx';

const registrations = [
  {
    event: 'Spring Gala 2024',
    date: 'May 24, 2024 • 9:00 AM',
    ticketId: '#EVF1245',
    status: 'Confirmed'
  },
  {
    event: 'Tech Symposium',
    date: 'May 25, 2024 • 2:00 PM',
    ticketId: '#EVF1246',
    status: 'Confirmed'
  },
  {
    event: 'NGO Symposium',
    date: 'May 28, 2024 • 10:00 AM',
    ticketId: '#EVF1247',
    status: 'Waitlisted'
  }
];

export default function MyRegistrations() {
  return (
    <WidgetCard 
      title="My Registrations" 
      action={<button className="text-xs bg-vol-border/50 hover:bg-vol-border text-gray-300 px-3 py-1 rounded-full transition-colors border border-vol-border">View All</button>}
    >
      <div className="flex-1 p-5 flex flex-col justify-center gap-4">
        {registrations.map((reg, idx) => {
          const isConfirmed = reg.status === 'Confirmed';
          
          return (
            <div key={idx} className="flex items-center gap-4 group">
              <div className="w-10 h-10 rounded-full bg-vol-accent/10 border border-vol-accent/20 flex items-center justify-center shrink-0 text-vol-accent2 group-hover:bg-vol-accent/20 transition-colors">
                <CalendarCheck size={18} />
              </div>
              
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-white truncate mb-1">{reg.event}</h3>
                <p className="text-[11px] text-gray-400 truncate mb-0.5">{reg.date}</p>
                <div className="flex items-center gap-1 text-[11px] text-gray-500">
                  <span>Ticket ID: {reg.ticketId}</span>
                </div>
              </div>

              <div className="shrink-0">
                <span className={clsx(
                  "px-2 py-1 rounded text-[10px] font-medium border",
                  isConfirmed 
                    ? "bg-vol-success/10 text-vol-success border-vol-success/20" 
                    : "bg-vol-warning/10 text-vol-warning border-vol-warning/20"
                )}>
                  {reg.status}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="p-4 pt-0">
        <button className="w-full py-2.5 rounded-lg bg-vol-accent/10 hover:bg-vol-accent/20 text-vol-accent2 font-medium text-sm transition-colors border border-vol-accent/20">
          View My Tickets
        </button>
      </div>
    </WidgetCard>
  );
}
