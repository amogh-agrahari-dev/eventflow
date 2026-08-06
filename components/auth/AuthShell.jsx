import Link from "next/link";
import { CalendarCheck, QrCode, Users, BarChart3, Calendar, Ticket } from "lucide-react";
import Logo from "@/components/general/Logo";

const highlights = [
  { icon: CalendarCheck, label: "Event creation & registrations" },
  { icon: QrCode, label: "QR check-in / check-out" },
  { icon: Users, label: "Volunteer tasks & onboarding" },
  { icon: BarChart3, label: "Live attendance analytics" },
];

export function AuthShell({ eyebrow, title, subtitle, children, footer }) {
  return (
    <div className="min-h-screen bg-[#0B0F19] text-white flex flex-col relative overflow-hidden font-sans">
      {/* Ambient Background Elements */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-10 pointer-events-none" />
      <div className="absolute top-1/4 -left-64 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-64 w-[600px] h-[600px] bg-cyan-600/10 rounded-full blur-[120px] pointer-events-none" />
      
      {/* Decorative Wavy Lines (SVG) */}
      <svg className="absolute inset-0 w-full h-full opacity-30 pointer-events-none" preserveAspectRatio="none" viewBox="0 0 1440 800" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M-100 600 C 300 400, 600 800, 1500 500" stroke="url(#paint0_linear)" strokeWidth="2" />
        <path d="M-100 650 C 400 550, 700 900, 1500 600" stroke="url(#paint1_linear)" strokeWidth="2" />
        <path d="M-100 550 C 200 450, 500 700, 1500 400" stroke="url(#paint2_linear)" strokeWidth="1" />
        <defs>
          <linearGradient id="paint0_linear" x1="0" y1="0" x2="1440" y2="0" gradientUnits="userSpaceOnUse">
            <stop stopColor="#8C52FF" />
            <stop offset="1" stopColor="#00E5FF" />
          </linearGradient>
          <linearGradient id="paint1_linear" x1="0" y1="0" x2="1440" y2="0" gradientUnits="userSpaceOnUse">
            <stop stopColor="#A070FF" />
            <stop offset="1" stopColor="#00B8D9" />
          </linearGradient>
          <linearGradient id="paint2_linear" x1="0" y1="0" x2="1440" y2="0" gradientUnits="userSpaceOnUse">
            <stop stopColor="#6E56CF" />
            <stop offset="1" stopColor="#00E5FF" stopOpacity="0.5" />
          </linearGradient>
        </defs>
      </svg>

      {/* Floating Ambient Cards */}
      <div className="absolute top-[35%] left-[4%] lg:left-[5%] bg-[#11141A]/80 backdrop-blur-md border border-white/10 p-3 rounded-xl shadow-[0_0_20px_rgba(140,82,255,0.15)] animate-float hidden md:block">
        <Calendar className="w-6 h-6 text-[#8C52FF]" />
      </div>
      <div className="absolute top-[25%] right-[40%] lg:right-[45%] bg-[#11141A]/80 backdrop-blur-md border border-white/10 p-3 rounded-xl shadow-[0_0_20px_rgba(0,229,255,0.15)] animate-float-delayed hidden xl:block z-10">
        <svg className="w-6 h-6 text-[#00E5FF]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 8v4l3 3" /><circle cx="12" cy="12" r="10" /></svg>
      </div>
      <div className="absolute bottom-[20%] left-[45%] bg-[#11141A]/80 backdrop-blur-md border border-white/10 p-3 rounded-xl shadow-[0_0_20px_rgba(140,82,255,0.15)] animate-float hidden xl:block z-10">
        <Ticket className="w-6 h-6 text-[#8C52FF]" />
      </div>

      {/* Top Navigation */}
      <nav className="w-full h-20 flex items-center px-8 sm:px-12 relative z-20">
        <Logo className="transition-opacity hover:opacity-80" iconSize={32} />
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-12 py-12 relative z-10">
        <div className="w-full max-w-[1200px] grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          
          {/* Left Panel - Information */}
          <div className="relative order-2 lg:order-1 hidden md:block">
            {/* Glow behind the panel */}
            <div className="absolute -inset-1 bg-gradient-to-r from-[#8C52FF] to-[#00E5FF] rounded-[2rem] blur-xl opacity-20"></div>
            
            <div className="relative bg-[#11141A]/60 backdrop-blur-xl border border-[#8C52FF]/30 p-10 sm:p-14 rounded-[2rem] shadow-[0_0_40px_rgba(140,82,255,0.15)]">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight mb-6">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#A070FF] to-[#8C52FF]">One portal</span> for every<br />
                event, volunteer <span className="text-white">and check-in.</span>
              </h1>
              
              <p className="text-[#8F9BB3] text-lg mb-10 leading-relaxed max-w-[90%]">
                Replace scattered spreadsheets and WhatsApp threads with role-based dashboards for organizers, volunteers and attendees.
              </p>
              
              <ul className="space-y-6">
                {highlights.map(({ icon: Icon, label }, i) => (
                  <li key={label} className="flex items-center gap-4 text-white/90">
                    <div className="w-10 h-10 rounded-lg bg-[#1C202B] border border-[#2A3140] flex items-center justify-center shadow-[0_0_10px_rgba(140,82,255,0.2)]">
                      <Icon className="w-5 h-5 text-[#00E5FF]" />
                    </div>
                    <span className="text-[15px] font-medium">{label}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="mt-6 text-sm text-[#5A6B8A] tracking-wider uppercase pl-4">
              Centralized event & volunteer management
            </div>
          </div>

          {/* Right Panel - Form */}
          <div className="relative order-1 lg:order-2 w-full max-w-[480px] mx-auto">
            <div className="bg-[#161B23]/70 backdrop-blur-xl border border-white/10 p-8 sm:p-12 rounded-[2rem] shadow-2xl relative">
              
              {/* Optional ambient badge attached to the form panel */}
              <div className="absolute -right-6 top-24 bg-[#11141A]/80 backdrop-blur-md border border-white/10 p-3 rounded-xl shadow-[0_0_20px_rgba(140,82,255,0.15)] animate-float hidden xl:block">
                <Ticket className="w-6 h-6 text-[#8C52FF]" />
              </div>
              
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8F9BB3] mb-2">
                {eyebrow}
              </p>
              <h2 className="text-3xl font-bold tracking-tight text-white mb-3">
                {title}
              </h2>
              <p className="text-sm text-[#8F9BB3] mb-8 leading-relaxed">
                {subtitle}
              </p>
              
              <div className="mt-8">
                {children}
              </div>
              
              <div className="mt-8 text-sm text-[#8F9BB3] flex items-center gap-1">
                {footer}
              </div>
            </div>
          </div>

        </div>
      </main>
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
        @keyframes float-delayed {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
          100% { transform: translateY(0px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 7s ease-in-out infinite;
          animation-delay: 2s;
        }
      `}} />
    </div>
  );
}

export default AuthShell;
