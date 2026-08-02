import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { CalendarDays, QrCode, Users, BarChart3, Megaphone } from 'lucide-react';
import {
  OrganizerHeader,
  OrganizerMetrics,
  EventRoster,
  LiveCheckInMonitor,
  VolunteerRosterManager,
  OrganizerAnalytics,
  BroadcastAlertForm,
  ManualCheckInModal,
  AssignVolunteerModal,
  EventDetailsModal,
} from '@/components/organizer';

// Mock Data
const INITIAL_EVENTS = [
  {
    id: 'evt-1',
    title: 'HackCampus 2026: 36-Hour Hackathon',
    category: 'Hackathon',
    status: 'Live Now',
    date: '2026-08-02',
    time: '09:00 AM - Aug 4, 09:00 PM',
    location: 'Main Tech Auditorium & Lab 4',
    registered: 480,
    capacity: 500,
    checkedIn: 395,
    volunteersAssigned: 18,
    revenue: '$4,800',
    type: 'paid',
    description: 'Annual campus hackathon featuring AI, Web3, and Mobile development tracks with $10K in prizes.'
  },
  {
    id: 'evt-2',
    title: 'Annual Campus Cultural Gala',
    category: 'Cultural',
    status: 'Upcoming',
    date: '2026-08-15',
    time: '05:00 PM - 11:00 PM',
    location: 'Open Air Amphitheater',
    registered: 1250,
    capacity: 1500,
    checkedIn: 0,
    volunteersAssigned: 24,
    revenue: '$12,500',
    type: 'paid',
    description: 'A grand evening showcasing dance, music performance, fashion show, and food festival.'
  },
  {
    id: 'evt-3',
    title: 'AI & Quantum Computing Symposium',
    category: 'Tech & Science',
    status: 'Live Now',
    date: '2026-08-02',
    time: '10:30 AM - 04:30 PM',
    location: 'Science Complex - Hall B',
    registered: 210,
    capacity: 250,
    checkedIn: 184,
    volunteersAssigned: 8,
    revenue: 'Free',
    type: 'free',
    description: 'Keynote lectures and panel discussions with industry researchers in frontier AI technologies.'
  },
  {
    id: 'evt-4',
    title: 'CodeCraft UI/UX & Web Development Workshop',
    category: 'Workshop',
    status: 'Upcoming',
    date: '2026-08-20',
    time: '02:00 PM - 06:00 PM',
    location: 'Innovation Hub Room 302',
    registered: 95,
    capacity: 100,
    checkedIn: 0,
    volunteersAssigned: 4,
    revenue: 'Free',
    type: 'free',
    description: 'Hands-on practical session building responsive modern web applications with Tailwind & Next.js.'
  },
  {
    id: 'evt-5',
    title: 'Inter-College Gaming Championship',
    category: 'Gaming',
    status: 'Completed',
    date: '2026-07-28',
    time: '10:00 AM - 08:00 PM',
    location: 'Student Activity Center',
    registered: 320,
    capacity: 320,
    checkedIn: 312,
    volunteersAssigned: 12,
    revenue: '$1,600',
    type: 'paid',
    description: 'Esports tournament featuring Valorant, Rocket League, and FIFA console matchups.'
  }
];

const INITIAL_SCANS = [
  { id: 'scan-1', name: 'Aarav Sharma', ticketId: 'TK-84920', event: 'HackCampus 2026', gate: 'Gate A - Main', time: '14:22:10', status: 'Verified', tier: 'VIP Participant' },
  { id: 'scan-2', name: 'Riya Patel', ticketId: 'TK-92811', event: 'HackCampus 2026', gate: 'Gate B - North', time: '14:21:45', status: 'Verified', tier: 'General' },
  { id: 'scan-3', name: 'Devansh Verma', ticketId: 'TK-10492', event: 'AI & Quantum Computing', gate: 'Science Hall 1', time: '14:19:30', status: 'Verified', tier: 'Speaker Pass' },
  { id: 'scan-4', name: 'Ananya Gupta', ticketId: 'TK-77401', event: 'HackCampus 2026', gate: 'Gate A - Main', time: '14:15:02', status: 'Verified', tier: 'General' },
  { id: 'scan-5', name: 'Kabir Mehta', ticketId: 'TK-55109', event: 'AI & Quantum Computing', gate: 'Science Hall 1', time: '14:10:12', status: 'Verified', tier: 'Faculty' }
];

