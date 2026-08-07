import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  CalendarCheck, ClipboardList, Ticket, ArrowRight,
  Sparkles, ShieldCheck, Users, CheckCircle2
} from 'lucide-react';
import { useUserStore } from '@/store/userStore';
import { getToken } from '@/lib/auth';
import Logo from '@/components/general/Logo';
import ProfileDropdown from '@/components/general/ProfileDropdown';

export default function SelectRolePage() {
  const router = useRouter();
  const { user, fetchUser } = useUserStore();
  const [selectedRole, setSelectedRole] = useState('organizer');

  useEffect(() => {
    const token = getToken();
    if (!token) {
      router.push('/auth/login');
      return;
    }

    if (!user) {
      fetchUser();
    }
  }, [router, user, fetchUser]);

  const roles = [
    {
      id: 'organizer',
      title: 'Organizer',
      tagline: 'Event Operations & Command',
      badge: 'Full Access',
      description: 'Create and manage events, volunteers, registrations, announcements, analytics and tasks.',
      href: '/organiser-dashboard',
      icon: CalendarCheck,
      color: 'from-[#6E56CF] to-[#3B82F6]',
      accentBorder: 'hover:border-[#6E56CF]/60',
      activeBorder: 'border-[#6E56CF]',
      glowColor: 'group-hover:shadow-[0_0_35px_rgba(110,86,207,0.35)]',
      iconBg: 'bg-[#6E56CF]/15 text-[#A78BFA] border-[#6E56CF]/30',
      btnBg: 'bg-gradient-to-r from-[#6E56CF] to-[#3B82F6] hover:from-[#5b45be] hover:to-[#2563EB]',
      btnText: 'Enter Organizer Hub',
      stat: 'Command Center',
    },
    {
      id: 'volunteer',
      title: 'Volunteer',
      tagline: 'On-Ground Duty & Rosters',
      badge: 'Duty Active',
      description: 'Manage assigned tasks, schedules, check-ins, attendance and event responsibilities.',
      href: '/volunteer-dashboard',
      icon: ClipboardList,
      color: 'from-[#10B981] to-[#00E5FF]',
      accentBorder: 'hover:border-[#10B981]/60',
      activeBorder: 'border-[#10B981]',
      glowColor: 'group-hover:shadow-[0_0_35px_rgba(16,185,129,0.35)]',
      iconBg: 'bg-[#10B981]/15 text-[#34D399] border-[#10B981]/30',
      btnBg: 'bg-gradient-to-r from-[#10B981] to-[#00E5FF] text-slate-950 font-bold hover:brightness-110',
      btnText: 'Enter Volunteer Portal',
      stat: 'Task Manager',
    },
    {
      id: 'attendee',
      title: 'Attendee',
      tagline: 'Passes & Event Discovery',
      badge: 'Instant Access',
      description: 'Browse events, register, manage tickets, receive announcements and provide feedback.',
      href: '/attendee-dashboard',
      icon: Ticket,
      color: 'from-[#F59E0B] to-[#EC4899]',
      accentBorder: 'hover:border-[#F59E0B]/60',
      activeBorder: 'border-[#F59E0B]',
      glowColor: 'group-hover:shadow-[0_0_35px_rgba(245,158,11,0.35)]',
      iconBg: 'bg-[#F59E0B]/15 text-[#FBBF24] border-[#F59E0B]/30',
      btnBg: 'bg-gradient-to-r from-[#F59E0B] to-[#EC4899] hover:from-[#d97706] hover:to-[#db2777]',
      btnText: 'Enter Attendee Dashboard',
      stat: 'Digital Passes',
    },
  ];

  return (
    <>
      <Head>
        <title>Select Role & Workspace — EventFlow</title>
        <meta name="description" content="Switch between Organizer, Volunteer, and Attendee roles seamlessly in EventFlow." />
      </Head>

      <div className="min-h-screen bg-[#06090F] text-white flex flex-col relative overflow-hidden selection:bg-[#6E56CF]/40">
        {/* Subtle Background Gradients & Tech Grid */}
        <div
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)`,
            backgroundSize: '48px 48px',
          }}
          aria-hidden="true"
        />

        {/* Ambient Top & Corner Glow Blobs */}
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#6E56CF]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 -right-40 w-96 h-96 bg-[#00E5FF]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 left-1/3 w-96 h-96 bg-[#10B981]/15 rounded-full blur-3xl pointer-events-none" />

        {/* Top Navigation Bar */}
        <header className="relative z-20 w-full px-6 lg:px-10 py-5 flex justify-between items-center border-b border-[#1C2333]/80 bg-[#06090F]/70 backdrop-blur-xl">
          <Logo iconSize={32} />

          <div className="flex items-center gap-4">
            <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#161B23] border border-[#232B3E] text-slate-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Multi-Role Switcher
            </span>
            <ProfileDropdown currentRole="Switch Role" />
          </div>
        </header>

        {/* Main Content Area */}
        <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 sm:px-6 py-12 lg:py-16 max-w-7xl mx-auto w-full">
          
          {/* Header Title & Subtitle */}
          <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-5 text-xs font-semibold text-slate-300">
              <Sparkles className="w-3.5 h-3.5 text-[#00E5FF] animate-spin-slow" />
              Unified Campus Event Ecosystem
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-5 leading-[1.15]">
              {user?.name ? (
                <>Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6E56CF] via-[#3B82F6] to-[#00E5FF]">{user.name}</span></>
              ) : (
                <>Select Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6E56CF] via-[#3B82F6] to-[#00E5FF]">Role & Workspace</span></>
              )}
            </h1>

            <p className="text-slate-400 text-base sm:text-lg font-normal max-w-2xl mx-auto leading-relaxed">
              Choose which operational perspective you want to explore today. Your account has unified cross-role permissions.
            </p>
          </div>

          {/* 3 Role Selection Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 w-full max-w-6xl">
            {roles.map((role) => {
              const Icon = role.icon;
              const isSelected = selectedRole === role.id;

              return (
                <div
                  key={role.id}
                  onClick={() => setSelectedRole(role.id)}
                  className={`group relative rounded-3xl bg-[#0F1319]/90 border ${
                    isSelected ? role.activeBorder : 'border-[#1C2333]'
                  } ${role.accentBorder} p-7 lg:p-8 flex flex-col justify-between backdrop-blur-xl transition-all duration-300 transform-gpu hover:-translate-y-2 cursor-pointer shadow-xl ${
                    role.glowColor
                  }`}
                >
                  {/* Decorative Card Top Glow */}
                  <div
                    className={`absolute -top-12 -right-12 w-32 h-32 bg-gradient-to-br ${role.color} opacity-0 group-hover:opacity-20 rounded-full blur-2xl transition-opacity duration-500 pointer-events-none`}
                  />

                  <div>
                    {/* Top Row: Icon + Badge */}
                    <div className="flex items-center justify-between mb-6">
                      <div
                        className={`w-14 h-14 rounded-2xl flex items-center justify-center border shadow-inner transition-transform duration-300 group-hover:scale-110 ${role.iconBg}`}
                      >
                        <Icon className="w-7 h-7" strokeWidth={2.2} />
                      </div>

                      <span className="px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase bg-[#161B23] border border-[#232B3E] text-slate-300">
                        {role.stat}
                      </span>
                    </div>

                    {/* Role Title & Tagline */}
                    <div className="mb-3">
                      <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-200 transition-colors">
                        {role.title}
                      </h2>
                      <p className="text-xs font-semibold text-slate-400 mt-0.5">
                        {role.tagline}
                      </p>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-slate-300/90 leading-relaxed font-normal mt-3">
                      {role.description}
                    </p>
                  </div>

                  {/* Bottom Action CTA */}
                  <div className="mt-8 pt-6 border-t border-[#1C2333]">
                    <Link
                      href={role.href}
                      className={`w-full py-3 px-4 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-300 shadow-md ${
                        role.btnBg
                      }`}
                    >
                      <span>{role.btnText}</span>
                      <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick Helper Note */}
          <div className="mt-12 text-center text-xs text-slate-500 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>You can switch between any role anytime using the "Switch Role" button in the top navigation header.</span>
          </div>

        </main>
      </div>
    </>
  );
}
