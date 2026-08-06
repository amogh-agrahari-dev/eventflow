import React from 'react';
import { Menu, Search, Plus, Settings2, Bell } from 'lucide-react';

export default function VolunteerHeader({ toggleSidebar }) {
  return (
    <header className="h-[72px] shrink-0 border-b border-vol-border/50 bg-vol-bg/95 backdrop-blur z-10 flex items-center justify-between px-6 sticky top-0">
      <div className="flex items-center gap-4">
        <button 
          onClick={toggleSidebar}
          className="p-2 -ml-2 rounded-lg text-gray-400 hover:text-white hover:bg-vol-card transition-colors"
        >
          <Menu size={20} />
        </button>
        <h1 className="text-xl font-semibold text-white">Volunteer Dashboard</h1>
      </div>

      <div className="flex items-center gap-4">
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
          <span>Quick-Add</span>
        </button>

        <button className="flex items-center gap-2 bg-vol-card hover:bg-vol-card/80 border border-vol-border text-gray-200 px-4 py-2 rounded-full text-sm font-medium transition-colors hidden sm:flex">
          <Settings2 size={16} />
          <span>Customize</span>
        </button>

        <button className="relative p-2 rounded-full text-gray-400 hover:text-white hover:bg-vol-card transition-colors">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-vol-warning border-2 border-vol-bg"></span>
        </button>

        <button className="w-8 h-8 rounded-full bg-vol-accent/20 border border-vol-accent2/30 flex items-center justify-center text-vol-accent2 font-semibold text-sm hover:bg-vol-accent/30 transition-colors">
          V
        </button>
      </div>
    </header>
  );
}
