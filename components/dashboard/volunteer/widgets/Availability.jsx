import React from 'react';
import WidgetCard from './WidgetCard';
import clsx from 'clsx';

const schedule = [
  { day: 'Mon, May 20', time: '9:00 AM - 6:00 PM', available: true },
  { day: 'Tue, May 21', time: '9:00 AM - 6:00 PM', available: true },
  { day: 'Wed, May 22', time: 'Not Available', available: false },
  { day: 'Thu, May 23', time: '9:00 AM - 1:00 PM', available: true },
  { day: 'Fri, May 24', time: '2:00 PM - 6:00 PM', available: true },
];

export default function Availability() {
  return (
    <WidgetCard 
      title="Availability This Week" 
      action={<button className="text-xs bg-vol-border/50 hover:bg-vol-border text-gray-300 px-3 py-1 rounded-full transition-colors border border-vol-border">Edit</button>}
    >
      <div className="flex-1 p-5 flex flex-col justify-center gap-4">
        {schedule.map((slot, idx) => (
          <div key={idx} className="flex items-center justify-between group">
            <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">{slot.day}</span>
            <div className="flex items-center gap-3">
              <span className={clsx("text-sm font-medium", slot.available ? "text-gray-300" : "text-gray-500")}>
                {slot.time}
              </span>
              <div className={clsx(
                "w-2 h-2 rounded-full",
                slot.available ? "bg-vol-success shadow-[0_0_8px_rgba(34,197,94,0.6)]" : "bg-gray-600"
              )}></div>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 pt-0">
        <button className="w-full py-2.5 rounded-lg bg-vol-accent/10 hover:bg-vol-accent/20 text-vol-accent2 font-medium text-sm transition-colors border border-vol-accent/20">
          Update Availability
        </button>
      </div>
    </WidgetCard>
  );
}
