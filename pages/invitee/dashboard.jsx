import React from 'react';
import Head from 'next/head';
import Navbar from '@/components/general/Navbar';
import Footer from '@/components/general/Footer';
import InviteeDashboard from '@/components/dashboard/InviteeDashboard';

export default function InviteeDashboardPage() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans flex flex-col">
      <Head>
        <title>Invitee Dashboard | EventFlow</title>
        <meta
          name="description"
          content="Campus event invitee dashboard for digital QR passes, event RSVPs, schedules, and notifications."
        />
        <meta property="og:title" content="Invitee Dashboard — EventFlow" />
      </Head>

      {/* Main Navbar */}
      <Navbar />

      {/* Invitee Dashboard Template */}
      <div className="flex-1">
        <InviteeDashboard />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
