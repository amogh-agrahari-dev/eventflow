import React from 'react';
import Head from 'next/head';
import SettingsDashboard from '@/components/dashboard/SettingsDashboard';

export default function SettingsPage() {
  return (
    <div className="h-screen bg-[#161B23] text-white font-sans overflow-hidden">
      <Head>
        <title>Settings | EventFlow</title>
        <meta name="description" content="Manage your EventFlow preferences." />
      </Head>

      <SettingsDashboard />
    </div>
  );
}
