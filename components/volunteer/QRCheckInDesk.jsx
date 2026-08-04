import React from 'react';
import { Input, Label } from '@/components/ui';
import { Camera, Scan, Check, CheckCircle2, QrCode, Wifi } from 'lucide-react';

export default function QRCheckInDesk({
  isScanning,
  onToggleScanning,
  manualTicket,
  onManualTicketChange,
  onManualCheckIn,
  scanHistory = [],
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 animate-fade-in">

      {/* ── Scanner Panel ── */}
      <div className="lg:col-span-7 rounded-3xl overflow-hidden shadow-xl flex flex-col border border-slate-700/60" style={{ background: 'linear-gradient(145deg, hsl(222 47% 14%) 0%, hsl(230 40% 11%) 100%)' }}>
        {/* Panel header */}
        <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
          <h3 className="text-sm font-display font-bold text-white flex items-center gap-2">
            <Camera className="w-4 h-4 text-cyan-400" />
            QR Ticket Scanner Station
          </h3>
          <span className={`inline-flex items-center gap-1.5 text-xs px-3 py-1 rounded-full font-bold border ${
            isScanning
              ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30 animate-pulse'
              : 'bg-white/10 text-white/60 border-white/10'
          }`}>
            <Wifi className="w-3 h-3" />
            {isScanning ? 'Scanning Active' : 'Standby'}
          </span>
        </div>

        {/* Viewfinder */}
        <div className="p-6 flex-1">
          <div className="relative aspect-video rounded-2xl overflow-hidden flex flex-col items-center justify-center text-center"
            style={{ background: 'linear-gradient(135deg, hsl(222 47% 8%) 0%, hsl(230 50% 7%) 100%)' }}>
            <div className="absolute inset-0 bg-grid-faint opacity-30" aria-hidden="true" />

            {/* Corner guides */}
            {['top-3 left-3 border-t-2 border-l-2 rounded-tl-xl', 'top-3 right-3 border-t-2 border-r-2 rounded-tr-xl', 'bottom-3 left-3 border-b-2 border-l-2 rounded-bl-xl', 'bottom-3 right-3 border-b-2 border-r-2 rounded-br-xl'].map((cls, i) => (
              <div key={i} className={`absolute w-7 h-7 border-cyan-400/70 ${cls}`} />
            ))}

            {isScanning ? (
              <div className="relative z-10 flex flex-col items-center gap-3">
                <div className="relative w-32 h-32 rounded-2xl border-2 border-cyan-400 shadow-[0_0_40px_rgba(34,211,238,0.35)] flex items-center justify-center">
                  <div className="absolute inset-0 rounded-2xl bg-cyan-400/5 animate-pulse" />
                  <Scan className="w-12 h-12 text-cyan-400" />
                </div>
                <p className="text-xs text-white/60 animate-pulse">Position the QR code within the frame...</p>
                <button onClick={onToggleScanning} className="px-4 py-1.5 text-xs font-bold rounded-xl bg-red-500/20 text-red-300 border border-red-500/30 hover:bg-red-500/30 transition-all cursor-pointer">
                  Stop Scanner
                </button>
              </div>
            ) : (
              <div className="relative z-10 flex flex-col items-center gap-3">
                <div className="p-5 rounded-2xl bg-white/5 border border-white/10 mb-1">
                  <Camera className="w-10 h-10 text-white/30" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white mb-1">Camera Standby</h4>
                  <p className="text-xs text-white/40 max-w-xs leading-relaxed">Activate to scan QR passes, or use manual entry below.</p>
                </div>
                <button
                  onClick={onToggleScanning}
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 text-slate-950 shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 cursor-pointer"
                >
                  <Camera className="w-4 h-4" />
                  Activate Camera
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Manual input */}
        <form onSubmit={onManualCheckIn} className="px-6 pb-6">
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
            <Label htmlFor="vol-ticket-input" className="text-xs font-bold mb-2 block text-white/70">
              Manual Ticket Search & Check-in
            </Label>
            <div className="flex gap-2">
              <input
                id="vol-ticket-input"
                type="text"
                placeholder="Enter Ticket ID (e.g. TK-84920)"
                value={manualTicket}
                onChange={(e) => onManualTicketChange(e.target.value)}
                className="flex-1 h-10 px-3 rounded-xl bg-white/10 border border-white/20 text-white text-sm font-mono uppercase placeholder:text-white/30 focus:outline-none focus:border-cyan-400/60 focus:bg-white/15 transition-all"
              />
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 px-4 h-10 text-xs font-bold rounded-xl bg-cyan-500 text-slate-950 hover:bg-cyan-400 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shrink-0 cursor-pointer"
              >
                <Check className="w-4 h-4" />
                Verify
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* ── Scan History Feed ── */}
      <div className="lg:col-span-5 rounded-3xl overflow-hidden shadow-xl flex flex-col border border-slate-700/50"
        style={{ background: 'linear-gradient(145deg, hsl(222 47% 13%) 0%, hsl(225 44% 12%) 100%)' }}>
        <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-display font-bold text-white flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Recent Station Scans
            </h3>
            <p className="text-[11px] text-white/40 mt-0.5">Verified attendees this shift</p>
          </div>
          {scanHistory.length > 0 && (
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              {scanHistory.length}
            </span>
          )}
        </div>

        <div className="flex-1 overflow-y-auto max-h-[420px] p-4 space-y-2.5 no-scrollbar">
          {scanHistory.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full min-h-[200px] text-white/40">
              <div className="p-4 rounded-2xl bg-white/5 border border-dashed border-white/10 mb-3">
                <QrCode className="w-8 h-8 opacity-40" />
              </div>
              <p className="text-xs font-medium">No scans yet</p>
              <p className="text-[11px] text-white/30 mt-0.5">Scan history appears here</p>
            </div>
          ) : (
            scanHistory.map((scan) => (
              <div
                key={scan.id}
                className="p-3.5 rounded-2xl border border-emerald-500/20 bg-emerald-500/8 hover:bg-emerald-500/15 hover:border-emerald-500/35 flex items-center justify-between transition-all duration-200"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-emerald-500/20 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white block">{scan.name}</span>
                    <span className="text-[10px] text-white/50 font-mono">{scan.ticketId}</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/25 block mb-0.5">
                    {scan.status}
                  </span>
                  <span className="text-[10px] text-white/40">{scan.time}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
