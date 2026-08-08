import React, { useState } from 'react';
import VolunteerSidebar from './VolunteerSidebar';
import VolunteerHeader from './VolunteerHeader';
import MobileBottomNav from '@/components/general/MobileBottomNav';
import { motion } from 'framer-motion';

export default function VolunteerLayout({ children, title }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);
  const toggleMobileSidebar = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <div className="flex h-screen bg-[#06090F] overflow-hidden text-white font-sans selection:bg-vol-accent2/30">
      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <VolunteerSidebar 
        isCollapsed={isCollapsed} 
        isMobileMenuOpen={isMobileMenuOpen}
        onCloseMobileMenu={() => setIsMobileMenuOpen(false)}
      />
      
      <div className="flex-1 flex flex-col h-screen overflow-hidden relative pb-16 md:pb-0">
        <VolunteerHeader 
          toggleSidebar={toggleSidebar} 
          toggleMobileSidebar={toggleMobileSidebar}
          title={title} 
        />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 scroll-smooth custom-scrollbar">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="mx-auto w-full max-w-7xl"
          >
            {children}
          </motion.div>
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav role="volunteer" />
    </div>
  );
}
