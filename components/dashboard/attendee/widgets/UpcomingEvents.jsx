import React, { useState, useEffect } from 'react';
import WidgetCard from '../../volunteer/widgets/WidgetCard';
import { MapPin, ChevronRight, Calendar, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useUserStore } from '@/store/userStore';
import { getToken } from '@/lib/auth';

const GRADIENTS = [
  'from-orange-500 to-amber-700',
  'from-blue-600 to-purple-600',
  'from-emerald-500 to-teal-700',
  'from-pink-500 to-rose-700',
  'from-violet-600 to-indigo-700',
  'from-cyan-500 to-blue-600',
  'from-fuchsia-500 to-pink-600',
];

const formatEventDate = (dateVal, timeVal) => {
  if (!dateVal) return 'Upcoming';

  if (typeof dateVal === 'string' && (dateVal.includes('•') || dateVal.toLowerCase() === 'upcoming')) {
    return dateVal;
  }

  try {
    const d = new Date(dateVal);
    if (isNaN(d.getTime())) return String(dateVal);

    const dateFormatted = d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });

    const isISOTime = typeof dateVal === 'string' && (dateVal.includes('T') || dateVal.includes(':'));

    if (timeVal && typeof timeVal === 'string') {
      return `${dateFormatted} • ${timeVal}`;
    }

    if (isISOTime && (d.getHours() !== 0 || d.getMinutes() !== 0)) {
      const timeFormatted = d.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      });
      return `${dateFormatted} • ${timeFormatted}`;
    }

    return dateFormatted;
  } catch {
    return String(dateVal);
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1 + 0.2, duration: 0.45, ease: [0.16, 1, 0.3, 1] }
  })
};

