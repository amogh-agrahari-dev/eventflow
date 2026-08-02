import React from 'react';
import { Button } from '@/components/ui';
import { UserCheck, RefreshCw, Scan } from 'lucide-react';

export default function VolunteerHeader({
  volunteerProfile,
  assignedEvent,
  dutyStatus,
  onToggleDutyStatus,
  onOpenScanner,
}) {
  return (
    <section className="relative overflow-hidden bg-gradient-brand pt-24 pb-12 border-b border-border/40 text-primary-foreground">
      <div className="absolute inset-0 bg-grid-faint opacity-40" aria-hidden="true" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 text-xs font-semibold rounded-full bg-accent/20 text-accent border border-accent/30 backdrop-blur-md inline-flex items-center gap-1.5">
                <UserCheck className="w-3.5 h-3.5" /> Volunteer Workspace
              </span>
              <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 text-xs rounded-full border ${
                dutyStatus === 'On Duty'
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                  : 'bg-amber-500/20 text-amber-300 border-amber-500/30'
              }`}>
                <span className={`w-2 h-2 rounded-full ${dutyStatus === 'On Duty' ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
                {dutyStatus}
              </span>
            </div>

            <h1 className="text-3xl md:text-5xl font-display font-bold tracking-tight text-primary-foreground">
              {volunteerProfile?.name || 'Volunteer Dashboard'}
            </h1>
            <p className="text-sm md:text-base text-primary-foreground/75 mt-1 max-w-2xl">
              {assignedEvent?.title ? `Assigned to ${assignedEvent.title}` : 'Welcome to your event volunteer portal. Manage attendee check-ins, tasks, and shift schedules.'}
            </p>
          </div>

          {/* Header Actions */}
          <div className="flex flex-wrap items-center gap-3">
            <Button
              onClick={onToggleDutyStatus}
              variant="outline"
              className="rounded-xl border-primary-foreground/20 bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/20 text-sm gap-2 backdrop-blur-md"
            >
              <RefreshCw className="w-4 h-4 text-accent" /> Toggle Shift Status ({dutyStatus})
            </Button>

            <Button
              onClick={onOpenScanner}
              variant="hero"
              className="rounded-xl shadow-elevated gap-2"
            >
              <Scan className="w-4 h-4" /> Open QR Scanner
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
