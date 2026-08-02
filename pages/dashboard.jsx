import React from 'react';
import Head from 'next/head';
import Navbar from '@/components/general/Navbar';
import Footer from '@/components/general/Footer';
import OrganizerDashboard from '@/components/dashboard/OrganizerDashboard';

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans flex flex-col">
      <Head>
        <title>Organizer Dashboard | EventFlow Campus Management</title>
        <meta
          name="description"
          content="Centralized event organizer dashboard for managing college events, real-time QR check-ins, volunteer task assignment, and live attendance analytics."
        />
        <meta property="og:title" content="Organizer Dashboard — EventFlow" />
        <meta
          property="og:description"
          content="Real-time event portal for event organizers, volunteers, and live gate scanning."
        />
      </Head>

      {/* Main Navbar */}
      <Navbar />

      {/* Main Dashboard Content */}
      <div className="flex-1">
        <OrganizerDashboard />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
