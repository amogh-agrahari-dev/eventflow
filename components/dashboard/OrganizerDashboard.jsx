import React, { useState, useEffect } from 'react';
import { Responsive as ResponsiveGridLayout } from 'react-grid-layout';
import Link from 'next/link';
import { useUserStore } from '@/store/userStore';
import { getToken } from '@/lib/auth';
import {
  Home, CalendarDays, PlusSquare, History, Users, ClipboardList,
  MessageSquare, UserPlus, LogOut, Search, Bell, Plus, MoreHorizontal,
  MapPin, CheckCircle2, ChevronRight, Settings, BarChart2, Briefcase, Mail, QrCode, X, SlidersHorizontal, Menu,
  MonitorPlay, LayoutTemplate, MessageCircle, Check
} from 'lucide-react';

function AutoWidthGrid(props) {
  const containerRef = React.useRef(null);
  const [width, setWidth] = useState(1200);

  useEffect(() => {
    const observer = new ResizeObserver(entries => {
      for (let entry of entries) {
        setWidth(entry.contentRect.width);
      }
    });
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full">
      <ResponsiveGridLayout width={width} {...props} />
    </div>
  );
}


const WIDGETS = [
  { id: 'upcoming-events', title: 'Upcoming Events' },
  { id: 'volunteer-assignments', title: 'Volunteer Assignments' },
  { id: 'live-performance', title: 'Live Performance Hub' },
  { id: 'live-checkin', title: 'Live Check-in Feed' },
  { id: 'volunteer-central', title: 'Volunteer Central' },
  { id: 'event-analytics', title: 'Event Analytics' },
  { id: 'recent-registrations', title: 'Recent Registrations' },
  { id: 'team-members', title: 'Team Members' },
  { id: 'recent-activities', title: 'Recent Activities' },
  { id: 'calendar', title: 'Calendar' }
];

const DEFAULT_LAYOUT = [
  { i: 'upcoming-events', x: 0, y: 0, w: 3, h: 4, minW: 2, minH: 3 },
  { i: 'volunteer-assignments', x: 3, y: 0, w: 3, h: 4, minW: 2, minH: 3 },
  { i: 'live-performance', x: 6, y: 0, w: 3, h: 4, minW: 2, minH: 3 },
  { i: 'volunteer-central', x: 9, y: 0, w: 3, h: 4, minW: 2, minH: 3 },
  { i: 'event-analytics', x: 0, y: 4, w: 6, h: 3, minW: 4, minH: 3 },
  { i: 'recent-registrations', x: 6, y: 4, w: 3, h: 3, minW: 2, minH: 3 },
  { i: 'team-members', x: 9, y: 4, w: 3, h: 3, minW: 2, minH: 3 },
  { i: 'recent-activities', x: 0, y: 7, w: 3, h: 4, minW: 2, minH: 3 },
  { i: 'calendar', x: 3, y: 7, w: 3, h: 4, minW: 2, minH: 3 },
  { i: 'live-checkin', x: 6, y: 7, w: 3, h: 4, minW: 2, minH: 3 }
];

export default function OrganizerDashboard() {
  const [isMounted, setIsMounted] = useState(false);
  const [layouts, setLayouts] = useState({ lg: DEFAULT_LAYOUT });
  const [visibleWidgets, setVisibleWidgets] = useState(new Set(WIDGETS.map(w => w.id)));
  const [showCustomizePanel, setShowCustomizePanel] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDesktopSidebarCollapsed, setIsDesktopSidebarCollapsed] = useState(false);

  const { user, fetchUser } = useUserStore();
  const token = getToken();

  useEffect(() => {
    if (token && !user) {
      fetchUser();
    }
  }, [token, user, fetchUser]);

  useEffect(() => {
    setIsMounted(true);
    try {
      const savedLayout = localStorage.getItem('organizer_layout');
      const savedVisible = localStorage.getItem('organizer_visible');
      if (savedLayout) setLayouts(JSON.parse(savedLayout));
      if (savedVisible) setVisibleWidgets(new Set(JSON.parse(savedVisible)));
    } catch (e) {
      console.error("Could not load layout from local storage", e);
    }
  }, []);

  const handleLayoutChange = (layout, allLayouts) => {
    setLayouts(allLayouts);
    if (isMounted) {
      localStorage.setItem('organizer_layout', JSON.stringify(allLayouts));
    }
  };

  const toggleWidget = (id) => {
    setVisibleWidgets(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
        setLayouts(prevLayouts => {
          const newLayouts = { ...prevLayouts };
          Object.keys(newLayouts).forEach(breakpoint => {
            const layoutArr = newLayouts[breakpoint] || [];
            if (!layoutArr.find(item => item.i === id)) {
              const defaultItem = DEFAULT_LAYOUT.find(item => item.i === id);
              if (defaultItem) {
                // Push to bottom (y: Infinity is supported by react-grid-layout to append)
                newLayouts[breakpoint] = [...layoutArr, { ...defaultItem, y: Infinity }];
              }
            }
          });
          if (isMounted) localStorage.setItem('organizer_layout', JSON.stringify(newLayouts));
          return newLayouts;
        });
      }
      if (isMounted) localStorage.setItem('organizer_visible', JSON.stringify(Array.from(next)));
      return next;
    });
  };

  const resetDashboard = () => {
    setLayouts({ lg: DEFAULT_LAYOUT });
    setVisibleWidgets(new Set(WIDGETS.map(w => w.id)));
    localStorage.removeItem('organizer_layout');
    localStorage.removeItem('organizer_visible');
  };

  // Do not render the grid until client-side hydration is complete to avoid layout mismatch
  if (!isMounted) {
    return <div className="h-screen bg-[#1c1f26]"></div>;
  }

  return (
    <div className="flex h-screen bg-[#161B23] text-slate-300 font-sans overflow-hidden selection:bg-[#6E56CF]/30">

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* 1. Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 bg-[#11141A] border-[#1C202B] flex flex-col shrink-0 overflow-hidden transform transition-all duration-300 md:relative md:translate-x-0 ${isMobileMenuOpen ? 'translate-x-0 w-[260px] border-r' : '-translate-x-full w-[260px] border-r'} ${isDesktopSidebarCollapsed ? 'md:w-0 md:border-r-0' : 'md:w-[260px] md:border-r'}`}>
        <div className="w-[260px] h-full flex flex-col overflow-y-auto custom-scrollbar">
          {/* Brand / Logo Area */}
          <div className="p-6 flex items-center gap-3 border-b border-[#1C202B]/60 shrink-0">
            <div className="w-8 h-8 rounded-full bg-[#6E56CF] flex items-center justify-center text-white font-bold text-lg">
              E
            </div>
            <span className="font-semibold text-lg tracking-wide text-white">EventFlow</span>
          </div>

          <div className="px-4 py-2 space-y-6">
            <div>
              <div className="flex items-center gap-3 px-3 py-2 bg-[#2D3340]/40 text-[#00E5FF] border border-[#3A455A] rounded-lg cursor-pointer">
                <Home className="w-[18px] h-[18px] text-[#00E5FF]" />
                <span className="text-[13px] font-medium text-white flex-1">Dashboard</span>
                <Check className="w-4 h-4 text-[#00E5FF]" />
              </div>
            </div>

            <div>
              <h3 className="px-3 text-[11px] font-semibold text-[#5A6B8A] uppercase tracking-wider mb-2">EVENT STUDIO</h3>
              <div className="space-y-0.5">
                <Link href="/events/add" className="flex items-center gap-3 px-3 py-2 text-[#8F9BB3] hover:text-white transition-colors rounded-lg">
                  <PlusSquare className="w-[18px] h-[18px]" />
                  <span className="text-[13px] font-medium">Create New</span>
                </Link>
                <Link href="#" className="flex items-center gap-3 px-3 py-2 text-[#8F9BB3] hover:text-white transition-colors rounded-lg">
                  <LayoutTemplate className="w-[18px] h-[18px]" />
                  <span className="text-[13px] font-medium">Templates</span>
                </Link>
                <Link href="#" className="flex items-center gap-3 px-3 py-2 text-[#8F9BB3] hover:text-white transition-colors rounded-lg">
                  <History className="w-[18px] h-[18px]" />
                  <span className="text-[13px] font-medium">Past Events</span>
                </Link>
              </div>
            </div>

            <div>
              <h3 className="px-3 text-[11px] font-semibold text-[#5A6B8A] uppercase tracking-wider mb-2">VOLUNTEER HUB</h3>
              <div className="space-y-0.5">
                <Link href="#" className="flex items-center gap-3 px-3 py-2 text-[#8F9BB3] hover:text-white transition-colors rounded-lg">
                  <Users className="w-[18px] h-[18px]" />
                  <span className="text-[13px] font-medium">Directory</span>
                </Link>
                <Link href="#" className="flex items-center gap-3 px-3 py-2 text-[#8F9BB3] hover:text-white transition-colors rounded-lg">
                  <ClipboardList className="w-[18px] h-[18px]" />
                  <span className="text-[13px] font-medium">Rosters</span>
                </Link>
                <Link href="#" className="flex items-center gap-3 px-3 py-2 text-[#8F9BB3] hover:text-white transition-colors rounded-lg">
                  <MessageSquare className="w-[18px] h-[18px]" />
                  <span className="text-[13px] font-medium">Feedback</span>
                </Link>
              </div>
            </div>

            <div>
              <h3 className="px-3 text-[11px] font-semibold text-[#5A6B8A] uppercase tracking-wider mb-2">ATTENDEE MANAGEMENT</h3>
              <div className="space-y-0.5">
                <Link href="#" className="flex items-center gap-3 px-3 py-2 text-[#8F9BB3] hover:text-white transition-colors rounded-lg">
                  <UserPlus className="w-[18px] h-[18px]" />
                  <span className="text-[13px] font-medium">Registrations</span>
                </Link>
                <Link href="#" className="flex items-center gap-3 px-3 py-2 text-[#8F9BB3] hover:text-white transition-colors rounded-lg">
                  <Check className="w-[18px] h-[18px]" />
                  <span className="text-[13px] font-medium">Check-in Stations</span>
                </Link>
              </div>
            </div>

            <div>
              <h3 className="px-3 text-[11px] font-semibold text-[#5A6B8A] uppercase tracking-wider mb-2">COMMUNICATIONS</h3>
              <div className="space-y-0.5">
                <Link href="#" className="flex items-center gap-3 px-3 py-2 text-[#8F9BB3] hover:text-white transition-colors rounded-lg">
                  <MessageCircle className="w-[18px] h-[18px]" />
                  <span className="text-[13px] font-medium">Messaging</span>
                </Link>
                <Link href="#" className="flex items-center gap-3 px-3 py-2 text-[#8F9BB3] hover:text-white transition-colors rounded-lg">
                  <Mail className="w-[18px] h-[18px]" />
                  <span className="text-[13px] font-medium">Email campaigns</span>
                </Link>
              </div>
            </div>

            <div>
              <h3 className="px-3 text-[11px] font-semibold text-[#5A6B8A] uppercase tracking-wider mb-2">ANALYTICS PRO</h3>
              <div className="space-y-0.5">
                <Link href="#" className="flex items-center gap-3 px-3 py-2 text-[#8F9BB3] hover:text-white transition-colors rounded-lg">
                  <BarChart2 className="w-[18px] h-[18px]" />
                  <span className="text-[13px] font-medium">Custom Reports</span>
                </Link>
                <Link href="#" className="flex items-center gap-3 px-3 py-2 text-[#8F9BB3] hover:text-white transition-colors rounded-lg">
                  <Settings className="w-[18px] h-[18px]" />
                  <span className="text-[13px] font-medium">General</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* 2. Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden relative min-w-0 bg-[#161B23]">

        {/* Top Header */}
        <header className="h-[68px] flex items-center justify-between px-4 md:px-8 bg-[#161B23]/80 backdrop-blur-sm border-b border-[#1C202B] z-10 flex-shrink-0">
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
            <h1 className="text-[22px] font-medium text-white truncate">
              {user?.name ? `${user.name}'s Dashboard` : "Dashboard"}
            </h1>
          </div>

          <div className="flex items-center gap-2 md:gap-4 flex-1 justify-end min-w-0">
            <div className="relative w-full max-w-[200px] md:w-64 hidden sm:block">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#5A6B8A]" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full bg-[#11141A] border border-[#2A3140] rounded-full py-2 pl-9 pr-4 text-[13px] text-white focus:outline-none focus:border-[#6E56CF]/50 transition-colors placeholder:text-[#5A6B8A]"
              />
            </div>

            <button className="flex items-center gap-2 bg-[#6E56CF] hover:bg-[#5a46aa] text-white px-5 py-2 rounded-full text-sm font-medium transition-colors shadow-[0_0_15px_rgba(79,70,229,0.3)]">
              <Plus className="w-4 h-4" /> Quick-Add
            </button>

            {/* Customize Dashboard Button */}
            <button
              onClick={() => setShowCustomizePanel(true)}
              className="flex items-center gap-2 bg-[#11141A] border border-[#2A3140] hover:bg-[#1C202B] text-slate-300 px-3 md:px-4 py-2 rounded-full text-xs md:text-sm font-medium transition-colors whitespace-nowrap"
            >
              <SlidersHorizontal className="w-4 h-4" /> <span className="hidden sm:inline">Customize</span>
            </button>

            <button className="relative p-2 text-[#5A6B8A] hover:text-white transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-[#161B23]" />
            </button>

            <div className="w-8 h-8 rounded-full bg-[#6E56CF] cursor-pointer shadow-sm border border-[#2A3140] flex items-center justify-center text-white text-[11px] font-bold">
              {user?.name ? user.name.split(" ").map(n => n[0]).join("").toUpperCase() : "U"}
            </div>
          </div>
        </header>

        {/* Dashboard Grid Content */}
        <div className="flex-1 overflow-y-auto p-6 custom-scrollbar relative flex flex-col">
          <AutoWidthGrid
            className="layout"
            layouts={layouts}
            breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
            cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
            rowHeight={90}
            onLayoutChange={handleLayoutChange}
            draggableHandle=".drag-handle"
            margin={[20, 20]}
            isResizable={true}
            isDraggable={true}
            resizeHandles={['s', 'w', 'e', 'n', 'sw', 'nw', 'se', 'ne']}
          >
            {DEFAULT_LAYOUT.filter(l => visibleWidgets.has(l.i)).map(l => (
              <div key={l.i} className="flex flex-col h-full w-full bg-transparent">
                {renderWidget(l.i)}
              </div>
            ))}
          </AutoWidthGrid>
        </div>

        {/* Fixed Footer */}
        <div className="absolute bottom-4 right-6 flex items-center gap-3 text-[10px] text-slate-500 bg-[#161B23]/80 backdrop-blur px-4 py-1.5 rounded-full border border-[#2A3140] shadow-lg z-10">
          <span className="hover:text-slate-300 cursor-pointer transition-colors">Help Center</span>
          <span className="w-px h-3 bg-slate-600"></span>
          <span className="hover:text-slate-300 cursor-pointer transition-colors">API Docs</span>
        </div>

        {/* Customize Panel Overlay */}
        {showCustomizePanel && (
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm z-40" onClick={() => setShowCustomizePanel(false)} />
        )}

        {/* Customize Panel */}
        <div className={`absolute top-0 right-0 h-full w-80 bg-[#11141A] border-l border-[#2A3140] shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${showCustomizePanel ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex items-center justify-between p-4 border-b border-[#2A3140]">
            <h2 className="text-[15px] font-medium text-white">Customize Layout</h2>
            <button onClick={() => setShowCustomizePanel(false)} className="text-[#8F9BB3] hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
            <p className="text-xs text-slate-400 mb-2">Toggle widgets to show or hide them from your dashboard. Drag by headers to rearrange.</p>

            {WIDGETS.map(widget => (
              <label
                key={widget.id}
                onClick={(e) => { e.preventDefault(); toggleWidget(widget.id); }}
                className="flex items-center justify-between p-3 rounded-lg border border-[#2A3140] hover:bg-[#1C202B] cursor-pointer transition-colors group"
              >
                <span className="text-sm font-medium text-slate-300 group-hover:text-white">{widget.title}</span>
                <div className={`w-10 h-5 rounded-full transition-colors relative ${visibleWidgets.has(widget.id) ? 'bg-emerald-500' : 'bg-slate-700'}`}>
                  <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-transform ${visibleWidgets.has(widget.id) ? 'left-6' : 'left-1'}`} />
                </div>
              </label>
            ))}
          </div>

          <div className="p-4 border-t border-[#2A3140]">
            <button
              onClick={resetDashboard}
              className="w-full bg-rose-500/10 text-rose-400 hover:bg-rose-500 hover:text-white py-2 rounded-lg text-sm font-semibold transition-colors"
            >
              Reset to Default Layout
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

