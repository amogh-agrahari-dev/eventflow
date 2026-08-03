import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui';
import { Ticket, Sparkles, Calendar, QrCode } from 'lucide-react';

export default function InviteeHeader({
  inviteeProfile = null,
  activePassesCount = 0,
  onOpenMyPasses,
}) {
  return (
    <section className="relative overflow-hidden bg-gradient-brand pt-24 pb-12 border-b border-border/40 text-primary-foreground">
      <div className="absolute inset-0 bg-grid-faint opacity-40" aria-hidden="true" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 text-xs font-semibold rounded-full bg-accent/20 text-accent border border-accent/30 backdrop-blur-md inline-flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> Campus Invitee Portal
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 text-xs rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> {activePassesCount} Active Passes
              </span>
            </div>

            <h1 className="text-3xl md:text-5xl font-display font-bold tracking-tight text-primary-foreground">
              {inviteeProfile?.name ? `Welcome, ${inviteeProfile.name}` : 'Invitee Dashboard'}
            </h1>
            <p className="text-sm md:text-base text-primary-foreground/75 mt-1 max-w-2xl">
              Access your digital QR event passes, explore registered campus activities, view venue schedules, and manage RSVPs.
            </p>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap items-center gap-3">
            <Button
              onClick={onOpenMyPasses}
              variant="outline"
              className="rounded-xl border-primary-foreground/20 bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/20 text-sm gap-2 backdrop-blur-md"
            >
              <QrCode className="w-4 h-4 text-accent" /> View Digital QR Passes
            </Button>

            <Link href="/#features">
              <Button variant="hero" className="rounded-xl shadow-elevated gap-2">
                <Calendar className="w-4 h-4" /> Discover Events
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
