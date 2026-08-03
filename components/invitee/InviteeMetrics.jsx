import React from 'react';
import { Ticket, CalendarDays, CheckCircle2, Clock } from 'lucide-react';

export default function InviteeMetrics({
  totalPassesCount = 0,
  upcomingEventsCount = 0,
  attendedEventsCount = 0,
  pendingRsvpsCount = 0,
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {/* Stat 1: Digital Passes */}
      <div className="p-5 rounded-2xl border border-border/80 bg-card/95 backdrop-blur-md shadow-sm hover:shadow-md transition-all">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Digital Passes</span>
          <div className="p-2 rounded-xl bg-accent/20 text-accent-foreground">
            <Ticket className="w-4 h-4" />
          </div>
        </div>
        <h3 className="text-2xl font-display font-bold text-foreground">
          {totalPassesCount}
        </h3>
        <p className="text-xs text-muted-foreground mt-1">
          Valid entry passes issued
        </p>
      </div>

      {/* Stat 2: Upcoming Events */}
      <div className="p-5 rounded-2xl border border-border/80 bg-card/95 backdrop-blur-md shadow-sm hover:shadow-md transition-all">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Upcoming Events</span>
          <div className="p-2 rounded-xl bg-primary/10 text-primary">
            <CalendarDays className="w-4 h-4" />
          </div>
        </div>
        <h3 className="text-2xl font-display font-bold text-foreground">
          {upcomingEventsCount}
        </h3>
        <p className="text-xs text-muted-foreground mt-1">
          Confirmed registrations
        </p>
      </div>

      {/* Stat 3: Attended Events */}
      <div className="p-5 rounded-2xl border border-border/80 bg-card/95 backdrop-blur-md shadow-sm hover:shadow-md transition-all">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Attended Events</span>
          <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600">
            <CheckCircle2 className="w-4 h-4" />
          </div>
        </div>
        <h3 className="text-2xl font-display font-bold text-foreground">
          {attendedEventsCount}
        </h3>
        <p className="text-xs text-muted-foreground mt-1">
          Check-in verified activities
        </p>
      </div>

      {/* Stat 4: Pending RSVPs */}
      <div className="p-5 rounded-2xl border border-border/80 bg-card/95 backdrop-blur-md shadow-sm hover:shadow-md transition-all">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Pending Invitations</span>
          <div className="p-2 rounded-xl bg-amber-500/10 text-amber-600">
            <Clock className="w-4 h-4" />
          </div>
        </div>
        <h3 className="text-2xl font-display font-bold text-foreground">
          {pendingRsvpsCount}
        </h3>
        <p className="text-xs text-muted-foreground mt-1">
          Awaiting confirmation
        </p>
      </div>
    </div>
  );
}
