import React from 'react';
import { Button, Input, Label } from '@/components/ui';
import { Camera, Scan, Check, CheckCircle2, QrCode } from 'lucide-react';

export default function QRCheckInDesk({
  isScanning,
  onToggleScanning,
  manualTicket,
  onManualTicketChange,
  onManualCheckIn,
  scanHistory = [],
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-fade-in">
      {/* Scanner Area / Camera Viewfinder Template */}
      <div className="lg:col-span-7 p-6 rounded-3xl border border-border/80 bg-card shadow-sm flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-display font-bold flex items-center gap-2">
              <Camera className="w-5 h-5 text-accent" /> QR Ticket Scanner Station
            </h3>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 font-medium">
              Ready to Scan
            </span>
          </div>

          {/* Viewfinder Box */}
          <div className="relative aspect-video rounded-2xl bg-slate-950 border-2 border-dashed border-border/60 flex flex-col items-center justify-center text-center p-6 overflow-hidden">
            <div className="absolute inset-0 bg-grid-faint opacity-20" />

            {isScanning ? (
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-32 h-32 rounded-2xl border-2 border-accent animate-pulse flex items-center justify-center mb-3">
                  <Scan className="w-12 h-12 text-accent" />
                </div>
                <p className="text-xs text-white/80 animate-pulse">Position attendee QR code within the frame...</p>
              </div>
            ) : (
              <div className="relative z-10 flex flex-col items-center">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 mb-3">
                  <Camera className="w-8 h-8 text-white/60" />
                </div>
                <h4 className="text-sm font-semibold text-white mb-1">Camera Viewfinder Standby</h4>
                <p className="text-xs text-white/60 max-w-xs mb-4">
                  Activate your camera scanner or use the manual ticket input box below.
                </p>
                <Button
                  onClick={onToggleScanning}
                  variant="hero"
                  className="rounded-xl text-xs gap-2"
                >
                  <Camera className="w-4 h-4" /> Toggle Camera Feed
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Manual Ticket Input Form */}
        <form onSubmit={onManualCheckIn} className="mt-6 pt-4 border-t border-border/60">
          <Label htmlFor="vol-ticket-input" className="text-xs font-semibold mb-1.5 block">
            Manual Code Search / Check-in
          </Label>
          <div className="flex gap-2">
            <Input
              id="vol-ticket-input"
              type="text"
              placeholder="Enter Ticket ID (e.g. TK-84920)"
              value={manualTicket}
              onChange={(e) => onManualTicketChange(e.target.value)}
              className="font-mono text-sm uppercase"
            />
            <Button type="submit" variant="default" className="rounded-xl text-xs gap-2 shrink-0">
              <Check className="w-4 h-4" /> Verify
            </Button>
          </div>
        </form>
      </div>

      {/* Scan History Feed */}
      <div className="lg:col-span-5 p-6 rounded-3xl border border-border/80 bg-card shadow-sm flex flex-col">
        <h3 className="text-base font-display font-bold mb-1 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Recent Station Scans
        </h3>
        <p className="text-xs text-muted-foreground mb-4">History of attendee badges processed at this station.</p>

        <div className="flex-1 space-y-3 overflow-y-auto max-h-[380px] pr-1">
          {scanHistory.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground border border-dashed border-border/60 rounded-2xl">
              <QrCode className="w-8 h-8 mx-auto mb-2 opacity-40" />
              <p className="text-xs">No scans processed yet for this shift.</p>
            </div>
          ) : (
            scanHistory.map((scan) => (
              <div
                key={scan.id}
                className="p-3.5 rounded-xl border border-border/60 bg-muted/30 flex items-center justify-between"
              >
                <div>
                  <span className="font-semibold text-xs text-foreground block">{scan.name}</span>
                  <span className="text-[11px] text-muted-foreground font-mono">{scan.ticketId}</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 block mb-0.5">
                    {scan.status}
                  </span>
                  <span className="text-[10px] text-muted-foreground">{scan.time}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
