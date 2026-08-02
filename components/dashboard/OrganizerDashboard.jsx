import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button, Input, Label } from '@/components/ui';
import toast from 'react-hot-toast';
import {
  CalendarDays,
  Users,
  QrCode,
  Scan,
  PlusCircle,
  Search,
  Filter,
  TrendingUp,
  BarChart3,
  CheckCircle2,
  Clock,
  MapPin,
  Megaphone,
  UserCheck,
  MoreVertical,
  Download,
  Send,
  X,
  ShieldCheck,
  Layers,
  Radio,
  ArrowUpRight,
  Activity,
  Sparkles,
  Ticket,
  Check,
  ChevronRight,
  AlertCircle,
  Eye,
  RefreshCw,
  Building,
  DollarSign
} from 'lucide-react';

// Initial Mock Data for Event Organizer
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
  const [activeTab, setActiveTab] = useState('events'); // 'events', 'checkin', 'volunteers', 'analytics', 'broadcast'
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'table'

  // Modal States
  const [isCheckInModalOpen, setIsCheckInModalOpen] = useState(false);
  const [isBroadcastModalOpen, setIsBroadcastModalOpen] = useState(false);
  const [isVolunteerModalOpen, setIsVolunteerModalOpen] = useState(false);
  const [selectedEventModal, setSelectedEventModal] = useState(null);

  // Form States for Modals
  const [manualTicketInput, setManualTicketInput] = useState('');
  const [manualNameInput, setManualNameInput] = useState('');
  const [broadcastMessage, setBroadcastMessage] = useState('');
  const [broadcastTarget, setBroadcastTarget] = useState('all');
  const [broadcastChannel, setBroadcastChannel] = useState('app');

  const [newVolName, setNewVolName] = useState('');
  const [newVolRole, setNewVolRole] = useState('Gate Check-in');
  const [newVolEvent, setNewVolEvent] = useState('HackCampus 2026');

  // Filtered Events based on controls
  const filteredEvents = events.filter(evt => {
    const matchesSearch = evt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      evt.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      evt.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || evt.category === categoryFilter;
    const matchesSelected = selectedEventId === 'all' || evt.id === selectedEventId;
    return matchesSearch && matchesCategory && matchesSelected;
  });

  // Calculate Overall Metrics
  const totalRegistered = events.reduce((acc, e) => acc + e.registered, 0);
  const totalCheckedIn = events.reduce((acc, e) => acc + e.checkedIn, 0);
  const checkInRate = totalRegistered > 0 ? Math.round((totalCheckedIn / totalRegistered) * 100) : 0;
  const activeVolunteersCount = volunteers.filter(v => v.status === 'On Duty').length;

  // Handle Manual Check-In
  const handleManualCheckIn = (e) => {
    e.preventDefault();
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

    // Update checkedIn count for HackCampus or selected event
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

  // Handle Simulation of incoming live QR scan
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

  // Handle Send Broadcast
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

  // Handle Volunteer Creation
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

  // Toggle Volunteer Status
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
      {/* Header Banner Section */}
      <section className="relative overflow-hidden bg-gradient-brand pt-24 pb-12 border-b border-border/40 text-primary-foreground">
        <div className="absolute inset-0 bg-grid-faint opacity-40" aria-hidden="true" />

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-1 text-xs font-semibold rounded-full bg-accent/20 text-accent border border-accent/30 backdrop-blur-md inline-flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" /> Event Organizer Command Center
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 text-xs rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> 2 Live Events Active
                </span>
              </div>
              <h1 className="text-3xl md:text-5xl font-display font-bold tracking-tight text-primary-foreground">
                Organizer Dashboard
              </h1>
              <p className="text-sm md:text-base text-primary-foreground/75 mt-1 max-w-2xl">
                Real-time management for college events, live QR check-ins, volunteer tasking, and attendee analytics.
              </p>
            </div>

            {/* Quick Actions & Event Selector */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Event Filter Selector Dropdown */}
              <div className="relative">
                <select
                  value={selectedEventId}
                  onChange={(e) => setSelectedEventId(e.target.value)}
                  className="bg-background/20 hover:bg-background/30 text-primary-foreground border border-primary-foreground/20 rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-accent backdrop-blur-md cursor-pointer transition-all"
                >
                  <option value="all" className="bg-slate-900 text-white">All Events (5 Managed)</option>
                  {events.map(evt => (
                    <option key={evt.id} value={evt.id} className="bg-slate-900 text-white">
                      {evt.title} ({evt.status})
                    </option>
                  ))}
                </select>
              </div>

              {/* Action Buttons */}
              <Button
                onClick={() => setIsCheckInModalOpen(true)}
                variant="outline"
                className="rounded-xl border-primary-foreground/20 bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/20 text-sm gap-2 backdrop-blur-md"
              >
                <Scan className="w-4 h-4 text-accent" /> Scan / Check-In
              </Button>

              <Button
                onClick={() => setIsBroadcastModalOpen(true)}
                variant="outline"
                className="rounded-xl border-primary-foreground/20 bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/20 text-sm gap-2 backdrop-blur-md"
              >
                <Megaphone className="w-4 h-4 text-accent" /> Broadcast Alert
              </Button>

              <Link href="/events/add">
                <Button variant="hero" className="rounded-xl shadow-elevated gap-2">
                  <PlusCircle className="w-4 h-4" /> Create Event
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <main className="container mx-auto px-4 md:px-6 -mt-6">

        {/* Key Metrics / Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">

          {/* Stat 1: Total Registered */}
          <div className="p-5 rounded-2xl border border-border/80 bg-card/95 backdrop-blur-md shadow-sm hover:shadow-md transition-all group">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Total Registered</span>
              <div className="p-2.5 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                <Users className="w-5 h-5" />
              </div>
            </div>
            <div className="flex items-baseline justify-between">
              <h3 className="text-2xl md:text-3xl font-display font-bold text-foreground tracking-tight">
                {totalRegistered.toLocaleString()}
              </h3>
              <span className="inline-flex items-center text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                <TrendingUp className="w-3 h-3 mr-1" /> +14.2%
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-2 flex items-center justify-between">
              <span>Across all events</span>
              <span className="font-medium text-foreground">88.5% capacity</span>
            </p>
          </div>

          {/* Stat 2: Live Check-in Rate */}
          <div className="p-5 rounded-2xl border border-border/80 bg-card/95 backdrop-blur-md shadow-sm hover:shadow-md transition-all group">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Live Check-ins</span>
              <div className="p-2.5 rounded-xl bg-accent/20 text-accent-foreground group-hover:bg-accent transition-all duration-300">
                <Scan className="w-5 h-5" />
              </div>
            </div>
            <div className="flex items-baseline justify-between">
              <h3 className="text-2xl md:text-3xl font-display font-bold text-foreground tracking-tight">
                {totalCheckedIn.toLocaleString()}
              </h3>
              <span className="inline-flex items-center text-xs font-medium text-accent-foreground bg-accent/15 px-2 py-0.5 rounded-full border border-accent/30">
                {checkInRate}% Rate
              </span>
            </div>
            {/* Progress Bar */}
            <div className="w-full bg-muted rounded-full h-1.5 mt-3 overflow-hidden">
              <div className="bg-accent h-1.5 rounded-full transition-all duration-500" style={{ width: `${checkInRate}%` }} />
            </div>
          </div>

          {/* Stat 3: Active Volunteers */}
          <div className="p-5 rounded-2xl border border-border/80 bg-card/95 backdrop-blur-md shadow-sm hover:shadow-md transition-all group">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Active Volunteers</span>
              <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                <UserCheck className="w-5 h-5" />
              </div>
            </div>
            <div className="flex items-baseline justify-between">
              <h3 className="text-2xl md:text-3xl font-display font-bold text-foreground tracking-tight">
                {activeVolunteersCount} / {volunteers.length}
              </h3>
              <span className="inline-flex items-center text-xs font-medium text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-200">
                On Duty
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-2 flex items-center justify-between">
              <span>{volunteers.length - activeVolunteersCount} on scheduled break</span>
              <span className="font-medium text-foreground">4 venue gates</span>
            </p>
          </div>

          {/* Stat 4: Revenue & Pass Sales */}
          <div className="p-5 rounded-2xl border border-border/80 bg-card/95 backdrop-blur-md shadow-sm hover:shadow-md transition-all group">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Total Revenue / Passes</span>
              <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300">
                <Ticket className="w-5 h-5" />
              </div>
            </div>
            <div className="flex items-baseline justify-between">
              <h3 className="text-2xl md:text-3xl font-display font-bold text-foreground tracking-tight">
                $18,900
              </h3>
              <span className="inline-flex items-center text-xs font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                3 Paid Events
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-2 flex items-center justify-between">
              <span>2 Free Symposia</span>
              <span className="font-medium text-foreground">100% Collected</span>
            </p>
          </div>
        </div>

        {/* Tab Control Bar */}
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

        {/* TAB 1: ORGANIZED EVENTS OVERVIEW */}
        {activeTab === 'events' && (
          <div className="space-y-6 animate-fade-in">
            {/* Filter & Search Bar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 rounded-2xl border border-border/80 bg-card/60 backdrop-blur-sm">
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search events by title, category or venue..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-10 rounded-xl bg-background border-border/80 focus:border-accent"
                />
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-muted-foreground hidden sm:block" />
                  <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="h-10 rounded-xl border border-input bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    <option value="All">All Categories</option>
                    <option value="Hackathon">Hackathon</option>
                    <option value="Cultural">Cultural</option>
                    <option value="Tech & Science">Tech & Science</option>
                    <option value="Workshop">Workshop</option>
                    <option value="Gaming">Gaming</option>
                  </select>
                </div>

                <div className="border-l border-border pl-3 flex items-center gap-1 bg-muted/50 p-1 rounded-xl">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-1.5 rounded-lg text-xs font-medium transition-all ${viewMode === 'grid' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                    title="Grid View"
                  >
                    Grid
                  </button>
                  <button
                    onClick={() => setViewMode('table')}
                    className={`p-1.5 rounded-lg text-xs font-medium transition-all ${viewMode === 'table' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                    title="Table View"
                  >
                    Table
                  </button>
                </div>
              </div>
            </div>

            {/* Grid View */}
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredEvents.map((evt) => (
                  <div
                    key={evt.id}
                    className="group rounded-2xl border border-border/80 bg-card p-6 shadow-sm hover:shadow-xl hover:border-primary/30 transition-all duration-300 flex flex-col justify-between relative overflow-hidden"
                  >
                    {/* Top status tag */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                        {evt.category}
                      </span>

                      {evt.status === 'Live Now' && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded-full bg-emerald-500/10 text-emerald-600 border border-emerald-500/30">
                          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Live Now
                        </span>
                      )}
                      {evt.status === 'Upcoming' && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-full bg-blue-500/10 text-blue-600 border border-blue-500/20">
                          <Clock className="w-3 h-3" /> Upcoming
                        </span>
                      )}
                      {evt.status === 'Completed' && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-full bg-slate-500/10 text-slate-600 border border-slate-500/20">
                          <CheckCircle2 className="w-3 h-3" /> Completed
                        </span>
                      )}
                    </div>

                    {/* Title & Description */}
                    <div>
                      <h3 className="text-xl font-display font-bold text-foreground group-hover:text-accent transition-colors line-clamp-1 mb-2">
                        {evt.title}
                      </h3>
                      <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed mb-4">
                        {evt.description}
                      </p>
                    </div>

                    {/* Event Meta Details */}
                    <div className="space-y-2 text-xs text-muted-foreground border-t border-border/50 pt-4 mb-4">
                      <div className="flex items-center gap-2">
                        <CalendarDays className="w-3.5 h-3.5 text-primary shrink-0" />
                        <span>{evt.date} • {evt.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
                        <span className="truncate">{evt.location}</span>
                      </div>
                      <div className="flex items-center justify-between pt-1">
                        <div className="flex items-center gap-1.5 text-foreground font-medium">
                          <Users className="w-3.5 h-3.5 text-accent shrink-0" />
                          <span>{evt.registered} / {evt.capacity} Registered</span>
                        </div>
                        <span className="text-emerald-600 font-semibold">{evt.revenue}</span>
                      </div>
                    </div>

                    {/* Registration Capacity Progress Bar */}
                    <div className="space-y-1 mb-5">
                      <div className="flex justify-between text-[11px] font-medium text-muted-foreground">
                        <span>Registration Capacity</span>
                        <span>{Math.round((evt.registered / evt.capacity) * 100)}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                        <div
                          className={`h-2 rounded-full transition-all duration-500 ${(evt.registered / evt.capacity) >= 0.9 ? 'bg-amber-500' : 'bg-primary'
                            }`}
                          style={{ width: `${(evt.registered / evt.capacity) * 100}%` }}
                        />
                      </div>
                    </div>

                    {/* Card Actions */}
                    <div className="flex items-center gap-2 pt-2 border-t border-border/50">
                      <Button
                        onClick={() => setSelectedEventModal(evt)}
                        variant="outline"
                        className="flex-1 h-9 text-xs rounded-xl gap-1.5"
                      >
                        <Eye className="w-3.5 h-3.5" /> Details
                      </Button>

                      <Button
                        onClick={() => {
                          setSelectedEventId(evt.id);
                          setActiveTab('checkin');
                        }}
                        variant="default"
                        className="flex-1 h-9 text-xs rounded-xl gap-1.5"
                      >
                        <QrCode className="w-3.5 h-3.5" /> QR Desk
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* Table View */
              <div className="rounded-2xl border border-border/80 bg-card overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-muted/60 text-xs uppercase font-semibold text-muted-foreground border-b border-border/80">
                      <tr>
                        <th className="px-6 py-4">Event Title</th>
                        <th className="px-6 py-4">Category</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4">Date & Time</th>
                        <th className="px-6 py-4">Registered</th>
                        <th className="px-6 py-4">Checked-In</th>
                        <th className="px-6 py-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/60">
                      {filteredEvents.map((evt) => (
                        <tr key={evt.id} className="hover:bg-muted/30 transition-colors">
                          <td className="px-6 py-4 font-semibold text-foreground">
                            <div>{evt.title}</div>
                            <div className="text-xs text-muted-foreground font-normal">{evt.location}</div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-xs px-2.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                              {evt.category}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            {evt.status === 'Live Now' && (
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 text-xs font-bold rounded-full bg-emerald-500/10 text-emerald-600 border border-emerald-500/30">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Live Now
                              </span>
                            )}
                            {evt.status === 'Upcoming' && (
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 text-xs font-medium rounded-full bg-blue-500/10 text-blue-600 border border-blue-500/20">
                                Upcoming
                              </span>
                            )}
                            {evt.status === 'Completed' && (
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 text-xs font-medium rounded-full bg-slate-500/10 text-slate-600 border border-slate-500/20">
                                Completed
                              </span>
                            )}
                          </td>
                          <td className="px-6 py-4 text-xs text-muted-foreground">
                            {evt.date} <br /> {evt.time}
                          </td>
                          <td className="px-6 py-4 font-medium text-foreground">
                            {evt.registered} / {evt.capacity}
                          </td>
                          <td className="px-6 py-4">
                            <span className="font-semibold text-accent-foreground">{evt.checkedIn}</span>
                            <span className="text-xs text-muted-foreground ml-1">
                              ({evt.registered > 0 ? Math.round((evt.checkedIn / evt.registered) * 100) : 0}%)
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <Button
                                onClick={() => setSelectedEventModal(evt)}
                                variant="outline"
                                className="h-8 px-3 text-xs rounded-lg"
                              >
                                View
                              </Button>
                              <Button
                                onClick={() => {
                                  setSelectedEventId(evt.id);
                                  setActiveTab('checkin');
                                }}
                                variant="default"
                                className="h-8 px-3 text-xs rounded-lg"
                              >
                                Check-in
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: LIVE QR CHECK-IN MONITOR */}
        {activeTab === 'checkin' && (
          <div className="space-y-6 animate-fade-in">
            {/* Live Check-in Header & Simulator Trigger */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-brand text-primary-foreground shadow-lg">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Radio className="w-4 h-4 text-accent animate-pulse" />
                  <span className="text-xs font-bold uppercase tracking-wider text-accent">Live Gate Monitoring</span>
                </div>
                <h2 className="text-2xl font-display font-bold">Real-time QR Scanner Feed</h2>
                <p className="text-xs md:text-sm text-primary-foreground/80">
                  Monitoring check-ins across venue gates for {selectedEventId === 'all' ? 'All Live Events' : events.find(e => e.id === selectedEventId)?.title}.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Button
                  onClick={triggerSimulatedScan}
                  variant="hero"
                  className="rounded-xl text-xs gap-2 shadow-md"
                >
                  <RefreshCw className="w-3.5 h-3.5" /> Simulate Incoming Scan
                </Button>
                <Button
                  onClick={() => setIsCheckInModalOpen(true)}
                  variant="outline"
                  className="rounded-xl text-xs gap-2 border-primary-foreground/20 bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/20"
                >
                  <Scan className="w-3.5 h-3.5 text-accent" /> Manual Lookup
                </Button>
              </div>
            </div>

            {/* Live Stream & Rapid Lookup Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

              {/* Scanned Feed List */}
              <div className="lg:col-span-8 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-display font-bold flex items-center gap-2">
                    <Activity className="w-4 h-4 text-accent" /> Recent Gate Activity Stream
                  </h3>
                  <span className="text-xs text-muted-foreground">Showing last {scans.length} verified scans</span>
                </div>

                <div className="space-y-3">
                  {scans.map((scan) => (
                    <div
                      key={scan.id}
                      className="p-4 rounded-xl border border-border/80 bg-card hover:border-accent/40 transition-all flex items-center justify-between shadow-sm animate-fade-in"
                    >
                      <div className="flex items-center gap-3.5">
                        <div className="w-10 h-10 rounded-full bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 flex items-center justify-center font-bold font-display text-sm">
                          {scan.name.charAt(0)}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold text-foreground text-sm">{scan.name}</h4>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                              {scan.tier}
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground flex items-center gap-2 mt-0.5">
                            <span>Code: <strong className="text-foreground font-mono">{scan.ticketId}</strong></span>
                            <span>•</span>
                            <span>{scan.event}</span>
                          </p>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full mb-1">
                          <CheckCircle2 className="w-3 h-3" /> {scan.status}
                        </span>
                        <p className="text-[11px] text-muted-foreground">{scan.gate} @ {scan.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Side Card: Quick Manual Scan Station */}
              <div className="lg:col-span-4 p-6 rounded-2xl border border-border/80 bg-card shadow-sm h-fit">
                <h3 className="text-base font-display font-bold mb-1 flex items-center gap-2">
                  <QrCode className="w-4 h-4 text-primary" /> On-Site Desk Check-In
                </h3>
                <p className="text-xs text-muted-foreground mb-4">
                  Quickly process attendee check-in if QR scanner camera is unavailable.
                </p>

                <form onSubmit={handleManualCheckIn} className="space-y-4">
                  <div>
                    <Label htmlFor="quick-ticket" className="text-xs mb-1.5 block">Ticket ID / Booking Ref</Label>
                    <Input
                      id="quick-ticket"
                      type="text"
                      placeholder="e.g. TK-84920"
                      value={manualTicketInput}
                      onChange={(e) => setManualTicketInput(e.target.value)}
                      className="font-mono text-sm uppercase"
                    />
                  </div>

                  <div>
                    <Label htmlFor="quick-name" className="text-xs mb-1.5 block">Attendee Full Name (Optional)</Label>
                    <Input
                      id="quick-name"
                      type="text"
                      placeholder="e.g. Rohan Verma"
                      value={manualNameInput}
                      onChange={(e) => setManualNameInput(e.target.value)}
                      className="text-sm"
                    />
                  </div>

                  <Button type="submit" variant="default" className="w-full rounded-xl text-xs gap-2">
                    <Check className="w-4 h-4" /> Validate & Pass Attendee
                  </Button>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: VOLUNTEER MANAGEMENT */}
        {activeTab === 'volunteers' && (
          <div className="space-y-6 animate-fade-in">
            {/* Header & Add Volunteer Action */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl border border-border/80 bg-card/60 backdrop-blur-sm">
              <div>
                <h3 className="text-lg font-display font-bold">Event Volunteer Roster</h3>
                <p className="text-xs text-muted-foreground">Assign tasks, monitor active shifts, and contact onboarded student volunteers.</p>
              </div>

              <Button
                onClick={() => setIsVolunteerModalOpen(true)}
                variant="hero"
                className="rounded-xl text-xs gap-2"
              >
                <UserCheck className="w-4 h-4" /> Assign New Volunteer
              </Button>
            </div>

            {/* Volunteer Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {volunteers.map((vol) => (
                <div key={vol.id} className="p-5 rounded-2xl border border-border/80 bg-card shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                        {vol.role}
                      </span>

                      <button
                        onClick={() => toggleVolunteerStatus(vol.id)}
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 text-xs font-semibold rounded-full border transition-all ${vol.status === 'On Duty'
                            ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/30'
                            : 'bg-amber-500/10 text-amber-600 border-amber-500/30'
                          }`}
                        title="Click to toggle status"
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${vol.status === 'On Duty' ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
                        {vol.status}
                      </button>
                    </div>

                    <h4 className="text-lg font-display font-bold text-foreground mb-1">{vol.name}</h4>
                    <p className="text-xs text-muted-foreground mb-3">{vol.event}</p>

                    <div className="space-y-1.5 text-xs text-muted-foreground bg-muted/40 p-3 rounded-xl mb-4">
                      <div className="flex justify-between">
                        <span>Shift Hours:</span>
                        <span className="font-semibold text-foreground">{vol.shift}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Contact:</span>
                        <span className="font-semibold text-foreground">{vol.phone}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-2 border-t border-border/60">
                    <Button
                      onClick={() => toggleVolunteerStatus(vol.id)}
                      variant="outline"
                      className="w-full text-xs rounded-xl h-9"
                    >
                      Toggle Duty Status
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: ANALYTICS & DEMOGRAPHICS */}
        {activeTab === 'analytics' && (
          <div className="space-y-6 animate-fade-in">
            <div className="p-6 rounded-2xl border border-border/80 bg-card shadow-sm">
              <h3 className="text-xl font-display font-bold mb-1">Live Event & Registration Analytics</h3>
              <p className="text-xs text-muted-foreground mb-6">Real-time demographic breakdowns and venue check-in velocity graphs.</p>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                {/* Graph 1: Check-in Hourly Peak Breakdown */}
                <div className="p-5 rounded-2xl bg-muted/30 border border-border/60">
                  <h4 className="text-sm font-display font-bold mb-1 flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-accent" /> Hourly Check-in Velocity (Peak Times)
                  </h4>
                  <p className="text-xs text-muted-foreground mb-4">Live scans per hour across all active venue gates.</p>

                  <div className="space-y-3 pt-2">
                    {[
                      { time: '08:00 AM - 09:00 AM', count: 85, pct: 35 },
                      { time: '09:00 AM - 10:00 AM', count: 240, pct: 90 },
                      { time: '10:00 AM - 11:00 AM', count: 180, pct: 70 },
                      { time: '11:00 AM - 12:00 PM', count: 95, pct: 40 },
                      { time: '12:00 PM - 01:00 PM', count: 130, pct: 55 },
                      { time: '01:00 PM - 02:00 PM', count: 65, pct: 25 },
                    ].map((item) => (
                      <div key={item.time} className="space-y-1">
                        <div className="flex justify-between text-xs font-medium">
                          <span>{item.time}</span>
                          <span className="font-bold text-foreground">{item.count} scans</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2.5 overflow-hidden">
                          <div
                            className="bg-accent h-2.5 rounded-full transition-all duration-500"
                            style={{ width: `${item.pct}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Graph 2: Department / Major Breakdown */}
                <div className="p-5 rounded-2xl bg-muted/30 border border-border/60">
                  <h4 className="text-sm font-display font-bold mb-1 flex items-center gap-2">
                    <Users className="w-4 h-4 text-primary" /> Attendee Department Breakdown
                  </h4>
                  <p className="text-xs text-muted-foreground mb-4">Distribution of registered students by academic faculty.</p>

                  <div className="space-y-4 pt-2">
                    {[
                      { dept: 'Computer Science & AI', count: 1420, pct: 42, color: 'bg-primary' },
                      { dept: 'Electrical & Electronics', count: 740, pct: 22, color: 'bg-accent' },
                      { dept: 'Mechanical & Robotics', count: 610, pct: 18, color: 'bg-emerald-500' },
                      { dept: 'Design & Media Arts', count: 380, pct: 11, color: 'bg-amber-500' },
                      { dept: 'Business & Management', count: 270, pct: 7, color: 'bg-purple-500' },
                    ].map((item) => (
                      <div key={item.dept} className="space-y-1">
                        <div className="flex justify-between text-xs font-medium">
                          <span className="flex items-center gap-2">
                            <span className={`w-2.5 h-2.5 rounded-full ${item.color}`} />
                            {item.dept}
                          </span>
                          <span className="font-bold text-foreground">{item.count} ({item.pct}%)</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2.5 overflow-hidden">
                          <div
                            className={`${item.color} h-2.5 rounded-full transition-all duration-500`}
                            style={{ width: `${item.pct}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          </div>
        )}

        {/* TAB 5: BROADCAST ANNOUNCEMENTS */}
        {activeTab === 'broadcast' && (
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

              <form onSubmit={handleSendBroadcast} className="space-y-5">
                <div>
                  <Label htmlFor="broadcast-target" className="text-sm font-semibold mb-1.5 block">Select Target Event / Audience</Label>
                  <select
                    id="broadcast-target"
                    value={broadcastTarget}
                    onChange={(e) => setBroadcastTarget(e.target.value)}
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
                      onClick={() => setBroadcastChannel('app')}
                      className={`p-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-all ${broadcastChannel === 'app' ? 'border-accent bg-accent/10 text-foreground' : 'border-border bg-background hover:bg-muted'
                        }`}
                    >
                      <Radio className="w-4 h-4 text-accent" /> In-App Push
                    </button>
                    <button
                      type="button"
                      onClick={() => setBroadcastChannel('email')}
                      className={`p-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-all ${broadcastChannel === 'email' ? 'border-accent bg-accent/10 text-foreground' : 'border-border bg-background hover:bg-muted'
                        }`}
                    >
                      <Send className="w-4 h-4 text-accent" /> Email Digest
                    </button>
                    <button
                      type="button"
                      onClick={() => setBroadcastChannel('sms')}
                      className={`p-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-all ${broadcastChannel === 'sms' ? 'border-accent bg-accent/10 text-foreground' : 'border-border bg-background hover:bg-muted'
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
                    placeholder="e.g. Attention Attendees: HackCampus keynote is starting in Main Tech Auditorium in 10 minutes. Please scan your QR code at Gate A."
                    value={broadcastMessage}
                    onChange={(e) => setBroadcastMessage(e.target.value)}
                    className="w-full rounded-xl border border-input bg-background p-4 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>

                <Button type="submit" variant="hero" className="w-full rounded-xl gap-2 h-12 text-sm shadow-md">
                  <Send className="w-4 h-4" /> Dispatch Broadcast Alert Now
                </Button>
              </form>
            </div>
          </div>
        )}

      </main>

      {/* MODAL 1: MANUAL CHECK-IN & QR SCANNER */}
      {isCheckInModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-card border border-border rounded-3xl p-6 md:p-8 max-w-md w-full shadow-2xl relative">
            <button
              onClick={() => setIsCheckInModalOpen(false)}
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

            <form onSubmit={handleManualCheckIn} className="space-y-4">
              <div>
                <Label htmlFor="modal-ticket" className="text-xs font-semibold">Ticket ID / QR Code Ref</Label>
                <Input
                  id="modal-ticket"
                  placeholder="TK-84920"
                  value={manualTicketInput}
                  onChange={(e) => setManualTicketInput(e.target.value)}
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
                  onChange={(e) => setManualNameInput(e.target.value)}
                  className="text-sm mt-1"
                />
              </div>

              <div className="pt-2 flex items-center gap-3">
                <Button type="button" variant="outline" onClick={() => setIsCheckInModalOpen(false)} className="flex-1 rounded-xl">
                  Cancel
                </Button>
                <Button type="submit" variant="hero" className="flex-1 rounded-xl">
                  Confirm Check-in
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: ASSIGN VOLUNTEER */}
      {isVolunteerModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-card border border-border rounded-3xl p-6 md:p-8 max-w-md w-full shadow-2xl relative">
            <button
              onClick={() => setIsVolunteerModalOpen(false)}
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

            <form onSubmit={handleAddVolunteer} className="space-y-4">
              <div>
                <Label htmlFor="vol-name" className="text-xs font-semibold">Volunteer Name</Label>
                <Input
                  id="vol-name"
                  placeholder="e.g. Rahul Sen"
                  value={newVolName}
                  onChange={(e) => setNewVolName(e.target.value)}
                  className="text-sm mt-1"
                  required
                />
              </div>

              <div>
                <Label htmlFor="vol-role" className="text-xs font-semibold">Assigned Role</Label>
                <select
                  id="vol-role"
                  value={newVolRole}
                  onChange={(e) => setNewVolRole(e.target.value)}
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
                  onChange={(e) => setNewVolEvent(e.target.value)}
                  className="w-full h-10 rounded-lg border border-input bg-background px-3 text-sm mt-1 focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  {events.map(e => (
                    <option key={e.id} value={e.title}>{e.title}</option>
                  ))}
                </select>
              </div>

              <div className="pt-2 flex items-center gap-3">
                <Button type="button" variant="outline" onClick={() => setIsVolunteerModalOpen(false)} className="flex-1 rounded-xl">
                  Cancel
                </Button>
                <Button type="submit" variant="hero" className="flex-1 rounded-xl">
                  Assign Volunteer
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: EVENT DETAILS */}
      {selectedEventModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-card border border-border rounded-3xl p-6 md:p-8 max-w-lg w-full shadow-2xl relative">
            <button
              onClick={() => setSelectedEventModal(null)}
              className="absolute right-5 top-5 p-1 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 inline-block mb-3">
              {selectedEventModal.category}
            </span>

            <h3 className="text-2xl font-display font-bold mb-2">{selectedEventModal.title}</h3>
            <p className="text-xs text-muted-foreground leading-relaxed mb-6">{selectedEventModal.description}</p>

            <div className="space-y-3 text-xs bg-muted/40 p-4 rounded-2xl mb-6">
              <div className="flex justify-between border-b border-border/50 pb-2">
                <span className="text-muted-foreground">Date & Schedule:</span>
                <span className="font-semibold text-foreground">{selectedEventModal.date} ({selectedEventModal.time})</span>
              </div>
              <div className="flex justify-between border-b border-border/50 pb-2">
                <span className="text-muted-foreground">Venue Location:</span>
                <span className="font-semibold text-foreground">{selectedEventModal.location}</span>
              </div>
              <div className="flex justify-between border-b border-border/50 pb-2">
                <span className="text-muted-foreground">Registration Stats:</span>
                <span className="font-semibold text-foreground">{selectedEventModal.registered} / {selectedEventModal.capacity} Seats</span>
              </div>
              <div className="flex justify-between border-b border-border/50 pb-2">
                <span className="text-muted-foreground">On-Site Checked-In:</span>
                <span className="font-semibold text-emerald-600 font-bold">{selectedEventModal.checkedIn} Attendees</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Volunteers Assigned:</span>
                <span className="font-semibold text-foreground">{selectedEventModal.volunteersAssigned} On-duty</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button
                onClick={() => {
                  setSelectedEventId(selectedEventModal.id);
                  setActiveTab('checkin');
                  setSelectedEventModal(null);
                }}
                variant="hero"
                className="w-full rounded-xl gap-2"
              >
                <QrCode className="w-4 h-4" /> Open Gate Check-in Desk
              </Button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