/* WIDGET RENDERER */
function renderWidget(id) {
  switch (id) {
    case 'upcoming-events':
      return <UpcomingEventsWidget />;
    case 'volunteer-assignments':
      return <VolunteerAssignmentsWidget />;
    case 'live-performance':
      return <LivePerformanceWidget />;
    case 'live-checkin':
      return <LiveCheckInWidget />;
    case 'volunteer-central':
      return <VolunteerCentralWidget />;
    case 'event-analytics':
      return <EventAnalyticsWidget />;
    case 'recent-registrations':
      return <RecentRegistrationsWidget />;
    case 'team-members':
      return <TeamMembersWidget />;
    case 'recent-activities':
      return <RecentActivitiesWidget />;
    case 'calendar':
      return <CalendarWidget />;
    default:
      return null;
  }
}

/* -------------------------------------------------------------------------- */
/* WIDGET COMPONENTS */
/* -------------------------------------------------------------------------- */

function UpcomingEventsWidget() {
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const { user } = useUserStore();

  const fetchUpcomingEvents = async () => {
    if (!user?.id) return;
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/events/${user.id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log(data)
      if (Array.isArray(data)) {
        setUpcomingEvents(data.slice(0, 4));
      } else if (data && data.success && Array.isArray(data.events)) {
        setUpcomingEvents(data.events.slice(0, 4));
      } else if (data && Array.isArray(data.data)) {
        setUpcomingEvents(data.data.slice(0, 4));
      }
    } catch (error) {
      console.error("Error fetching upcoming events:", error);
    }
  };

  useEffect(() => {
    if (user?.id) {
      fetchUpcomingEvents();
    }
  }, [user?.id]);

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <Card title="Upcoming Events" action={<Badge>Preparing ▾</Badge>}>
      <div className="space-y-3 mt-1 flex-1 overflow-y-auto no-scrollbar">
        {upcomingEvents?.map((event, i) => (
          <EventItem
            key={event?.id || i}
            title={event?.title}
            date={formatDate(event?.start_time)}
            reg={`${event?.max_attendees || 0} regs`}
            vol={event?.volunteers_required}
            color={['bg-indigo-500', 'bg-emerald-500', 'bg-orange-500', 'bg-pink-500'][i % 4]}
          />
        ))}
      </div>
      <button className="w-full mt-4 bg-[#6E56CF]/20 text-[#00E5FF] hover:bg-[#6E56CF] hover:text-white py-2 rounded-lg text-sm font-semibold transition-colors flex items-center justify-center gap-1 shrink-0">
        View Details <ChevronRight className="w-4 h-4" />
      </button>
    </Card>
  );
}

