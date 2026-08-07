import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User, Settings, ArrowLeftRight, Bell, HelpCircle,
  ShieldCheck, Palette, Keyboard, Info, LogOut,
  ChevronRight, AlertTriangle, X, Sparkles
} from 'lucide-react';
import { useUserStore } from '@/store/userStore';
import { getToken } from '@/lib/auth';

export default function ProfileDropdown({
  currentRole: propRole,
  align = 'right',
  className = '',
}) {
  const router = useRouter();
  const { user, fetchUser, logout } = useUserStore();
  const [isOpen, setIsOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showShortcutsModal, setShowShortcutsModal] = useState(false);
  const [showAboutModal, setShowAboutModal] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [mounted, setMounted] = useState(false);
  const dropdownRef = useRef(null);
  const token = getToken();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (token && !user) {
      fetchUser();
    }
  }, [token, user, fetchUser]);

  // Determine active role dynamically from router or prop
  const getActiveRole = () => {
    if (propRole) return propRole;
    const path = router.pathname;
    if (path.includes('volunteer')) return 'Volunteer';
    if (path.includes('attendee')) return 'Attendee';
    if (path.includes('organiser') || path.includes('organizer') || path.includes('events') || path.includes('directory')) {
      return 'Organizer';
    }
    return user?.role ? (user.role.charAt(0).toUpperCase() + user.role.slice(1)) : 'Organizer';
  };

  const activeRole = getActiveRole();

  const getRoleBadgeStyle = (role) => {
    switch (role?.toLowerCase()) {
      case 'volunteer':
        return {
          bg: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
          dot: 'bg-emerald-400',
        };
      case 'attendee':
        return {
          bg: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
          dot: 'bg-amber-400',
        };
      case 'organizer':
      default:
        return {
          bg: 'bg-[#6E56CF]/20 text-[#A78BFA] border-[#6E56CF]/40',
          dot: 'bg-[#00E5FF]',
        };
    }
  };

  const roleStyle = getRoleBadgeStyle(activeRole);

  // Close on Click Outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Close on Escape Key
  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        if (showLogoutConfirm) {
          setShowLogoutConfirm(false);
        } else if (showShortcutsModal) {
          setShowShortcutsModal(false);
        } else if (showAboutModal) {
          setShowAboutModal(false);
        } else if (showHelpModal) {
          setShowHelpModal(false);
        } else if (isOpen) {
          setIsOpen(false);
        }
      }
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, showLogoutConfirm, showShortcutsModal, showAboutModal, showHelpModal]);

  const handleNavigate = (path) => {
    setIsOpen(false);
    router.push(path);
  };

  const handleConfirmLogout = () => {
    setShowLogoutConfirm(false);
    setIsOpen(false);
    logout();
    router.push('/auth/login');
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    const parts = name.trim().split(' ');
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  const userName = user?.name || 'Amogh Agrahari';
  const userEmail = user?.email || 'amogh@example.com';
  const userInitials = getInitials(userName);

  return (
    <div className={`relative inline-block text-left ${className}`} ref={dropdownRef}>
      {/* Profile Avatar Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-label="User Profile and Account Menu"
        className="group relative flex items-center justify-center p-0.5 rounded-full focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/60 focus:ring-offset-2 focus:ring-offset-[#06090F] transition-transform active:scale-95 cursor-pointer"
      >
        {/* Glowing Gradient Ring */}
        <div className="relative w-8 h-8 rounded-full p-[1.5px] bg-gradient-to-tr from-[#6E56CF] via-[#3B82F6] to-[#00E5FF] group-hover:shadow-[0_0_15px_rgba(0,229,255,0.4)] transition-all duration-300">
          <div className="w-full h-full rounded-full bg-[#0F1319] flex items-center justify-center text-xs font-bold text-white tracking-wider">
            {userInitials}
          </div>
        </div>

        {/* Online Indicator Badge on Avatar */}
        <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-[#0F1319]" />
      </button>

      {/* Animated Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -8 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            role="menu"
            aria-orientation="vertical"
            className={`absolute ${
              align === 'right' ? 'right-0' : 'left-0'
            } mt-3 w-80 rounded-2xl bg-[#0F1319]/95 backdrop-blur-2xl border border-[#232B3E] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.9),0_0_25px_rgba(110,86,207,0.18)] text-slate-200 z-50 overflow-hidden focus:outline-none`}
          >
            {/* Header: User Avatar, Name, Email, Active Role & Online Status */}
            <div className="p-4 bg-gradient-to-b from-[#181F2E]/80 to-[#0F1319]/90 border-b border-[#232B3E]">
              <div className="flex items-center gap-3.5">
                {/* Large Avatar */}
                <div className="relative shrink-0">
                  <div className="w-12 h-12 rounded-2xl p-[2px] bg-gradient-to-br from-[#6E56CF] via-[#3B82F6] to-[#00E5FF] shadow-lg shadow-[#6E56CF]/25">
                    <div className="w-full h-full rounded-[14px] bg-[#0B0E14] flex items-center justify-center text-base font-bold text-white tracking-wider">
                      {userInitials}
                    </div>
                  </div>
                  <span className="absolute -bottom-1 -right-1 block h-3.5 w-3.5 rounded-full bg-emerald-500 ring-2 ring-[#0B0E14]" />
                </div>

                {/* User Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <h3 className="text-sm font-semibold text-white truncate tracking-tight">
                      {userName}
                    </h3>
                  </div>
                  <p className="text-xs text-slate-400 truncate mt-0.5" title={userEmail}>
                    {userEmail}
                  </p>

                  <div className="flex items-center gap-2 mt-2">
                    {/* Active Role Badge */}
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${roleStyle.bg}`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${roleStyle.dot}`} />
                      {activeRole}
                    </span>

                    {/* Online Status */}
                    <span className="inline-flex items-center text-[11px] font-medium text-emerald-400">
                      <span className="relative flex h-2 w-2 mr-1">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                      </span>
                      Online
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Menu Items Container */}
            <div className="p-2 space-y-1 max-h-[calc(100vh-200px)] overflow-y-auto custom-scrollbar text-[13px]">
              
              {/* Group 1: Profile & Account */}
              <div className="py-1">
                <button
                  role="menuitem"
                  onClick={() => handleNavigate('/settings')}
                  className="group flex items-center justify-between w-full px-3 py-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/[0.07] transition-all duration-150 cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 group-hover:scale-105 transition-transform">
                      <User className="w-4 h-4" />
                    </div>
                    <div className="text-left">
                      <span className="font-medium">My Profile</span>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-slate-300 group-hover:translate-x-0.5 transition-all" />
                </button>

                <button
                  role="menuitem"
                  onClick={() => handleNavigate('/settings')}
                  className="group flex items-center justify-between w-full px-3 py-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/[0.07] transition-all duration-150 cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 group-hover:scale-105 transition-transform">
                      <Settings className="w-4 h-4" />
                    </div>
                    <div className="text-left">
                      <span className="font-medium">Account Settings</span>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-slate-300 group-hover:translate-x-0.5 transition-all" />
                </button>
              </div>

              <div className="h-px bg-[#232B3E] my-1" />

              {/* Group 2: Role & Notifications */}
              <div className="py-1">
                <button
                  role="menuitem"
                  onClick={() => handleNavigate('/select-role')}
                  className="group flex items-center justify-between w-full px-3 py-2 rounded-xl text-slate-300 hover:text-white hover:bg-gradient-to-r hover:from-[#6E56CF]/20 hover:to-[#00E5FF]/10 transition-all duration-150 border border-transparent hover:border-[#6E56CF]/30 cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#6E56CF]/20 border border-[#6E56CF]/30 flex items-center justify-center text-[#00E5FF] group-hover:scale-105 transition-transform shadow-[0_0_10px_rgba(110,86,207,0.3)]">
                      <ArrowLeftRight className="w-4 h-4" />
                    </div>
                    <div className="text-left">
                      <span className="font-semibold text-white">Switch Role</span>
                      <p className="text-[11px] text-slate-400">Organizer • Volunteer • Attendee</p>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 text-[10px] font-bold uppercase rounded-md bg-[#6E56CF]/30 text-[#00E5FF] border border-[#6E56CF]/40">
                    3 Hubs
                  </span>
                </button>

                <button
                  role="menuitem"
                  onClick={() => handleNavigate('/settings')}
                  className="group flex items-center justify-between w-full px-3 py-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/[0.07] transition-all duration-150 cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 group-hover:scale-105 transition-transform">
                      <Bell className="w-4 h-4" />
                    </div>
                    <div className="text-left">
                      <span className="font-medium">Notifications</span>
                    </div>
                  </div>
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                </button>
              </div>

              <div className="h-px bg-[#232B3E] my-1" />

              {/* Group 3: Privacy, Theme, Shortcuts, Help & About */}
              <div className="py-1">
                <button
                  role="menuitem"
                  onClick={() => handleNavigate('/settings')}
                  className="group flex items-center justify-between w-full px-3 py-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/[0.07] transition-all duration-150 cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 group-hover:scale-105 transition-transform">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div className="text-left">
                      <span className="font-medium">Privacy & Security</span>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-slate-300 group-hover:translate-x-0.5 transition-all" />
                </button>

                <button
                  role="menuitem"
                  onClick={() => handleNavigate('/settings')}
                  className="group flex items-center justify-between w-full px-3 py-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/[0.07] transition-all duration-150 cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400 group-hover:scale-105 transition-transform">
                      <Palette className="w-4 h-4" />
                    </div>
                    <div className="text-left">
                      <span className="font-medium">Theme Preferences</span>
                    </div>
                  </div>
                  <span className="text-[11px] text-slate-400 font-medium">Dark Mode</span>
                </button>

                <button
                  role="menuitem"
                  onClick={() => {
                    setIsOpen(false);
                    setShowShortcutsModal(true);
                  }}
                  className="group flex items-center justify-between w-full px-3 py-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/[0.07] transition-all duration-150 cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 group-hover:scale-105 transition-transform">
                      <Keyboard className="w-4 h-4" />
                    </div>
                    <div className="text-left">
                      <span className="font-medium">Keyboard Shortcuts</span>
                    </div>
                  </div>
                  <kbd className="px-1.5 py-0.5 text-[10px] font-mono bg-[#1C2333] border border-[#2A303C] rounded text-slate-400">
                    ⌘K
                  </kbd>
                </button>

                <button
                  role="menuitem"
                  onClick={() => {
                    setIsOpen(false);
                    setShowHelpModal(true);
                  }}
                  className="group flex items-center justify-between w-full px-3 py-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/[0.07] transition-all duration-150 cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 group-hover:scale-105 transition-transform">
                      <HelpCircle className="w-4 h-4" />
                    </div>
                    <div className="text-left">
                      <span className="font-medium">Help & Support</span>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-slate-300 group-hover:translate-x-0.5 transition-all" />
                </button>

                <button
                  role="menuitem"
                  onClick={() => {
                    setIsOpen(false);
                    setShowAboutModal(true);
                  }}
                  className="group flex items-center justify-between w-full px-3 py-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/[0.07] transition-all duration-150 cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 group-hover:scale-105 transition-transform">
                      <Info className="w-4 h-4" />
                    </div>
                    <div className="text-left">
                      <span className="font-medium">About EventFlow</span>
                    </div>
                  </div>
                  <span className="text-[11px] text-slate-500">v2.4</span>
                </button>
              </div>

              <div className="h-px bg-[#232B3E] my-1" />

              {/* Group 4: Logout (Red Accent with Confirmation) */}
              <div className="pt-1 pb-0.5">
                <button
                  role="menuitem"
                  onClick={() => {
                    setIsOpen(false);
                    setShowLogoutConfirm(true);
                  }}
                  className="group flex items-center justify-between w-full px-3 py-2.5 rounded-xl text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 border border-transparent hover:border-rose-500/30 transition-all duration-150 cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 group-hover:scale-105 transition-transform">
                      <LogOut className="w-4 h-4" />
                    </div>
                    <span className="font-semibold text-rose-400 group-hover:text-rose-300">
                      Logout
                    </span>
                  </div>
                  <span className="text-[11px] text-rose-400/70 font-medium">End Session</span>
                </button>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Portaled Modals */}
      {mounted && typeof document !== 'undefined' && createPortal(
        <>
          {/* Logout Confirmation Modal */}
      <AnimatePresence>
        {showLogoutConfirm && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowLogoutConfirm(false)}
              className="fixed inset-0 bg-black/75 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-md bg-[#0F1319] border border-rose-500/30 rounded-2xl p-6 shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_30px_rgba(244,63,94,0.2)] text-white z-10 overflow-hidden"
            >
              {/* Subtle Red Top Accent Glow */}
              <div className="absolute -top-12 -left-12 w-32 h-32 bg-rose-500/20 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-rose-500/15 border border-rose-500/30 flex items-center justify-center text-rose-400 shrink-0 shadow-lg shadow-rose-950/40">
                  <AlertTriangle className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-white tracking-tight">
                    Confirm Logout
                  </h3>
                  <p className="text-sm text-slate-300 mt-1 leading-relaxed">
                    Are you sure you want to log out of EventFlow? You will need to sign back in to access your dashboard.
                  </p>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowLogoutConfirm(false)}
                  className="px-4 py-2 rounded-xl text-sm font-semibold text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleConfirmLogout}
                  className="px-5 py-2 rounded-xl text-sm font-semibold text-white bg-rose-600 hover:bg-rose-500 shadow-lg shadow-rose-600/30 hover:shadow-rose-600/50 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Keyboard Shortcuts Modal */}
      <AnimatePresence>
        {showShortcutsModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowShortcutsModal(false)}
              className="fixed inset-0 bg-black/75 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-lg bg-[#0F1319] border border-[#232B3E] rounded-2xl p-6 shadow-2xl text-white z-10"
            >
              <div className="flex items-center justify-between border-b border-[#232B3E] pb-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                    <Keyboard className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">Keyboard Shortcuts</h3>
                    <p className="text-xs text-slate-400">Fast navigation across EventFlow</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowShortcutsModal(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-2.5 text-sm">
                {[
                  { key: '⌘ / Ctrl + K', action: 'Search events & directories' },
                  { key: '⌘ / Ctrl + R', action: 'Switch Active Role' },
                  { key: '⌘ / Ctrl + N', action: 'Quick-Add New Event / Task' },
                  { key: 'Esc', action: 'Close dialogs, menus, and overlays' },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-[#161B23] border border-[#232B3E]"
                  >
                    <span className="text-slate-300 font-medium">{item.action}</span>
                    <kbd className="px-2.5 py-1 text-xs font-mono bg-[#0B0E14] border border-[#2A303C] rounded-lg text-[#00E5FF] font-semibold">
                      {item.key}
                    </kbd>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setShowShortcutsModal(false)}
                  className="px-5 py-2 rounded-xl text-sm font-semibold text-white bg-[#6E56CF] hover:bg-[#5a46aa] transition-colors cursor-pointer"
                >
                  Got It
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Help & Support Modal */}
      <AnimatePresence>
        {showHelpModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowHelpModal(false)}
              className="fixed inset-0 bg-black/75 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-md bg-[#0F1319] border border-[#232B3E] rounded-2xl p-6 shadow-2xl text-white z-10"
            >
              <div className="flex items-center justify-between border-b border-[#232B3E] pb-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400">
                    <HelpCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">Help & Support</h3>
                    <p className="text-xs text-slate-400">EventFlow Assistant & Docs</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowHelpModal(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3 text-sm text-slate-300">
                <p>
                  Need assistance managing campus events, allocating volunteer rosters, or scanning QR tickets?
                </p>
                <div className="p-3 rounded-xl bg-[#161B23] border border-[#232B3E] space-y-1.5">
                  <div className="text-xs font-semibold text-[#00E5FF] uppercase tracking-wider">Quick Channels</div>
                  <div className="text-xs text-slate-400">Email: support@eventflow.campus</div>
                  <div className="text-xs text-slate-400">Documentation: docs.eventflow.internal</div>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setShowHelpModal(false)}
                  className="px-5 py-2 rounded-xl text-sm font-semibold text-white bg-[#6E56CF] hover:bg-[#5a46aa] transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* About Modal */}
      <AnimatePresence>
        {showAboutModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAboutModal(false)}
              className="fixed inset-0 bg-black/75 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-md bg-[#0F1319] border border-[#232B3E] rounded-2xl p-6 shadow-2xl text-white z-10 text-center"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#6E56CF] to-[#00E5FF] p-[2px] mx-auto mb-4 shadow-lg shadow-[#6E56CF]/30">
                <div className="w-full h-full rounded-[14px] bg-[#0F1319] flex items-center justify-center">
                  <Sparkles className="w-7 h-7 text-[#00E5FF]" />
                </div>
              </div>

              <h3 className="text-xl font-bold text-white tracking-tight">
                EventFlow Campus Hub
              </h3>
              <p className="text-xs text-[#00E5FF] font-semibold uppercase tracking-wider mt-1">
                Version 2.4.0 (Enterprise Next.js Edition)
              </p>

              <p className="text-sm text-slate-300 mt-4 leading-relaxed">
                Next-generation unified event operations, multi-tier volunteer allocation, live check-ins, and digital pass ticketing system.
              </p>

              <div className="mt-6 pt-4 border-t border-[#232B3E] flex items-center justify-between text-xs text-slate-400">
                <span>© 2026 EventFlow Portal</span>
                <span className="text-emerald-400 font-medium">● Systems Operational</span>
              </div>

              <button
                onClick={() => setShowAboutModal(false)}
                className="mt-5 w-full py-2.5 rounded-xl text-sm font-semibold text-white bg-[#6E56CF] hover:bg-[#5a46aa] transition-colors cursor-pointer"
              >
                Close
              </button>
            </motion.div>
          </div>
        )}
          </AnimatePresence>
        </>,
        document.body
      )}
    </div>
  );
}
