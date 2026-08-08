import React from 'react';
import { Menu, Search, Plus, Settings2, Bell } from 'lucide-react';
import SwitchRoleButton from '@/components/general/SwitchRoleButton';
import ProfileDropdown from '@/components/general/ProfileDropdown';

export default function VolunteerHeader({ toggleSidebar, toggleMobileSidebar, title = "Volunteer Dashboard" }) {
  return (
    <header className="h-16 md:h-[72px] shrink-0 border-b border-vol-border/50 bg-vol-bg/95 backdrop-blur z-10 flex items-center justify-between px-4 md:px-6 sticky top-0">
      <div className="flex items-center gap-2 sm:gap-4 min-w-0">
        <button 
          onClick={toggleMobileSidebar}
          className="md:hidden p-2 -ml-1 rounded-lg text-gray-400 hover:text-white hover:bg-vol-card transition-colors cursor-pointer touch-manipulation"
          aria-label="Open navigation menu"
        >
          <Menu size={20} />
        </button>
        <button 
          onClick={toggleSidebar}
          className="hidden md:block p-2 -ml-2 rounded-lg text-gray-400 hover:text-white hover:bg-vol-card transition-colors cursor-pointer"
          aria-label="Toggle sidebar"
        >
          <Menu size={20} />
        </button>
        <h1 className="text-base sm:text-lg md:text-xl font-semibold text-white truncate">{title}</h1>
      </div>

      <div className="flex items-center gap-1.5 sm:gap-3 justify-end shrink-0">
        <div className="relative hidden lg:block">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search tasks, shifts..." 
            className="w-48 xl:w-64 bg-vol-card border border-vol-border rounded-full py-1.5 pl-9 pr-4 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-vol-accent2/50 transition-colors"
          />
        </div>

        <button 
          aria-label="Notifications" 
          className="relative p-2 rounded-full text-gray-400 hover:text-white hover:bg-vol-card transition-colors cursor-pointer touch-manipulation"
        >
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-vol-warning border-2 border-vol-bg"></span>
        </button>

        {/* Switch Role Button */}
        <SwitchRoleButton currentRole="Volunteer" />

        {/* Profile Dropdown Menu */}
        <ProfileDropdown currentRole="Volunteer" />
      </div>
    </header>
  );
}
