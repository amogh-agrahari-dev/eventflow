import React from 'react';
import WidgetCard from './WidgetCard';
import { MapPin, CalendarDays, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

const events = [
  {
    title: 'Spring Gala 2024',
    date: 'May 24-26, 2024',
    venue: 'Main Auditorium',
    status: 'Upcoming',
    imageGradient: 'from-orange-500 to-amber-700'
  },
  {
    title: 'Tech Symposium',
    date: 'May 25, 2024',
    venue: 'Tech Block',
    status: 'Upcoming',
    imageGradient: 'from-blue-600 to-purple-600'
  },
  {
    title: 'NGO Symposium',
    date: 'May 28, 2024',
    venue: 'Seminar Hall',
    status: 'Assigned',
    imageGradient: 'from-amber-600 to-orange-800'
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

export default function MyEvents({ className, delay = 0.2 }) {
  return (
    <WidgetCard 
      title="My Events" 
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
          {events.map((event, idx) => (
            <motion.div
              key={idx}
              custom={idx}
              initial="hidden"
              animate="visible"
              variants={itemVariants}
              whileHover={{ x: 4 }}
              className="flex items-center gap-3 p-2.5 rounded-xl bg-vol-bg/60 border border-vol-border/40 hover:bg-vol-border/20 hover:border-vol-accent/30 transition-all duration-200 group cursor-pointer relative overflow-hidden"
            >
              {/* Hover accent bar */}
              <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-vol-accent2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-full" />

              <motion.div
                whileHover={{ scale: 1.08 }}
                className={clsx(
                  "w-11 h-11 rounded-xl bg-gradient-to-br shrink-0 shadow-inner transition-transform duration-300 flex items-center justify-center text-white/90 font-bold text-xs",
                  event.imageGradient
                )}
              >
                {event.title.charAt(0)}
              </motion.div>
              
              <div className="flex-1 min-w-0 flex flex-col justify-center">
                <div className="flex justify-between items-center gap-1.5 mb-0.5">
                  <h3 className="font-semibold text-white text-sm truncate group-hover:text-vol-accent2 transition-colors">
                    {event.title}
                  </h3>
                  <span className={clsx(
                    "px-2 py-0.5 rounded text-[10px] font-medium border shrink-0 transition-all",
                    event.status === 'Upcoming'
                      ? "bg-vol-accent/15 text-vol-accent2 border-vol-accent/20"
                      : "bg-blue-500/10 text-blue-400 border-blue-500/20"
                  )}>
                    {event.status}
                  </span>
                </div>
                
                <div className="flex items-center gap-1.5 text-[11px] text-gray-400 mb-0.5">
                  <CalendarDays size={11} className="shrink-0 text-gray-500" />
                  <span className="truncate">{event.date}</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-gray-500">
                  <MapPin size={11} className="shrink-0 text-gray-500" />
                  <span className="truncate">{event.venue}</span>
                </div>
              </div>

              <ChevronRight 
                size={14} 
                className="self-center text-vol-border opacity-0 group-hover:opacity-100 group-hover:text-vol-accent2 transition-all duration-200 shrink-0 hidden sm:block" 
              />
            </motion.div>
          ))}
        </div>
      </div>

      <div className="p-5 pt-0 mt-auto">
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-2.5 rounded-lg bg-vol-accent/10 hover:bg-vol-accent/20 text-vol-accent2 font-medium text-sm transition-all border border-vol-accent/20 hover:border-vol-accent/40 hover:shadow-glow-accent"
        >
          Browse All Events
        </motion.button>
      </div>
    </WidgetCard>
  );
}
