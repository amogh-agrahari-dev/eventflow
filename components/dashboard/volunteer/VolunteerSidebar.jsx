import React from 'react';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  ClipboardList,
  CalendarDays,
  CalendarRange,
  History,
  Search,
  Clock,
  Briefcase,
  Megaphone,
  MessageSquare,
  User,
  Settings,
  HelpCircle
} from 'lucide-react';
import clsx from 'clsx';
import Link from 'next/link';

const menuSections = [
  {
    title: 'VOLUNTEER HUB',
    items: [
      { name: 'My Assignments', icon: ClipboardList, href: '#' },
      { name: 'My Schedule', icon: CalendarDays, href: '#' },
      { name: 'My Events', icon: CalendarRange, href: '#' },
      { name: 'Check-in History', icon: History, href: '#' },
    ]
  },
  {
    title: 'OPPORTUNITIES',
    items: [
      { name: 'Browse Events', icon: Search, href: '#' },
      { name: 'Available Shifts', icon: Clock, href: '#' },
      { name: 'Open Roles', icon: Briefcase, href: '#' },
    ]
  },
  {
    title: 'COMMUNICATIONS',
    items: [
      { name: 'Announcements', icon: Megaphone, href: '#', badge: 3 },
      { name: 'Messages', icon: MessageSquare, href: '#', badge: 5 },
    ]
  },
  {
    title: 'PROFILE & SETTINGS',
    items: [
      { name: 'My Profile', icon: User, href: '#' },
      { name: 'Settings', icon: Settings, href: '#' },
    ]
  }
];

export default function VolunteerSidebar({ isCollapsed }) {
  return (
    <motion.aside
      initial={false}
      animate={{ width: isCollapsed ? 80 : 260 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="h-screen bg-vol-bg border-r border-vol-border flex flex-col hidden md:flex sticky top-0 overflow-y-auto overflow-x-hidden"
    >
      <div className="p-4 flex items-center h-[72px] shrink-0 border-b border-vol-border/50">
        <div className="flex items-center gap-3 text-white font-bold text-xl px-2">
          <div className="w-8 h-8 rounded bg-vol-accent flex items-center justify-center shrink-0">
            <span className="text-sm">EV</span>
          </div>
          {!isCollapsed && <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="whitespace-nowrap">EventFlow</motion.span>}
        </div>
      </div>

      <div className="flex-1 py-6 flex flex-col gap-6">
        <div className="px-4">
          <Link href="#" className={clsx("flex items-center gap-3 px-3 py-2.5 rounded-lg bg-vol-card border border-vol-border text-white transition-colors", isCollapsed && "justify-center")}>
            <LayoutDashboard size={20} className="shrink-0 text-vol-success" />
            {!isCollapsed && <span className="font-medium whitespace-nowrap">Dashboard</span>}
          </Link>
        </div>

        {menuSections.map((section, idx) => (
          <div key={idx} className="px-4 flex flex-col gap-2">
            {!isCollapsed && (
              <h3 className="text-xs font-semibold text-gray-500 tracking-wider px-3 mb-1 whitespace-nowrap">
                {section.title}
              </h3>
            )}
            {section.items.map((item, itemIdx) => {
              const Icon = item.icon;
              return (
                <Link
                  key={itemIdx}
                  href={item.href}
                  className={clsx(
                    "flex items-center gap-3 px-3 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-vol-card transition-colors group relative",
                    isCollapsed && "justify-center"
                  )}
                  title={isCollapsed ? item.name : undefined}
                >
                  <Icon size={20} className="shrink-0 group-hover:text-vol-accent2 transition-colors" />
                  {!isCollapsed && (
                    <span className="font-medium whitespace-nowrap flex-1">{item.name}</span>
                  )}
                  {!isCollapsed && item.badge && (
                    <span className="w-5 h-5 rounded-full bg-vol-accent flex items-center justify-center text-[10px] text-white font-bold shrink-0">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        ))}
      </div>

      <div className="p-4 mt-auto">
        <Link href="#" className={clsx("flex items-center gap-3 p-3 rounded-xl bg-vol-card border border-vol-border text-gray-300 hover:text-white hover:border-vol-accent2/50 transition-all", isCollapsed && "justify-center")}>
          <div className="w-8 h-8 rounded-full bg-vol-accent/10 flex items-center justify-center shrink-0">
            <HelpCircle size={18} className="text-vol-accent2" />
          </div>
          {!isCollapsed && (
            <div className="flex flex-col whitespace-nowrap">
              <span className="font-medium text-sm">Need Help?</span>
              <span className="text-xs text-gray-500">Visit our Help Center</span>
            </div>
          )}
        </Link>
      </div>
    </motion.aside>
  );
}
