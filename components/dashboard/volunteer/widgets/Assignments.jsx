import React from 'react';
import WidgetCard from './WidgetCard';
import { CalendarCheck, Headphones, Users, ChevronDown, Clock, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

const assignments = [
  {
    role: 'Registration Desk',
    event: 'Spring Gala 2024',
    date: 'May 24, 9:00 AM',
    status: 'Confirmed',
    icon: CalendarCheck
  },
  {
    role: 'Event Support',
    event: 'Tech Symposium',
    date: 'May 25, 2:00 PM',
    status: 'Confirmed',
    icon: Headphones
  },
  {
    role: 'Crowd Management',
    event: 'NGO Symposium',
    date: 'May 28, 10:00 AM',
    status: 'Pending',
    icon: Users
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

export default function Assignments() {
  return (
    <WidgetCard 
      title="My Assignments" 
      action={
        <button className="flex items-center gap-1 text-xs bg-vol-border/50 hover:bg-vol-border text-gray-300 px-3 py-1 rounded-full transition-all border border-vol-border hover:border-vol-accent/30 hover:text-white">
          <span>Active</span>
          <ChevronDown size={14} />
        </button>
      }
    >
      <div className="flex-1 p-5 flex flex-col gap-4 justify-center">
        {assignments.map((assignment, idx) => {
          const Icon = assignment.icon;
          const isConfirmed = assignment.status === 'Confirmed';
          
          return (
            <motion.div
              key={idx}
              custom={idx}
              initial="hidden"
              animate="visible"
              variants={itemVariants}
              whileHover={{ x: 4 }}
              className="flex items-center gap-4 group cursor-pointer p-2 rounded-xl hover:bg-vol-border/20 transition-all duration-200 relative"
            >
              {/* Hover accent bar */}
              <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-vol-accent2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-full" />

              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                className="w-10 h-10 rounded-full bg-vol-accent/10 border border-vol-accent/20 flex items-center justify-center shrink-0 text-vol-accent2 group-hover:bg-vol-accent/20 group-hover:border-vol-accent/40 transition-all duration-200"
              >
                <Icon size={18} />
              </motion.div>
              
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-white truncate mb-0.5 group-hover:text-vol-accent2 transition-colors">
                  {assignment.role}
                </h3>
                <p className="text-xs text-gray-400 truncate mb-1">{assignment.event}</p>
                <div className="flex items-center gap-1 text-[11px] text-gray-500">
                  <Clock size={12} className="shrink-0" />
                  <span>{assignment.date}</span>
                </div>
              </div>

              <div className="shrink-0 flex items-center gap-2">
                <span className={clsx(
                  "px-2 py-1 rounded text-[10px] font-medium border transition-all",
                  isConfirmed 
                    ? "bg-vol-success/10 text-vol-success border-vol-success/20" 
                    : "bg-vol-warning/10 text-vol-warning border-vol-warning/20"
                )}>
                  {assignment.status}
                </span>
                <ChevronRight 
                  size={14} 
                  className="text-vol-border opacity-0 group-hover:opacity-100 group-hover:text-vol-accent2 transition-all duration-200" 
                />
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="p-4 pt-0">
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-2.5 rounded-lg bg-vol-accent/10 hover:bg-vol-accent/20 text-vol-accent2 font-medium text-sm transition-all border border-vol-accent/20 hover:border-vol-accent/40 hover:shadow-glow-accent"
        >
          Manage Assignments
        </motion.button>
      </div>
    </WidgetCard>
  );
}
