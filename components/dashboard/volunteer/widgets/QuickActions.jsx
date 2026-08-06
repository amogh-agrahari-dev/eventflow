import React from 'react';
import WidgetCard from './WidgetCard';
import { ScanLine, Briefcase, Calendar, User, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const actions = [
  { name: 'Check-in to an Event', icon: ScanLine, href: '#' },
  { name: 'Browse Open Roles', icon: Briefcase, href: '#' },
  { name: 'Update Availability', icon: Calendar, href: '#' },
  { name: 'View My Profile', icon: User, href: '#' }
];

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08 + 0.1, duration: 0.4, ease: [0.16, 1, 0.3, 1] }
  })
};

export default function QuickActions() {
  return (
    <WidgetCard title="Quick Actions" delay={0.05}>
      <div className="flex-1 p-5 flex flex-col justify-center gap-3">
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
                className="flex items-center justify-between p-3.5 rounded-xl bg-vol-bg border border-vol-border/50 hover:bg-vol-border/20 hover:border-vol-accent/30 transition-all duration-200 group"
              >
                <div className="flex items-center gap-3">
                  <motion.div
                    whileHover={{ rotate: 8 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <Icon size={18} className="text-gray-400 group-hover:text-vol-accent2 transition-colors" />
                  </motion.div>
                  <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">
                    {action.name}
                  </span>
                </div>
                <ChevronRight 
                  size={16} 
                  className="text-gray-600 group-hover:text-vol-accent2 group-hover:translate-x-1 transition-all duration-200" 
                />
              </Link>
            </motion.div>
          );
        })}
      </div>
    </WidgetCard>
  );
}
