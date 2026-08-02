import React from 'react';
import { Users, TrendingUp, Scan, UserCheck, Ticket } from 'lucide-react';

export default function OrganizerMetrics({
  totalRegistered = 0,
  totalCheckedIn = 0,
  checkInRate = 0,
  activeVolunteersCount = 0,
  totalVolunteersCount = 0,
  totalRevenue = '$18,900',
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {/* Stat 1: Total Registered */}
      <div className="p-5 rounded-2xl border border-border/80 bg-card/95 backdrop-blur-md shadow-sm hover:shadow-md transition-all group">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Total Registered</span>
          <div className="p-2.5 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
            <Users className="w-5 h-5" />
          </div>
        </div>
        <div className="flex items-baseline justify-between">
          <h3 className="text-2xl md:text-3xl font-display font-bold text-foreground tracking-tight">
            {totalRegistered.toLocaleString()}
          </h3>
          <span className="inline-flex items-center text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
            <TrendingUp className="w-3 h-3 mr-1" /> +14.2%
          </span>
        </div>
        <p className="text-xs text-muted-foreground mt-2 flex items-center justify-between">
          <span>Across all events</span>
          <span className="font-medium text-foreground">88.5% capacity</span>
        </p>
      </div>

      {/* Stat 2: Live Check-in Rate */}
      <div className="p-5 rounded-2xl border border-border/80 bg-card/95 backdrop-blur-md shadow-sm hover:shadow-md transition-all group">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Live Check-ins</span>
          <div className="p-2.5 rounded-xl bg-accent/20 text-accent-foreground group-hover:bg-accent transition-all duration-300">
            <Scan className="w-5 h-5" />
          </div>
        </div>
        <div className="flex items-baseline justify-between">
          <h3 className="text-2xl md:text-3xl font-display font-bold text-foreground tracking-tight">
            {totalCheckedIn.toLocaleString()}
          </h3>
          <span className="inline-flex items-center text-xs font-medium text-accent-foreground bg-accent/15 px-2 py-0.5 rounded-full border border-accent/30">
            {checkInRate}% Rate
          </span>
        </div>
        {/* Progress Bar */}
        <div className="w-full bg-muted rounded-full h-1.5 mt-3 overflow-hidden">
          <div className="bg-accent h-1.5 rounded-full transition-all duration-500" style={{ width: `${checkInRate}%` }} />
        </div>
      </div>

      {/* Stat 3: Active Volunteers */}
      <div className="p-5 rounded-2xl border border-border/80 bg-card/95 backdrop-blur-md shadow-sm hover:shadow-md transition-all group">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Active Volunteers</span>
          <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
            <UserCheck className="w-5 h-5" />
          </div>
        </div>
        <div className="flex items-baseline justify-between">
          <h3 className="text-2xl md:text-3xl font-display font-bold text-foreground tracking-tight">
            {activeVolunteersCount} / {totalVolunteersCount}
          </h3>
          <span className="inline-flex items-center text-xs font-medium text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-200">
            On Duty
          </span>
        </div>
        <p className="text-xs text-muted-foreground mt-2 flex items-center justify-between">
          <span>{totalVolunteersCount - activeVolunteersCount} on scheduled break</span>
          <span className="font-medium text-foreground">4 venue gates</span>
        </p>
      </div>

      {/* Stat 4: Revenue & Pass Sales */}
      <div className="p-5 rounded-2xl border border-border/80 bg-card/95 backdrop-blur-md shadow-sm hover:shadow-md transition-all group">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Total Revenue / Passes</span>
          <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300">
            <Ticket className="w-5 h-5" />
          </div>
        </div>
        <div className="flex items-baseline justify-between">
          <h3 className="text-2xl md:text-3xl font-display font-bold text-foreground tracking-tight">
            {totalRevenue}
          </h3>
          <span className="inline-flex items-center text-xs font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
            3 Paid Events
          </span>
        </div>
        <p className="text-xs text-muted-foreground mt-2 flex items-center justify-between">
          <span>2 Free Symposia</span>
          <span className="font-medium text-foreground">100% Collected</span>
        </p>
      </div>
    </div>
  );
}
