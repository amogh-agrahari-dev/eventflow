import React, { useState, useEffect } from 'react';
import { Responsive as ResponsiveGridLayout } from 'react-grid-layout';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useUserStore } from '@/store/userStore';
import { getToken } from '@/lib/auth';
import Logo from '@/components/general/Logo';
import {
  Home, CalendarDays, PlusSquare, History, Users, ClipboardList,
  MessageSquare, UserPlus, LogOut, Search, Bell, Plus, MoreHorizontal,
  MapPin, CheckCircle2, ChevronRight, Settings, BarChart2, Briefcase, Mail, QrCode, X, SlidersHorizontal, Menu,
  MonitorPlay, LayoutTemplate, MessageCircle, Check, Share2, Heart, ArrowLeft
} from 'lucide-react';
import Sidebar from '@/components/general/Sidebar';
import SwitchRoleButton from '@/components/general/SwitchRoleButton';
import ProfileDropdown from '@/components/general/ProfileDropdown';

import MobileBottomNav from '@/components/general/MobileBottomNav';

function AutoWidthGrid(props) {
  const containerRef = React.useRef(null);
  const [width, setWidth] = useState(1200);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const w = containerRef.current.clientWidth;
        if (w > 0) {
          setWidth(w);
          setIsMobile(w < 768);
        }
      }
    };

    updateDimensions();

    const observer = new ResizeObserver(entries => {
      for (let entry of entries) {
        if (entry.contentRect.width > 0) {
          setWidth(entry.contentRect.width);
          setIsMobile(entry.contentRect.width < 768);
        }
      }
    });

    if (containerRef.current) observer.observe(containerRef.current);
    window.addEventListener('resize', updateDimensions);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', updateDimensions);
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full min-w-0">
      <ResponsiveGridLayout 
        width={width} 
        isDraggable={!isMobile}
        isResizable={!isMobile}
        {...props} 
      />
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

const generateInitialLayouts = () => {
  const md = [
    { i: 'upcoming-events', x: 0, y: 0, w: 4, h: 4, minW: 2, minH: 3 },
    { i: 'volunteer-assignments', x: 4, y: 0, w: 4, h: 4, minW: 2, minH: 3 },
    { i: 'live-performance', x: 0, y: 4, w: 4, h: 4, minW: 2, minH: 3 },
    { i: 'volunteer-central', x: 4, y: 4, w: 4, h: 4, minW: 2, minH: 3 },
    { i: 'event-analytics', x: 0, y: 8, w: 8, h: 4, minW: 4, minH: 3 },
    { i: 'recent-registrations', x: 0, y: 12, w: 4, h: 3, minW: 2, minH: 3 },
    { i: 'team-members', x: 4, y: 12, w: 4, h: 3, minW: 2, minH: 3 },
    { i: 'recent-activities', x: 0, y: 15, w: 4, h: 4, minW: 2, minH: 3 },
    { i: 'calendar', x: 4, y: 15, w: 4, h: 4, minW: 2, minH: 3 },
    { i: 'live-checkin', x: 0, y: 19, w: 8, h: 4, minW: 2, minH: 3 }
  ];
  const sm = [
    { i: 'upcoming-events', x: 0, y: 0, w: 3, h: 4, minW: 2, minH: 3 },
    { i: 'volunteer-assignments', x: 3, y: 0, w: 3, h: 4, minW: 2, minH: 3 },
    { i: 'live-performance', x: 0, y: 4, w: 3, h: 4, minW: 2, minH: 3 },
    { i: 'volunteer-central', x: 3, y: 4, w: 3, h: 4, minW: 2, minH: 3 },
    { i: 'event-analytics', x: 0, y: 8, w: 6, h: 4, minW: 3, minH: 3 },
    { i: 'recent-registrations', x: 0, y: 12, w: 3, h: 3, minW: 2, minH: 3 },
    { i: 'team-members', x: 3, y: 12, w: 3, h: 3, minW: 2, minH: 3 },
    { i: 'recent-activities', x: 0, y: 15, w: 3, h: 4, minW: 2, minH: 3 },
    { i: 'calendar', x: 3, y: 15, w: 3, h: 4, minW: 2, minH: 3 },
    { i: 'live-checkin', x: 0, y: 19, w: 6, h: 4, minW: 2, minH: 3 }
  ];
  const singleCol = WIDGETS.map((w, idx) => ({
    i: w.id,
    x: 0,
    y: idx * 4,
    w: 1,
    h: 4,
    minW: 1,
    minH: 3
  }));

  return { lg: DEFAULT_LAYOUT, md, sm, xs: singleCol, xxs: singleCol };
};

