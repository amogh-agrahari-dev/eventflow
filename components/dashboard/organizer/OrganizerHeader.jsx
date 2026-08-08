import React from 'react';
import { Menu, Search, Plus, SlidersHorizontal, Bell } from 'lucide-react';
import { useUserStore } from '@/store/userStore';
import SwitchRoleButton from '@/components/general/SwitchRoleButton';
import ProfileDropdown from '@/components/general/ProfileDropdown';

export default function OrganizerHeader({ toggleSidebar, toggleMobileSidebar, onCustomizeClick }) {
  const { user } = useUserStore();

  return (
    <header className="h-16 md:h-[72px] shrink-0 border-b border-vol-border/50 bg-vol-bg/95 backdrop-blur z-10 flex items-center justify-between px-4 md:px-6 sticky top-0">
      <div className="flex items-center gap-2 sm:gap-4 min-w-0">
        <button
          className="md:hidden p-2 -ml-1 rounded-lg text-gray-400 hover:text-white hover:bg-vol-card transition-colors cursor-pointer touch-manipulation"
          onClick={toggleMobileSidebar}
          aria-label="Open navigation menu"
        >
          <Menu size={20} />
        </button>
        <button
          className="hidden md:block p-2 -ml-2 rounded-lg text-gray-400 hover:text-white hover:bg-vol-card transition-colors cursor-pointer"
          onClick={toggleSidebar}
          aria-label="Toggle sidebar"
        >
          <Menu size={20} />
        </button>
        <h1 className="text-base sm:text-lg md:text-xl font-semibold text-white truncate">
          Organizer Dashboard
        </h1>
      </div>

      <div className="flex items-center gap-1.5 sm:gap-3 justify-end shrink-0">
        <div className="relative hidden lg:block">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search..." 
            className="w-48 xl:w-64 bg-vol-card border border-vol-border rounded-full py-1.5 pl-9 pr-4 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-vol-accent2/50 transition-colors"
          />
        </div>

        <button className="hidden sm:flex items-center gap-2 bg-vol-accent hover:bg-vol-accent2 text-white px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-colors shadow-glow-lg cursor-pointer">
          <Plus size={16} />
          <span>Quick-Add</span>
        </button>

        {onCustomizeClick && (
          <button 
            onClick={onCustomizeClick}
            className="hidden sm:flex items-center gap-2 bg-vol-card hover:bg-vol-card/80 border border-vol-border text-gray-200 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-colors cursor-pointer"
          >
            <SlidersHorizontal size={16} />
            <span>Customize</span>
          </button>
        )}

        <button 
          aria-label="Notifications" 
          className="relative p-2 rounded-full text-gray-400 hover:text-white hover:bg-vol-card transition-colors cursor-pointer touch-manipulation"
        >
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-vol-warning border-2 border-vol-bg"></span>
        </button>

        {/* Switch Role Button */}
        <SwitchRoleButton currentRole="Organizer" />

        {/* Profile Dropdown Menu */}
        <ProfileDropdown currentRole="Organizer" />
      </div>
    </header>
  );
}
