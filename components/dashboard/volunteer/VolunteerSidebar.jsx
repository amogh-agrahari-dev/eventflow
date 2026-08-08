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
  HelpCircle,
  Check
} from 'lucide-react';
import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Logo from '@/components/general/Logo';

const menuSections = [
  {
    title: null,
    items: [
      { name: 'Dashboard', icon: LayoutDashboard, href: '/volunteer-dashboard' }
    ]
  },
  {
    title: 'VOLUNTEER HUB',
    items: [
      { name: 'My Assignments', icon: ClipboardList, href: '#' },
      { name: 'My Schedule', icon: CalendarDays, href: '#' },
      { name: 'My Events', icon: CalendarRange, href: '#' },
      { name: 'Check-in History', icon: History, href: '/scanner' },
    ]
  },
  {
    title: 'OPPORTUNITIES',
    items: [
      { name: 'Browse Events', icon: Search, href: '/all-events?role=volunteer' },
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

export default function VolunteerSidebar({ isCollapsed, isMobileMenuOpen, onCloseMobileMenu }) {
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
        {menuSections.map((section, idx) => (
          <div key={idx} className="flex flex-col gap-1.5">
            {section.title && !isCollapsed && (
              <h3 className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider px-3 mb-1 whitespace-nowrap">
                {section.title}
              </h3>
            )}
            {section.items.map((item, itemIdx) => {
              const Icon = item.icon;
              const active = isActive(item.href);

              if (active) {
                return (
                  <div
                    key={itemIdx}
                    onClick={handleLinkClick}
                    title={isCollapsed ? item.name : undefined}
                    className={clsx(
                      "flex items-center gap-3 px-3 py-2.5 min-h-[44px] bg-vol-card border border-vol-border text-white rounded-xl cursor-pointer shadow-sm transition-all",
                      isCollapsed && "justify-center"
                    )}
                  >
                    <Icon size={20} className="shrink-0 text-vol-accent2" />
                    {!isCollapsed && <span className="text-sm font-medium whitespace-nowrap flex-1">{item.name}</span>}
                    {!isCollapsed && <Check size={16} className="text-vol-accent2 shrink-0" />}
                  </div>
                );
              }

              return (
                <Link
                  key={itemIdx}
                  href={item.href}
                  onClick={handleLinkClick}
                  className={clsx(
                    "flex items-center gap-3 px-3 py-2.5 min-h-[44px] rounded-xl text-gray-400 hover:text-white hover:bg-vol-card transition-colors group relative touch-manipulation",
                    isCollapsed && "justify-center"
                  )}
                  title={isCollapsed ? item.name : undefined}
                >
                  <Icon size={20} className="shrink-0 group-hover:text-vol-accent2 transition-colors" />
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
