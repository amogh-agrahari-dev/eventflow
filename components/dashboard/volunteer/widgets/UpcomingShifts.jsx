import React, { useState, useEffect } from 'react';
import WidgetCard from './WidgetCard';
import { 
  MapPin, 
  Clock, 
  ChevronRight, 
  CheckSquare, 
  RefreshCw, 
  Sparkles, 
  ExternalLink,
  PowerOff,
  Activity,
  FileText
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUserStore } from '@/store/userStore';
import { getToken } from '@/lib/auth';
import { useRouter } from 'next/router';
import clsx from 'clsx';

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08 + 0.1, duration: 0.4, ease: [0.16, 1, 0.3, 1] }
  })
};

function parseShiftDate(dateStr) {
  if (!dateStr) return { month: 'TBD', day: '--' };
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return { month: 'TBD', day: '--' };
    const month = d.toLocaleString('en-US', { month: 'short' }).toUpperCase();
    const day = String(d.getDate()).padStart(2, '0');
    return { month, day };
  } catch (err) {
    return { month: 'TBD', day: '--' };
  }
}

function formatShiftTime(startStr, endStr) {
  if (!startStr) return 'Time TBD';
  try {
    const start = new Date(startStr);
    if (isNaN(start.getTime())) return 'Time TBD';
    const startFormatted = start.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });

    if (!endStr) return startFormatted;
    const end = new Date(endStr);
    if (isNaN(end.getTime())) return startFormatted;
    const endFormatted = end.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });

    return `${startFormatted} - ${endFormatted}`;
  } catch (err) {
    return 'Time TBD';
  }
}

function getStatusBadgeStyle(status) {
  const s = String(status || '').toLowerCase();
  if (s.includes('complete') || s.includes('done')) {
    return 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30';
  }
  if (s.includes('progress') || s.includes('duty')) {
    return 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30';
  }
  if (s.includes('pending')) {
    return 'bg-amber-500/15 text-amber-300 border-amber-500/30';
  }
  return 'bg-vol-accent/15 text-vol-accent2 border-vol-accent2/30';
}

