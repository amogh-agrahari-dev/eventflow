import React from 'react';
import { Button, Input, Label } from '@/components/ui';
import { Radio, RefreshCw, Scan, Activity, CheckCircle2, QrCode, Check } from 'lucide-react';

export default function LiveCheckInMonitor({
  selectedEventTitle = 'All Live Events',
  scans = [],
  onSimulateScan,
  onOpenManualModal,
  manualTicketInput,
  onManualTicketChange,
  manualNameInput,
  onManualNameChange,
  onManualCheckInSubmit,
}) {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Live Check-in Header & Simulator Trigger */}
      <div className="relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6 p-6 sm:p-8 rounded-3xl bg-gradient-brand text-primary-foreground shadow-2xl border border-white/10">
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-1.5">
            <Radio className="w-4 h-4 text-accent animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider text-accent">Live Gate Monitoring</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-primary-foreground tracking-tight">
            Real-time QR Scanner Feed
          </h2>
          <p className="text-xs sm:text-sm text-primary-foreground/80 mt-1 max-w-xl">
            Monitoring live venue gate entrances for <strong className="text-accent">{selectedEventTitle}</strong>.
          </p>
        </div>

        <div className="relative z-10 flex flex-wrap items-center gap-3">
          <Button
            onClick={onSimulateScan}
            variant="hero"
            className="rounded-xl text-xs sm:text-sm gap-2 shadow-lg shadow-accent/25"
          >
            <RefreshCw className="w-4 h-4" /> Simulate QR Scan
          </Button>
          <Button
            onClick={onOpenManualModal}
            variant="outline"
            className="rounded-xl text-xs sm:text-sm gap-2 border-white/20 bg-white/10 text-primary-foreground hover:bg-white/20"
          >
            <Scan className="w-4 h-4 text-accent" /> Manual Lookup
          </Button>
        </div>
      </div>

      {/* Live Stream & Rapid Lookup Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Scanned Feed List */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-display font-bold flex items-center gap-2">
              <Activity className="w-5 h-5 text-accent animate-pulse" /> Recent Gate Activity Stream
            </h3>
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-accent/10 text-accent-foreground border border-accent/20">
              {scans.length} Scans Verified
            </span>
          </div>

          <div className="space-y-3">
            {scans.map((scan) => (
              <div
                key={scan.id}
                className="p-4 rounded-2xl border border-border/80 bg-card hover:border-accent/40 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-between shadow-sm animate-fade-in group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-2xl bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 flex items-center justify-center font-bold font-display text-base shadow-xs group-hover:scale-110 transition-transform">
                    {scan.name.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-foreground text-sm group-hover:text-accent transition-colors">{scan.name}</h4>
                      <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                        {scan.tier}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground flex items-center gap-2 mt-0.5">
                      <span>Code: <strong className="text-foreground font-mono">{scan.ticketId}</strong></span>
                      <span>•</span>
                      <span>{scan.event}</span>
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full mb-1 shadow-xs">
                    <CheckCircle2 className="w-3.5 h-3.5" /> {scan.status}
                  </span>
                  <p className="text-[11px] text-muted-foreground font-medium">{scan.gate} @ {scan.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Side Card: Quick Manual Scan Station */}
        <div className="lg:col-span-4 p-6 sm:p-7 rounded-3xl border border-border/80 bg-card/95 backdrop-blur-md shadow-md h-fit hover:shadow-xl transition-shadow">
          <h3 className="text-lg font-display font-bold mb-1 flex items-center gap-2">
            <QrCode className="w-5 h-5 text-primary" /> On-Site Desk Check-In
          </h3>
          <p className="text-xs text-muted-foreground mb-5 leading-relaxed">
            Quickly process attendee check-in if QR scanner camera is unavailable.
          </p>

          <form onSubmit={onManualCheckInSubmit} className="space-y-4">
            <div>
              <Label htmlFor="quick-ticket" className="text-xs font-semibold mb-1.5 block">Ticket ID / Booking Ref</Label>
              <Input
                id="quick-ticket"
                type="text"
                placeholder="e.g. TK-84920"
                value={manualTicketInput}
                onChange={(e) => onManualTicketChange(e.target.value)}
                className="font-mono text-sm uppercase rounded-xl"
              />
            </div>

            <div>
              <Label htmlFor="quick-name" className="text-xs font-semibold mb-1.5 block">Attendee Full Name (Optional)</Label>
              <Input
                id="quick-name"
                type="text"
                placeholder="e.g. Rohan Verma"
                value={manualNameInput}
                onChange={(e) => onManualNameChange(e.target.value)}
                className="text-sm rounded-xl"
              />
            </div>

            <Button type="submit" variant="default" className="w-full rounded-xl text-xs gap-2 h-11">
              <Check className="w-4 h-4" /> Validate & Pass Attendee
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
