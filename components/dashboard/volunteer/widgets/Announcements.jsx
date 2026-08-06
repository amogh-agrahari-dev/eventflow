import React from 'react';
import WidgetCard from './WidgetCard';
import { Megaphone, Calendar as CalendarIcon, Info } from 'lucide-react';

const announcements = [
  {
    title: 'Volunteer Orientation',
    date: 'May 20, 2024 • 10:30 AM',
    description: "Don't forget the orientation session...",
    icon: Megaphone
  },
  {
    title: 'Schedule Update',
    date: 'May 18, 2024 • 2:15 PM',
    description: 'Tech Symposium timing has been...',
    icon: CalendarIcon
  },
  {
    title: 'Important Reminder',
    date: 'May 16, 2024 • 9:00 AM',
    description: 'Please carry your ID card to all events.',
    icon: Info
  }
];

export default function Announcements() {
  return (
    <WidgetCard 
      title="Announcements" 
      action={<button className="text-xs bg-vol-border/50 hover:bg-vol-border text-gray-300 px-3 py-1 rounded-full transition-colors">View All</button>}
    >
      <div className="flex-1 p-5 flex flex-col gap-4">
        {announcements.map((announcement, idx) => {
          const Icon = announcement.icon;
          return (
            <div key={idx} className="flex gap-4 group">
              <div className="w-10 h-10 rounded-full bg-vol-accent/10 flex items-center justify-center shrink-0 text-vol-accent2 border border-vol-accent/20 group-hover:bg-vol-accent/20 transition-colors">
                <Icon size={18} />
              </div>
              
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-white truncate mb-0.5">{announcement.title}</h3>
                <p className="text-xs text-gray-400 truncate mb-1">{announcement.date}</p>
                <p className="text-xs text-gray-500 truncate">{announcement.description}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="p-4 pt-0">
        <button className="w-full py-2.5 rounded-lg bg-vol-accent/10 hover:bg-vol-accent/20 text-vol-accent2 font-medium text-sm transition-colors border border-vol-accent/20">
          See All Announcements
        </button>
      </div>
    </WidgetCard>
  );
}
