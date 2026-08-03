import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Ticket, CalendarDays, Megaphone } from 'lucide-react';
import {
  InviteeHeader,
  InviteeMetrics,
  DigitalPassesList,
  InviteeEventsGrid,
  InviteeNotifications,
  QRCodePassModal,
  InviteeEventDetailsModal,
} from '@/components/invitee';

export default function InviteeDashboard({
  inviteeProfile = null,
  myPasses = [],
  upcomingEvents = [],
  notifications = [],
}) {
  const [activeTab, setActiveTab] = useState('passes'); // 'passes' | 'events' | 'notifications'
  const [passesList, setPassesList] = useState(myPasses);
  const [eventsList, setEventsList] = useState(upcomingEvents);
  const [selectedPassModal, setSelectedPassModal] = useState(null);
  const [selectedEventModal, setSelectedEventModal] = useState(null);

  // Template RSVP Handler
  const handleRsvpEvent = (evt) => {
    if (evt.isRegistered) {
      // If registered, open QR modal for this event's pass
      const pass = passesList.find(p => p.eventId === evt.id) || {
        id: `pass-${evt.id}`,
        ticketCode: `TK-${Math.floor(10000 + Math.random() * 90000)}`,
        eventTitle: evt.title,
        date: evt.date,
        time: evt.time,
        location: evt.location,
        tier: 'General Pass'
      };
      setSelectedPassModal(pass);
    } else {
      // Toggle registration
      const newPass = {
        id: `pass-${Date.now()}`,
        eventId: evt.id,
        ticketCode: `TK-${Math.floor(10000 + Math.random() * 90000)}`,
        eventTitle: evt.title,
        date: evt.date,
        time: evt.time,
        location: evt.location,
        tier: 'General Admission'
      };
      setPassesList([newPass, ...passesList]);
      setEventsList(prev => prev.map(e => e.id === evt.id ? { ...e, isRegistered: true } : e));
      toast.success(`RSVP confirmed for ${evt.title}! Your QR digital pass has been generated.`);
    }
  };

  const attendedCount = passesList.filter(p => p.checkedIn).length;

  return (
    <div className="min-h-screen bg-background text-foreground font-sans pb-16">
      {/* 1. Header Banner */}
      <InviteeHeader
        inviteeProfile={inviteeProfile}
        activePassesCount={passesList.length}
        onOpenMyPasses={() => setActiveTab('passes')}
      />

      {/* Main Container */}
      <main className="container mx-auto px-4 md:px-6 -mt-6">

        {/* 2. Key Metrics Grid */}
        <InviteeMetrics
          totalPassesCount={passesList.length}
          upcomingEventsCount={eventsList.filter(e => e.isRegistered).length}
          attendedEventsCount={attendedCount}
          pendingRsvpsCount={eventsList.filter(e => !e.isRegistered).length}
        />

        {/* 3. Navigation Tabs */}
        <div className="flex items-center justify-between border-b border-border/70 mb-6 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-2 pb-px">
            <button
              onClick={() => setActiveTab('passes')}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-semibold border-b-2 transition-all whitespace-nowrap ${
                activeTab === 'passes'
                  ? 'border-accent text-accent-foreground bg-accent/5 rounded-t-xl'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              <Ticket className="w-4 h-4" /> My Digital Entry Passes ({passesList.length})
            </button>

            <button
              onClick={() => setActiveTab('events')}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-semibold border-b-2 transition-all whitespace-nowrap ${
                activeTab === 'events'
                  ? 'border-accent text-accent-foreground bg-accent/5 rounded-t-xl'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              <CalendarDays className="w-4 h-4" /> Discover & RSVP Events ({eventsList.length})
            </button>

            <button
              onClick={() => setActiveTab('notifications')}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-semibold border-b-2 transition-all whitespace-nowrap ${
                activeTab === 'notifications'
                  ? 'border-accent text-accent-foreground bg-accent/5 rounded-t-xl'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              <Megaphone className="w-4 h-4" /> Updates & Notices ({notifications.length})
            </button>
          </div>
        </div>

        {/* 4. Tab Subviews */}
        {activeTab === 'passes' && (
          <DigitalPassesList
            passes={passesList}
            onSelectPassModal={(pass) => setSelectedPassModal(pass)}
          />
        )}

        {activeTab === 'events' && (
          <InviteeEventsGrid
            events={eventsList}
            onSelectEventDetail={(evt) => setSelectedEventModal(evt)}
            onRsvpEvent={handleRsvpEvent}
          />
        )}

        {activeTab === 'notifications' && (
          <InviteeNotifications
            notifications={notifications}
          />
        )}
      </main>

      {/* Modals */}
      <QRCodePassModal
        selectedPass={selectedPassModal}
        onClose={() => setSelectedPassModal(null)}
      />

      <InviteeEventDetailsModal
        selectedEvent={selectedEventModal}
        onClose={() => setSelectedEventModal(null)}
        onRsvpEvent={handleRsvpEvent}
      />
    </div>
  );
}
