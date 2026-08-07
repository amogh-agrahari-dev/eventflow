import React from 'react';
import Link from 'next/link';

export default function Logo({ className = "", textClassName = "", iconSize = 36, href = "/select-role" }) {
  const content = (
    <div className={`flex items-center gap-3 group cursor-pointer select-none ${className}`}>
      {/* SVG Icon */}
      <svg
        width={iconSize}
        height={iconSize}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 group-hover:scale-105 transition-transform duration-300"
      >
        <defs>
          <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00E5FF" />
            <stop offset="100%" stopColor="#8C52FF" />
          </linearGradient>
        </defs>

        {/* Calendar Body */}
        <rect x="12" y="22" width="76" height="66" rx="14" stroke="url(#logoGradient)" strokeWidth="8" />

        {/* Calendar Top Line (Header separator) */}
        <line x1="12" y1="42" x2="88" y2="42" stroke="url(#logoGradient)" strokeWidth="4" />

        {/* Calendar Pins */}
        <rect x="28" y="10" width="10" height="16" rx="5" fill="url(#logoGradient)" />
        <rect x="62" y="10" width="10" height="16" rx="5" fill="url(#logoGradient)" />

        {/* Inner H - Left vertical line */}
        <line x1="36" y1="52" x2="36" y2="76" stroke="url(#logoGradient)" strokeWidth="5" strokeLinecap="round" />
        {/* Inner H - Left dots */}
        <circle cx="36" cy="52" r="4.5" fill="url(#logoGradient)" />
        <circle cx="36" cy="76" r="4.5" fill="url(#logoGradient)" />

        {/* Inner H - Right vertical line */}
        <line x1="64" y1="52" x2="64" y2="76" stroke="url(#logoGradient)" strokeWidth="5" strokeLinecap="round" />
        {/* Inner H - Right dots */}
        <circle cx="64" cy="52" r="4.5" fill="url(#logoGradient)" />
        <circle cx="64" cy="76" r="4.5" fill="url(#logoGradient)" />

        {/* Inner H - Connecting Swoosh */}
        <path d="M 36 64 C 50 56, 50 72, 64 64" stroke="url(#logoGradient)" strokeWidth="5" strokeLinecap="round" fill="none" />
      </svg>

      {/* Text */}
      <div className={`font-sans font-bold tracking-tight flex items-center ${textClassName}`} style={{ fontSize: iconSize * 0.9 }}>
        <span className="text-white">Event</span>
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00E5FF] to-[#8C52FF]">Flow</span>
      </div>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="inline-block">
        {content}
      </Link>
    );
  }

  return content;
}