export default function OrganizerDashboard() {
  const [isMounted, setIsMounted] = useState(false);
  const [layouts, setLayouts] = useState(generateInitialLayouts());
  const [visibleWidgets, setVisibleWidgets] = useState(new Set(WIDGETS.map(w => w.id)));
  const [showCustomizePanel, setShowCustomizePanel] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDesktopSidebarCollapsed, setIsDesktopSidebarCollapsed] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState(null);

  const router = useRouter();
  const { user, fetchUser, logout } = useUserStore();
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
    const initial = generateInitialLayouts();
    setLayouts(initial);
    setVisibleWidgets(new Set(WIDGETS.map(w => w.id)));
    localStorage.removeItem('organizer_layout');
    localStorage.removeItem('organizer_visible');
  };

  const handleLogout = () => {
    logout();
    router.push('/auth/login');
  };

  // Do not render the grid until client-side hydration is complete to avoid layout mismatch
  if (!isMounted) {
    return <div className="h-screen bg-vol-bg"></div>;
  }

  return (
    <div className="flex h-screen bg-vol-bg text-slate-300 font-sans overflow-hidden selection:bg-vol-accent2/30">

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* 1. Sidebar */}
      <Sidebar 
        isMobileMenuOpen={isMobileMenuOpen} 
        isDesktopSidebarCollapsed={isDesktopSidebarCollapsed}
        onCloseMobileMenu={() => setIsMobileMenuOpen(false)}
      />

      {/* 2. Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden relative min-w-0 bg-vol-bg pb-16 md:pb-0">

        {/* Top Header */}
        <header className="h-16 md:h-[72px] shrink-0 border-b border-vol-border/50 bg-vol-bg/95 backdrop-blur z-10 flex items-center justify-between px-4 md:px-6 sticky top-0">
          <div className="flex items-center gap-2 sm:gap-4 min-w-0">
            <button
              className="md:hidden p-2 -ml-1 rounded-lg text-gray-400 hover:text-white hover:bg-vol-card transition-colors touch-manipulation"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open sidebar"
            >
              <Menu size={20} />
            </button>
            <button
              className="hidden md:block p-2 -ml-2 rounded-lg text-gray-400 hover:text-white hover:bg-vol-card transition-colors"
              onClick={() => setIsDesktopSidebarCollapsed(!isDesktopSidebarCollapsed)}
              aria-label="Toggle sidebar"
            >
              <Menu size={20} />
            </button>
            <h1 className="text-base sm:text-lg md:text-xl font-semibold text-white tracking-tight truncate">
              Organizer Dashboard
            </h1>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-3 justify-end shrink-0">
            <div className="relative hidden lg:block">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search events, tasks..."
                className="w-48 xl:w-64 bg-vol-card border border-vol-border rounded-full py-1.5 pl-9 pr-4 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-vol-accent2/50 transition-colors"
              />
            </div>

            <button className="hidden sm:flex items-center gap-2 bg-vol-accent hover:bg-vol-accent2 text-white px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-colors shadow-glow-lg">
              <Plus size={16} />
              <span>Quick-Add</span>
            </button>

            {/* Customize Dashboard Button */}
            <button
              onClick={() => setShowCustomizePanel(true)}
              className="hidden sm:flex items-center gap-2 bg-vol-card hover:bg-vol-card/80 border border-vol-border text-gray-200 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-colors"
            >
              <SlidersHorizontal size={16} />
              <span>Customize</span>
            </button>

            <button 
              aria-label="Notifications" 
              className="relative p-2 rounded-full text-gray-400 hover:text-white hover:bg-vol-card transition-colors touch-manipulation"
            >
              <Bell size={18} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-vol-warning border-2 border-vol-bg" />
            </button>

            {/* Switch Role Button */}
            <SwitchRoleButton currentRole="Organizer" />

            {/* Profile Dropdown Menu */}
            <ProfileDropdown currentRole="Organizer" />
          </div>
        </header>

        {/* Dashboard Grid Content */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-4 md:p-6 lg:p-8 custom-scrollbar scroll-smooth relative flex flex-col">
          <AutoWidthGrid
            className="layout"
            layouts={layouts}
            breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
            cols={{ lg: 12, md: 8, sm: 6, xs: 1, xxs: 1 }}
            rowHeight={95}
            onLayoutChange={handleLayoutChange}
            draggableHandle=".drag-handle"
            margin={[16, 16]}
            resizeHandles={['s', 'w', 'e', 'n', 'sw', 'nw', 'se', 'ne']}
          >
            {DEFAULT_LAYOUT.filter(l => visibleWidgets.has(l.i)).map(l => (
              <div key={l.i} className="flex flex-col h-full w-full min-w-0 bg-transparent">
                {renderWidget(l.i, selectedEventId, setSelectedEventId)}
              </div>
            ))}
          </AutoWidthGrid>
        </div>

        {/* Customize Panel Overlay */}
        {showCustomizePanel && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40" onClick={() => setShowCustomizePanel(false)} />
        )}

        {/* Customize Panel */}
        <div className={`fixed top-0 right-0 h-full w-full sm:w-80 md:w-96 max-w-full bg-vol-card border-l border-vol-border shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${showCustomizePanel ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex items-center justify-between p-5 border-b border-vol-border/40">
            <h2 className="text-base font-semibold text-white">Customize Layout</h2>
            <button onClick={() => setShowCustomizePanel(false)} className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-vol-border/30 transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-3 custom-scrollbar">
            <p className="text-xs text-gray-400 mb-2">Toggle widgets to show or hide them from your dashboard. Drag cards by their headers to rearrange.</p>

            {WIDGETS.map(widget => (
              <label
                key={widget.id}
                onClick={(e) => { e.preventDefault(); toggleWidget(widget.id); }}
                className="flex items-center justify-between p-3.5 rounded-xl border border-vol-border bg-vol-bg/60 hover:bg-vol-border/20 cursor-pointer transition-all group touch-manipulation min-h-[44px]"
              >
                <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">{widget.title}</span>
                <div className={`w-10 h-5 rounded-full transition-colors relative ${visibleWidgets.has(widget.id) ? 'bg-vol-success' : 'bg-vol-border'}`}>
                  <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-transform ${visibleWidgets.has(widget.id) ? 'left-6' : 'left-1'}`} />
                </div>
              </label>
            ))}
          </div>

          <div className="p-5 border-t border-vol-border/40">
            <button
              onClick={resetDashboard}
              className="w-full bg-rose-500/10 text-rose-400 hover:bg-rose-500 hover:text-white py-2.5 rounded-xl text-sm font-semibold transition-all border border-rose-500/20 touch-manipulation min-h-[44px]"
            >
              Reset to Default Layout
            </button>
          </div>
        </div>

        {/* Mobile Bottom Navigation */}
        <MobileBottomNav role="organizer" />
      </main>
    </div>
  );
}

