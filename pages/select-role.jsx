import React, { useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CalendarCheck, ClipboardList, Ticket, LogOut } from "lucide-react";
import { useUserStore } from "@/store/userStore";
import { getToken } from "@/lib/auth";
import Logo from "@/components/general/Logo";

export default function SelectRolePage() {
  const router = useRouter();
  const { user, fetchUser, logout } = useUserStore();
  
  useEffect(() => {
    const token = getToken();
    if (!token) {
      router.push("/auth/login");
      return;
    }
    
    if (!user) {
      fetchUser();
    }
  }, [router, user, fetchUser]);

  const handleLogout = () => {
    logout();
    router.push("/auth/login");
  };

  const workspaces = [
    {
      id: "organizer",
      label: "Organizer Hub",
      description: "Complete command center. Create events, monitor registrations, allocate volunteer roles, and view live analytics.",
      href: "/dashboard",
      icon: CalendarCheck,
      color: "bg-[#8B5CF6]/10 text-[#8B5CF6] border-[#8B5CF6]/30",
    },
    {
      id: "volunteer",
      label: "Volunteer Portal",
      description: "Streamlined execution. Scan QR codes at the door, view assigned tasks, and coordinate with team members easily.",
      href: "/volunteer-dashboard",
      icon: ClipboardList,
      color: "bg-[#10B981]/10 text-[#10B981] border-[#10B981]/30",
    },
    {
      id: "attendee",
      label: "Attendee Dashboard",
      description: "Frictionless experience. View your digital passes, browse upcoming events, and manage your registrations.",
      href: "/attendee-dashboard",
      icon: Ticket,
      color: "bg-[#F59E0B]/10 text-[#F59E0B] border-[#F59E0B]/30",
    },
  ];

  return (
    <>
      <Head>
        <title>Select Workspace — EventFlow</title>
      </Head>

      <div className="min-h-screen bg-[#0B0F19] text-white flex flex-col relative overflow-hidden selection:bg-blue-500/30">

        {/* Background Grid */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
            maskImage: 'linear-gradient(to bottom, black 40%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 40%, transparent 100%)'
          }}
          aria-hidden="true"
        />

        {/* Ambient bottom waves (SVG approximation) */}
        <div className="absolute bottom-0 left-0 right-0 pointer-events-none opacity-40 mix-blend-screen" aria-hidden="true">
          <svg viewBox="0 0 1440 320" className="w-full h-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,160 C320,300 420,0 720,120 C1020,240 1120,-40 1440,80 L1440,320 L0,320 Z" stroke="url(#paint0_linear)" strokeWidth="2" strokeOpacity="0.5" />
            <path d="M0,240 C280,350 500,50 820,180 C1140,310 1250,90 1440,160 L1440,320 L0,320 Z" stroke="url(#paint1_linear)" strokeWidth="1" strokeOpacity="0.3" />
            <defs>
              <linearGradient id="paint0_linear" x1="0" y1="0" x2="1440" y2="0" gradientUnits="userSpaceOnUse">
                <stop stopColor="#8B5CF6" />
                <stop offset="0.5" stopColor="#3B82F6" />
                <stop offset="1" stopColor="#10B981" />
              </linearGradient>
              <linearGradient id="paint1_linear" x1="0" y1="0" x2="1440" y2="0" gradientUnits="userSpaceOnUse">
                <stop stopColor="#F59E0B" />
                <stop offset="0.5" stopColor="#EC4899" />
                <stop offset="1" stopColor="#8B5CF6" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Header */}
        <header className="relative z-10 w-full px-8 py-6 flex justify-between items-center">
          <Logo iconSize={32} />

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </header>

        {/* Main Content */}
        <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 sm:px-6 py-12 mb-20">

          <div className="text-center max-w-2xl mx-auto mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold tracking-tight mb-6 text-white">
              {user ? `Welcome, ${user.name}` : "Welcome to EventFlow"}
            </h1>
            <p className="text-slate-400 text-lg sm:text-xl font-medium max-w-[600px] mx-auto leading-relaxed">
              Choose a workspace to continue. Your single account gives you seamless access to all roles.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 w-full max-w-5xl mx-auto px-4">
            {workspaces.map((workspace) => {
              const Icon = workspace.icon;
              return (
                <Link key={workspace.id} href={workspace.href}>
                  <div className="group relative h-full p-8 rounded-2xl bg-[#161B26] border border-transparent hover:border-blue-500 hover:-translate-y-2 transition-all duration-300 flex flex-col hover:shadow-[0_0_30px_-5px_rgba(59,130,246,0.3)]">
                    <div className={`h-12 w-12 rounded-xl flex items-center justify-center mb-6 border transition-transform duration-300 group-hover:scale-110 ${workspace.color}`}>
                      <Icon className="h-6 w-6" strokeWidth={2} />
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-white transition-colors">
                      {workspace.label}
                    </h3>
                    <p className="text-sm text-slate-400 leading-relaxed font-medium flex-1">
                      {workspace.description}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </main>
      </div>
    </>
  );
}
