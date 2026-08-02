import React, { useState } from "react";
import Head from "next/head";
import Navbar from "@/components/general/Navbar";
import Footer from "@/components/general/Footer";
import { Button, Input, Label } from "@/components/ui";
import toast from "react-hot-toast";
import {
  CalendarDays,
  Clock,
  MapPin,
  Users,
  Ticket,
  Type,
  AlignLeft,
  Banknote,
  Tag,
  Globe,
  Building,
  UserPlus,
  Sparkles
} from "lucide-react";

export default function AddEventPage() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    maxAttendees: "",
    eventType: "unpaid",
    category: "",
    format: "offline",
    volunteersRequired: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEventType = (type) => {
    setFormData((prev) => ({ ...prev, eventType: type }));
  };

  const handleFormat = (type) => {
    setFormData((prev) => ({ ...prev, format: type }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate API call
    toast.success("Event created successfully!");
    // Reset form or redirect could happen here
  };

  return (
    <div className="min-h-screen bg-grid-faint text-foreground font-sans flex flex-col">
      <Head>
        <title>Create Event | EventFlow</title>
        <meta name="description" content="Create and manage a new event on EventFlow" />
      </Head>

      <Navbar />

      <main className="flex-1 container mx-auto px-4 py-8 lg:py-12 max-w-7xl sm:mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">

          {/* Left Column: Information */}
          <div className="lg:col-span-4 xl:col-span-5 relative overflow-hidden bg-gradient-brand p-6 md:p-8 rounded-3xl text-primary-foreground shadow-2xl h-full flex flex-col">
            <div className="absolute inset-0 animate-grid-in bg-grid-faint opacity-50" aria-hidden="true" />

            <div className="relative z-10">
              <h1 className="text-3xl md:text-4xl font-display font-bold mb-4 tracking-tight">
                Create New Event
              </h1>
              <p className="text-base text-primary-foreground/80 mb-6 leading-relaxed">
                Design an unforgettable experience. Provide the basic details, set the schedule and venue, and configure ticketing and capacity to publish your event.
              </p>

              <div className="space-y-4 hidden md:block">
                <div className="flex items-start gap-3 group">
                  <div className="p-2 bg-primary-foreground/10 rounded-xl text-accent transition-all duration-300 group-hover:bg-primary-foreground/20 group-hover:scale-110 mt-0.5">
                    <AlignLeft className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm mb-0.5">Basic Information</h3>
                    <p className="text-[11px] text-primary-foreground/70 leading-relaxed">Set your event title, select a category, and write an engaging description.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 group">
                  <div className="p-2 bg-primary-foreground/10 rounded-xl text-accent transition-all duration-300 group-hover:bg-primary-foreground/20 group-hover:scale-110 mt-0.5">
                    <MapPin className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm mb-0.5">Time & Venue</h3>
                    <p className="text-[11px] text-primary-foreground/70 leading-relaxed">Schedule the date/time, and choose between an online link or physical location.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 group">
                  <div className="p-2 bg-primary-foreground/10 rounded-xl text-accent transition-all duration-300 group-hover:bg-primary-foreground/20 group-hover:scale-110 mt-0.5">
                    <Users className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm mb-0.5">Capacity & Volunteers</h3>
                    <p className="text-[11px] text-primary-foreground/70 leading-relaxed">Configure free or paid tickets, set attendee limits, and specify volunteer needs.</p>
                  </div>
                </div>

                <div className="pt-2 pb-1 border-t border-primary-foreground/10" />

                <div className="flex items-start gap-3 group">
                  <div className="p-2 bg-primary-foreground/10 rounded-xl text-accent transition-all duration-300 group-hover:bg-primary-foreground/20 group-hover:scale-110 mt-0.5">
                    <Ticket className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm mb-0.5">Smart Ticketing</h3>
                    <p className="text-[11px] text-primary-foreground/70 leading-relaxed">Easily manage paid or free registrations and set capacity automatically.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 group">
                  <div className="p-2 bg-primary-foreground/10 rounded-xl text-accent transition-all duration-300 group-hover:bg-primary-foreground/20 group-hover:scale-110 mt-0.5">
                    <UserPlus className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm mb-0.5">Volunteer Tracking</h3>
                    <p className="text-[11px] text-primary-foreground/70 leading-relaxed">Specify required volunteers, assign tasks, and track their hours.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 group">
                  <div className="p-2 bg-primary-foreground/10 rounded-xl text-accent transition-all duration-300 group-hover:bg-primary-foreground/20 group-hover:scale-110 mt-0.5">
                    <Globe className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm mb-0.5">Hybrid Ready</h3>
                    <p className="text-[11px] text-primary-foreground/70 leading-relaxed">Host seamlessly in-person at your venue or via virtual sessions.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="lg:col-span-8 xl:col-span-7">
            <form onSubmit={handleSubmit} className="space-y-6">

              {/* Section 1: Basic Info */}
              <div className="bg-card/40 border border-border/60 rounded-3xl p-5 md:p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="flex items-center gap-3 mb-4 pb-3 border-b border-border/50">
                  <div className="p-1.5 bg-primary/10 rounded-lg text-primary">
                    <AlignLeft className="w-4 h-4" />
                  </div>
                  <h2 className="text-lg font-display font-semibold">Basic Information</h2>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="title" className="flex items-center gap-2 text-sm">
                        <Type className="w-3.5 h-3.5 text-muted-foreground" />
                        Event Title
                      </Label>
                      <Input
                        id="title"
                        name="title"
                        placeholder="e.g. Annual Tech Symposium"
                        value={formData.title}
                        onChange={handleChange}
                        className="h-10 text-sm"
                        required
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="category" className="flex items-center gap-2 text-sm">
                        <Tag className="w-3.5 h-3.5 text-muted-foreground" />
                        Event Category
                      </Label>
                      <select
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-1 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-colors"
                        required
                      >
                        <option value="" disabled>Select a category</option>
                        <option value="technical">Technical</option>
                        <option value="cultural">Cultural</option>
                        <option value="sports">Sports</option>
                        <option value="workshop">Workshop</option>
                        <option value="seminar">Seminar</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="description" className="flex items-center gap-2 text-sm">
                      <AlignLeft className="w-3.5 h-3.5 text-muted-foreground" />
                      Event Description
                    </Label>
                    <textarea
                      id="description"
                      name="description"
                      className="flex min-h-[100px] w-full rounded-xl border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 transition-colors resize-y"
                      placeholder="Provide a compelling description of what attendees can expect..."
                      value={formData.description}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Section 2: Date, Time & Location */}
              <div className="bg-card/40 border border-border/60 rounded-3xl p-5 md:p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="flex items-center gap-3 mb-4 pb-3 border-b border-border/50">
                  <div className="p-1.5 bg-primary/10 rounded-lg text-primary">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <h2 className="text-lg font-display font-semibold">When & Where</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="date" className="flex items-center gap-2 text-sm">
                      <CalendarDays className="w-3.5 h-3.5 text-muted-foreground" />
                      Date
                    </Label>
                    <Input
                      id="date"
                      name="date"
                      type="date"
                      value={formData.date}
                      onChange={handleChange}
                      className="h-10 text-sm"
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="time" className="flex items-center gap-2 text-sm">
                      <Clock className="w-3.5 h-3.5 text-muted-foreground" />
                      Time
                    </Label>
                    <Input
                      id="time"
                      name="time"
                      type="time"
                      value={formData.time}
                      onChange={handleChange}
                      className="h-10 text-sm"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label className="flex items-center gap-2 text-sm">
                      <Building className="w-3.5 h-3.5 text-muted-foreground" />
                      Event Format
                    </Label>
                    <div className="flex gap-3">
                      <button
                        type="button"
                        onClick={() => handleFormat('offline')}
                        className={`flex-1 flex flex-col items-center justify-center py-2 px-3 rounded-xl border-2 transition-all duration-200 ${formData.format === 'offline'
                          ? 'border-primary bg-primary/5 text-primary'
                          : 'border-border/50 bg-background/50 text-muted-foreground hover:border-primary/50'
                          }`}
                      >
                        <Building className="w-4 h-4 mb-1" />
                        <span className="font-semibold text-xs">Offline</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleFormat('online')}
                        className={`flex-1 flex flex-col items-center justify-center py-2 px-3 rounded-xl border-2 transition-all duration-200 ${formData.format === 'online'
                          ? 'border-primary bg-primary/5 text-primary'
                          : 'border-border/50 bg-background/50 text-muted-foreground hover:border-primary/50'
                          }`}
                      >
                        <Globe className="w-4 h-4 mb-1" />
                        <span className="font-semibold text-xs">Online</span>
                      </button>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="location" className="flex items-center gap-2 text-sm">
                      <MapPin className="w-3.5 h-3.5 text-muted-foreground" />
                      {formData.format === 'online' ? 'Meeting Link' : 'Location'}
                    </Label>
                    <Input
                      id="location"
                      name="location"
                      placeholder={formData.format === 'online' ? "e.g. Google Meet Link" : "e.g. Main Auditorium, Campus"}
                      value={formData.location}
                      onChange={handleChange}
                      className="h-10 mt-[1.35rem] text-sm"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Section 3: Ticketing & Capacity */}
              <div className="bg-card/40 border border-border/60 rounded-3xl p-5 md:p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="flex items-center gap-3 mb-4 pb-3 border-b border-border/50">
                  <div className="p-1.5 bg-primary/10 rounded-lg text-primary">
                    <Ticket className="w-4 h-4" />
                  </div>
                  <h2 className="text-lg font-display font-semibold">Ticketing, Capacity & Volunteers</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <Label className="flex items-center gap-2 text-sm">
                      <Banknote className="w-3.5 h-3.5 text-muted-foreground" />
                      Event Type
                    </Label>
                    <div className="flex gap-3">
                      <button
                        type="button"
                        onClick={() => handleEventType('unpaid')}
                        className={`flex-1 flex flex-col items-center justify-center py-2 px-3 rounded-xl border-2 transition-all duration-200 ${formData.eventType === 'unpaid'
                          ? 'border-primary bg-primary/5 text-primary'
                          : 'border-border/50 bg-background/50 text-muted-foreground hover:border-primary/50'
                          }`}
                      >
                        <span className="font-semibold text-sm mb-0.5">Free</span>
                        <span className="text-[10px] opacity-80 text-center leading-tight">Open registration</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleEventType('paid')}
                        className={`flex-1 flex flex-col items-center justify-center py-2 px-3 rounded-xl border-2 transition-all duration-200 ${formData.eventType === 'paid'
                          ? 'border-primary bg-primary/5 text-primary'
                          : 'border-border/50 bg-background/50 text-muted-foreground hover:border-primary/50'
                          }`}
                      >
                        <span className="font-semibold text-sm mb-0.5">Paid</span>
                        <span className="text-[10px] opacity-80 text-center leading-tight">Requires ticket</span>
                      </button>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="maxAttendees" className="flex items-center gap-2 text-sm">
                      <Users className="w-3.5 h-3.5 text-muted-foreground" />
                      Maximum Attendees
                    </Label>
                    <Input
                      id="maxAttendees"
                      name="maxAttendees"
                      type="number"
                      min="1"
                      placeholder="e.g. 500"
                      value={formData.maxAttendees}
                      onChange={handleChange}
                      className="h-10 text-sm"
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="volunteersRequired" className="flex items-center gap-2 text-sm">
                      <UserPlus className="w-3.5 h-3.5 text-muted-foreground" />
                      Volunteers Required
                    </Label>
                    <Input
                      id="volunteersRequired"
                      name="volunteersRequired"
                      type="number"
                      min="0"
                      placeholder="e.g. 20"
                      value={formData.volunteersRequired}
                      onChange={handleChange}
                      className="h-10 text-sm"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-3 pb-8">
                <Button type="button" variant="outline" className="h-10 px-6 rounded-xl text-sm">
                  Cancel
                </Button>
                <Button type="submit" variant="hero" className="h-10 px-6 rounded-xl shadow-lg hover:shadow-primary/25 text-sm">
                  Publish Event
                </Button>
              </div>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
