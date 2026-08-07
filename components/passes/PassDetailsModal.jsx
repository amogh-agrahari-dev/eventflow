import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import QRCode from 'react-qr-code';
import {
  X,
  Copy,
  Check,
  Calendar,
  Clock,
  MapPin,
  Users,
  UserCheck,
  Shield,
  Ticket,
  Code2,
  ChevronDown,
  ChevronUp,
  Sparkles,
  ExternalLink,
  Info,
  Globe,
  Radio
} from 'lucide-react';
import clsx from 'clsx';

/**
 * Format ISO datetime string to human-readable date & time
 */
export function formatFullDateTime(isoStr) {
  if (!isoStr) return 'TBD';
  try {
    const d = new Date(isoStr);
    if (isNaN(d.getTime())) return String(isoStr);
    return d.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  } catch {
    return String(isoStr);
  }
}

/**
 * Format ISO datetime string to date only
 */
export function formatDateOnly(isoStr) {
  if (!isoStr) return 'TBD';
  try {
    const d = new Date(isoStr);
    if (isNaN(d.getTime())) return String(isoStr);
    return d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  } catch {
    return String(isoStr);
  }
}

/**
 * PassDetailsModal Component
 * 
 * Renders an accessible, high-performance modal with dynamically client-generated
 * in-memory QR code using purely `pass.pass_uid`.
 */
