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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
      {/* Stat 1: Total Registered */}
      <div className="p-6 rounded-2xl border border-border/80 bg-card/95 backdrop-blur-md shadow-sm hover:shadow-2xl hover:border-accent/40 hover:-translate-y-1.5 transition-all duration-300 ease-out group relative overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform duration-500" />
        
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Total Registered</span>
          <div className="p-3 rounded-2xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-110 transition-all duration-300 shadow-sm">
            <Users className="w-5 h-5" />
          </div>
        </div>

        <div className="flex items-baseline justify-between mt-2">
          <h3 className="text-3xl font-display font-extrabold text-foreground tracking-tight">
            {totalRegistered.toLocaleString()}
          </h3>
          <span className="inline-flex items-center text-xs font-bold text-emerald-600 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20 shadow-xs">
            <TrendingUp className="w-3.5 h-3.5 mr-1" /> +14.2%
          </span>
        </div>

        <p className="text-xs text-muted-foreground mt-3 flex items-center justify-between font-medium">
          <span>Across all events</span>
          <span className="text-foreground font-semibold">88.5% capacity</span>
        </p>
      </div>

      {/* Stat 2: Live Check-in Rate */}
      <div className="p-6 rounded-2xl border border-border/80 bg-card/95 backdrop-blur-md shadow-sm hover:shadow-2xl hover:border-accent/40 hover:-translate-y-1.5 transition-all duration-300 ease-out group relative overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 bg-accent/10 rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform duration-500" />

        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Live Check-ins</span>
          <div className="p-3 rounded-2xl bg-accent/20 text-accent-foreground group-hover:bg-accent group-hover:scale-110 transition-all duration-300 shadow-sm">
            <Scan className="w-5 h-5" />
          </div>
        </div>

        <div className="flex items-baseline justify-between mt-2">
          <h3 className="text-3xl font-display font-extrabold text-foreground tracking-tight">
            {totalCheckedIn.toLocaleString()}
          </h3>
          <span className="inline-flex items-center text-xs font-bold text-accent-foreground bg-accent/20 px-2.5 py-1 rounded-full border border-accent/40 shadow-xs">
            {checkInRate}% Rate
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-muted rounded-full h-2 mt-4 overflow-hidden shadow-inner">
          <div
            className="bg-gradient-to-r from-accent to-cyan-400 h-2 rounded-full transition-all duration-700 ease-out"
            style={{ width: `${checkInRate}%` }}
          />
        </div>
      </div>

      {/* Stat 3: Active Volunteers */}
      <div className="p-6 rounded-2xl border border-border/80 bg-card/95 backdrop-blur-md shadow-sm hover:shadow-2xl hover:border-indigo-500/40 hover:-translate-y-1.5 transition-all duration-300 ease-out group relative overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/10 rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform duration-500" />

        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Active Volunteers</span>
          <div className="p-3 rounded-2xl bg-indigo-500/10 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white group-hover:scale-110 transition-all duration-300 shadow-sm">
            <UserCheck className="w-5 h-5" />
          </div>
        </div>

        <div className="flex items-baseline justify-between mt-2">
          <h3 className="text-3xl font-display font-extrabold text-foreground tracking-tight">
            {activeVolunteersCount} / {totalVolunteersCount}
          </h3>
          <span className="inline-flex items-center text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-full border border-indigo-200 shadow-xs">
            On Duty
          </span>
        </div>

        <p className="text-xs text-muted-foreground mt-3 flex items-center justify-between font-medium">
          <span>{totalVolunteersCount - activeVolunteersCount} on break</span>
          <span className="text-foreground font-semibold">4 gates live</span>
        </p>
      </div>

      {/* Stat 4: Revenue & Pass Sales */}
      <div className="p-6 rounded-2xl border border-border/80 bg-card/95 backdrop-blur-md shadow-sm hover:shadow-2xl hover:border-emerald-500/40 hover:-translate-y-1.5 transition-all duration-300 ease-out group relative overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform duration-500" />

        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Total Revenue / Passes</span>
          <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white group-hover:scale-110 transition-all duration-300 shadow-sm">
            <Ticket className="w-5 h-5" />
          </div>
        </div>

        <div className="flex items-baseline justify-between mt-2">
          <h3 className="text-3xl font-display font-extrabold text-foreground tracking-tight">
            {totalRevenue}
          </h3>
          <span className="inline-flex items-center text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 shadow-xs">
            3 Paid Events
          </span>
        </div>

        <p className="text-xs text-muted-foreground mt-3 flex items-center justify-between font-medium">
          <span>2 Free Symposia</span>
          <span className="text-foreground font-semibold">100% Verified</span>
        </p>
      </div>
    </div>
  );
}
