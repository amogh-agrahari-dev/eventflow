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
      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 rounded-2xl border border-border/80 bg-card/60 backdrop-blur-sm">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search events by title, category or venue..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-10 rounded-xl bg-background border-border/80 focus:border-accent"
          />
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-muted-foreground hidden sm:block" />
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="h-10 rounded-xl border border-input bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="All">All Categories</option>
              <option value="Hackathon">Hackathon</option>
              <option value="Cultural">Cultural</option>
              <option value="Tech & Science">Tech & Science</option>
              <option value="Workshop">Workshop</option>
              <option value="Gaming">Gaming</option>
            </select>
          </div>

          <div className="border-l border-border pl-3 flex items-center gap-1 bg-muted/50 p-1 rounded-xl">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg text-xs font-medium transition-all ${viewMode === 'grid' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
              title="Grid View"
            >
              Grid
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-lg text-xs font-medium transition-all ${viewMode === 'table' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
              title="Table View"
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
              className="group rounded-2xl border border-border/80 bg-card p-6 shadow-sm hover:shadow-xl hover:border-primary/30 transition-all duration-300 flex flex-col justify-between relative overflow-hidden"
            >
              {/* Top status tag */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                  {evt.category}
                </span>

                {evt.status === 'Live Now' && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded-full bg-emerald-500/10 text-emerald-600 border border-emerald-500/30">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Live Now
                  </span>
                )}
                {evt.status === 'Upcoming' && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-full bg-blue-500/10 text-blue-600 border border-blue-500/20">
                    <Clock className="w-3 h-3" /> Upcoming
                  </span>
                )}
                {evt.status === 'Completed' && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-full bg-slate-500/10 text-slate-600 border border-slate-500/20">
                    <CheckCircle2 className="w-3 h-3" /> Completed
                  </span>
                )}
              </div>

              {/* Title & Description */}
              <div>
                <h3 className="text-xl font-display font-bold text-foreground group-hover:text-accent transition-colors line-clamp-1 mb-2">
                  {evt.title}
                </h3>
                <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed mb-4">
                  {evt.description}
                </p>
              </div>

              {/* Event Meta Details */}
              <div className="space-y-2 text-xs text-muted-foreground border-t border-border/50 pt-4 mb-4">
                <div className="flex items-center gap-2">
                  <CalendarDays className="w-3.5 h-3.5 text-primary shrink-0" />
                  <span>{evt.date} • {evt.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
                  <span className="truncate">{evt.location}</span>
                </div>
                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center gap-1.5 text-foreground font-medium">
                    <Users className="w-3.5 h-3.5 text-accent shrink-0" />
                    <span>{evt.registered} / {evt.capacity} Registered</span>
                  </div>
                  <span className="text-emerald-600 font-semibold">{evt.revenue}</span>
                </div>
              </div>

              {/* Registration Capacity Progress Bar */}
              <div className="space-y-1 mb-5">
                <div className="flex justify-between text-[11px] font-medium text-muted-foreground">
                  <span>Registration Capacity</span>
                  <span>{Math.round((evt.registered / evt.capacity) * 100)}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-2 rounded-full transition-all duration-500 ${
                      (evt.registered / evt.capacity) >= 0.9 ? 'bg-amber-500' : 'bg-primary'
                    }`}
                    style={{ width: `${(evt.registered / evt.capacity) * 100}%` }}
                  />
                </div>
              </div>

              {/* Card Actions */}
              <div className="flex items-center gap-2 pt-2 border-t border-border/50">
                <Button
                  onClick={() => onSelectEventDetail(evt)}
                  variant="outline"
                  className="flex-1 h-9 text-xs rounded-xl gap-1.5"
                >
                  <Eye className="w-3.5 h-3.5" /> Details
                </Button>

                <Button
                  onClick={() => onOpenCheckInDesk(evt.id)}
                  variant="default"
                  className="flex-1 h-9 text-xs rounded-xl gap-1.5"
                >
                  <QrCode className="w-3.5 h-3.5" /> QR Desk
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Table View */
        <div className="rounded-2xl border border-border/80 bg-card overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-muted/60 text-xs uppercase font-semibold text-muted-foreground border-b border-border/80">
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
                  <tr key={evt.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-4 font-semibold text-foreground">
                      <div>{evt.title}</div>
                      <div className="text-xs text-muted-foreground font-normal">{evt.location}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs px-2.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                        {evt.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {evt.status === 'Live Now' && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 text-xs font-bold rounded-full bg-emerald-500/10 text-emerald-600 border border-emerald-500/30">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Live Now
                        </span>
                      )}
                      {evt.status === 'Upcoming' && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 text-xs font-medium rounded-full bg-blue-500/10 text-blue-600 border border-blue-500/20">
                          Upcoming
                        </span>
                      )}
                      {evt.status === 'Completed' && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 text-xs font-medium rounded-full bg-slate-500/10 text-slate-600 border border-slate-500/20">
                          Completed
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-xs text-muted-foreground">
                      {evt.date} <br /> {evt.time}
                    </td>
                    <td className="px-6 py-4 font-medium text-foreground">
                      {evt.registered} / {evt.capacity}
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-semibold text-accent-foreground">{evt.checkedIn}</span>
                      <span className="text-xs text-muted-foreground ml-1">
                        ({evt.registered > 0 ? Math.round((evt.checkedIn / evt.registered) * 100) : 0}%)
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          onClick={() => onSelectEventDetail(evt)}
                          variant="outline"
                          className="h-8 px-3 text-xs rounded-lg"
                        >
                          View
                        </Button>
                        <Button
                          onClick={() => onOpenCheckInDesk(evt.id)}
                          variant="default"
                          className="h-8 px-3 text-xs rounded-lg"
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
