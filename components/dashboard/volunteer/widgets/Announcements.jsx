import React from 'react';
import WidgetCard from './WidgetCard';
import { Megaphone, Calendar as CalendarIcon, Info, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const announcements = [
  {
    title: 'Volunteer Orientation',
    date: 'May 20, 2024 • 10:30 AM',
    description: "Don't forget the orientation session...",
    icon: Megaphone,
    isNew: true
  },
  {
    title: 'Schedule Update',
    date: 'May 18, 2024 • 2:15 PM',
    description: 'Tech Symposium timing has been...',
    icon: CalendarIcon,
    isNew: false
  },
  {
    title: 'Important Reminder',
    date: 'May 16, 2024 • 9:00 AM',
    description: 'Please carry your ID card to all events.',
    icon: Info,
    isNew: false
  }
];

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1 + 0.15, duration: 0.45, ease: [0.16, 1, 0.3, 1] }
  })
};

export default function Announcements({ className, delay = 0.25 }) {
  return (
    <WidgetCard 
      title={
        <div className="flex items-center gap-2">
          <Megaphone size={18} className="text-vol-accent2" />
          <span>Announcements</span>
        </div>
      } 
      className={className}
      delay={delay}
      action={
        <button className="text-xs bg-vol-border/50 hover:bg-vol-border text-gray-300 px-3 py-1 rounded-full transition-all border border-vol-border hover:border-vol-accent/30 hover:text-white">
          View All
        </button>
      }
    >
      <div className="flex-1 p-5 flex flex-col gap-3 justify-between">
        <div className="flex flex-col gap-2.5">
          {announcements.map((announcement, idx) => {
            const Icon = announcement.icon;
            return (
              <motion.div
                key={idx}
                custom={idx}
                initial="hidden"
                animate="visible"
                variants={itemVariants}
                whileHover={{ x: 4 }}
                className="flex items-center gap-3 group cursor-pointer p-2.5 rounded-xl bg-vol-bg/60 border border-vol-border/40 hover:bg-vol-border/20 hover:border-vol-accent/30 transition-all duration-200 relative overflow-hidden"
              >
                {/* Hover accent bar */}
                <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-vol-accent2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-full" />

                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 text-vol-accent2 border transition-all duration-200 ${
                  announcement.isNew
                    ? "bg-vol-accent/20 border-vol-accent/40 shadow-glow-accent"
                    : "bg-vol-accent/10 border-vol-accent/20 group-hover:bg-vol-accent/20"
                }`}>
                  <Icon size={18} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1.5 mb-0.5">
                    <h3 className="text-sm font-semibold text-white truncate group-hover:text-vol-accent2 transition-colors">
                      {announcement.title}
                    </h3>
                    {announcement.isNew && (
                      <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-vol-accent/25 text-vol-accent2 border border-vol-accent/35 uppercase tracking-wider shrink-0">
                        New
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-gray-400 truncate mb-0.5">{announcement.date}</p>
                  <p className="text-xs text-gray-500 truncate">{announcement.description}</p>
                </div>

                <ChevronRight 
                  size={14} 
                  className="self-center text-vol-border opacity-0 group-hover:opacity-100 group-hover:text-vol-accent2 transition-all duration-200 shrink-0 hidden sm:block" 
                />
              </motion.div>
            );
          })}
        </div>
      </div>

      <div className="p-5 pt-0 mt-auto">
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-2.5 rounded-lg bg-vol-accent/10 hover:bg-vol-accent/20 text-vol-accent2 font-medium text-sm transition-all border border-vol-accent/20 hover:border-vol-accent/40 hover:shadow-glow-accent"
        >
          See All Announcements
        </motion.button>
      </div>
    </WidgetCard>
  );
}
