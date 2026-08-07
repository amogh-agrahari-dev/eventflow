import React, { useState, useEffect } from 'react';
import AttendeeSidebar from './AttendeeSidebar';
import AttendeeHeader from './AttendeeHeader';
import { motion } from 'framer-motion';
import { useUserStore } from '@/store/userStore';
import { getToken } from '@/lib/auth';

export default function AttendeeLayout({ children }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { user, fetchUser } = useUserStore();

  useEffect(() => {
    const token = getToken();
    if (token && !user) {
      fetchUser();
    }
  }, [user, fetchUser]);

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  return (
    <div className="flex h-screen bg-vol-bg overflow-hidden text-white font-sans selection:bg-vol-accent2/30">
      <AttendeeSidebar isCollapsed={isCollapsed} />
      
      <div className="flex-1 flex flex-col h-screen overflow-hidden relative min-w-0 bg-vol-bg">
        <AttendeeHeader toggleSidebar={toggleSidebar} />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 custom-scrollbar scroll-smooth">
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
