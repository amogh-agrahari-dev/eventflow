import React from 'react';
import { Button } from '@/components/ui';
import { QrCode, CalendarDays, MapPin, Ticket, Download, Share2 } from 'lucide-react';

export default function DigitalPassesList({
  passes = [],
  onSelectPassModal,
}) {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-display font-bold">My Digital Entry Passes</h3>
          <p className="text-xs text-muted-foreground">Present these QR passes at the venue gate for instant check-in verification.</p>
        </div>
        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-accent/15 text-accent-foreground border border-accent/30">
          {passes.length} Passes Issued
        </span>
      </div>

      {passes.length === 0 ? (
        <div className="text-center py-16 p-6 rounded-3xl border border-dashed border-border/80 bg-card/60">
          <Ticket className="w-10 h-10 mx-auto mb-3 text-muted-foreground/60" />
          <h4 className="text-base font-display font-semibold text-foreground">No Active Passes Found</h4>
          <p className="text-xs text-muted-foreground mt-1 max-w-sm mx-auto">
            You haven't registered for any upcoming events yet. Browse events to secure your digital pass.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {passes.map((pass) => (
            <div
              key={pass.id}
              className="p-6 rounded-3xl border border-border/80 bg-card shadow-sm hover:shadow-xl hover:border-accent/40 transition-all duration-300 flex flex-col justify-between relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-accent/5 rounded-bl-full pointer-events-none" />

              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                    {pass.ticketCode || 'TK-00000'}
                  </span>
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
                    {pass.tier || 'Confirmed'}
                  </span>
                </div>

                <h4 className="text-lg font-display font-bold text-foreground mb-2 line-clamp-1">
                  {pass.eventTitle || 'Event Title'}
                </h4>

                <div className="space-y-1.5 text-xs text-muted-foreground mb-4">
                  <div className="flex items-center gap-2">
                    <CalendarDays className="w-3.5 h-3.5 text-primary shrink-0" />
                    <span>{pass.date || 'Event Date'} • {pass.time || 'Schedule'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
                    <span className="truncate">{pass.location || 'Venue Location'}</span>
                  </div>
                </div>
              </div>

              {/* QR Preview Trigger & Download Actions */}
              <div className="pt-4 border-t border-border/60 flex items-center gap-2">
                <Button
                  onClick={() => onSelectPassModal(pass)}
                  variant="hero"
                  className="flex-1 h-9 text-xs rounded-xl gap-1.5"
                >
                  <QrCode className="w-4 h-4" /> View QR Code
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
