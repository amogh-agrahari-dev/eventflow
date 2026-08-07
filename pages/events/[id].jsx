import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  Home, PlusSquare, History, Users, ClipboardList,
  MessageSquare, UserPlus, Bell, MapPin,
  Settings, BarChart2, Check, LayoutTemplate, MessageCircle, Menu,
  Calendar, Clock, Image as ImageIcon, ArrowLeft, Share2, Heart
} from 'lucide-react';
import Logo from '@/components/general/Logo';
import Sidebar from '@/components/general/Sidebar';
import { Button } from '@/components/ui';
import { useUserStore } from '@/store/userStore';
import { getToken } from '@/lib/auth';

export default function EventDetailsPage() {
  const router = useRouter();
  const { id } = router.query;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDesktopSidebarCollapsed, setIsDesktopSidebarCollapsed] = useState(false);
  const { user, fetchUser, logout } = useUserStore();
  const token = getToken();

  useEffect(() => {
    if (token && !user) {
      fetchUser();
    }
  }, [token, user, fetchUser]);

  const [event, setEvent] = React.useState(null);

  const getEventById = async (eventId) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/event/${eventId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log(data);
      setEvent(data);
    } catch (error) {
      console.error("Error fetching event by ID:", error);
    }
  }
  const registerVolunteer = async () => {
    if (!user) {
      console.error("User not logged in");
      return;
    }
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/${id}/volunteers/${user.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log(data);
      setEvent(data);
    } catch (error) {
      console.error("Error fetching event by ID:", error);
    }
  }

  const [isRegisteringAttendee, setIsRegisteringAttendee] = useState(false);
  const [attendeeRegistered, setAttendeeRegistered] = useState(false);
  const [registrationMessage, setRegistrationMessage] = useState('');

  const registerAttendee = async () => {
    const userId = user?.id || user?._id || user?.user_id;
    if (!userId) {
      router.push('/auth/login');
      return;
    }

    const eventIdInt = parseInt(id, 10);
    const userIdInt = parseInt(userId, 10);

    if (isNaN(eventIdInt) || isNaN(userIdInt)) {
      console.error("Invalid event_id or user_id for registration");
      return;
    }

    setIsRegisteringAttendee(true);
    setRegistrationMessage('');
    try {
      const token = getToken();
      const headers = {
        'Content-Type': 'application/json',
      };
      if (token) {
        headers['Authorization'] = `bearer ${token}`;
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/pass/create`, {
        method: "POST",
        headers,
        body: JSON.stringify({
          event_id: eventIdInt,
          user_id: userIdInt,
          status: "Created",
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Pass created successfully:", data);
        setAttendeeRegistered(true);
        setRegistrationMessage('Pass registered! View in My Tickets.');
        if (id) {
          getEventById(id);
        }
      } else {
        const errData = await response.json().catch(() => null);
        console.error("Failed to create pass:", errData || response.statusText);
        setRegistrationMessage(errData?.detail || 'Failed to register.');
      }
    } catch (error) {
      console.error("Error creating pass / registering as attendee:", error);
      setRegistrationMessage('Network error occurred.');
    } finally {
      setIsRegisteringAttendee(false);
    }
  };

  useEffect(() => {
    const checkAttendeeRegistration = async () => {
      const userId = user?.id || user?._id || user?.user_id;
      if (!userId || !id) return;
      try {
        const token = getToken();
        const headers = { 'Content-Type': 'application/json' };
        if (token) headers['Authorization'] = `bearer ${token}`;
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/passes/${userId}`, {
          headers,
        });
        if (response.ok) {
          const passes = await response.json();
          if (Array.isArray(passes)) {
            const hasPass = passes.some((p) => {
              const pEventId = p.event_id || p.eventId || p.event?.id || p.event?._id;
              return String(pEventId) === String(id);
            });
            if (hasPass) {
              setAttendeeRegistered(true);
            }
          }
        }
      } catch (err) {
        console.error("Error checking existing passes:", err);
      }
    };

    if (user && id) {
      checkAttendeeRegistration();
    }
  }, [user, id]);

  React.useEffect(() => {
    if (id) {
      getEventById(id);
    }
  }, [id]);

  if (!event) {
    return (
      <div className="flex h-screen bg-[#161B23] text-white items-center justify-center flex-col">
        <h2 className="text-2xl font-bold mb-4">Event Not Found</h2>
        <Button onClick={() => router.push('/all-events')} className="bg-[#6E56CF] text-white">
          Back to Events
        </Button>
      </div>
    );
  }

  const registered = event.registered || 0;
  const isFull = registered >= event.max_attendees;
  const progressPercent = Math.min(100, Math.round((registered / Math.max(event.max_attendees, 1)) * 100));
  const isUserVolunteer = user && event.volunteers?.some(v => v.id === user.id);

  return (
    <div className="flex h-screen bg-[#161B23] text-slate-300 font-sans overflow-hidden selection:bg-[#6E56CF]/30">
      <Head>
        <title>{event.title} | EventFlow</title>
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
            <h1 className="text-[22px] font-medium text-white truncate">Event Details</h1>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative p-2 text-[#5A6B8A] hover:text-white transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#F59E0B] rounded-full border-2 border-[#161B23]"></span>
            </button>
            {user ? (
              <div className="flex items-center gap-3">
                <div className="flex flex-col items-end">
                  <span className="text-sm font-medium text-white">{user.name || user.email}</span>
                  <button onClick={() => { logout(); router.push('/auth/login'); }} className="text-xs text-[#5A6B8A] hover:text-rose-400 transition-colors">Logout</button>
                </div>
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#6E56CF] to-[#00E5FF] p-[2px] shadow-lg shadow-[#6E56CF]/20">
                  <div className="w-full h-full bg-[#161B23] rounded-full flex items-center justify-center overflow-hidden">
                    <span className="text-xs font-bold text-white">
                      {(user.name || user.email || 'U').charAt(0).toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <Button onClick={() => router.push('/auth/login')} className="bg-[#6E56CF] hover:bg-[#5a46aa] text-white text-sm h-8 px-4 rounded-full">
                Login
              </Button>
            )}
          </div>
        </header>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">

          {/* Cover Image Area */}
          <div
            className="h-64 md:h-80 w-full bg-gradient-to-br from-[#2D3340] to-[#1C202B] relative flex items-center justify-center border-b border-[#2A303C] bg-cover bg-center"
            style={event.banner_url ? { backgroundImage: `url(${event.banner_url})` } : {}}
          >
            {!event.banner_url && <ImageIcon className="w-16 h-16 text-white/10" />}

            <div className="absolute top-6 left-6 flex items-center gap-3 z-10">
              <button
                onClick={() => router.push('/all-events')}
                className="flex items-center gap-2 bg-[#11141A]/60 backdrop-blur-md border border-[#2A303C] hover:bg-[#1A1F2B] text-white px-4 py-2 rounded-full text-sm font-medium transition-colors"
              >
                <ArrowLeft className="w-4 h-4" /> Back to Events
              </button>
            </div>

            <div className="absolute top-6 right-6 flex items-center gap-3 z-10">
              <button className="p-2.5 bg-[#11141A]/60 backdrop-blur-md border border-[#2A303C] hover:bg-[#1A1F2B] hover:text-[#00E5FF] text-white rounded-full transition-colors">
                <Share2 className="w-4 h-4" />
              </button>
              <button className="p-2.5 bg-[#11141A]/60 backdrop-blur-md border border-[#2A303C] hover:bg-[#1A1F2B] hover:text-rose-400 text-white rounded-full transition-colors">
                <Heart className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Details Section */}
          <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-8 -mt-16 relative z-20">
            <div className="flex flex-col lg:flex-row gap-8">

              {/* Main Info */}
              <div className="flex-1">
                <div className="bg-[#1A1F2B] border border-[#2A303C] rounded-2xl p-6 md:p-8 shadow-xl">
                  <div className="flex gap-2 mb-4">
                    <span className="px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider bg-[#6E56CF]/20 text-[#00E5FF] border border-[#6E56CF]/30">
                      {event.category}
                    </span>
                    <span className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider border ${event.is_free ? 'bg-[#10B981]/20 text-[#10B981] border-[#10B981]/30' : 'bg-[#F59E0B]/20 text-[#F59E0B] border-[#F59E0B]/30'}`}>
                      {event.is_free ? 'Free' : 'Paid'}
                    </span>
                    <span className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider border ${event.format?.toLowerCase() === 'online' ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' : 'bg-pink-500/20 text-pink-400 border-pink-500/30'}`}>
                      {event.format ? event.format.charAt(0).toUpperCase() + event.format.slice(1).toLowerCase() : ''}
                    </span>
                  </div>

                  <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">
                    {event.title}
                  </h1>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#11141A] border border-[#2A303C] flex items-center justify-center shrink-0">
                        <Calendar className="w-5 h-5 text-[#00E5FF]" />
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-white mb-1">Date</h4>
                        <p className="text-sm text-[#8F9BB3]">
                          {new Date(event.start_time).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#11141A] border border-[#2A303C] flex items-center justify-center shrink-0">
                        <Clock className="w-5 h-5 text-[#00E5FF]" />
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-white mb-1">Time</h4>
                        <p className="text-sm text-[#8F9BB3]">
                          {new Date(event.start_time).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })} - {new Date(event.end_time).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#11141A] border border-[#2A303C] flex items-center justify-center shrink-0">
                        <MapPin className="w-5 h-5 text-[#00E5FF]" />
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-white mb-1">Location</h4>
                        <p className="text-sm text-[#8F9BB3]">
                          {event.location}
                        </p>
                      </div>
                    </div>
                  </div>

                  <hr className="border-[#2A303C] mb-8" />

                  <h3 className="text-lg font-semibold text-white mb-4">About this event</h3>
                  <div className="prose prose-invert max-w-none text-[#8F9BB3] leading-relaxed">
                    <p>{event.description}</p>
                    <p className="mt-4">
                      Nulla facilisi. Mauris tristique nisi eu nisi pretium, ut vehicula erat vestibulum. Curabitur vitae aliquet velit, sed eleifend libero. Proin sed mi sapien. Sed bibendum lacus in massa facilisis, at interdum lorem aliquet. Nunc cursus, nisi eu suscipit cursus, arcu metus elementum purus, quis vehicula lacus lacus nec felis.
                    </p>
                  </div>
                </div>
              </div>

              {/* Sidebar / Actions */}
              <div className="w-full lg:w-80 shrink-0 space-y-6">

                {/* Registration Widget */}
                <div className="bg-[#1A1F2B] border border-[#2A303C] rounded-2xl p-6 shadow-xl sticky top-24">
                  <h3 className="text-lg font-semibold text-white mb-4">Event Registration</h3>

                  <div className="mb-6">
                    <div className="flex justify-between items-end mb-2">
                      <span className="text-sm font-medium text-[#8F9BB3]">Capacity</span>
                      <span className={`text-sm font-bold ${isFull ? 'text-rose-400' : 'text-[#00E5FF]'}`}>
                        {registered.toLocaleString()} / {event.max_attendees?.toLocaleString() || 0}
                      </span>
                    </div>
                    <div className="h-2 w-full bg-[#0B0E14] rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${isFull ? 'bg-rose-500' : 'bg-gradient-to-r from-[#6E56CF] to-[#00E5FF]'}`}
                        style={{ width: `${progressPercent}%` }}
                      />
                    </div>
                    {isFull ? (
                      <p className="text-xs text-rose-400 mt-2 font-medium">This event is completely sold out.</p>
                    ) : (
                      <p className="text-xs text-[#5A6B8A] mt-2">Tickets are selling fast, secure your spot!</p>
                    )}
                  </div>

                  <hr className="border-[#2A303C] mb-6" />

                  <div className="space-y-3">
                    <Button
                      onClick={registerVolunteer}
                      disabled={isUserVolunteer}
                      className={`w-full py-3 shadow-[0_0_15px_rgba(110,86,207,0.3)] transition-all font-semibold ${isUserVolunteer ? 'bg-[#2A303C] text-[#8F9BB3] opacity-70 cursor-not-allowed' : 'bg-[#6E56CF] hover:bg-[#5a46aa] text-white'}`}
                    >
                      {isUserVolunteer ? 'Registered as Volunteer' : 'Register as Volunteer'}
                    </Button>
                    <Button
                      onClick={registerAttendee}
                      disabled={isRegisteringAttendee || attendeeRegistered || isFull}
                      className={`w-full py-3 transition-all font-semibold ${attendeeRegistered
                          ? 'bg-emerald-600/20 border border-emerald-500/40 text-emerald-400 cursor-default'
                          : isFull
                            ? 'bg-[#11141A] border border-[#2A303C] text-[#5A6B8A] opacity-60 cursor-not-allowed'
                            : 'bg-[#11141A] border border-[#00E5FF]/30 hover:bg-[#00E5FF]/10 text-[#00E5FF]'
                        }`}
                    >
                      {isRegisteringAttendee
                        ? 'Registering...'
                        : attendeeRegistered
                          ? 'Registered as Attendee ✓'
                          : isFull
                            ? 'Sold Out'
                            : 'Register as Attendee'}
                    </Button>
                    {registrationMessage && (
                      <p className={`text-xs text-center font-medium mt-1 ${attendeeRegistered ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {registrationMessage}
                      </p>
                    )}
                  </div>

                  <div className="mt-6 p-4 rounded-xl bg-[#11141A] border border-[#2A303C]">
                    <div className="flex items-center gap-3 mb-2">
                      <Users className="w-4 h-4 text-[#5A6B8A]" />
                      <span className="text-sm font-semibold text-white">Volunteers Needed</span>
                    </div>
                    <p className="text-xs text-[#8F9BB3]">
                      We are looking for {event.volunteers_required} volunteers for this event. Perks include free merch and food.
                    </p>

                    {event.volunteers && event.volunteers.length > 0 && (
                      <div className="mt-4 pt-4 border-t border-[#2A303C]">
                        <span className="text-xs font-semibold text-[#8F9BB3] uppercase tracking-wider block mb-3">Current Volunteers</span>
                        <div className="space-y-2">
                          {event.volunteers.map((vol) => (
                            <div key={vol.id} className="flex items-center justify-between text-sm bg-[#161B23] p-2 rounded-lg border border-[#2A303C]">
                              <span className="text-white font-medium">{vol.name}</span>
                              <span className="text-xs text-[#00E5FF] px-2 py-0.5 bg-[#00E5FF]/10 rounded-full">{vol.status}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
