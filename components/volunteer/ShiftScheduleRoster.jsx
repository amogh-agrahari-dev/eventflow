import React from 'react';
import { CalendarDays, Clock, MapPin, User, Phone, ChevronRight } from 'lucide-react';

function InfoRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-white/10 last:border-0 group">
      <div className="flex items-center gap-2.5 text-white/50">
        <div className="p-1.5 rounded-lg bg-white/8 group-hover:bg-cyan-500/20 transition-colors">
          <Icon className="w-3.5 h-3.5 group-hover:text-cyan-400 transition-colors" />
        </div>
        <span className="text-xs font-medium">{label}</span>
      </div>
      <span className="text-xs font-bold text-white text-right max-w-[55%] truncate">{value}</span>
    </div>
  );
}

export default function ShiftScheduleRoster({ assignedEvent, shiftDetails }) {
  return (
    <div className="max-w-3xl mx-auto animate-fade-in">
      <div className="rounded-3xl border border-slate-700/50 overflow-hidden shadow-xl" style={{ background: 'linear-gradient(145deg, hsl(222 47% 14%) 0%, hsl(228 43% 12%) 100%)' }}>

        {/* Header */}
        <div className="px-6 py-5 border-b border-white/10">
          <h3 className="text-xl font-display font-bold text-white">Shift Schedule & Contact Roster</h3>
          <p className="text-xs text-white/40 mt-0.5">Your station assignment details and lead supervisor contact.</p>
        </div>

        <div className="p-6 space-y-6">
          {/* Assignment block */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-1 h-4 rounded-full bg-gradient-to-b from-cyan-400 to-indigo-500" />
              <h4 className="text-sm font-display font-bold text-white">Event Assignment</h4>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden px-4">
              <InfoRow icon={CalendarDays} label="Assigned Event"   value={assignedEvent?.title || 'Event Name Placeholder'} />
              <InfoRow icon={Clock}        label="Shift Timing"     value={shiftDetails?.timing  || '09:00 AM – 05:00 PM'} />
              <InfoRow icon={MapPin}       label="Station Location" value={shiftDetails?.station  || 'Main Gate Check-in Desk'} />
            </div>
          </div>

          {/* Supervisor block */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-1 h-4 rounded-full bg-gradient-to-b from-violet-400 to-purple-600" />
              <h4 className="text-sm font-display font-bold text-white">Supervisor Contact</h4>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden px-4">
              <InfoRow icon={User}  label="Lead Supervisor" value={shiftDetails?.supervisor || 'Organizer Team'} />
              <InfoRow icon={Phone} label="Emergency Line"  value={shiftDetails?.phone      || '+91 98000 00000'} />
            </div>
          </div>

          {/* Protocol reminder */}
          <div className="flex items-start gap-3 p-4 rounded-2xl bg-gradient-to-r from-cyan-500/15 to-indigo-500/10 border border-cyan-500/20">
            <div className="p-2 rounded-xl bg-cyan-500/20 shrink-0">
              <ChevronRight className="w-4 h-4 text-cyan-400" />
            </div>
            <div>
              <p className="text-xs font-bold text-white mb-1">Volunteer Protocol Reminder</p>
              <p className="text-[11px] text-white/50 leading-relaxed">
                Always verify QR passes before granting entry. For any disputes or invalid passes, contact your lead supervisor immediately. Do not grant manual entry without supervisor approval.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
