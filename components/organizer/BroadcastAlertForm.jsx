import React from 'react';
import { Button, Label } from '@/components/ui';
import { Megaphone, Radio, Send, Sparkles } from 'lucide-react';

export default function BroadcastAlertForm({
  events = [],
  broadcastTarget,
  onBroadcastTargetChange,
  broadcastChannel,
  onBroadcastChannelChange,
  broadcastMessage,
  onBroadcastMessageChange,
  onSendBroadcast,
}) {
  return (
    <div className="space-y-6 animate-fade-in max-w-3xl mx-auto">
      <div className="p-6 sm:p-10 rounded-3xl border border-border/80 bg-card shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-accent/5 rounded-bl-full pointer-events-none" />

        <div className="flex items-center gap-4 mb-8">
          <div className="p-3.5 bg-accent/20 text-accent-foreground rounded-2xl shadow-sm">
            <Megaphone className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-2xl font-display font-extrabold tracking-tight">Broadcast Announcement</h3>
            <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">Send real-time alerts or emails to attendees and volunteers.</p>
          </div>
        </div>

        <form onSubmit={onSendBroadcast} className="space-y-6">
          <div>
            <Label htmlFor="broadcast-target" className="text-sm font-bold mb-2 block">Select Target Event / Audience</Label>
            <select
              id="broadcast-target"
              value={broadcastTarget}
              onChange={(e) => onBroadcastTargetChange(e.target.value)}
              className="w-full h-12 rounded-2xl border border-input bg-background/90 px-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-accent cursor-pointer shadow-sm"
            >
              <option value="all">All Attendees across All Active Events</option>
              {events.map(evt => (
                <option key={evt.id} value={evt.id}>Only Participants of {evt.title}</option>
              ))}
              <option value="volunteers">All Assigned Volunteers Only</option>
            </select>
          </div>

          <div>
            <Label className="text-sm font-bold mb-2 block">Delivery Channel</Label>
            <div className="grid grid-cols-3 gap-3.5">
              <button
                type="button"
                onClick={() => onBroadcastChannelChange('app')}
                className={`p-3.5 rounded-2xl border text-xs font-bold flex items-center justify-center gap-2 transition-all duration-200 transform-gpu hover:scale-[1.03] active:scale-95 cursor-pointer ${
                  broadcastChannel === 'app'
                    ? 'border-accent bg-accent/15 text-foreground shadow-md ring-2 ring-accent/40'
                    : 'border-border bg-background hover:bg-muted text-muted-foreground hover:text-foreground'
                }`}
              >
                <Radio className="w-4 h-4 text-accent" /> In-App Push
              </button>
              <button
                type="button"
                onClick={() => onBroadcastChannelChange('email')}
                className={`p-3.5 rounded-2xl border text-xs font-bold flex items-center justify-center gap-2 transition-all duration-200 transform-gpu hover:scale-[1.03] active:scale-95 cursor-pointer ${
                  broadcastChannel === 'email'
                    ? 'border-accent bg-accent/15 text-foreground shadow-md ring-2 ring-accent/40'
                    : 'border-border bg-background hover:bg-muted text-muted-foreground hover:text-foreground'
                }`}
              >
                <Send className="w-4 h-4 text-accent" /> Email Digest
              </button>
              <button
                type="button"
                onClick={() => onBroadcastChannelChange('sms')}
                className={`p-3.5 rounded-2xl border text-xs font-bold flex items-center justify-center gap-2 transition-all duration-200 transform-gpu hover:scale-[1.03] active:scale-95 cursor-pointer ${
                  broadcastChannel === 'sms'
                    ? 'border-accent bg-accent/15 text-foreground shadow-md ring-2 ring-accent/40'
                    : 'border-border bg-background hover:bg-muted text-muted-foreground hover:text-foreground'
                }`}
              >
                <Sparkles className="w-4 h-4 text-accent" /> Urgent SMS
              </button>
            </div>
          </div>

          <div>
            <Label htmlFor="broadcast-msg" className="text-sm font-bold mb-2 block">Announcement Message</Label>
            <textarea
              id="broadcast-msg"
              rows={4}
              placeholder="e.g. Attention Attendees: Keynote is starting in Main Tech Auditorium in 10 minutes. Please scan your QR code at Gate A."
              value={broadcastMessage}
              onChange={(e) => onBroadcastMessageChange(e.target.value)}
              className="w-full rounded-2xl border border-input bg-background/90 p-4 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent shadow-sm"
            />
          </div>

          <Button type="submit" variant="hero" className="w-full rounded-2xl gap-2 h-12 text-sm font-bold shadow-lg shadow-accent/25">
            <Send className="w-4 h-4" /> Dispatch Broadcast Alert Now
          </Button>
        </form>
      </div>
    </div>
  );
}
