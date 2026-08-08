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
import { useRouter } from 'next/router';
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

export default function AttendeeSidebar({ isCollapsed, isMobileMenuOpen, onCloseMobileMenu }) {
  const router = useRouter();
  const currentPath = router.pathname;

  const isActive = (href) => {
    if (href === '#') return false;
    if (currentPath === href) return true;
    if (currentPath.startsWith(href) && href !== '/') return true;
    return false;
  };

  const handleLinkClick = () => {
    if (onCloseMobileMenu) {
      onCloseMobileMenu();
    }
  };

  return (
    <motion.aside
      initial={false}
      animate={{ width: isCollapsed ? 80 : 260 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className={clsx(
        "fixed inset-y-0 left-0 z-50 bg-vol-bg border-vol-border/60 flex flex-col shrink-0 overflow-y-auto overflow-x-hidden transform transition-transform duration-300 md:relative md:translate-x-0 border-r",
        isMobileMenuOpen ? "translate-x-0 w-[280px] max-w-[85vw] md:w-auto shadow-2xl" : "-translate-x-full w-[280px] md:translate-x-0 md:w-auto"
      )}
    >
      <div className="h-16 md:h-[72px] px-5 sm:px-6 flex items-center justify-between border-b border-vol-border/50 shrink-0">
        {isCollapsed ? (
          <Logo iconSize={28} textClassName="hidden" />
        ) : (
          <Logo iconSize={28} />
        )}

        {/* Close button on mobile */}
        <button
          onClick={onCloseMobileMenu}
          className="md:hidden p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-vol-card transition-colors touch-manipulation"
          aria-label="Close sidebar"
        >
          <span className="text-xl leading-none">✕</span>
        </button>
      </div>

      <div className="flex-1 py-4 px-3 sm:px-4 flex flex-col gap-5 overflow-y-auto custom-scrollbar">
        <div className="px-1">
          <Link 
            href="/attendee-dashboard" 
            onClick={handleLinkClick}
            className={clsx("flex items-center gap-3 px-3 py-2.5 min-h-[44px] rounded-xl bg-vol-card border border-vol-border text-white transition-colors touch-manipulation", isCollapsed && "justify-center")}
          >
            <LayoutDashboard size={20} className="shrink-0 text-vol-success" />
            {!isCollapsed && <span className="font-medium whitespace-nowrap">Dashboard</span>}
          </Link>
        </div>

        {menuSections.map((section, idx) => (
          <div key={idx} className="px-1 flex flex-col gap-1.5">
            {!isCollapsed && (
              <h3 className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider px-3 mb-1 whitespace-nowrap">
                {section.title}
              </h3>
            )}
            {section.items.map((item, itemIdx) => {
              const Icon = item.icon;
              const active = isActive(item.href);

              return (
                <Link
                  key={itemIdx}
                  href={item.href}
                  onClick={handleLinkClick}
                  className={clsx(
                    "flex items-center gap-3 px-3 py-2.5 min-h-[44px] rounded-xl transition-colors group relative touch-manipulation",
                    active 
                      ? "bg-vol-card border border-vol-border text-white font-medium shadow-sm"
                      : "text-gray-400 hover:text-white hover:bg-vol-card",
                    isCollapsed && "justify-center"
                  )}
                  title={isCollapsed ? item.name : undefined}
                >
                  <Icon size={20} className={clsx("shrink-0 transition-colors", active ? "text-vol-accent2" : "group-hover:text-vol-accent2")} />
                  {!isCollapsed && (
                    <span className="text-sm font-medium whitespace-nowrap flex-1">{item.name}</span>
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

      <div className="p-4 mt-auto border-t border-vol-border/40">
        <Link 
          href="#" 
          onClick={handleLinkClick}
          className={clsx("flex items-center gap-3 p-3 rounded-xl bg-vol-card border border-vol-border text-gray-300 hover:text-white hover:border-vol-accent2/50 transition-all min-h-[44px] touch-manipulation", isCollapsed && "justify-center")}
        >
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
