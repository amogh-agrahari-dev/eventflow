import React from 'react';
import { ArrowUpRight, BarChart3, Calendar, MessageSquare, MapPin, Award, Bell, QrCode, User, Users, CheckCircle, Activity, LayoutDashboard, Settings } from 'lucide-react';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#0B0F19] min-h-screen flex items-center pt-24 pb-16">
      {/* Background Grid & Glowing Orbs */}
      <div className="absolute inset-0 bg-grid-faint opacity-40" aria-hidden="true" />
      <div className="absolute top-[20%] left-[10%] w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" aria-hidden="true" />
      <div className="absolute top-[30%] right-[15%] w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-[10%] right-[25%] w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" aria-hidden="true" />

      {/* Decorative Wavy Lines (SVG approximation of the background wave) */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none opacity-20 pointer-events-none" aria-hidden="true">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-[300px]">
          <path d="M0,0 C200,100 400,-50 600,50 C800,150 1000,0 1200,50 L1200,120 L0,120 Z" fill="none" stroke="currentColor" strokeWidth="1" className="text-blue-500" />
          <path d="M0,20 C250,120 450,-30 650,70 C850,170 1050,20 1200,70 L1200,120 L0,120 Z" fill="none" stroke="currentColor" strokeWidth="1" className="text-purple-500" />
          <path d="M0,40 C300,140 500,-10 700,90 C900,190 1100,40 1200,90 L1200,120 L0,120 Z" fill="none" stroke="currentColor" strokeWidth="1" className="text-indigo-500" />
        </svg>
      </div>

      <div className="container relative z-10 mx-auto px-6 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-8 items-center">

          {/* Left Column: Text Content */}
          <div className="max-w-xl z-20">
            <h1 className="text-5xl sm:text-6xl lg:text-[4.5rem] font-bold leading-[1.1] tracking-tight text-white mb-6">
              Simplify Event <br />
              <span className="inline-block mt-2">& Volunteer</span> <br />
              <span className="inline-block mt-2">Management</span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-300 leading-relaxed mb-10 max-w-lg font-light">
              Manage registrations, volunteers, QR check-ins, schedules, and analytics from one powerful platform built for modern events.
            </p>
            <div className="flex flex-wrap items-center gap-5">
              <Link
                href="/auth/register"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#2563eb] hover:bg-blue-600 text-white font-medium transition-all hover:scale-105 shadow-[0_0_20px_rgba(37,99,235,0.4)]"
              >
                Get Started <ArrowUpRight className="w-5 h-5" />
              </Link>
              <Link
                href="#features"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-slate-600 hover:border-slate-400 text-white font-medium transition-colors hover:bg-white/5"
              >
                Explore Features
              </Link>
            </div>
          </div>

          {/* Right Column: Mock UI Visual */}
          <div className="relative w-full h-[500px] lg:h-[600px] flex items-center justify-center">

            {/* Main Dashboard Window */}
            <div className="absolute w-[110%] max-w-[700px] aspect-[16/10] bg-[#1a1f2e]/95 backdrop-blur-sm rounded-xl border border-slate-700/60 shadow-2xl overflow-hidden flex flex-col transform translate-x-4 lg:translate-x-12 z-10">

              {/* Window header */}
              <div className="h-8 bg-[#141824]/90 border-b border-slate-700/50 flex items-center px-4 gap-2 shrink-0">
                <div className="mx-auto flex items-center gap-2 bg-slate-800/50 px-24 py-1 rounded-md">
                  <div className="w-32 h-2 rounded-full bg-slate-700" />
                </div>
              </div>

              {/* Dashboard Content */}
              <div className="flex flex-1 overflow-hidden">
                {/* Sidebar */}
                <div className="w-[18%] bg-[#141824]/50 border-r border-slate-700/50 p-3 flex flex-col gap-3">
                  <div className="w-full h-6 rounded bg-indigo-500/20 mb-2 flex items-center px-2">
                    <LayoutDashboard className="w-3 h-3 text-indigo-400 mr-2" />
                    <div className="w-12 h-1.5 rounded-full bg-indigo-400/50" />
                  </div>
                  <div className="w-full h-6 rounded flex items-center px-2">
                    <Calendar className="w-3 h-3 text-slate-500 mr-2" />
                    <div className="w-10 h-1.5 rounded-full bg-slate-600" />
                  </div>
                  <div className="w-full h-6 rounded flex items-center px-2">
                    <Users className="w-3 h-3 text-slate-500 mr-2" />
                    <div className="w-14 h-1.5 rounded-full bg-slate-600" />
                  </div>
                  <div className="w-full h-6 rounded flex items-center px-2">
                    <Activity className="w-3 h-3 text-slate-500 mr-2" />
                    <div className="w-12 h-1.5 rounded-full bg-slate-600" />
                  </div>
                  <div className="mt-auto w-full h-6 rounded flex items-center px-2">
                    <Settings className="w-3 h-3 text-slate-500 mr-2" />
                    <div className="w-10 h-1.5 rounded-full bg-slate-600" />
                  </div>
                </div>

                {/* Main Content Area */}
                <div className="flex-1 p-4 grid grid-cols-3 gap-3 overflow-hidden">

                  {/* Col 1 & 2 */}
                  <div className="col-span-2 flex flex-col gap-3">
                    {/* Upcoming Events */}
                    <div className="bg-slate-800/40 rounded-lg border border-slate-700/50 p-3">
                      <div className="flex justify-between items-center mb-3">
                        <div className="w-24 h-2 rounded bg-slate-500" />
                        <div className="w-8 h-2 rounded bg-slate-600" />
                      </div>
                      <div className="space-y-2">
                        {[1, 2, 3].map(i => (
                          <div key={i} className="flex items-center gap-3 bg-slate-900/40 p-2 rounded border border-slate-700/30">
                            <div className="w-8 h-8 rounded bg-gradient-to-br from-indigo-500 to-purple-600" />
                            <div className="flex-1">
                              <div className="w-20 h-2 rounded bg-slate-300 mb-1.5" />
                              <div className="w-12 h-1.5 rounded bg-slate-500" />
                            </div>
                            <div className="flex gap-1">
                              <div className="w-4 h-4 rounded-full bg-indigo-500/20" />
                              <div className="w-4 h-4 rounded-full bg-indigo-500/20" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Event Analytics */}
                    <div className="bg-slate-800/40 rounded-lg border border-slate-700/50 p-3 flex-1 flex flex-col">
                      <div className="flex justify-between items-center mb-3">
                        <div className="w-20 h-2 rounded bg-slate-500" />
                        <div className="w-12 h-2 rounded bg-slate-600" />
                      </div>
                      <div className="flex items-end gap-1 flex-1 pb-1">
                        {[40, 70, 45, 90, 60, 80, 50].map((h, i) => (
                          <div key={i} className="flex-1 bg-gradient-to-t from-blue-600 to-cyan-400 rounded-t-sm" style={{ height: `${h}%` }} />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Col 3 */}
                  <div className="flex flex-col gap-3">
                    {/* Volunteer Assignments */}
                    <div className="bg-slate-800/40 rounded-lg border border-slate-700/50 p-3 flex-1">
                      <div className="w-28 h-2 rounded bg-slate-500 mb-3" />
                      <div className="space-y-2.5">
                        {[1, 2, 3, 4].map(i => (
                          <div key={i} className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-slate-600" />
                            <div className="flex-1">
                              <div className="w-16 h-1.5 rounded bg-slate-300 mb-1" />
                              <div className="w-10 h-1 rounded bg-slate-500" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* QR Code Check-in */}
                    <div className="bg-slate-800/40 rounded-lg border border-slate-700/50 p-3">
                      <div className="w-24 h-2 rounded bg-slate-500 mb-2" />
                      <div className="aspect-square bg-slate-900 rounded border border-slate-700 flex items-center justify-center relative overflow-hidden">
                        <QrCode className="w-10 h-10 text-slate-500" />
                        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-red-500/50 shadow-[0_0_10px_rgba(239,68,68,0.8)] animate-pulse" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Elements */}

            {/* Top Left: QR Ticket */}
            <div className="absolute top-[5%] left-[5%] z-20 bg-[#1e2536]/80 backdrop-blur-xl p-2.5 pr-4 rounded-xl border border-slate-600/50 flex items-center gap-3 shadow-2xl animate-bounce" style={{ animationDuration: '4s' }}>
              <div className="p-1.5 bg-white rounded-lg">
                <QrCode className="w-6 h-6 text-slate-900" />
              </div>
              <div>
                <p className="text-xs font-bold text-white leading-tight">QR Ticket</p>
                <p className="text-[10px] text-slate-400">Tech Symposium</p>
              </div>
            </div>

            {/* Top Center: Volunteer Badge */}
            <div className="absolute -top-[2%] left-[45%] z-20 bg-[#1e2536]/80 backdrop-blur-xl p-2.5 pr-4 rounded-xl border border-slate-600/50 flex items-center gap-3 shadow-2xl animate-bounce" style={{ animationDuration: '5s', animationDelay: '1s' }}>
              <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center overflow-hidden border border-indigo-400">
                <User className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-xs font-bold text-white leading-tight">Volunteer Badge</p>
                <p className="text-[10px] text-slate-400">Alex Chen</p>
              </div>
            </div>

            {/* Top Right: Calendar */}
            <div className="absolute top-[8%] -right-[5%] z-20 bg-[#1e2536]/80 backdrop-blur-xl p-3 rounded-xl border border-slate-600/50 shadow-2xl animate-bounce" style={{ animationDuration: '4.5s', animationDelay: '0.5s' }}>
              <Calendar className="w-6 h-6 text-indigo-400" />
            </div>

            {/* Top Far Right: Notification */}
            <div className="absolute top-[18%] -right-[15%] lg:-right-[5%] z-20 bg-[#1e2536]/80 backdrop-blur-xl p-2.5 pr-4 rounded-xl border border-slate-600/50 flex items-center gap-3 shadow-2xl animate-bounce" style={{ animationDuration: '5.5s', animationDelay: '1.5s' }}>
              <div className="p-1.5 bg-blue-500/20 rounded-lg">
                <Bell className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <p className="text-xs font-bold text-white leading-tight">Notification</p>
                <p className="text-[10px] text-slate-400">New Application</p>
              </div>
            </div>

            {/* Bottom Left: Event Pin */}
            <div className="absolute bottom-[12%] -left-[2%] z-20 bg-[#1e2536]/80 backdrop-blur-xl p-2.5 pr-4 rounded-xl border border-slate-600/50 flex items-center gap-3 shadow-2xl animate-bounce" style={{ animationDuration: '5s', animationDelay: '0.2s' }}>
              <div className="p-1.5 bg-purple-500/20 rounded-lg">
                <MapPin className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <p className="text-xs font-bold text-white leading-tight">Event Pin</p>
                <p className="text-[10px] text-slate-400">Campus Gala</p>
              </div>
            </div>

            {/* Bottom Center: Analytics Graph */}
            <div className="absolute -bottom-[5%] left-[30%] z-20 bg-[#1e2536]/90 backdrop-blur-xl p-3 rounded-xl border border-slate-600/50 shadow-2xl animate-bounce w-32" style={{ animationDuration: '4s', animationDelay: '2s' }}>
              <p className="text-[10px] text-slate-400 mb-2">Analytics</p>
              <div className="h-10 flex items-end gap-1">
                <div className="flex-1 bg-indigo-500 rounded-t-sm h-[40%]" />
                <div className="flex-1 bg-indigo-500 rounded-t-sm h-[70%]" />
                <div className="flex-1 bg-indigo-500 rounded-t-sm h-[50%]" />
                <div className="flex-1 bg-indigo-500 rounded-t-sm h-[100%]" />
                <div className="flex-1 bg-indigo-500 rounded-t-sm h-[80%]" />
              </div>
            </div>

            {/* Bottom Right: Certificate Icon */}
            <div className="absolute bottom-[5%] right-[25%] z-20 bg-[#1e2536]/80 backdrop-blur-xl p-4 rounded-xl border border-slate-600/50 shadow-2xl animate-bounce flex flex-col items-center justify-center" style={{ animationDuration: '4.8s', animationDelay: '0.8s' }}>
              <Award className="w-8 h-8 text-blue-400 mb-1" />
              <p className="text-[10px] font-bold text-white">Certificate</p>
            </div>

            {/* Far Bottom Right: Chat Bubbler */}
            <div className="absolute bottom-[15%] -right-[10%] lg:-right-[5%] z-20 bg-[#1e2536]/80 backdrop-blur-xl p-2.5 pr-4 rounded-xl border border-slate-600/50 flex items-center gap-3 shadow-2xl animate-bounce" style={{ animationDuration: '6s', animationDelay: '1.2s' }}>
              <div className="p-1.5 bg-indigo-500/20 rounded-lg">
                <MessageSquare className="w-5 h-5 text-indigo-400" />
              </div>
              <div>
                <p className="text-xs font-bold text-white leading-tight">Chat</p>
                <p className="text-[10px] text-slate-400">Team</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
