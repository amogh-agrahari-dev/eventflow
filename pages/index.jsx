import React, { useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import {
  CalendarDays,
  UserCheck,
  QrCode,
  Scan,
  Users,
  LayoutDashboard,
  LineChart,
  ShieldCheck,
} from 'lucide-react';
import Navbar from 'components/general/Navbar';
import Hero from 'components/general/Hero';
import Roles from 'components/general/Roles';
import Footer from 'components/general/Footer';
import CTA from 'components/general/CTA';

const features = [
  {
    title: 'Event Creation & Management',
    description: 'Easily plan, schedule, and manage all your college events from a single centralized dashboard.',
    icon: CalendarDays,
    color: 'text-indigo-500',
    bg: 'bg-indigo-500/10',
    hover: 'group-hover:bg-indigo-500 group-hover:text-white',
  },
  {
    title: 'Online Attendee Registration',
    description: 'Streamline sign-ups with customizable registration forms and automated confirmation.',
    icon: UserCheck,
    color: 'text-cyan-500',
    bg: 'bg-cyan-500/10',
    hover: 'group-hover:bg-cyan-500 group-hover:text-white',
  },
  {
    title: 'QR Code Generation',
    description: 'Automatically generate and issue unique QR codes for every successful registration.',
    icon: QrCode,
    color: 'text-emerald-500',
    bg: 'bg-emerald-500/10',
    hover: 'group-hover:bg-emerald-500 group-hover:text-white',
  },
  {
    title: 'QR-Based Check-in',
    description: 'Lightning-fast on-site check-ins using our built-in QR scanning system.',
    icon: Scan,
    color: 'text-violet-500',
    bg: 'bg-violet-500/10',
    hover: 'group-hover:bg-violet-500 group-hover:text-white',
  },
  {
    title: 'Volunteer Onboarding',
    description: 'Assign tasks, track volunteer hours, and seamlessly coordinate your entire team.',
    icon: Users,
    color: 'text-amber-500',
    bg: 'bg-amber-500/10',
    hover: 'group-hover:bg-amber-500 group-hover:text-white',
  },
  {
    title: 'Real-time Dashboard',
    description: 'Monitor live attendance numbers and track check-ins as they happen at the venue.',
    icon: LayoutDashboard,
    color: 'text-rose-500',
    bg: 'bg-rose-500/10',
    hover: 'group-hover:bg-rose-500 group-hover:text-white',
  },
  {
    title: 'Live Event Analytics',
    description: 'Gain actionable insights with rich data visualizations of event engagement and demographics.',
    icon: LineChart,
    color: 'text-teal-500',
    bg: 'bg-teal-500/10',
    hover: 'group-hover:bg-teal-500 group-hover:text-white',
  },
  {
    title: 'Role-based Access',
    description: 'Secure, tailored access levels for Organizers, Volunteers, and general Attendees.',
    icon: ShieldCheck,
    color: 'text-pink-500',
    bg: 'bg-pink-500/10',
    hover: 'group-hover:bg-pink-500 group-hover:text-white',
  },
];

export default function LandingPage() {
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhbW9naEBleGFtcGxlLmNvbSIsImV4cCI6MTc4NTYwMjgyOH0.IZLs92iQcWTrOK8fInLL6TU8otwomlBJ8VCMhbvGnRQ";
  function protected1() {
    fetch('http://localhost:8000/users/me', {
      headers: {
        'Authorization': `bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error('Error:', error));
  }
  useEffect(() => {
    protected1();
  }, []);

  return (
    <div className="dark min-h-screen bg-background text-foreground selection:bg-primary/30 font-sans">
      <Head>
        <title>EventFlow | Campus Event Management Portal</title>
        <meta name="description" content="Centralized event and volunteer management portal for colleges." />
      </Head>

      <Navbar />
      <Hero />
      <Roles />

      {/* ── Features Section ── */}
      <section id="features" className="py-28 relative overflow-hidden">
        {/* Alternating soft background */}
        <div className="absolute inset-0 section-alt -z-10" />
        <div className="absolute inset-0 bg-grid-light opacity-50 -z-10" />

        {/* Decorative blobs */}
        <div className="absolute top-1/4 right-0 w-80 h-80 bg-violet-500/8 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute bottom-1/4 left-0 w-72 h-72 bg-cyan-500/8 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="container mx-auto px-6">
          {/* Section header */}
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-2xl">
              <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-wide bg-primary/10 text-primary border border-primary/15 mb-4">
                Platform Features
              </span>
              <h2 className="text-4xl md:text-5xl font-display font-extrabold mb-4 tracking-tight">
                Everything you need to run{' '}
                <span className="text-gradient-brand">flawless events</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We've thought of every detail so you can focus on creating memorable experiences.
              </p>
            </div>
            <Link
              href="/auth/register"
              className="shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-2xl border border-border/80 bg-card/80 text-sm font-bold text-foreground hover:border-accent/40 hover:bg-accent/5 hover:text-accent transition-all duration-200 shadow-sm"
            >
              Explore Dashboard
            </Link>
          </div>

          {/* Feature grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <div
                  key={i}
                  className="group p-6 rounded-2xl border border-border/60 bg-card/70 hover:bg-card hover:border-transparent hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 relative overflow-hidden"
                >
                  {/* Subtle top color line */}
                  <div className={`absolute top-0 left-0 right-0 h-0.5 ${feature.bg.replace('/10', '')} opacity-0 group-hover:opacity-100 transition-opacity`} />

                  <div className={`mb-4 w-11 h-11 ${feature.bg} ${feature.hover} rounded-2xl flex items-center justify-center transition-all duration-300`}>
                    <Icon className={`h-5 w-5 ${feature.color} group-hover:text-white transition-colors duration-300`} />
                  </div>
                  <h3 className="text-base font-display font-bold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <CTA />
      <Footer />
    </div>
  );
}
