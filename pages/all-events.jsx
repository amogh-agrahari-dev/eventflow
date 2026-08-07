import React, { useState, useEffect, useMemo } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { 
  Home, PlusSquare, History, Users, ClipboardList, 
  MessageSquare, UserPlus, Search, Bell, 
  MapPin, Settings, BarChart2, Check, LayoutTemplate, MessageCircle, Menu, Calendar, Clock, Image as ImageIcon
} from 'lucide-react';
import Logo from '@/components/general/Logo';
import Sidebar from '@/components/general/Sidebar';
import { Input, Button } from '@/components/ui';
import SwitchRoleButton from '@/components/general/SwitchRoleButton';
import ProfileDropdown from '@/components/general/ProfileDropdown';
import AttendeeLayout from '@/components/dashboard/attendee/AttendeeLayout';
import VolunteerLayout from '@/components/dashboard/volunteer/VolunteerLayout';

export default function AllEventsPage() {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDesktopSidebarCollapsed, setIsDesktopSidebarCollapsed] = useState(false);
  
  // State for filtering & searching
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');
  const [formatFilter, setFormatFilter] = useState('All');
  const [availabilityFilter, setAvailabilityFilter] = useState('All');
  const [sortBy, setSortBy] = useState('Newest First');
  
  const [isLoading, setIsLoading] = useState(true);

  const [events, setEvents] = React.useState([]);
      const getEvents = async () => {
          try {
              const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/events/all`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
              const data = await response.json();
              console.log(data)
              if (Array.isArray(data)) {
                  setEvents(data);
              } else if (data && data.success && Array.isArray(data.events)) {
                  setEvents(data.events);
              } else if (data && Array.isArray(data.data)) {
                  setEvents(data.data);
              }
          } catch (error) {
              console.error("Error fetching events:", error);
          }
      }
  
      React.useEffect(() => {
          getEvents();
          console.log(events);
          
      }, []);
  

  // Simulate network request
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const publishedEvents = useMemo(() => {
    return events;
  }, [events]);

  const filteredAndSortedEvents = useMemo(() => {
    let result = [...publishedEvents];

    // Search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(e => 
        e.title?.toLowerCase().includes(q) || 
        e.location?.toLowerCase().includes(q) ||
        e.category?.toLowerCase().includes(q)
      );
    }

    // Category
    if (categoryFilter !== 'All') {
      result = result.filter(e => e.category?.toLowerCase() === categoryFilter.toLowerCase());
    }

    // Type
    if (typeFilter !== 'All') {
      const isFreeFilter = typeFilter === 'Free';
      result = result.filter(e => e.is_free === isFreeFilter);
    }

    // Format
    if (formatFilter !== 'All') {
      result = result.filter(e => e.format?.toLowerCase() === formatFilter.toLowerCase());
    }

    // Availability
    if (availabilityFilter !== 'All') {
      if (availabilityFilter === 'Registration Open') {
        result = result.filter(e => (e.registered || 0) < e.max_attendees);
      } else if (availabilityFilter === 'Registration Closed') {
        result = result.filter(e => (e.registered || 0) >= e.max_attendees);
      }
    }

    // Sorting
    result.sort((a, b) => {
      if (sortBy === 'Newest First') return new Date(b.created_at || b.start_time) - new Date(a.created_at || a.start_time);
      if (sortBy === 'Oldest First') return new Date(a.created_at || a.start_time) - new Date(b.created_at || b.start_time);
      if (sortBy === 'Start Date') return new Date(a.start_time) - new Date(b.start_time);
      if (sortBy === 'End Date') return new Date(a.end_time) - new Date(b.end_time);
      if (sortBy === 'Most Attendees') return b.max_attendees - a.max_attendees;
      if (sortBy === 'Alphabetical (A-Z)') return (a.title || '').localeCompare(b.title || '');
      return 0;
    });

    return result;
  }, [publishedEvents, searchQuery, categoryFilter, typeFilter, formatFilter, availabilityFilter, sortBy]);

  const isAttendee = router.query.role === 'attendee';

  const pageContent = (
    <div className="max-w-[1400px] mx-auto space-y-6">
            
            {/* Search and Filters Bar */}
            <div className="bg-vol-card border border-vol-border rounded-2xl p-4 flex flex-col gap-4 sticky top-0 z-20 shadow-lg shadow-black/20 backdrop-blur-xl">
              <div className="flex flex-col md:flex-row gap-4 items-center">
                <div className="relative flex-1 w-full">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input 
                    type="text"
                    placeholder="Search events by title, category, or location..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-vol-bg/50 border border-vol-border rounded-full py-2 pl-10 pr-4 text-[13px] text-white focus:outline-none focus:border-vol-accent/50 transition-colors placeholder:text-gray-400"
                  />
                </div>
                <div className="flex gap-3 w-full md:w-auto overflow-x-auto pb-1 md:pb-0 custom-scrollbar">
                  <select 
                    className="bg-vol-bg border border-vol-border text-sm text-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:border-vol-accent/50 transition-colors shrink-0"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option className="bg-vol-bg text-slate-200">Newest First</option>
                    <option className="bg-vol-bg text-slate-200">Oldest First</option>
                    <option className="bg-vol-bg text-slate-200">Start Date</option>
                    <option className="bg-vol-bg text-slate-200">End Date</option>
                    <option className="bg-vol-bg text-slate-200">Most Attendees</option>
                    <option className="bg-vol-bg text-slate-200">Alphabetical (A-Z)</option>
                  </select>
                </div>
              </div>
              
              <div className="flex gap-3 flex-wrap items-center">
                <FilterDropdown 
                  label="Category" 
                  value={categoryFilter}
                  options={['All', 'Workshop', 'Seminar', 'Competition', 'Hackathon', 'Cultural', 'Sports', 'Technical', 'Conference', 'Festival']}
                  onChange={setCategoryFilter}
                />
                <FilterDropdown 
                  label="Type" 
                  value={typeFilter}
                  options={['All', 'Free', 'Paid']}
                  onChange={setTypeFilter}
                />
                <FilterDropdown 
                  label="Format" 
                  value={formatFilter}
                  options={['All', 'Online', 'Offline']}
                  onChange={setFormatFilter}
                />
                <FilterDropdown 
                  label="Availability" 
                  value={availabilityFilter}
                  options={['All', 'Registration Open', 'Registration Closed']}
                  onChange={setAvailabilityFilter}
                />
              </div>
            </div>

            {/* Event Grid */}
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="bg-vol-card border border-vol-border rounded-2xl p-5 h-[320px] animate-pulse flex flex-col">
                    <div className="w-full h-32 bg-vol-border rounded-xl mb-4"></div>
                    <div className="h-5 w-3/4 bg-vol-border rounded mb-2"></div>
                    <div className="h-4 w-1/2 bg-vol-border rounded mb-6"></div>
                    <div className="flex gap-2 mt-auto">
                      <div className="h-8 w-20 bg-vol-border rounded-full"></div>
                      <div className="h-8 w-20 bg-vol-border rounded-full"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredAndSortedEvents.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center bg-vol-card border border-vol-border rounded-2xl border-dashed">
                <div className="w-16 h-16 bg-vol-border/50 rounded-full flex items-center justify-center mb-4">
                  <Calendar className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">No events found</h3>
                <p className="text-gray-400 max-w-md">
                  No published events match your current filters. Try adjusting your search criteria or clear filters to see more results.
                </p>
                <Button 
                  className="mt-6 bg-vol-accent hover:bg-vol-accent/80 text-white"
                  onClick={() => {
                    setSearchQuery('');
                    setCategoryFilter('All');
                    setTypeFilter('All');
                    setFormatFilter('All');
                    setAvailabilityFilter('All');
                  }}
                >
                  Clear All Filters
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredAndSortedEvents.map(event => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            )}
            
    </div>
  );

  const isVolunteer = router.query.role === 'volunteer';

  if (isAttendee) {
    return (
      <>
        <Head>
          <title>Browse Events | EventFlow</title>
        </Head>
        <AttendeeLayout>
          {pageContent}
        </AttendeeLayout>
      </>
    );
  }

  if (isVolunteer) {
    return (
      <>
        <Head>
          <title>Browse Events | EventFlow</title>
        </Head>
        <VolunteerLayout>
          {pageContent}
        </VolunteerLayout>
      </>
    );
  }

  return (
    <div className="flex h-screen bg-vol-bg text-slate-300 font-sans overflow-hidden selection:bg-vol-accent/30">
      <Head>
        <title>All Events | EventFlow</title>
      </Head>
      
      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden" 
          onClick={() => setIsMobileMenuOpen(false)} 
        />
      )}

      {/* 1. Sidebar */}
      <Sidebar isMobileMenuOpen={isMobileMenuOpen} isDesktopSidebarCollapsed={isDesktopSidebarCollapsed} />

      {/* 2. Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden relative min-w-0 bg-vol-bg">
        
        {/* Top Header */}
        <header className="h-[68px] flex items-center justify-between px-4 md:px-8 bg-vol-bg/80 backdrop-blur-sm border-b border-vol-border z-10 flex-shrink-0">
          <div className="flex items-center gap-3">
            <button 
              className="md:hidden text-slate-400 hover:text-white transition-colors"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </button>
            <button 
              className="hidden md:block text-slate-400 hover:text-white transition-colors"
              onClick={() => setIsDesktopSidebarCollapsed(!isDesktopSidebarCollapsed)}
            >
              <Menu className="w-5 h-5" />
            </button>
            <h1 className="text-[22px] font-medium text-white truncate">All Published Events</h1>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="relative p-2 text-gray-400 hover:text-white transition-colors cursor-pointer">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-amber-500 rounded-full border-2 border-vol-bg"></span>
            </button>

            {/* Switch Role Button */}
            <SwitchRoleButton currentRole="Organizer" />

            {/* Profile Dropdown Menu */}
            <ProfileDropdown currentRole="Organizer" />
          </div>
        </header>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-4 md:p-8">
          {pageContent}
        </div>
      </main>
    </div>
  );
}

// Reusable Sub-components for this page
function FilterDropdown({ label, value, options, onChange }) {
  return (
    <div className="flex items-center gap-2 bg-vol-bg border border-vol-border rounded-lg px-3 py-1.5 shrink-0">
      <span className="text-xs text-gray-400 font-medium">{label}:</span>
      <select 
        className="bg-transparent text-sm text-slate-200 focus:outline-none cursor-pointer"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map(opt => (
          <option key={opt} value={opt} className="bg-vol-bg text-slate-200">{opt}</option>
        ))}
      </select>
    </div>
  );
}

function EventCard({ event }) {
  const registered = event.registered || 0;
  const isFull = registered >= event.max_attendees;
  const progressPercent = Math.min(100, Math.round((registered / Math.max(event.max_attendees, 1)) * 100));
  const formatCapitalized = event.format ? event.format.charAt(0).toUpperCase() + event.format.slice(1).toLowerCase() : '';
  
  return (
    <Link 
      href={`/events/${event.id}`}
      className="cursor-pointer group bg-vol-card border border-vol-border rounded-2xl overflow-hidden hover:border-vol-accent/50 hover:shadow-[0_0_20px_rgba(110,86,207,0.1)] transition-all duration-300 flex flex-col h-full block"
    >
      {/* Card Header / Image Placeholder */}
      <div 
        className="h-32 bg-gradient-to-br from-vol-bg to-vol-bg relative p-4 flex items-start justify-between bg-cover bg-center"
        style={event.banner_url ? { backgroundImage: `url(${event.banner_url})` } : {}}
      >
        <div className="flex gap-2">
          <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-vol-accent/20 text-vol-accent2 border border-vol-accent/30 backdrop-blur-md">
            {event.category}
          </span>
          <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border backdrop-blur-md ${event.is_free ? 'bg-emerald-500/20 text-emerald-500 border-emerald-500/30' : 'bg-amber-500/20 text-amber-500 border-amber-500/30'}`}>
            {event.is_free ? 'Free' : 'Paid'}
          </span>
        </div>
        <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border backdrop-blur-md ${formatCapitalized === 'Online' ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' : 'bg-pink-500/20 text-pink-400 border-pink-500/30'}`}>
          {formatCapitalized}
        </span>
        {!event.banner_url && <ImageIcon className="absolute inset-0 m-auto w-10 h-10 text-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />}
      </div>

      {/* Card Body */}
      <div className="p-5 flex-1 flex flex-col">
        <h3 className="text-lg font-semibold text-white leading-tight mb-2 group-hover:text-vol-accent2 transition-colors line-clamp-2">
          {event.title}
        </h3>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <Calendar className="w-3.5 h-3.5" />
            <span>{new Date(event.start_time).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <Clock className="w-3.5 h-3.5" />
            <span>{new Date(event.start_time).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <MapPin className="w-3.5 h-3.5" />
            <span className="truncate">{event.location}</span>
          </div>
        </div>

        <p className="text-xs text-gray-400 line-clamp-2 mb-6 flex-1">
          {event.description}
        </p>

        {/* Capacity Progress */}
        <div className="mt-auto">
          <div className="flex justify-between items-end mb-1.5">
            <span className="text-[11px] font-medium text-gray-400">Registration</span>
            <span className={`text-[11px] font-bold ${isFull ? 'text-rose-400' : 'text-vol-accent2'}`}>
              {registered.toLocaleString()} / {event.max_attendees?.toLocaleString() || 0}
            </span>
          </div>
          <div className="h-1.5 w-full bg-vol-bg rounded-full overflow-hidden">
            <div 
              className={`h-full rounded-full transition-all duration-500 ${isFull ? 'bg-rose-500' : 'bg-gradient-to-r from-vol-accent to-vol-accent2'}`}
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="flex justify-between items-center mt-3 pt-3 border-t border-vol-border">
            <span className="text-[11px] text-gray-400">Volunteers: {event.volunteers_required}</span>
            {isFull ? (
              <span className="text-[11px] font-bold text-rose-400">Sold Out</span>
            ) : (
              <span className="text-[11px] font-bold text-emerald-500">Open</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
