import React, { useState, useEffect, useRef } from 'react';
import WidgetCard from './WidgetCard';
import { ArrowUp } from 'lucide-react';
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

export default function ImpactStats() {
  return (
    <WidgetCard title="My Impact" delay={0.1}>
      <div className="flex-1 p-5 flex flex-col justify-between">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex items-end justify-between border-b border-vol-border/30 pb-4 mb-4"
        >
          <div>
            <p className="text-sm text-gray-400 mb-1">Hours Contributed</p>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-bold text-white leading-none">
                <AnimatedCounter value={48.5} decimals={1} />
              </span>
              <span className="text-sm text-gray-400">hours</span>
            </div>
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, duration: 0.4 }}
              className="flex items-center gap-1 mt-2 text-vol-success text-xs font-medium"
            >
              <ArrowUp size={12} />
              <span>12% this month</span>
            </motion.div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="w-24 h-16"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <Bar dataKey="value" radius={[2, 2, 0, 0]} animationDuration={1200} animationBegin={400}>
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === data.length - 1 ? '#8B5CF6' : '#4C1D95'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.5 }}
            className="border-b border-vol-border/30 pb-4"
          >
            <p className="text-sm text-gray-400 mb-1">Events Attended</p>
            <span className="text-2xl font-bold text-white leading-none">
              <AnimatedCounter value={12} />
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <p className="text-sm text-gray-400 mb-1">Check-ins Completed</p>
            <span className="text-2xl font-bold text-white leading-none">
              <AnimatedCounter value={36} />
            </span>
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.2, duration: 0.4 }}
              className="flex items-center gap-1 mt-2 text-vol-success text-xs font-medium"
            >
              <ArrowUp size={12} />
              <span>8 this month</span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </WidgetCard>
  );
}