function VolunteerAssignmentsWidget() {
  return (
    <Card title="Volunteer Assignments" action={<Badge color="emerald">Active ▾</Badge>}>
      <div className="flex justify-between text-xs text-slate-500 mb-2 px-1 shrink-0">
        <span>Events</span>
      </div>
      <div className="space-y-3 flex-1 overflow-y-auto no-scrollbar">
        <AssignmentItem name="Alex Chen" role="Team Volunteer" />
        <AssignmentItem name="Maria Nones" role="Team Volunteer" />
        <AssignmentItem name="Alex Chen" role="Team Volunteer" />
        <AssignmentItem name="Maria Namies" role="Team Volunteer" />
        <AssignmentItem name="Alex Chen" role="Team Volunteer" />
      </div>
    </Card>
  );
}

function LivePerformanceWidget() {
  return (
    <Card title="Live Performance Hub" action={<MoreHorizontal className="w-4 h-4 text-slate-500" />}>
      <div className="mt-2 flex justify-between items-end">
        <div>
          <p className="text-xs text-slate-400 mb-1">Live Attendance Counter</p>
          <div className="text-3xl font-bold text-white flex items-baseline gap-1">
            2,354 <span className="text-xs text-slate-400 font-normal">attendees</span>
          </div>
        </div>
        <div className="w-20 h-8 flex items-end justify-between gap-0.5">
          {[3, 5, 4, 7, 5, 8, 6].map((h, i) => (
            <div key={i} className="w-full bg-emerald-500/50 rounded-t-sm" style={{ height: `${h}0%` }} />
          ))}
        </div>
      </div>
      <div className="mt-3 text-[10px] text-emerald-400 font-medium flex items-center gap-1 bg-emerald-500/10 w-fit px-2 py-1 rounded shrink-0">
        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> real-time sync
      </div>
    </Card>
  );
}

