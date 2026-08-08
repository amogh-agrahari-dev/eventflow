import React, { useState, useEffect } from 'react';
import AttendeeSidebar from './AttendeeSidebar';
import AttendeeHeader from './AttendeeHeader';
import MobileBottomNav from '@/components/general/MobileBottomNav';
import { motion } from 'framer-motion';
import { useUserStore } from '@/store/userStore';
import { getToken } from '@/lib/auth';

export default function AttendeeLayout({ children }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, fetchUser } = useUserStore();

  useEffect(() => {
    const token = getToken();
    if (token && !user) {
      fetchUser();
    }
  }, [user, fetchUser]);

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);
  const toggleMobileSidebar = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <div className="flex h-screen bg-vol-bg overflow-hidden text-white font-sans selection:bg-vol-accent2/30">
      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <AttendeeSidebar 
        isCollapsed={isCollapsed} 
        isMobileMenuOpen={isMobileMenuOpen}
        onCloseMobileMenu={() => setIsMobileMenuOpen(false)}
      />
      
      <div className="flex-1 flex flex-col h-screen overflow-hidden relative min-w-0 bg-vol-bg pb-16 md:pb-0">
        <AttendeeHeader 
          toggleSidebar={toggleSidebar} 
          toggleMobileSidebar={toggleMobileSidebar}
        />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 custom-scrollbar scroll-smooth">
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
      <MobileBottomNav role="attendee" />
    </div>
  );
}
