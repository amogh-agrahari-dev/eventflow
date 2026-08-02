import React from 'react';
import { Button } from '@/components/ui';
import { UserCheck } from 'lucide-react';

export default function VolunteerRosterManager({
  volunteers = [],
  onOpenAssignModal,
  onToggleStatus,
}) {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header & Add Volunteer Action */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl border border-border/80 bg-card/60 backdrop-blur-sm">
        <div>
          <h3 className="text-lg font-display font-bold">Event Volunteer Roster</h3>
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {volunteers.map((vol) => (
          <div key={vol.id} className="p-5 rounded-2xl border border-border/80 bg-card shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                  {vol.role}
                </span>

                <button
                  onClick={() => onToggleStatus(vol.id)}
                  className={`inline-flex items-center gap-1 px-2.5 py-0.5 text-xs font-semibold rounded-full border transition-all ${
                    vol.status === 'On Duty'
                      ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/30'
                      : 'bg-amber-500/10 text-amber-600 border-amber-500/30'
                  }`}
                  title="Click to toggle status"
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${vol.status === 'On Duty' ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
                  {vol.status}
                </button>
              </div>

              <h4 className="text-lg font-display font-bold text-foreground mb-1">{vol.name}</h4>
              <p className="text-xs text-muted-foreground mb-3">{vol.event}</p>

              <div className="space-y-1.5 text-xs text-muted-foreground bg-muted/40 p-3 rounded-xl mb-4">
                <div className="flex justify-between">
                  <span>Shift Hours:</span>
                  <span className="font-semibold text-foreground">{vol.shift}</span>
                </div>
                <div className="flex justify-between">
                  <span>Contact:</span>
                  <span className="font-semibold text-foreground">{vol.phone}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2 border-t border-border/60">
              <Button
                onClick={() => onToggleStatus(vol.id)}
                variant="outline"
                className="w-full text-xs rounded-xl h-9"
              >
                Toggle Duty Status
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
