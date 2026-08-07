import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  Home, PlusSquare, History, Users, ClipboardList,
  MessageSquare, UserPlus, Check, LayoutTemplate, MessageCircle, Mail,
  BarChart2, Settings
} from 'lucide-react';
import Logo from '@/components/general/Logo';

export default function Sidebar({ isMobileMenuOpen, isDesktopSidebarCollapsed }) {
  const router = useRouter();
  const currentPath = router.pathname;

  const isActive = (href) => {
    if (href === '#') return false;
    if (currentPath === href) return true;
    // For /events/[id], /all-events would not match, which is correct.
    return false;
  };

  const MENU_SECTIONS = [
    {
      title: null,
      items: [
        { name: 'Dashboard', icon: Home, href: '/dashboard' }
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
        { name: 'Directory', icon: Users, href: '#' },
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
    <aside className={`fixed inset-y-0 left-0 z-50 bg-[#11141A] border-[#1C202B] flex flex-col shrink-0 overflow-hidden transform transition-all duration-300 md:relative md:translate-x-0 ${isMobileMenuOpen ? 'translate-x-0 w-[260px] border-r' : '-translate-x-full w-[260px] border-r'} ${isDesktopSidebarCollapsed ? 'md:w-0 md:border-r-0' : 'md:w-[260px] md:border-r'}`}>
      <div className="w-[260px] h-full flex flex-col bg-[#11141A]">
        {/* Brand / Logo Area */}
        <div className="p-6 flex items-center gap-3 border-b border-[#1C202B]/60 shrink-0">
          <Logo iconSize={32} />
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar px-4 py-2 space-y-6 mt-4">
          {MENU_SECTIONS.map((section, idx) => (
            <div key={idx}>
              {section.title && (
                <h3 className="px-3 text-[11px] font-semibold text-[#5A6B8A] uppercase tracking-wider mb-2">
                  {section.title}
                </h3>
              )}
              <div className="space-y-0.5">
                {section.items.map((item, itemIdx) => {
                  const Icon = item.icon;
                  const active = isActive(item.href);

                  if (active) {
                    return (
                      <div key={itemIdx} className="flex items-center gap-3 px-3 py-2 bg-[#2D3340]/40 text-[#00E5FF] border border-[#3A455A] rounded-lg cursor-pointer">
                        <Icon className="w-[18px] h-[18px] text-[#00E5FF]" />
                        <span className="text-[13px] font-medium text-white flex-1">{item.name}</span>
                        <Check className="w-4 h-4 text-[#00E5FF]" />
                      </div>
                    );
                  }

                  return (
                    <Link key={itemIdx} href={item.href} className="flex items-center gap-3 px-3 py-2 text-[#8F9BB3] hover:text-white transition-colors rounded-lg">
                      <Icon className="w-[18px] h-[18px]" />
                      <span className="text-[13px] font-medium">{item.name}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
