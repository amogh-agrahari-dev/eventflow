import React from 'react';
import WidgetCard from '../../volunteer/widgets/WidgetCard';
import { Megaphone, Calendar as CalendarIcon, Info, Gift } from 'lucide-react';

const announcements = [
  {
    title: 'Event Reminder',
    date: 'May 20, 2024 • 10:30 AM',
    description: "Spring Gala 2024 is just around the corner!",
    icon: Megaphone
  },
  {
    title: 'Schedule Update',
    date: 'May 18, 2024 • 2:15 PM',
    description: 'Tech Symposium schedule has been updated.',
    icon: CalendarIcon
  },
  {
    title: 'Important Notice',
    date: 'May 16, 2024 • 9:00 AM',
    description: 'Carry your ID card for smooth check-in.',
    icon: Info
  },
  {
    title: 'Exclusive Perk',
    date: 'May 15, 2024 • 11:00 AM',
    description: 'Early access to workshop registrations!',
    icon: Gift
  }
];

export default function Announcements() {
  return (
    <WidgetCard 
      title="Announcements" 
      action={<button className="text-xs bg-vol-border/50 hover:bg-vol-border text-gray-300 px-3 py-1 rounded-full transition-colors border border-vol-border">View All</button>}
    >
      <div className="flex-1 p-5 flex flex-col justify-between gap-3">
        {announcements.map((announcement, idx) => {
          const Icon = announcement.icon;
          return (
            <div key={idx} className="flex gap-4 group">
              <div className="w-9 h-9 rounded-full bg-vol-accent/10 flex items-center justify-center shrink-0 text-vol-accent2 border border-vol-accent/20 group-hover:bg-vol-accent/20 transition-colors">
                <Icon size={16} />
              </div>
              
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-white truncate mb-0.5">{announcement.title}</h3>
                <p className="text-[10px] text-gray-400 truncate mb-0.5">{announcement.date}</p>
                <p className="text-[11px] text-gray-500 truncate">{announcement.description}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="p-4 pt-0 mt-auto">
        <button className="w-full py-2.5 rounded-lg bg-vol-accent/10 hover:bg-vol-accent/20 text-vol-accent2 font-medium text-sm transition-colors border border-vol-accent/20">
          See All Announcements
        </button>
      </div>
    </WidgetCard>
  );
}
