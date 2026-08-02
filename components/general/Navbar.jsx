import { Button } from 'components/ui'
import { CalendarDays } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default function Navbar() {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-md">
            <div className="container mx-auto px-6 h-16 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="bg-primary text-primary-foreground p-1.5 rounded-md shadow-sm">
                        <CalendarDays className="h-5 w-5" />
                    </div>
                    <span className="font-display font-bold text-xl tracking-tight">EventFlow</span>
                </div>
                <div className="flex items-center gap-4">
                    <Link href="/auth/login" className="text-sm font-medium hover:text-primary transition-colors">
                        Sign In
                    </Link>
                    <Link href="/auth/register">
                        <Button size="sm" className="rounded-full shadow-sm hover:shadow-md transition-all">
                            Get Started
                        </Button>
                    </Link>
                </div>
            </div>
        </nav>
    )
}
