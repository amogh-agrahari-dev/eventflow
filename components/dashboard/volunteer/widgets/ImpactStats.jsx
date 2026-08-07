import React, { useState, useEffect, useRef } from 'react';
import WidgetCard from './WidgetCard';
import { ArrowUp, Award, CalendarCheck, CheckCircle2, TrendingUp } from 'lucide-react';
import { BarChart, Bar, ResponsiveContainer, Cell } from 'recharts';
import { motion } from 'framer-motion';

const data = [
  { value: 20 },
  { value: 40 },
  { value: 30 },
  { value: 70 },
  { value: 40 },
  { value: 60 },
  { value: 50 },
  { value: 90 },
  { value: 70 },
  { value: 100 },
];

function AnimatedCounter({ value, suffix = '', decimals = 0, duration = 1.5 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let startTime;
          const target = value;
          const animate = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
            const eased = 1 - Math.pow(1 - progress, 4);
            setCount(eased * target);
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value, duration, hasAnimated]);

  return (
    <span ref={ref}>
      {decimals > 0 ? count.toFixed(decimals) : Math.floor(count)}{suffix}
    </span>
  );
}

export default function ImpactStats({ className, delay = 0.1 }) {
  return (
    <WidgetCard 
      title={
        <div className="flex items-center gap-2">
          <TrendingUp size={18} className="text-vol-accent2" />
          <span>My Impact</span>
        </div>
      } 
      className={className}
      delay={delay}
    >
      <div className="flex-1 p-5 flex flex-col justify-between gap-4">
        {/* Main Stat: Hours Contributed */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: delay + 0.1, duration: 0.5 }}
          className="flex items-end justify-between p-4 rounded-xl bg-vol-bg border border-vol-border/50"
        >
          <div>
            <p className="text-xs text-gray-400 mb-1">Hours Contributed</p>
            <div className="flex items-baseline gap-1.5">
              <span className="text-3xl font-extrabold text-white leading-none tracking-tight">
                <AnimatedCounter value={48.5} decimals={1} />
              </span>
              <span className="text-xs font-medium text-gray-400">hours</span>
            </div>
            <div className="flex items-center gap-1 mt-2 text-vol-success text-[11px] font-semibold">
              <ArrowUp size={12} />
              <span>+12% this month</span>
            </div>
          </div>
          
          <div className="w-24 h-14 relative shrink-0">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                <Bar dataKey="value" radius={[2, 2, 0, 0]} animationDuration={1000} animationBegin={300}>
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === data.length - 1 ? '#8B5CF6' : '#3730A3'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Secondary Metrics: 2-Column Grid */}
        <div className="grid grid-cols-2 gap-3 mt-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: delay + 0.2, duration: 0.4 }}
            className="p-3.5 rounded-xl bg-vol-bg border border-vol-border/40 flex flex-col justify-between"
          >
            <div className="flex items-center justify-between gap-1 mb-2">
              <span className="text-xs text-gray-400 truncate">Events</span>
              <CalendarCheck size={14} className="text-vol-accent2 shrink-0" />
            </div>
            <div className="text-2xl font-bold text-white leading-none">
              <AnimatedCounter value={12} />
            </div>
            <span className="text-[10px] text-gray-500 mt-1">Attended</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: delay + 0.3, duration: 0.4 }}
            className="p-3.5 rounded-xl bg-vol-bg border border-vol-border/40 flex flex-col justify-between"
          >
            <div className="flex items-center justify-between gap-1 mb-2">
              <span className="text-xs text-gray-400 truncate">Check-ins</span>
              <CheckCircle2 size={14} className="text-vol-success shrink-0" />
            </div>
            <div className="text-2xl font-bold text-white leading-none">
              <AnimatedCounter value={36} />
            </div>
            <span className="text-[10px] text-vol-success font-medium mt-1">+8 this month</span>
          </motion.div>
        </div>
      </div>
    </WidgetCard>
  );
}

