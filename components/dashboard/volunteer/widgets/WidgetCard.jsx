import React from 'react';
import clsx from 'clsx';
import { motion } from 'framer-motion';

export default function WidgetCard({ title, action, children, className }) {
  return (
    <motion.div 
      whileHover={{ y: -2, boxShadow: '0 20px 30px -10px rgba(0, 0, 0, 0.5)' }}
      className={clsx("bg-vol-card rounded-2xl border border-vol-border overflow-hidden flex flex-col transition-all duration-300", className)}
    >
      {(title || action) && (
        <div className="px-5 py-4 flex items-center justify-between border-b border-vol-border/30">
          {title && <h2 className="text-base font-semibold text-white">{title}</h2>}
          {action && <div>{action}</div>}
        </div>
      )}
      <div className="flex-1 flex flex-col h-full">
        {children}
      </div>
    </motion.div>
  );
}
