import React from 'react';
import { Menu, Search, Plus, SlidersHorizontal, Bell } from 'lucide-react';
import { useUserStore } from '@/store/userStore';

export default function OrganizerHeader({ toggleSidebar, onCustomizeClick }) {
  const { user } = useUserStore();

  return (
    <header className="h-[72px] shrink-0 border-b border-vol-border/50 bg-vol-bg/95 backdrop-blur z-10 flex items-center justify-between px-6 sticky top-0">
      <div className="flex items-center gap-4">
        <button 
          onClick={toggleSidebar}
          className="p-2 -ml-2 rounded-lg text-gray-400 hover:text-white hover:bg-vol-card transition-colors"
        >
          <Menu size={20} />
        </button>
        <h1 className="text-xl font-semibold text-white">
          {user?.name ? `${user.name}'s Dashboard` : "Organizer Dashboard"}
        </h1>
      </div>

      <div className="flex items-center gap-2 md:gap-4 flex-1 justify-end min-w-0">
        <div className="relative hidden md:block">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search..." 
            className="w-64 bg-vol-card border border-vol-border rounded-full py-2 pl-9 pr-4 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-vol-accent2/50 transition-colors"
          />
        </div>

        <button className="flex items-center gap-2 bg-vol-accent hover:bg-vol-accent2 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors shadow-glow-lg">
          <Plus size={16} />
          <span className="hidden sm:inline">Quick-Add</span>
        </button>

        <button 
          onClick={onCustomizeClick}
          className="flex items-center gap-2 bg-vol-card hover:bg-vol-card/80 border border-vol-border text-gray-200 px-4 py-2 rounded-full text-sm font-medium transition-colors"
        >
          <SlidersHorizontal size={16} />
          <span className="hidden sm:inline">Customize</span>
        </button>

        <button className="relative p-2 rounded-full text-gray-400 hover:text-white hover:bg-vol-card transition-colors">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-vol-warning border-2 border-vol-bg"></span>
        </button>

        <div className="w-8 h-8 rounded-full bg-vol-accent/20 border border-vol-accent2/30 flex items-center justify-center text-vol-accent2 font-bold text-sm shadow-sm cursor-pointer hover:bg-vol-accent/30 transition-colors">
          {user?.name ? user.name.split(" ").map(n => n[0]).join("").toUpperCase() : "U"}
        </div>
      </div>
    </header>
  );
}
