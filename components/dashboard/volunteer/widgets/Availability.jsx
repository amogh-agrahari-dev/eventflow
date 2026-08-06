import React from 'react';
import WidgetCard from './WidgetCard';
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
    transition: { delay: i * 0.08 + 0.1, duration: 0.4, ease: [0.16, 1, 0.3, 1] }
  })
};

export default function Availability() {
  return (
    <WidgetCard 
      title="Availability This Week" 
      delay={0.08}
      action={
        <button className="text-xs bg-vol-border/50 hover:bg-vol-border text-gray-300 px-3 py-1 rounded-full transition-all border border-vol-border hover:border-vol-accent/30 hover:text-white">
          Edit
        </button>
      }
    >
      <div className="flex-1 p-5 flex flex-col justify-center gap-4">
        {schedule.map((slot, idx) => (
          <motion.div
            key={idx}
            custom={idx}
            initial="hidden"
            animate="visible"
            variants={itemVariants}
            className="flex items-center justify-between group hover:bg-vol-border/10 p-1.5 -mx-1.5 rounded-lg transition-colors cursor-default"
          >
            <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
              {slot.day}
            </span>
            <div className="flex items-center gap-3">
              <span className={clsx(
                "text-sm font-medium transition-colors",
                slot.available ? "text-gray-300" : "text-gray-500"
              )}>
                {slot.time}
              </span>
              <div className={clsx(
                "w-2 h-2 rounded-full transition-all",
                slot.available
                  ? "bg-vol-success animate-pulse-glow"
                  : "bg-gray-600"
              )} />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="p-4 pt-0">
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
