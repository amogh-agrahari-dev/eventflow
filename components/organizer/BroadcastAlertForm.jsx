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
      <div className="p-6 md:p-8 rounded-3xl border border-border/80 bg-card shadow-lg">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-accent/20 text-accent-foreground rounded-2xl">
            <Megaphone className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-2xl font-display font-bold">Broadcast Announcement</h3>
            <p className="text-xs text-muted-foreground">Send real-time alerts or emails to attendees and volunteers.</p>
          </div>
        </div>

        <form onSubmit={onSendBroadcast} className="space-y-5">
          <div>
            <Label htmlFor="broadcast-target" className="text-sm font-semibold mb-1.5 block">Select Target Event / Audience</Label>
            <select
              id="broadcast-target"
              value={broadcastTarget}
              onChange={(e) => onBroadcastTargetChange(e.target.value)}
              className="w-full h-11 rounded-xl border border-input bg-background px-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="all">All Attendees across All Active Events</option>
              {events.map(evt => (
                <option key={evt.id} value={evt.id}>Only Participants of {evt.title}</option>
              ))}
              <option value="volunteers">All Assigned Volunteers Only</option>
            </select>
          </div>

          <div>
            <Label className="text-sm font-semibold mb-1.5 block">Delivery Channel</Label>
            <div className="grid grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => onBroadcastChannelChange('app')}
                className={`p-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                  broadcastChannel === 'app' ? 'border-accent bg-accent/10 text-foreground' : 'border-border bg-background hover:bg-muted'
                }`}
              >
                <Radio className="w-4 h-4 text-accent" /> In-App Push
              </button>
              <button
                type="button"
                onClick={() => onBroadcastChannelChange('email')}
                className={`p-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                  broadcastChannel === 'email' ? 'border-accent bg-accent/10 text-foreground' : 'border-border bg-background hover:bg-muted'
                }`}
              >
                <Send className="w-4 h-4 text-accent" /> Email Digest
              </button>
              <button
                type="button"
                onClick={() => onBroadcastChannelChange('sms')}
                className={`p-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                  broadcastChannel === 'sms' ? 'border-accent bg-accent/10 text-foreground' : 'border-border bg-background hover:bg-muted'
                }`}
              >
                <Sparkles className="w-4 h-4 text-accent" /> Urgent SMS
              </button>
            </div>
          </div>

          <div>
            <Label htmlFor="broadcast-msg" className="text-sm font-semibold mb-1.5 block">Announcement Message</Label>
            <textarea
              id="broadcast-msg"
              rows={4}
              placeholder="e.g. Attention Attendees: Keynote is starting in Main Tech Auditorium in 10 minutes. Please scan your QR code at Gate A."
              value={broadcastMessage}
              onChange={(e) => onBroadcastMessageChange(e.target.value)}
              className="w-full rounded-xl border border-input bg-background p-4 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          <Button type="submit" variant="hero" className="w-full rounded-xl gap-2 h-12 text-sm shadow-md">
            <Send className="w-4 h-4" /> Dispatch Broadcast Alert Now
          </Button>
        </form>
      </div>
    </div>
  );
}
