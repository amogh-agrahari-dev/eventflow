import React from 'react';
import Head from 'next/head';
import AttendeeLayout from '@/components/dashboard/attendee/AttendeeLayout';
import UpcomingEvents from '@/components/dashboard/attendee/widgets/UpcomingEvents';
import MyTickets from '@/components/dashboard/attendee/widgets/MyTickets';
import Announcements from '@/components/dashboard/attendee/widgets/Announcements';
import MyRegistrations from '@/components/dashboard/attendee/widgets/MyRegistrations';

export default function AttendeeDashboard() {
  return (
    <>
      <Head>
        <title>Attendee Dashboard | EventFlow</title>
      </Head>
      <AttendeeLayout>
        {/* Row 1: Three equal-width widgets */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          <UpcomingEvents delay={0} />
          <MyRegistrations delay={0.08} />
          <Announcements delay={0.16} />
        </div>

        {/* Row 2: My Tickets — hero widget, full width */}
        <MyTickets delay={0.24} />
      </AttendeeLayout>
    </>
  );
}
