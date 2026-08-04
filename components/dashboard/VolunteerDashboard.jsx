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

const TABS = [
  { id: 'scanner',       label: 'QR Check-in Desk',            icon: QrCode    },
  { id: 'tasks',         label: 'Task Checklist',               icon: ListTodo  },
  { id: 'schedule',      label: 'Shift & Contact',              icon: Calendar  },
  { id: 'announcements', label: 'Broadcasts',                   icon: Megaphone },
];

export default function VolunteerDashboard({
  volunteerProfile = null,
  assignedEvent = null,
  shiftDetails = null,
  assignedTasks = [],
  recentScans = [],
  announcements = [],
}) {
  const [activeTab, setActiveTab] = useState('scanner');
  const [manualTicket, setManualTicket] = useState('');
  const [tasksList, setTasksList] = useState(assignedTasks);
  const [scanHistory, setScanHistory] = useState(recentScans);
  const [isScanning, setIsScanning] = useState(false);
  const [dutyStatus, setDutyStatus] = useState(shiftDetails?.status || 'On Duty');

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
      status: 'Valid Pass',
    };
    setScanHistory([newScan, ...scanHistory]);
    toast.success(`Ticket ${newScan.ticketId} successfully checked in!`);
    setManualTicket('');
  };

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

  const handleToggleDutyStatus = () => {
    const nextStatus = dutyStatus === 'On Duty' ? 'On Break' : 'On Duty';
    setDutyStatus(nextStatus);
    toast(nextStatus === 'On Duty' ? '🟢 Resumed duty' : '🟡 On break', { duration: 2500 });
  };

  const completedTasksCount = tasksList.filter(t => t.completed).length;

  return (
    <div className="min-h-screen text-white font-sans pb-16" style={{ background: 'linear-gradient(170deg, hsl(222 47% 11%) 0%, hsl(230 45% 9%) 60%, hsl(225 50% 8%) 100%)' }}>
      {/* 1. Hero Header */}
      <VolunteerHeader
        volunteerProfile={volunteerProfile}
        assignedEvent={assignedEvent}
        dutyStatus={dutyStatus}
        onToggleDutyStatus={handleToggleDutyStatus}
        onOpenScanner={() => setActiveTab('scanner')}
      />

      <main className="container mx-auto px-4 md:px-6 -mt-6 relative z-10">
        {/* 2. Metrics */}
        <VolunteerMetrics
          shiftDetails={shiftDetails}
          scanCount={scanHistory.length}
          completedTasksCount={completedTasksCount}
          totalTasksCount={tasksList.length}
        />

        {/* 3. Premium Pill Tab Bar — dark theme */}
        <div className="mb-6 flex items-center gap-1 p-1.5 rounded-2xl border border-white/10 overflow-x-auto no-scrollbar w-fit max-w-full" style={{ background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(12px)' }}>
          {TABS.map(({ id, label, icon: Icon }) => {
            const isActive = activeTab === id;
            const badge = id === 'tasks' ? tasksList.length
              : id === 'announcements' ? announcements.length
              : id === 'scanner' ? scanHistory.length
              : null;
            return (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-xl whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-white/15 text-white shadow-sm border border-white/20'
                    : 'text-white/50 hover:text-white/80'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-cyan-400' : ''}`} />
                {label}
                {badge != null && badge > 0 && (
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                    isActive ? 'bg-cyan-400/25 text-cyan-300' : 'bg-white/10 text-white/40'
                  }`}>
                    {badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* 4. Tab Panels */}
        <div className="animate-fade-in">
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
            <VolunteerTaskList tasks={tasksList} onToggleTask={handleToggleTask} />
          )}
          {activeTab === 'schedule' && (
            <ShiftScheduleRoster assignedEvent={assignedEvent} shiftDetails={shiftDetails} />
          )}
          {activeTab === 'announcements' && (
            <VolunteerAnnouncements announcements={announcements} />
          )}
        </div>
      </main>
    </div>
  );
}