/* WIDGET RENDERER */
function renderWidget(id, selectedEventId, setSelectedEventId) {
  switch (id) {
    case 'upcoming-events':
      return <UpcomingEventsWidget selectedEventId={selectedEventId} onSelectEvent={setSelectedEventId} />;
    case 'volunteer-assignments':
      return <VolunteerAssignmentsWidget selectedEventId={selectedEventId} />;
    case 'live-performance':
      return <LivePerformanceWidget />;
    case 'live-checkin':
      return <LiveCheckInWidget />;
    case 'volunteer-central':
      return <VolunteerCentralWidget selectedEventId={selectedEventId} />;
    case 'event-analytics':
      return <EventAnalyticsWidget />;
    case 'recent-registrations':
      return <RecentRegistrationsWidget selectedEventId={selectedEventId} />;
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

function UpcomingEventsWidget({ selectedEventId, onSelectEvent }) {
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
      let eventsList = [];
      if (Array.isArray(data)) {
        eventsList = data;
      } else if (data && data.success && Array.isArray(data.events)) {
        eventsList = data.events;
      } else if (data && Array.isArray(data.data)) {
        eventsList = data.data;
      }
      setUpcomingEvents(eventsList.slice(0, 4));

      // Auto-select first event if none currently selected
      if (!selectedEventId && eventsList.length > 0) {
        const firstEventId = eventsList[0]?.id ?? eventsList[0]?.event_id;
        if (firstEventId) {
          onSelectEvent?.(firstEventId);
        }
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
      <div className="space-y-3 flex-1 overflow-y-auto custom-scrollbar">
        {upcomingEvents?.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-28 text-xs text-gray-500 text-center px-4">
            <CalendarDays className="w-6 h-6 text-gray-600 mb-1" />
            <span>No events found</span>
          </div>
        ) : (
          upcomingEvents?.map((event, i) => {
            const eventId = event?.id ?? event?.event_id;
            const isSelected = Number(selectedEventId) === Number(eventId);

            return (
              <div key={eventId || i} className="space-y-2">
                <EventItem
                  title={event?.title}
                  date={formatDate(event?.start_time)}
                  reg={`${event?.max_attendees || 0} registered`}
                  vol={`${event?.volunteers_required || 0} volunteers`}
                  color={['bg-gradient-to-br from-indigo-500 to-purple-600', 'bg-gradient-to-br from-emerald-500 to-teal-700', 'bg-gradient-to-br from-orange-500 to-amber-700', 'bg-gradient-to-br from-pink-500 to-rose-700'][i % 4]}
                  isActive={isSelected}
                />
                <button
                  onClick={() => onSelectEvent?.(eventId)}
                  className={`w-full rounded-lg border px-3 py-1.5 text-xs font-semibold transition-all ${isSelected
                    ? 'border-vol-accent2/50 bg-vol-accent2/10 text-vol-accent2 shadow-sm'
                    : 'border-vol-border bg-vol-bg/60 text-gray-300 hover:bg-vol-border/40 hover:text-white'
                    }`}
                >
                  {isSelected ? 'Selected Event' : 'Select Event'}
                </button>
              </div>
            );
          })
        )}
      </div>
      <Link href="/eventsall" className="w-full mt-2 py-2.5 rounded-lg bg-vol-accent/10 hover:bg-vol-accent/20 text-vol-accent2 font-medium text-sm transition-all border border-vol-accent/20 hover:border-vol-accent/40 hover:shadow-glow-accent flex items-center justify-center gap-1.5 shrink-0">
        View All Events <ChevronRight className="w-4 h-4" />
      </Link>
    </Card>
  );
}

function VolunteerAssignmentsWidget({ selectedEventId }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  const getTasks = async () => {
    if (!selectedEventId) {
      setTasks([]);
      return;
    }
    setLoading(true);
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      const headers = {
        "Content-Type": "application/json",
      };

      let allTasks = [];

      // 1. Fetch Event details to get the volunteers list
      try {
        let eventData = null;
        let eventRes = await fetch(`${baseUrl}/event/${selectedEventId}`, { method: "GET", headers });

        if (!eventRes.ok && (eventRes.status === 404 || eventRes.status === 405)) {
          const fallbackRes = await fetch(`${baseUrl}/events/${selectedEventId}`, { method: "GET", headers });
          if (fallbackRes.ok) {
            eventRes = fallbackRes;
          }
        }

        if (eventRes.ok) {
          eventData = await eventRes.json();
        }

        let volunteers = [];
        if (eventData && Array.isArray(eventData.volunteers) && eventData.volunteers.length > 0) {
          volunteers = eventData.volunteers;
        } else {
          // Fallback: fetch /{selectedEventId}/volunteers
          const volRes = await fetch(`${baseUrl}/${selectedEventId}/volunteers`, { method: "GET", headers });
          if (volRes.ok) {
            const volData = await volRes.json();
            if (Array.isArray(volData)) {
              volunteers = volData;
            } else if (volData && Array.isArray(volData.volunteers)) {
              volunteers = volData.volunteers;
            }
          }
        }

        // Fetch user-specific tasks for each volunteer: /tasks/{user_id}/{event_id}
        if (volunteers.length > 0) {
          const taskPromises = volunteers.map(async (v) => {
            const vUserId = typeof v === 'object' && v !== null ? (v.id ?? v.user_id ?? v.userId) : v;
            if (!vUserId) return [];
            try {
              const res = await fetch(`${baseUrl}/tasks/${vUserId}/${selectedEventId}`, {
                method: "GET",
                headers,
              });
              if (res.ok) {
                const data = await res.json();
                return Array.isArray(data) ? data : [];
              }
            } catch (e) {
              console.warn(`Failed to fetch tasks for volunteer ${vUserId} and event ${selectedEventId}:`, e);
            }
            return [];
          });

          const taskResults = await Promise.allSettled(taskPromises);
          taskResults.forEach((r) => {
            if (r.status === "fulfilled" && Array.isArray(r.value)) {
              allTasks.push(...r.value);
            }
          });
        }
      } catch (err) {
        console.warn("Could not fetch tasks via event volunteers:", err);
      }

      // 2. Fallback: try direct /tasks/{selectedEventId} if volunteer endpoints returned no tasks
      if (allTasks.length === 0) {
        try {
          const directRes = await fetch(`${baseUrl}/tasks/${selectedEventId}`, { method: "GET", headers });
          if (directRes.ok) {
            const directData = await directRes.json();
            if (Array.isArray(directData)) {
              allTasks = directData;
            } else if (directData?.tasks && Array.isArray(directData.tasks)) {
              allTasks = directData.tasks;
            }
          }
        } catch (e) {
          // Ignore fallback error
        }
      }

      // Deduplicate by task id and filter for selected event
      const seenIds = new Set();
      const eventTasks = allTasks.filter((task) => {
        if (!task) return false;
        const taskId = task.id ?? task.task_id;
        if (taskId && seenIds.has(taskId)) return false;
        if (taskId) seenIds.add(taskId);

        const taskEventId = task.event_id ?? task.eventId ?? task?.event?.id;
        if (taskEventId === undefined || taskEventId === null) return true;
        return String(taskEventId) === String(selectedEventId);
      });

      setTasks(eventTasks);
    } catch (error) {
      console.error("Error fetching tasks for event:", error);
      setTasks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTasks();
  }, [selectedEventId]);

  return (
    <Card title="Volunteer Tasks" action={<Badge color="emerald">Active ▾</Badge>}>
      <div className="flex justify-between text-xs text-gray-500 mb-1 px-1 shrink-0 font-medium">
        <span>Assigned Tasks {selectedEventId ? `(#${selectedEventId})` : '(Select an event)'}</span>
        <span>Status</span>
      </div>
      <div className="space-y-2 flex-1 overflow-y-auto custom-scrollbar">
        {!selectedEventId ? (
          <div className="flex flex-col items-center justify-center h-28 text-xs text-gray-500 text-center px-4">
            <ClipboardList className="w-6 h-6 text-gray-600 mb-1" />
            <span>Select an event to view assigned tasks</span>
          </div>
        ) : loading ? (
          <div className="flex items-center justify-center h-28 text-xs text-gray-400">
            <div className="w-4 h-4 border-2 border-vol-accent2 border-t-transparent rounded-full animate-spin mr-2" />
            Loading tasks...
          </div>
        ) : tasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-28 text-xs text-gray-500 text-center px-4">
            <ClipboardList className="w-6 h-6 text-gray-600 mb-1" />
            <span>No tasks assigned for this event</span>
          </div>
        ) : (
          tasks.map((task) => (
            <AssignmentItem key={task.id ?? task.task_id} name={task?.title} role={task?.status || "In Progress"} />
          ))
        )}
      </div>
      <Link
        href={selectedEventId ? `/directory/${selectedEventId}` : '/directory'}
        className="w-full mt-2 py-2.5 rounded-lg bg-vol-accent/10 hover:bg-vol-accent/20 text-vol-accent2 font-medium text-sm transition-all border border-vol-accent/20 hover:border-vol-accent/40 hover:shadow-glow-accent flex items-center justify-center gap-1.5 shrink-0"
      >
        Manage Tasks <ChevronRight className="w-4 h-4" />
      </Link>
    </Card>
  );
}

