import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  Home, PlusSquare, History, Users, ClipboardList,
  MessageSquare, UserPlus, Check, LayoutTemplate, MessageCircle, Mail,
  BarChart2, Settings, HelpCircle
} from 'lucide-react';
import Logo from '@/components/general/Logo';
import clsx from 'clsx';

export default function Sidebar({ isMobileMenuOpen, isDesktopSidebarCollapsed, onCloseMobileMenu }) {
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

  const MENU_SECTIONS = [
    {
      title: null,
      items: [
        { name: 'Dashboard', icon: Home, href: '/organiser-dashboard' }
      ]
    },
    {
      title: 'EVENT STUDIO',
      items: [
        { name: 'Create New', icon: PlusSquare, href: '/events/add' },
        { name: 'Templates', icon: LayoutTemplate, href: '#' },
        { name: 'All Events', icon: History, href: '/all-events' },
      ]
    },
    {
      title: 'VOLUNTEER HUB',
      items: [
        { name: 'Directory', icon: Users, href: '/directory' },
        { name: 'Rosters', icon: ClipboardList, href: '#' },
        { name: 'Feedback', icon: MessageSquare, href: '#' },
      ]
    },
    {
      title: 'ATTENDEE MANAGEMENT',
      items: [
        { name: 'Registrations', icon: UserPlus, href: '#' },
        { name: 'Check-in Stations', icon: Check, href: '#' },
      ]
    },
    {
      title: 'COMMUNICATIONS',
      items: [
        { name: 'Messaging', icon: MessageCircle, href: '#' },
        { name: 'Email campaigns', icon: Mail, href: '#' },
      ]
    },
    {
      title: 'ANALYTICS PRO',
      items: [
        { name: 'Custom Reports', icon: BarChart2, href: '#' },
        { name: 'General Settings', icon: Settings, href: '/settings' },
      ]
    }
  ];

  return (
    <motion.aside
      initial={false}
      animate={{ width: isDesktopSidebarCollapsed ? 80 : 260 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className={clsx(
        "fixed inset-y-0 left-0 z-50 bg-vol-bg border-vol-border/60 flex flex-col shrink-0 overflow-y-auto overflow-x-hidden transform transition-transform duration-300 md:relative md:translate-x-0 border-r",
        isMobileMenuOpen ? "translate-x-0 w-[280px] max-w-[85vw] md:w-auto shadow-2xl" : "-translate-x-full w-[280px] md:translate-x-0 md:w-auto"
      )}
    >
      <div className="w-full h-full flex flex-col bg-vol-bg">
        {/* Brand / Logo Area */}
        <div className="h-16 md:h-[72px] px-5 sm:px-6 flex items-center justify-between border-b border-vol-border/50 shrink-0">
          {isDesktopSidebarCollapsed ? (
            <Logo iconSize={28} textClassName="hidden" />
          ) : (
            <Logo iconSize={28} />
          )}

          {/* Close button inside mobile sidebar */}
          <button
            onClick={onCloseMobileMenu}
            className="md:hidden p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-vol-card transition-colors touch-manipulation"
            aria-label="Close sidebar"
          >
            <span className="text-xl leading-none">✕</span>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar px-3 sm:px-4 py-4 space-y-5">
          {MENU_SECTIONS.map((section, idx) => (
            <div key={idx}>
              {section.title && !isDesktopSidebarCollapsed && (
                <h3 className="px-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-2 whitespace-nowrap">
                  {section.title}
                </h3>
              )}
              <div className="space-y-1">
                {section.items.map((item, itemIdx) => {
                  const Icon = item.icon;
                  const active = isActive(item.href);

                  if (active) {
                    return (
                      <div
                        key={itemIdx}
                        onClick={handleLinkClick}
                        title={isDesktopSidebarCollapsed ? item.name : undefined}
                        className={clsx(
                          "flex items-center gap-3 px-3 py-2.5 min-h-[44px] bg-vol-card border border-vol-border text-white rounded-xl cursor-pointer shadow-sm transition-all",
                          isDesktopSidebarCollapsed && "justify-center"
                        )}
                      >
                        <Icon className="w-5 h-5 text-vol-accent2 shrink-0" />
                        {!isDesktopSidebarCollapsed && <span className="text-sm font-medium flex-1 whitespace-nowrap">{item.name}</span>}
                        {!isDesktopSidebarCollapsed && <Check className="w-4 h-4 text-vol-accent2 shrink-0" />}
                      </div>
                    );
                  }

                  return (
                    <Link
                      key={itemIdx}
                      href={item.href}
                      onClick={handleLinkClick}
                      title={isDesktopSidebarCollapsed ? item.name : undefined}
                      className={clsx(
                        "flex items-center gap-3 px-3 py-2.5 min-h-[44px] text-gray-400 hover:text-white hover:bg-vol-card transition-all duration-200 rounded-xl group touch-manipulation",
                        isDesktopSidebarCollapsed && "justify-center"
                      )}
                    >
                      <Icon className="w-5 h-5 text-gray-400 group-hover:text-vol-accent2 transition-colors shrink-0" />
                      {!isDesktopSidebarCollapsed && <span className="text-sm font-medium whitespace-nowrap">{item.name}</span>}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 mt-auto border-t border-vol-border/40">
          <Link 
            href="#" 
            onClick={handleLinkClick}
            className={clsx("flex items-center gap-3 p-3 rounded-xl bg-vol-card border border-vol-border text-gray-300 hover:text-white hover:border-vol-accent2/50 transition-all min-h-[44px] touch-manipulation", isDesktopSidebarCollapsed && "justify-center")}
          >
            <div className="w-8 h-8 rounded-full bg-vol-accent/10 flex items-center justify-center shrink-0">
              <HelpCircle size={18} className="text-vol-accent2" />
            </div>
            {!isDesktopSidebarCollapsed && (
              <div className="flex flex-col whitespace-nowrap">
                <span className="font-medium text-sm">Need Help?</span>
                <span className="text-xs text-gray-500">Visit our Help Center</span>
              </div>
            )}
          </Link>
        </div>
      </div>
    </motion.aside>
  );
}
