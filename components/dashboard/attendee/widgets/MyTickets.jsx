import React from 'react';
import WidgetCard from '../../volunteer/widgets/WidgetCard';
import { Ticket as TicketIcon, MapPin, CheckCircle2 } from 'lucide-react';
import clsx from 'clsx';

export default function MyTickets() {
  return (
    <WidgetCard 
      title="My Tickets" 
      action={<button className="text-xs bg-vol-border/50 hover:bg-vol-border text-gray-300 px-3 py-1 rounded-full transition-colors border border-vol-border">View All</button>}
    >
      <div className="flex-1 p-5 flex flex-col justify-center">
        
        {/* Ticket Container */}
        <div className="relative bg-gradient-to-r from-vol-accent/20 to-vol-accent/5 border border-vol-accent/30 rounded-xl p-4 overflow-hidden group hover:border-vol-accent/50 transition-colors">
          {/* Ticket perforations */}
          <div className="absolute top-1/2 -translate-y-1/2 -left-2 w-4 h-4 rounded-full bg-vol-card border-r border-vol-accent/30"></div>
          <div className="absolute top-1/2 -translate-y-1/2 -right-2 w-4 h-4 rounded-full bg-vol-card border-l border-vol-accent/30"></div>
          
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-vol-accent/20 flex items-center justify-center text-vol-accent2 shrink-0">
                <TicketIcon size={20} />
              </div>
              <h3 className="font-bold text-white text-lg">Spring Gala 2024</h3>
            </div>
            <span className="px-2 py-1 rounded text-[10px] font-medium bg-vol-success/10 text-vol-success border border-vol-success/20 flex items-center gap-1">
              <CheckCircle2 size={12} />
              Confirmed
            </span>
          </div>

          <div className="flex justify-between items-end border-t border-dashed border-vol-accent/30 pt-4">
            <div className="flex flex-col gap-2">
              <p className="text-xs text-gray-300 font-medium">May 24, 2024 • 9:00 AM</p>
              <div className="flex items-center gap-1.5 text-[11px] text-gray-400">
                <MapPin size={12} className="shrink-0" />
                <span>Main Auditorium</span>
              </div>
              <p className="text-[10px] text-gray-500 mt-1 font-mono">Ticket ID: #EVF1245</p>
            </div>
            
            <div className="w-16 h-16 bg-white p-1 rounded">
              {/* QR Code Placeholder */}
              <div className="w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZD0iTTEgMWg2djZIMXpNMTEgMWh2MmgyVjF6TTE1IDFoMnYySDF6TTE5IDF2Mmg0VjF6TTEzIDNoMnYyaDFWM2gxdjJoMnYyaDF2M2gydjJoMXYyaC0ydjFoLTRWM2gyem0xIDZoMXYyaC0xem0yIDBoMnYxSDE2em0zIDB2MWgyVjV6TTcgNWgxdjJIN3pNOSA1aDF2MUg5ek0xIDloNnY2SDF6TTE5IDloNXYyaC01em0zIDRoMnYxSDE5em0tMTAgMWgxVjhoMXY0aDFWMThoM3YtMmgxdjFoMnYxSDE1djJoLTV2Mkg5em0yIDBWM2gxVjFIMTV2NmgxdjVIMTF6TTcgMTBoMXYySDd6TTEgMTdoNnY2SDF6TTE1IDE3aDN2MmgtM3pNOTg0IDExaDF2Mkg5ek03IDIxaDF2Mkg3ek0xOSAyMXYyaDRWMjF6TTMgM2gydjJIM3pNMCAwdjhoOFYwek0zIDExaDJWMThIM3pNMCAxNnY4aDhWMTZ6TTExIDEyaDF2MkgxMXpNMTYgMTloM3YySDE2em0xIDFWMTRoMXY3SDE1djFoMnYxdjFoM3YtMmgtM3ptMCAydjFIMTV2MXpNMyAxOWgydjJIM3pNMCAwIiBmaWxsPSIjMDAwIi8+PC9zdmc+')] bg-cover opacity-80" style={{ imageRendering: 'pixelated' }}></div>
            </div>
          </div>
        </div>

      </div>
      
      <div className="p-4 pt-0">
        <button className="w-full py-2.5 rounded-lg bg-vol-accent/10 hover:bg-vol-accent/20 text-vol-accent2 font-medium text-sm transition-colors border border-vol-accent/20">
          View All Tickets
        </button>
      </div>
    </WidgetCard>
  );
}
