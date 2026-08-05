import React from 'react';
import { Button, Input, Label } from '@/components/ui';
import { Scan, UserCheck, X, QrCode } from 'lucide-react';

export function ManualCheckInModal({
  isOpen,
  onClose,
  manualTicketInput,
  onManualTicketChange,
  manualNameInput,
  onManualNameChange,
  onSubmitCheckIn,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-md p-4 animate-fade-in">
      <div className="bg-card border border-border/80 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-bl-full pointer-events-none" />

        <button
          onClick={onClose}
          className="absolute right-5 top-5 p-2 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3.5 mb-5">
          <div className="p-3.5 rounded-2xl bg-accent/20 text-accent-foreground shadow-sm">
            <Scan className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-display font-extrabold">Manual Gate Check-in</h3>
            <p className="text-xs text-muted-foreground">Validate attendee ticket code on-site.</p>
          </div>
        </div>

        <form onSubmit={onSubmitCheckIn} className="space-y-4">
          <div>
            <Label htmlFor="modal-ticket" className="text-xs font-bold">Ticket ID / QR Code Ref</Label>
            <Input
              id="modal-ticket"
              placeholder="TK-84920"
              value={manualTicketInput}
              onChange={(e) => onManualTicketChange(e.target.value)}
              className="font-mono text-sm uppercase mt-1.5 rounded-xl"
              autoFocus
            />
          </div>

          <div>
            <Label htmlFor="modal-name" className="text-xs font-bold">Attendee Name (Optional)</Label>
            <Input
              id="modal-name"
              placeholder="e.g. Sanya Kapoor"
              value={manualNameInput}
              onChange={(e) => onManualNameChange(e.target.value)}
              className="text-sm mt-1.5 rounded-xl"
            />
          </div>

          <div className="pt-3 flex items-center gap-3">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1 rounded-xl">
              Cancel
            </Button>
            <Button type="submit" variant="hero" className="flex-1 rounded-xl">
              Confirm Check-in
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export function AssignVolunteerModal({
  isOpen,
  onClose,
  newVolName,
  onVolNameChange,
  newVolRole,
  onVolRoleChange,
  newVolEvent,
  onVolEventChange,
  events = [],
  onSubmitAssign,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-md p-4 animate-fade-in">
      <div className="bg-card border border-border/80 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-bl-full pointer-events-none" />

        <button
          onClick={onClose}
          className="absolute right-5 top-5 p-2 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3.5 mb-5">
          <div className="p-3.5 rounded-2xl bg-primary/10 text-primary shadow-sm">
            <UserCheck className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-display font-extrabold">Onboard New Volunteer</h3>
            <p className="text-xs text-muted-foreground">Assign student helper to an active event task.</p>
          </div>
        </div>

        <form onSubmit={onSubmitAssign} className="space-y-4">
          <div>
            <Label htmlFor="vol-name" className="text-xs font-bold">Volunteer Name</Label>
            <Input
              id="vol-name"
              placeholder="e.g. Rahul Sen"
              value={newVolName}
              onChange={(e) => onVolNameChange(e.target.value)}
              className="text-sm mt-1.5 rounded-xl"
              required
            />
          </div>

          <div>
            <Label htmlFor="vol-role" className="text-xs font-bold">Assigned Role</Label>
            <select
              id="vol-role"
              value={newVolRole}
              onChange={(e) => onVolRoleChange(e.target.value)}
              className="w-full h-11 rounded-xl border border-input bg-background px-3.5 text-sm mt-1.5 focus:outline-none focus:ring-2 focus:ring-accent"
            >
              <option value="Gate Check-in Lead">Gate Check-in Lead</option>
              <option value="Stage Coordinator">Stage Coordinator</option>
              <option value="Tech & Audio Support">Tech & Audio Support</option>
              <option value="Swag & Refreshment Desk">Swag & Refreshment Desk</option>
              <option value="Attendee Guidance">Attendee Guidance</option>
            </select>
          </div>

          <div>
            <Label htmlFor="vol-evt" className="text-xs font-bold">Assigned Event</Label>
            <select
              id="vol-evt"
              value={newVolEvent}
              onChange={(e) => onVolEventChange(e.target.value)}
              className="w-full h-11 rounded-xl border border-input bg-background px-3.5 text-sm mt-1.5 focus:outline-none focus:ring-2 focus:ring-accent"
            >
              {events.map(e => (
                <option key={e.id} value={e.title}>{e.title}</option>
              ))}
            </select>
          </div>

          <div className="pt-3 flex items-center gap-3">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1 rounded-xl">
              Cancel
            </Button>
            <Button type="submit" variant="hero" className="flex-1 rounded-xl">
              Assign Volunteer
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export function EventDetailsModal({
  selectedEvent,
  onClose,
  onOpenCheckInDesk,
}) {
  if (!selectedEvent) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-md p-4 animate-fade-in">
      <div className="bg-card border border-border/80 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-36 h-36 bg-accent/10 rounded-bl-full pointer-events-none" />

        <button
          onClick={onClose}
          className="absolute right-5 top-5 p-2 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <span className="text-xs font-bold px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 inline-block mb-3">
          {selectedEvent.category}
        </span>

        <h3 className="text-2xl font-display font-extrabold mb-2 text-foreground">{selectedEvent.title}</h3>
        <p className="text-xs text-muted-foreground leading-relaxed mb-6">{selectedEvent.description}</p>

        <div className="space-y-3 text-xs bg-muted/40 p-4 rounded-2xl mb-6 border border-border/50">
          <div className="flex justify-between border-b border-border/50 pb-2">
            <span className="text-muted-foreground font-medium">Date & Schedule:</span>
            <span className="font-semibold text-foreground">{selectedEvent.date} ({selectedEvent.time})</span>
          </div>
          <div className="flex justify-between border-b border-border/50 pb-2">
            <span className="text-muted-foreground font-medium">Venue Location:</span>
            <span className="font-semibold text-foreground">{selectedEvent.location}</span>
          </div>
          <div className="flex justify-between border-b border-border/50 pb-2">
            <span className="text-muted-foreground font-medium">Registration Stats:</span>
            <span className="font-semibold text-foreground">{selectedEvent.registered} / {selectedEvent.capacity} Seats</span>
          </div>
          <div className="flex justify-between border-b border-border/50 pb-2">
            <span className="text-muted-foreground font-medium">On-Site Checked-In:</span>
            <span className="font-extrabold text-emerald-600">{selectedEvent.checkedIn} Attendees</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground font-medium">Volunteers Assigned:</span>
            <span className="font-semibold text-foreground">{selectedEvent.volunteersAssigned} On-duty</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button
            onClick={() => {
              onOpenCheckInDesk(selectedEvent.id);
              onClose();
            }}
            variant="hero"
            className="w-full rounded-2xl gap-2 h-11 font-bold"
          >
            <QrCode className="w-4 h-4" /> Open Gate Check-in Desk
          </Button>
        </div>
      </div>
    </div>
  );
}
