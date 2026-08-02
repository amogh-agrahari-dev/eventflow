import React from 'react';
import { Megaphone } from 'lucide-react';

export default function VolunteerAnnouncements({
  announcements = [],
}) {
  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">
      <div className="p-6 md:p-8 rounded-3xl border border-border/80 bg-card shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-2xl bg-accent/20 text-accent-foreground">
            <Megaphone className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-display font-bold">Organizer Broadcast Notices</h3>
            <p className="text-xs text-muted-foreground">Important updates and instructions dispatched to volunteers.</p>
          </div>
        </div>

        {announcements.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground border border-dashed border-border/60 rounded-2xl">
            <Megaphone className="w-8 h-8 mx-auto mb-2 opacity-40" />
            <p className="text-sm font-medium">No announcements published yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {announcements.map((ann) => (
              <div key={ann.id} className="p-4 rounded-2xl border border-border/60 bg-muted/20 space-y-1">
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                  <span className="font-semibold text-primary">{ann.sender || 'Event Lead'}</span>
                  <span>{ann.time}</span>
                </div>
                <p className="text-sm text-foreground leading-relaxed">{ann.message}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
