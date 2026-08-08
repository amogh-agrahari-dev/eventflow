import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { LayoutDashboard, Calendar, QrCode, Ticket, PlusCircle, Users, Repeat } from 'lucide-react';
import clsx from 'clsx';

export default function MobileBottomNav({ role = 'attendee' }) {
  const router = useRouter();
  const currentPath = router.asPath;

  const roleNavItems = {
    attendee: [
      { name: 'Dashboard', icon: LayoutDashboard, href: '/attendee-dashboard' },
      { name: 'Events', icon: Calendar, href: '/all-events?role=attendee' },
      { name: 'Passes', icon: Ticket, href: '/passes' },
      { name: 'Switch', icon: Repeat, href: '/select-role' },
    ],
    volunteer: [
      { name: 'Dashboard', icon: LayoutDashboard, href: '/volunteer-dashboard' },
      { name: 'Events', icon: Calendar, href: '/all-events?role=volunteer' },
      { name: 'Scanner', icon: QrCode, href: '/scanner' },
      { name: 'Switch', icon: Repeat, href: '/select-role' },
    ],
    organizer: [
      { name: 'Dashboard', icon: LayoutDashboard, href: '/organiser-dashboard' },
      { name: 'Create', icon: PlusCircle, href: '/events/add' },
      { name: 'Directory', icon: Users, href: '/directory' },
      { name: 'Events', icon: Calendar, href: '/all-events' },
    ],
  };

  const items = roleNavItems[role.toLowerCase()] || roleNavItems.attendee;

  return (
    <nav 
      aria-label="Mobile Navigation Bar" 
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-vol-bg/95 backdrop-blur-xl border-t border-vol-border/60 px-2 py-1.5 flex items-center justify-around safe-area-pb shadow-[0_-4px_20px_rgba(0,0,0,0.4)]"
    >
      {items.map((item, idx) => {
        const Icon = item.icon;
        const isActive = currentPath === item.href || (item.href !== '/' && currentPath.startsWith(item.href.split('?')[0]));

        return (
          <Link
            key={idx}
            href={item.href}
            className={clsx(
              "flex flex-col items-center justify-center min-h-[44px] min-w-[56px] px-2 py-1 rounded-xl transition-all duration-150 touch-manipulation",
              isActive
                ? "text-vol-accent2 font-semibold scale-105"
                : "text-gray-400 hover:text-white hover:bg-vol-card/50"
            )}
          >
            <Icon size={20} className={clsx("transition-transform", isActive ? "stroke-[2.5px]" : "stroke-[1.8px]")} />
            <span className="text-[10px] mt-0.5 tracking-tight">{item.name}</span>
          </Link>
        );
      })}
    </nav>
  );
}
