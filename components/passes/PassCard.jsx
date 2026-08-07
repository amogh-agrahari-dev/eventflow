import React from 'react';
import { motion } from 'framer-motion';
import QRCode from 'react-qr-code';
import { 
  Ticket as TicketIcon, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  QrCode as QrCodeIcon,
  Sparkles,
  ArrowUpRight
} from 'lucide-react';
import clsx from 'clsx';
import { formatDateOnly, formatFullDateTime } from './PassDetailsModal';

const COLOR_VARIANTS = [
  { gradient: 'from-indigo-600 via-purple-600 to-fuchsia-600', glow: 'rgba(139, 92, 246, 0.35)', accent: '#8B5CF6' },
  { gradient: 'from-cyan-500 via-blue-600 to-indigo-600', glow: 'rgba(6, 182, 212, 0.35)', accent: '#06B6D4' },
  { gradient: 'from-emerald-500 via-teal-600 to-cyan-600', glow: 'rgba(16, 185, 129, 0.35)', accent: '#10B981' },
  { gradient: 'from-amber-500 via-orange-600 to-rose-600', glow: 'rgba(245, 158, 11, 0.35)', accent: '#F59E0B' },
  { gradient: 'from-pink-500 via-rose-600 to-red-600', glow: 'rgba(244, 63, 94, 0.35)', accent: '#F43F5E' },
  { gradient: 'from-violet-600 via-purple-600 to-pink-500', glow: 'rgba(168, 85, 247, 0.35)', accent: '#A855F7' },
];

export default function PassCard({ pass, onClick, index = 0, className = '' }) {
  if (!pass) return null;

  const event = pass.event || {};
  const eventTitle = event.title || pass.event_title || 'Event Pass';
  const category = event.category || 'Event';
  const location = event.location || pass.location || 'PICT Campus Venue';
  const passUid = pass.pass_uid || 'N/A';
  const status = pass.status || 'generated';

  const dateFormatted = event.start_time ? formatDateOnly(event.start_time) : formatDateOnly(pass.created_at);
  const timeFormatted = event.start_time ? formatFullDateTime(event.start_time) : 'Time TBD';

  const variant = COLOR_VARIANTS[index % COLOR_VARIANTS.length];
  const statusStr = (status || 'generated').toLowerCase();
  const isActive = statusStr === 'active';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: index * 0.08 }}
      whileHover={{ y: -5, transition: { duration: 0.25 } }}
      onClick={() => onClick && onClick(pass)}
      className={clsx(
        "group relative rounded-2xl overflow-hidden border border-slate-800/80 hover:border-indigo-500/50 bg-slate-900/90 backdrop-blur-md cursor-pointer transition-all duration-300 shadow-lg select-none",
        className
      )}
      style={{
        boxShadow: `0 15px 35px -15px ${variant.glow}`,
      }}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick && onClick(pass);
        }
      }}
    >
      {/* Top Gradient Stripe */}
      <div className={clsx("h-2 w-full bg-gradient-to-r", variant.gradient)} />

      {/* Shimmer on Hover */}
      <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
      </div>

      <div className="p-5 flex flex-col justify-between h-full">
        {/* Top Header Row */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <div 
              className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border border-white/10"
              style={{ backgroundColor: `${variant.accent}20` }}
            >
              <TicketIcon size={18} style={{ color: variant.accent }} />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-300 block">
                {category}
              </span>
              <h3 className="font-bold text-white text-sm sm:text-base group-hover:text-cyan-300 transition-colors truncate" title={eventTitle}>
                {eventTitle}
              </h3>
            </div>
          </div>

          <span className={clsx(
            "px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border shrink-0 flex items-center gap-1.5",
            isActive 
              ? "bg-emerald-500/15 text-emerald-300 border-emerald-500/30"
              : "bg-amber-500/15 text-amber-300 border-amber-500/30"
          )}>
            <span className={clsx(
              "w-1.5 h-1.5 rounded-full",
              isActive ? "bg-emerald-400 animate-pulse" : "bg-amber-400"
            )} />
            {status}
          </span>
        </div>

        {/* Ticket Perforation / Divider */}
        <div className="relative my-3">
          <div className="absolute -left-7 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-slate-950 border-r border-slate-800" />
          <div className="absolute -right-7 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-slate-950 border-l border-slate-800" />
          <div className="border-t border-dashed border-slate-800/80 mx-1" />
        </div>

        {/* Info & QR Preview Row */}
        <div className="flex items-end justify-between gap-3 pt-1">
          <div className="space-y-2 min-w-0 flex-1">
            <div className="flex items-center gap-2 text-xs text-slate-300">
              <Clock size={13} className="text-indigo-400 shrink-0" />
              <span className="truncate">{dateFormatted}</span>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-400">
              <MapPin size={13} className="text-rose-400 shrink-0" />
              <span className="truncate">{location}</span>
            </div>

            <div className="pt-1">
              <span className="text-[10px] text-slate-500 block font-mono">PASS UID</span>
              <span className="font-mono text-xs font-bold text-cyan-300 tracking-wider">
                {passUid}
              </span>
            </div>
          </div>

          {/* Mini QR Preview Thumbnail */}
          <div className="flex flex-col items-center gap-1 shrink-0">
            <div className="w-16 h-16 bg-white rounded-xl p-1.5 shadow-md flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
              <QRCode
                value={passUid}
                size={52}
                style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
                viewBox="0 0 52 52"
              />
            </div>
            <span className="text-[9px] text-indigo-300 font-medium flex items-center gap-0.5 group-hover:text-white transition-colors">
              <span>View Pass</span>
              <ArrowUpRight size={10} />
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
