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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
      <div className="bg-card border border-border rounded-3xl p-6 md:p-8 max-w-md w-full shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute right-5 top-5 p-1 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 rounded-2xl bg-accent/20 text-accent-foreground">
            <Scan className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-display font-bold">Manual Gate Check-in</h3>
            <p className="text-xs text-muted-foreground">Validate attendee ticket code on-site.</p>
          </div>
        </div>

        <form onSubmit={onSubmitCheckIn} className="space-y-4">
          <div>
            <Label htmlFor="modal-ticket" className="text-xs font-semibold">Ticket ID / QR Code Ref</Label>
            <Input
              id="modal-ticket"
              placeholder="TK-84920"
              value={manualTicketInput}
              onChange={(e) => onManualTicketChange(e.target.value)}
              className="font-mono text-sm uppercase mt-1"
              autoFocus
            />
          </div>

          <div>
            <Label htmlFor="modal-name" className="text-xs font-semibold">Attendee Name (Optional)</Label>
            <Input
              id="modal-name"
              placeholder="e.g. Sanya Kapoor"
              value={manualNameInput}
              onChange={(e) => onManualNameChange(e.target.value)}
              className="text-sm mt-1"
            />
          </div>

          <div className="pt-2 flex items-center gap-3">
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
      <div className="bg-card border border-border rounded-3xl p-6 md:p-8 max-w-md w-full shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute right-5 top-5 p-1 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 rounded-2xl bg-primary/10 text-primary">
            <UserCheck className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-display font-bold">Onboard New Volunteer</h3>
            <p className="text-xs text-muted-foreground">Assign student helper to an active event task.</p>
          </div>
        </div>

        <form onSubmit={onSubmitAssign} className="space-y-4">
          <div>
            <Label htmlFor="vol-name" className="text-xs font-semibold">Volunteer Name</Label>
            <Input
              id="vol-name"
              placeholder="e.g. Rahul Sen"
              value={newVolName}
              onChange={(e) => onVolNameChange(e.target.value)}
              className="text-sm mt-1"
              required
            />
          </div>

          <div>
            <Label htmlFor="vol-role" className="text-xs font-semibold">Assigned Role</Label>
            <select
              id="vol-role"
              value={newVolRole}
              onChange={(e) => onVolRoleChange(e.target.value)}
              className="w-full h-10 rounded-lg border border-input bg-background px-3 text-sm mt-1 focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="Gate Check-in Lead">Gate Check-in Lead</option>
              <option value="Stage Coordinator">Stage Coordinator</option>
              <option value="Tech & Audio Support">Tech & Audio Support</option>
              <option value="Swag & Refreshment Desk">Swag & Refreshment Desk</option>
              <option value="Attendee Guidance">Attendee Guidance</option>
            </select>
          </div>

          <div>
            <Label htmlFor="vol-evt" className="text-xs font-semibold">Assigned Event</Label>
            <select
              id="vol-evt"
              value={newVolEvent}
              onChange={(e) => onVolEventChange(e.target.value)}
              className="w-full h-10 rounded-lg border border-input bg-background px-3 text-sm mt-1 focus:outline-none focus:ring-2 focus:ring-ring"
            >
              {events.map(e => (
                <option key={e.id} value={e.title}>{e.title}</option>
              ))}
            </select>
          </div>

          <div className="pt-2 flex items-center gap-3">
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
      <div className="bg-card border border-border rounded-3xl p-6 md:p-8 max-w-lg w-full shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute right-5 top-5 p-1 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 inline-block mb-3">
          {selectedEvent.category}
        </span>

        <h3 className="text-2xl font-display font-bold mb-2">{selectedEvent.title}</h3>
        <p className="text-xs text-muted-foreground leading-relaxed mb-6">{selectedEvent.description}</p>

        <div className="space-y-3 text-xs bg-muted/40 p-4 rounded-2xl mb-6">
          <div className="flex justify-between border-b border-border/50 pb-2">
            <span className="text-muted-foreground">Date & Schedule:</span>
            <span className="font-semibold text-foreground">{selectedEvent.date} ({selectedEvent.time})</span>
          </div>
          <div className="flex justify-between border-b border-border/50 pb-2">
            <span className="text-muted-foreground">Venue Location:</span>
            <span className="font-semibold text-foreground">{selectedEvent.location}</span>
          </div>
          <div className="flex justify-between border-b border-border/50 pb-2">
            <span className="text-muted-foreground">Registration Stats:</span>
            <span className="font-semibold text-foreground">{selectedEvent.registered} / {selectedEvent.capacity} Seats</span>
          </div>
          <div className="flex justify-between border-b border-border/50 pb-2">
            <span className="text-muted-foreground">On-Site Checked-In:</span>
            <span className="font-semibold text-emerald-600 font-bold">{selectedEvent.checkedIn} Attendees</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Volunteers Assigned:</span>
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
            className="w-full rounded-xl gap-2"
          >
            <QrCode className="w-4 h-4" /> Open Gate Check-in Desk
          </Button>
        </div>
      </div>
    </div>
  );
}
