import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import OrganizerLayout from '@/components/dashboard/organizer/OrganizerLayout';
import { MOCK_EVENTS } from '@/lib/mockEvents';
import { Calendar, Users, MapPin, ChevronRight, Search } from 'lucide-react';

export default function VolunteerDirectoryHub() {
  const router = useRouter();

  const handleEventClick = (eventId) => {
    router.push(`/directory/${eventId}`);
  };

  return (
    <OrganizerLayout>
      <Head>
        <title>Volunteer Directory | EventFlow Campus Management</title>
      </Head>

      <div className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 custom-scrollbar scroll-smooth">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-white tracking-tight">Volunteer Directory</h1>
              <p className="text-sm text-gray-400 mt-1">Select an event to view and manage its assigned volunteers.</p>
            </div>
            
            <div className="relative w-full md:w-64">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search events..."
                className="w-full bg-vol-card border border-vol-border rounded-full py-2 pl-9 pr-4 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-vol-accent2/50 transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {MOCK_EVENTS.map((event) => (
              <div 
                key={event.id}
                onClick={() => handleEventClick(event.id)}
                className="bg-vol-card rounded-2xl border border-vol-border overflow-hidden flex flex-col transition-all duration-300 hover:border-vol-accent2/50 hover:shadow-[0_8px_30px_-4px_rgba(0,229,255,0.1)] cursor-pointer group"
              >
                {/* Event Image */}
                <div className="relative h-40 w-full overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-vol-card via-transparent to-transparent z-10" />
                  <img
                    src={event.image_url || "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=60"}
                    alt={event.title}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 z-20">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-vol-bg/80 text-white backdrop-blur-sm border border-vol-border/50 uppercase tracking-wider">
                      {event.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-vol-accent2 transition-colors">
                    {event.title}
                  </h3>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-300">
                      <Calendar className="w-4 h-4 mr-2 text-vol-accent" />
                      <span>
                        {new Date(event.startDate).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </span>
                    </div>
                    <div className="flex items-center text-sm text-gray-300">
                      <MapPin className="w-4 h-4 mr-2 text-vol-accent" />
                      <span className="truncate">{event.location}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-300">
                      <Users className="w-4 h-4 mr-2 text-vol-accent" />
                      <span>{event.volunteersRequired} Volunteers Required</span>
                    </div>
                  </div>

                  <div className="mt-auto pt-4 border-t border-vol-border flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex -space-x-2">
                        {[1, 2, 3].map((i) => (
                          <div key={i} className={`w-6 h-6 rounded-full border-2 border-vol-card flex items-center justify-center text-[8px] font-bold text-white ${
                            i === 1 ? 'bg-indigo-500' : i === 2 ? 'bg-emerald-500' : 'bg-rose-500'
                          }`}>
                            V{i}
                          </div>
                        ))}
                      </div>
                      <span className="text-xs text-gray-400 font-medium">+12 assigned</span>
                    </div>
                    
                    <div className="w-8 h-8 rounded-full bg-vol-accent/10 flex items-center justify-center group-hover:bg-vol-accent2 group-hover:text-vol-bg transition-colors">
                      <ChevronRight className="w-4 h-4 text-vol-accent2 group-hover:text-vol-bg" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </OrganizerLayout>
  );
}
