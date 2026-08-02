import { getToken, removeToken } from '@/lib/auth'
import { Button } from 'components/ui'
import { CalendarDays, ChevronDown, LogOut, LayoutDashboard, UserCircle2, PlusCircle } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useRef, useState } from 'react'

export default function Navbar() {
    const [user, setUser] = useState(null)
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const menuRef = useRef(null)
    const router = useRouter()
    const token = getToken()

    function protected1() {
        fetch('https://eventflow-backend-0ctf.onrender.com/users/me', {
            headers: {
                'Authorization': `bearer ${token}`
            }
        })
            .then(response => response.json())
            .then(data => setUser(data))
            .catch(error => console.error('Error:', error))
    }

    useEffect(() => {
        protected1()
    }, [token])

    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsMenuOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    function handleLogout() {
        removeToken()
        setUser(null)
        setIsMenuOpen(false)
        router.push('/auth/login')
    }

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-md">
            <div className="container mx-auto px-6 h-16 flex items-center justify-between">
                <Link href="/">
                    <div className="flex items-center gap-2">
                        <div className="bg-primary text-primary-foreground p-1.5 rounded-md shadow-sm">
                            <CalendarDays className="h-5 w-5" />
                        </div>
                        <span className="font-display font-bold text-xl tracking-tight">EventFlow</span>
                    </div>
                </Link>

                {user ? (
                    <div className="relative" ref={menuRef}>
                        <button
                            onClick={() => setIsMenuOpen(prev => !prev)}
                            className="flex items-center gap-2 rounded-full border border-border bg-background/90 px-3 py-2 shadow-sm transition hover:shadow-md"
                        >
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                                {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                            </div>
                            <span className="text-sm font-medium">{user?.name || 'User'}</span>
                            <ChevronDown className="h-4 w-4" />
                        </button>

                        {isMenuOpen && (
                            <div className="absolute right-0 mt-2 w-48 rounded-xl border border-border bg-white p-2 shadow-lg">
                                <Link
                                    href="/dashboard"
                                    onClick={() => setIsMenuOpen(false)}
                                    className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted-foreground transition hover:bg-muted hover:text-foreground"
                                >
                                    <LayoutDashboard className="h-4 w-4" />
                                    Dashboard
                                </Link>
                                <Link
                                    href="/events/add"
                                    onClick={() => setIsMenuOpen(false)}
                                    className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted-foreground transition hover:bg-muted hover:text-foreground"
                                >
                                    <PlusCircle className="h-4 w-4" />
                                    Add Event
                                </Link>
                                <Link
                                    href="/profile"
                                    onClick={() => setIsMenuOpen(false)}
                                    className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted-foreground transition hover:bg-muted hover:text-foreground"
                                >
                                    <UserCircle2 className="h-4 w-4" />
                                    Profile
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-600 transition hover:bg-red-50"
                                >
                                    <LogOut className="h-4 w-4" />
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
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
                )}
            </div>
        </nav>
    )
}
