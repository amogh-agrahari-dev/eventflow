import React, { useState } from 'react';
import Sidebar from '@/components/general/Sidebar';
import OrganizerHeader from './OrganizerHeader';
import { motion } from 'framer-motion';

export default function OrganizerLayout({ children, onCustomizeClick }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDesktopSidebarCollapsed, setIsDesktopSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    // For desktop toggle
    setIsDesktopSidebarCollapsed(!isDesktopSidebarCollapsed);
  };
  
  const toggleMobileSidebar = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="flex h-screen bg-vol-bg overflow-hidden text-white font-sans selection:bg-vol-accent2/30">
      
      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <Sidebar isMobileMenuOpen={isMobileMenuOpen} isDesktopSidebarCollapsed={isDesktopSidebarCollapsed} />
      
      <div className="flex-1 flex flex-col h-screen overflow-hidden relative">
        <OrganizerHeader toggleSidebar={toggleSidebar} toggleMobileSidebar={toggleMobileSidebar} onCustomizeClick={onCustomizeClick} />
        
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
