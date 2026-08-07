import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import OrganizerLayout from '@/components/dashboard/organizer/OrganizerLayout';
import {
  Users,
  Mail,
  Calendar,
  Clock,
  CheckCircle2,
  ArrowLeft,
  Download,
  Plus,
  ChevronDown,
  ChevronRight,
  ListTodo,
  Search,
  AlertCircle,
  RefreshCw,
  MapPin,
  UserCheck
} from 'lucide-react';
import Link from 'next/link';
import { useTaskStore } from '@/store/taskStore';
import AssignTaskModal from '@/components/dashboard/organizer/AssignTaskModal';

export default function EventVolunteersDirectory() {
  const router = useRouter();
  const { id } = router.query;
  const eventId = id ? (isNaN(Number(id)) ? id : Number(id)) : null;

  const [event, setEvent] = useState(null);
  const [tasksList, setTasksList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const { tasks: storeTasks, addTask: addTaskToStore } = useTaskStore();

  const [expandedRows, setExpandedRows] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVolunteer, setSelectedVolunteer] = useState(null);

  const fetchEventData = useCallback(async () => {
    if (!id) return;
    setIsLoading(true);
    setError(null);
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
      const headers = {
        'Content-Type': 'application/json',
      };

      // 1. Fetch Event details with fallback
      let eventData = null;
      let eventRes = await fetch(`${baseUrl}/event/${id}`, { method: 'GET', headers });

      if (!eventRes.ok && (eventRes.status === 404 || eventRes.status === 405)) {
        console.warn(`GET /event/${id} returned ${eventRes.status}, trying /events/${id}...`);
        const fallbackRes = await fetch(`${baseUrl}/events/${id}`, { method: 'GET', headers });
        if (fallbackRes.ok) {
          eventRes = fallbackRes;
        }
      }

      if (eventRes.ok) {
        eventData = await eventRes.json();
      } else {
        throw new Error(`Failed to load event #${id} (Status: ${eventRes.status})`);
      }

      // If volunteers array is missing or empty on eventData, try /{id}/volunteers
      if (!Array.isArray(eventData.volunteers) || eventData.volunteers.length === 0) {
        try {
          const volRes = await fetch(`${baseUrl}/${id}/volunteers`, { method: 'GET', headers });
          if (volRes.ok) {
            const volData = await volRes.json();
            if (Array.isArray(volData)) {
              eventData.volunteers = volData;
            } else if (volData && Array.isArray(volData.volunteers)) {
              eventData.volunteers = volData.volunteers;
            }
          }
        } catch (vErr) {
          console.warn(`Could not fetch volunteers from /${id}/volunteers:`, vErr);
        }
      }

      setEvent(eventData);

      // 2. Fetch user-specific tasks for this event for each volunteer: /tasks/{user_id}/{event_id}
      let allTasks = [];
      if (Array.isArray(eventData.volunteers) && eventData.volunteers.length > 0) {
        const taskPromises = eventData.volunteers.map(async (v) => {
          const vUserId = typeof v === 'object' && v !== null ? (v.id ?? v.user_id ?? v.userId) : v;
          if (!vUserId) return [];
          try {
            const res = await fetch(`${baseUrl}/tasks/${vUserId}/${id}`, {
              method: 'GET',
              headers,
            });
            if (res.ok) {
              const data = await res.json();
              return Array.isArray(data) ? data : [];
            } else {
              console.warn(`GET /tasks/${vUserId}/${id} returned status:`, res.status);
            }
          } catch (e) {
            console.warn(`Failed to fetch tasks for user ${vUserId} and event ${id}:`, e);
          }
          return [];
        });

        const taskResults = await Promise.allSettled(taskPromises);
        taskResults.forEach((r) => {
          if (r.status === 'fulfilled' && Array.isArray(r.value)) {
            allTasks.push(...r.value);
          }
        });
      }

      // Filter and assign tasks matching current event_id
      const validTasks = allTasks.filter((t) => {
        const taskEventId = t.event_id ?? t.eventId;
        if (taskEventId === undefined || taskEventId === null) return true;
        return String(taskEventId) === String(id);
      });
      setTasksList(validTasks);
    } catch (err) {
      console.error('Error fetching event data in directory/[id]:', err);
      setError(err.message || 'Failed to load event details.');
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      fetchEventData();
    }
  }, [id, fetchEventData]);

  const toggleRow = (vId) => {
    setExpandedRows((prev) => ({ ...prev, [vId]: !prev[vId] }));
  };

  const openAssignModal = (volunteer) => {
    setSelectedVolunteer(volunteer);
    setIsModalOpen(true);
  };

  const handleTaskCreated = (newTask) => {
    setTasksList((prev) => [newTask, ...prev]);
    addTaskToStore(newTask);
  };

  const getStatusColor = (status) => {
    const s = String(status || '').toLowerCase();
    if (s === 'checked in' || s === 'on-duty' || s === 'active' || s === 'completed') {
      return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
    }
    if (s === 'pending' || s === 'standby' || s === 'registered' || s === 'in-progress') {
      return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
    }
    if (s === 'absent' || s === 'off-duty') {
      return 'bg-rose-500/10 text-rose-400 border-rose-500/30';
    }
    return 'bg-gray-500/10 text-gray-400 border-gray-500/30';
  };

  const formatStatusText = (status) => {
    if (!status) return 'On-Duty';
    const s = String(status).trim();
    if (s.toLowerCase() === 'on-duty') return 'On Duty';
    if (s.toLowerCase() === 'off-duty') return 'Off Duty';
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  const volunteers = useMemo(() => {
    if (!event || !Array.isArray(event.volunteers)) return [];
    return event.volunteers;
  }, [event]);

  const filteredVolunteers = useMemo(() => {
    if (!searchQuery.trim()) return volunteers;
    const q = searchQuery.toLowerCase();
    return volunteers.filter(
      (v) =>
        v.name?.toLowerCase().includes(q) ||
        v.email?.toLowerCase().includes(q) ||
        v.status?.toLowerCase().includes(q) ||
        v.role?.toLowerCase().includes(q)
    );
  }, [volunteers, searchQuery]);

  // Merge backend tasks with any locally added tasks in store, strictly validating event_id
  const allEventTasks = useMemo(() => {
    const isMatchingEvent = (task) => {
      if (!eventId) return true;
      const taskEventId = task.event_id ?? task.eventId;
      if (taskEventId === undefined || taskEventId === null) return true;
      return String(taskEventId) === String(eventId);
    };

    const validBackendTasks = tasksList.filter(isMatchingEvent);
    const combined = [...validBackendTasks];

    storeTasks
      .filter(isMatchingEvent)
      .forEach((st) => {
        if (!combined.some((t) => t.id === st.id)) {
          combined.push(st);
        }
      });

    return combined;
  }, [tasksList, storeTasks, eventId]);

  const exportCSV = () => {
    if (!volunteers.length) return;
    const headers = ['ID', 'Name', 'Email', 'Status', 'Role', 'Tasks Assigned', 'Tasks Completed'];
    const rows = volunteers.map((v) => {
      const vTasks = allEventTasks.filter((t) => {
        const isUserMatch =
          String(t.user_id || t.volunteerId || t.volunteer_id) === String(v.id);
        const taskEventId = t.event_id ?? t.eventId;
        const isEventMatch =
          !eventId || taskEventId === undefined || taskEventId === null || String(taskEventId) === String(eventId);
        return isUserMatch && isEventMatch;
      });

      const doneTasks = vTasks.filter(
        (t) => t.completed || t.status === 'completed' || t.status === 'done'
      ).length;

      return [
        v.id,
        `"${v.name || ''}"`,
        `"${v.email || ''}"`,
        `"${v.status || 'on-duty'}"`,
        `"${v.role || 'Volunteer'}"`,
        vTasks.length,
        doneTasks,
      ];
    });

    const csvContent =
      'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `volunteers_event_${event?.id || 'roster'}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (isLoading) {
    return (
      <OrganizerLayout>
        <Head>
          <title>Loading Volunteers Directory... | EventFlow</title>
        </Head>
        <div className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 custom-scrollbar">
          <div className="max-w-7xl mx-auto space-y-6">
            <div className="animate-pulse space-y-4">
              <div className="h-4 bg-gray-800 rounded w-32" />
              <div className="h-8 bg-gray-800 rounded w-64" />
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-24 bg-vol-card rounded-xl border border-vol-border" />
                ))}
              </div>
              <div className="h-80 bg-vol-card rounded-2xl border border-vol-border mt-6" />
            </div>
          </div>
        </div>
      </OrganizerLayout>
    );
  }

  if (!event || error) {
    return (
      <OrganizerLayout>
        <Head>
          <title>Event Not Found | EventFlow</title>
        </Head>
        <div className="flex-1 overflow-y-auto p-6 flex items-center justify-center">
          <div className="bg-vol-card border border-vol-border rounded-2xl p-8 max-w-md text-center">
            <AlertCircle className="w-12 h-12 text-rose-400 mx-auto mb-3" />
            <h2 className="text-xl font-bold text-white mb-2">Event Not Found</h2>
            <p className="text-sm text-gray-400 mb-6">
              {error || `We couldn't retrieve event details for ID #${id}.`}
            </p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={fetchEventData}
                className="px-4 py-2 bg-vol-card border border-vol-border hover:bg-vol-border/40 text-sm text-white rounded-xl transition-colors flex items-center gap-2"
              >
                <RefreshCw size={14} /> Retry
              </button>
              <Link
                href="/directory"
                className="px-4 py-2 bg-[#6E56CF] hover:bg-[#5a46aa] text-sm text-white rounded-xl transition-colors font-medium"
              >
                Back to Directory
              </Link>
            </div>
          </div>
        </div>
      </OrganizerLayout>
    );
  }

  const eventDate = event.start_time || event.startDate || event.created_at;
  const volunteersRequired = event.volunteers_required ?? event.volunteersRequired ?? 0;
  const checkedInCount = volunteers.filter((v) =>
    ['checked in', 'on-duty', 'active'].includes(String(v.status || '').toLowerCase())
  ).length;
  const pendingCount = volunteers.filter((v) =>
    ['pending', 'standby', 'registered'].includes(String(v.status || '').toLowerCase())
  ).length;

  return (
    <OrganizerLayout>
      <Head>
        <title>{`Volunteers: ${event.title}`} | EventFlow</title>
      </Head>

      <AssignTaskModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedVolunteer(null);
        }}
        volunteer={selectedVolunteer}
        volunteerName={selectedVolunteer?.name}
        eventId={eventId}
        onTaskCreated={handleTaskCreated}
      />

      <div className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 custom-scrollbar scroll-smooth">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Top Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-vol-border/40 pb-6">
            <div>
              <Link
                href="/directory"
                className="inline-flex items-center text-sm text-vol-accent2 hover:text-white transition-colors mb-3 group"
              >
                <ArrowLeft size={16} className="mr-1 group-hover:-translate-x-0.5 transition-transform" />
                Back to Directory
              </Link>
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                  {event.title}
                </h1>
                {event.category && (
                  <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-vol-accent/10 text-vol-accent2 border border-vol-accent/20 uppercase tracking-wider">
                    {event.category}
                  </span>
                )}
                {event.format && (
                  <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-pink-500/10 text-pink-400 border border-pink-500/20 uppercase tracking-wider">
                    {event.format}
                  </span>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-4 md:gap-6 mt-3 text-sm text-gray-400">
                {eventDate && (
                  <div className="flex items-center gap-1.5">
                    <Calendar size={14} className="text-vol-accent" />
                    <span>
                      {new Date(eventDate).toLocaleDateString('en-US', {
                        weekday: 'short',
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                )}
                {event.start_time && (
                  <div className="flex items-center gap-1.5">
                    <Clock size={14} className="text-vol-accent" />
                    <span>
                      {new Date(event.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      {event.end_time && ` - ${new Date(event.end_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`}
                    </span>
                  </div>
                )}
                {event.location && (
                  <div className="flex items-center gap-1.5">
                    <MapPin size={14} className="text-vol-accent" />
                    <span>{event.location}</span>
                  </div>
                )}
                {event.organizer?.name && (
                  <div className="flex items-center gap-1.5">
                    <UserCheck size={14} className="text-vol-accent" />
                    <span>Organized by {event.organizer.name}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={exportCSV}
                disabled={volunteers.length === 0}
                className={`flex items-center gap-2 bg-vol-card border border-vol-border px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${volunteers.length === 0
                  ? 'opacity-50 cursor-not-allowed text-gray-500'
                  : 'hover:bg-vol-border/30 text-gray-200 hover:text-white'
                  }`}
              >
                <Download size={16} /> Export Roster
              </button>
            </div>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-vol-card rounded-xl border border-vol-border p-4">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Total Assigned</p>
              <div className="flex items-baseline gap-2">
                <p className="text-2xl font-bold text-white">{volunteers.length}</p>
                <span className="text-xs text-gray-400">/ {volunteersRequired} req.</span>
              </div>
            </div>
            <div className="bg-vol-card rounded-xl border border-vol-border p-4">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">On Duty / Checked In</p>
              <p className="text-2xl font-bold text-emerald-400">{checkedInCount}</p>
            </div>
            <div className="bg-vol-card rounded-xl border border-vol-border p-4">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Pending Arrival</p>
              <p className="text-2xl font-bold text-amber-400">{pendingCount}</p>
            </div>
            <div className="bg-vol-card rounded-xl border border-vol-border p-4">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Active Tasks</p>
              <p className="text-2xl font-bold text-vol-accent2">{allEventTasks.length}</p>
            </div>
          </div>

          {/* Table Container */}
          <div className="bg-vol-card border border-vol-border rounded-2xl overflow-hidden">
            {/* Search & Filter Header inside table container */}
            <div className="p-4 border-b border-vol-border/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Users size={18} className="text-vol-accent2" />
                <h3 className="text-base font-semibold text-white">Registered Volunteers</h3>
                <span className="text-xs px-2 py-0.5 bg-vol-accent/10 text-vol-accent2 rounded-full font-medium">
                  {volunteers.length}
                </span>
              </div>
              <div className="relative w-full sm:w-64">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Filter volunteers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-vol-bg/60 border border-vol-border/80 rounded-lg py-1.5 pl-8 pr-3 text-xs text-white placeholder-gray-400 focus:outline-none focus:border-vol-accent2/50 transition-colors"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-vol-bg/50 border-b border-vol-border/40">
                    <th className="px-6 py-4 w-10"></th>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      Volunteer Name
                    </th>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      Role & Shift
                    </th>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      Tasks
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-vol-border/40">
                  {filteredVolunteers.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-6 py-12 text-center">
                        <Users className="w-10 h-10 text-gray-500 mx-auto mb-3 opacity-60" />
                        <h4 className="text-base font-semibold text-white mb-1">
                          {volunteers.length === 0
                            ? 'No Volunteers Assigned Yet'
                            : 'No Matching Volunteers Found'}
                        </h4>
                        <p className="text-xs text-gray-400 max-w-sm mx-auto">
                          {volunteers.length === 0
                            ? `This event currently has 0 registered volunteers out of ${volunteersRequired} required. As users sign up to volunteer, they will appear here.`
                            : `No volunteer matches "${searchQuery}".`}
                        </p>
                      </td>
                    </tr>
                  ) : (
                    filteredVolunteers.map((volunteer) => {
                      // Filter volunteer's tasks and validate that event_id matches the current event
                      const volunteerTasks = allEventTasks.filter((t) => {
                        const isUserMatch =
                          String(t.user_id || t.volunteerId || t.volunteer_id) ===
                          String(volunteer.id);
                        const taskEventId = t.event_id ?? t.eventId;
                        const isEventMatch =
                          !eventId ||
                          taskEventId === undefined ||
                          taskEventId === null ||
                          String(taskEventId) === String(eventId);
                        return isUserMatch && isEventMatch;
                      });

                      const completedTasks = volunteerTasks.filter(
                        (t) =>
                          t.completed ||
                          t.status === 'completed' ||
                          t.status === 'done'
                      ).length;
                      const isExpanded = expandedRows[volunteer.id];
                      const initials = (volunteer.name || 'V')
                        .split(' ')
                        .map((n) => n[0])
                        .join('')
                        .slice(0, 2)
                        .toUpperCase();

                      const role = volunteer.role || 'Event Volunteer';
                      const shift =
                        volunteer.shift ||
                        (event.start_time
                          ? `${new Date(event.start_time).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                          })} - ${event.end_time
                            ? new Date(event.end_time).toLocaleTimeString([], {
                              hour: '2-digit',
                              minute: '2-digit',
                            })
                            : 'End'
                          }`
                          : 'Shift Active');

                      return (
                        <React.Fragment key={volunteer.id}>
                          <tr className="hover:bg-vol-bg/30 transition-colors">
                            <td className="px-6 py-4">
                              <button
                                onClick={() => toggleRow(volunteer.id)}
                                className="text-gray-400 hover:text-white transition-colors"
                              >
                                {isExpanded ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                              </button>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-full bg-vol-accent/10 border border-vol-accent/30 flex items-center justify-center text-vol-accent2 font-bold text-sm shrink-0">
                                  {initials}
                                </div>
                                <div>
                                  <div className="text-sm font-semibold text-white">
                                    {volunteer.name || 'Unnamed Volunteer'}
                                  </div>
                                  {volunteer.email && (
                                    <div className="flex flex-col gap-1 mt-1">
                                      <a
                                        href={`mailto:${volunteer.email}`}
                                        className="text-[11px] text-gray-400 hover:text-vol-accent2 flex items-center gap-1 transition-colors"
                                      >
                                        <Mail size={10} /> {volunteer.email}
                                      </a>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="text-sm font-medium text-gray-300">{role}</div>
                              <div className="text-xs text-gray-500 mt-0.5">{shift}</div>
                            </td>
                            <td className="px-6 py-4">
                              <span
                                className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-medium border ${getStatusColor(
                                  volunteer.status
                                )}`}
                              >
                                {formatStatusText(volunteer.status)}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-2">
                                <ListTodo size={14} className="text-gray-400" />
                                <span className="text-xs font-medium text-gray-300">
                                  {completedTasks}/{volunteerTasks.length} Done
                                </span>
                              </div>
                            </td>
                            <td className="px-6 py-4 text-right">
                              <div className="flex justify-end gap-2">
                                <button
                                  onClick={() => openAssignModal(volunteer)}
                                  className="px-3 py-1.5 text-xs font-medium bg-vol-accent/10 text-vol-accent2 hover:bg-vol-accent/20 border border-vol-accent/20 rounded-lg transition-colors flex items-center gap-1"
                                >
                                  <Plus size={14} /> Assign Task
                                </button>
                              </div>
                            </td>
                          </tr>

                          {/* Expanded Tasks Row */}
                          {isExpanded && (
                            <tr className="bg-black/20">
                              <td colSpan={6} className="px-6 py-4 border-t border-vol-border/30">
                                <div className="pl-12">
                                  <div className="flex items-center justify-between mb-3">
                                    <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                                      Assigned Tasks ({volunteer.name})
                                    </h4>
                                    <button
                                      onClick={() => openAssignModal(volunteer)}
                                      className="text-xs text-vol-accent2 hover:underline flex items-center gap-1"
                                    >
                                      <Plus size={12} /> Add Another Task
                                    </button>
                                  </div>

                                  {volunteerTasks.length === 0 ? (
                                    <p className="text-xs text-gray-500 italic">
                                      No tasks assigned for this event yet. Click &quot;Assign Task&quot; to add one.
                                    </p>
                                  ) : (
                                    <div className="space-y-2">
                                      {volunteerTasks.map((task, idx) => {
                                        const importanceKey = String(
                                          task.importance || task.priority || 'medium'
                                        ).toLowerCase();
                                        const isCompleted =
                                          task.completed ||
                                          task.status === 'completed' ||
                                          task.status === 'done';

                                        return (
                                          <div
                                            key={task.id || idx}
                                            className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-vol-bg/50 border border-vol-border/40 p-3 rounded-xl hover:border-vol-border/70 transition-colors"
                                          >
                                            <div className="flex items-start gap-3">
                                              <div
                                                className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${importanceKey === 'high'
                                                  ? 'bg-rose-400 shadow-[0_0_8px_rgba(244,63,94,0.6)]'
                                                  : importanceKey === 'medium'
                                                    ? 'bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.6)]'
                                                    : 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]'
                                                  }`}
                                              />
                                              <div>
                                                <div className="flex items-center gap-2 flex-wrap">
                                                  <p
                                                    className={`text-sm font-semibold ${isCompleted
                                                      ? 'line-through text-gray-500'
                                                      : 'text-gray-100'
                                                      }`}
                                                  >
                                                    {task.title}
                                                  </p>
                                                  <span
                                                    className={`text-[10px] uppercase font-bold px-1.5 py-0.5 rounded border ${importanceKey === 'high'
                                                      ? 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                                                      : importanceKey === 'medium'
                                                        ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                                                        : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                                                      }`}
                                                  >
                                                    {importanceKey}
                                                  </span>
                                                </div>

                                                {task.description && (
                                                  <p className="text-xs text-gray-400 mt-1">
                                                    {task.description}
                                                  </p>
                                                )}

                                                {task.location && (
                                                  <div className="flex items-center gap-1 text-[11px] text-gray-500 mt-1">
                                                    <MapPin size={11} className="text-vol-accent" />
                                                    <span>{task.location}</span>
                                                  </div>
                                                )}
                                              </div>
                                            </div>

                                            <div className="shrink-0 self-end sm:self-center">
                                              {isCompleted ? (
                                                <span className="flex items-center gap-1 text-xs font-medium text-emerald-400 bg-emerald-400/10 px-2.5 py-1 rounded-full border border-emerald-400/20">
                                                  <CheckCircle2 size={12} /> Completed
                                                </span>
                                              ) : (
                                                <span className="flex items-center gap-1 text-xs font-medium text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded-full border border-amber-400/20">
                                                  <Clock size={12} /> {task.status || 'Pending'}
                                                </span>
                                              )}
                                            </div>
                                          </div>
                                        );
                                      })}
                                    </div>
                                  )}
                                </div>
                              </td>
                            </tr>
                          )}
                        </React.Fragment>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </OrganizerLayout>
  );
}
