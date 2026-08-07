import React, { useState, useEffect, useMemo } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import AttendeeLayout from '@/components/dashboard/attendee/AttendeeLayout';
import PassCard from '@/components/passes/PassCard';
import PassDetailsModal from '@/components/passes/PassDetailsModal';
import { useUserStore } from '@/store/userStore';
import { getToken } from '@/lib/auth';
import { 
  Ticket, 
  Search, 
  Filter, 
  RefreshCw, 
  Sparkles, 
  Loader2, 
  CalendarDays,
  ShieldCheck,
  QrCode
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';

export default function PassesPage() {
  const router = useRouter();
  const { user, fetchUser } = useUserStore();
  const token = getToken();

  const [passes, setPasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedPass, setSelectedPass] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (token && !user && fetchUser) {
      fetchUser();
    }
  }, [token, user, fetchUser]);

  const fetchPasses = async (userId) => {
    setLoading(true);
    try {
      const headers = { 'Content-Type': 'application/json' };
      if (token) {
        headers['Authorization'] = `bearer ${token}`;
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/passes/${userId}`,
        { headers }
      );

      if (response.ok) {
        const data = await response.json();
        setPasses(Array.isArray(data) ? data : []);
      } else {
        console.error("Failed to fetch passes:", response.statusText);
        setPasses([]);
      }
    } catch (error) {
      console.error("Error fetching passes:", error);
      setPasses([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const userId = user?.id || user?._id || user?.user_id;
    if (userId) {
      fetchPasses(userId);
    } else {
      const storedToken = getToken();
      if (!storedToken) {
        setLoading(false);
      }
    }
  }, [user]);

  const handleOpenModal = (pass) => {
    setSelectedPass(pass);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPass(null);
  };

  // Filtered passes
  const filteredPasses = useMemo(() => {
    return passes.filter((pass) => {
      const q = searchQuery.toLowerCase().trim();
      const eventTitle = pass.event?.title || pass.event_title || '';
      const passUid = pass.pass_uid || '';
      const category = pass.event?.category || '';
      const location = pass.event?.location || '';
      const status = String(pass.status || '').toLowerCase();

      const matchesSearch = 
        !q ||
        eventTitle.toLowerCase().includes(q) ||
        passUid.toLowerCase().includes(q) ||
        category.toLowerCase().includes(q) ||
        location.toLowerCase().includes(q);

      const matchesStatus =
        statusFilter === 'all' ||
        status === statusFilter.toLowerCase();

      return matchesSearch && matchesStatus;
    });
  }, [passes, searchQuery, statusFilter]);

  const userId = user?.id || user?._id || user?.user_id;

  return (
    <>
      <Head>
        <title>My Event Passes | EventFlow</title>
        <meta name="description" content="View and manage your digital QR entry passes for upcoming campus events." />
      </Head>

      <AttendeeLayout>
        <div className="space-y-6 max-w-7xl mx-auto pb-12">
          
          {/* Header Banner */}
          <div className="relative rounded-3xl p-6 sm:p-8 overflow-hidden border border-slate-800/80 bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 shadow-xl">
            <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-400 mb-1">
                  <QrCode size={16} />
                  <span>Digital Pass Wallet</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  My Event Passes
                </h1>
                <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
                  Click on any pass card to view complete event details, check-in instructions, and your unique entry QR code.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => userId && fetchPasses(userId)}
                  className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-medium text-slate-300 hover:text-white flex items-center gap-2 transition-all cursor-pointer shadow-sm"
                  title="Refresh passes"
                >
                  <RefreshCw size={14} className={clsx(loading && "animate-spin text-indigo-400")} />
                  <span>Refresh</span>
                </button>

                <button
                  onClick={() => router.push('/all-events')}
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-semibold text-white flex items-center gap-2 transition-all shadow-lg shadow-indigo-600/25 cursor-pointer"
                >
                  <Sparkles size={14} />
                  <span>Browse More Events</span>
                </button>
              </div>
            </div>
          </div>

          {/* Search & Filters Controls */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900/60 p-4 rounded-2xl border border-slate-800/80">
            <div className="relative w-full sm:w-80">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search by event title or pass UID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 pl-10 pr-4 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>

            {/* Status Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 custom-scrollbar">
              {['all', 'generated', 'confirmed', 'checked-in'].map((status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={clsx(
                    "px-3 py-1.5 rounded-xl text-xs font-medium capitalize transition-all whitespace-nowrap cursor-pointer",
                    statusFilter === status
                      ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20"
                      : "bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800"
                  )}
                >
                  {status === 'all' ? `All (${passes.length})` : status}
                </button>
              ))}
            </div>
          </div>

          {/* Passes Grid / States */}
          {loading && passes.length === 0 ? (
            <div className="py-20 flex flex-col items-center justify-center text-center">
              <div className="relative mb-4 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full border-2 border-indigo-500/20 border-t-indigo-500 animate-spin" />
                <Ticket size={18} className="absolute text-indigo-400 animate-pulse" />
              </div>
              <h3 className="text-sm font-semibold text-white">Loading Your Passes...</h3>
              <p className="text-xs text-slate-400 mt-1">Fetching digital passes from server</p>
            </div>
          ) : filteredPasses.length === 0 ? (
            <div className="py-16 px-6 text-center flex flex-col items-center justify-center border border-dashed border-slate-800 rounded-2xl bg-slate-900/30">
              <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-3">
                <Ticket size={26} />
              </div>
              <h3 className="text-white font-bold text-base mb-1">
                {searchQuery || statusFilter !== 'all' ? 'No Matching Passes Found' : 'No Passes Issued Yet'}
              </h3>
              <p className="text-xs text-slate-400 max-w-md mb-5 leading-relaxed">
                {searchQuery || statusFilter !== 'all'
                  ? 'Try adjusting your search query or status filters to find your pass.'
                  : 'You have not registered for any events yet. Explore open events across campus and get your dynamic QR entry passes!'}
              </p>
              <button
                onClick={() => router.push('/all-events')}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-semibold text-white transition-all shadow-lg shadow-indigo-600/30 cursor-pointer flex items-center gap-2"
              >
                <Sparkles size={14} />
                <span>Explore Events Directory</span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPasses.map((pass, index) => (
                <PassCard
                  key={pass.id || pass.pass_uid || index}
                  pass={pass}
                  index={index}
                  onClick={handleOpenModal}
                />
              ))}
            </div>
          )}

          {/* Dynamic Pass Details Modal */}
          <PassDetailsModal
            pass={selectedPass}
            isOpen={isModalOpen}
            onClose={handleCloseModal}
          />

        </div>
      </AttendeeLayout>
    </>
  );
}
