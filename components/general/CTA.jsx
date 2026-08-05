import Link from 'next/link';
import React from 'react';
import { ArrowRight, Zap } from 'lucide-react';

export default function CTA() {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-24">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-brand px-8 py-20 text-center sm:px-16">
        {/* Grid overlay */}
        <div className="absolute inset-0 bg-grid-faint" aria-hidden="true" />

        {/* Ambient blobs */}
        <div className="absolute -top-16 -left-16 w-64 h-64 bg-accent/20 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />
        <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />

        <div className="relative">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/15 border border-accent/25 text-accent text-xs font-bold mb-6">
            <Zap className="w-3.5 h-3.5" />
            Start for free
          </div>

          <h2 className="font-display text-4xl font-extrabold text-primary-foreground sm:text-5xl mb-4">
            Ready for your next event?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-primary-foreground/70">
            Set up your portal, invite volunteers and start issuing QR passes today.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href="/auth/register"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-accent text-slate-950 font-bold text-sm shadow-xl shadow-accent/30 hover:shadow-accent/50 hover:scale-[1.04] active:scale-[0.98] transition-all duration-300"
            >
              <Zap className="w-4 h-4" />
              Create an account
            </Link>
            <Link
              href="/auth/login"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl border border-white/20 text-primary-foreground/80 font-bold text-sm hover:bg-white/10 hover:text-white hover:border-white/30 transition-all duration-300"
            >
              Sign in
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
