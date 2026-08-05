import React from 'react';
import { BarChart3, Users, TrendingUp, Sparkles } from 'lucide-react';

export default function OrganizerAnalytics() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="p-6 sm:p-8 rounded-3xl border border-border/80 bg-card shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="text-2xl font-display font-extrabold tracking-tight">Live Event & Registration Analytics</h3>
            <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">Real-time demographic breakdowns and venue check-in velocity graphs.</p>
          </div>

          <span className="px-3.5 py-1 text-xs font-semibold rounded-full bg-accent/15 text-accent-foreground border border-accent/30 self-start sm:self-auto inline-flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" /> Updated Real-time
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Graph 1: Check-in Hourly Peak Breakdown */}
          <div className="p-6 rounded-2xl bg-muted/40 border border-border/60 shadow-xs hover:shadow-md transition-shadow">
            <h4 className="text-base font-display font-bold mb-1 flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-accent" /> Hourly Check-in Velocity (Peak Times)
            </h4>
            <p className="text-xs text-muted-foreground mb-5">Live scans per hour across all active venue gates.</p>

            <div className="space-y-4">
              {[
                { time: '08:00 AM - 09:00 AM', count: 85, pct: 35, gradient: 'from-blue-500 to-cyan-400' },
                { time: '09:00 AM - 10:00 AM', count: 240, pct: 90, gradient: 'from-accent to-emerald-400' },
                { time: '10:00 AM - 11:00 AM', count: 180, pct: 70, gradient: 'from-indigo-500 to-accent' },
                { time: '11:00 AM - 12:00 PM', count: 95, pct: 40, gradient: 'from-purple-500 to-indigo-400' },
                { time: '12:00 PM - 01:00 PM', count: 130, pct: 55, gradient: 'from-cyan-500 to-blue-400' },
                { time: '01:00 PM - 02:00 PM', count: 65, pct: 25, gradient: 'from-slate-400 to-slate-600' },
              ].map((item) => (
                <div key={item.time} className="space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-muted-foreground">{item.time}</span>
                    <span className="font-bold text-foreground">{item.count} scans</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-3 overflow-hidden shadow-inner">
                    <div
                      className={`bg-gradient-to-r ${item.gradient} h-3 rounded-full transition-all duration-700 ease-out`}
                      style={{ width: `${item.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Graph 2: Department / Major Breakdown */}
          <div className="p-6 rounded-2xl bg-muted/40 border border-border/60 shadow-xs hover:shadow-md transition-shadow">
            <h4 className="text-base font-display font-bold mb-1 flex items-center gap-2">
              <Users className="w-4 h-4 text-primary" /> Attendee Department Breakdown
            </h4>
            <p className="text-xs text-muted-foreground mb-5">Distribution of registered students by academic faculty.</p>

            <div className="space-y-4">
              {[
                { dept: 'Computer Science & AI', count: 1420, pct: 42, color: 'bg-primary', border: 'border-primary' },
                { dept: 'Electrical & Electronics', count: 740, pct: 22, color: 'bg-accent', border: 'border-accent' },
                { dept: 'Mechanical & Robotics', count: 610, pct: 18, color: 'bg-emerald-500', border: 'border-emerald-500' },
                { dept: 'Design & Media Arts', count: 380, pct: 11, color: 'bg-amber-500', border: 'border-amber-500' },
                { dept: 'Business & Management', count: 270, pct: 7, color: 'bg-purple-500', border: 'border-purple-500' },
              ].map((item) => (
                <div key={item.dept} className="space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="flex items-center gap-2">
                      <span className={`w-2.5 h-2.5 rounded-full ${item.color}`} />
                      {item.dept}
                    </span>
                    <span className="font-bold text-foreground">{item.count} ({item.pct}%)</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-3 overflow-hidden shadow-inner">
                    <div
                      className={`${item.color} h-3 rounded-full transition-all duration-700 ease-out`}
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
