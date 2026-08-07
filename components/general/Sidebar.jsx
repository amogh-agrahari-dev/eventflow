import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  Home, PlusSquare, History, Users, ClipboardList,
  MessageSquare, UserPlus, Check, LayoutTemplate, MessageCircle, Mail,
  BarChart2, Settings, HelpCircle
} from 'lucide-react';
import Logo from '@/components/general/Logo';

export default function Sidebar({ isMobileMenuOpen, isDesktopSidebarCollapsed }) {
  const router = useRouter();
  const currentPath = router.pathname;

  const isActive = (href) => {
    if (href === '#') return false;
    if (currentPath === href) return true;
    if (currentPath.startsWith(href)) return true;
    // For /events/[id], /all-events would not match, which is correct.
    return false;
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
    <aside className={`fixed inset-y-0 left-0 z-50 bg-vol-bg border-vol-border/60 flex flex-col shrink-0 overflow-hidden transform transition-all duration-300 md:relative md:translate-x-0 ${isMobileMenuOpen ? 'translate-x-0 w-[260px] border-r' : '-translate-x-full w-[260px] border-r'} ${isDesktopSidebarCollapsed ? 'md:w-0 md:border-r-0' : 'md:w-[260px] md:border-r'}`}>
      <div className="w-[260px] h-full flex flex-col bg-vol-bg">
        {/* Brand / Logo Area */}
        <div className="h-[72px] px-6 flex items-center border-b border-vol-border/50 shrink-0">
          <Logo iconSize={28} />
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar px-4 py-4 space-y-6">
          {MENU_SECTIONS.map((section, idx) => (
            <div key={idx}>
              {section.title && (
                <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                  {section.title}
                </h3>
              )}
              <div className="space-y-1">
                {section.items.map((item, itemIdx) => {
                  const Icon = item.icon;
                  const active = isActive(item.href);

                  if (active) {
                    return (
                      <div key={itemIdx} className="flex items-center gap-3 px-3 py-2.5 bg-vol-card border border-vol-border text-white rounded-lg cursor-pointer shadow-sm">
                        <Icon className="w-5 h-5 text-vol-accent2 shrink-0" />
                        <span className="text-sm font-medium flex-1">{item.name}</span>
                        <Check className="w-4 h-4 text-vol-accent2" />
                      </div>
                    );
                  }

                  return (
                    <Link key={itemIdx} href={item.href} className="flex items-center gap-3 px-3 py-2 text-gray-400 hover:text-white hover:bg-vol-card transition-all duration-200 rounded-lg group">
                      <Icon className="w-5 h-5 text-gray-400 group-hover:text-vol-accent2 transition-colors shrink-0" />
                      <span className="text-sm font-medium">{item.name}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 mt-auto">
          <Link href="#" className="flex items-center gap-3 p-3 rounded-xl bg-vol-card border border-vol-border text-gray-300 hover:text-white hover:border-vol-accent2/50 transition-all">
            <div className="w-8 h-8 rounded-full bg-vol-accent/10 flex items-center justify-center shrink-0">
              <HelpCircle size={18} className="text-vol-accent2" />
            </div>
            <div className="flex flex-col whitespace-nowrap">
              <span className="font-medium text-sm">Need Help?</span>
              <span className="text-xs text-gray-500">Visit our Help Center</span>
            </div>
          </Link>
        </div>
      </div>
    </aside>
  );
}
