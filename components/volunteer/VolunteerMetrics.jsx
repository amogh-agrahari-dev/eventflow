import React from 'react';
import { MapPin, Clock, QrCode, ListTodo } from 'lucide-react';

export default function VolunteerMetrics({
  shiftDetails,
  scanCount = 0,
  completedTasksCount = 0,
  totalTasksCount = 0,
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {/* Card 1: Assigned Station */}
      <div className="p-5 rounded-2xl border border-border/80 bg-card/95 backdrop-blur-md shadow-sm hover:shadow-md transition-all">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Assigned Station</span>
          <div className="p-2 rounded-xl bg-primary/10 text-primary">
            <MapPin className="w-4 h-4" />
          </div>
        </div>
        <h3 className="text-lg font-display font-bold text-foreground truncate">
          {shiftDetails?.station || 'Main Gate Check-in'}
        </h3>
        <p className="text-xs text-muted-foreground mt-1">
          Station ID: {shiftDetails?.stationId || 'ST-A1'}
        </p>
      </div>

      {/* Card 2: Shift Hours */}
      <div className="p-5 rounded-2xl border border-border/80 bg-card/95 backdrop-blur-md shadow-sm hover:shadow-md transition-all">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Shift Hours</span>
          <div className="p-2 rounded-xl bg-accent/20 text-accent-foreground">
            <Clock className="w-4 h-4" />
          </div>
        </div>
        <h3 className="text-lg font-display font-bold text-foreground">
          {shiftDetails?.timing || '09:00 AM - 05:00 PM'}
        </h3>
        <p className="text-xs text-muted-foreground mt-1">
          Supervisor: {shiftDetails?.supervisor || 'Organizer Team'}
        </p>
      </div>

      {/* Card 3: Scans Processed */}
      <div className="p-5 rounded-2xl border border-border/80 bg-card/95 backdrop-blur-md shadow-sm hover:shadow-md transition-all">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Scans Processed</span>
          <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600">
            <QrCode className="w-4 h-4" />
          </div>
        </div>
        <h3 className="text-2xl font-display font-bold text-foreground">
          {scanCount}
        </h3>
        <p className="text-xs text-muted-foreground mt-1">
          Checked-in attendees at station
        </p>
      </div>

      {/* Card 4: Task Progress */}
      <div className="p-5 rounded-2xl border border-border/80 bg-card/95 backdrop-blur-md shadow-sm hover:shadow-md transition-all">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Assigned Tasks</span>
          <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-600">
            <ListTodo className="w-4 h-4" />
          </div>
        </div>
        <h3 className="text-2xl font-display font-bold text-foreground">
          {completedTasksCount} / {totalTasksCount}
        </h3>
        <p className="text-xs text-muted-foreground mt-1">
          Tasks completed
        </p>
      </div>
    </div>
  );
}
