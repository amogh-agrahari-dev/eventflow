import React from 'react';
import WidgetCard from './WidgetCard';
import { Star, Users, Award } from 'lucide-react';
import { motion } from 'framer-motion';

const badges = [
  {
    name: 'Dedicated Volunteer',
    metric: '10 Events',
    icon: Star,
    color: 'from-purple-500 to-indigo-600',
    glow: 'rgba(139, 92, 246, 0.4)',
    shineColor: 'rgba(139, 92, 246, 0.3)'
  },
  {
    name: 'Team Player',
    metric: '25 Hours',
    icon: Users,
    color: 'from-emerald-400 to-teal-600',
    glow: 'rgba(16, 185, 129, 0.4)',
    shineColor: 'rgba(16, 185, 129, 0.3)'
  },
  {
    name: 'Rising Star',
    metric: '50 Hours',
    icon: Award,
    color: 'from-amber-400 to-orange-600',
    glow: 'rgba(245, 158, 11, 0.4)',
    shineColor: 'rgba(245, 158, 11, 0.3)'
  }
];

const badgeVariants = {
  hidden: { opacity: 0, scale: 0.7, y: 20 },
  visible: (i) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { delay: i * 0.15 + 0.2, duration: 0.55, ease: [0.16, 1, 0.3, 1] }
  })
};

export default function Badges() {
  return (
    <WidgetCard 
      title="Badges & Achievements" 
      delay={0.15}
      action={
        <button className="text-xs bg-vol-border/50 hover:bg-vol-border text-gray-300 px-3 py-1 rounded-full transition-all border border-vol-border hover:border-vol-accent/30 hover:text-white">
          View All
        </button>
      }
    >
      <div className="flex-1 p-5 flex items-center justify-around gap-2">
        {badges.map((badge, idx) => {
          const Icon = badge.icon;
          return (
            <motion.div 
              key={idx}
              custom={idx}
              initial="hidden"
              animate="visible"
              variants={badgeVariants}
              whileHover={{ y: -8, rotateY: 10 }}
              transition={{ type: 'spring', stiffness: 300, damping: 15 }}
              className="flex flex-col items-center text-center group cursor-default"
              style={{ perspective: '800px' }}
            >
              <div 
                className="relative w-16 h-20 mb-3 flex items-center justify-center"
              >
                {/* Shield Shape */}
                <div 
                  className={`absolute inset-0 bg-gradient-to-b ${badge.color} rounded-t-xl rounded-b-[2rem] opacity-90 transition-all duration-300 group-hover:opacity-100`}
                  style={{
                    boxShadow: `0 10px 20px -5px ${badge.glow}`,
                    transition: 'box-shadow 0.3s ease, opacity 0.3s ease'
                  }}
                />
                
                {/* Inner Glow/Border */}
                <div className="absolute inset-[2px] bg-vol-bg/40 rounded-t-[10px] rounded-b-[1.8rem] backdrop-blur-sm z-10" />
                
                {/* Shimmer Sweep */}
                <div className="absolute inset-0 overflow-hidden rounded-t-xl rounded-b-[2rem] z-15 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div 
                    className="absolute top-0 bottom-0 w-[60%]"
                    style={{
                      background: `linear-gradient(90deg, transparent, ${badge.shineColor}, transparent)`,
                      animation: 'badge-shine 1.5s ease-in-out infinite',
                    }}
                  />
                </div>
                
                {/* Icon */}
                <Icon size={24} className="text-white z-20 drop-shadow-md group-hover:scale-110 transition-transform duration-300" fill="currentColor" />
              </div>
              
              <h3 className="text-xs font-semibold text-white mb-0.5 max-w-[80px] leading-tight group-hover:text-vol-accent2 transition-colors">
                {badge.name}
              </h3>
              <p className="text-[10px] text-gray-400">{badge.metric}</p>
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
          View All Badges
        </motion.button>
      </div>
    </WidgetCard>
  );
}
