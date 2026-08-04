import React from 'react';
import { Button } from '@/components/ui';
import { UserCheck, RefreshCw, Scan, ShieldCheck, Zap, Activity } from 'lucide-react';

export default function VolunteerHeader({
  volunteerProfile,
  assignedEvent,
  dutyStatus,
  onToggleDutyStatus,
  onOpenScanner,
}) {
  const isOnDuty = dutyStatus === 'On Duty';

  return (
    <section className="relative overflow-hidden bg-gradient-brand pt-24 pb-16 text-primary-foreground">
      {/* Ambient background blobs */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-accent/20 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />
      <div className="absolute -bottom-16 -right-16 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60rem] h-48 bg-cyan-400/5 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />

      {/* Faint grid overlay */}
      <div className="absolute inset-0 bg-grid-faint opacity-30" aria-hidden="true" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div className="space-y-4">
            {/* Badge row */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded-full bg-accent/20 text-accent border border-accent/30 backdrop-blur-md">
                <UserCheck className="w-3.5 h-3.5" />
                Volunteer Workspace
              </span>
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded-full border backdrop-blur-md ${
                  isOnDuty
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                    : 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full ${
                    isOnDuty ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'
                  }`}
                />
                {dutyStatus}
              </span>
              {assignedEvent && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded-full bg-white/10 text-white/80 border border-white/10 backdrop-blur-md">
                  <Activity className="w-3 h-3" />
                  {assignedEvent.title}
                </span>
              )}
            </div>

            {/* Headline */}
            <div>
              <h1 className="text-4xl md:text-5xl font-display font-extrabold tracking-tight text-primary-foreground leading-tight">
                {volunteerProfile?.name
                  ? <>Welcome back, <span className="text-gradient-brand">{volunteerProfile.name}</span></>
                  : 'Volunteer Dashboard'
                }
              </h1>
              <p className="text-sm md:text-base text-primary-foreground/70 mt-2 max-w-2xl leading-relaxed">
                {assignedEvent?.title
                  ? `You're assigned to ${assignedEvent.title}. Manage attendee check-ins, complete your tasks, and stay up to date with organizer broadcasts.`
                  : 'Welcome to your volunteer portal. Manage attendee check-ins, shift schedules, tasks, and organizer broadcasts.'}
              </p>
            </div>
          </div>

          {/* Header Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={onToggleDutyStatus}
              className={`inline-flex items-center gap-2 px-4 py-2.5 text-sm font-bold rounded-xl border backdrop-blur-md transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] cursor-pointer ${
                isOnDuty
                  ? 'bg-amber-500/15 border-amber-400/30 text-amber-300 hover:bg-amber-500/25'
                  : 'bg-emerald-500/15 border-emerald-400/30 text-emerald-300 hover:bg-emerald-500/25'
              }`}
            >
              <RefreshCw className="w-4 h-4" />
              {isOnDuty ? 'Go On Break' : 'Resume Duty'}
            </button>

            <button
              onClick={onOpenScanner}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold rounded-xl bg-accent text-slate-950 shadow-lg shadow-accent/30 hover:shadow-accent/50 hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 cursor-pointer"
            >
              <Scan className="w-4 h-4" />
              Open QR Scanner
            </button>
          </div>
        </div>

        {/* Decorative stat strip */}
        <div className="mt-10 grid grid-cols-3 gap-4 max-w-lg">
          {[
            { icon: ShieldCheck, label: 'Active Station', value: 'Gate A' },
            { icon: Zap, label: 'Response Time', value: '< 2s' },
            { icon: Activity, label: 'Current Status', value: dutyStatus },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-center gap-2 p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
              <Icon className="w-4 h-4 text-accent shrink-0" />
              <div className="min-w-0">
                <p className="text-[10px] text-white/50 truncate">{label}</p>
                <p className="text-xs font-bold text-white truncate">{value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
