import { getToken, removeToken } from '@/lib/auth';
import { Button } from '@/components/ui';
import { CalendarDays, ChevronDown, LogOut, LayoutDashboard, UserCircle2, PlusCircle, ShieldCheck, Ticket } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const router = useRouter();
  const token = getToken();

  function protected1() {
    fetch('https://eventflow-backend-0ctf.onrender.com/users/me', {
      headers: {
        'Authorization': `bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(data => setUser(data))
      .catch(error => console.error('Error:', error));
  }

  useEffect(() => {
    if (token) {
      protected1();
    }
  }, [token]);

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
    removeToken();
    setUser(null);
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

        {/* Quick Hub Navigation Links */}
        <div className="hidden md:flex items-center gap-1 bg-muted/60 p-1.5 rounded-2xl border border-border/60">
          <Link
            href="/dashboard"
            className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all ${
              router.pathname.startsWith('/organizer') || router.pathname === '/dashboard' || router.pathname === '/home' || router.pathname === '/organizer-dashboard'
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Organizer Hub
          </Link>
          <Link
            href="/volunteer/dashboard"
            className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all ${
              router.pathname.startsWith('/volunteer')
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Volunteer Portal
          </Link>
          <Link
            href="/invitee/dashboard"
            className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all ${
              router.pathname.startsWith('/invitee')
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Invitee Passes
          </Link>
        </div>

        {/* User Account / Sign In */}
        {user ? (
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setIsMenuOpen(prev => !prev)}
              className="flex items-center gap-2.5 rounded-full border border-border/80 bg-background/90 px-3.5 py-2 shadow-sm transition-all hover:shadow-md hover:border-accent/40 cursor-pointer"
            >
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-r from-accent to-indigo-600 text-xs font-bold text-slate-950">
                {user?.name?.charAt(0)?.toUpperCase() || 'U'}
              </div>
              <span className="text-xs font-bold text-foreground">{user?.name || 'User'}</span>
              <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
            </button>

            {isMenuOpen && (
              <div className="absolute right-0 mt-2 w-52 rounded-2xl border border-border/80 bg-card p-2 shadow-2xl backdrop-blur-xl animate-fade-in">
                <Link
                  href="/dashboard"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-xs font-semibold text-muted-foreground transition-all hover:bg-muted hover:text-foreground"
                >
                  <LayoutDashboard className="h-4 w-4 text-accent" />
                  Organizer Hub
                </Link>
                <Link
                  href="/volunteer/dashboard"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-xs font-semibold text-muted-foreground transition-all hover:bg-muted hover:text-foreground"
                >
                  <ShieldCheck className="h-4 w-4 text-accent" />
                  Volunteer Portal
                </Link>
                <Link
                  href="/invitee/dashboard"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-xs font-semibold text-muted-foreground transition-all hover:bg-muted hover:text-foreground"
                >
                  <Ticket className="h-4 w-4 text-accent" />
                  Invitee Passes
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
          <div className="flex items-center gap-4">
            <Link href="/auth/login" className="text-xs font-bold text-muted-foreground hover:text-foreground transition-colors">
              Sign In
            </Link>
            <Link href="/auth/register">
              <Button size="sm" variant="hero" className="rounded-xl text-xs px-4 h-9 shadow-md">
                Get Started
              </Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