function LivePerformanceWidget() {
  return (
    <Card title="Live Performance Hub" action={<Badge color="emerald">Live ▾</Badge>}>
      <div className="flex justify-between items-end">
        <div>
          <p className="text-xs text-gray-400 mb-1">Live Attendance Counter</p>
          <div className="text-3xl font-bold text-white tracking-tight flex items-baseline gap-1.5">
            2,354 <span className="text-xs text-gray-400 font-normal">attendees</span>
          </div>
        </div>
        <div className="w-20 h-10 flex items-end justify-between gap-1">
          {[3, 5, 4, 7, 5, 8, 6].map((h, i) => (
            <div key={i} className="w-full bg-gradient-to-t from-vol-accent/30 to-vol-accent2 rounded-t-sm" style={{ height: `${h}0%` }} />
          ))}
        </div>
      </div>
      <div className="mt-4 text-xs text-vol-success font-medium flex items-center gap-1.5 bg-vol-success/10 border border-vol-success/20 w-fit px-3 py-1 rounded-full shrink-0">
        <div className="w-1.5 h-1.5 rounded-full bg-vol-success animate-pulse" /> Real-time sync active
      </div>
      <div className="mt-auto pt-3 border-t border-vol-border/40 flex items-center justify-between text-xs text-gray-400">
        <span>Capacity Target: 92%</span>
        <span className="text-vol-accent2 font-semibold">Healthy</span>
      </div>
    </Card>
  );
}