export default function PassDetailsModal({ pass, isOpen, onClose }) {
  const [copiedUid, setCopiedUid] = useState(false);
  const [copiedJson, setCopiedJson] = useState(false);
  const [showRawJson, setShowRawJson] = useState(false);
  const modalRef = useRef(null);
  const closeButtonRef = useRef(null);

  // Copy Pass UID handler
  const handleCopyUid = useCallback(() => {
    if (!pass?.pass_uid) return;
    navigator.clipboard.writeText(pass.pass_uid);
    setCopiedUid(true);
    setTimeout(() => setCopiedUid(false), 2000);
  }, [pass?.pass_uid]);

  // Copy Raw JSON handler
  const handleCopyJson = useCallback(() => {
    if (!pass) return;
    navigator.clipboard.writeText(JSON.stringify(pass, null, 2));
    setCopiedJson(true);
    setTimeout(() => setCopiedJson(false), 2000);
  }, [pass]);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
      // Focus close button on open for accessibility
      setTimeout(() => closeButtonRef.current?.focus(), 50);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !pass) return null;

  const event = pass.event || {};
  const organizer = event.organizer || {};
  const volunteers = Array.isArray(event.volunteers) ? event.volunteers : [];

  const categoryName = event.category || 'Event';
  const statusName = pass.status || 'generated';
  const statusStr = statusName.toLowerCase();
  const isActive = statusStr === 'active';

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="pass-modal-title"
      >
        {/* Backdrop Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/75 backdrop-blur-md transition-opacity"
          aria-hidden="true"
        />

        {/* Modal Container */}
        <motion.div
          ref={modalRef}
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-3xl my-8 rounded-[24px] overflow-hidden text-slate-100 flex flex-col z-10"
          style={{
            background: 'rgba(15, 23, 38, 0.96)',
            backdropFilter: 'blur(14px)',
            border: '1px solid rgba(99, 102, 241, 0.18)',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.55), 0 0 0 1px rgba(255, 255, 255, 0.04)',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Top Banner Image with Gradient Overlay */}
          <div className="relative h-44 sm:h-52 w-full overflow-hidden bg-slate-900 shrink-0">
            {event.banner_url ? (
              <img
                src={event.banner_url}
                alt={event.title || 'Event Banner'}
                className="w-full h-full object-cover object-center"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-indigo-900/60 via-purple-900/40 to-slate-900 flex items-center justify-center">
                <Ticket className="w-16 h-16 text-indigo-400/40 animate-pulse" />
              </div>
            )}

            {/* Banner Dark Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-[rgba(15,23,38,0.98)] via-[rgba(15,23,38,0.5)] to-black/40" />

            {/* Close Button */}
            <button
              ref={closeButtonRef}
              onClick={onClose}
              aria-label="Close pass details modal"
              className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-slate-950/70 hover:bg-slate-900 text-slate-300 hover:text-white border border-white/10 hover:border-indigo-500/50 backdrop-blur-md transition-all duration-200 cursor-pointer shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
              <X size={18} />
            </button>

            {/* Banner Content Overlays */}
            <div className="absolute bottom-4 left-6 right-6 flex flex-wrap items-end justify-between gap-3">
              <div className="space-y-1.5 max-w-lg">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                    {categoryName}
                  </span>
                  <span className={clsx(
                    "px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider border flex items-center gap-1.5",
                    isActive
                      ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
                      : "bg-amber-500/20 text-amber-300 border-amber-500/30"
                  )}>
                    <span className={clsx(
                      "w-1.5 h-1.5 rounded-full",
                      isActive ? "bg-emerald-400 animate-pulse" : "bg-amber-400"
                    )} />
                    {statusName}
                  </span>
                  {event.format && (
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium text-slate-300 bg-slate-800/80 border border-slate-700/60 flex items-center gap-1">
                      {event.format.toLowerCase() === 'online' ? <Globe size={11} /> : <MapPin size={11} />}
                      {event.format}
                    </span>
                  )}
                </div>
                <h2 id="pass-modal-title" className="text-xl sm:text-2xl font-extrabold text-white tracking-tight line-clamp-1 drop-shadow-md">
                  {event.title || 'Event Pass'}
                </h2>
              </div>
            </div>
          </div>

          {/* Scrollable Content Body */}
          <div className="p-6 sm:p-8 space-y-8 overflow-y-auto max-h-[calc(85vh-200px)] custom-scrollbar">

            {/* 1. QR Code Section (Centerpiece) */}
            <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-gradient-to-b from-slate-900/80 to-slate-900/40 border border-indigo-500/20 shadow-inner text-center relative overflow-hidden">
              <div className="absolute -top-16 -left-16 w-36 h-36 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute -bottom-16 -right-16 w-36 h-36 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

              <div className="text-xs font-semibold uppercase tracking-widest text-indigo-300 mb-3 flex items-center gap-1.5">
                <Sparkles size={14} className="text-indigo-400" />
                <span>Dynamic Digital Entry Pass</span>
              </div>

              {/* QR Code Canvas Container */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="w-[244px] h-[244px] bg-white p-3 rounded-2xl shadow-[0_10px_35px_rgba(0,0,0,0.5),0_0_20px_rgba(99,102,241,0.25)] flex items-center justify-center border-4 border-white/90"
              >
                {/* 
                  CRITICAL: The value prop encodes ONLY the 12-char alphanumeric pass_uid.
                  Generated in-memory client-side only. Never stored or uploaded.
                */}
                <QRCode
                  value={pass.pass_uid || ''}
                  size={220}
                  style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
                  viewBox="0 0 220 220"
                />
              </motion.div>

              {/* Pass UID String & Copy Button */}
              <div className="mt-4 flex flex-col items-center gap-1.5">
                <div className="flex items-center gap-2 bg-slate-950/80 px-4 py-2 rounded-xl border border-slate-800 shadow-sm">
                  <span className="text-xs text-slate-400 font-medium">PASS UID:</span>
                  <span className="font-mono text-sm sm:text-base font-bold text-cyan-300 tracking-wider">
                    {pass.pass_uid}
                  </span>
                  <button
                    onClick={handleCopyUid}
                    title="Copy Pass UID"
                    className="ml-1.5 p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
                  >
                    {copiedUid ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                  </button>
                </div>
                <p className="text-[11px] text-slate-400">
                  {copiedUid ? (
                    <span className="text-emerald-400 font-medium">Copied UID to clipboard!</span>
                  ) : (
                    'Scan at the entrance desk for instant check-in'
                  )}
                </p>
              </div>
            </div>

            {/* 2. Pass Information Grid */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                <Ticket size={14} className="text-indigo-400" />
                <span>Pass Information</span>
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80">
                  <span className="text-[11px] text-slate-400 block mb-0.5">Pass ID</span>
                  <span className="font-mono text-sm font-bold text-white">#{pass.id}</span>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80">
                  <span className="text-[11px] text-slate-400 block mb-0.5">User ID</span>
                  <span className="font-mono text-sm font-bold text-white">#{pass.user_id}</span>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80">
                  <span className="text-[11px] text-slate-400 block mb-0.5">Event ID</span>
                  <span className="font-mono text-sm font-bold text-white">#{pass.event_id}</span>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80">
                  <span className="text-[11px] text-slate-400 block mb-0.5">Status</span>
                  <span className={clsx(
                    "text-sm font-semibold capitalize flex items-center gap-1.5",
                    isActive ? "text-emerald-400" : "text-amber-400"
                  )}>
                    <span className={clsx(
                      "w-2 h-2 rounded-full",
                      isActive ? "bg-emerald-400" : "bg-amber-400"
                    )} />
                    {pass.status || 'generated'}
                  </span>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 col-span-2">
                  <span className="text-[11px] text-slate-400 block mb-0.5">Pass Issued At</span>
                  <span className="text-xs font-medium text-slate-200">{formatFullDateTime(pass.created_at)}</span>
                </div>
              </div>
            </div>

            {/* 3. Event Details Section */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                <Info size={14} className="text-indigo-400" />
                <span>Event Details</span>
              </h3>

              <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-4">
                <div>
                  <h4 className="text-base font-bold text-white mb-1">{event.title}</h4>
                  {event.description && (
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {event.description}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-800/60">
                  <div className="flex items-start gap-2.5 text-xs text-slate-300">
                    <Clock size={15} className="text-indigo-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">Start Time</span>
                      <span>{formatFullDateTime(event.start_time)}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 text-xs text-slate-300">
                    <Clock size={15} className="text-purple-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">End Time</span>
                      <span>{formatFullDateTime(event.end_time)}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 text-xs text-slate-300">
                    <MapPin size={15} className="text-rose-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">Location</span>
                      <span className="truncate">{event.location || 'PICT Campus Venue'}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 text-xs text-slate-300">
                    <Users size={15} className="text-cyan-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">Capacity & Pricing</span>
                      <span>
                        {event.is_free ? 'Free Entry' : 'Paid Ticket'} • Max {event.max_attendees || 100} Attendees
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 4. Organizer & Volunteers Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Organizer Section */}
              <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                  <Shield size={14} className="text-indigo-400" />
                  <span>Organizer</span>
                </h3>

                {organizer.name ? (
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center font-bold text-indigo-300 shrink-0">
                      {organizer.name.charAt(0)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-white truncate">{organizer.name}</span>
                        {organizer.status && (
                          <span className="px-1.5 py-0.2 text-[9px] font-semibold uppercase rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                            {organizer.status}
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-slate-400 block truncate">{organizer.email}</span>
                    </div>
                  </div>
                ) : (
                  <p className="text-xs text-slate-500 italic">No organizer details available.</p>
                )}
              </div>

              {/* Volunteers Section */}
              <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <UserCheck size={14} className="text-teal-400" />
                    <span>Assigned Volunteers</span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">
                    {volunteers.length} Active
                  </span>
                </h3>

                {volunteers.length > 0 ? (
                  <div className="space-y-2 max-h-32 overflow-y-auto custom-scrollbar pr-1">
                    {volunteers.map((vol, idx) => (
                      <div key={vol.id || idx} className="flex items-center justify-between text-xs py-1 px-2 rounded-lg bg-slate-950/40 border border-slate-800/50">
                        <div className="flex items-center gap-2 min-w-0">
                          <span className="w-1.5 h-1.5 rounded-full bg-teal-400 shrink-0" />
                          <span className="font-medium text-white truncate">{vol.name}</span>
                          <span className="text-slate-500 text-[11px] truncate hidden sm:inline">({vol.email})</span>
                        </div>
                        <span className="text-[10px] font-semibold text-teal-300 uppercase px-1.5 py-0.5 rounded bg-teal-500/10 border border-teal-500/20 shrink-0 ml-2">
                          {vol.status || 'on-duty'}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-slate-500 italic">No volunteers assigned to this event yet.</p>
                )}
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs transition-all shadow-lg shadow-indigo-600/30 cursor-pointer"
            >
              Close Pass
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
