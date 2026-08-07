import React from 'react';
import clsx from 'clsx';
import { motion } from 'framer-motion';

export default function WidgetCard({ title, action, children, className, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay }}
      whileHover={{
        y: -3,
        transition: { duration: 0.25, ease: 'easeOut' }
      }}
      className={clsx(
        "bg-vol-card rounded-2xl border border-vol-border overflow-hidden flex flex-col h-full",
        "transition-all duration-300",
        "hover:border-vol-accent/40 hover:shadow-card-lift",
        "group/widget relative",
        className
      )}
    >
      {(title || action) && (
        <div className="px-5 py-4 flex items-center justify-between border-b border-vol-border/30 shrink-0 gap-3">
          {title && (
            <div className="text-base font-semibold text-white flex items-center gap-2 min-w-0">
              {typeof title === 'string' ? (
                <span className="truncate">{title}</span>
              ) : (
                title
              )}
            </div>
          )}
          {action && <div className="shrink-0 flex items-center">{action}</div>}
        </div>
      )}
      <div className="flex-1 flex flex-col min-h-0 min-w-0 overflow-hidden">
        {children}
      </div>
    </motion.div>
  );
}

