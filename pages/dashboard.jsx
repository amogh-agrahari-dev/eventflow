import React from 'react';
import Head from 'next/head';
import OrganizerDashboard from '@/components/dashboard/OrganizerDashboard';

export default function DashboardPage() {
  return (
    <div className="h-screen bg-[#13161b] text-white font-sans overflow-hidden">
      <Head>
        <title>Organizer Dashboard | EventFlow Campus Management</title>
        <meta name="description" content="Centralized event organizer dashboard." />
      </Head>

      <OrganizerDashboard />
    </div>
  );
}
