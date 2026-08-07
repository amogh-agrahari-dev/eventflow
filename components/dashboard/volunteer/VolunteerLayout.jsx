import React, { useState } from 'react';
import VolunteerSidebar from './VolunteerSidebar';
import VolunteerHeader from './VolunteerHeader';
import { motion } from 'framer-motion';

export default function VolunteerLayout({ children, title }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  return (
    <div className="flex h-screen bg-[#06090F] overflow-hidden text-white font-sans selection:bg-vol-accent2/30">
      <VolunteerSidebar isCollapsed={isCollapsed} />
      
      <div className="flex-1 flex flex-col h-screen overflow-hidden relative">
        <VolunteerHeader toggleSidebar={toggleSidebar} title={title} />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 scroll-smooth">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="mx-auto w-full max-w-7xl"
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
}
