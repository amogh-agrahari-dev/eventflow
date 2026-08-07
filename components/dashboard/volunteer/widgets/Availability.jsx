import React from 'react';
import WidgetCard from './WidgetCard';
import { Calendar, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

const schedule = [
  { day: 'Mon, May 20', time: '9:00 AM - 6:00 PM', available: true },
  { day: 'Tue, May 21', time: '9:00 AM - 6:00 PM', available: true },
  { day: 'Wed, May 22', time: 'Not Available', available: false },
  { day: 'Thu, May 23', time: '9:00 AM - 1:00 PM', available: true },
  { day: 'Fri, May 24', time: '2:00 PM - 6:00 PM', available: true },
];

const itemVariants = {
  hidden: { opacity: 0, x: -12 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.06 + 0.1, duration: 0.35, ease: [0.16, 1, 0.3, 1] }
  })
};

export default function Availability({ className, delay = 0.2 }) {
  return (
    <WidgetCard 
      title={
        <div className="flex items-center gap-2">
          <Calendar size={18} className="text-vol-accent2" />
          <span>Availability This Week</span>
        </div>
      } 
      className={className}
      delay={delay}
      action={
        <button className="text-xs bg-vol-border/50 hover:bg-vol-border text-gray-300 px-3 py-1 rounded-full transition-all border border-vol-border hover:border-vol-accent/30 hover:text-white">
          Edit
        </button>
      }
    >
      <div className="flex-1 p-5 flex flex-col justify-between gap-3">
        <div className="flex flex-col gap-2">
          {schedule.map((slot, idx) => (
            <motion.div
              key={idx}
              custom={idx}
              initial="hidden"
              animate="visible"
              variants={itemVariants}
              className="flex items-center justify-between p-2.5 rounded-xl bg-vol-bg/60 border border-vol-border/30 hover:bg-vol-border/20 hover:border-vol-accent/30 transition-all duration-200 group overflow-hidden"
            >
              <span className="text-xs font-medium text-gray-300 group-hover:text-white transition-colors truncate">
                {slot.day}
              </span>
              <div className="flex items-center gap-2.5 shrink-0">
                <span className={clsx(
                  "text-xs font-medium transition-colors",
                  slot.available ? "text-gray-300" : "text-gray-500 italic"
                )}>
                  {slot.time}
                </span>
                <div className={clsx(
                  "w-2 h-2 rounded-full transition-all shrink-0",
                  slot.available
                    ? "bg-vol-success shadow-glow-accent"
                    : "bg-gray-600"
                )} />
              </div>
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
          Update Availability
        </motion.button>
      </div>
    </WidgetCard>
  );
}

