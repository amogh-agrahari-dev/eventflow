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
import { Button } from 'components/ui';
import Hero from 'components/general/Hero';
import Roles from 'components/general/Roles';
import Footer from 'components/general/Footer';
import CTA from 'components/general/CTA';

export default function LandingPage() {
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhbW9naEBleGFtcGxlLmNvbSIsImV4cCI6MTc4NTYwMjgyOH0.IZLs92iQcWTrOK8fInLL6TU8otwomlBJ8VCMhbvGnRQ"
  function protected1() {
    fetch('http://localhost:8000/users/me', {
      headers: {
        'Authorization': `bearer ${token}` // Notice the space after Bearer
      }
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error('Error:', error));
  }
  useEffect(() => {
    protected1()
  }, [])

  const features = [
    {
      title: 'Event Creation & Management',
      description: 'Easily plan, schedule, and manage all your college events from a single centralized dashboard.',
      icon: <CalendarDays className="h-6 w-6 text-primary" />,
    },
    {
      title: 'Online Attendee Registration',
      description: 'Streamline sign-ups with customizable registration forms and automated confirmation emails.',
      icon: <UserCheck className="h-6 w-6 text-primary" />,
    },
    {
      title: 'QR Code Generation',
      description: 'Automatically generate and issue unique QR codes for every successful registration.',
      icon: <QrCode className="h-6 w-6 text-primary" />,
    },
    {
      title: 'QR-Based Check-in',
      description: 'Lightning-fast on-site check-ins and check-outs using our built-in QR scanning system.',
      icon: <Scan className="h-6 w-6 text-primary" />,
    },
    {
      title: 'Volunteer Onboarding',
      description: 'Assign tasks, track volunteer hours, and seamlessly coordinate your entire team.',
      icon: <Users className="h-6 w-6 text-primary" />,
    },
    {
      title: 'Real-time Dashboard',
      description: 'Monitor live attendance numbers and track check-ins as they happen at the venue.',
      icon: <LayoutDashboard className="h-6 w-6 text-primary" />,
    },
    {
      title: 'Live Event Analytics',
      description: 'Gain actionable insights with rich data visualizations of event engagement and demographics.',
      icon: <LineChart className="h-6 w-6 text-primary" />,
    },
    {
      title: 'Role-based Access',
      description: 'Secure, tailored access levels for Organizers, Volunteers, and general Attendees.',
      icon: <ShieldCheck className="h-6 w-6 text-primary" />,
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30 font-sans">
      <Head>
        <title>EventFlow | Campus Event Management Portal</title>
        <meta name="description" content="Centralized event and volunteer management portal for colleges." />
      </Head>

      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <Hero />

      {/* Roles Section */}
      <Roles />

      {/* Features Grid Section */}
      <section id="features" className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-5xl font-display font-bold mb-4 tracking-tight">Everything you need to run flawless events</h2>
              <p className="text-lg text-muted-foreground">
                We've thought of every detail so you can focus on creating memorable experiences for your attendees.
              </p>
            </div>
            <Link href="/auth/register">
              <Button variant="outline" className="rounded-full shadow-sm hover:bg-secondary/80">
                Explore Dashboard
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <div key={i} className="group p-6 rounded-2xl border border-border/60 bg-card/40 hover:bg-card hover:border-primary/20 transition-all hover:shadow-lg hover:-translate-y-1">
                <div className="mb-4 p-3 bg-primary/10 rounded-xl inline-block group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                  {React.cloneElement(feature.icon, { className: "h-6 w-6 transition-colors duration-300" })}
                </div>
                <h3 className="text-lg font-bold mb-2 font-display">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTA />

      {/* Footer */}
      <Footer />
    </div>
  );
}
