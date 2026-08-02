import React from 'react';
import { BarChart3, Users } from 'lucide-react';

export default function OrganizerAnalytics() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="p-6 rounded-2xl border border-border/80 bg-card shadow-sm">
        <h3 className="text-xl font-display font-bold mb-1">Live Event & Registration Analytics</h3>
        <p className="text-xs text-muted-foreground mb-6">Real-time demographic breakdowns and venue check-in velocity graphs.</p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Graph 1: Check-in Hourly Peak Breakdown */}
          <div className="p-5 rounded-2xl bg-muted/30 border border-border/60">
            <h4 className="text-sm font-display font-bold mb-1 flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-accent" /> Hourly Check-in Velocity (Peak Times)
            </h4>
            <p className="text-xs text-muted-foreground mb-4">Live scans per hour across all active venue gates.</p>

            <div className="space-y-3 pt-2">
              {[
                { time: '08:00 AM - 09:00 AM', count: 85, pct: 35 },
                { time: '09:00 AM - 10:00 AM', count: 240, pct: 90 },
                { time: '10:00 AM - 11:00 AM', count: 180, pct: 70 },
                { time: '11:00 AM - 12:00 PM', count: 95, pct: 40 },
                { time: '12:00 PM - 01:00 PM', count: 130, pct: 55 },
                { time: '01:00 PM - 02:00 PM', count: 65, pct: 25 },
              ].map((item) => (
                <div key={item.time} className="space-y-1">
                  <div className="flex justify-between text-xs font-medium">
                    <span>{item.time}</span>
                    <span className="font-bold text-foreground">{item.count} scans</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2.5 overflow-hidden">
                    <div
                      className="bg-accent h-2.5 rounded-full transition-all duration-500"
                      style={{ width: `${item.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Graph 2: Department / Major Breakdown */}
          <div className="p-5 rounded-2xl bg-muted/30 border border-border/60">
            <h4 className="text-sm font-display font-bold mb-1 flex items-center gap-2">
              <Users className="w-4 h-4 text-primary" /> Attendee Department Breakdown
            </h4>
            <p className="text-xs text-muted-foreground mb-4">Distribution of registered students by academic faculty.</p>

            <div className="space-y-4 pt-2">
              {[
                { dept: 'Computer Science & AI', count: 1420, pct: 42, color: 'bg-primary' },
                { dept: 'Electrical & Electronics', count: 740, pct: 22, color: 'bg-accent' },
                { dept: 'Mechanical & Robotics', count: 610, pct: 18, color: 'bg-emerald-500' },
                { dept: 'Design & Media Arts', count: 380, pct: 11, color: 'bg-amber-500' },
                { dept: 'Business & Management', count: 270, pct: 7, color: 'bg-purple-500' },
              ].map((item) => (
                <div key={item.dept} className="space-y-1">
                  <div className="flex justify-between text-xs font-medium">
                    <span className="flex items-center gap-2">
                      <span className={`w-2.5 h-2.5 rounded-full ${item.color}`} />
                      {item.dept}
                    </span>
                    <span className="font-bold text-foreground">{item.count} ({item.pct}%)</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2.5 overflow-hidden">
                    <div
                      className={`${item.color} h-2.5 rounded-full transition-all duration-500`}
                      style={{ width: `${item.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
