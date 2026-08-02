import React from 'react';
import Head from 'next/head';
import Navbar from '@/components/general/Navbar';
import Footer from '@/components/general/Footer';
import OrganizerDashboard from '@/components/dashboard/OrganizerDashboard';

export default function Home() {
    return (
        <div className="min-h-screen bg-background text-foreground font-sans flex flex-col">
            <Head>
                <title>Organizer Hub | EventFlow</title>
                <meta name="description" content="Organizer workspace and event management portal." />
            </Head>

            <Navbar />

            <div className="flex-1">
                <OrganizerDashboard />
            </div>

            <Footer />
        </div>
    );
}
