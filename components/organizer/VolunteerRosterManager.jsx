import React from 'react';
import { Button } from '@/components/ui';
import { UserCheck, ShieldCheck, Phone, Clock } from 'lucide-react';

export default function VolunteerRosterManager({
  volunteers = [],
  onOpenAssignModal,
  onToggleStatus,
}) {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header & Add Volunteer Action */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-3xl border border-border/80 bg-card/80 backdrop-blur-md shadow-sm hover:shadow-md transition-shadow">
        <div>
          <h3 className="text-xl font-display font-bold">Event Volunteer Roster</h3>
          <p className="text-xs text-muted-foreground">Assign tasks, monitor active shifts, and contact onboarded student volunteers.</p>
        </div>

        <Button
          onClick={onOpenAssignModal}
          variant="hero"
          className="rounded-xl text-xs gap-2"
        >
          <UserCheck className="w-4 h-4" /> Assign New Volunteer
        </Button>
      </div>

      {/* Volunteer Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {volunteers.map((vol) => (
          <div
            key={vol.id}
            className="p-6 rounded-3xl border border-border/80 bg-card shadow-sm hover:shadow-2xl hover:border-accent/40 hover:-translate-y-2 transition-all duration-300 ease-out flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 shadow-xs">
                  {vol.role}
                </span>

                <button
                  onClick={() => onToggleStatus(vol.id)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded-full border transition-all ${
                    vol.status === 'On Duty'
                      ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/30 shadow-xs'
                      : 'bg-amber-500/10 text-amber-600 border-amber-500/30 shadow-xs'
                  }`}
                  title="Click to toggle duty status"
                >
                  <span className={`w-2 h-2 rounded-full ${vol.status === 'On Duty' ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
                  {vol.status}
                </button>
              </div>

              <h4 className="text-xl font-display font-extrabold text-foreground group-hover:text-accent transition-colors mb-1">
                {vol.name}
              </h4>
              <p className="text-xs text-muted-foreground font-medium mb-4">{vol.event}</p>

              <div className="space-y-2 text-xs text-muted-foreground bg-muted/40 p-4 rounded-2xl mb-5 border border-border/50">
                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-primary" /> Shift Hours:
                  </span>
                  <span className="font-semibold text-foreground">{vol.shift}</span>
                </div>
                <div className="flex justify-between items-center pt-1 border-t border-border/40">
                  <span className="flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-primary" /> Contact:
                  </span>
                  <span className="font-semibold text-foreground font-mono">{vol.phone}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2 border-t border-border/50">
              <Button
                onClick={() => onToggleStatus(vol.id)}
                variant="outline"
                className="w-full text-xs rounded-xl h-10 gap-1.5"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-accent" /> Toggle Shift Duty
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