function LiveCheckInWidget() {
  return (
    <Card title="Live Check-in Feed" action={<Badge>Check-in ▾</Badge>}>
      <div className="grid grid-cols-2 gap-4 flex-1 overflow-hidden">
        <div className="text-xs space-y-2 flex flex-col h-full overflow-y-auto custom-scrollbar pr-2">
          <div className="flex justify-between text-gray-500 mb-1 shrink-0 text-xs font-semibold">
            <span>Attendee</span><span>Status</span>
          </div>
          {['Alex Chen', 'Maria Nones', 'Jack Doe', 'Sarah Connor', 'Alex Chen'].map((name, i) => (
            <div key={i} className="flex justify-between items-center text-xs shrink-0 py-1 border-b border-vol-border/20 last:border-0">
              <span className="text-gray-300 font-medium truncate">{name}</span>
              <span className="flex items-center gap-1.5 text-vol-success font-medium text-[11px] shrink-0">
                <div className="w-1.5 h-1.5 rounded-full bg-vol-success" /> Checked in
              </span>
            </div>
          ))}
        </div>
        <div className="bg-vol-bg/60 rounded-xl border border-vol-border p-3 relative overflow-hidden flex items-center justify-center h-full min-h-[80px]">
          <div className="w-[80%] h-[80%] border border-vol-border/60 rounded-xl bg-vol-card/80 transform rotate-6 relative shadow-inner flex flex-col items-center justify-center gap-1 p-2">
            <div className="w-2.5 h-2.5 rounded-full bg-vol-accent2 shadow-[0_0_10px_#00E5FF] mb-1" />
            <span className="text-[10px] text-gray-400 font-mono">Gate A active</span>
          </div>
        </div>
      </div>
    </Card>
  );
}

function VolunteerCentralWidget({ selectedEventId }) {
  const [volunteers, setVolunteers] = useState([]);
  const [loading, setLoading] = useState(false);

  const getVolunteers = async () => {
    if (!selectedEventId) {
      setVolunteers([]);
      return;
    }
    setLoading(true);
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      const response = await fetch(`${baseUrl}/${selectedEventId}/volunteers`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const data = await response.json();
        if (Array.isArray(data)) {
          setVolunteers(data);
        } else if (data && Array.isArray(data.volunteers)) {
          setVolunteers(data.volunteers);
        }
      } else {
        // Fallback to /event/{id}
        const eventRes = await fetch(`${baseUrl}/event/${selectedEventId}`);
        if (eventRes.ok) {
          const eventData = await eventRes.json();
          if (Array.isArray(eventData.volunteers)) {
            setVolunteers(eventData.volunteers);
          }
        }
      }
    } catch (error) {
      console.error("Error fetching volunteers:", error);
      setVolunteers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getVolunteers();
  }, [selectedEventId]);

  return (
    <Card title="Volunteer Central" action={<Badge>On-Duty ▾</Badge>}>
      <div className="grid grid-cols-12 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-2 shrink-0">
        <span className="col-span-5">Volunteer</span>
        <span className="col-span-4">Assignment</span>
        <span className="col-span-3 text-right">Status</span>
      </div>
      <div className="space-y-1.5 flex-1 overflow-y-auto custom-scrollbar">
        {!selectedEventId ? (
          <div className="flex flex-col items-center justify-center h-28 text-xs text-gray-500 text-center px-4">
            <Users className="w-6 h-6 text-gray-600 mb-1" />
            <span>Select an event to view volunteers</span>
          </div>
        ) : loading ? (
          <div className="flex items-center justify-center h-28 text-xs text-gray-400">
            <div className="w-4 h-4 border-2 border-vol-accent2 border-t-transparent rounded-full animate-spin mr-2" />
            Loading volunteers...
          </div>
        ) : volunteers.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-28 text-xs text-gray-500 text-center px-4">
            <Users className="w-6 h-6 text-gray-600 mb-1" />
            <span>No volunteers assigned to this event</span>
          </div>
        ) : (
          volunteers.map((volunteer, i) => (
            <CentralItem
              key={volunteer.id || i}
              name={volunteer.name}
              event={selectedEventId ? `Event #${selectedEventId}` : "Main Hall"}
              stat={volunteer.status || "on-duty"}
              color={volunteer.status === 'on-duty' ? 'bg-vol-success' : volunteer.status === 'inactive' ? 'bg-vol-warning' : 'bg-gray-500'}
            />
          ))
        )}
      </div>
      <div className="mt-2 flex gap-2 shrink-0">
        <button className="flex-1 py-2.5 rounded-lg bg-vol-accent/10 hover:bg-vol-accent/20 text-vol-accent2 font-medium text-sm transition-all border border-vol-accent/20 hover:border-vol-accent/40 hover:shadow-glow-accent flex items-center justify-center gap-1.5">
          <MessageSquare className="w-4 h-4" /> Message
        </button>
        <Link
          href={selectedEventId ? `/directory/${selectedEventId}` : '/directory'}
          className="flex-1 py-2.5 rounded-lg bg-vol-card hover:bg-vol-card/80 text-gray-300 border border-vol-border text-sm font-medium transition-all hover:text-white flex items-center justify-center"
        >
          Roster
        </Link>
      </div>
    </Card>
  );
}