function LiveCheckInWidget() {
  return (
    <Card title="Live Check-in feed" action={<Badge>Check-in ▾</Badge>}>
      <div className="grid grid-cols-2 gap-4 mt-2 flex-1 overflow-hidden">
        <div className="text-xs space-y-2 flex flex-col h-full overflow-y-auto no-scrollbar pr-2">
          <div className="flex justify-between text-slate-500 mb-1 shrink-0">
            <span>Feed</span><span>Status</span>
          </div>
          {['Alex Chen', 'Maria Nones', 'Jack Doe', 'Sarah Connor', 'Alex Chen'].map((name, i) => (
            <div key={i} className="flex justify-between items-center text-[10px] shrink-0">
              <span className="text-slate-300">{name}</span>
              <span className="flex items-center gap-1 text-emerald-400"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Check-in</span>
            </div>
          ))}
        </div>
        <div className="bg-[#11141A] rounded-lg border border-[#2A3140] p-2 relative overflow-hidden flex items-center justify-center h-full min-h-[80px]">
          <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
          <div className="w-[80%] h-[80%] border-2 border-slate-600 rounded bg-[#1C202B] transform rotate-12 relative">
            <div className="absolute top-1/4 left-1/4 w-2 h-2 rounded-full bg-[#00E5FF] shadow-[0_0_8px_#00E5FF]" />
            <div className="absolute bottom-1/4 right-1/4 w-2 h-2 rounded-full bg-red-500 shadow-[0_0_8px_#EF4444]" />
          </div>
        </div>
      </div>
    </Card>
  );
}

