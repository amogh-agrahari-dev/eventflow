import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui';
import { Sparkles, Scan, Megaphone, PlusCircle } from 'lucide-react';

export default function OrganizerHeader({
  events = [],
  selectedEventId = 'all',
  onSelectEvent,
  onOpenCheckInModal,
  onOpenBroadcastModal,
}) {
  const liveEventsCount = events.filter(e => e.status === 'Live Now').length;

  return (
    <section className="relative overflow-hidden bg-gradient-brand pt-24 pb-12 border-b border-border/40 text-primary-foreground">
      <div className="absolute inset-0 bg-grid-faint opacity-40" aria-hidden="true" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 text-xs font-semibold rounded-full bg-accent/20 text-accent border border-accent/30 backdrop-blur-md inline-flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> Event Organizer Command Center
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 text-xs rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> {liveEventsCount} Live Events Active
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-display font-bold tracking-tight text-primary-foreground">
              Organizer Dashboard
            </h1>
            <p className="text-sm md:text-base text-primary-foreground/75 mt-1 max-w-2xl">
              Real-time management for college events, live QR check-ins, volunteer tasking, and attendee analytics.
            </p>
          </div>

          {/* Quick Actions & Event Selector */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Event Filter Selector Dropdown */}
            <div className="relative">
              <select
                value={selectedEventId}
                onChange={(e) => onSelectEvent(e.target.value)}
                className="bg-background/20 hover:bg-background/30 text-primary-foreground border border-primary-foreground/20 rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-accent backdrop-blur-md cursor-pointer transition-all"
              >
                <option value="all" className="bg-slate-900 text-white">All Events ({events.length} Managed)</option>
                {events.map(evt => (
                  <option key={evt.id} value={evt.id} className="bg-slate-900 text-white">
                    {evt.title} ({evt.status})
                  </option>
                ))}
              </select>
            </div>

            {/* Action Buttons */}
            <Button
              onClick={onOpenCheckInModal}
              variant="outline"
              className="rounded-xl border-primary-foreground/20 bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/20 text-sm gap-2 backdrop-blur-md"
            >
              <Scan className="w-4 h-4 text-accent" /> Scan / Check-In
            </Button>

            <Button
              onClick={onOpenBroadcastModal}
              variant="outline"
              className="rounded-xl border-primary-foreground/20 bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/20 text-sm gap-2 backdrop-blur-md"
            >
              <Megaphone className="w-4 h-4 text-accent" /> Broadcast Alert
            </Button>

            <Link href="/events/add">
              <Button variant="hero" className="rounded-xl shadow-elevated gap-2">
                <PlusCircle className="w-4 h-4" /> Create Event
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
