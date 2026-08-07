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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
          {/* Main 2-Column Section */}
          <div className="lg:col-span-2 space-y-6 min-w-0">
            <UpcomingShifts delay={0.05} />

            <VolunteerTaskList
              tasks={myTasks}
              onToggleTask={toggleTaskCompletion}
              delay={0.1}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
              <Assignments className="h-full" delay={0.15} />
              <MyEvents className="h-full" delay={0.2} />
            </div>

            <ImpactStats delay={0.25} />
          </div>

          {/* Right Sidebar Widgets */}
          <div className="space-y-6 min-w-0">
            <QuickActions delay={0.1} />
            <Availability delay={0.15} />
            <Announcements delay={0.2} />
            <Badges delay={0.25} />
          </div>
        </div>
      </VolunteerLayout>
    </>
  );
}