function VolunteerCentralWidget() {
  return (
    <Card title="Volunteer Central" action={<span className="text-xs text-slate-400">Antoniss ▾</span>}>
      <div className="grid grid-cols-12 text-[10px] text-slate-500 mb-2 px-1 shrink-0">
        <span className="col-span-5">Assignment</span>
        <span className="col-span-5">Events</span>
        <span className="col-span-2 text-right">Status</span>
      </div>
      <div className="space-y-3 flex-1 overflow-y-auto no-scrollbar">
        <CentralItem name="Alex Chen" event="Spring Gala 2024" stat="Assign" color="emerald" />
        <CentralItem name="Maria Nones" event="Tech Symposium" stat="Assign" color="emerald" />
        <CentralItem name="Maria Namies" event="NGO Symposium" stat="Assign" color="emerald" />
        <CentralItem name="Alex Chen" event="NGO Events" stat="Status" color="red" />
      </div>
      <div className="mt-4 flex gap-2 shrink-0">
        <button className="flex-1 bg-[#6E56CF]/20 text-[#00E5FF] hover:bg-[#6E56CF] hover:text-white py-1.5 rounded-lg text-xs font-medium transition-colors">Chat</button>
        <button className="flex-1 bg-[#11141A] border border-[#2A3140] hover:bg-[#1C202B] text-slate-300 py-1.5 rounded-lg text-xs font-medium transition-colors">More ▾</button>
      </div>
    </Card>
  );
}

