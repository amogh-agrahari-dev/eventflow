import { CheckCircle2, LayoutDashboard, QrCode, Scan, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const roles = [
  {
    id: 'organizer',
    icon: LayoutDashboard,
    title: 'For Organizers',
    description: 'Complete command center. Create events, monitor registrations, allocate volunteer roles, and view live analytics.',
    features: ['Full event control', 'Live attendance tracking', 'Volunteer management', 'Broadcast announcements'],
    href: '/organiser-dashboard',
    gradient: 'from-indigo-500/20 to-violet-500/10',
    border: 'border-indigo-500/30',
    iconBg: 'bg-indigo-500/15',
    iconColor: 'text-indigo-400',
    accentBar: 'from-indigo-500 to-violet-500',
    checkColor: 'text-indigo-400',
    ctaColor: 'bg-indigo-500/10 text-indigo-600 border-indigo-500/25 hover:bg-indigo-500/20',
    featured: false,
  },
  {
    id: 'volunteer',
    icon: Scan,
    title: 'For Volunteers',
    description: 'Streamlined execution. Scan QR codes at the door, view assigned tasks, and coordinate with your team easily.',
    features: ['Mobile-first QR scanning', 'Clear task visibility', 'Shift schedule', 'Duty status toggle'],
    href: '/volunteer/dashboard',
    gradient: 'from-cyan-500/25 to-accent/10',
    border: 'border-cyan-500/30',
    iconBg: 'bg-cyan-500/15',
    iconColor: 'text-cyan-400',
    accentBar: 'from-accent to-cyan-400',
    checkColor: 'text-cyan-400',
    ctaColor: 'bg-cyan-500/10 text-cyan-700 border-cyan-500/25 hover:bg-cyan-500/20',
    featured: true,
  },
  {
    id: 'attendee',
    icon: QrCode,
    title: 'For Attendees',
    description: 'Frictionless experience. Register online, receive an instant digital QR ticket, and walk right into the venue.',
    features: ['1-click registration', 'Digital QR tickets', 'Event discovery', 'Organizer broadcasts'],
    href: '/invitee/dashboard',
    gradient: 'from-emerald-500/20 to-teal-500/10',
    border: 'border-emerald-500/30',
    iconBg: 'bg-emerald-500/15',
    iconColor: 'text-emerald-400',
    accentBar: 'from-emerald-500 to-teal-400',
    checkColor: 'text-emerald-500',
    ctaColor: 'bg-emerald-500/10 text-emerald-700 border-emerald-500/25 hover:bg-emerald-500/20',
    featured: false,
  },
];

export default function Roles() {
  return (
    <section className="py-28 relative overflow-hidden border-y border-border/50">
      {/* Vivid gradient background */}
      <div className="absolute inset-0 section-vivid -z-10" />
      {/* Subtle dot grid */}
      <div className="absolute inset-0 bg-grid-light opacity-60 -z-10" />

      {/* Decorative blobs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent/8 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-indigo-500/8 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="container mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-wide bg-accent/15 text-accent border border-accent/25 mb-4">
            Role-Based Portals
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-extrabold mb-4 tracking-tight">
            One Portal,{' '}
            <span className="text-gradient-brand">Three Perspectives</span>
          </h2>
          <p className="text-muted-foreground text-base leading-relaxed">
            Our role-based dashboards ensure everyone has exactly the tools they need, without the clutter.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto items-start">
          {roles.map((role) => {
            const Icon = role.icon;
            return (
              <div
                key={role.id}
                className={`group relative bg-card/90 backdrop-blur-md p-8 rounded-3xl border ${role.border} bg-gradient-to-br ${role.gradient} shadow-sm hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 ${role.featured ? 'md:-translate-y-3 ring-1 ring-accent/30' : ''}`}
              >
                {/* Top accent bar */}
                <div className={`absolute top-0 left-6 right-6 h-0.5 rounded-full bg-gradient-to-r ${role.accentBar} opacity-70 group-hover:opacity-100 transition-opacity`} />

                {/* Featured badge */}
                {role.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-[10px] font-extrabold bg-gradient-to-r from-accent to-cyan-400 text-slate-950 shadow-md">
                    MOST USED
                  </div>
                )}

                {/* Icon */}
                <div className={`w-12 h-12 ${role.iconBg} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className={`h-6 w-6 ${role.iconColor}`} />
                </div>

                {/* Title & description */}
                <h3 className="text-xl font-display font-bold mb-3">{role.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">{role.description}</p>

                {/* Feature list */}
                <ul className="space-y-2.5 mb-8">
                  {role.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm font-medium">
                      <CheckCircle2 className={`h-4 w-4 shrink-0 ${role.checkColor}`} />
                      {f}
                    </li>
                  ))}
                </ul>

                {/* CTA link */}
                <Link
                  href={role.href}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold border transition-all duration-200 hover:gap-3 ${role.ctaColor}`}
                >
                  Open {role.title.split(' ')[1]} Dashboard
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
