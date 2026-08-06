import React, { useState } from 'react';
import WidgetCard from '../../volunteer/widgets/WidgetCard';
import { Megaphone, Calendar as CalendarIcon, Info, Gift, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const announcements = [
  {
    title: 'Event Reminder',
    date: 'May 20, 2024 • 10:30 AM',
    description: "Spring Gala 2024 is just around the corner! Make sure to check in early for the best experience.",
    icon: Megaphone,
    isNew: true
  },
  {
    title: 'Schedule Update',
    date: 'May 18, 2024 • 2:15 PM',
    description: 'Tech Symposium schedule has been updated. Please review the new session timings.',
    icon: CalendarIcon,
    isNew: false
  },
  {
    title: 'Important Notice',
    date: 'May 16, 2024 • 9:00 AM',
    description: 'Carry your ID card for smooth check-in at all campus events.',
    icon: Info,
    isNew: false
  },
  {
    title: 'Exclusive Perk',
    date: 'May 15, 2024 • 11:00 AM',
    description: 'Early access to workshop registrations! Register now before spots fill up.',
    icon: Gift,
    isNew: false
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

export default function Announcements({ delay = 0 }) {
  const [expandedIdx, setExpandedIdx] = useState(null);

  const toggleExpand = (idx) => {
    setExpandedIdx(expandedIdx === idx ? null : idx);
  };

  return (
    <WidgetCard 
      title="Announcements" 
      delay={delay}
      action={
        <button className="text-xs bg-vol-border/50 hover:bg-vol-border text-gray-300 px-3 py-1 rounded-full transition-all border border-vol-border hover:border-vol-accent/30 hover:text-white">
          View All
        </button>
      }
    >
      <div className="flex-1 p-5 flex flex-col justify-between gap-3">
        {announcements.map((announcement, idx) => {
          const Icon = announcement.icon;
          const isExpanded = expandedIdx === idx;

          return (
            <motion.div
              key={idx}
              custom={idx}
              initial="hidden"
              animate="visible"
              variants={itemVariants}
              onClick={() => toggleExpand(idx)}
              className="flex gap-4 group cursor-pointer p-2 rounded-xl hover:bg-vol-border/20 transition-all duration-200"
            >
              <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 text-vol-accent2 border transition-all duration-200 ${
                announcement.isNew
                  ? "bg-vol-accent/20 border-vol-accent/40 animate-pulse-glow"
                  : "bg-vol-accent/10 border-vol-accent/20 group-hover:bg-vol-accent/20"
              }`}>
                <Icon size={16} />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <h3 className="text-sm font-semibold text-white truncate group-hover:text-vol-accent2 transition-colors">
                    {announcement.title}
                  </h3>
                  {announcement.isNew && (
                    <span className="px-1.5 py-0.5 rounded text-[8px] font-bold bg-vol-accent/20 text-vol-accent2 border border-vol-accent/30 uppercase tracking-wider">
                      New
                    </span>
                  )}
                </div>
                <p className="text-[10px] text-gray-400 truncate mb-0.5">{announcement.date}</p>

                <AnimatePresence>
                  {isExpanded ? (
                    <motion.p
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="text-[11px] text-gray-400 leading-relaxed overflow-hidden"
                    >
                      {announcement.description}
                    </motion.p>
                  ) : (
                    <p className="text-[11px] text-gray-500 truncate">
                      {announcement.description}
                    </p>
                  )}
                </AnimatePresence>
              </div>

              <div className="self-start shrink-0 mt-1 text-gray-600 group-hover:text-vol-accent2 transition-colors">
                {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="p-4 pt-0 mt-auto">
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
