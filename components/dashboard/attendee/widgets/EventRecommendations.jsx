import React from 'react';
import WidgetCard from '../../volunteer/widgets/WidgetCard';
import { MapPin } from 'lucide-react';
import clsx from 'clsx';

const recommendations = [
  {
    title: 'AI & Future Workshop',
    date: 'May 30, 2024 • 1:00 PM',
    venue: 'Innovation Lab',
    imageGradient: 'from-indigo-500 to-purple-800'
  },
  {
    title: 'Photography Contest',
    date: 'Jun 05, 2024 • 10:00 AM',
    venue: 'Open Ground',
    imageGradient: 'from-amber-600 to-red-800'
  },
  {
    title: 'Cultural Fest 2024',
    date: 'Jun 10, 2024 • 4:00 PM',
    venue: 'Main Campus',
    imageGradient: 'from-pink-500 to-rose-800'
  }
];

export default function EventRecommendations() {
  return (
    <WidgetCard 
      title="Event Recommendations" 
      action={<button className="text-xs bg-vol-border/50 hover:bg-vol-border text-gray-300 px-3 py-1 rounded-full transition-colors border border-vol-border">View All</button>}
    >
      <div className="flex-1 p-5 flex flex-col gap-4">
        {recommendations.map((event, idx) => (
          <div key={idx} className="flex gap-4 p-3 rounded-xl hover:bg-vol-border/30 transition-colors group">
            <div className={clsx("w-14 h-14 rounded-lg bg-gradient-to-br shrink-0 shadow-inner", event.imageGradient)}></div>
            
            <div className="flex-1 min-w-0 flex flex-col justify-center">
              <h3 className="font-semibold text-white text-sm truncate group-hover:text-vol-accent2 transition-colors mb-1">{event.title}</h3>
              
              <div className="flex flex-col gap-1">
                <p className="text-[11px] text-gray-400 truncate">{event.date}</p>
                <div className="flex items-center gap-1.5 text-[11px] text-gray-500">
                  <MapPin size={12} className="shrink-0" />
                  <span className="truncate">{event.venue}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center">
              <button className="text-[10px] font-medium text-vol-accent2 border border-vol-accent2/30 bg-vol-accent/10 hover:bg-vol-accent/20 px-3 py-1.5 rounded transition-colors">
                Register
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="p-4 pt-0">
        <button className="w-full py-2.5 rounded-lg bg-vol-accent/10 hover:bg-vol-accent/20 text-vol-accent2 font-medium text-sm transition-colors border border-vol-accent/20">
          Discover More Events
        </button>
      </div>
    </WidgetCard>
  );
}
