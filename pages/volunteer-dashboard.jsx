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
import { VolunteerTaskList } from '@/components/volunteer';
import { useTaskStore } from '@/store/taskStore';

export default function VolunteerDashboard() {
  const { tasks, toggleTaskCompletion } = useTaskStore();
  // Filter tasks for this volunteer (for demo purposes we'll use V002 or show all if none, let's just show all)
  const myTasks = tasks;

  return (
    <>
      <Head>
        <title>Volunteer Dashboard | EventFlow</title>
      </Head>
      <VolunteerLayout>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <UpcomingShifts />
            
            <div className="mb-6">
              <VolunteerTaskList tasks={myTasks} onToggleTask={toggleTaskCompletion} />
            </div>

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
