import React from 'react';
import Head from 'next/head';
import VolunteerLayout from '@/components/dashboard/volunteer/VolunteerLayout';
import UpcomingShifts from '@/components/dashboard/volunteer/widgets/UpcomingShifts';
import QuickActions from '@/components/dashboard/volunteer/widgets/QuickActions';
import Assignments from '@/components/dashboard/volunteer/widgets/Assignments';
import Announcements from '@/components/dashboard/volunteer/widgets/Announcements';
import MyEvents from '@/components/dashboard/volunteer/widgets/MyEvents';
import ImpactStats from '@/components/dashboard/volunteer/widgets/ImpactStats';
import Badges from '@/components/dashboard/volunteer/widgets/Badges';
import Availability from '@/components/dashboard/volunteer/widgets/Availability';

export default function VolunteerDashboard() {
  return (
    <>
      <Head>
        <title>Volunteer Dashboard | EventFlow</title>
      </Head>
      <VolunteerLayout>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <UpcomingShifts />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Assignments />
              <MyEvents />
            </div>
            <ImpactStats />
          </div>
          <div className="space-y-6">
            <QuickActions />
            <Availability />
            <Announcements />
            <Badges />
          </div>
        </div>
      </VolunteerLayout>
    </>
  );
}
