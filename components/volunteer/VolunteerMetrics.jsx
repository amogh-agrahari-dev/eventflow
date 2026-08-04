import React from 'react';
import { MapPin, Clock, QrCode, ListTodo } from 'lucide-react';

export default function VolunteerMetrics({
  shiftDetails,
  scanCount = 0,
  completedTasksCount = 0,
  totalTasksCount = 0,
}) {
  const taskProgress = totalTasksCount > 0 ? Math.round((completedTasksCount / totalTasksCount) * 100) : 0;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">

      {/* Station — Deep Indigo */}
      <div className="group relative overflow-hidden p-5 rounded-2xl border border-indigo-500/30 bg-gradient-to-br from-indigo-600/90 to-indigo-800/90 text-white shadow-lg shadow-indigo-500/20 hover:-translate-y-1.5 hover:shadow-indigo-500/40 hover:shadow-xl transition-all duration-300 cursor-default">
        <div className="absolute -top-6 -right-6 w-24 h-24 bg-white/5 rounded-full blur-xl" />
        <div className="relative">
          <div className="flex items-start justify-between mb-3">
            <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-200">Assigned Station</span>
            <div className="p-2 rounded-xl bg-white/15">
              <MapPin className="w-4 h-4 text-white" />
            </div>
          </div>
          <p className="text-2xl font-display font-extrabold leading-none mb-1 truncate">
            {shiftDetails?.station || 'Main Gate A'}
          </p>
          <p className="text-xs text-indigo-200 mt-1.5">Station ID: {shiftDetails?.stationId || 'ST-A1'}</p>
        </div>
      </div>

      {/* Shift Hours — Deep Cyan */}
      <div className="group relative overflow-hidden p-5 rounded-2xl border border-cyan-500/30 bg-gradient-to-br from-cyan-500/90 to-teal-700/90 text-white shadow-lg shadow-cyan-500/20 hover:-translate-y-1.5 hover:shadow-cyan-500/40 hover:shadow-xl transition-all duration-300 cursor-default">
        <div className="absolute -top-6 -right-6 w-24 h-24 bg-white/5 rounded-full blur-xl" />
        <div className="relative">
          <div className="flex items-start justify-between mb-3">
            <span className="text-[10px] font-bold uppercase tracking-widest text-cyan-100">Shift Hours</span>
            <div className="p-2 rounded-xl bg-white/15">
              <Clock className="w-4 h-4 text-white" />
            </div>
          </div>
          <p className="text-xl font-display font-extrabold leading-none mb-1">
            {shiftDetails?.timing || '09:00 – 17:00'}
          </p>
          <p className="text-xs text-cyan-100 mt-1.5">Supervisor: {shiftDetails?.supervisor || 'Organizer Team'}</p>
        </div>
      </div>

      {/* Scans Processed — Deep Emerald */}
      <div className="group relative overflow-hidden p-5 rounded-2xl border border-emerald-500/30 bg-gradient-to-br from-emerald-500/90 to-green-700/90 text-white shadow-lg shadow-emerald-500/20 hover:-translate-y-1.5 hover:shadow-emerald-500/40 hover:shadow-xl transition-all duration-300 cursor-default">
        <div className="absolute -top-6 -right-6 w-24 h-24 bg-white/5 rounded-full blur-xl" />
        <div className="relative">
          <div className="flex items-start justify-between mb-3">
            <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-100">Scans Processed</span>
            <div className="p-2 rounded-xl bg-white/15">
              <QrCode className="w-4 h-4 text-white" />
            </div>
          </div>
          <p className="text-4xl font-display font-extrabold leading-none mb-1">{scanCount}</p>
          <p className="text-xs text-emerald-100 mt-1.5">Attendees checked in at station</p>
        </div>
      </div>

      {/* Task Progress — Deep Violet */}
      <div className="group relative overflow-hidden p-5 rounded-2xl border border-violet-500/30 bg-gradient-to-br from-violet-600/90 to-purple-800/90 text-white shadow-lg shadow-violet-500/20 hover:-translate-y-1.5 hover:shadow-violet-500/40 hover:shadow-xl transition-all duration-300 cursor-default">
        <div className="absolute -top-6 -right-6 w-24 h-24 bg-white/5 rounded-full blur-xl" />
        <div className="relative">
          <div className="flex items-start justify-between mb-3">
            <span className="text-[10px] font-bold uppercase tracking-widest text-violet-200">Assigned Tasks</span>
            <div className="p-2 rounded-xl bg-white/15">
              <ListTodo className="w-4 h-4 text-white" />
            </div>
          </div>
          <p className="text-4xl font-display font-extrabold leading-none mb-1">
            {completedTasksCount}<span className="text-xl text-violet-300 font-semibold">/{totalTasksCount}</span>
          </p>
          <div className="mt-3 space-y-1">
            <div className="h-1.5 rounded-full bg-white/20 overflow-hidden">
              <div
                className="h-full rounded-full bg-white transition-all duration-700"
                style={{ width: `${taskProgress}%` }}
              />
            </div>
            <p className="text-xs text-violet-200">{taskProgress}% complete</p>
          </div>
        </div>
      </div>
    </div>
  );
}