function EventAnalyticsWidget() {
  return (
    <Card title="Event Analytics" action={<Badge color="emerald">Active ▾</Badge>}>
      <div className="flex flex-wrap gap-6 mt-2 flex-1">
        {/* Line Chart Area */}
        <div className="flex flex-col flex-1 min-w-[200px]">
          <p className="text-2xl font-bold text-white mb-0.5 shrink-0">2,354</p>
          <p className="text-[10px] text-slate-400 mb-4 shrink-0">Maintenance Growth</p>
          <p className="text-[10px] text-slate-500 mb-2 shrink-0">Attendance Growth Line Chart</p>
          <div className="flex-1 min-h-[60px] w-full relative flex items-end border-l border-b border-[#2d323e] pl-1 pb-1">
            <svg viewBox="0 0 100 50" className="w-full h-full preserve-3d overflow-visible" preserveAspectRatio="none">
              <path d="M0,50 L0,40 C20,30 30,45 50,25 C70,5 80,20 100,10 L100,50 Z" fill="url(#grad)" opacity="0.4" />
              <path d="M0,40 C20,30 30,45 50,25 C70,5 80,20 100,10" fill="none" stroke="#06B6D4" strokeWidth="2" />
              <defs>
                <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#06B6D4" />
                  <stop offset="100%" stopColor="transparent" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute -left-5 bottom-0 h-full flex flex-col justify-between text-[8px] text-slate-600">
              <span>100</span><span>50</span><span>20</span><span>0</span>
            </div>
            <div className="absolute -bottom-4 left-0 w-full flex justify-between text-[8px] text-slate-600">
              <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span>
            </div>
          </div>
        </div>

        {/* Bar Chart Area */}
        <div className="flex flex-col flex-1 min-w-[200px]">
          <p className="text-2xl font-bold text-white mb-0.5 flex justify-between items-center shrink-0">
            581 <BarChart2 className="w-4 h-4 text-fuchsia-500" />
          </p>
          <p className="text-[10px] text-slate-400 mb-4 shrink-0">Volunteer Participation</p>
          <p className="text-[10px] text-slate-500 mb-2 shrink-0">Volunteer Participation Bar Chart</p>
          <div className="flex-1 min-h-[60px] w-full relative flex items-end justify-between border-l border-b border-[#2d323e] px-2 pb-1 gap-1">
            {[30, 20, 70, 50, 90, 100, 80].map((h, i) => (
              <div key={i} className="w-full bg-fuchsia-500 rounded-t-sm hover:opacity-80 transition-opacity" style={{ height: `${h}%` }} />
            ))}
            <div className="absolute -left-5 bottom-0 h-full flex flex-col justify-between text-[8px] text-slate-600">
              <span>150</span><span>100</span><span>50</span><span>0</span>
            </div>
            <div className="absolute -bottom-4 left-0 w-full flex justify-between text-[8px] text-slate-600 px-2">
              <span>M</span><span>T</span><span>W</span><span>T</span><span>F</span>
            </div>
          </div>
        </div>

        {/* Pie Chart Area */}
        <div className="flex flex-col flex-1 min-w-[200px]">
          <p className="text-2xl font-bold text-white mb-0.5 flex justify-between items-center shrink-0">
            23% <div className="w-4 h-4 rounded-full bg-indigo-500" />
          </p>
          <p className="text-[10px] text-slate-400 mb-4 shrink-0">Registration State</p>
          <p className="text-[10px] text-slate-500 mb-2 shrink-0">Registration State Pie Chart</p>
          <div className="flex-1 min-h-[60px] flex items-center justify-center">
            <div className="w-16 h-16 rounded-full border-[6px] border-emerald-500 border-t-fuchsia-500 border-l-indigo-500" />
          </div>
        </div>
      </div>
    </Card>
  );
}

function RecentRegistrationsWidget() {
  return (
    <Card title="Recent Registrations">
      <div className="mt-2 space-y-3 flex-1 overflow-y-auto no-scrollbar">
        <div className="flex items-center justify-between p-2 rounded-lg hover:bg-[#11141A] transition-colors group cursor-pointer border border-transparent hover:border-[#2A3140]">
          <div className="flex items-center gap-3">
            <div className="p-1.5 bg-[#6E56CF]/20 rounded-md text-[#6E56CF]"><History className="w-3.5 h-3.5" /></div>
            <div>
              <p className="text-xs font-bold text-white group-hover:text-[#00E5FF] transition-colors">Spring Gala 2024</p>
              <p className="text-[10px] text-slate-500">Active registrations</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-600" />
        </div>
        <div className="flex items-center justify-between p-2 rounded-lg hover:bg-[#11141A] transition-colors group cursor-pointer border border-transparent hover:border-[#2A3140]">
          <div className="flex items-center gap-3">
            <div className="p-1.5 bg-[#1C202B] rounded-md text-slate-400 border border-[#2A3140]"><ClipboardList className="w-3.5 h-3.5" /></div>
            <div>
              <p className="text-xs font-bold text-white group-hover:text-[#00E5FF] transition-colors">Draft event "Global Summit"</p>
              <p className="text-[10px] text-slate-500">Team registration</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-600" />
        </div>
      </div>
    </Card>
  );
}

