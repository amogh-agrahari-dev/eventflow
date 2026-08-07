import React from 'react';
import WidgetCard from './WidgetCard';
import { ScanLine, Briefcase, Calendar, User, ChevronRight, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const actions = [
  { name: 'Check-in to an Event', icon: ScanLine, href: '/scanner' },
  { name: 'Browse Open Roles', icon: Briefcase, href: '/events' },
  { name: 'Update Availability', icon: Calendar, href: '#availability' },
  { name: 'View My Profile', icon: User, href: '/profile' }
];

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08 + 0.1, duration: 0.4, ease: [0.16, 1, 0.3, 1] }
  })
};

export default function QuickActions({ className, delay = 0.25 }) {
  return (
    <WidgetCard 
      title={
        <div className="flex items-center gap-2">
          <Zap size={18} className="text-vol-accent2" />
          <span>Quick Actions</span>
        </div>
      } 
      className={className}
      delay={delay}
    >
      <div className="flex-1 p-5 flex flex-col justify-center gap-2.5">
        {actions.map((action, idx) => {
          const Icon = action.icon;
          return (
            <motion.div
              key={idx}
              custom={idx}
              initial="hidden"
              animate="visible"
              variants={itemVariants}
            >
              <Link 
                href={action.href}
                className="flex items-center justify-between p-3 rounded-xl bg-vol-bg/70 border border-vol-border/40 hover:bg-vol-border/20 hover:border-vol-accent/30 transition-all duration-200 group overflow-hidden"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-vol-accent/10 border border-vol-accent/20 flex items-center justify-center shrink-0 text-vol-accent2 group-hover:bg-vol-accent/20 group-hover:border-vol-accent/40 group-hover:scale-105 transition-all">
                    <Icon size={16} />
                  </div>
                  <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors truncate">
                    {action.name}
                  </span>
                </div>
                <ChevronRight 
                  size={15} 
                  className="text-gray-600 group-hover:text-vol-accent2 group-hover:translate-x-1 transition-all duration-200 shrink-0 ml-2" 
                />
              </Link>
            </motion.div>
          );
        })}
      </div>
    </WidgetCard>
  );
}

