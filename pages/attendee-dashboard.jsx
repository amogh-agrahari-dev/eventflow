import React from 'react';
import Head from 'next/head';
import AttendeeLayout from '@/components/dashboard/attendee/AttendeeLayout';
import UpcomingEvents from '@/components/dashboard/attendee/widgets/UpcomingEvents';
import QuickActions from '@/components/dashboard/attendee/widgets/QuickActions';
import MyTickets from '@/components/dashboard/attendee/widgets/MyTickets';
import Announcements from '@/components/dashboard/attendee/widgets/Announcements';
import MyRegistrations from '@/components/dashboard/attendee/widgets/MyRegistrations';
import CheckInSummary from '@/components/dashboard/attendee/widgets/CheckInSummary';
import MyActivity from '@/components/dashboard/attendee/widgets/MyActivity';
import EventRecommendations from '@/components/dashboard/attendee/widgets/EventRecommendations';

export default function AttendeeDashboard() {
  return (
    <>
      <Head>
        <title>Attendee Dashboard | EventFlow</title>
      </Head>
      <AttendeeLayout>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <UpcomingEvents />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <MyTickets />
              <MyRegistrations />
            </div>
            <EventRecommendations />
          </div>
          <div className="space-y-6">
            <QuickActions />
            <CheckInSummary />
            <Announcements />
            <MyActivity />
          </div>
        </div>
      </AttendeeLayout>
    </>
  );
}
