import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Ticket as TicketIcon, MapPin, CheckCircle2, Clock, ChevronLeft, ChevronRight, QrCode, Loader2 } from 'lucide-react';
import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import QRCode from 'react-qr-code';
import { useUserStore } from '@/store/userStore';
import { getToken } from '@/lib/auth';
import PassDetailsModal from '@/components/passes/PassDetailsModal';

const PASS_COLOR_PALETTES = [
  {
    gradient: 'from-indigo-600 via-purple-600 to-fuchsia-600',
    glowColor: 'rgba(139, 92, 246, 0.35)',
    accentColor: '#8B5CF6',
  },
  {
    gradient: 'from-cyan-500 via-blue-600 to-indigo-600',
    glowColor: 'rgba(6, 182, 212, 0.35)',
    accentColor: '#06B6D4',
  },
  {
    gradient: 'from-emerald-500 via-teal-600 to-cyan-600',
    glowColor: 'rgba(16, 185, 129, 0.35)',
    accentColor: '#10B981',
  },
  {
    gradient: 'from-amber-500 via-orange-600 to-rose-600',
    glowColor: 'rgba(245, 158, 11, 0.35)',
    accentColor: '#F59E0B',
  },
  {
    gradient: 'from-pink-500 via-rose-600 to-red-600',
    glowColor: 'rgba(244, 63, 94, 0.35)',
    accentColor: '#F43F5E',
  },
  {
    gradient: 'from-violet-600 via-purple-600 to-pink-500',
    glowColor: 'rgba(168, 85, 247, 0.35)',
    accentColor: '#A855F7',
  },
  {
    gradient: 'from-blue-500 via-indigo-600 to-violet-700',
    glowColor: 'rgba(59, 130, 246, 0.35)',
    accentColor: '#3B82F6',
  },
  {
    gradient: 'from-teal-400 via-emerald-500 to-green-600',
    glowColor: 'rgba(20, 184, 166, 0.35)',
    accentColor: '#14B8A6',
  },
  {
    gradient: 'from-orange-500 via-amber-600 to-yellow-500',
    glowColor: 'rgba(249, 115, 22, 0.35)',
    accentColor: '#F97316',
  },
  {
    gradient: 'from-fuchsia-500 via-pink-600 to-rose-500',
    glowColor: 'rgba(217, 70, 239, 0.35)',
    accentColor: '#D946EF',
  },
];

const getRandomPalette = () => {
  return PASS_COLOR_PALETTES[Math.floor(Math.random() * PASS_COLOR_PALETTES.length)];
};

/**
 * Formats a raw date / timestamp / ISO string into a clean, human-readable format.
 * E.g. "May 24, 2024 • 10:00 AM" or "Oct 15, 2024"
 */