function TeamMembersWidget() {
  return (
    <Card title="Team Members">
      <div className="mt-2 space-y-4 flex-1 overflow-y-auto no-scrollbar">
        <div className="flex gap-2">
          <div className="w-7 h-7 rounded-full bg-emerald-500 flex items-center justify-center text-xs font-bold text-white">JD</div>
          <div className="w-7 h-7 rounded-full bg-indigo-500 flex items-center justify-center text-xs font-bold text-white">MK</div>
          <div className="w-7 h-7 rounded-full bg-rose-500 flex items-center justify-center text-xs font-bold text-white">AS</div>
          <div className="w-7 h-7 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold text-slate-300">+2</div>
          <ChevronRight className="w-4 h-4 text-slate-600 ml-auto my-auto" />
        </div>
        <div className="flex items-center gap-3 p-2 bg-[#1c1f26] rounded-lg border border-[#2d323e]">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500" />
          <div>
            <p className="text-xs font-bold text-white">Alex Chen</p>
            <p className="text-[10px] text-slate-500">Volunteer</p>
          </div>
        </div>
      </div>
    </Card>
  );
}

function RecentActivitiesWidget() {
  return (
    <Card title="Recent Activities">
      <div className="mt-4 space-y-6 flex-1 overflow-y-auto no-scrollbar px-1">
        <ActivityItem icon={<QrCode className="w-3 h-3 text-indigo-400" />} color="bg-indigo-500/20" title={<><b>Alex Chen</b> updated QR template</>} time="3 days ago" />
        <ActivityItem icon={<CheckCircle2 className="w-3 h-3 text-emerald-400" />} color="bg-emerald-500/20" title={<>New volunteer approved to <b>center campuses</b>.</>} time="4 days ago" />
        <ActivityItem icon={<PlusSquare className="w-3 h-3 text-fuchsia-400" />} color="bg-fuchsia-500/20" title={<>New extes "Global Summit" saved</>} time="4 days ago" />
        <ActivityItem icon={<ClipboardList className="w-3 h-3 text-slate-400" />} color="bg-slate-700/50" title={<>Draft event "Global Summit" saved</>} time="3 days ago" />
      </div>
      <button className="mt-4 bg-[#6E56CF]/20 text-[#00E5FF] hover:bg-[#6E56CF] hover:text-white py-2 rounded-lg text-xs font-medium transition-colors flex items-center justify-center gap-2 shrink-0">
        <MessageSquare className="w-4 h-4" /> Chat
      </button>
    </Card>
  );
}

