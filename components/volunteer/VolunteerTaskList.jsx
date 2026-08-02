import React from 'react';
import { Checkbox } from '@/components/ui';
import { ListTodo } from 'lucide-react';

export default function VolunteerTaskList({
  tasks = [],
  onToggleTask,
}) {
  const completedCount = tasks.filter(t => t.completed).length;

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">
      <div className="p-6 md:p-8 rounded-3xl border border-border/80 bg-card shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-display font-bold">Assigned Tasks & Checklist</h3>
            <p className="text-xs text-muted-foreground">Complete your shift duties assigned by event organizers.</p>
          </div>
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
            {completedCount} of {tasks.length} Done
          </span>
        </div>

        {tasks.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground border border-dashed border-border/60 rounded-2xl">
            <ListTodo className="w-8 h-8 mx-auto mb-2 opacity-40" />
            <p className="text-sm font-medium">No active tasks assigned yet.</p>
            <p className="text-xs text-muted-foreground mt-1">Check back once the organizer publishes your shift duties.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {tasks.map((task) => (
              <div
                key={task.id}
                onClick={() => onToggleTask(task.id)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 ${
                  task.completed
                    ? 'border-emerald-500/30 bg-emerald-500/5 text-muted-foreground'
                    : 'border-border/80 bg-card hover:border-primary/40'
                }`}
              >
                <Checkbox
                  checked={task.completed}
                  onChange={() => {}}
                  className="mt-0.5"
                />
                <div className="flex-1">
                  <h4 className={`text-sm font-semibold ${task.completed ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                    {task.title}
                  </h4>
                  {task.description && (
                    <p className="text-xs text-muted-foreground mt-0.5">{task.description}</p>
                  )}
                  {task.priority && (
                    <span className="inline-block text-[10px] font-medium text-primary mt-2">
                      Priority: {task.priority}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