function EventAnalyticsWidget() {
  return (
    <Card title="Event Analytics" action={<Badge color="emerald">Realtime ▾</Badge>}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1">
        {/* Line Chart Area */}
        <div className="flex flex-col min-w-0">
          <p className="text-2xl font-bold text-white mb-0.5 shrink-0">2,354</p>
          <p className="text-xs text-gray-400 mb-2 shrink-0">Attendance Growth</p>
          <div className="flex-1 min-h-[70px] w-full relative flex items-end border-l border-b border-vol-border/60 pl-1 pb-1">
            <svg viewBox="0 0 100 50" className="w-full h-full overflow-visible" preserveAspectRatio="none">
              <path d="M0,50 L0,40 C20,30 30,45 50,25 C70,5 80,20 100,10 L100,50 Z" fill="url(#grad)" opacity="0.25" />
              <path d="M0,40 C20,30 30,45 50,25 C70,5 80,20 100,10" fill="none" stroke="#00E5FF" strokeWidth="2.5" />
              <defs>
                <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#00E5FF" />
                  <stop offset="100%" stopColor="transparent" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div className="flex justify-between text-[9px] text-gray-500 font-mono mt-1">
            <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span>
          </div>
        </div>

        {/* Bar Chart Area */}
        <div className="flex flex-col min-w-0">
          <p className="text-2xl font-bold text-white mb-0.5 flex justify-between items-center shrink-0">
            581 <BarChart2 className="w-4 h-4 text-vol-accent2" />
          </p>
          <p className="text-xs text-gray-400 mb-2 shrink-0">Volunteer Participation</p>
          <div className="flex-1 min-h-[70px] w-full relative flex items-end justify-between border-l border-b border-vol-border/60 px-1 pb-1 gap-1.5">
            {[30, 20, 70, 50, 90, 100, 80].map((h, i) => (
              <div key={i} className="w-full bg-gradient-to-t from-vol-accent to-vol-accent2 rounded-t-sm hover:opacity-90 transition-opacity" style={{ height: `${h}%` }} />
            ))}
          </div>
          <div className="flex justify-between text-[9px] text-gray-500 font-mono mt-1">
            <span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span><span>S</span>
          </div>
        </div>

        {/* Pie Chart Area */}
        <div className="flex flex-col min-w-0">
          <p className="text-2xl font-bold text-white mb-0.5 flex justify-between items-center shrink-0">
            94% <span className="w-2.5 h-2.5 rounded-full bg-vol-accent2 shadow-[0_0_8px_#00E5FF]" />
          </p>
          <p className="text-xs text-gray-400 mb-2 shrink-0">Check-in Fulfillment</p>
          <div className="flex-1 min-h-[70px] flex items-center justify-center">
            <div className="w-14 h-14 rounded-full border-[5px] border-vol-card border-t-vol-accent2 border-r-vol-accent shadow-md" />
          </div>
          <div className="text-center text-[11px] text-gray-400 mt-1">
            2,212 checked-in
          </div>
        </div>
      </div>
    </Card>
  );
}

function RecentRegistrationsWidget({ selectedEventId }) {
  const [registrations, setRegistrations] = useState([]);

  const fetchRegistrations = async () => {
    if (!selectedEventId) {
      setRegistrations([]);
      return;
    }
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/attendence/${selectedEventId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const data = await response.json();
        if (Array.isArray(data)) {
          setRegistrations(data);
        } else if (data && Array.isArray(data.attendees)) {
          setRegistrations(data.attendees);
        }
      }
    } catch (error) {
      console.error("Error fetching registrations:", error);
      setRegistrations([]);
    }
  };

  useEffect(() => {
    fetchRegistrations();
  }, [selectedEventId]);

  return (
    <Card title="Recent Registrations" action={<Badge color="emerald">Active ▾</Badge>}>
      <div className="space-y-2 flex-1 overflow-y-auto custom-scrollbar">
        {!selectedEventId ? (
          <div className="flex flex-col items-center justify-center h-28 text-xs text-gray-500 text-center px-4">
            <ClipboardList className="w-6 h-6 text-gray-600 mb-1" />
            <span>Select an event to view registrations</span>
          </div>
        ) : registrations.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-28 text-xs text-gray-500 text-center px-4">
            <ClipboardList className="w-6 h-6 text-gray-600 mb-1" />
            <span>No registrations found for this event</span>
          </div>
        ) : (
          registrations.map((reg, i) => (
            <div key={i} className="flex items-center justify-between p-3 rounded-xl hover:bg-vol-border/20 transition-all group cursor-pointer border border-transparent hover:border-vol-border/30 relative">
              <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-vol-accent2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-full" />
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-full bg-vol-accent/10 border border-vol-accent/20 flex items-center justify-center shrink-0 text-vol-accent2 group-hover:bg-vol-accent/20 transition-all">
                  <ClipboardList className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-white group-hover:text-vol-accent2 transition-colors truncate">{reg?.user?.name || "Attendee"}</p>
                  <div className="text-xs text-gray-400">{reg?.created_at ? new Date(reg?.created_at).toLocaleDateString() : "Recent"}</div>
                </div>
              </div>
              <span className="text-[10px] font-medium px-2 py-0.5 rounded border bg-vol-success/10 text-vol-success border-vol-success/20 shrink-0 ml-2">
                {reg?.status || "Active"}
              </span>
            </div>
          ))
        )}
      </div>
      <button className="w-full mt-2 py-2.5 rounded-lg bg-vol-accent/10 hover:bg-vol-accent/20 text-vol-accent2 font-medium text-sm transition-all border border-vol-accent/20 hover:border-vol-accent/40 hover:shadow-glow-accent flex items-center justify-center gap-1.5 shrink-0">
        All Registrations <ChevronRight className="w-4 h-4" />
      </button>
    </Card>
  );
}

