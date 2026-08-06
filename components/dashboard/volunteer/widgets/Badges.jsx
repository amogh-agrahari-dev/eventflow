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
    glow: 'rgba(139, 92, 246, 0.4)'
  },
  {
    name: 'Team Player',
    metric: '25 Hours',
    icon: Users,
    color: 'from-emerald-400 to-teal-600',
    glow: 'rgba(16, 185, 129, 0.4)'
  },
  {
    name: 'Rising Star',
    metric: '50 Hours',
    icon: Award,
    color: 'from-amber-400 to-orange-600',
    glow: 'rgba(245, 158, 11, 0.4)'
  }
];

export default function Badges() {
  return (
    <WidgetCard 
      title="Badges & Achievements" 
      action={<button className="text-xs bg-vol-border/50 hover:bg-vol-border text-gray-300 px-3 py-1 rounded-full transition-colors border border-vol-border">View All</button>}
    >
      <div className="flex-1 p-5 flex items-center justify-around gap-2">
        {badges.map((badge, idx) => {
          const Icon = badge.icon;
          return (
            <motion.div 
              key={idx} 
              className="flex flex-col items-center text-center group cursor-default"
              whileHover={{ y: -5 }}
            >
              <div 
                className="relative w-16 h-20 mb-3 flex items-center justify-center transition-all duration-300 group-hover:scale-110"
              >
                {/* Shield Shape */}
                <div 
                  className={`absolute inset-0 bg-gradient-to-b ${badge.color} rounded-t-xl rounded-b-[2rem] opacity-90`}
                  style={{ boxShadow: `0 10px 20px -5px ${badge.glow}` }}
                ></div>
                
                {/* Inner Glow/Border */}
                <div className="absolute inset-[2px] bg-vol-bg/40 rounded-t-[10px] rounded-b-[1.8rem] backdrop-blur-sm z-10"></div>
                
                {/* Icon */}
                <Icon size={24} className="text-white z-20 drop-shadow-md" fill="currentColor" />
              </div>
              
              <h3 className="text-xs font-semibold text-white mb-0.5 max-w-[80px] leading-tight">{badge.name}</h3>
              <p className="text-[10px] text-gray-400">{badge.metric}</p>
            </motion.div>
          );
        })}
      </div>

      <div className="p-4 pt-0">
        <button className="w-full py-2.5 rounded-lg bg-vol-accent/10 hover:bg-vol-accent/20 text-vol-accent2 font-medium text-sm transition-colors border border-vol-accent/20">
          View All Badges
        </button>
      </div>
    </WidgetCard>
  );
}
