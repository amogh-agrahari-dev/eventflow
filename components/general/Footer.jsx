import { CalendarDays } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default function Footer() {
  return (
    <footer className="border-t border-border/50 bg-background pt-16 pb-8">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
            <div className="flex items-center gap-2">
              <div className="bg-primary text-primary-foreground p-1.5 rounded-md">
                <CalendarDays className="h-5 w-5" />
              </div>
              <span className="font-display font-bold text-xl tracking-tight">EventFlow</span>
            </div>
            <div className="flex gap-8 text-sm font-medium text-muted-foreground">
              <Link href="#" className="hover:text-foreground transition-colors">Features</Link>
              <Link href="#" className="hover:text-foreground transition-colors">Pricing</Link>
              <Link href="#" className="hover:text-foreground transition-colors">Support</Link>
              <Link href="#" className="hover:text-foreground transition-colors">Privacy</Link>
            </div>
          </div>
          <div className="text-center text-sm text-muted-foreground border-t border-border/50 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p>&copy; {new Date().getFullYear()} EventFlow Campus Portal. All rights reserved.</p>
            <p>Designed for scale, built for speed.</p>
          </div>
        </div>
      </footer>
  )
}
