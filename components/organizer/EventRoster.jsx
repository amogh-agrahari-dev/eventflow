import React, { useState } from 'react';
import { Button, Input } from '@/components/ui';
import { Search, Filter, CalendarDays, MapPin, Users, CheckCircle2, Clock, Eye, QrCode } from 'lucide-react';

export default function EventRoster({
  events = [],
  onSelectEventDetail,
  onOpenCheckInDesk,
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'table'

  const filteredEvents = events.filter(evt => {
    const matchesSearch = evt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          evt.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          evt.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || evt.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Search & Filter Control Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 rounded-3xl border border-border/80 bg-card/80 backdrop-blur-md shadow-sm hover:shadow-md transition-shadow">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search events by title, category or venue..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-11 h-11 rounded-2xl bg-background/90 border-border/80 focus:border-accent"
          />
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-muted-foreground hidden sm:block" />
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="h-11 rounded-2xl border border-input bg-background px-3.5 text-sm font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-accent cursor-pointer"
            >
              <option value="All">All Categories</option>
              <option value="Hackathon">Hackathon</option>
              <option value="Cultural">Cultural</option>
              <option value="Tech & Science">Tech & Science</option>
              <option value="Workshop">Workshop</option>
              <option value="Gaming">Gaming</option>
            </select>
          </div>

          <div className="border-l border-border pl-3 flex items-center gap-1 bg-muted/60 p-1 rounded-2xl">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${viewMode === 'grid' ? 'bg-background shadow-md text-foreground scale-105' : 'text-muted-foreground hover:text-foreground'}`}
            >
              Grid
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${viewMode === 'table' ? 'bg-background shadow-md text-foreground scale-105' : 'text-muted-foreground hover:text-foreground'}`}
            >
              Table
            </button>
          </div>
        </div>
      </div>

      {/* Grid View */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((evt) => (
            <div
              key={evt.id}
              className="group rounded-3xl border border-border/80 bg-card p-6 shadow-sm hover:shadow-2xl hover:border-accent/40 hover:-translate-y-2 transition-all duration-300 ease-out flex flex-col justify-between relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-28 h-28 bg-accent/5 rounded-bl-full pointer-events-none group-hover:scale-125 transition-transform duration-500" />

              {/* Category & Status Badge */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 shadow-xs">
                  {evt.category}
                </span>

                {evt.status === 'Live Now' && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded-full bg-emerald-500/10 text-emerald-600 border border-emerald-500/30 shadow-xs">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Live Now
                  </span>
                )}
                {evt.status === 'Upcoming' && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded-full bg-blue-500/10 text-blue-600 border border-blue-500/20 shadow-xs">
                    <Clock className="w-3.5 h-3.5" /> Upcoming
                  </span>
                )}
                {evt.status === 'Completed' && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded-full bg-slate-500/10 text-slate-600 border border-slate-500/20 shadow-xs">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Completed
                  </span>
                )}
              </div>

              {/* Title & Description */}
              <div>
                <h3 className="text-xl font-display font-extrabold text-foreground group-hover:text-accent transition-colors line-clamp-1 mb-2">
                  {evt.title}
                </h3>
                <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed mb-5">
                  {evt.description}
                </p>
              </div>

              {/* Event Meta Details */}
              <div className="space-y-2.5 text-xs text-muted-foreground border-t border-border/50 pt-4 mb-4">
                <div className="flex items-center gap-2">
                  <CalendarDays className="w-3.5 h-3.5 text-primary shrink-0" />
                  <span>{evt.date} • {evt.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
                  <span className="truncate">{evt.location}</span>
                </div>
                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center gap-1.5 text-foreground font-semibold">
                    <Users className="w-3.5 h-3.5 text-accent shrink-0" />
                    <span>{evt.registered} / {evt.capacity} Registered</span>
                  </div>
                  <span className="text-emerald-600 font-extrabold">{evt.revenue}</span>
                </div>
              </div>

              {/* Registration Capacity Progress Bar */}
              <div className="space-y-1.5 mb-5">
                <div className="flex justify-between text-[11px] font-semibold text-muted-foreground">
                  <span>Capacity Filled</span>
                  <span>{Math.round((evt.registered / evt.capacity) * 100)}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2.5 overflow-hidden shadow-inner">
                  <div
                    className={`h-2.5 rounded-full transition-all duration-700 ease-out ${
                      (evt.registered / evt.capacity) >= 0.9
                        ? 'bg-amber-500'
                        : 'bg-gradient-to-r from-primary to-accent'
                    }`}
                    style={{ width: `${(evt.registered / evt.capacity) * 100}%` }}
                  />
                </div>
              </div>

              {/* Card Actions */}
              <div className="flex items-center gap-2.5 pt-2 border-t border-border/50">
                <Button
                  onClick={() => onSelectEventDetail(evt)}
                  variant="outline"
                  className="flex-1 h-10 text-xs rounded-xl gap-1.5"
                >
                  <Eye className="w-3.5 h-3.5" /> Details
                </Button>

                <Button
                  onClick={() => onOpenCheckInDesk(evt.id)}
                  variant="default"
                  className="flex-1 h-10 text-xs rounded-xl gap-1.5"
                >
                  <QrCode className="w-3.5 h-3.5" /> QR Desk
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Table View */
        <div className="rounded-3xl border border-border/80 bg-card overflow-hidden shadow-md">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-muted/70 text-xs uppercase font-bold tracking-wider text-muted-foreground border-b border-border/80">
                <tr>
                  <th className="px-6 py-4">Event Title</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Date & Time</th>
                  <th className="px-6 py-4">Registered</th>
                  <th className="px-6 py-4">Checked-In</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {filteredEvents.map((evt) => (
                  <tr key={evt.id} className="hover:bg-muted/40 transition-colors">
                    <td className="px-6 py-4 font-bold text-foreground">
                      <div>{evt.title}</div>
                      <div className="text-xs text-muted-foreground font-normal">{evt.location}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs font-semibold px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                        {evt.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {evt.status === 'Live Now' && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded-full bg-emerald-500/10 text-emerald-600 border border-emerald-500/30">
                          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Live Now
                        </span>
                      )}
                      {evt.status === 'Upcoming' && (
                        <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded-full bg-blue-500/10 text-blue-600 border border-blue-500/20">
                          Upcoming
                        </span>
                      )}
                      {evt.status === 'Completed' && (
                        <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded-full bg-slate-500/10 text-slate-600 border border-slate-500/20">
                          Completed
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-xs text-muted-foreground">
                      {evt.date} <br /> {evt.time}
                    </td>
                    <td className="px-6 py-4 font-semibold text-foreground">
                      {evt.registered} / {evt.capacity}
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-bold text-accent-foreground">{evt.checkedIn}</span>
                      <span className="text-xs text-muted-foreground ml-1 font-medium">
                        ({evt.registered > 0 ? Math.round((evt.checkedIn / evt.registered) * 100) : 0}%)
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          onClick={() => onSelectEventDetail(evt)}
                          variant="outline"
                          className="h-9 px-3 text-xs rounded-xl"
                        >
                          View
                        </Button>
                        <Button
                          onClick={() => onOpenCheckInDesk(evt.id)}
                          variant="default"
                          className="h-9 px-3 text-xs rounded-xl"
                        >
                          Check-in
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