function TeamMembersWidget() {
  return (
    <Card title="Team Members" action={<Badge>Admin ▾</Badge>}>
      <div className="space-y-4 flex-1 overflow-y-auto custom-scrollbar">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-xs font-bold text-emerald-400 shadow-sm">JD</div>
          <div className="w-8 h-8 rounded-full bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-xs font-bold text-indigo-400 shadow-sm">MK</div>
          <div className="w-8 h-8 rounded-full bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-xs font-bold text-rose-400 shadow-sm">AS</div>
          <div className="w-8 h-8 rounded-full bg-vol-border/60 border border-vol-border flex items-center justify-center text-xs font-bold text-gray-300">+2</div>
          <ChevronRight className="w-4 h-4 text-gray-500 ml-auto my-auto hover:text-white transition-colors cursor-pointer" />
        </div>
        <div className="flex items-center gap-3 p-3 bg-vol-bg/60 rounded-xl border border-vol-border hover:border-vol-accent/30 transition-all">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 shrink-0 shadow-inner flex items-center justify-center text-white text-xs font-semibold">
            AC
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-white truncate">Alex Chen</p>
            <p className="text-xs text-gray-400">Volunteer Lead</p>
          </div>
        </div>
      </div>
      <button className="w-full mt-2 py-2.5 rounded-lg bg-vol-accent/10 hover:bg-vol-accent/20 text-vol-accent2 font-medium text-sm transition-all border border-vol-accent/20 hover:border-vol-accent/40 hover:shadow-glow-accent flex items-center justify-center gap-1.5 shrink-0">
        Invite Member <Plus className="w-4 h-4" />
      </button>
    </Card>
  );
}

function RecentActivitiesWidget() {
  return (
    <Card title="Recent Activities" action={<Badge>Latest ▾</Badge>}>
      <div className="space-y-4 flex-1 overflow-y-auto custom-scrollbar px-1">
        <ActivityItem icon={<QrCode className="w-3.5 h-3.5 text-vol-accent2" />} color="bg-vol-accent/15 border border-vol-accent/30 text-vol-accent2" title={<><b>Alex Chen</b> updated QR template</>} time="3 days ago" />
        <ActivityItem icon={<CheckCircle2 className="w-3.5 h-3.5 text-vol-success" />} color="bg-vol-success/15 border border-vol-success/30 text-vol-success" title={<>New volunteer approved to <b>center campuses</b>.</>} time="4 days ago" />
        <ActivityItem icon={<PlusSquare className="w-3.5 h-3.5 text-vol-accent2" />} color="bg-vol-accent/15 border border-vol-accent/30 text-vol-accent2" title={<>New event "Global Summit" saved</>} time="4 days ago" />
        <ActivityItem icon={<ClipboardList className="w-3.5 h-3.5 text-gray-400" />} color="bg-vol-border/40 border border-vol-border text-gray-400" title={<>Draft event "Global Summit" saved</>} time="3 days ago" />
      </div>
      <button className="w-full mt-2 py-2.5 rounded-lg bg-vol-accent/10 hover:bg-vol-accent/20 text-vol-accent2 font-medium text-sm transition-all border border-vol-accent/20 hover:border-vol-accent/40 hover:shadow-glow-accent flex items-center justify-center gap-1.5 shrink-0">
        <MessageSquare className="w-4 h-4" /> Activity Log
      </button>
    </Card>
  );
}

