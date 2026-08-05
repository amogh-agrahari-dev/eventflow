import React, { useState } from 'react';
import { Button, Input } from '@/components/ui';
import { Search, Filter, CalendarDays, MapPin, Users, Ticket, Eye, CheckCircle2, Clock } from 'lucide-react';

export default function InviteeEventsGrid({
  events = [],
  onSelectEventDetail,
  onRsvpEvent,
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

  const filteredEvents = events.filter(evt => {
    const matchesSearch = (evt.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (evt.category || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (evt.location || '').toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || evt.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 rounded-2xl border border-border/80 bg-card/60 backdrop-blur-sm">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search events by title, topic, or venue..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-10 rounded-xl bg-background border-border/80 focus:border-accent"
          />
        </div>

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
      </div>

      {/* Events Cards Grid */}
      {filteredEvents.length === 0 ? (
        <div className="text-center py-16 p-6 rounded-3xl border border-dashed border-border/80 bg-card/60">
          <CalendarDays className="w-10 h-10 mx-auto mb-3 text-muted-foreground/60" />
          <h4 className="text-base font-display font-semibold text-foreground">No Events Match Your Search</h4>
          <p className="text-xs text-muted-foreground mt-1 max-w-sm mx-auto">
            Try adjusting your search query or category filter to discover campus events.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((evt) => (
            <div
              key={evt.id}
              className="group rounded-2xl border border-border/80 bg-card p-6 shadow-sm hover:shadow-xl hover:border-primary/30 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                    {evt.category || 'Event'}
                  </span>

                  {evt.isRegistered ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 text-xs font-semibold rounded-full bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
                      <CheckCircle2 className="w-3 h-3" /> Registered
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 text-xs font-medium rounded-full bg-blue-500/10 text-blue-600 border border-blue-500/20">
                      <Clock className="w-3 h-3" /> Open RSVP
                    </span>
                  )}
                </div>

                <h3 className="text-xl font-display font-bold text-foreground group-hover:text-accent transition-colors line-clamp-1 mb-2">
                  {evt.title}
                </h3>
                <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed mb-4">
                  {evt.description}
                </p>

                <div className="space-y-2 text-xs text-muted-foreground border-t border-border/50 pt-4 mb-4">
                  <div className="flex items-center gap-2">
                    <CalendarDays className="w-3.5 h-3.5 text-primary shrink-0" />
                    <span>{evt.date} • {evt.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
                    <span className="truncate">{evt.location}</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 pt-2 border-t border-border/50">
                <Button
                  onClick={() => onSelectEventDetail(evt)}
                  variant="outline"
                  className="flex-1 h-9 text-xs rounded-xl gap-1.5"
                >
                  <Eye className="w-3.5 h-3.5" /> Event Info
                </Button>

                <Button
                  onClick={() => onRsvpEvent(evt)}
                  variant={evt.isRegistered ? "outline" : "hero"}
                  className="flex-1 h-9 text-xs rounded-xl gap-1.5"
                >
                  <Ticket className="w-3.5 h-3.5" /> {evt.isRegistered ? "View Pass" : "RSVP Now"}
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
