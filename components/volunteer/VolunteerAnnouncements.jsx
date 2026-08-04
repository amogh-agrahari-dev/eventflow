import React from 'react';
import { Megaphone, Clock, User, AlertCircle, Info, Bell } from 'lucide-react';

const urgencyConfig = {
  urgent:  { accent: 'from-red-500/20 to-red-600/5',    border: 'border-red-500/30',    icon: AlertCircle, badge: 'bg-red-500/20 text-red-300 border-red-500/30',    label: 'Urgent'   },
  info:    { accent: 'from-cyan-500/20 to-cyan-600/5',   border: 'border-cyan-500/30',   icon: Info,        badge: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',   label: 'Info'     },
  update:  { accent: 'from-indigo-500/20 to-indigo-600/5', border: 'border-indigo-500/30', icon: Bell,      badge: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30', label: 'Update' },
  default: { accent: 'from-violet-500/20 to-violet-600/5', border: 'border-violet-500/30', icon: Megaphone, badge: 'bg-violet-500/20 text-violet-300 border-violet-500/30', label: 'Notice' },
};

export default function VolunteerAnnouncements({ announcements = [] }) {
  return (
    <div className="max-w-3xl mx-auto animate-fade-in">
      <div className="rounded-3xl border border-slate-700/50 overflow-hidden shadow-xl" style={{ background: 'linear-gradient(145deg, hsl(222 47% 14%) 0%, hsl(228 43% 12%) 100%)' }}>

        {/* Header */}
        <div className="px-6 py-5 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-gradient-to-br from-violet-500/25 to-indigo-500/10 border border-violet-500/20">
              <Megaphone className="w-5 h-5 text-violet-400" />
            </div>
            <div>
              <h3 className="text-xl font-display font-bold text-white">Organizer Broadcast Notices</h3>
              <p className="text-xs text-white/40 mt-0.5">Important updates dispatched to all volunteers.</p>
            </div>
          </div>
          {announcements.length > 0 && (
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-violet-500/20 text-violet-300 border border-violet-500/30">
              {announcements.length} new
            </span>
          )}
        </div>

        {/* Content */}
        <div className="p-5 space-y-3">
          {announcements.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-white/40">
              <div className="p-4 rounded-2xl bg-white/5 border border-dashed border-white/10 mb-3">
                <Megaphone className="w-8 h-8 opacity-30" />
              </div>
              <p className="text-sm font-medium">No announcements yet</p>
              <p className="text-[11px] text-white/30 mt-1">Organizer broadcasts will appear here in real time.</p>
            </div>
          ) : (
            announcements.map((ann) => {
              const conf = urgencyConfig[ann.urgency] || urgencyConfig.default;
              const AnnIcon = conf.icon;
              return (
                <div
                  key={ann.id}
                  className={`group p-4 rounded-2xl border bg-gradient-to-r ${conf.accent} ${conf.border} hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200`}
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-xl bg-white/10 shrink-0 mt-0.5">
                      <AnnIcon className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1.5">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${conf.badge}`}>{conf.label}</span>
                        <div className="flex items-center gap-1 text-[10px] text-white/50">
                          <User className="w-3 h-3" />
                          <span className="font-semibold text-white/70">{ann.sender || 'Event Lead'}</span>
                        </div>
                        <div className="flex items-center gap-1 text-[10px] text-white/40 ml-auto">
                          <Clock className="w-3 h-3" />
                          {ann.time}
                        </div>
                      </div>
                      <p className="text-sm text-white/80 leading-relaxed">{ann.message}</p>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