function CalendarWidget() {
  return (
    <Card title="Calendar" action={<Badge>Month ▾</Badge>}>
      <div className="text-xs text-gray-400 flex-1 overflow-hidden flex flex-col">
        <div className="grid grid-cols-7 mb-2 text-center shrink-0 font-semibold text-gray-500 uppercase tracking-wider text-[10px]">
          <span>Sun</span><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span>
        </div>
        <div className="grid grid-cols-7 gap-1 bg-transparent flex-1">
          {Array.from({ length: 28 }).map((_, i) => {
            const num = (i + 29) % 31 || 31;
            const hasEvent = [4, 5, 10, 11, 16, 17, 23, 24, 27].includes(i);
            const color = i % 3 === 0 ? 'bg-vol-accent2 shadow-[0_0_6px_#00E5FF]' : i % 2 === 0 ? 'bg-vol-accent shadow-[0_0_6px_#6E56CF]' : 'bg-vol-border';
            return (
              <div key={i} className="bg-vol-bg/80 border border-vol-border/60 hover:bg-vol-border/20 min-h-[30px] p-1 rounded-md relative flex items-start justify-start text-gray-300 font-medium text-[10px] transition-colors">
                {num}
                {hasEvent && <div className={`absolute bottom-1 left-1 right-1 h-1 ${color} rounded-full`} />}
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

function Card({ title, action, children }) {
  return (
    <div className="bg-vol-card rounded-2xl border border-vol-border overflow-hidden flex flex-col h-full transition-all duration-300 hover:border-vol-accent/40 hover:shadow-card-lift group/widget">
      {(title || action) && (
        <div className="px-5 py-4 flex items-center justify-between border-b border-vol-border/30 drag-handle cursor-move bg-vol-card shrink-0">
          {title && (
            <h3 className="text-base font-semibold text-white flex items-center gap-2">
              {title}
            </h3>
          )}
          {action && <div>{action}</div>}
        </div>
      )}
      <div className="flex-1 min-h-0 overflow-auto custom-scrollbar p-5 flex flex-col gap-3">
        {children}
      </div>
    </div>
  );
}

function Badge({ children, color = 'slate' }) {
  const bg = color === 'emerald'
    ? 'bg-vol-success/10 text-vol-success border-vol-success/20'
    : color === 'cyan'
      ? 'bg-vol-accent/15 text-vol-accent2 border-vol-accent/20'
      : color === 'warning'
        ? 'bg-vol-warning/10 text-vol-warning border-vol-warning/20'
        : 'bg-vol-border/50 text-gray-300 border-vol-border hover:bg-vol-border hover:text-white';
  return (
    <div className={`px-2.5 py-1 rounded-full text-xs font-medium border transition-all cursor-pointer ${bg}`}>
      {children}
    </div>
  );
}

function EventItem({ title, date, reg, vol, color, isActive }) {
  return (
    <div className={`flex items-center gap-4 p-3 rounded-xl border transition-all duration-200 cursor-pointer relative overflow-hidden group shrink-0 ${isActive
      ? 'bg-vol-accent/10 border-vol-accent2/30 shadow-sm'
      : 'bg-vol-bg/40 border-vol-border/60 hover:bg-vol-border/20 hover:border-vol-accent/30'
      }`}>
      <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-vol-accent2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-full" />
      <div className={`w-12 h-12 rounded-lg ${color} shrink-0 shadow-inner group-hover:scale-105 transition-transform duration-300 flex items-center justify-center text-white text-xs font-bold`}>
        <span>Event</span>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2 mb-0.5">
          <p className="text-sm font-semibold text-white truncate group-hover:text-vol-accent2 transition-colors">{title}</p>
          {isActive && (
            <span className="text-[10px] text-vol-accent2 font-semibold px-2 py-0.5 rounded-full bg-vol-accent/15 border border-vol-accent/25 shrink-0">Active</span>
          )}
        </div>
        <p className="text-xs text-gray-400 flex items-center gap-2">
          <span>{date}</span> <span className="w-1 h-1 rounded-full bg-gray-600" /> <span>{reg}</span> <span className="w-1 h-1 rounded-full bg-gray-600" /> <span>{vol}</span>
        </p>
      </div>
    </div>
  );
}

function AssignmentItem({ name, role }) {
  return (
    <div className="flex items-center justify-between p-3 rounded-xl hover:bg-vol-border/20 transition-all group cursor-pointer shrink-0 border border-transparent hover:border-vol-border/30 relative">
      <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-vol-accent2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-full" />
      <div className="flex items-center gap-3 min-w-0">
        <div className="w-10 h-10 rounded-full bg-vol-accent/10 border border-vol-accent/20 flex items-center justify-center shrink-0 text-vol-accent2 group-hover:bg-vol-accent/20 transition-all">
          <ClipboardList className="w-4 h-4" />
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-white group-hover:text-vol-accent2 transition-colors truncate">{name}</p>
          <p className="text-xs text-gray-400 truncate">{role}</p>
        </div>
      </div>
      <button className="text-xs bg-vol-border/50 hover:bg-vol-border text-gray-300 px-3 py-1 rounded-full transition-all border border-vol-border hover:border-vol-accent/30 hover:text-white shrink-0 ml-2 font-medium">
        Manage
      </button>
    </div>
  );
}

function CentralItem({ name, event, stat, color }) {
  const isOnDuty = stat === 'on-duty';
  return (
    <div className="grid grid-cols-12 gap-2 items-center text-xs hover:bg-vol-border/20 p-2.5 rounded-xl transition-all cursor-pointer shrink-0 border border-transparent hover:border-vol-border/30 group relative">
      <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-vol-accent2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-full" />
      <div className="col-span-5 flex items-center gap-2 min-w-0">
        <div className="w-8 h-8 rounded-full bg-vol-accent/15 border border-vol-accent/25 flex items-center justify-center shrink-0 text-vol-accent2 font-semibold text-xs">
          {name ? name.slice(0, 2).toUpperCase() : 'VO'}
        </div>
        <div className="truncate">
          <p className="font-semibold text-sm text-white truncate group-hover:text-vol-accent2 transition-colors">{name}</p>
          <p className="text-xs text-gray-400 truncate">Volunteer</p>
        </div>
      </div>
      <div className="col-span-4 min-w-0">
        <p className="text-gray-300 truncate text-xs">{event}</p>
      </div>
      <div className="col-span-3 text-right">
        <span className={`inline-flex items-center gap-1.5 text-[10px] px-2.5 py-0.5 rounded-full font-medium border ${isOnDuty
          ? 'bg-vol-success/10 text-vol-success border-vol-success/20'
          : 'bg-rose-500/10 text-rose-400 border-rose-500/20'
          }`}>
          <div className={`w-1.5 h-1.5 rounded-full ${isOnDuty ? 'bg-vol-success' : 'bg-rose-400'}`} /> {stat}
        </span>
      </div>
    </div>
  );
}

function ActivityItem({ icon, color, title, time }) {
  return (
    <div className="flex gap-3 relative shrink-0">
      <div className="absolute left-[15px] top-8 bottom-[-20px] w-px bg-vol-border/60" />
      <div className={`w-8 h-8 rounded-full ${color} flex items-center justify-center shrink-0 z-10 shadow-sm`}>
        {icon}
      </div>
      <div className="pt-0.5">
        <p className="text-xs text-gray-300 leading-relaxed mb-0.5">{title}</p>
        <p className="text-[11px] text-gray-500 font-medium">{time}</p>
      </div>
    </div>
  );
}
