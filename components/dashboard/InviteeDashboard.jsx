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
    <div className="min-h-screen text-foreground font-sans pb-16" style={{ background: 'linear-gradient(180deg, hsl(222 35% 96%) 0%, hsl(218 30% 93%) 100%)' }}>
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

        <div className="mb-6 flex items-center gap-1 bg-muted/60 p-1.5 rounded-2xl border border-border/60 overflow-x-auto no-scrollbar w-fit max-w-full">
          <button
            onClick={() => setActiveTab('passes')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-xl whitespace-nowrap transition-all duration-200 cursor-pointer ${
              activeTab === 'passes'
                ? 'bg-background text-foreground shadow-sm border border-border/60'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Ticket className={`w-3.5 h-3.5 ${activeTab === 'passes' ? 'text-accent' : ''}`} />
            My Passes
            {passesList.length > 0 && (
              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                activeTab === 'passes' ? 'bg-accent/20 text-accent' : 'bg-muted text-muted-foreground'
              }`}>{passesList.length}</span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('events')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-xl whitespace-nowrap transition-all duration-200 cursor-pointer ${
              activeTab === 'events'
                ? 'bg-background text-foreground shadow-sm border border-border/60'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <CalendarDays className={`w-3.5 h-3.5 ${activeTab === 'events' ? 'text-accent' : ''}`} />
            Discover & RSVP
            {eventsList.length > 0 && (
              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                activeTab === 'events' ? 'bg-accent/20 text-accent' : 'bg-muted text-muted-foreground'
              }`}>{eventsList.length}</span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('notifications')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-xl whitespace-nowrap transition-all duration-200 cursor-pointer ${
              activeTab === 'notifications'
                ? 'bg-background text-foreground shadow-sm border border-border/60'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Megaphone className={`w-3.5 h-3.5 ${activeTab === 'notifications' ? 'text-accent' : ''}`} />
            Updates & Notices
            {notifications.length > 0 && (
              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                activeTab === 'notifications' ? 'bg-accent/20 text-accent' : 'bg-muted text-muted-foreground'
              }`}>{notifications.length}</span>
            )}
          </button>
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
