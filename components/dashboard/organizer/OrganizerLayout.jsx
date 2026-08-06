import React, { useState } from 'react';
import OrganizerSidebar from './OrganizerSidebar';
import OrganizerHeader from './OrganizerHeader';
import { motion } from 'framer-motion';

export default function OrganizerLayout({ children, onCustomizeClick }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  return (
    <div className="flex h-screen bg-vol-bg overflow-hidden text-white font-sans selection:bg-vol-accent2/30">
      <OrganizerSidebar isCollapsed={isCollapsed} />
      
      <div className="flex-1 flex flex-col h-screen overflow-hidden relative">
        <OrganizerHeader toggleSidebar={toggleSidebar} onCustomizeClick={onCustomizeClick} />
        
        <main className="flex-1 flex flex-col overflow-hidden relative">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="flex-1 flex flex-col h-full"
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
}
