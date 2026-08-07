import React from 'react';
import Link from 'next/link';
import { ArrowLeftRight, Sparkles } from 'lucide-react';

export default function SwitchRoleButton({ className = '', currentRole }) {
  return (
    <Link
      href="/select-role"
      aria-label="Switch User Role"
      className={`group relative inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#161B23]/90 hover:bg-[#1C2333] border border-[#6E56CF]/40 hover:border-[#00E5FF]/60 text-slate-200 hover:text-white transition-all duration-300 shadow-sm hover:shadow-[0_0_18px_rgba(110,86,207,0.35)] active:scale-95 cursor-pointer ${className}`}
    >
      <div className="w-5 h-5 rounded-full bg-[#6E56CF]/20 flex items-center justify-center text-[#00E5FF] group-hover:rotate-180 transition-transform duration-500">
        <ArrowLeftRight className="w-3 h-3" />
      </div>
      <span className="hidden sm:inline font-medium tracking-wide">
        Switch Role
      </span>
      <span className="sm:hidden font-medium">Role</span>
      {/* Subtle pulse indicator on hover */}
      <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF] opacity-75 group-hover:animate-ping" />
    </Link>
  );
}
