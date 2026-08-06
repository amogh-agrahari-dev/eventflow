import React from 'react';
import WidgetCard from '../../volunteer/widgets/WidgetCard';
import { CalendarCheck, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

const registrations = [
  {
    event: 'Spring Gala 2024',
    date: 'May 24, 2024 • 9:00 AM',
    ticketId: '#EVF1245',
    status: 'Confirmed'
  },
  {
    event: 'Tech Symposium',
    date: 'May 25, 2024 • 2:00 PM',
    ticketId: '#EVF1246',
    status: 'Confirmed'
  },
  {
    event: 'NGO Symposium',
    date: 'May 28, 2024 • 10:00 AM',
    ticketId: '#EVF1247',
    status: 'Waitlisted'
  }
];

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1 + 0.2, duration: 0.45, ease: [0.16, 1, 0.3, 1] }
  })
};

export default function MyRegistrations({ delay = 0 }) {
  return (
    <WidgetCard 
      title="My Registrations" 
      delay={delay}
      action={
        <button className="text-xs bg-vol-border/50 hover:bg-vol-border text-gray-300 px-3 py-1 rounded-full transition-all border border-vol-border hover:border-vol-accent/30 hover:text-white">
          View All
        </button>
      }
    >
      <div className="flex-1 p-5 flex flex-col justify-center gap-4">
        {registrations.map((reg, idx) => {
          const isConfirmed = reg.status === 'Confirmed';
          
          return (
            <motion.div
              key={idx}
              custom={idx}
              initial="hidden"
              animate="visible"
              variants={itemVariants}
              whileHover={{ x: 4 }}
              className="flex items-center gap-4 group cursor-pointer relative p-2 rounded-xl hover:bg-vol-border/20 transition-all duration-200"
            >
              {/* Hover accent bar */}
              <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-vol-accent2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-full" />

              <motion.div
                whileHover={{ scale: 1.1 }}
                className="w-10 h-10 rounded-full bg-vol-accent/10 border border-vol-accent/20 flex items-center justify-center shrink-0 text-vol-accent2 group-hover:bg-vol-accent/20 group-hover:border-vol-accent/40 transition-all duration-200"
              >
                <CalendarCheck size={18} />
              </motion.div>
              
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-white truncate mb-0.5 group-hover:text-vol-accent2 transition-colors">
                  {reg.event}
                </h3>
                <p className="text-[11px] text-gray-400 truncate mb-0.5">{reg.date}</p>
                <p className="text-[10px] text-gray-500 font-mono">Ticket ID: {reg.ticketId}</p>
              </div>

              <div className="shrink-0 flex items-center gap-2">
                <span className={clsx(
                  "px-2 py-1 rounded text-[10px] font-medium border transition-all",
                  isConfirmed 
                    ? "bg-vol-success/10 text-vol-success border-vol-success/20" 
                    : "bg-vol-warning/10 text-vol-warning border-vol-warning/20"
                )}>
                  {reg.status}
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
          View My Tickets
        </motion.button>
      </div>
    </WidgetCard>
  );
}
