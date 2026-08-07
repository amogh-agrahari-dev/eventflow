import React, { useRef, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { getToken } from "@/lib/auth";
import Head from "next/head";
import Link from "next/link";
import Logo from "@/components/general/Logo";
import Sidebar from '@/components/general/Sidebar';
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
import { useUserStore } from "@/store/userStore";
import SwitchRoleButton from '@/components/general/SwitchRoleButton';
import ProfileDropdown from '@/components/general/ProfileDropdown';
export default function AddEventPage() {
  const [livePerformance, setLivePerformance] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDesktopSidebarCollapsed, setIsDesktopSidebarCollapsed] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [uploadError, setUploadError] = useState("");
  const fileInputRef = useRef(null);
  const [eventTitle, setEventTitle] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [eventCategory, setEventCategory] = useState("Technical");
  const [eventFormat, setEventFormat] = useState("online");
  const [isFree, setIsFree] = useState(true);
  const [volunteersRequired, setVolunteersRequired] = useState(5);
  const [maxAttendees, setMaxAttendees] = useState(100);
  const router = useRouter();
  const { user, fetchUser } = useUserStore();
  const token = getToken();

  useEffect(() => {
    if (token && !user) {
      fetchUser();
    } else if (!token) {
      router.push("/auth/login");
    }
  }, [token, user, fetchUser, router]);
  const handleImageUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    setUploadProgress(20);
    setUploadError("");

    try {
      const reader = new FileReader();
      const fileDataUrl = await new Promise((resolve, reject) => {
        reader.onload = () => resolve(reader.result);
        reader.onerror = () => reject(new Error("Unable to read selected image"));
        reader.readAsDataURL(file);
      });

      setUploadProgress(50);

      const response = await fetch("/api/cloudinary-upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          file: fileDataUrl,
          fileName: file.name,
          contentType: file.type,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Image upload failed");
      }

      setUploadedImageUrl(data.secure_url);
      setUploadProgress(100);
    } catch (error) {
      setUploadError(error.message || "Image upload failed");
      setUploadProgress(0);
    } finally {
      setUploadingImage(false);
    }
  };

  const formatDateTime = (value) => {
    if (!value) return null;
    // If the input is from datetime-local (YYYY-MM-DDTHH:mm), append seconds.
    // This ensures it is treated as a naive datetime by the backend.
    return value.length === 16 ? `${value}:00` : value;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!eventTitle.trim()) {
      alert("Please enter an event title.");
      return;
    }

    if (!startDate || !endDate) {
      alert("Please select both start and end dates.");
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/events/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          organizer_id: user?.id || 1,
          title: eventTitle,
          description: eventDescription,
          category: eventCategory || "Technical",
          location: eventLocation,
          start_time: formatDateTime(startDate),
          end_time: formatDateTime(endDate),
          is_free: isFree,
          format: eventFormat,
          max_attendees: Number(maxAttendees) || 100,
          volunteers_required: Number(volunteersRequired) || 5,
          banner_url: uploadedImageUrl || null,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.log(data.detail || data.message || "Event creation failed. Please try again.");
        return;
      }

      alert("Event created successfully!");
    } catch (error) {
      console.log(error.message || "Event creation failed. Please try again.");
    }
  };

  return (
    <div className="h-screen bg-vol-bg text-slate-200 font-sans flex flex-col md:flex-row overflow-hidden">
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
      <Sidebar isMobileMenuOpen={isMobileMenuOpen} isDesktopSidebarCollapsed={isDesktopSidebarCollapsed} />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 bg-vol-bg relative">
        {/* Top Header */}
        <header className="flex items-center justify-between px-4 md:px-8 py-5 border-b border-vol-border bg-vol-bg/80 backdrop-blur-sm z-10 flex-shrink-0 h-[68px]">
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
            <button className="px-5 py-2 rounded-full text-sm font-medium text-slate-300 border border-vol-border hover:bg-vol-border transition-colors">
              Cancel
            </button>
            <button className="px-5 py-2 rounded-full text-sm font-medium text-white bg-vol-accent hover:bg-[#5a46aa] transition-colors flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Create Event
            </button>

            <div className="w-px h-6 bg-vol-border mx-1"></div>

            <button className="relative p-2 text-gray-500 hover:text-white transition-colors cursor-pointer">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-vol-bg" />
            </button>

            {/* Switch Role Button */}
            <SwitchRoleButton currentRole="Organizer" />

            {/* Profile Dropdown Menu */}
            <ProfileDropdown currentRole="Organizer" />
          </div>
        </header>

        {/* Scrollable Form Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-6 md:p-8 pb-32 md:pb-32 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 max-w-[1400px] mx-auto pb-6">

            {/* Column 1: Event Details, Date & Location */}
            <div className="flex flex-col gap-6">
              {/* Event Details Card */}
              <div className="bg-vol-card border border-vol-border rounded-xl shadow-sm flex flex-col overflow-hidden">
                <div className="px-5 py-4 border-b border-vol-border/60 bg-vol-card shrink-0">
                  <h3 className="text-[15px] font-medium text-white tracking-wide">Event Details</h3>
                </div>

                <div className="p-5 space-y-4 bg-vol-card">
                  <div>
                    <label className="block text-[12px] text-gray-400 mb-1.5">Event Title</label>
                    <input
                      value={eventTitle}
                      onChange={(e) => setEventTitle(e.target.value)}
                      type="text"
                      placeholder="Event Title input"
                      className="w-full bg-vol-bg border border-vol-border rounded-lg px-3 py-2 text-[13px] text-white placeholder:text-gray-500 focus:outline-none focus:border-vol-accent/50 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[12px] text-gray-400 mb-1.5">Event Category</label>
                    <div className="relative">
                      <select value={eventCategory} onChange={(e) => setEventCategory(e.target.value)} className="w-full appearance-none bg-vol-bg border border-vol-border rounded-lg pl-3 pr-8 py-2 text-[13px] text-gray-400 focus:outline-none focus:border-vol-accent/50 transition-colors">
                        <option value="Technical">Technical</option>
                        <option value="Corporate">Corporate</option>
                        <option value="Personal">Personal</option>
                        <option value="Social">Social</option>
                        <option value="Educational">Educational</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[12px] text-gray-400 mb-1.5">Event Format</label>
                    <div className="relative">
                      <select value={eventFormat} onChange={(e) => setEventFormat(e.target.value)} className="w-full appearance-none bg-vol-bg border border-vol-border rounded-lg pl-3 pr-8 py-2 text-[13px] text-gray-400 focus:outline-none focus:border-vol-accent/50 transition-colors">
                        <option value="online">Online</option>
                        <option value="offline">Offline</option>
                        <option value="hybrid">Hybrid</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <input
                      id="is-free"
                      type="checkbox"
                      checked={isFree}
                      onChange={(e) => setIsFree(e.target.checked)}
                      className="h-4 w-4 rounded border-vol-border bg-vol-bg text-vol-accent focus:ring-[#6E56CF]"
                    />
                    <label htmlFor="is-free" className="text-[12px] text-gray-400">Free event</label>
                  </div>
                </div>
              </div>

              {/* Date & Location Card */}
              <div className="bg-vol-card border border-vol-border rounded-xl shadow-sm flex-1 flex flex-col overflow-hidden">
                <div className="px-5 py-4 border-b border-vol-border/60 bg-vol-card shrink-0">
                  <h3 className="text-[15px] font-medium text-white tracking-wide">Date & Location</h3>
                </div>

                <div className="p-5 space-y-4 bg-vol-card flex-1">
                  <div>
                    <label className="block text-[12px] text-gray-400 mb-1.5">Start Date/Time</label>
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <Calendar className="absolute left-2.5 top-1/2 -translate-y-1/2 w-[14px] h-[14px] text-gray-500" />
                        <input value={startDate} onChange={(e) => setStartDate(e.target.value)} type="datetime-local" placeholder="Nov, 2024" className="w-full bg-vol-bg border border-vol-border rounded-lg pl-8 pr-2 py-2 text-[13px] text-white focus:outline-none" />
                      </div>

                    </div>
                  </div>

                  <div>
                    <label className="block text-[12px] text-gray-400 mb-1.5">End Date/Time</label>
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <Calendar className="absolute left-2.5 top-1/2 -translate-y-1/2 w-[14px] h-[14px] text-gray-500" />
                        <input value={endDate} onChange={(e) => setEndDate(e.target.value)} type="datetime-local" placeholder="Nov, 2024" className="w-full bg-vol-bg border border-vol-border rounded-lg pl-8 pr-2 py-2 text-[13px] text-white focus:outline-none" />
                      </div>

                    </div>
                  </div>

                  <div className="pt-2">
                    <label className="block text-[12px] text-gray-400 mb-2">Venue Location</label>
                    <div className="relative rounded-lg overflow-hidden border border-vol-border bg-vol-bg h-28 mb-3">
                      {/* Fake Map Background */}
                      <div className="absolute inset-0 opacity-40 bg-[url('https://maps.googleapis.com/maps/api/staticmap?center=New+York,NY&zoom=14&size=400x200&style=feature:all|element:labels.text.fill|color:0x8e8e8e&style=feature:all|element:labels.text.stroke|color:0x1a1a1a&style=feature:all|element:labels.icon|visibility:off&style=feature:administrative|element:geometry.fill|color:0x000000&style=feature:administrative|element:geometry.stroke|color:0x144b53&style=feature:landscape|element:geometry|color:0x1b202c&style=feature:poi|element:geometry|color:0x1b202c&style=feature:road.highway|element:geometry.fill|color:0x222a38&style=feature:road.highway|element:geometry.stroke|color:0x1b202c&style=feature:road.arterial|element:geometry|color:0x222a38&style=feature:road.local|element:geometry|color:0x222a38&style=feature:transit|element:geometry|color:0x1b202c&style=feature:water|element:geometry|color:0x0e1118&sensor=false')] bg-cover bg-center"></div>

                      <div className="absolute inset-0 flex items-center justify-center pb-2">
                        <div className="text-red-500">
                          <MapPin className="w-6 h-6 fill-red-500/20" />
                        </div>
                      </div>
                      <div className="absolute bottom-2 left-2 flex items-center gap-1 text-[10px] text-white bg-vol-bg/90 px-1.5 py-0.5 rounded backdrop-blur-sm">
                        <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                        Map
                      </div>
                    </div>
                    <input
                      type="text"
                      value={eventLocation}
                      onChange={(e) => setEventLocation(e.target.value)}
                      placeholder="Address address, lindrese"
                      className="w-full bg-vol-bg border border-vol-border rounded-lg px-3 py-2 text-[13px] text-white placeholder:text-gray-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Column 2: Description & Logo, Logo / Banner */}
            <div className="flex flex-col gap-6 lg:col-span-1">

              {/* Description Card */}
              <div className="bg-vol-card border border-vol-border rounded-xl shadow-sm flex flex-col overflow-hidden">
                <div className="px-5 py-4 border-b border-vol-border/60 bg-vol-card shrink-0">
                  <h3 className="text-[15px] font-medium text-white tracking-wide">Description</h3>
                </div>

                <div className="p-5 bg-vol-card">
                  <div className="bg-vol-bg border border-vol-border rounded-lg overflow-hidden flex flex-col h-[280px]">
                    {/* RTE Toolbar */}
                    <div className="flex items-center flex-wrap gap-1 p-2 border-b border-vol-border">
                      <button className="p-1.5 text-gray-400 hover:text-white hover:bg-vol-border rounded transition-colors"><Bold className="w-4 h-4" /></button>
                      <button className="p-1.5 text-gray-400 hover:text-white hover:bg-vol-border rounded transition-colors"><Italic className="w-4 h-4" /></button>
                      <button className="p-1.5 text-gray-400 hover:text-white hover:bg-vol-border rounded transition-colors"><Underline className="w-4 h-4" /></button>
                      <button className="p-1.5 text-gray-400 hover:text-white hover:bg-vol-border rounded transition-colors"><Strikethrough className="w-4 h-4" /></button>
                      <div className="w-px h-4 bg-vol-border mx-1"></div>
                      <button className="p-1.5 text-gray-400 hover:text-white hover:bg-vol-border rounded transition-colors"><LinkIcon className="w-4 h-4" /></button>
                      <button className="p-1.5 text-gray-400 hover:text-white hover:bg-vol-border rounded transition-colors"><List className="w-4 h-4" /></button>
                      <button className="p-1.5 text-gray-400 hover:text-white hover:bg-vol-border rounded transition-colors"><ListOrdered className="w-4 h-4" /></button>
                      <button className="p-1.5 text-gray-400 hover:text-white hover:bg-vol-border rounded transition-colors"><MoreHorizontal className="w-4 h-4" /></button>
                    </div>
                    <textarea
                      value={eventDescription}
                      onChange={(e) => setEventDescription(e.target.value)}
                      placeholder="Add event description"
                      className="w-full flex-1 bg-transparent p-4 text-[14px] text-white placeholder:text-gray-500 focus:outline-none resize-none custom-scrollbar"
                    ></textarea>
                  </div>
                </div>
              </div>

              {/* Secondary Logo / Banner Card */}
              <div className="bg-vol-card border border-vol-border rounded-xl shadow-sm flex-1 flex flex-col overflow-hidden">
                <div className="px-5 py-4 border-b border-vol-border/60 bg-vol-card shrink-0">
                  <h3 className="text-[15px] font-medium text-white tracking-wide">Logo / Banner</h3>
                </div>

                <div className="p-5 bg-vol-card flex-1">
                  <h3 className="text-[12px] text-gray-400 mb-2">Upload Image</h3>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full border-2 border-dashed border-vol-border/80 rounded-lg h-24 flex flex-col items-center justify-center gap-2 text-gray-500 bg-vol-bg/50 cursor-pointer hover:bg-vol-bg hover:border-[#5A6B8A] transition-colors mb-4"
                  >
                    <Upload className="w-5 h-5" />
                    <span className="text-[12px] font-medium">Click to upload to Cloudinary</span>
                  </button>

                  {uploadError && (
                    <p className="text-[11px] text-red-400 mb-3">{uploadError}</p>
                  )}

                  <h3 className="text-[12px] text-gray-400 mb-2">Upload preview</h3>
                  <div className="relative border border-vol-border rounded-lg h-[140px] overflow-hidden bg-gradient-to-br from-vol-card to-vol-bg p-4 flex flex-col justify-end">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-vol-accent/30 blur-2xl rounded-full"></div>

                    {uploadedImageUrl ? (
                      <img
                        src={uploadedImageUrl}
                        alt="Event banner preview"
                        className="absolute inset-0 h-full w-full object-cover"
                      />
                    ) : (
                      <div className="relative z-10 w-full">
                        <div className="flex justify-between items-center mb-1.5">
                          <span className="text-[12px] font-medium text-white">No image uploaded yet</span>
                          <span className="text-[11px] font-medium text-vol-accent2">0%</span>
                        </div>
                        <div className="w-full h-1.5 bg-vol-border rounded-full overflow-hidden mb-1">
                          <div className="h-full bg-vol-accent w-[0%] rounded-full"></div>
                        </div>
                        <span className="text-[11px] text-gray-500">Waiting for upload</span>
                      </div>
                    )}

                    {uploadingImage && (
                      <div className="relative z-10 w-full bg-vol-bg/70 p-3 rounded-lg backdrop-blur-sm">
                        <div className="flex justify-between items-center mb-1.5">
                          <span className="text-[12px] font-medium text-white">Uploading...</span>
                          <span className="text-[11px] font-medium text-vol-accent2">{uploadProgress}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-vol-border rounded-full overflow-hidden mb-1">
                          <div className="h-full bg-vol-accent rounded-full transition-all" style={{ width: `${uploadProgress}%` }}></div>
                        </div>
                        <span className="text-[11px] text-gray-500">Sending to Cloudinary</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Column 3: Volunteer & Attendee Management */}
            <div className="flex flex-col gap-6 lg:col-span-1 lg:col-start-1 xl:col-start-auto">

              <div className="bg-vol-card border border-vol-border rounded-xl shadow-sm flex flex-col overflow-hidden">
                <div className="px-5 py-4 border-b border-vol-border/60 bg-vol-card shrink-0">
                  <h3 className="text-[15px] font-medium text-white tracking-wide">Volunteer Requirements</h3>
                </div>

                <div className="p-5 space-y-5 bg-vol-card">
                  <div>
                    <label className="block text-[12px] text-gray-400 mb-1.5">Number of Volunteers Needed</label>
                    <input
                      type="number"
                      min="0"
                      value={volunteersRequired}
                      onChange={(e) => setVolunteersRequired(e.target.value)}
                      className="w-full bg-vol-bg border border-vol-border rounded-lg px-3 py-2 text-[13px] text-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[12px] text-gray-400 mb-1.5">Specific roles needed</label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      <span className="bg-vol-border text-slate-200 text-[11px] px-2.5 py-1.5 rounded-md hover:bg-vol-border cursor-pointer transition-colors">
                        Check-in Staff
                      </span>
                      <span className="bg-vol-border text-slate-200 text-[11px] px-2.5 py-1.5 rounded-md hover:bg-vol-border cursor-pointer transition-colors">
                        Tech Support
                      </span>
                      <span className="bg-vol-border text-slate-200 text-[11px] px-2.5 py-1.5 rounded-md hover:bg-vol-border cursor-pointer transition-colors">
                        Event Guides
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[12px] text-gray-400 mb-1.5">Skill requirements</label>
                    <input
                      type="text"
                      placeholder="e.g. CPR Certified, Bilingual..."
                      className="w-full bg-vol-bg border border-vol-border rounded-lg px-3 py-2 text-[13px] text-white placeholder:text-gray-500 focus:outline-none"
                    />
                  </div>

                  <div className="pt-2">
                    <Link href="#" className="text-vol-accent hover:text-vol-accent text-[13px] font-medium transition-colors inline-flex items-center gap-1">
                      Add Volunteer Assignments <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Attendee Management */}
              <div className="bg-vol-card border border-vol-border rounded-xl shadow-sm flex-1 flex flex-col overflow-hidden">
                <div className="px-5 py-4 border-b border-vol-border/60 bg-vol-card shrink-0">
                  <h3 className="text-[15px] font-medium text-white tracking-wide">Attendee Management</h3>
                </div>

                <div className="p-5 bg-vol-card flex-1">
                  <div>
                    <label className="block text-[12px] text-gray-400 mb-1.5">Maximum number of attendees</label>
                    <input
                      type="number"
                      min="1"
                      value={maxAttendees}
                      onChange={(e) => setMaxAttendees(e.target.value)}
                      placeholder="e.g. 250"
                      className="w-full bg-vol-bg border border-vol-border rounded-lg px-3 py-2 text-[13px] text-white placeholder:text-gray-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Live Performance Hub (Full Width Box below widgets) */}
          <div className="max-w-[1400px] mx-auto pb-4">
            <div
              className="bg-vol-card border border-vol-border rounded-xl p-5 shadow-sm flex items-start gap-4 cursor-pointer hover:border-vol-border/80 transition-colors"
              onClick={() => setLivePerformance(!livePerformance)}
            >
              <div className="flex-shrink-0 mt-0.5">
                <div className={`w-5 h-5 rounded border ${livePerformance ? 'bg-vol-accent border-vol-accent' : 'border-[#5A6B8A] bg-transparent'} flex items-center justify-center transition-colors`}>
                  {livePerformance && <Check className="w-3.5 h-3.5 text-white" />}
                </div>
              </div>
              <div>
                <h4 className="text-[14px] font-medium text-white mb-1">Enable Live Performance Hub</h4>
                <p className="text-[12px] text-gray-400">Enable Live Performance Hub features for this event. This unlocks live streaming, real-time Q&A, and interactive performance tracking for your attendees.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Fixed Bottom Actions (Sticky in the middle bottom of main content area) */}
        <form onSubmit={handleSubmit} className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-vol-card/95 backdrop-blur-md px-6 py-4 rounded-2xl border border-vol-border/80 shadow-2xl z-20">
          <button type="button" className="px-8 py-2.5 rounded-lg text-sm font-medium text-slate-300 border border-vol-border bg-vol-bg hover:bg-vol-border transition-colors min-w-[150px]">
            Save as Draft
          </button>
          <button type="submit" className="px-8 py-2.5 rounded-lg text-sm font-medium text-white bg-vol-accent hover:bg-[#5a46aa] transition-colors shadow-[0_0_15px_rgba(79,70,229,0.3)] min-w-[150px]">
            Publish Event
          </button>
        </form>
      </main>
    </div>
  );
}
