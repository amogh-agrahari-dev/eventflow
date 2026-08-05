import React, { useEffect } from 'react';
import Head from 'next/head';
import Navbar from '@/components/general/Navbar';
import Footer from '@/components/general/Footer';
import { useRouter } from 'next/navigation';
import { getToken } from '@/lib/auth';

export default function AttendeeDashboard() {
  const router = useRouter();

  useEffect(() => {
    const token = getToken();
    if (!token) {
      router.push("/auth/login");
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans flex flex-col">
      <Head>
        <title>Attendee Dashboard | EventFlow</title>
      </Head>

      <Navbar />

      <main className="flex-1 container mx-auto px-6 py-24 flex items-center justify-center">
        <div className="text-center max-w-lg">
          <h1 className="text-4xl font-display font-bold mb-4">Your Events</h1>
          <p className="text-muted-foreground mb-8">
            This is your attendee workspace. View digital passes, browse events, and manage registrations here.
          </p>
          <div className="p-8 border border-border bg-card rounded-2xl shadow-sm text-sm text-muted-foreground">
            Coming Soon: Invitee Events Grid & Digital Passes
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
