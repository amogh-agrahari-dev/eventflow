import React from 'react';

export default function ShiftScheduleRoster({
  assignedEvent,
  shiftDetails,
}) {
  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">
      <div className="p-6 md:p-8 rounded-3xl border border-border/80 bg-card shadow-sm space-y-6">
        <div>
          <h3 className="text-xl font-display font-bold">Shift Schedule & Contact Roster</h3>
          <p className="text-xs text-muted-foreground">Details regarding your station assignment and lead supervisor contact.</p>
        </div>

        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-muted/40 border border-border/60 space-y-3">
            <div className="flex justify-between items-center text-sm border-b border-border/50 pb-2">
              <span className="text-muted-foreground">Assigned Event:</span>
              <span className="font-semibold text-foreground">{assignedEvent?.title || 'Event Name Placeholder'}</span>
            </div>
            <div className="flex justify-between items-center text-sm border-b border-border/50 pb-2">
              <span className="text-muted-foreground">Shift Timing:</span>
              <span className="font-semibold text-foreground">{shiftDetails?.timing || '09:00 AM - 05:00 PM'}</span>
            </div>
            <div className="flex justify-between items-center text-sm border-b border-border/50 pb-2">
              <span className="text-muted-foreground">Station Location:</span>
              <span className="font-semibold text-foreground">{shiftDetails?.station || 'Main Gate Check-in Desk'}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">Lead Supervisor:</span>
              <span className="font-semibold text-foreground">{shiftDetails?.supervisor || 'Organizer Team (+91 98000 00000)'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