const INITIAL_VOLUNTEERS = [
  { id: 'vol-1', name: 'Siddharth Rao', role: 'Gate Check-in Lead', event: 'HackCampus 2026', status: 'On Duty', shift: '08:00 AM - 04:00 PM', phone: '+91 98765 43210' },
  { id: 'vol-2', name: 'Priya Sundaram', role: 'Stage Coordinator', event: 'HackCampus 2026', status: 'On Duty', shift: '12:00 PM - 08:00 PM', phone: '+91 98765 12345' },
  { id: 'vol-3', name: 'Vikram Joshi', role: 'Tech & Audio Support', event: 'AI & Quantum Computing', status: 'On Duty', shift: '09:30 AM - 05:00 PM', phone: '+91 98123 45678' },
  { id: 'vol-4', name: 'Sneha Kulkarni', role: 'Swag & Refreshment Desk', event: 'HackCampus 2026', status: 'On Break', shift: '10:00 AM - 06:00 PM', phone: '+91 97654 32109' },
  { id: 'vol-5', name: 'Rohan Deshmukh', role: 'Attendee Guidance', event: 'Annual Cultural Gala', status: 'Assigned', shift: '04:00 PM - 11:00 PM', phone: '+91 99887 76655' }
];

export default function OrganizerDashboard() {
  const [events, setEvents] = useState(INITIAL_EVENTS);
  const [scans, setScans] = useState(INITIAL_SCANS);
  const [volunteers, setVolunteers] = useState(INITIAL_VOLUNTEERS);
  const [selectedEventId, setSelectedEventId] = useState('all');
  const [activeTab, setActiveTab] = useState('events'); // 'events' | 'checkin' | 'volunteers' | 'analytics' | 'broadcast'

  // Modal States
  const [isCheckInModalOpen, setIsCheckInModalOpen] = useState(false);
  const [isBroadcastModalOpen, setIsBroadcastModalOpen] = useState(false);
  const [isVolunteerModalOpen, setIsVolunteerModalOpen] = useState(false);
  const [selectedEventModal, setSelectedEventModal] = useState(null);

  // Form States
  const [manualTicketInput, setManualTicketInput] = useState('');
  const [manualNameInput, setManualNameInput] = useState('');
  const [broadcastMessage, setBroadcastMessage] = useState('');
  const [broadcastTarget, setBroadcastTarget] = useState('all');
  const [broadcastChannel, setBroadcastChannel] = useState('app');

  const [newVolName, setNewVolName] = useState('');
  const [newVolRole, setNewVolRole] = useState('Gate Check-in Lead');
  const [newVolEvent, setNewVolEvent] = useState('HackCampus 2026');

  // Overall Metrics
  const totalRegistered = events.reduce((acc, e) => acc + e.registered, 0);
  const totalCheckedIn = events.reduce((acc, e) => acc + e.checkedIn, 0);
  const checkInRate = totalRegistered > 0 ? Math.round((totalCheckedIn / totalRegistered) * 100) : 0;
  const activeVolunteersCount = volunteers.filter(v => v.status === 'On Duty').length;

  // Selected Event Title
  const selectedEventTitle = selectedEventId === 'all'
    ? 'All Live Events'
    : events.find(e => e.id === selectedEventId)?.title || 'Selected Event';

  // Manual Check-In Handler
  const handleManualCheckIn = (e) => {
    if (e) e.preventDefault();
    if (!manualTicketInput.trim()) {
      toast.error('Please enter a valid ticket ID or attendee name');
      return;
    }

    const newScan = {
      id: `scan-${Date.now()}`,
      name: manualNameInput.trim() || 'Verified Attendee',
      ticketId: manualTicketInput.trim().toUpperCase(),
      event: selectedEventId !== 'all' ? events.find(e => e.id === selectedEventId)?.title : 'HackCampus 2026',
      gate: 'Manual Check-in Desk',
      time: new Date().toLocaleTimeString('en-US', { hour12: false }),
      status: 'Verified',
      tier: 'General Pass'
    };

    setScans([newScan, ...scans]);
    setEvents(prev => prev.map(evt => {
      if (selectedEventId === 'all' ? evt.id === 'evt-1' : evt.id === selectedEventId) {
        return { ...evt, checkedIn: evt.checkedIn + 1 };
      }
      return evt;
    }));

    toast.success(`Check-in successful for ${newScan.name} (${newScan.ticketId})!`);
    setManualTicketInput('');
    setManualNameInput('');
    setIsCheckInModalOpen(false);
  };

  // Simulated Scan Trigger
  const triggerSimulatedScan = () => {
    const mockNames = ['Alex Mercer', 'Sarah Jenkins', 'Karan Johar', 'Elena Rostova', 'Zaid Khan'];
    const mockGates = ['Gate A - Main', 'Gate B - North', 'Science Hall 1', 'VIP Entrance'];
    const randomName = mockNames[Math.floor(Math.random() * mockNames.length)];
    const randomGate = mockGates[Math.floor(Math.random() * mockGates.length)];
    const randomTicket = `TK-${Math.floor(10000 + Math.random() * 90000)}`;

    const simulatedScan = {
      id: `scan-${Date.now()}`,
      name: randomName,
      ticketId: randomTicket,
      event: 'HackCampus 2026',
      gate: randomGate,
      time: new Date().toLocaleTimeString('en-US', { hour12: false }),
      status: 'Verified',
      tier: 'General Pass'
    };

    setScans(prev => [simulatedScan, ...prev.slice(0, 9)]);
    setEvents(prev => prev.map(e => e.id === 'evt-1' ? { ...e, checkedIn: e.checkedIn + 1 } : e));
    toast.success(`Live QR Scanned: ${randomName} checked in at ${randomGate}`);
  };

  // Send Broadcast Handler
  const handleSendBroadcast = (e) => {
    e.preventDefault();
    if (!broadcastMessage.trim()) {
      toast.error('Please enter an announcement message');
      return;
    }
    toast.success(`Broadcast sent via ${broadcastChannel.toUpperCase()} to ${broadcastTarget === 'all' ? 'all registered attendees & volunteers' : 'event participants'}!`);
    setBroadcastMessage('');
    setIsBroadcastModalOpen(false);
  };

  // Add Volunteer Handler
  const handleAddVolunteer = (e) => {
    e.preventDefault();
    if (!newVolName.trim()) {
      toast.error('Please enter volunteer name');
      return;
    }
    const newVol = {
      id: `vol-${Date.now()}`,
      name: newVolName.trim(),
      role: newVolRole,
      event: newVolEvent,
      status: 'On Duty',
      shift: '09:00 AM - 05:00 PM',
      phone: '+91 98000 11223'
    };
    setVolunteers([newVol, ...volunteers]);
    toast.success(`Volunteer ${newVolName} assigned to ${newVolEvent}!`);
    setNewVolName('');
    setIsVolunteerModalOpen(false);
  };

  // Toggle Volunteer Duty Status
  const toggleVolunteerStatus = (id) => {
    setVolunteers(prev => prev.map(v => {
      if (v.id === id) {
        const nextStatus = v.status === 'On Duty' ? 'On Break' : 'On Duty';
        toast(`Volunteer ${v.name} status updated to ${nextStatus}`, { icon: '🔄' });
        return { ...v, status: nextStatus };
      }
      return v;
    }));
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans pb-16">
      {/* 1. Header Section */}
      <OrganizerHeader
        events={events}
        selectedEventId={selectedEventId}
        onSelectEvent={setSelectedEventId}
        onOpenCheckInModal={() => setIsCheckInModalOpen(true)}
        onOpenBroadcastModal={() => setIsBroadcastModalOpen(true)}
      />

      {/* Main Container */}
      <main className="container mx-auto px-4 md:px-6 -mt-6">

        {/* 2. Key Metrics Overview */}
        <OrganizerMetrics
          totalRegistered={totalRegistered}
          totalCheckedIn={totalCheckedIn}
          checkInRate={checkInRate}
          activeVolunteersCount={activeVolunteersCount}
          totalVolunteersCount={volunteers.length}
          totalRevenue="$18,900"
        />

        {/* 3. Tab Control Bar */}
        <div className="flex items-center justify-between border-b border-border/70 mb-6 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-1 sm:gap-2 pb-px">
            <button
              onClick={() => setActiveTab('events')}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-semibold border-b-2 transition-all whitespace-nowrap ${activeTab === 'events'
                  ? 'border-accent text-accent-foreground bg-accent/5 rounded-t-xl'
                  : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
                }`}
            >
              <CalendarDays className="w-4 h-4" /> Organized Events ({events.length})
            </button>

            <button
              onClick={() => setActiveTab('checkin')}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-semibold border-b-2 transition-all whitespace-nowrap ${activeTab === 'checkin'
                  ? 'border-accent text-accent-foreground bg-accent/5 rounded-t-xl'
                  : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
                }`}
            >
              <QrCode className="w-4 h-4" /> Live QR Monitor ({scans.length})
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse ml-0.5" />
            </button>

            <button
              onClick={() => setActiveTab('volunteers')}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-semibold border-b-2 transition-all whitespace-nowrap ${activeTab === 'volunteers'
                  ? 'border-accent text-accent-foreground bg-accent/5 rounded-t-xl'
                  : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
                }`}
            >
              <Users className="w-4 h-4" /> Volunteer Roster ({volunteers.length})
            </button>

            <button
              onClick={() => setActiveTab('analytics')}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-semibold border-b-2 transition-all whitespace-nowrap ${activeTab === 'analytics'
                  ? 'border-accent text-accent-foreground bg-accent/5 rounded-t-xl'
                  : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
                }`}
            >
              <BarChart3 className="w-4 h-4" /> Analytics & Demographics
            </button>

            <button
              onClick={() => setActiveTab('broadcast')}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-semibold border-b-2 transition-all whitespace-nowrap ${activeTab === 'broadcast'
                  ? 'border-accent text-accent-foreground bg-accent/5 rounded-t-xl'
                  : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
                }`}
            >
              <Megaphone className="w-4 h-4" /> Broadcast & Alerts
            </button>
          </div>
        </div>

        {/* 4. Tab Subviews */}
        {activeTab === 'events' && (
          <EventRoster
            events={events}
            onSelectEventDetail={(evt) => setSelectedEventModal(evt)}
            onOpenCheckInDesk={(evtId) => {
              setSelectedEventId(evtId);
              setActiveTab('checkin');
            }}
          />
        )}

        {activeTab === 'checkin' && (
          <LiveCheckInMonitor
            selectedEventTitle={selectedEventTitle}
            scans={scans}
            onSimulateScan={triggerSimulatedScan}
            onOpenManualModal={() => setIsCheckInModalOpen(true)}
            manualTicketInput={manualTicketInput}
            onManualTicketChange={setManualTicketInput}
            manualNameInput={manualNameInput}
            onManualNameChange={setManualNameInput}
            onManualCheckInSubmit={handleManualCheckIn}
          />
        )}

        {activeTab === 'volunteers' && (
          <VolunteerRosterManager
            volunteers={volunteers}
            onOpenAssignModal={() => setIsVolunteerModalOpen(true)}
            onToggleStatus={toggleVolunteerStatus}
          />
        )}

        {activeTab === 'analytics' && (
          <OrganizerAnalytics />
        )}

        {activeTab === 'broadcast' && (
          <BroadcastAlertForm
            events={events}
            broadcastTarget={broadcastTarget}
            onBroadcastTargetChange={setBroadcastTarget}
            broadcastChannel={broadcastChannel}
            onBroadcastChannelChange={setBroadcastChannel}
            broadcastMessage={broadcastMessage}
            onBroadcastMessageChange={setBroadcastMessage}
            onSendBroadcast={handleSendBroadcast}
          />
        )}
      </main>

      {/* Modals */}
      <ManualCheckInModal
        isOpen={isCheckInModalOpen}
        onClose={() => setIsCheckInModalOpen(false)}
        manualTicketInput={manualTicketInput}
        onManualTicketChange={setManualTicketInput}
        manualNameInput={manualNameInput}
        onManualNameChange={setManualNameInput}
        onSubmitCheckIn={handleManualCheckIn}
      />

      <AssignVolunteerModal
        isOpen={isVolunteerModalOpen}
        onClose={() => setIsVolunteerModalOpen(false)}
        newVolName={newVolName}
        onVolNameChange={setNewVolName}
        newVolRole={newVolRole}
        onVolRoleChange={setNewVolRole}
        newVolEvent={newVolEvent}
        onVolEventChange={setNewVolEvent}
        events={events}
        onSubmitAssign={handleAddVolunteer}
      />

      <EventDetailsModal
        selectedEvent={selectedEventModal}
        onClose={() => setSelectedEventModal(null)}
        onOpenCheckInDesk={(evtId) => {
          setSelectedEventId(evtId);
          setActiveTab('checkin');
        }}
      />
    </div>
  );
}
