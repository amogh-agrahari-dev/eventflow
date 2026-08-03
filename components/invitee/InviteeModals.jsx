import React from 'react';
import { Button } from '@/components/ui';
import { QrCode, X, CalendarDays, MapPin, Ticket, Download, Share2 } from 'lucide-react';

export function QRCodePassModal({
  selectedPass,
  onClose,
}) {
  if (!selectedPass) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
      <div className="bg-card border border-border rounded-3xl p-6 md:p-8 max-w-sm w-full shadow-2xl relative text-center">
        <button
          onClick={onClose}
          className="absolute right-5 top-5 p-1 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <span className="text-[11px] font-mono font-bold px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 inline-block mb-3">
          {selectedPass.ticketCode || 'TK-84920'}
        </span>

        <h3 className="text-xl font-display font-bold mb-1">{selectedPass.eventTitle || 'Event Digital Pass'}</h3>
        <p className="text-xs text-muted-foreground mb-6">Scan code at venue gate entrance.</p>

        {/* QR Code Visual Component Container */}
        <div className="p-6 rounded-2xl bg-white border border-border/80 shadow-inner flex flex-col items-center justify-center mx-auto mb-6 max-w-[220px]">
          <div className="w-40 h-40 bg-slate-900 rounded-xl p-3 flex flex-col items-center justify-center relative">
            <QrCode className="w-32 h-32 text-white" />
          </div>
          <span className="text-[11px] font-mono font-bold text-slate-800 mt-2">
            {selectedPass.ticketCode || 'TK-84920'}
          </span>
        </div>

        <div className="text-xs space-y-1.5 text-muted-foreground mb-6">
          <p><strong className="text-foreground">Attendee:</strong> {selectedPass.attendeeName || 'Guest User'}</p>
          <p><strong className="text-foreground">Pass Tier:</strong> {selectedPass.tier || 'General Admission'}</p>
          <p><strong className="text-foreground">Gate Entry:</strong> {selectedPass.gate || 'Gate A - Main'}</p>
        </div>

        <Button onClick={onClose} variant="hero" className="w-full rounded-xl">
          Done
        </Button>
      </div>
    </div>
  );
}

export function InviteeEventDetailsModal({
  selectedEvent,
  onClose,
  onRsvpEvent,
}) {
  if (!selectedEvent) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
      <div className="bg-card border border-border rounded-3xl p-6 md:p-8 max-w-lg w-full shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute right-5 top-5 p-1 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 inline-block mb-3">
          {selectedEvent.category || 'Category'}
        </span>

        <h3 className="text-2xl font-display font-bold mb-2">{selectedEvent.title}</h3>
        <p className="text-xs text-muted-foreground leading-relaxed mb-6">{selectedEvent.description}</p>

        <div className="space-y-3 text-xs bg-muted/40 p-4 rounded-2xl mb-6">
          <div className="flex justify-between border-b border-border/50 pb-2">
            <span className="text-muted-foreground">Date & Time:</span>
            <span className="font-semibold text-foreground">{selectedEvent.date} ({selectedEvent.time})</span>
          </div>
          <div className="flex justify-between border-b border-border/50 pb-2">
            <span className="text-muted-foreground">Location:</span>
            <span className="font-semibold text-foreground">{selectedEvent.location}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Organizer:</span>
            <span className="font-semibold text-foreground">{selectedEvent.organizer || 'Campus Event Committee'}</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button type="button" variant="outline" onClick={onClose} className="flex-1 rounded-xl">
            Close
          </Button>
          <Button
            onClick={() => {
              onRsvpEvent(selectedEvent);
              onClose();
            }}
            variant="hero"
            className="flex-1 rounded-xl gap-2"
          >
            <Ticket className="w-4 h-4" /> {selectedEvent.isRegistered ? 'View Pass' : 'Confirm RSVP'}
          </Button>
        </div>
      </div>
    </div>
  );
}
