import React from 'react';
import WidgetCard from './WidgetCard';
import { MapPin, Clock, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const shifts = [
  {
    date: { month: 'MAY', day: '24' },
    event: 'Spring Gala 2024',
    role: 'Registration Desk',
    time: '9:00 AM - 1:00 PM',
    location: 'Main Auditorium',
    status: 'Upcoming'
  },
  {
    date: { month: 'MAY', day: '25' },
    event: 'Tech Symposium',
    role: 'Event Support',
    time: '2:00 PM - 6:00 PM',
    location: 'Tech Block, Room 201',
    status: 'Upcoming'
  }
];

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12 + 0.15, duration: 0.45, ease: [0.16, 1, 0.3, 1] }
  })
};

export default function UpcomingShifts() {
  return (
    <WidgetCard 
      title="My Upcoming Shifts" 
      action={
        <button className="text-xs bg-vol-border/50 hover:bg-vol-border text-gray-300 px-3 py-1 rounded-full transition-all border border-vol-border hover:border-vol-accent/30 hover:text-white">
          View All
        </button>
      }
    >
      <div className="flex-1 p-5 flex flex-col gap-4">
        {shifts.map((shift, idx) => (
          <motion.div
            key={idx}
            custom={idx}
            initial="hidden"
            animate="visible"
            variants={itemVariants}
            whileHover={{ y: -2 }}
            className="flex gap-4 p-4 rounded-xl bg-vol-bg border border-vol-border/50 hover:border-vol-accent/30 transition-all duration-300 hover:shadow-glow-accent group cursor-pointer"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex flex-col items-center justify-center w-12 h-12 rounded-lg bg-vol-card border border-vol-border shrink-0 group-hover:border-vol-accent/30 transition-colors"
            >
              <span className="text-[10px] font-bold text-gray-400 uppercase">{shift.date.month}</span>
              <span className="text-lg font-bold text-white leading-none">{shift.date.day}</span>
            </motion.div>
            
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start gap-2 mb-1">
                <h3 className="font-semibold text-white truncate text-sm group-hover:text-vol-accent2 transition-colors">
                  {shift.event}
                </h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-vol-accent/15 text-vol-accent2 border border-vol-accent2/20 shrink-0">
                  {shift.status}
                </span>
              </div>
              <p className="text-xs text-gray-400 mb-2">{shift.role}</p>
              
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-1.5 text-[11px] text-gray-500">
                  <Clock size={12} className="shrink-0" />
                  <span className="truncate">{shift.time}</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-gray-500">
                  <MapPin size={12} className="shrink-0" />
                  <span className="truncate">{shift.location}</span>
                </div>
              </div>
            </div>

            <ChevronRight 
              size={16} 
              className="self-center text-vol-border opacity-0 group-hover:opacity-100 group-hover:text-vol-accent2 transition-all duration-200 shrink-0" 
            />
          </motion.div>
        ))}
      </div>
      
      <div className="p-4 pt-0">
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-2.5 rounded-lg bg-vol-accent/10 hover:bg-vol-accent/20 text-vol-accent2 font-medium text-sm transition-all border border-vol-accent/20 hover:border-vol-accent/40 hover:shadow-glow-accent"
        >
          View Full Schedule
        </motion.button>
      </div>
    </WidgetCard>
  );
}
