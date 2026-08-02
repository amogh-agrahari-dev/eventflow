import { CheckCircle2, LayoutDashboard, QrCode, Scan } from 'lucide-react'
import React from 'react'

export default function Roles() {
  return (
    <section className="py-24 relative border-y border-border/50 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/30 to-transparent -z-10"></div>
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">One Portal, Three Perspectives</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our role-based dashboards ensure everyone has exactly the tools they need, without the clutter.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Organizer */}
            <div className="bg-card p-8 rounded-2xl border border-border shadow-sm hover:shadow-md transition-all hover:-translate-y-1 group">
              <div className="h-12 w-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <LayoutDashboard className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-3 font-display">For Organizers</h3>
              <p className="text-muted-foreground mb-6 text-sm leading-relaxed">
                Complete command center. Create events, monitor registrations, allocate volunteer roles, and view live analytics.
              </p>
              <ul className="space-y-2 text-sm font-medium">
                <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-primary" /> Full event control</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-primary" /> Live attendance tracking</li>
              </ul>
            </div>

            {/* Volunteer */}
            <div className="bg-card p-8 rounded-2xl border border-border shadow-md hover:shadow-lg transition-all relative md:-translate-y-4 hover:-translate-y-5 group">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-brand rounded-t-2xl opacity-80 group-hover:opacity-100 transition-opacity"></div>
              <div className="h-12 w-12 bg-primary text-primary-foreground shadow-sm rounded-xl flex items-center justify-center mb-6">
                <Scan className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-3 font-display">For Volunteers</h3>
              <p className="text-muted-foreground mb-6 text-sm leading-relaxed">
                Streamlined execution. Scan QR codes at the door, view assigned tasks, and coordinate with team members easily.
              </p>
              <ul className="space-y-2 text-sm font-medium">
                <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-primary" /> Mobile-first QR scanning</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-primary" /> Clear task visibility</li>
              </ul>
            </div>

            {/* Attendee */}
            <div className="bg-card p-8 rounded-2xl border border-border shadow-sm hover:shadow-md transition-all hover:-translate-y-1 group">
              <div className="h-12 w-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <QrCode className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-3 font-display">For Attendees</h3>
              <p className="text-muted-foreground mb-6 text-sm leading-relaxed">
                Frictionless experience. Register online, receive an instant digital QR ticket, and walk right into the venue.
              </p>
              <ul className="space-y-2 text-sm font-medium">
                <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-primary" /> 1-click registration</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-primary" /> Digital QR tickets</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
  )
}
