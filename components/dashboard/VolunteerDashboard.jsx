import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { QrCode, ListTodo, Calendar, Megaphone } from 'lucide-react';
import {
  VolunteerHeader,
  VolunteerMetrics,
  QRCheckInDesk,
  VolunteerTaskList,
  ShiftScheduleRoster,
  VolunteerAnnouncements,
} from '@/components/volunteer';

export default function VolunteerDashboard({
  volunteerProfile = null,
  assignedEvent = null,
  shiftDetails = null,
  assignedTasks = [],
  recentScans = [],
  announcements = [],
}) {
  // Navigation & Interactive State
  const [activeTab, setActiveTab] = useState('scanner'); // 'scanner' | 'tasks' | 'schedule' | 'announcements'
  const [manualTicket, setManualTicket] = useState('');
  const [tasksList, setTasksList] = useState(assignedTasks);
  const [scanHistory, setScanHistory] = useState(recentScans);
  const [isScanning, setIsScanning] = useState(false);
  const [dutyStatus, setDutyStatus] = useState(shiftDetails?.status || 'On Duty');

  // Manual Check-in Handler
  const handleManualCheckIn = (e) => {
    e.preventDefault();
    if (!manualTicket.trim()) {
      toast.error('Please enter a ticket ID');
      return;
    }
    const newScan = {
      id: `scan-${Date.now()}`,
      ticketId: manualTicket.trim().toUpperCase(),
      name: 'Checked Attendee',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      status: 'Valid Pass'
    };
    setScanHistory([newScan, ...scanHistory]);
    toast.success(`Ticket ${newScan.ticketId} successfully checked in!`);
    setManualTicket('');
  };

  // Task Toggle Handler
  const handleToggleTask = (taskId) => {
    setTasksList(prev => prev.map(t => {
      if (t.id === taskId) {
        const updated = !t.completed;
        toast.success(updated ? 'Task marked as completed!' : 'Task status updated');
        return { ...t, completed: updated };
      }
      return t;
    }));
  };

  // Duty Status Toggle Handler
  const handleToggleDutyStatus = () => {
    const nextStatus = dutyStatus === 'On Duty' ? 'On Break' : 'On Duty';
    setDutyStatus(nextStatus);
    toast(`Status changed to ${nextStatus}`, { icon: nextStatus === 'On Duty' ? '🟢' : '🟡' });
  };

  const completedTasksCount = tasksList.filter(t => t.completed).length;

  return (
    <div className="min-h-screen bg-background text-foreground font-sans pb-16">
      {/* 1. Volunteer Header Banner */}
      <VolunteerHeader
        volunteerProfile={volunteerProfile}
        assignedEvent={assignedEvent}
        dutyStatus={dutyStatus}
        onToggleDutyStatus={handleToggleDutyStatus}
        onOpenScanner={() => setActiveTab('scanner')}
      />

      {/* Main Content Container */}
      <main className="container mx-auto px-4 md:px-6 -mt-6">

        {/* 2. Key Metrics Grid */}
        <VolunteerMetrics
          shiftDetails={shiftDetails}
          scanCount={scanHistory.length}
          completedTasksCount={completedTasksCount}
          totalTasksCount={tasksList.length}
        />

        {/* 3. Navigation Tabs */}
        <div className="flex items-center justify-between border-b border-border/70 mb-6 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-2 pb-px">
            <button
              onClick={() => setActiveTab('scanner')}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-semibold border-b-2 transition-all whitespace-nowrap ${
                activeTab === 'scanner'
                  ? 'border-accent text-accent-foreground bg-accent/5 rounded-t-xl'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              <QrCode className="w-4 h-4" /> QR Check-in Desk
            </button>

            <button
              onClick={() => setActiveTab('tasks')}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-semibold border-b-2 transition-all whitespace-nowrap ${
                activeTab === 'tasks'
                  ? 'border-accent text-accent-foreground bg-accent/5 rounded-t-xl'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              <ListTodo className="w-4 h-4" /> Task Checklist ({tasksList.length})
            </button>

            <button
              onClick={() => setActiveTab('schedule')}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-semibold border-b-2 transition-all whitespace-nowrap ${
                activeTab === 'schedule'
                  ? 'border-accent text-accent-foreground bg-accent/5 rounded-t-xl'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              <Calendar className="w-4 h-4" /> Shift Roster & Contact
            </button>

            <button
              onClick={() => setActiveTab('announcements')}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-semibold border-b-2 transition-all whitespace-nowrap ${
                activeTab === 'announcements'
                  ? 'border-accent text-accent-foreground bg-accent/5 rounded-t-xl'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              <Megaphone className="w-4 h-4" /> Organizer Broadcasts ({announcements.length})
            </button>
          </div>
        </div>

        {/* 4. Tab Views */}
        {activeTab === 'scanner' && (
          <QRCheckInDesk
            isScanning={isScanning}
            onToggleScanning={() => setIsScanning(!isScanning)}
            manualTicket={manualTicket}
            onManualTicketChange={setManualTicket}
            onManualCheckIn={handleManualCheckIn}
            scanHistory={scanHistory}
          />
        )}

        {activeTab === 'tasks' && (
          <VolunteerTaskList
            tasks={tasksList}
            onToggleTask={handleToggleTask}
          />
        )}

        {activeTab === 'schedule' && (
          <ShiftScheduleRoster
            assignedEvent={assignedEvent}
            shiftDetails={shiftDetails}
          />
        )}

        {activeTab === 'announcements' && (
          <VolunteerAnnouncements
            announcements={announcements}
          />
        )}
      </main>
    </div>
  );
}
