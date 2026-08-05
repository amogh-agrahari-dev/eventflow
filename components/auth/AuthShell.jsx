import Link from "next/link";
import { CalendarCheck, QrCode, Users, BarChart3 } from "lucide-react";

const highlights = [
  { icon: CalendarCheck, label: "Event creation & registrations" },
  { icon: QrCode, label: "QR check-in / check-out" },
  { icon: Users, label: "Volunteer tasks & onboarding" },
  { icon: BarChart3, label: "Live attendance analytics" },
];

export function AuthShell({ eyebrow, title, subtitle, children, footer }) {
  return (
    <main className="grid min-h-screen bg-background lg:grid-cols-[1.05fr_1fr]">
      <section className="relative hidden flex-col justify-between overflow-hidden bg-gradient-brand p-12 lg:flex">
        <div className="absolute inset-0 animate-grid-in bg-grid-faint" aria-hidden="true" />
        <Link
          href="/"
          className="relative flex animate-slide-in-left items-center gap-3 transition-opacity duration-300 hover:opacity-80"
        >
          <span className="grid size-10 place-items-center rounded-xl bg-accent font-display text-lg font-bold text-accent-foreground">
            E
          </span>
          <span className="font-display text-lg font-semibold tracking-tight text-primary-foreground">
            EventHub Campus
          </span>
        </Link>

        <div className="relative max-w-md">
          <h2
            className="animate-slide-in-left font-display text-4xl font-semibold leading-tight text-primary-foreground"
            style={{ animationDelay: "120ms" }}
          >
            One portal for every event, volunteer and check-in.
          </h2>
          <p
            className="mt-4 animate-slide-in-left text-sm leading-relaxed text-primary-foreground/70"
            style={{ animationDelay: "260ms" }}
          >
            Replace scattered spreadsheets and WhatsApp threads with role-based dashboards for
            organizers, volunteers and attendees.
          </p>
          <ul className="mt-10 space-y-4">
            {highlights.map(({ icon: Icon, label }, i) => (
              <li
                key={label}
                className="group flex animate-slide-in-left items-center gap-3 text-sm text-primary-foreground/85 transition-colors duration-300 hover:text-primary-foreground"
                style={{ animationDelay: `${400 + i * 110}ms` }}
              >
                <span className="grid size-9 place-items-center rounded-lg bg-primary-foreground/10 text-accent transition-all duration-300 group-hover:scale-110 group-hover:bg-primary-foreground/20">
                  <Icon className="size-4" />
                </span>
                {label}
              </li>
            ))}
          </ul>
        </div>

        <p
          className="relative animate-slide-in-left text-xs uppercase tracking-[0.2em] text-primary-foreground/45"
          style={{ animationDelay: "900ms" }}
        >
          Centralized Event &amp; Volunteer Management
        </p>
      </section>

      <section className="flex items-center justify-center px-6 py-14 sm:px-12" style={{ background: 'linear-gradient(160deg, hsl(222 35% 96%) 0%, hsl(210 38% 97%) 100%)' }}>
        <div className="w-full max-w-md">
          <p
            className="animate-fade-in text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground"
            style={{ animationDelay: "80ms" }}
          >
            {eyebrow}
          </p>
          <h1
            className="mt-3 animate-fade-in font-display text-3xl font-semibold tracking-tight text-foreground"
            style={{ animationDelay: "160ms" }}
          >
            {title}
          </h1>
          <p
            className="mt-2 animate-fade-in text-sm text-muted-foreground"
            style={{ animationDelay: "240ms" }}
          >
            {subtitle}
          </p>
          <div className="mt-8 animate-fade-in" style={{ animationDelay: "320ms" }}>
            {children}
          </div>
          <div
            className="mt-8 animate-fade-in text-sm text-muted-foreground"
            style={{ animationDelay: "420ms" }}
          >
            {footer}
          </div>
        </div>
      </section>
    </main>
  );
}

export default AuthShell;
