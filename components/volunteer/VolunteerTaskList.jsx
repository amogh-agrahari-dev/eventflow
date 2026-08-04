import React from 'react';
import { ListTodo, CheckCircle2, AlertTriangle, Zap, Circle } from 'lucide-react';

const priorityConfig = {
  High:   { color: 'text-red-300',    bg: 'bg-red-500/20',    border: 'border-red-500/30',    icon: AlertTriangle },
  Medium: { color: 'text-amber-300',  bg: 'bg-amber-500/20',  border: 'border-amber-500/30',  icon: Zap           },
  Low:    { color: 'text-emerald-300',bg: 'bg-emerald-500/20',border: 'border-emerald-500/30',icon: Circle        },
};

export default function VolunteerTaskList({ tasks = [], onToggleTask }) {
  const completedCount = tasks.filter(t => t.completed).length;
  const progress = tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;

  return (
    <div className="max-w-3xl mx-auto animate-fade-in">
      <div className="rounded-3xl border border-slate-700/50 overflow-hidden shadow-xl" style={{ background: 'linear-gradient(145deg, hsl(222 47% 14%) 0%, hsl(228 43% 12%) 100%)' }}>

        {/* Header */}
        <div className="px-6 py-5 border-b border-white/10">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-display font-bold text-white flex items-center gap-2">
                <ListTodo className="w-5 h-5 text-violet-400" />
                Assigned Tasks & Checklist
              </h3>
              <p className="text-xs text-white/40 mt-0.5">Complete your shift duties assigned by event organizers.</p>
            </div>
            <div className="text-right shrink-0">
              <span className="text-3xl font-display font-extrabold text-white">{completedCount}</span>
              <span className="text-lg text-white/40 font-semibold">/{tasks.length}</span>
              <p className="text-[11px] text-white/40 mt-0.5">done</p>
            </div>
          </div>

          {tasks.length > 0 && (
            <div className="mt-4 space-y-1.5">
              <div className="flex justify-between">
                <span className="text-[11px] text-white/40">Overall progress</span>
                <span className="text-[11px] font-bold text-violet-400">{progress}%</span>
              </div>
              <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-violet-500 to-indigo-400 transition-all duration-700"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Task list */}
        <div className="p-5 space-y-2.5">
          {tasks.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-white/40">
              <div className="p-4 rounded-2xl bg-white/5 border border-dashed border-white/10 mb-3">
                <ListTodo className="w-8 h-8 opacity-30" />
              </div>
              <p className="text-sm font-medium">No tasks assigned yet</p>
              <p className="text-[11px] text-white/30 mt-1">Check back once the organizer publishes your shift duties.</p>
            </div>
          ) : (
            tasks.map((task) => {
              const pConf = task.priority ? priorityConfig[task.priority] : null;
              const PIcon = pConf?.icon;
              return (
                <div
                  key={task.id}
                  onClick={() => onToggleTask(task.id)}
                  className={`group p-4 rounded-2xl border transition-all duration-200 cursor-pointer flex items-start gap-3.5 hover:-translate-y-0.5 hover:shadow-lg ${
                    task.completed
                      ? 'border-emerald-500/25 bg-emerald-500/10'
                      : 'border-white/10 bg-white/5 hover:border-violet-500/40 hover:bg-violet-500/10'
                  }`}
                >
                  {/* Custom checkbox */}
                  <div className={`mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
                    task.completed ? 'bg-emerald-500 border-emerald-500' : 'border-white/30 group-hover:border-violet-400/60'
                  }`}>
                    {task.completed && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className={`text-sm font-bold leading-tight ${task.completed ? 'line-through text-white/30' : 'text-white'}`}>
                      {task.title}
                    </h4>
                    {task.description && (
                      <p className="text-xs text-white/50 mt-1 leading-relaxed">{task.description}</p>
                    )}
                    {pConf && PIcon && (
                      <span className={`inline-flex items-center gap-1 mt-2 text-[10px] font-bold px-2 py-0.5 rounded-full border ${pConf.color} ${pConf.bg} ${pConf.border}`}>
                        <PIcon className="w-3 h-3" />
                        {task.priority} Priority
                      </span>
                    )}
                  </div>

                  {task.completed && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 shrink-0">Done</span>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