export const formatEventDate = (dateVal, timeVal) => {
  if (!dateVal) return 'Upcoming';

  // If already contains bullet separator or formatted label, return as-is
  if (typeof dateVal === 'string' && (dateVal.includes('•') || dateVal.toLowerCase() === 'upcoming')) {
    return dateVal;
  }

  try {
    const d = new Date(dateVal);
    if (isNaN(d.getTime())) {
      return String(dateVal);
    }

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

function AnimatedCounter({ value, duration = 1.2 }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime;
    const target = value;
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [value, duration]);

  return <span>{count}</span>;
}

export default function MyTickets({ delay = 0 }) {
  const router = useRouter();
  const { user, fetchUser } = useUserStore();
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingText, setLoadingText] = useState('Fetching your passes...');
  const [selectedPass, setSelectedPass] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getTickets = async () => {
    const userId = user?.id || user?._id || user?.user_id;
    if (!userId) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setLoadingText('Loading your passes from server...');

    try {
      const token = getToken();
      const headers = {
        'Content-Type': 'application/json',
      };
      if (token) {
        headers['Authorization'] = `bearer ${token}`;
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/passes/${userId}`, {
        headers,
      });

      if (response.ok) {
        const data = await response.json();
        if (Array.isArray(data)) {
          // Loop through passes and assign random color to each pass
          const passesWithColors = data.map((pass, idx) => {
            const randomColor = getRandomPalette();
            const eventObj = (pass.event && typeof pass.event === 'object') ? pass.event : {};
            const eventTitle = typeof pass.event === 'string'
              ? pass.event
              : (pass.event?.title || pass.event?.name || pass.event_name || pass.event_title || pass.title || 'Event Pass');
            
            const rawDate = pass.date || pass.event_date || eventObj.date || eventObj.event_date || pass.created_at;
            const rawTime = pass.time || pass.event_time || eventObj.time || eventObj.event_time;

            let formattedDate = 'Upcoming';
            if (rawDate) {
              try {
                const d = new Date(rawDate);
                if (!isNaN(d.getTime())) {
                  formattedDate = d.toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  });
                } else {
                  formattedDate = String(rawDate);
                }
              } catch (e) {
                formattedDate = String(rawDate);
              }
            }

            const formattedLocation = pass.location || pass.venue || eventObj.location || eventObj.venue || 'PICT Campus Venue';

            return {
              id: pass.id || pass._id || `ticket-${idx + 1}`,
              pass_uid: pass.pass_uid || '',
              user_id: pass.user_id,
              event_id: pass.event_id,
              eventTitle: eventTitle,
              category: eventObj.category || 'Event',
              date: formattedDate,
              time: rawTime || '10:00 AM',
              location: formattedLocation,
              status: pass.status ? (pass.status.charAt(0).toUpperCase() + pass.status.slice(1)) : 'Confirmed',
              rawPass: pass,
              ...randomColor,
            };
          });

          setTickets(passesWithColors);
        } else {
          setTickets([]);
        }
      } else {
        console.error('Failed to fetch passes:', response.statusText);
        setTickets([]);
      }
    } catch (error) {
      console.error('Error fetching passes from backend:', error);
      setTickets([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const userId = user?.id || user?._id || user?.user_id;
    if (userId) {
      getTickets();
    } else {
      const storedToken = getToken();
      if (!storedToken) {
        setLoading(false);
      }
    }
  }, [user]);

  const handleOpenPassModal = (passItem) => {
    const fullPass = passItem.rawPass || passItem;
    setSelectedPass(fullPass);
    setIsModalOpen(true);
  };

  const handleClosePassModal = () => {
    setIsModalOpen(false);
    setSelectedPass(null);
  };

  const checkScrollability = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      checkScrollability();
      el.addEventListener('scroll', checkScrollability);
      window.addEventListener('resize', checkScrollability);
      return () => {
        el.removeEventListener('scroll', checkScrollability);
        window.removeEventListener('resize', checkScrollability);
      };
    }
  }, [tickets]);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction * 360;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay }}
      className="rounded-2xl bg-vol-card border border-vol-border/60 overflow-hidden relative"
    >
      {/* Glow Effects */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-vol-accent/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-vol-cyan/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="p-6 border-b border-vol-border/40 flex items-center justify-between flex-wrap gap-4 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-vol-accent/10 border border-vol-accent/20 flex items-center justify-center text-vol-accent2">
            <TicketIcon size={20} />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white tracking-wide">My Passes & Tickets</h2>
            <p className="text-xs text-gray-400">
              {loading ? (
                <span>Checking active passes...</span>
              ) : (
                <>
                  <AnimatedCounter value={tickets.length} duration={0.8} /> active tickets • Click card to view QR
                </>
              )}
            </p>
          </div>
        </div>
        
        <Link 
          href="/passes"
          className="text-xs bg-vol-border/50 hover:bg-vol-accent text-gray-300 hover:text-white px-4 py-1.5 rounded-full transition-all border border-vol-border hover:border-vol-accent/50 cursor-pointer shadow-sm"
        >
          View All
        </Link>
      </div>

      {/* Carousel Container */}
      <div className="relative px-6 py-6 min-h-[220px] flex flex-col justify-center">
        {loading ? (
          <div className="py-12 px-6 flex flex-col items-center justify-center text-center">
            <div className="relative mb-4 flex items-center justify-center">
              <div className="w-12 h-12 rounded-full border-2 border-vol-accent/20 border-t-vol-accent animate-spin" />
              <TicketIcon size={18} className="absolute text-vol-accent animate-pulse" />
            </div>
            <p className="text-sm font-semibold text-white tracking-wide">{loadingText}</p>
            <p className="text-xs text-gray-400 mt-1.5 animate-pulse">
              Please wait while we resolve and render your tickets...
            </p>
          </div>
        ) : tickets.length === 0 ? (
          <div className="py-10 px-6 text-center flex flex-col items-center justify-center border border-dashed border-vol-border/40 rounded-xl bg-vol-card/20">
            <div className="w-12 h-12 rounded-xl bg-vol-accent/10 flex items-center justify-center text-vol-accent2 mb-3">
              <TicketIcon size={22} />
            </div>
            <h3 className="text-white font-medium text-sm mb-1">No Passes Found</h3>
            <p className="text-xs text-gray-400 max-w-sm mb-4">
              You don&apos;t have any active passes right now. Browse events to register and get your digital passes!
            </p>
            <Link
              href="/all-events"
              className="px-4 py-2 text-xs rounded-lg bg-vol-accent/15 hover:bg-vol-accent/25 text-vol-accent2 border border-vol-accent/30 font-medium transition-all"
            >
              Browse Events
            </Link>
          </div>
        ) : (
          <>
            {/* Left Arrow */}
            <AnimatePresence>
              {canScrollLeft && (
                <motion.button
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  onClick={() => scroll(-1)}
                  className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-vol-card/90 border border-vol-border hover:border-vol-accent/50 backdrop-blur-md flex items-center justify-center text-gray-400 hover:text-white transition-all shadow-lg hover:shadow-glow-accent cursor-pointer"
                >
                  <ChevronLeft size={20} />
                </motion.button>
              )}
            </AnimatePresence>

            {/* Right Arrow */}
            <AnimatePresence>
              {canScrollRight && (
                <motion.button
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  onClick={() => scroll(1)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-vol-card/90 border border-vol-border hover:border-vol-accent/50 backdrop-blur-md flex items-center justify-center text-gray-400 hover:text-white transition-all shadow-lg hover:shadow-glow-accent cursor-pointer"
                >
                  <ChevronRight size={20} />
                </motion.button>
              )}
            </AnimatePresence>

            {/* Scrollable Track */}
            <div
              ref={scrollRef}
              className={clsx(
                "flex gap-6 overflow-x-auto ticket-carousel pb-2",
                isDragging ? "cursor-grabbing" : "cursor-grab"
              )}
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onMouseMove={handleMouseMove}
            >
              {tickets.map((ticket, idx) => {
                const palette = (ticket.gradient && ticket.accentColor && ticket.glowColor)
                  ? ticket
                  : PASS_COLOR_PALETTES[idx % PASS_COLOR_PALETTES.length];

                return (
                  <TicketCard
                    key={ticket.id || idx}
                    ticket={{ ...ticket, ...palette }}
                    index={idx}
                    onSelectPass={handleOpenPassModal}
                  />
                );
              })}
            </div>

            {/* Scroll Indicators */}
            {tickets.length > 1 && (
              <div className="flex items-center justify-center gap-2 mt-4">
                {tickets.map((_, idx) => (
                  <div
                    key={idx}
                    className={clsx(
                      "h-1.5 rounded-full transition-all duration-300",
                      idx === 0 ? "w-6 bg-vol-accent" : "w-1.5 bg-vol-border"
                    )}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* Dynamic Pass Details Modal */}
      <PassDetailsModal
        pass={selectedPass}
        isOpen={isModalOpen}
        onClose={handleClosePassModal}
      />
    </motion.div>
  );
}

function TicketCard({ ticket, index, onSelectPass }) {
  const isConfirmed = ticket.status === 'Confirmed' || ticket.status === 'Generated' || ticket.status === 'generated';
  const displayTitle = ticket.eventTitle || (typeof ticket.event === 'string' ? ticket.event : ticket.event?.title) || 'Event Pass';
  const displayDate = ticket.date || ticket.event?.date || 'Upcoming';
  const displayLocation = ticket.location || ticket.venue || ticket.event?.location || ticket.event?.venue || 'Main Auditorium';
  const passUid = ticket.pass_uid || `PASS-${ticket.id}`;

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.1 * index + 0.3 }}
      whileHover={{
        y: -6,
        rotateY: 2,
        rotateX: -1,
        transition: { duration: 0.3 }
      }}
      onClick={() => onSelectPass && onSelectPass(ticket)}
      className="min-w-[340px] max-w-[380px] flex-shrink-0 select-none cursor-pointer"
      style={{ perspective: '1200px' }}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelectPass && onSelectPass(ticket);
        }
      }}
    >
      <div
        className="relative rounded-2xl overflow-hidden border border-vol-border/50 hover:border-indigo-500/60 transition-all duration-300 group bg-vol-card shadow-lg"
        style={{ boxShadow: `0 20px 40px -15px ${ticket.glowColor}` }}
      >
        {/* Gradient Top Strip */}
        <div className={clsx("h-2 bg-gradient-to-r", ticket.gradient)} />

        {/* Shimmer overlay on hover */}
        <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700">
          <div className="absolute inset-0 shimmer-gradient animate-shimmer" />
        </div>

        {/* Main Content */}
        <div className="bg-gradient-to-b from-vol-card to-vol-bg p-5">
          {/* Title + Status Row */}
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                style={{ backgroundColor: `${ticket.accentColor}20` }}
              >
                <TicketIcon size={20} style={{ color: ticket.accentColor }} />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-bold text-white text-base group-hover:text-cyan-300 transition-colors truncate" title={displayTitle}>
                  {displayTitle}
                </h3>
                <p className="text-[11px] text-gray-400 font-mono mt-0.5 truncate tracking-wider">
                  UID: <span className="text-cyan-400 font-semibold">{passUid}</span>
                </p>
              </div>
            </div>
            <span className={clsx(
              "px-2.5 py-1 rounded-full text-[10px] font-semibold border flex items-center gap-1 shrink-0 mt-0.5",
              isConfirmed
                ? "bg-vol-success/10 text-vol-success border-vol-success/20"
                : "bg-vol-warning/10 text-vol-warning border-vol-warning/20"
            )}>
              {isConfirmed && <CheckCircle2 size={11} />}
              {ticket.status}
            </span>
          </div>

          {/* Dashed Divider with Perforations */}
          <div className="relative my-4">
            <div className="absolute -left-8 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-vol-bg" />
            <div className="absolute -right-8 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-vol-bg" />
            <div className="border-t-2 border-dashed border-vol-border/60 mx-2" />
          </div>

          {/* Info Row */}
          <div className="flex items-end justify-between gap-4">
            <div className="flex flex-col gap-2 min-w-0 flex-1">
              <div className="flex items-center gap-2 text-xs text-gray-300">
                <Clock size={13} className="text-gray-500 shrink-0" />
                <span className="truncate" title={displayDate}>{displayDate}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <MapPin size={13} className="text-gray-500 shrink-0" />
                <span className="truncate" title={displayLocation}>{displayLocation}</span>
              </div>
            </div>

            {/* In-Memory Dynamic QR Code Preview */}
            <div className="w-14 h-14 bg-white rounded-lg p-1.5 flex items-center justify-center shadow-sm group-hover:scale-105 transition-all duration-300 shrink-0">
              {ticket.pass_uid ? (
                <QRCode
                  value={ticket.pass_uid}
                  size={46}
                  style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
                  viewBox="0 0 46 46"
                />
              ) : (
                <QrCode size={36} className="text-gray-800" />
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
