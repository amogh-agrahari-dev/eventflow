import React from 'react';
import { ListTodo, CheckCircle2, AlertTriangle, Zap, Circle, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import WidgetCard from '@/components/dashboard/volunteer/widgets/WidgetCard';
import clsx from 'clsx';

const priorityConfig = {
  High:   { color: 'text-rose-300',    bg: 'bg-rose-500/15',    border: 'border-rose-500/30',    icon: AlertTriangle },
  Medium: { color: 'text-amber-300',  bg: 'bg-amber-500/15',  border: 'border-amber-500/30',  icon: Zap           },
  Low:    { color: 'text-emerald-300',bg: 'bg-emerald-500/15',border: 'border-emerald-500/30',icon: Circle        },
};

export default function VolunteerTaskList({ tasks = [], onToggleTask, className, delay = 0.1 }) {
  const completedCount = tasks.filter(t => t.completed).length;
  const progress = tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;

  return (
    <WidgetCard
      className={className}
      delay={delay}
      title={
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-lg bg-vol-accent/15 border border-vol-accent/30 flex items-center justify-center text-vol-accent2 shrink-0">
            <ListTodo size={18} />
          </div>
          <div className="min-w-0">
            <h2 className="text-base font-semibold text-white truncate">Assigned Tasks & Checklist</h2>
            <p className="text-[11px] text-gray-400 hidden sm:block truncate">Shift duties assigned by event organizers</p>
          </div>
        </div>
      }
      action={
        <div className="flex items-center gap-3 shrink-0">
          <div className="text-right hidden sm:block">
            <span className="text-xs font-semibold text-white">{completedCount}</span>
            <span className="text-xs text-gray-500">/{tasks.length}</span>
          </div>
          <div className="w-20 sm:w-28 flex flex-col gap-1">
            <div className="flex justify-between items-center text-[10px]">
              <span className="text-gray-400">Progress</span>
              <span className="font-bold text-vol-accent2">{progress}%</span>
            </div>
            <div className="h-1.5 rounded-full bg-vol-border/60 overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-vol-accent to-vol-accent2"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
              />
            </div>
          </div>
        </div>
      }
    >
      <div className="flex-1 p-5 flex flex-col justify-between overflow-hidden min-h-0">
        <div className="space-y-2.5 overflow-y-auto max-h-[320px] pr-1 custom-scrollbar">
          {tasks.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="p-3.5 rounded-2xl bg-vol-bg border border-dashed border-vol-border mb-3 text-gray-500">
                <ListTodo size={28} />
              </div>
              <p className="text-sm font-medium text-gray-300">No tasks assigned yet</p>
              <p className="text-xs text-gray-500 mt-1 max-w-xs">Check back once the organizer publishes your shift duties.</p>
            </div>
          ) : (
            tasks.map((task, idx) => {
              const pConf = task.priority ? priorityConfig[task.priority] : null;
              const PIcon = pConf?.icon;
              return (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 + 0.1, duration: 0.3 }}
                  onClick={() => onToggleTask(task.id)}
                  className={clsx(
                    "group p-3.5 rounded-xl border transition-all duration-200 cursor-pointer flex items-start gap-3 relative overflow-hidden",
                    task.completed
                      ? "border-vol-success/20 bg-vol-success/5 hover:bg-vol-success/10"
                      : "border-vol-border/60 bg-vol-bg hover:border-vol-accent/40 hover:bg-vol-border/20"
                  )}
                >
                  {/* Custom checkbox */}
                  <div className={clsx(
                    "mt-0.5 w-5 h-5 rounded-md border flex items-center justify-center shrink-0 transition-all duration-200",
                    task.completed 
                      ? "bg-vol-success border-vol-success text-white shadow-glow-accent" 
                      : "border-vol-border group-hover:border-vol-accent2 bg-vol-card/50"
                  )}>
                    {task.completed && <Check size={13} strokeWidth={3} className="text-white" />}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className={clsx(
                      "text-sm font-medium leading-snug transition-colors truncate",
                      task.completed ? "line-through text-gray-500" : "text-white group-hover:text-vol-accent2"
                    )}>
                      {task.title}
                    </h4>
                    {task.description && (
                      <p className={clsx(
                        "text-xs mt-1 leading-relaxed line-clamp-2",
                        task.completed ? "text-gray-600 line-through" : "text-gray-400"
                      )}>
                        {task.description}
                      </p>
                    )}
                    <div className="flex items-center gap-2 mt-2">
                      {pConf && PIcon && (
                        <span className={clsx(
                          "inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-md border",
                          pConf.color, pConf.bg, pConf.border
                        )}>
                          <PIcon size={11} />
                          {task.priority} Priority
                        </span>
                      )}
                      {task.eventId && (
                        <span className="text-[10px] text-gray-500 font-mono">
                          Event #{task.eventId}
                        </span>
                      )}
                    </div>
                  </div>

                  {task.completed && (
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-vol-success/15 text-vol-success border border-vol-success/25 shrink-0 self-center">
                      Done
                    </span>
                  )}
                </motion.div>
              );
            })
          )}
        </div>
      </div>
    </WidgetCard>
  );
}

