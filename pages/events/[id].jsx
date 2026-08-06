import React, { useState } from 'react';
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
import { Button } from '@/components/ui';
import { MOCK_EVENTS } from '@/lib/mockEvents';

export default function EventDetailsPage() {
  const router = useRouter();
  const { id } = router.query;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDesktopSidebarCollapsed, setIsDesktopSidebarCollapsed] = useState(false);

  // Find event
  const event = MOCK_EVENTS.find(e => e.id === Number(id));

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

  const isFull = event.registered >= event.maxAttendees;
  const progressPercent = Math.min(100, Math.round((event.registered / event.maxAttendees) * 100));

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
      <aside className={`fixed inset-y-0 left-0 z-50 bg-[#11141A] border-[#1C202B] flex flex-col shrink-0 overflow-hidden transform transition-all duration-300 md:relative md:translate-x-0 ${isMobileMenuOpen ? 'translate-x-0 w-[260px] border-r' : '-translate-x-full w-[260px] border-r'} ${isDesktopSidebarCollapsed ? 'md:w-0 md:border-r-0' : 'md:w-[260px] md:border-r'}`}>
        <div className="w-[260px] h-full flex flex-col bg-[#11141A]">
          <div className="p-6 flex items-center gap-3 border-b border-[#1C202B]/60 shrink-0">
            <Logo iconSize={32} />
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar px-4 py-2 space-y-6 mt-4">
            <div>
              <Link href="/dashboard" className="flex items-center gap-3 px-3 py-2 text-[#8F9BB3] hover:text-white transition-colors rounded-lg">
                <Home className="w-[18px] h-[18px]" />
                <span className="text-[13px] font-medium flex-1">Dashboard</span>
              </Link>
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
                <Link href="/all-events" className="flex items-center gap-3 px-3 py-2 text-[#8F9BB3] hover:text-white transition-colors rounded-lg">
                  <History className="w-[18px] h-[18px]" />
                  <span className="text-[13px] font-medium">All Events</span>
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
              <h3 className="px-3 text-[11px] font-semibold text-[#5A6B8A] uppercase tracking-wider mb-2">ANALYTICS PRO</h3>
              <div className="space-y-0.5">
                <Link href="#" className="flex items-center gap-3 px-3 py-2 text-[#8F9BB3] hover:text-white transition-colors rounded-lg">
                  <BarChart2 className="w-[18px] h-[18px]" />
                  <span className="text-[13px] font-medium">Custom Reports</span>
                </Link>
                <Link href="/settings" className="flex items-center gap-3 px-3 py-2 text-[#8F9BB3] hover:text-white transition-colors rounded-lg">
                  <Settings className="w-[18px] h-[18px]" />
                  <span className="text-[13px] font-medium">General Settings</span>
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
            <h1 className="text-[22px] font-medium text-white truncate">Event Details</h1>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative p-2 text-[#5A6B8A] hover:text-white transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#F59E0B] rounded-full border-2 border-[#161B23]"></span>
            </button>
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#6E56CF] to-[#00E5FF] p-[2px] cursor-pointer shadow-lg shadow-[#6E56CF]/20">
              <div className="w-full h-full bg-[#161B23] rounded-full flex items-center justify-center overflow-hidden">
                <span className="text-xs font-bold text-white">OR</span>
              </div>
            </div>
          </div>
        </header>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">

          {/* Cover Image Area */}
          <div className="h-64 md:h-80 w-full bg-gradient-to-br from-[#2D3340] to-[#1C202B] relative flex items-center justify-center border-b border-[#2A303C]">
            <ImageIcon className="w-16 h-16 text-white/10" />

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
                    <span className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider border ${event.type === 'Free' ? 'bg-[#10B981]/20 text-[#10B981] border-[#10B981]/30' : 'bg-[#F59E0B]/20 text-[#F59E0B] border-[#F59E0B]/30'}`}>
                      {event.type}
                    </span>
                    <span className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider border ${event.format === 'Online' ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' : 'bg-pink-500/20 text-pink-400 border-pink-500/30'}`}>
                      {event.format}
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
                          {new Date(event.startDate).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
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
                          {new Date(event.startDate).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })} - {new Date(event.endDate).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
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
                        {event.registered.toLocaleString()} / {event.maxAttendees.toLocaleString()}
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
                      className="w-full bg-[#6E56CF] hover:bg-[#5a46aa] text-white py-3 shadow-[0_0_15px_rgba(110,86,207,0.3)] transition-all font-semibold"
                    >
                      Register as Volunteer
                    </Button>
                    <Button
                      className="w-full bg-[#11141A] border border-[#00E5FF]/30 hover:bg-[#00E5FF]/10 text-[#00E5FF] py-3 transition-colors font-semibold"
                    >
                      Register as Attendee
                    </Button>
                  </div>

                  <div className="mt-6 p-4 rounded-xl bg-[#11141A] border border-[#2A303C]">
                    <div className="flex items-center gap-3 mb-2">
                      <Users className="w-4 h-4 text-[#5A6B8A]" />
                      <span className="text-sm font-semibold text-white">Volunteers Needed</span>
                    </div>
                    <p className="text-xs text-[#8F9BB3]">
                      We are looking for {event.volunteersRequired} volunteers for this event. Perks include free merch and food.
                    </p>
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
