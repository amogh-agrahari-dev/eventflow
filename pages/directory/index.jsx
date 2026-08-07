import React, { useState, useEffect, useMemo } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import OrganizerLayout from '@/components/dashboard/organizer/OrganizerLayout';
import { Calendar, Users, MapPin, ChevronRight, Search, Loader2, Plus, AlertCircle, RefreshCw } from 'lucide-react';
import { useUserStore } from '@/store/userStore';

export default function VolunteerDirectoryHub() {
  const router = useRouter();
  const { user, fetchUser } = useUserStore();
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) {
      fetchUser();
    }
  }, [user, fetchUser]);

  const fetchOrganizedEvents = async (targetUserId) => {
    const userId = targetUserId || user?.id || user?._id || user?.user_id;
    if (!userId) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/events/${userId}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch events (${response.status})`);
      }

      const data = await response.json();
      console.log('Fetched organized events:', data);

      if (Array.isArray(data)) {
        setEvents(data);
      } else if (data && data.success && Array.isArray(data.events)) {
        setEvents(data.events);
      } else if (data && Array.isArray(data.data)) {
        setEvents(data.data);
      } else {
        setEvents([]);
      }
    } catch (err) {
      console.error('Error fetching organized events:', err);
      setError(err.message || 'Failed to load events.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const userId = user?.id || user?._id || user?.user_id;
    if (userId) {
      fetchOrganizedEvents(userId);
    } else {
      setIsLoading(false);
    }
  }, [user]);

  const handleEventClick = (eventId) => {
    router.push(`/directory/${eventId}`);
  };

  const filteredEvents = useMemo(() => {
    if (!searchQuery.trim()) return events;
    const q = searchQuery.toLowerCase();
    return events.filter(
      (event) =>
        event.title?.toLowerCase().includes(q) ||
        event.category?.toLowerCase().includes(q) ||
        event.location?.toLowerCase().includes(q)
    );
  }, [events, searchQuery]);

  return (
    <OrganizerLayout>
      <Head>
        <title>Volunteer Directory | EventFlow Campus Management</title>
      </Head>

      <div className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 custom-scrollbar scroll-smooth">
        <div className="max-w-7xl mx-auto space-y-6">

          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-white tracking-tight">Volunteer Directory</h1>
              <p className="text-sm text-gray-400 mt-1">
                Select an event to view and manage its assigned volunteers.
              </p>
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto">
              <div className="relative w-full md:w-64">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search events..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-vol-card border border-vol-border rounded-full py-2 pl-9 pr-4 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-vol-accent2/50 transition-colors"
                />
              </div>
              <Link
                href="/events/add"
                className="hidden sm:inline-flex items-center gap-2 bg-[#6E56CF] hover:bg-[#5a46aa] text-white px-4 py-2 rounded-full text-sm font-medium transition-colors shrink-0 shadow-lg shadow-[#6E56CF]/20"
              >
                <Plus size={16} /> Create Event
              </Link>
            </div>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="bg-vol-card rounded-2xl border border-vol-border overflow-hidden h-96 animate-pulse flex flex-col"
                >
                  <div className="h-40 bg-gray-800/50 w-full" />
                  <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="h-5 bg-gray-800/60 rounded w-3/4" />
                      <div className="h-4 bg-gray-800/40 rounded w-1/2" />
                    </div>
                    <div className="space-y-2">
                      <div className="h-3 bg-gray-800/40 rounded w-2/3" />
                      <div className="h-3 bg-gray-800/40 rounded w-1/2" />
                    </div>
                    <div className="pt-4 border-t border-vol-border/40 h-8 bg-gray-800/30 rounded" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Error State */}
          {!isLoading && error && (
            <div className="bg-rose-500/10 border border-rose-500/20 rounded-2xl p-6 text-center max-w-md mx-auto my-8">
              <AlertCircle className="w-10 h-10 text-rose-400 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-white mb-1">Failed to Load Events</h3>
              <p className="text-sm text-gray-400 mb-4">{error}</p>
              <button
                onClick={fetchOrganizedEvents}
                className="inline-flex items-center gap-2 px-4 py-2 bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 rounded-lg text-sm font-medium transition-colors"
              >
                <RefreshCw size={14} /> Try Again
              </button>
            </div>
          )}

          {/* Empty State: Not logged in */}
          {!isLoading && !error && !user && (
            <div className="bg-vol-card border border-vol-border rounded-2xl p-12 text-center max-w-lg mx-auto my-8">
              <Users className="w-12 h-12 text-gray-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Login Required</h3>
              <p className="text-sm text-gray-400 mb-6">
                Please log in as an organizer to view and manage volunteer directories for your events.
              </p>
              <Link
                href="/auth/login"
                className="inline-flex items-center gap-2 bg-[#6E56CF] hover:bg-[#5a46aa] text-white px-6 py-2.5 rounded-full text-sm font-medium transition-colors shadow-lg shadow-[#6E56CF]/20"
              >
                Go to Login
              </Link>
            </div>
          )}

          {/* Empty State: No events created */}
          {!isLoading && !error && user && events.length === 0 && (
            <div className="bg-vol-card border border-vol-border rounded-2xl p-12 text-center max-w-lg mx-auto my-8">
              <Calendar className="w-12 h-12 text-gray-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">No Events Found</h3>
              <p className="text-sm text-gray-400 mb-6">
                You haven&apos;t organised any events yet. Create your first event to start recruiting and managing volunteers.
              </p>
              <Link
                href="/events/add"
                className="inline-flex items-center gap-2 bg-[#6E56CF] hover:bg-[#5a46aa] text-white px-6 py-2.5 rounded-full text-sm font-medium transition-colors shadow-lg shadow-[#6E56CF]/20"
              >
                <Plus size={16} /> Create an Event
              </Link>
            </div>
          )}

          {/* Empty State: Filter matched nothing */}
          {!isLoading && !error && events.length > 0 && filteredEvents.length === 0 && (
            <div className="bg-vol-card border border-vol-border rounded-2xl p-8 text-center max-w-md mx-auto my-8">
              <Search className="w-10 h-10 text-gray-500 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-white mb-1">No Matching Events</h3>
              <p className="text-sm text-gray-400 mb-4">
                No events found matching &quot;{searchQuery}&quot;.
              </p>
              <button
                onClick={() => setSearchQuery('')}
                className="px-4 py-2 bg-vol-card hover:bg-vol-border/30 border border-vol-border text-sm text-white rounded-lg transition-colors"
              >
                Clear Search
              </button>
            </div>
          )}

          {/* Events Grid */}
          {!isLoading && !error && filteredEvents.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map((event) => {
                const eventId = event.id || event._id || event.event_id;
                const eventDate = event.start_time || event.startDate || event.date;
                const volunteersRequired = event.volunteers_required ?? event.volunteersRequired ?? 0;
                const volunteerCount = Array.isArray(event.volunteers) ? event.volunteers.length : (event.volunteers_count || 0);

                return (
                  <div
                    key={eventId}
                    onClick={() => handleEventClick(eventId)}
                    className="bg-vol-card rounded-2xl border border-vol-border overflow-hidden flex flex-col transition-all duration-300 hover:border-vol-accent2/50 hover:shadow-[0_8px_30px_-4px_rgba(0,229,255,0.1)] cursor-pointer group"
                  >
                    {/* Event Image */}
                    <div className="relative h-40 w-full overflow-hidden bg-gradient-to-br from-[#2D3340] to-[#1C202B]">
                      <div className="absolute inset-0 bg-gradient-to-t from-vol-card via-transparent to-transparent z-10" />
                      <img
                        src={
                          event.banner_url ||
                          event.image_url ||
                          'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=60'
                        }
                        alt={event.title}
                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          e.currentTarget.src =
                            'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=60';
                        }}
                      />
                      <div className="absolute top-3 right-3 z-20 flex gap-2">
                        {event.category && (
                          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-vol-bg/80 text-white backdrop-blur-sm border border-vol-border/50 uppercase tracking-wider">
                            {event.category}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5 flex flex-col flex-1">
                      <h3 className="text-lg font-bold text-white mb-2 group-hover:text-vol-accent2 transition-colors line-clamp-1">
                        {event.title}
                      </h3>

                      <div className="space-y-2 mb-4">
                        {eventDate && (
                          <div className="flex items-center text-sm text-gray-300">
                            <Calendar className="w-4 h-4 mr-2 text-vol-accent shrink-0" />
                            <span className="truncate">
                              {new Date(eventDate).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric',
                              })}
                            </span>
                          </div>
                        )}
                        <div className="flex items-center text-sm text-gray-300">
                          <MapPin className="w-4 h-4 mr-2 text-vol-accent shrink-0" />
                          <span className="truncate">{event.location || 'Location TBA'}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-300">
                          <Users className="w-4 h-4 mr-2 text-vol-accent shrink-0" />
                          <span>{volunteersRequired} Volunteers Required</span>
                        </div>
                      </div>

                      <div className="mt-auto pt-4 border-t border-vol-border flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="flex -space-x-2">
                            {volunteerCount > 0 ? (
                              Array.from({ length: Math.min(3, volunteerCount) }).map((_, i) => (
                                <div
                                  key={i}
                                  className={`w-6 h-6 rounded-full border-2 border-vol-card flex items-center justify-center text-[8px] font-bold text-white ${i === 0 ? 'bg-indigo-500' : i === 1 ? 'bg-emerald-500' : 'bg-rose-500'
                                    }`}
                                >
                                  V{i + 1}
                                </div>
                              ))
                            ) : (
                              <div className="w-6 h-6 rounded-full border-2 border-vol-card bg-gray-700 flex items-center justify-center text-[8px] font-bold text-gray-300">
                                0
                              </div>
                            )}
                          </div>
                          <span className="text-xs text-gray-400 font-medium">
                            {volunteerCount} assigned
                          </span>
                        </div>

                        <div className="w-8 h-8 rounded-full bg-vol-accent/10 flex items-center justify-center group-hover:bg-vol-accent2 group-hover:text-vol-bg transition-colors">
                          <ChevronRight className="w-4 h-4 text-vol-accent2 group-hover:text-vol-bg" />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </OrganizerLayout>
  );
}
