import React from 'react';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  Search,
  CalendarCheck,
  Ticket,
  Heart,
  History,
  Award,
  MessageSquare,
  Megaphone,
  Mail,
  Bell,
  User,
  Settings,
  HelpCircle
} from 'lucide-react';
import clsx from 'clsx';
import Link from 'next/link';
import Logo from '@/components/general/Logo';

const menuSections = [
  {
    title: 'DISCOVER',
    items: [
      { name: 'Browse Events', icon: Search, href: '/all-events?role=attendee' },
      { name: 'My Registrations', icon: CalendarCheck, href: '/passes' },
      { name: 'My Tickets', icon: Ticket, href: '/passes' },
      { name: 'Wishlisted Events', icon: Heart, href: '#' },
    ]
  },
  {
    title: 'MY ACTIVITY',
    items: [
      { name: 'Check-in History', icon: History, href: '#' },
      { name: 'Certificates', icon: Award, href: '#' },
      { name: 'Event Feedback', icon: MessageSquare, href: '#' },
    ]
  },
  {
    title: 'COMMUNICATIONS',
    items: [
      { name: 'Announcements', icon: Megaphone, href: '#', badge: 4 },
      { name: 'Messages', icon: Mail, href: '#', badge: 2 },
      { name: 'Notifications', icon: Bell, href: '#', badge: 6 },
    ]
  },
  {
    title: 'ACCOUNT',
    items: [
      { name: 'My Profile', icon: User, href: '#' },
      { name: 'Settings', icon: Settings, href: '/settings' },
    ]
  }
];

export default function AttendeeSidebar({ isCollapsed }) {
  return (
    <motion.aside
      initial={false}
      animate={{ width: isCollapsed ? 80 : 260 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="h-screen bg-vol-bg border-r border-vol-border flex flex-col hidden md:flex sticky top-0 overflow-y-auto overflow-x-hidden custom-scrollbar"
    >
      <div className="h-[72px] px-6 flex items-center border-b border-vol-border/50 shrink-0">
        {isCollapsed ? (
          <Logo iconSize={28} textClassName="hidden" />
        ) : (
          <Logo iconSize={28} />
        )}
      </div>

      <div className="flex-1 py-6 flex flex-col gap-6">
        <div className="px-4">
          <Link href="/attendee-dashboard" className={clsx("flex items-center gap-3 px-3 py-2.5 rounded-lg bg-vol-card border border-vol-border text-white transition-colors", isCollapsed && "justify-center")}>
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
