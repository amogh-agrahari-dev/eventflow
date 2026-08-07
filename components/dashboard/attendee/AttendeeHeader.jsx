import React from 'react';
import { Menu, Search, Plus, SlidersHorizontal, Bell } from 'lucide-react';
import { useUserStore } from '@/store/userStore';
import SwitchRoleButton from '@/components/general/SwitchRoleButton';
import ProfileDropdown from '@/components/general/ProfileDropdown';

export default function AttendeeHeader({ toggleSidebar }) {
  const { user } = useUserStore();

  return (
    <header className="h-[72px] shrink-0 border-b border-vol-border/50 bg-vol-bg/95 backdrop-blur z-10 flex items-center justify-between px-6 sticky top-0">
      <div className="flex items-center gap-4">
        <button 
          onClick={toggleSidebar}
          className="p-2 -ml-2 rounded-lg text-gray-400 hover:text-white hover:bg-vol-card transition-colors cursor-pointer"
        >
          <Menu size={20} />
        </button>
        <h1 className="text-xl font-semibold text-white">Attendee Dashboard</h1>
      </div>

      <div className="flex items-center gap-2 md:gap-3 flex-1 justify-end min-w-0">
        <div className="relative hidden md:block">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search events, tickets..." 
            className="w-56 lg:w-64 bg-vol-card border border-vol-border rounded-full py-2 pl-9 pr-4 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-vol-accent2/50 transition-colors"
          />
        </div>

        <button className="flex items-center gap-2 bg-vol-accent hover:bg-vol-accent2 text-white px-3.5 sm:px-4 py-2 rounded-full text-sm font-medium transition-colors shadow-glow-lg cursor-pointer">
          <Plus size={16} />
          <span className="hidden sm:inline">Quick-Add</span>
        </button>

        <button className="flex items-center gap-2 bg-vol-card hover:bg-vol-card/80 border border-vol-border text-gray-200 px-3.5 sm:px-4 py-2 rounded-full text-sm font-medium transition-colors hidden sm:flex cursor-pointer">
          <SlidersHorizontal size={16} />
          <span className="hidden sm:inline">Customize</span>
        </button>

        <button className="relative p-2 rounded-full text-gray-400 hover:text-white hover:bg-vol-card transition-colors cursor-pointer">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-vol-warning border-2 border-vol-bg"></span>
        </button>

        {/* Switch Role Button */}
        <SwitchRoleButton currentRole="Attendee" />

        {/* Profile Dropdown Menu */}
        <ProfileDropdown currentRole="Attendee" />
      </div>
    </header>
  );
}