function CalendarWidget() {
  return (
    <Card title="Calendar" action={<Badge>Month ▾</Badge>}>
      <div className="mt-2 text-[10px] text-slate-500 flex-1 overflow-hidden flex flex-col">
        <div className="grid grid-cols-7 mb-2 text-center shrink-0">
          <span>Sun</span><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span>
        </div>
        <div className="grid grid-cols-7 gap-[1px] bg-[#2A3140] border border-[#2A3140] flex-1">
          {/* Calendar blocks mapped efficiently */}
          {Array.from({ length: 28 }).map((_, i) => {
            const num = (i + 29) % 31 || 31;
            const hasEvent = [4, 5, 10, 11, 16, 17, 23, 24, 27].includes(i);
            const color = i % 3 === 0 ? 'bg-[#00E5FF]' : i % 2 === 0 ? 'bg-[#6E56CF]' : 'bg-[#1C202B]';
            return (
              <div key={i} className="bg-[#11141A] min-h-[30px] p-1 relative flex items-start justify-start text-slate-300">
                {num}
                {hasEvent && <div className={`absolute bottom-1 left-1 right-1 h-1 ${color} rounded`} />}
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
}

/* -------------------------------------------------------------------------- */
/* REUSABLE UI PRIMITIVES */
/* -------------------------------------------------------------------------- */

function NavGroup({ title, children }) {
  return (
    <div className="flex flex-col gap-1">
      <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider px-4 mb-1">{title}</h4>
      {children}
    </div>
  );
}

function NavItem({ icon, label }) {
  return (
    <div className="flex items-center gap-3 px-4 py-2 text-sm text-slate-400 hover:bg-[#2d323e]/50 hover:text-white rounded-lg transition-colors cursor-pointer">
      {icon}
      <span>{label}</span>
    </div>
  );
}

function Card({ title, action, children }) {
  return (
    <div className="bg-[#1C202B] rounded-xl border border-[#2A3140] p-4 flex flex-col h-full shadow-sm overflow-hidden hover:border-[#6E56CF]/50 transition-colors group">
      <div className="flex justify-between items-center mb-3 drag-handle cursor-move group-hover:bg-[#11141A]/50 -mx-4 px-4 py-1.5 -mt-1 rounded-t-lg transition-colors">
        <h3 className="text-[14px] font-medium text-white flex items-center gap-2">
          {title}
        </h3>
        {action}
      </div>
      <div className="flex-1 min-h-0 overflow-auto custom-scrollbar flex flex-col">
        {children}
      </div>
    </div>
  );
}

function Badge({ children, color = 'slate' }) {
  const bg = color === 'emerald' ? 'bg-[#00E5FF]/10 text-[#00E5FF] border-[#00E5FF]/20' : 'bg-[#11141A] text-slate-300 border-[#2A3140] hover:bg-[#2A3140]';
  return (
    <div className={`px-2 py-1 rounded text-[10px] font-medium border transition-colors cursor-pointer ${bg}`}>
      {children}
    </div>
  );
}

function EventItem({ title, date, reg, vol, color, isActive }) {
  return (
    <div className={`flex items-center gap-3 p-2 rounded-lg border shrink-0 ${isActive ? 'bg-[#11141A] border-[#6E56CF]/50' : 'bg-[#11141A] border-[#2A3140] hover:border-[#3f4553]'} transition-colors cursor-pointer`}>
      <div className={`w-10 h-10 rounded-lg ${color} flex items-center justify-center shrink-0 shadow-inner`}>
        <span className="text-white text-[10px] font-bold">Event</span>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-bold text-white truncate">{title}</p>
        <p className="text-[10px] text-slate-400 flex items-center gap-2">
          <span>{date}</span> <span className="w-1 h-1 rounded-full bg-slate-600" /> <span>{reg}</span> <span className="w-1 h-1 rounded-full bg-slate-600" /> <span>{vol} vol</span>
        </p>
      </div>
      {isActive && (
        <span className="text-[10px] text-[#00E5FF] font-medium px-2 py-0.5 rounded bg-[#00E5FF]/10 shrink-0">Active</span>
      )}
    </div>
  );
}

function AssignmentItem({ name, role }) {
  return (
    <div className="flex items-center justify-between p-2 rounded-lg hover:bg-[#11141A] transition-colors group cursor-pointer shrink-0 border border-transparent hover:border-[#2A3140]">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-[#6E56CF] shrink-0 border border-[#2A3140]" />
        <div>
          <p className="text-xs font-bold text-white group-hover:text-[#00E5FF] transition-colors">{name}</p>
          <p className="text-[10px] text-slate-400">{role}</p>
        </div>
      </div>
      <button className="text-[10px] bg-[#11141A] border border-[#2A3140] text-slate-300 px-3 py-1.5 rounded hover:bg-[#1C202B] hover:text-white transition-colors">Manage</button>
    </div>
  );
}

function CentralItem({ name, event, stat, color }) {
  return (
    <div className="grid grid-cols-12 gap-2 items-center text-xs hover:bg-[#11141A] p-1.5 rounded-lg transition-colors cursor-pointer shrink-0 border border-transparent hover:border-[#2A3140]">
      <div className="col-span-5 flex items-center gap-2 min-w-0">
        <div className="w-6 h-6 rounded-full bg-[#6E56CF] shrink-0" />
        <div className="truncate">
          <p className="font-bold text-white truncate">{name}</p>
          <p className="text-[9px] text-slate-500 truncate">Volunteer</p>
        </div>
      </div>
      <div className="col-span-5 min-w-0">
        <p className="text-slate-300 truncate">{event}</p>
        <p className="text-[9px] text-slate-500 truncate">Mon 3 regs, 52 vol</p>
      </div>
      <div className="col-span-2 text-right">
        <span className={`inline-flex items-center gap-1 text-[9px] px-1.5 py-0.5 rounded-full font-medium ${color === 'emerald' ? 'bg-[#00E5FF]/10 text-[#00E5FF] border border-[#00E5FF]/20' : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
          }`}>
          <div className={`w-1 h-1 rounded-full ${color === 'emerald' ? 'bg-[#00E5FF]' : 'bg-rose-400'}`} /> {stat}
        </span>
      </div>
    </div>
  );
}

function ActivityItem({ icon, color, title, time }) {
  return (
    <div className="flex gap-3 relative shrink-0">
      <div className="absolute left-[11px] top-6 bottom-[-24px] w-px bg-[#2d323e]" />
      <div className={`w-6 h-6 rounded-full ${color} flex items-center justify-center shrink-0 z-10`}>
        {icon}
      </div>
      <div className="pt-0.5">
        <p className="text-xs text-slate-300 leading-tight mb-1">{title}</p>
        <p className="text-[10px] text-slate-500">{time}</p>
      </div>
    </div>
  );
}
