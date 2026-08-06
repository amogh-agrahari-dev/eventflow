import { CalendarDays, Github, Twitter, Linkedin, Mail } from 'lucide-react';
import Link from 'next/link';
import Logo from '@/components/general/Logo';
import React from 'react';

export default function Footer() {
  return (
    <footer className="relative border-t border-border/60 bg-gradient-to-b from-background via-muted/30 to-muted/80 pt-16 pb-12 overflow-hidden">
      {/* Top Gradient Accent Line */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent opacity-50" />

      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Col */}
          <div className="space-y-4 md:col-span-1">
            <Logo iconSize={32} />
            <p className="text-xs text-muted-foreground leading-relaxed max-w-xs">
              Centralized campus event management, live QR gate check-ins, volunteer tasking, and real-time attendance analytics.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-bold text-sm text-foreground mb-3">Platform</h4>
            <ul className="space-y-2 text-xs font-medium text-muted-foreground">
              <li><Link href="/dashboard" className="hover:text-accent transition-colors">Organizer Dashboard</Link></li>
              <li><Link href="/volunteer/dashboard" className="hover:text-accent transition-colors">Volunteer Portal</Link></li>
              <li><Link href="/invitee/dashboard" className="hover:text-accent transition-colors">Invitee Pass Hub</Link></li>
              <li><Link href="/events/add" className="hover:text-accent transition-colors">Create Event</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold text-sm text-foreground mb-3">Features</h4>
            <ul className="space-y-2 text-xs font-medium text-muted-foreground">
              <li><span className="hover:text-foreground transition-colors cursor-default">QR Code Gate Check-in</span></li>
              <li><span className="hover:text-foreground transition-colors cursor-default">Live Attendance Analytics</span></li>
              <li><span className="hover:text-foreground transition-colors cursor-default">Volunteer Tasking</span></li>
              <li><span className="hover:text-foreground transition-colors cursor-default">Broadcast Announcements</span></li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="font-display font-bold text-sm text-foreground mb-3">Connect</h4>
            <div className="flex items-center gap-3">
              <a href="#" className="p-2.5 rounded-xl border border-border/80 bg-card/80 text-muted-foreground hover:text-accent hover:border-accent/40 hover:scale-110 transition-all shadow-xs" title="GitHub">
                <Github className="w-4 h-4" />
              </a>
              <a href="#" className="p-2.5 rounded-xl border border-border/80 bg-card/80 text-muted-foreground hover:text-accent hover:border-accent/40 hover:scale-110 transition-all shadow-xs" title="Twitter">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="p-2.5 rounded-xl border border-border/80 bg-card/80 text-muted-foreground hover:text-accent hover:border-accent/40 hover:scale-110 transition-all shadow-xs" title="LinkedIn">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="p-2.5 rounded-xl border border-border/80 bg-card/80 text-muted-foreground hover:text-accent hover:border-accent/40 hover:scale-110 transition-all shadow-xs" title="Contact Support">
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="text-xs text-muted-foreground border-t border-border/60 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 font-medium">
          <p>&copy; {new Date().getFullYear()} EventFlow Campus Portal. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            Designed for scale • Built with Stripe/Vercel-level polish
          </p>
        </div>
      </div>
    </footer>
  );
}
