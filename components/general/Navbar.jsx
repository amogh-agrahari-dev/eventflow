import { getToken } from '@/lib/auth';
import { Button } from '@/components/ui';
import { CalendarDays, ChevronDown, LogOut, LayoutDashboard, UserCircle2, PlusCircle, ShieldCheck, Ticket, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import { useUserStore } from '@/store/userStore';

export default function Navbar() {
  const { user, fetchUser, logout } = useUserStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const router = useRouter();
  const token = getToken();

  useEffect(() => {
    if (token && !user) {
      fetchUser();
    }
  }, [token, user, fetchUser]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  function handleLogout() {
    logout();
    setIsMenuOpen(false);
    router.push('/auth/login');
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl shadow-xs">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/">
          <div className="flex items-center gap-2.5 group cursor-pointer">
            <div className="bg-gradient-to-r from-accent to-indigo-600 text-slate-950 p-2 rounded-xl shadow-md group-hover:scale-105 transition-transform duration-300">
              <CalendarDays className="h-5 w-5" />
            </div>
            <span className="font-display font-extrabold text-xl tracking-tight text-foreground group-hover:text-accent transition-colors">
              EventFlow
            </span>
          </div>
        </Link>

        {/* User Account / Sign In */}
        <div className="flex items-center gap-2">
          {user ? (
            <div className="relative flex items-center gap-2" ref={menuRef}>
              <button
                onClick={() => setIsMenuOpen(prev => !prev)}
                className="flex items-center gap-2.5 rounded-full border border-border/80 bg-background/90 px-3.5 py-2 shadow-sm transition-all hover:shadow-md hover:border-accent/40 cursor-pointer"
              >
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-r from-accent to-indigo-600 text-xs font-bold text-slate-950">
                  {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                </div>
                <span className="hidden sm:inline text-xs font-bold text-foreground">{user?.name || 'User'}</span>
                <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
              </button>

              {/* Mobile Menu Toggle for Logged In User */}
              <button
                className="md:hidden p-2 text-foreground ml-1"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>

              {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-52 rounded-2xl border border-border/80 bg-card p-2 shadow-2xl backdrop-blur-xl animate-fade-in">
                  <Link
                    href="/select-role"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-xs font-semibold text-muted-foreground transition-all hover:bg-muted hover:text-foreground"
                  >
                    <LayoutDashboard className="h-4 w-4 text-accent" />
                    Switch Role
                  </Link>
                  <Link
                    href="/events/add"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-xs font-semibold text-muted-foreground transition-all hover:bg-muted hover:text-foreground"
                  >
                    <PlusCircle className="h-4 w-4 text-accent" />
                    Create Event
                  </Link>
                  <div className="my-1 border-t border-border/60" />
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-xs font-semibold text-red-600 transition-all hover:bg-red-500/10 cursor-pointer"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/auth/login">
                <Button variant="outline" className="rounded-xl px-4 py-2 text-xs font-bold shadow-sm transition-all hover:bg-muted hidden sm:flex">
                  Sign In
                </Button>
              </Link>
              <Link href="/auth/register">
                <Button className="rounded-xl bg-gradient-to-r from-accent to-indigo-600 px-4 py-2 text-xs font-bold text-slate-950 shadow-md transition-all hover:scale-105 hover:shadow-lg hidden sm:flex">
                  Get Started
                </Button>
              </Link>

              {/* Mobile Menu Toggle */}
              <button
                className="md:hidden p-2 text-foreground ml-2"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-border/60 bg-background/95 backdrop-blur-xl absolute top-full left-0 right-0 p-4 flex flex-col gap-2 shadow-xl">
          <Link
            href="/select-role"
            onClick={() => setIsMobileMenuOpen(false)}
            className="px-4 py-3 text-sm font-bold rounded-xl bg-muted/30 hover:bg-muted transition-colors flex items-center gap-3"
          >
            <LayoutDashboard className="w-4 h-4 text-accent" />
            Switch Role
          </Link>
          {!user && (
            <div className="grid grid-cols-2 gap-2 mt-2 pt-2 border-t border-border/60">
              <Link href="/auth/login" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="outline" className="w-full rounded-xl">Sign In</Button>
              </Link>
              <Link href="/auth/register" onClick={() => setIsMobileMenuOpen(false)}>
                <Button className="w-full rounded-xl bg-gradient-to-r from-accent to-indigo-600 text-slate-950">Get Started</Button>
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