export default function UpcomingEvents({ delay = 0, className }) {
  const router = useRouter();
  const { user, fetchUser } = useUserStore();
  const [eventsList, setEventsList] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUpcomingEvents = async () => {
    const userId = user?.id || user?._id || user?.user_id;
    if (!userId) {
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const headers = {
        'Content-Type': 'application/json',
      };

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/passes/${userId}`, {
        headers,
      });

      if (response.ok) {
        const data = await response.json();
        if (Array.isArray(data)) {
          // Extract the event object from each pass
          const parsedEvents = data.map((pass, idx) => {
            const eventObj = (pass.event && typeof pass.event === 'object') ? pass.event : {};
            const eventTitle = typeof pass.event === 'string'
              ? pass.event
              : (pass.event?.title || pass.event?.name || pass.event_name || pass.event_title || pass.title || 'Upcoming Event');

            const rawDate = pass.date || pass.event_date || eventObj.date || eventObj.event_date || pass.created_at;
            const rawTime = pass.time || pass.event_time || eventObj.time || eventObj.event_time;
            const formattedDate = formatEventDate(rawDate, rawTime);

            const eventLocation = pass.venue || pass.location || pass.event_venue || pass.event_location || eventObj.location || eventObj.venue || 'Main Auditorium';
            const eventId = eventObj.id || eventObj._id || pass.event_id || pass.eventId || pass.id;
            const imageGradient = GRADIENTS[idx % GRADIENTS.length];
            const imageUrl = eventObj.image_url || eventObj.banner_url || eventObj.image || pass.image_url;

            return {
              id: eventId,
              passId: pass.id || pass.pass_id || pass.ticket_id,
              title: eventTitle,
              date: formattedDate,
              venue: eventLocation,
              status: pass.status || 'Registered',
              imageGradient,
              imageUrl,
              rawEvent: eventObj,
            };
          });

          setEventsList(parsedEvents);
        } else {
          setEventsList([]);
        }
      } else {
        console.error("Failed to fetch passes for upcoming events:", response.statusText);
        setEventsList([]);
      }
    } catch (error) {
      console.error("Error fetching passes for upcoming events:", error);
      setEventsList([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = getToken();
    if (token && !user && fetchUser) {
      fetchUser();
    }
  }, [user, fetchUser]);

  useEffect(() => {
    if (user) {
      fetchUpcomingEvents();
    } else {
      const token = getToken();
      if (!token) {
        setLoading(false);
      }
    }
  }, [user]);

  const handleEventClick = (eventId) => {
    if (eventId) {
      router.push(`/events/${eventId}`);
    } else {
      router.push('/all-events?role=attendee');
    }
  };

  return (
    <WidgetCard
      title="Upcoming Events"
      delay={delay}
      className={className}
      action={
        <Link
          href="/all-events?role=attendee"
          className="text-xs bg-vol-border/50 hover:bg-vol-border text-gray-300 px-3 py-1 rounded-full transition-all border border-vol-border hover:border-vol-accent/30 hover:text-white inline-block"
        >
          View All
        </Link>
      }
    >
      <div className="flex-1 p-5 flex flex-col justify-between gap-3 min-h-[240px]">
        {loading ? (
          <div className="py-12 flex flex-col items-center justify-center text-center my-auto">
            <Loader2 size={24} className="animate-spin text-vol-accent2 mb-2.5" />
            <p className="text-xs text-gray-400 animate-pulse">Loading your upcoming events...</p>
          </div>
        ) : eventsList.length === 0 ? (
          <div className="py-10 text-center flex flex-col items-center justify-center my-auto border border-dashed border-vol-border/40 rounded-xl bg-vol-card/20 px-4">
            <div className="w-10 h-10 rounded-xl bg-vol-accent/10 flex items-center justify-center text-vol-accent2 mb-2.5">
              <Calendar size={18} />
            </div>
            <p className="text-white font-medium text-xs mb-1">No Upcoming Events</p>
            <p className="text-[11px] text-gray-400 max-w-xs mb-3">
              You have not registered for any upcoming events yet.
            </p>
            <Link
              href="/all-events?role=attendee"
              className="px-3 py-1.5 text-[11px] rounded-lg bg-vol-accent/15 hover:bg-vol-accent/25 text-vol-accent2 border border-vol-accent/30 font-medium transition-all"
            >
              Browse Events
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-2.5">
            {eventsList.slice(0, 3).map((event, idx) => (
              <motion.div
                key={event.id || event.passId || idx}
                custom={idx}
                initial="hidden"
                animate="visible"
                variants={itemVariants}
                whileHover={{ x: 4 }}
                onClick={() => handleEventClick(event.id)}
                className="flex gap-4 p-3 rounded-xl hover:bg-vol-border/20 transition-all duration-200 group cursor-pointer relative overflow-hidden"
              >
                {/* Hover accent bar */}
                <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-vol-accent2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-full" />

                {/* Event Image / Gradient Thumbnail */}
                {event.imageUrl ? (
                  <div className="w-12 h-12 rounded-lg shrink-0 overflow-hidden bg-vol-border/30 shadow-inner group-hover:scale-105 transition-transform duration-300">
                    <img
                      src={event.imageUrl}
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className={clsx(
                    "w-12 h-12 rounded-lg bg-gradient-to-br shrink-0 shadow-inner group-hover:scale-105 transition-transform duration-300",
                    event.imageGradient
                  )} />
                )}

                <div className="flex-1 min-w-0 flex flex-col justify-center">
                  <div className="flex justify-between items-start gap-2 mb-1">
                    <h3
                      className="font-semibold text-white text-sm truncate group-hover:text-vol-accent2 transition-colors"
                      title={event.title}
                    >
                      {event.title}
                    </h3>
                    <span className={clsx(
                      "px-2 py-0.5 rounded text-[10px] font-medium border shrink-0 transition-all",
                      event.status === 'Registered' || event.status === 'Confirmed'
                        ? "bg-vol-accent/15 text-vol-accent2 border-vol-accent/20"
                        : "bg-vol-warning/10 text-vol-warning border-vol-warning/20"
                    )}>
                      {event.status}
                    </span>
                  </div>

                  <div className="flex flex-col gap-1 mt-0.5">
                    <p className="text-[11px] text-gray-400 truncate">{event.date}</p>
                    <div className="flex items-center gap-1.5 text-[11px] text-gray-500">
                      <MapPin size={11} className="shrink-0" />
                      <span className="truncate">{event.venue}</span>
                    </div>
                  </div>
                </div>

                {/* Hover chevron */}
                <ChevronRight
                  size={16}
                  className="self-center text-vol-border opacity-0 group-hover:opacity-100 group-hover:text-vol-accent2 transition-all duration-200 shrink-0"
                />
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <div className="p-5 pt-0 mt-auto">
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => router.push('/all-events?role=attendee')}
          className="w-full py-2.5 rounded-lg bg-vol-accent/10 hover:bg-vol-accent/20 text-vol-accent2 font-medium text-sm transition-all border border-vol-accent/20 hover:border-vol-accent/40 hover:shadow-glow-accent"
        >
          Browse All Events
        </motion.button>
      </div>
    </WidgetCard>
  );
}
