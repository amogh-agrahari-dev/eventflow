import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import {
  Home,
  MonitorPlay,
  LayoutTemplate,
  History,
  Users,
  ClipboardList,
  MessageSquare,
  UserPlus,
  MapPin,
  MessageCircle,
  Mail,
  Check,
  ChevronDown,
  Calendar,
  Clock,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Link as LinkIcon,
  List,
  ListOrdered,
  MoreHorizontal,
  Upload,
  Plus,
  Minus,
  Star,
  PlusSquare,
  Ticket,
  Bell,
  BarChart2,
  Settings,
  Briefcase,
  ChevronRight,
  Menu
} from "lucide-react";

export default function AddEventPage() {
  const [volunteers, setVolunteers] = useState(1);
  const [ticket1, setTicket1] = useState(10);
  const [ticket2, setTicket2] = useState(0);
  const [livePerformance, setLivePerformance] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDesktopSidebarCollapsed, setIsDesktopSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-[#11141A] text-slate-200 font-sans flex flex-col md:flex-row overflow-hidden">
      <Head>
        <title>Create New Event | EventFlow</title>
      </Head>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 bg-[#11141A] border-[#1C202B] flex flex-col shrink-0 overflow-hidden transform transition-all duration-300 md:relative md:translate-x-0 ${isMobileMenuOpen ? 'translate-x-0 w-[260px] border-r' : '-translate-x-full w-[260px] border-r'} ${isDesktopSidebarCollapsed ? 'md:w-0 md:border-r-0' : 'md:w-[260px] md:border-r'}`}>
        <div className="w-[260px] h-full flex flex-col overflow-y-auto custom-scrollbar">
          <div className="p-6 flex items-center gap-3 border-b border-[#1C202B]/60 shrink-0">
            <div className="w-8 h-8 rounded-full bg-[#6E56CF] flex items-center justify-center text-white font-bold text-lg">
              E
            </div>
            <span className="font-semibold text-lg tracking-wide text-white">EventFlow</span>
          </div>

          <div className="px-4 py-2 space-y-6">
            <div>
              <Link href="/dashboard" className="flex items-center gap-3 px-3 py-2 text-[#8F9BB3] hover:text-white transition-colors">
                <Home className="w-[18px] h-[18px]" />
                <span className="text-[13px] font-medium">Dashboard</span>
              </Link>
            </div>

            <div>
              <h3 className="px-3 text-[11px] font-semibold text-[#5A6B8A] uppercase tracking-wider mb-2">EVENT STUDIO</h3>
              <div className="space-y-0.5">
                <div className="flex items-center justify-between px-3 py-2 bg-[#2D3340]/40 text-[#00E5FF] border border-[#3A455A] rounded-lg cursor-pointer">
                  <div className="flex items-center gap-3">
                    <PlusSquare className="w-[18px] h-[18px] text-[#00E5FF]" />
                    <span className="text-[13px] font-medium text-white">Create New</span>
                  </div>
                  <Check className="w-4 h-4 text-[#00E5FF]" />
                </div>
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

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden bg-[#161B23] relative">
        {/* Top Header */}
        <header className="flex items-center justify-between px-4 md:px-8 py-5 border-b border-[#1C202B] bg-[#161B23]/80 backdrop-blur-sm z-10 flex-shrink-0 h-[68px]">
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
            <h1 className="text-[22px] font-medium text-white truncate">Create New Event</h1>
          </div>
          <div className="flex items-center gap-4">
            <button className="px-5 py-2 rounded-full text-sm font-medium text-slate-300 border border-[#2A3140] hover:bg-[#2A3140] transition-colors">
              Cancel
            </button>
            <button className="px-5 py-2 rounded-full text-sm font-medium text-white bg-[#6E56CF] hover:bg-[#5a46aa] transition-colors flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Create Event
            </button>

            <div className="w-px h-6 bg-[#2A3140] mx-1"></div>

            <button className="relative p-2 text-[#5A6B8A] hover:text-white transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-[#161B23]" />
            </button>

            <div className="w-8 h-8 rounded-full bg-[#6E56CF] cursor-pointer shadow-sm border border-[#2A3140] flex items-center justify-center text-white text-xs font-bold">
              AM
            </div>
          </div>
        </header>

        {/* Scrollable Form Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-6 md:p-8 pb-32 md:pb-32 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 max-w-[1400px] mx-auto pb-6">

            {/* Column 1: Event Details, Date & Location */}
            <div className="flex flex-col gap-6">
              {/* Event Details Card */}
              <div className="bg-[#1C202B] border border-[#2A3140] rounded-xl shadow-sm flex flex-col overflow-hidden">
                <div className="px-5 py-4 border-b border-[#2A3140]/60 bg-[#1C202B] shrink-0">
                  <h3 className="text-[15px] font-medium text-white tracking-wide">Event Details</h3>
                </div>

                <div className="p-5 space-y-4 bg-[#1C202B]">
                  <div>
                    <label className="block text-[12px] text-[#8F9BB3] mb-1.5">Event Title</label>
                    <input
                      type="text"
                      placeholder="Event Title input"
                      className="w-full bg-[#11141A] border border-[#2A3140] rounded-lg px-3 py-2 text-[13px] text-white placeholder:text-[#5A6B8A] focus:outline-none focus:border-[#6E56CF]/50 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[12px] text-[#8F9BB3] mb-1.5">Event Type</label>
                    <div className="relative">
                      <select className="w-full appearance-none bg-[#11141A] border border-[#2A3140] rounded-lg pl-3 pr-8 py-2 text-[13px] text-[#8F9BB3] focus:outline-none focus:border-[#6E56CF]/50 transition-colors">
                        <option>Gala, Symposium, Workshop, etc.</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5A6B8A] pointer-events-none" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[12px] text-[#8F9BB3] mb-1.5">Event Category</label>
                    <div className="relative">
                      <select className="w-full appearance-none bg-[#11141A] border border-[#2A3140] rounded-lg pl-3 pr-8 py-2 text-[13px] text-[#8F9BB3] focus:outline-none focus:border-[#6E56CF]/50 transition-colors">
                        <option></option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5A6B8A] pointer-events-none" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Date & Location Card */}
              <div className="bg-[#1C202B] border border-[#2A3140] rounded-xl shadow-sm flex-1 flex flex-col overflow-hidden">
                <div className="px-5 py-4 border-b border-[#2A3140]/60 bg-[#1C202B] shrink-0">
                  <h3 className="text-[15px] font-medium text-white tracking-wide">Date & Location</h3>
                </div>

                <div className="p-5 space-y-4 bg-[#1C202B] flex-1">
                  <div>
                    <label className="block text-[12px] text-[#8F9BB3] mb-1.5">Start Date/Time</label>
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <Calendar className="absolute left-2.5 top-1/2 -translate-y-1/2 w-[14px] h-[14px] text-[#5A6B8A]" />
                        <input type="text" placeholder="Nov, 2024" className="w-full bg-[#11141A] border border-[#2A3140] rounded-lg pl-8 pr-2 py-2 text-[13px] text-white focus:outline-none" />
                      </div>
                      <div className="relative w-28">
                        <select className="w-full appearance-none bg-[#11141A] border border-[#2A3140] rounded-lg pl-3 pr-7 py-2 text-[13px] text-white focus:outline-none">
                          <option>8:00 PM</option>
                        </select>
                        <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5A6B8A] pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[12px] text-[#8F9BB3] mb-1.5">End Date/Time</label>
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <Calendar className="absolute left-2.5 top-1/2 -translate-y-1/2 w-[14px] h-[14px] text-[#5A6B8A]" />
                        <input type="text" placeholder="Nov, 2024" className="w-full bg-[#11141A] border border-[#2A3140] rounded-lg pl-8 pr-2 py-2 text-[13px] text-white focus:outline-none" />
                      </div>
                      <div className="relative w-28">
                        <select className="w-full appearance-none bg-[#11141A] border border-[#2A3140] rounded-lg pl-3 pr-7 py-2 text-[13px] text-white focus:outline-none">
                          <option>6:00 PM</option>
                        </select>
                        <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5A6B8A] pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  <div className="pt-2">
                    <label className="block text-[12px] text-[#8F9BB3] mb-2">Venue Location</label>
                    <div className="relative rounded-lg overflow-hidden border border-[#2A3140] bg-[#11141A] h-28 mb-3">
                      {/* Fake Map Background */}
                      <div className="absolute inset-0 opacity-40 bg-[url('https://maps.googleapis.com/maps/api/staticmap?center=New+York,NY&zoom=14&size=400x200&style=feature:all|element:labels.text.fill|color:0x8e8e8e&style=feature:all|element:labels.text.stroke|color:0x1a1a1a&style=feature:all|element:labels.icon|visibility:off&style=feature:administrative|element:geometry.fill|color:0x000000&style=feature:administrative|element:geometry.stroke|color:0x144b53&style=feature:landscape|element:geometry|color:0x1b202c&style=feature:poi|element:geometry|color:0x1b202c&style=feature:road.highway|element:geometry.fill|color:0x222a38&style=feature:road.highway|element:geometry.stroke|color:0x1b202c&style=feature:road.arterial|element:geometry|color:0x222a38&style=feature:road.local|element:geometry|color:0x222a38&style=feature:transit|element:geometry|color:0x1b202c&style=feature:water|element:geometry|color:0x0e1118&sensor=false')] bg-cover bg-center"></div>

                      <div className="absolute inset-0 flex items-center justify-center pb-2">
                        <div className="text-red-500">
                          <MapPin className="w-6 h-6 fill-red-500/20" />
                        </div>
                      </div>
                      <div className="absolute bottom-2 left-2 flex items-center gap-1 text-[10px] text-white bg-[#11141A]/90 px-1.5 py-0.5 rounded backdrop-blur-sm">
                        <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                        Map
                      </div>
                    </div>
                    <input
                      type="text"
                      placeholder="Address address, lindrese"
                      className="w-full bg-[#11141A] border border-[#2A3140] rounded-lg px-3 py-2 text-[13px] text-white placeholder:text-[#5A6B8A] focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Column 2: Description & Logo, Logo / Banner */}
            <div className="flex flex-col gap-6 lg:col-span-1">

              {/* Description Card */}
              <div className="bg-[#1C202B] border border-[#2A3140] rounded-xl shadow-sm flex flex-col overflow-hidden">
                <div className="px-5 py-4 border-b border-[#2A3140]/60 bg-[#1C202B] shrink-0">
                  <h3 className="text-[15px] font-medium text-white tracking-wide">Description</h3>
                </div>

                <div className="p-5 bg-[#1C202B]">
                  <div className="bg-[#11141A] border border-[#2A3140] rounded-lg overflow-hidden flex flex-col h-[280px]">
                    {/* RTE Toolbar */}
                    <div className="flex items-center flex-wrap gap-1 p-2 border-b border-[#2A3140]">
                      <button className="p-1.5 text-[#8F9BB3] hover:text-white hover:bg-[#2A3140] rounded transition-colors"><Bold className="w-4 h-4" /></button>
                      <button className="p-1.5 text-[#8F9BB3] hover:text-white hover:bg-[#2A3140] rounded transition-colors"><Italic className="w-4 h-4" /></button>
                      <button className="p-1.5 text-[#8F9BB3] hover:text-white hover:bg-[#2A3140] rounded transition-colors"><Underline className="w-4 h-4" /></button>
                      <button className="p-1.5 text-[#8F9BB3] hover:text-white hover:bg-[#2A3140] rounded transition-colors"><Strikethrough className="w-4 h-4" /></button>
                      <div className="w-px h-4 bg-[#2A3140] mx-1"></div>
                      <button className="p-1.5 text-[#8F9BB3] hover:text-white hover:bg-[#2A3140] rounded transition-colors"><LinkIcon className="w-4 h-4" /></button>
                      <button className="p-1.5 text-[#8F9BB3] hover:text-white hover:bg-[#2A3140] rounded transition-colors"><List className="w-4 h-4" /></button>
                      <button className="p-1.5 text-[#8F9BB3] hover:text-white hover:bg-[#2A3140] rounded transition-colors"><ListOrdered className="w-4 h-4" /></button>
                      <button className="p-1.5 text-[#8F9BB3] hover:text-white hover:bg-[#2A3140] rounded transition-colors"><MoreHorizontal className="w-4 h-4" /></button>
                    </div>
                    <textarea
                      placeholder="Add event description"
                      className="w-full flex-1 bg-transparent p-4 text-[14px] text-white placeholder:text-[#5A6B8A] focus:outline-none resize-none custom-scrollbar"
                    ></textarea>
                  </div>
                </div>
              </div>

              {/* Secondary Logo / Banner Card */}
              <div className="bg-[#1C202B] border border-[#2A3140] rounded-xl shadow-sm flex-1 flex flex-col overflow-hidden">
                <div className="px-5 py-4 border-b border-[#2A3140]/60 bg-[#1C202B] shrink-0">
                  <h3 className="text-[15px] font-medium text-white tracking-wide">Logo / Banner</h3>
                </div>

                <div className="p-5 bg-[#1C202B] flex-1">
                  <h3 className="text-[12px] text-[#8F9BB3] mb-2">Upload Image</h3>
                  <div className="border-2 border-dashed border-[#3A455A] rounded-lg h-24 flex flex-col items-center justify-center gap-2 text-[#5A6B8A] bg-[#11141A]/50 cursor-pointer hover:bg-[#11141A] hover:border-[#5A6B8A] transition-colors mb-4">
                    <Upload className="w-5 h-5" />
                    <span className="text-[12px] font-medium">Click or drag to upload</span>
                  </div>

                  <h3 className="text-[12px] text-[#8F9BB3] mb-2">Upload preview</h3>
                  <div className="relative border border-[#2A3140] rounded-lg h-[120px] overflow-hidden bg-gradient-to-br from-[#1C202B] to-[#2D204A] p-4 flex flex-col justify-end">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-[#8C52FF]/30 blur-2xl rounded-full"></div>

                    <div className="relative z-10 w-full">
                      <div className="flex justify-between items-center mb-1.5">
                        <span className="text-[12px] font-medium text-white">event_banner.png</span>
                        <span className="text-[11px] font-medium text-[#00E5FF]">15%</span>
                      </div>
                      <div className="w-full h-1.5 bg-[#2A3140] rounded-full overflow-hidden mb-1">
                        <div className="h-full bg-[#6E56CF] w-[15%] rounded-full"></div>
                      </div>
                      <span className="text-[11px] text-[#5A6B8A]">Uploading...</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Column 3: Volunteer & Attendee Management */}
            <div className="flex flex-col gap-6 lg:col-span-1 lg:col-start-1 xl:col-start-auto">

              <div className="bg-[#1C202B] border border-[#2A3140] rounded-xl shadow-sm flex flex-col overflow-hidden">
                <div className="px-5 py-4 border-b border-[#2A3140]/60 bg-[#1C202B] shrink-0">
                  <h3 className="text-[15px] font-medium text-white tracking-wide">Volunteer Requirements</h3>
                </div>

                <div className="p-5 space-y-5 bg-[#1C202B]">
                  <div>
                    <label className="block text-[12px] text-[#8F9BB3] mb-1.5">Number of Volunteers Needed</label>
                    <input
                      type="number"
                      value={volunteers}
                      onChange={(e) => setVolunteers(e.target.value)}
                      className="w-full bg-[#11141A] border border-[#2A3140] rounded-lg px-3 py-2 text-[13px] text-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[12px] text-[#8F9BB3] mb-1.5">Specific roles needed</label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      <span className="bg-[#2A3140] text-slate-200 text-[11px] px-2.5 py-1.5 rounded-md hover:bg-[#3A455A] cursor-pointer transition-colors">
                        Check-in Staff
                      </span>
                      <span className="bg-[#2A3140] text-slate-200 text-[11px] px-2.5 py-1.5 rounded-md hover:bg-[#3A455A] cursor-pointer transition-colors">
                        Tech Support
                      </span>
                      <span className="bg-[#2A3140] text-slate-200 text-[11px] px-2.5 py-1.5 rounded-md hover:bg-[#3A455A] cursor-pointer transition-colors">
                        Event Guides
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[12px] text-[#8F9BB3] mb-1.5">Skill requirements</label>
                    <input
                      type="text"
                      placeholder="e.g. CPR Certified, Bilingual..."
                      className="w-full bg-[#11141A] border border-[#2A3140] rounded-lg px-3 py-2 text-[13px] text-white placeholder:text-[#5A6B8A] focus:outline-none"
                    />
                  </div>

                  <div className="pt-2">
                    <Link href="#" className="text-[#8C52FF] hover:text-[#A070FF] text-[13px] font-medium transition-colors inline-flex items-center gap-1">
                      Add Volunteer Assignments <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Attendee Management */}
              <div className="bg-[#1C202B] border border-[#2A3140] rounded-xl shadow-sm flex-1 flex flex-col overflow-hidden">
                <div className="px-5 py-4 border-b border-[#2A3140]/60 bg-[#1C202B] shrink-0">
                  <h3 className="text-[15px] font-medium text-white tracking-wide">Attendee Management</h3>
                </div>

                <div className="p-5 space-y-5 bg-[#1C202B] flex-1">
                  <div>
                    <label className="block text-[12px] text-[#8F9BB3] mb-1.5">Registration forms</label>
                    <div className="relative">
                      <select className="w-full appearance-none bg-[#11141A] border border-[#2A3140] rounded-lg pl-3 pr-8 py-2 text-[13px] text-white focus:outline-none">
                        <option>Select registration forms</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5A6B8A] pointer-events-none" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[12px] text-[#8F9BB3] mb-2">Ticket types</label>

                    <div className="space-y-3">
                      {/* Ticket 1 */}
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-[#11141A] border border-[#2A3140] rounded-lg px-3 py-2 flex items-center justify-between text-[13px]">
                          <span className="text-slate-300">Ticket 1</span>
                        </div>
                        <div className="flex items-center bg-[#11141A] border border-[#2A3140] rounded-lg h-9">
                          <button onClick={() => setTicket1(Math.max(0, ticket1 - 1))} className="px-2.5 h-full text-[#5A6B8A] hover:text-white transition-colors border-r border-[#2A3140]">
                            <Minus className="w-[14px] h-[14px]" />
                          </button>
                          <div className="w-9 text-center text-[13px] text-white font-medium">
                            {ticket1}
                          </div>
                          <button onClick={() => setTicket1(ticket1 + 1)} className="px-2.5 h-full text-[#5A6B8A] hover:text-white transition-colors relative border-l border-[#2A3140]">
                            <Plus className="w-[14px] h-[14px]" />
                            <Star className="absolute top-1 right-1 w-2.5 h-2.5 text-white fill-white" />
                          </button>
                        </div>
                      </div>

                      {/* Ticket 2 */}
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-[#11141A] border border-[#2A3140] rounded-lg px-3 py-2 flex items-center justify-between text-[13px]">
                          <span className="text-slate-300">Ticket 2</span>
                        </div>
                        <div className="flex items-center bg-[#11141A] border border-[#2A3140] rounded-lg h-9">
                          <button onClick={() => setTicket2(Math.max(0, ticket2 - 1))} className="px-2.5 h-full text-[#5A6B8A] hover:text-white transition-colors border-r border-[#2A3140]">
                            <Minus className="w-[14px] h-[14px]" />
                          </button>
                          <div className="w-9 text-center text-[13px] text-white font-medium">
                            {ticket2}
                          </div>
                          <button onClick={() => setTicket2(ticket2 + 1)} className="px-2.5 h-full text-[#5A6B8A] hover:text-white transition-colors border-l border-[#2A3140]">
                            <Plus className="w-[14px] h-[14px]" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Live Performance Hub (Full Width Box below widgets) */}
          <div className="max-w-[1400px] mx-auto pb-4">
            <div
              className="bg-[#1C202B] border border-[#2A3140] rounded-xl p-5 shadow-sm flex items-start gap-4 cursor-pointer hover:border-[#3A455A] transition-colors"
              onClick={() => setLivePerformance(!livePerformance)}
            >
              <div className="flex-shrink-0 mt-0.5">
                <div className={`w-5 h-5 rounded border ${livePerformance ? 'bg-[#6E56CF] border-[#6E56CF]' : 'border-[#5A6B8A] bg-transparent'} flex items-center justify-center transition-colors`}>
                  {livePerformance && <Check className="w-3.5 h-3.5 text-white" />}
                </div>
              </div>
              <div>
                <h4 className="text-[14px] font-medium text-white mb-1">Enable Live Performance Hub</h4>
                <p className="text-[12px] text-[#8F9BB3]">Enable Live Performance Hub features for this event. This unlocks live streaming, real-time Q&A, and interactive performance tracking for your attendees.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Fixed Bottom Actions (Sticky in the middle bottom of main content area) */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-[#1C202B]/95 backdrop-blur-md px-6 py-4 rounded-2xl border border-[#3A455A] shadow-2xl z-20">
          <button className="px-8 py-2.5 rounded-lg text-sm font-medium text-slate-300 border border-[#2A3140] bg-[#11141A] hover:bg-[#2A3140] transition-colors min-w-[150px]">
            Save as Draft
          </button>
          <button className="px-8 py-2.5 rounded-lg text-sm font-medium text-white bg-[#6E56CF] hover:bg-[#5a46aa] transition-colors shadow-[0_0_15px_rgba(79,70,229,0.3)] min-w-[150px]">
            Publish Event
          </button>
        </div>
      </main>
    </div>
  );
}
