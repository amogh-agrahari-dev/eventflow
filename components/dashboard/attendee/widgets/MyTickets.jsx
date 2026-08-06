import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Ticket as TicketIcon, MapPin, CheckCircle2, Clock, ChevronLeft, ChevronRight, QrCode } from 'lucide-react';
import clsx from 'clsx';

const tickets = [
  {
    id: '#EVF1245',
    event: 'Spring Gala 2024',
    date: 'May 24, 2024 • 9:00 AM',
    venue: 'Main Auditorium',
    status: 'Confirmed',
    gradient: 'from-indigo-600 via-purple-600 to-fuchsia-600',
    glowColor: 'rgba(139, 92, 246, 0.3)',
    accentColor: '#8B5CF6',
  },
  {
    id: '#EVF1246',
    event: 'Tech Symposium',
    date: 'May 25, 2024 • 2:00 PM',
    venue: 'Tech Block, Room 201',
    status: 'Confirmed',
    gradient: 'from-cyan-600 via-blue-600 to-indigo-600',
    glowColor: 'rgba(0, 229, 255, 0.25)',
    accentColor: '#00E5FF',
  },
  {
    id: '#EVF1247',
    event: 'NGO Symposium',
    date: 'May 28, 2024 • 10:00 AM',
    venue: 'Seminar Hall',
    status: 'Waitlisted',
    gradient: 'from-amber-500 via-orange-600 to-rose-600',
    glowColor: 'rgba(245, 158, 11, 0.25)',
    accentColor: '#F59E0B',
  },
  {
    id: '#EVF1248',
    event: 'Cultural Fest 2024',
    date: 'Jun 05, 2024 • 4:00 PM',
    venue: 'Main Campus',
    status: 'Confirmed',
    gradient: 'from-emerald-500 via-teal-600 to-cyan-600',
    glowColor: 'rgba(16, 185, 129, 0.25)',
    accentColor: '#10B981',
  },
];

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
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const updateScrollButtons = () => {
    if (!scrollRef.current) return;
    const { scrollLeft: sl, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(sl > 5);
    setCanScrollRight(sl < scrollWidth - clientWidth - 5);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener('scroll', updateScrollButtons);
    updateScrollButtons();
    return () => el.removeEventListener('scroll', updateScrollButtons);
  }, []);

  const scroll = (dir) => {
    if (!scrollRef.current) return;
    const cardWidth = scrollRef.current.firstElementChild?.offsetWidth || 360;
    scrollRef.current.scrollBy({ left: dir * (cardWidth + 24), behavior: 'smooth' });
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };
  const handleMouseUp = () => setIsDragging(false);
  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    scrollRef.current.scrollLeft = scrollLeft - (x - startX) * 1.2;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay }}
      className="bg-vol-card rounded-2xl border border-vol-border overflow-hidden transition-all duration-300 hover:border-vol-accent/40 hover:shadow-card-lift group/widget"
    >
      {/* Header */}
      <div className="px-6 py-5 flex items-center justify-between border-b border-vol-border/30">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-vol-accent/15 flex items-center justify-center text-vol-accent2">
            <TicketIcon size={20} />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white">My Tickets</h2>
            <p className="text-xs text-gray-500">
              <AnimatedCounter value={tickets.length} duration={0.8} /> active tickets
            </p>
          </div>
        </div>
        <button className="text-xs bg-vol-border/50 hover:bg-vol-border text-gray-300 px-4 py-1.5 rounded-full transition-all border border-vol-border hover:border-vol-accent/30 hover:text-white">
          View All
        </button>
      </div>

      {/* Carousel Container */}
      <div className="relative px-6 py-6">
        {/* Left Arrow */}
        <AnimatePresence>
          {canScrollLeft && (
            <motion.button
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              onClick={() => scroll(-1)}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-vol-card/90 border border-vol-border hover:border-vol-accent/50 backdrop-blur-md flex items-center justify-center text-gray-400 hover:text-white transition-all shadow-lg hover:shadow-glow-accent"
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
              className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-vol-card/90 border border-vol-border hover:border-vol-accent/50 backdrop-blur-md flex items-center justify-center text-gray-400 hover:text-white transition-all shadow-lg hover:shadow-glow-accent"
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
          {tickets.map((ticket, idx) => (
            <TicketCard key={ticket.id} ticket={ticket} index={idx} />
          ))}
        </div>

        {/* Scroll Indicators */}
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
      </div>
    </motion.div>
  );
}

function TicketCard({ ticket, index }) {
  const isConfirmed = ticket.status === 'Confirmed';

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
      className="min-w-[340px] max-w-[380px] flex-shrink-0 select-none"
      style={{ perspective: '1200px' }}
    >
      <div
        className="relative rounded-2xl overflow-hidden border border-vol-border/50 hover:border-vol-accent/40 transition-all duration-300 group"
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
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                style={{ backgroundColor: `${ticket.accentColor}20` }}
              >
                <TicketIcon size={20} style={{ color: ticket.accentColor }} />
              </div>
              <div>
                <h3 className="font-bold text-white text-base group-hover:text-vol-accent2 transition-colors">
                  {ticket.event}
                </h3>
                <p className="text-[11px] text-gray-500 font-mono mt-0.5">Ticket {ticket.id}</p>
              </div>
            </div>
            <span className={clsx(
              "px-2.5 py-1 rounded-full text-[10px] font-semibold border flex items-center gap-1 shrink-0",
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
          <div className="flex items-end justify-between">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-xs text-gray-300">
                <Clock size={13} className="text-gray-500" />
                <span>{ticket.date}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <MapPin size={13} className="text-gray-500" />
                <span>{ticket.venue}</span>
              </div>
            </div>

            {/* QR Code */}
            <div className="w-14 h-14 bg-white rounded-lg p-1.5 flex items-center justify-center shadow-sm group-hover:shadow-glow-cyan transition-shadow duration-300">
              <QrCode size={36} className="text-gray-800" />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
