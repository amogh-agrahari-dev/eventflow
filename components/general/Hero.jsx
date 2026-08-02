import React from 'react'
import {
  ArrowRight,
} from 'lucide-react';
import { Button } from 'components/ui';
import Link from 'next/link';
export default function Hero() {
  return (
     <section className="relative overflow-hidden bg-gradient-brand">
        <div className="absolute inset-0 animate-grid-in bg-grid-faint" aria-hidden="true" />
        <div className="relative mx-auto max-w-6xl px-6 py-24 sm:py-32">
          <p className="animate-slide-in-left text-xs font-semibold uppercase tracking-[0.22em] text-primary-foreground/60">
            Centralized Event &amp; Volunteer Management
          </p>
          <h1
            className="mt-5 max-w-3xl animate-slide-in-left font-display text-4xl font-semibold leading-tight text-primary-foreground sm:text-6xl"
            style={{ animationDelay: "120ms" }}
          >
            Run every campus event from one portal.
          </h1>
          <p
            className="mt-6 max-w-xl animate-slide-in-left text-base leading-relaxed text-primary-foreground/70"
            style={{ animationDelay: "260ms" }}
          >
            Registrations, QR check-ins, volunteer tasks and live attendance analytics — no more
            scattered spreadsheets and WhatsApp threads.
          </p>
          <div
            className="mt-10 flex animate-slide-in-left flex-wrap items-center gap-3"
            style={{ animationDelay: "380ms" }}
          >
            <Button asChild size="lg" variant="secondary">
              <Link href="/register">
                Create your account
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="ghost"
              className="text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
            >
              <Link href="/login">I already have a login</Link>
            </Button>
          </div>

          <dl
            className="mt-16 grid max-w-2xl animate-fade-in grid-cols-2 gap-8 sm:grid-cols-4"
            style={{ animationDelay: "560ms" }}
          >
            {[
              ["3", "Role dashboards"],
              ["QR", "Check-in / out"],
              ["Live", "Attendance feed"],
              ["1", "Source of truth"],
            ].map(([value, label]) => (
              <div key={label}>
                <dt className="font-display text-3xl font-semibold text-primary-foreground">
                  {value}
                </dt>
                <dd className="mt-1 text-xs uppercase tracking-wider text-primary-foreground/55">
                  {label}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
  )
}
