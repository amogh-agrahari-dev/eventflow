import React from 'react';
import Head from 'next/head';
import Navbar from '@/components/general/Navbar';
import Footer from '@/components/general/Footer';
import VolunteerDashboard from '@/components/dashboard/VolunteerDashboard';

export default function VolunteerDashboardPage() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans flex flex-col">
      <Head>
        <title>Volunteer Dashboard | EventFlow</title>
        <meta
          name="description"
          content="Campus event volunteer portal for managing attendee QR check-ins, shift duties, station schedules, and organizer notifications."
        />
        <meta property="og:title" content="Volunteer Dashboard — EventFlow" />
      </Head>

      {/* Main Navbar */}
      <Navbar />

      {/* Volunteer Dashboard Template */}
      <div className="flex-1">
        <VolunteerDashboard />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
