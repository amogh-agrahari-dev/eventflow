import React from 'react';
import WidgetCard from '../../volunteer/widgets/WidgetCard';
import { Search, Ticket, ScanLine, MessageSquare, Download, ChevronRight } from 'lucide-react';
import Link from 'next/link';

const actions = [
  { name: 'Browse Events', icon: Search, href: '#' },
  { name: 'My Tickets', icon: Ticket, href: '#' },
  { name: 'Check-in to Event', icon: ScanLine, href: '#' },
  { name: 'Event Feedback', icon: MessageSquare, href: '#' },
  { name: 'Download Certificate', icon: Download, href: '#' }
];

export default function QuickActions() {
  return (
    <WidgetCard title="Quick Actions">
      <div className="flex-1 p-5 flex flex-col justify-center gap-2">
        {actions.map((action, idx) => {
          const Icon = action.icon;
          return (
            <Link 
              key={idx} 
              href={action.href}
              className="flex items-center justify-between p-3 rounded-xl bg-vol-bg border border-vol-border/50 hover:bg-vol-border/30 hover:border-vol-border transition-all group"
            >
              <div className="flex items-center gap-3">
                <Icon size={16} className="text-gray-400 group-hover:text-white transition-colors" />
                <span className="text-[13px] font-medium text-gray-300 group-hover:text-white transition-colors">
                  {action.name}
                </span>
              </div>
              <ChevronRight 
                size={14} 
                className="text-gray-500 group-hover:text-vol-accent2 group-hover:translate-x-1 transition-all" 
              />
            </Link>
          );
        })}
      </div>
    </WidgetCard>
  );
}
