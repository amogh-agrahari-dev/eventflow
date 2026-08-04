import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui';
import { Sparkles, Scan, Megaphone, PlusCircle, Layers, ShieldCheck } from 'lucide-react';

export default function OrganizerHeader({
  events = [],
  selectedEventId = 'all',
  onSelectEvent,
  onOpenCheckInModal,
  onOpenBroadcastModal,
}) {
  const liveEventsCount = events.filter(e => e.status === 'Live Now').length;

  return (
    <section className="relative overflow-hidden bg-gradient-brand pt-24 pb-14 border-b border-border/40 text-primary-foreground">
      {/* Decorative Glow Blobs & Faint Grid */}
      <div className="absolute inset-0 bg-grid-faint opacity-30" aria-hidden="true" />
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-accent/20 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute top-1/2 -right-24 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          
          {/* Left Column: Heading & Subtitle */}
          <div className="max-w-2xl space-y-4">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="px-3.5 py-1 text-xs font-semibold rounded-full bg-accent/20 text-accent border border-accent/40 backdrop-blur-md inline-flex items-center gap-1.5 shadow-sm hover:scale-105 transition-transform cursor-default">
                <Sparkles className="w-3.5 h-3.5 animate-spin-slow text-accent" /> Organizer Command Center
              </span>

              <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 backdrop-blur-md shadow-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> {liveEventsCount} Active Live Events
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-tight leading-[1.15] text-primary-foreground">
              Manage Campus Events with <span className="text-gradient-brand">Real-time Precision</span>
            </h1>

            <p className="text-base sm:text-lg text-primary-foreground/80 leading-relaxed font-normal">
              Centralized dashboard for event scheduling, live QR gate scanning, volunteer task allocation, and real-time attendance analytics.
            </p>
          </div>

          {/* Right Column: Event Selector & Quick Action CTAs */}
          <div className="flex flex-col sm:flex-row lg:flex-col items-stretch lg:items-end gap-3.5 bg-white/5 backdrop-blur-xl p-5 rounded-3xl border border-white/10 shadow-2xl">
            {/* Event Dropdown Selector */}
            <div className="w-full sm:w-auto">
              <label className="text-[11px] font-semibold text-primary-foreground/70 uppercase tracking-wider block mb-1.5 pl-1">
                Filter Event Scope
              </label>
              <select
                value={selectedEventId}
                onChange={(e) => onSelectEvent(e.target.value)}
                className="w-full bg-slate-900/80 hover:bg-slate-900 text-primary-foreground border border-white/20 rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-accent backdrop-blur-md cursor-pointer transition-all shadow-inner"
              >
                <option value="all">All Managed Events ({events.length})</option>
                {events.map(evt => (
                  <option key={evt.id} value={evt.id}>
                    {evt.title} ({evt.status})
                  </option>
                ))}
              </select>
            </div>

            {/* Quick Action Button Group */}
            <div className="flex flex-wrap items-center gap-2.5 pt-1">
              <Button
                onClick={onOpenCheckInModal}
                variant="outline"
                className="flex-1 sm:flex-none rounded-xl border-white/20 bg-white/10 text-primary-foreground hover:bg-white/20 hover:border-accent/40 text-xs sm:text-sm gap-2 backdrop-blur-md"
              >
                <Scan className="w-4 h-4 text-accent" /> Scan QR
              </Button>

              <Button
                onClick={onOpenBroadcastModal}
                variant="outline"
                className="flex-1 sm:flex-none rounded-xl border-white/20 bg-white/10 text-primary-foreground hover:bg-white/20 hover:border-accent/40 text-xs sm:text-sm gap-2 backdrop-blur-md"
              >
                <Megaphone className="w-4 h-4 text-accent" /> Broadcast
              </Button>

              <Link href="/events/add" className="w-full sm:w-auto">
                <Button variant="hero" className="w-full rounded-xl gap-2 text-xs sm:text-sm">
                  <PlusCircle className="w-4 h-4" /> Create Event
                </Button>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