function formatStatusText(status) {
  if (!status) return 'Upcoming';
  const s = String(status);
  if (s === 'on-duty') return 'On Duty';
  if (s === 'in-progress') return 'In Progress';
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export default function UpcomingShifts({ className, delay = 0 }) {
  const router = useRouter();
  const { user, fetchUser, logout } = useUserStore();
  const token = getToken();

  const [dutyStatus, setDutyStatus] = useState('on-duty');
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token && !user) {
      fetchUser();
    }
  }, [token, user, fetchUser]);

  const fetchTasks = async (userId) => {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/tasks/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const data = await response.json();
        console.log("Tasks data:", data);
        setTasks(Array.isArray(data) ? data : []);
      } else {
        setTasks([]);
      }
    } catch (error) {
      console.error("Error fetching tasks by user ID:", error);
      setTasks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const userId = user?.id || user?._id || user?.user_id;
    if (userId) {
      fetchTasks(userId);
    } else {
      setLoading(false);
    }
  }, [user]);

  return (
    <WidgetCard
      title={
        <div className="flex items-center gap-2">
          <CheckSquare size={18} className="text-vol-accent2" />
          <span>My Tasks</span>
        </div>
      }
      className={className}
      delay={delay}
      action={
        <div className="flex items-center gap-2">
          {/* Duty Status Pill Toggle */}
          <div className="flex items-center p-0.5 rounded-full bg-vol-card border border-vol-border">
            <button
              type="button"
              onClick={() => setDutyStatus('on-duty')}
              className={clsx(
                "px-2.5 py-0.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all duration-200 cursor-pointer",
                dutyStatus === 'on-duty'
                  ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm"
                  : "text-gray-400 hover:text-gray-200"
              )}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>On-Duty</span>
            </button>
            <button
              type="button"
              onClick={() => setDutyStatus('off-duty')}
              className={clsx(
                "px-2.5 py-0.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all duration-200 cursor-pointer",
                dutyStatus === 'off-duty'
                  ? "bg-rose-500/20 text-rose-300 border border-rose-500/40 shadow-sm"
                  : "text-gray-400 hover:text-gray-200"
              )}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
              <span>Off-Duty</span>
            </button>
          </div>

          {dutyStatus === 'on-duty' && (
            <button
              onClick={() => {
                const userId = user?.id || user?._id || user?.user_id;
                if (userId) fetchTasks(userId);
              }}
              className="text-xs bg-vol-border/50 hover:bg-vol-border text-gray-300 p-1.5 rounded-full transition-all border border-vol-border hover:border-vol-accent/30 hover:text-white flex items-center justify-center cursor-pointer"
              title="Refresh tasks"
            >
              <RefreshCw size={13} className={clsx("text-vol-accent2 shrink-0", loading && "animate-spin")} />
            </button>
          )}
        </div>
      }
    >
      <div className="flex-1 p-5 flex flex-col gap-3.5 justify-between">
        {/* Status Bar Indicator */}
        <div className={clsx(
          "flex items-center justify-between px-3.5 py-2 rounded-xl border text-xs font-medium transition-all duration-300",
          dutyStatus === 'on-duty'
            ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-300"
            : "bg-rose-500/10 border-rose-500/20 text-rose-300"
        )}>
          <div className="flex items-center gap-2">
            <span className={clsx(
              "w-2 h-2 rounded-full",
              dutyStatus === 'on-duty' ? "bg-emerald-400 animate-pulse" : "bg-rose-400"
            )} />
            <span>
              {dutyStatus === 'on-duty' 
                ? "Status: On-Duty (Active tasks visible)" 
                : "Status: Off-Duty (Tasks hidden)"}
            </span>
          </div>
          <span className="text-[11px] opacity-80">
            {dutyStatus === 'on-duty' ? `${tasks.length} Assigned` : 'Inactive'}
          </span>
        </div>

        {/* OFF-DUTY STATE */}
        {dutyStatus === 'off-duty' && (
          <div className="flex flex-col items-center justify-center py-10 text-center px-4">
            <div className="w-14 h-14 rounded-2xl bg-vol-bg border border-dashed border-vol-border mb-3.5 flex items-center justify-center text-gray-400">
              <PowerOff size={24} className="text-gray-400" />
            </div>
            <h4 className="text-sm font-semibold text-white mb-1">You Are Currently Off-Duty</h4>
            <p className="text-xs text-gray-400 max-w-sm mb-4 leading-relaxed">
              Your assigned tasks and duties are hidden while you are off-duty. Switch your status to on-duty to view active tasks.
            </p>
            <button
              onClick={() => setDutyStatus('on-duty')}
              className="px-4 py-2 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer shadow-sm"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Go On-Duty</span>
            </button>
          </div>
        )}

        {/* ON-DUTY STATE */}
        {dutyStatus === 'on-duty' && (
          <>
            {/* Loading State */}
            {loading && tasks.length === 0 && (
              <div className="flex flex-col gap-3 animate-pulse">
                {[1, 2].map((i) => (
                  <div key={i} className="flex items-center gap-3.5 p-3.5 rounded-xl bg-vol-bg border border-vol-border/40">
                    <div className="w-12 h-12 rounded-lg bg-vol-card border border-vol-border/60 shrink-0" />
                    <div className="flex-1 space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="h-4 bg-vol-card rounded w-1/3" />
                        <div className="h-4 bg-vol-card rounded w-16" />
                      </div>
                      <div className="h-3 bg-vol-card/70 rounded w-1/2" />
                      <div className="h-3 bg-vol-card/50 rounded w-2/3" />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Empty State */}
            {!loading && tasks.length === 0 && (
              <div className="flex flex-col items-center justify-center py-8 text-center px-4">
                <div className="w-12 h-12 rounded-2xl bg-vol-bg border border-dashed border-vol-border mb-3 flex items-center justify-center text-gray-500">
                  <FileText size={22} className="text-gray-400" />
                </div>
                <h4 className="text-sm font-semibold text-white mb-1">No Assigned Tasks Found</h4>
                <p className="text-xs text-gray-400 max-w-sm mb-4 leading-relaxed">
                  You don&apos;t have any active volunteer tasks assigned yet. Check back soon or explore open opportunities.
                </p>
                <button
                  onClick={() => router.push('/all-events')}
                  className="px-4 py-2 rounded-lg bg-vol-accent/15 hover:bg-vol-accent/25 text-vol-accent2 border border-vol-accent/30 text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer shadow-glow-accent"
                >
                  <Sparkles size={14} />
                  <span>Explore Available Events</span>
                </button>
              </div>
            )}

            {/* Tasks List */}
            {!loading && tasks.length > 0 && (
              <div className="flex flex-col gap-3">
                {tasks.map((task, idx) => {
                  const eventDateStr = task.event?.start_time || task.created_at;
                  const dateInfo = parseShiftDate(eventDateStr);
                  const timeFormatted = formatShiftTime(task.event?.start_time, task.event?.end_time);
                  const taskLocation = task.location || task.event?.location || 'PICT Campus';
                  const taskTitle = task.title || 'Volunteer Task';
                  const statusBadgeStyle = getStatusBadgeStyle(task.status);
                  const formattedStatus = formatStatusText(task.status);

                  return (
                    <motion.div
                      key={task.id || idx}
                      custom={idx}
                      initial="hidden"
                      animate="visible"
                      variants={itemVariants}
                      whileHover={{ y: -2 }}
                      onClick={() => {
                        if (task.event_id || task.event?.id) {
                          router.push(`/events/${task.event_id || task.event?.id}`);
                        }
                      }}
                      className="flex items-center gap-3.5 p-3.5 rounded-xl bg-vol-bg border border-vol-border/50 hover:border-vol-accent/40 hover:bg-vol-border/20 transition-all duration-300 hover:shadow-glow-accent group cursor-pointer overflow-hidden relative"
                    >
                      {/* Hover Accent Edge */}
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-vol-accent to-vol-accent2 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />

                      {/* Date Badge */}
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="flex flex-col items-center justify-center w-12 h-12 rounded-lg bg-vol-card border border-vol-border shrink-0 group-hover:border-vol-accent/40 group-hover:shadow-glow-accent transition-all"
                      >
                        <span className="text-[10px] font-bold text-vol-accent2 uppercase tracking-wider">{dateInfo.month}</span>
                        <span className="text-lg font-extrabold text-white leading-none mt-0.5">{dateInfo.day}</span>
                      </motion.div>

                      {/* Task Information */}
                      <div className="flex-1 min-w-0 overflow-hidden">
                        <div className="flex justify-between items-center gap-2 mb-1">
                          <div className="flex items-center gap-2 min-w-0">
                            {/* Task Title as Main Heading */}
                            <h3 className="font-semibold text-white truncate text-sm group-hover:text-vol-accent2 transition-colors">
                              {taskTitle}
                            </h3>
                            {task.importance && (
                              <span className={clsx(
                                "px-1.5 py-0.2 rounded text-[9px] font-semibold border uppercase tracking-wider shrink-0 hidden sm:inline-block",
                                task.importance === 'high'
                                  ? "bg-rose-500/15 text-rose-300 border-rose-500/30"
                                  : task.importance === 'low'
                                    ? "bg-emerald-500/15 text-emerald-300 border-emerald-500/30"
                                    : "bg-amber-500/15 text-amber-300 border-amber-500/30"
                              )}>
                                {task.importance}
                              </span>
                            )}
                          </div>

                          <span className={clsx("px-2 py-0.5 rounded text-[10px] font-medium border shrink-0", statusBadgeStyle)}>
                            {formattedStatus}
                          </span>
                        </div>

                        {task.description && (
                          <p className="text-xs text-gray-300 mb-1.5 truncate font-normal">
                            {task.description}
                          </p>
                        )}

                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                          <div className="flex items-center gap-1.5 text-[11px] text-gray-400 min-w-0">
                            <Clock size={12} className="shrink-0 text-vol-accent2" />
                            <span className="truncate">{timeFormatted}</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-[11px] text-gray-400 min-w-0">
                            <MapPin size={12} className="shrink-0 text-vol-accent2" />
                            <span className="truncate">{taskLocation}</span>
                          </div>
                        </div>
                      </div>

                      {/* Navigation arrow */}
                      <ChevronRight
                        size={16}
                        className="self-center text-vol-border opacity-0 group-hover:opacity-100 group-hover:text-vol-accent2 group-hover:translate-x-0.5 transition-all duration-200 shrink-0 hidden sm:block"
                      />
                    </motion.div>
                  );
                })}
              </div>
            )}
          </>
        )}
      </div>

      <div className="p-5 pt-0 mt-auto">
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => router.push('/all-events')}
          className="w-full py-2.5 rounded-lg bg-vol-accent/10 hover:bg-vol-accent/20 text-vol-accent2 font-medium text-sm transition-all border border-vol-accent/20 hover:border-vol-accent/40 hover:shadow-glow-accent cursor-pointer flex items-center justify-center gap-1.5"
        >
          <span>Explore All Opportunities</span>
          <ExternalLink size={14} />
        </motion.button>
      </div>
    </WidgetCard>
  );
}


