import React, { useState } from 'react';
import Link from 'next/link';
import {
  User, Key, Palette, Layout, Bell, Shield, Globe,
  Eye, Database, Link2, Sliders, AlertTriangle, ArrowLeft,
  Save, X
} from 'lucide-react';
import { Button, Input, Label } from '@/components/ui';

// Shared Section Wrapper Component
function SectionWrapper({ title, description, children, isDanger }) {
  return (
    <div className={`mb-10 ${isDanger ? 'border border-red-500/20 bg-red-500/5 rounded-xl p-6' : ''}`}>
      <div className="mb-6">
        <h2 className={`text-xl font-semibold tracking-tight ${isDanger ? 'text-red-400' : 'text-white'}`}>{title}</h2>
        {description && <p className="text-sm text-[#8F9BB3] mt-1">{description}</p>}
      </div>
      <div className="space-y-6">
        {children}
      </div>
    </div>
  );
}

function Toggle({ checked, onChange, label, description }) {
  return (
    <div className="flex items-center justify-between py-3">
      <div className="flex flex-col">
        <span className="text-sm font-medium text-white">{label}</span>
        {description && <span className="text-xs text-[#8F9BB3] mt-1">{description}</span>}
      </div>
      <button
        type="button"
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#00E5FF] focus:ring-offset-2 focus:ring-offset-[#161B23] ${
          checked ? 'bg-[#00E5FF]' : 'bg-slate-700'
        }`}
        onClick={onChange}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            checked ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  );
}

export default function SettingsDashboard() {
  const [activeTab, setActiveTab] = useState('profile');
  const [isDirty, setIsDirty] = useState(false);

  // Mark form as dirty when inputs change
  const handleChange = () => setIsDirty(true);

  const navItems = [
    { id: 'profile', label: 'Profile Settings', icon: User },
    { id: 'account', label: 'Account Settings', icon: Key },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'dashboard', label: 'Dashboard Settings', icon: Layout },
    { id: 'notifications', label: 'Notification Settings', icon: Bell },
    { id: 'privacy', label: 'Privacy & Security', icon: Shield },
    { id: 'language', label: 'Language & Region', icon: Globe },
    { id: 'accessibility', label: 'Accessibility', icon: Eye },
    { id: 'data', label: 'Data & Storage', icon: Database },
    { id: 'integrations', label: 'Integrations', icon: Link2 },
    { id: 'organizer', label: 'Organizer Preferences', icon: Sliders },
    { id: 'danger', label: 'Danger Zone', icon: AlertTriangle, isDanger: true },
  ];

  return (
    <div className="h-full flex bg-[#161B23]">
      {/* Sidebar */}
      <aside className="w-64 flex-shrink-0 border-r border-[#1C202B] bg-[#161B23]/95 flex flex-col h-full overflow-y-auto custom-scrollbar">
        <div className="p-4 border-b border-[#1C202B]">
          <Link href="/dashboard" className="flex items-center gap-2 text-[#8F9BB3] hover:text-white transition-colors text-sm font-medium">
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
          <h1 className="text-xl font-bold text-white mt-6 mb-2 tracking-tight">Settings</h1>
        </div>
        
        <nav className="p-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-left text-[13.5px] font-medium ${
                  isActive 
                    ? item.isDanger ? 'bg-red-500/10 text-red-400' : 'bg-[#00E5FF]/10 text-[#00E5FF]'
                    : item.isDanger ? 'text-red-400/70 hover:bg-red-500/10 hover:text-red-400' : 'text-[#8F9BB3] hover:bg-white/5 hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        {/* Unsaved Changes Banner */}
        {isDirty && (
          <div className="bg-[#8B5CF6]/20 border-b border-[#8B5CF6]/30 px-6 py-3 flex items-center justify-between animate-in slide-in-from-top-2">
            <p className="text-sm text-white font-medium">You have unsaved changes.</p>
            <div className="flex gap-3">
              <Button variant="ghost" className="h-8 px-3 text-white hover:bg-white/10" onClick={() => setIsDirty(false)}>
                Cancel
              </Button>
              <Button className="h-8 px-4 bg-[#8B5CF6] hover:bg-[#7C3AED] text-white" onClick={() => setIsDirty(false)}>
                Save Changes
              </Button>
            </div>
          </div>
        )}

        <div className="flex-1 overflow-y-auto custom-scrollbar p-8 lg:p-12">
          <div className="max-w-3xl">
            
            {/* 1. Profile Settings */}
            {activeTab === 'profile' && (
              <SectionWrapper title="Profile Settings" description="Manage your personal information and how others see you on the platform.">
                <div className="flex items-center gap-6 mb-8 bg-white/5 p-6 rounded-2xl border border-white/10">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-[#6E56CF] to-[#00E5FF] p-[2px]">
                    <div className="w-full h-full rounded-full bg-[#161B23] flex items-center justify-center text-2xl font-bold text-white">
                      AC
                    </div>
                  </div>
                  <div>
                    <Button variant="outline" className="mb-2 border-white/20 text-white hover:bg-white/10">Upload new picture</Button>
                    <p className="text-xs text-[#8F9BB3]">JPG, GIF or PNG. Max size of 800K</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="fullName" className="text-[#8F9BB3]">Full Name</Label>
                    <Input id="fullName" defaultValue="Alex Chen" className="bg-[#0B0E14] border-[#1C202B] text-white focus:border-[#00E5FF]" onChange={handleChange} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="username" className="text-[#8F9BB3]">Username</Label>
                    <Input id="username" defaultValue="alexchen_events" className="bg-[#0B0E14] border-[#1C202B] text-white focus:border-[#00E5FF]" onChange={handleChange} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-[#8F9BB3]">Email Address</Label>
                    <Input id="email" type="email" defaultValue="alex.chen@university.edu" className="bg-[#0B0E14] border-[#1C202B] text-white focus:border-[#00E5FF]" onChange={handleChange} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-[#8F9BB3]">Phone Number</Label>
                    <Input id="phone" type="tel" defaultValue="+1 (555) 123-4567" className="bg-[#0B0E14] border-[#1C202B] text-white focus:border-[#00E5FF]" onChange={handleChange} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="org" className="text-[#8F9BB3]">Organization / College Name</Label>
                    <Input id="org" defaultValue="University Events Board" className="bg-[#0B0E14] border-[#1C202B] text-white focus:border-[#00E5FF]" onChange={handleChange} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role" className="text-[#8F9BB3]">Position / Role</Label>
                    <Input id="role" defaultValue="Lead Event Coordinator" className="bg-[#0B0E14] border-[#1C202B] text-white focus:border-[#00E5FF]" onChange={handleChange} />
                  </div>
                  <div className="col-span-1 md:col-span-2 space-y-2">
                    <Label htmlFor="bio" className="text-[#8F9BB3]">Bio / About Me</Label>
                    <textarea 
                      id="bio"
                      className="flex min-h-[100px] w-full rounded-xl border border-[#1C202B] bg-[#0B0E14] px-3.5 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#00E5FF] focus:border-[#00E5FF] transition-all"
                      defaultValue="Passionate about organizing memorable campus events and connecting students."
                      onChange={handleChange}
                    />
                  </div>
                </div>
                
                <div className="pt-4 flex justify-end">
                  <Button className="bg-[#00E5FF] hover:bg-[#00B8D9] text-black font-bold" onClick={() => setIsDirty(false)}>
                    Save Profile
                  </Button>
                </div>
              </SectionWrapper>
            )}

            {/* 2. Account Settings */}
            {activeTab === 'account' && (
              <SectionWrapper title="Account Settings" description="Manage your account security and authentication methods.">
                <div className="bg-white/5 p-6 rounded-2xl border border-white/10 mb-8 space-y-6">
                  <h3 className="text-lg font-medium text-white mb-4">Change Password</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label className="text-[#8F9BB3]">Current Password</Label>
                      <Input type="password" placeholder="••••••••" className="bg-[#0B0E14] border-[#1C202B] text-white" onChange={handleChange} />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-[#8F9BB3]">New Password</Label>
                        <Input type="password" placeholder="••••••••" className="bg-[#0B0E14] border-[#1C202B] text-white" onChange={handleChange} />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-[#8F9BB3]">Confirm Password</Label>
                        <Input type="password" placeholder="••••••••" className="bg-[#0B0E14] border-[#1C202B] text-white" onChange={handleChange} />
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" className="border-white/20 text-white hover:bg-white/10" onClick={() => setIsDirty(true)}>Update Password</Button>
                </div>

                <div className="bg-white/5 p-6 rounded-2xl border border-white/10 space-y-6">
                  <h3 className="text-lg font-medium text-white mb-2">Security & Sessions</h3>
                  <div className="divide-y divide-[#1C202B]">
                    <Toggle label="Two-Factor Authentication (2FA)" description="Add an extra layer of security to your account." checked={true} onChange={handleChange} />
                    
                    <div className="py-4">
                      <div className="flex justify-between items-center mb-4">
                        <div>
                          <p className="text-sm font-medium text-white">Active Sessions</p>
                          <p className="text-xs text-[#8F9BB3]">Manage the devices currently logged into your account.</p>
                        </div>
                        <Button variant="outline" className="border-red-500/30 text-red-400 hover:bg-red-500/10 text-xs h-8 px-3">
                          Log out of all devices
                        </Button>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex items-center justify-between bg-[#0B0E14] p-3 rounded-xl border border-[#1C202B]">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-[#00E5FF]/10 flex items-center justify-center text-[#00E5FF]">
                              <Layout className="w-5 h-5" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-white">MacBook Pro - Safari</p>
                              <p className="text-xs text-[#8F9BB3]">Los Angeles, CA • Active now</p>
                            </div>
                          </div>
                          <span className="text-[10px] font-bold px-2 py-1 bg-[#00E5FF]/20 text-[#00E5FF] rounded-md">CURRENT</span>
                        </div>
                        <div className="flex items-center justify-between bg-[#0B0E14] p-3 rounded-xl border border-[#1C202B]">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-[#8F9BB3]">
                              <Layout className="w-5 h-5" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-white">iPhone 13 - Safari</p>
                              <p className="text-xs text-[#8F9BB3]">Los Angeles, CA • Last active 2 hours ago</p>
                            </div>
                          </div>
                          <button className="text-xs text-red-400 hover:text-red-300 font-medium px-2 py-1">Revoke</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </SectionWrapper>
            )}

            {/* 3. Appearance */}
            {activeTab === 'appearance' && (
              <SectionWrapper title="Appearance" description="Customize how EventFlow looks and feels on your device.">
                <div className="bg-white/5 p-6 rounded-2xl border border-white/10 space-y-6">
                  <div>
                    <h3 className="text-sm font-medium text-white mb-4">Theme Preference</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {/* Light Theme Button */}
                      <button className="border border-[#1C202B] bg-[#0B0E14] rounded-xl p-4 flex flex-col items-center gap-3 hover:border-white/30 transition-colors text-[#8F9BB3] hover:text-white group">
                        <div className="w-full h-20 bg-[#F8FAFC] rounded-lg border border-slate-200 shadow-sm flex flex-col overflow-hidden">
                           <div className="h-4 bg-white border-b border-slate-100 flex items-center px-2">
                             <div className="w-12 h-1.5 bg-slate-200 rounded-full" />
                           </div>
                           <div className="flex-1 p-2 flex gap-2">
                             <div className="w-6 h-full bg-slate-100 rounded" />
                             <div className="flex-1 bg-white rounded border border-slate-100" />
                           </div>
                        </div>
                        <span className="text-sm font-medium">Light Mode</span>
                      </button>
                      
                      {/* Dark Theme Button (Active) */}
                      <button className="border-2 border-[#00E5FF] bg-[#0B0E14] rounded-xl p-4 flex flex-col items-center gap-3 text-white relative">
                        <div className="absolute top-2 right-2 w-4 h-4 bg-[#00E5FF] rounded-full flex items-center justify-center">
                          <Check className="w-2.5 h-2.5 text-black" />
                        </div>
                        <div className="w-full h-20 bg-[#0B0E14] rounded-lg border border-[#1C202B] shadow-sm flex flex-col overflow-hidden">
                           <div className="h-4 bg-[#161B23] border-b border-[#1C202B] flex items-center px-2">
                             <div className="w-12 h-1.5 bg-[#2A3140] rounded-full" />
                           </div>
                           <div className="flex-1 p-2 flex gap-2">
                             <div className="w-6 h-full bg-[#161B23] rounded" />
                             <div className="flex-1 bg-white/5 rounded border border-white/5" />
                           </div>
                        </div>
                        <span className="text-sm font-medium">Dark Mode</span>
                      </button>

                      {/* System Theme Button */}
                      <button className="border border-[#1C202B] bg-[#0B0E14] rounded-xl p-4 flex flex-col items-center gap-3 hover:border-white/30 transition-colors text-[#8F9BB3] hover:text-white">
                        <div className="w-full h-20 bg-gradient-to-r from-[#F8FAFC] to-[#0B0E14] rounded-lg border border-slate-200 shadow-sm flex flex-col overflow-hidden">
                           <div className="h-4 bg-gradient-to-r from-white to-[#161B23] border-b border-slate-100 flex items-center px-2">
                             <div className="w-12 h-1.5 bg-slate-200 rounded-full" />
                           </div>
                           <div className="flex-1 p-2 flex gap-2">
                             <div className="w-6 h-full bg-slate-100 rounded" />
                             <div className="flex-1 bg-gradient-to-r from-white to-white/5 rounded border border-slate-100" />
                           </div>
                        </div>
                        <span className="text-sm font-medium">System Default</span>
                      </button>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#1C202B] divide-y divide-[#1C202B]">
                    <Toggle label="Compact Layout" description="Reduce padding to show more content on screen." checked={false} onChange={handleChange} />
                    <Toggle label="Collapse Sidebar by Default" description="Start with a collapsed navigation menu." checked={false} onChange={handleChange} />
                    <Toggle label="Reduced Animations" description="Minimize motion effects for a simpler experience." checked={false} onChange={handleChange} />
                  </div>
                </div>
              </SectionWrapper>
            )}

            {/* 4. Dashboard Settings */}
            {activeTab === 'dashboard' && (
              <SectionWrapper title="Dashboard Settings" description="Configure your home dashboard widgets and behaviors.">
                 <div className="bg-white/5 p-6 rounded-2xl border border-white/10 divide-y divide-[#1C202B]">
                    <div className="pb-4">
                      <Label className="text-[#8F9BB3] mb-2 block">Default Dashboard on Login</Label>
                      <select className="w-full bg-[#0B0E14] border border-[#1C202B] text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#00E5FF]" onChange={handleChange}>
                        <option>Organizer Hub</option>
                        <option>Volunteer Portal</option>
                        <option>Attendee View</option>
                      </select>
                    </div>
                    
                    <div className="py-4">
                      <h3 className="text-sm font-medium text-white mb-3">Visible Widgets</h3>
                      <div className="space-y-3">
                        {['Live Event Metrics', 'Recent Registrations', 'Volunteer Check-ins', 'Revenue Chart', 'Upcoming Tasks'].map((widget, i) => (
                          <label key={i} className="flex items-center gap-3">
                            <input type="checkbox" defaultChecked={i < 4} onChange={handleChange} className="w-4 h-4 rounded border-[#1C202B] bg-[#0B0E14] text-[#00E5FF] focus:ring-[#00E5FF] cursor-pointer" />
                            <span className="text-sm text-white">{widget}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4">
                      <Toggle label="Dashboard Tips" description="Show helpful tips for organizing events." checked={true} onChange={handleChange} />
                    </div>
                 </div>
                 
                 <Button variant="outline" className="mt-4 border-white/20 text-white hover:bg-white/10" onClick={handleChange}>
                    Restore Default Layout
                 </Button>
              </SectionWrapper>
            )}

            {/* 5. Notification Settings */}
            {activeTab === 'notifications' && (
              <SectionWrapper title="Notification Settings" description="Control what alerts you receive and how they are delivered.">
                <div className="bg-white/5 p-6 rounded-2xl border border-white/10 divide-y divide-[#1C202B]">
                  <div className="pb-4 space-y-4">
                    <h3 className="text-sm font-medium text-white uppercase tracking-wider text-[11px] text-[#5A6B8A]">In-App Alerts</h3>
                    <Toggle label="Event Reminders" checked={true} onChange={handleChange} />
                    <Toggle label="Volunteer Updates" checked={true} onChange={handleChange} />
                    <Toggle label="Registration Notifications" description="Alert me when someone registers for my event." checked={true} onChange={handleChange} />
                    <Toggle label="System Announcements" checked={true} onChange={handleChange} />
                  </div>
                  
                  <div className="pt-4 space-y-4">
                    <h3 className="text-sm font-medium text-white uppercase tracking-wider text-[11px] text-[#5A6B8A]">External Delivery</h3>
                    <Toggle label="Email Notifications" description="Receive critical updates via email." checked={true} onChange={handleChange} />
                    <Toggle label="Weekly Summary Emails" description="A roundup of your event performance." checked={false} onChange={handleChange} />
                    <Toggle label="Push Notifications" description="Requires browser permission." checked={true} onChange={handleChange} />
                  </div>
                </div>
              </SectionWrapper>
            )}

            {/* 6. Privacy & Security */}
            {activeTab === 'privacy' && (
              <SectionWrapper title="Privacy & Security" description="Manage who can see your profile and review your security logs.">
                <div className="bg-white/5 p-6 rounded-2xl border border-white/10 divide-y divide-[#1C202B] mb-8">
                  <div className="pb-4">
                    <Label className="text-[#8F9BB3] mb-2 block">Profile Visibility</Label>
                    <select className="w-full bg-[#0B0E14] border border-[#1C202B] text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#00E5FF]" onChange={handleChange}>
                      <option>Public (Visible to everyone)</option>
                      <option>Campus Only (Visible to logged-in users)</option>
                      <option>Private (Only you and admins)</option>
                    </select>
                  </div>
                  
                  <div className="pt-4 space-y-1">
                    <Toggle label="Show email to volunteers" checked={true} onChange={handleChange} />
                    <Toggle label="Show phone number" checked={false} onChange={handleChange} />
                    <Toggle label="Allow event invitations" checked={true} onChange={handleChange} />
                    <Toggle label="Show activity status" description="Let others see when you are online." checked={true} onChange={handleChange} />
                  </div>
                </div>

                <div className="bg-[#0B0E14] p-6 rounded-2xl border border-[#1C202B]">
                  <h3 className="text-sm font-medium text-white mb-4">Security Information</h3>
                  <div className="space-y-4 text-sm">
                    <div className="flex justify-between items-center py-2 border-b border-[#1C202B]">
                      <span className="text-[#8F9BB3]">Last Login</span>
                      <span className="text-white font-medium">Today at 10:42 AM</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-[#1C202B]">
                      <span className="text-[#8F9BB3]">Recent IP Address</span>
                      <span className="text-white font-medium">192.168.1.45</span>
                    </div>
                    <div className="pt-2">
                      <Button variant="outline" className="text-xs h-8 border-white/20 text-white hover:bg-white/10 w-full sm:w-auto">View Full Login History</Button>
                    </div>
                  </div>
                </div>
              </SectionWrapper>
            )}

            {/* 7. Language & Region */}
            {activeTab === 'language' && (
              <SectionWrapper title="Language & Region" description="Customize your locale, time formats, and language preferences.">
                <div className="bg-white/5 p-6 rounded-2xl border border-white/10 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-[#8F9BB3]">Language</Label>
                    <select className="w-full bg-[#0B0E14] border border-[#1C202B] text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#00E5FF]" onChange={handleChange}>
                      <option>English (US)</option>
                      <option>English (UK)</option>
                      <option>Spanish</option>
                      <option>French</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[#8F9BB3]">Country / Region</Label>
                    <select className="w-full bg-[#0B0E14] border border-[#1C202B] text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#00E5FF]" onChange={handleChange}>
                      <option>United States</option>
                      <option>Canada</option>
                      <option>United Kingdom</option>
                      <option>Australia</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[#8F9BB3]">Time Zone</Label>
                    <select className="w-full bg-[#0B0E14] border border-[#1C202B] text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#00E5FF]" onChange={handleChange}>
                      <option>Pacific Time (PT)</option>
                      <option>Eastern Time (ET)</option>
                      <option>Central Time (CT)</option>
                      <option>UTC</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[#8F9BB3]">Time Format</Label>
                    <select className="w-full bg-[#0B0E14] border border-[#1C202B] text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#00E5FF]" onChange={handleChange}>
                      <option>12-hour (1:00 PM)</option>
                      <option>24-hour (13:00)</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[#8F9BB3]">Date Format</Label>
                    <select className="w-full bg-[#0B0E14] border border-[#1C202B] text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#00E5FF]" onChange={handleChange}>
                      <option>MM/DD/YYYY</option>
                      <option>DD/MM/YYYY</option>
                      <option>YYYY-MM-DD</option>
                    </select>
                  </div>
                </div>
              </SectionWrapper>
            )}

            {/* 8. Accessibility */}
            {activeTab === 'accessibility' && (
              <SectionWrapper title="Accessibility" description="Tailor the interface for your visual and motor preferences.">
                <div className="bg-white/5 p-6 rounded-2xl border border-white/10 divide-y divide-[#1C202B]">
                  <Toggle label="Larger Text" description="Increase the base font size of the application." checked={false} onChange={handleChange} />
                  <Toggle label="High Contrast Mode" description="Increase contrast for better readability." checked={false} onChange={handleChange} />
                  <Toggle label="Reduced Motion" description="Disable non-essential animations and transitions." checked={false} onChange={handleChange} />
                  <Toggle label="Keyboard Navigation Improvements" description="Show permanent focus indicators for interactive elements." checked={true} onChange={handleChange} />
                  <Toggle label="Screen Reader Support" description="Enhance aria-labels and structure for screen readers." checked={true} onChange={handleChange} />
                </div>
              </SectionWrapper>
            )}

            {/* 9. Data & Storage */}
            {activeTab === 'data' && (
              <SectionWrapper title="Data & Storage" description="Manage your generated data and local cache.">
                <div className="bg-white/5 p-6 rounded-2xl border border-white/10 space-y-6">
                  <div>
                    <h3 className="text-sm font-medium text-white mb-2">Export Data</h3>
                    <p className="text-xs text-[#8F9BB3] mb-4">Download a copy of your events, volunteer lists, and personal data in JSON or CSV format.</p>
                    <div className="flex flex-wrap gap-3">
                      <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 text-xs">Export Account Data</Button>
                      <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 text-xs">Download Event History</Button>
                      <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 text-xs">Download Volunteer Reports</Button>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-[#1C202B]">
                    <h3 className="text-sm font-medium text-white mb-2">Local Storage</h3>
                    <p className="text-xs text-[#8F9BB3] mb-4">Clear cached images, temporary files, and local UI preferences to free up space.</p>
                    <div className="flex flex-wrap gap-3">
                      <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 text-xs">Clear Cache (24 MB)</Button>
                      <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 text-xs">Reset Local Preferences</Button>
                    </div>
                  </div>
                </div>
              </SectionWrapper>
            )}

            {/* 10. Integrations */}
            {activeTab === 'integrations' && (
              <SectionWrapper title="Integrations" description="Connect third-party apps to streamline your workflow.">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { name: 'Google Calendar', connected: true, icon: '📅' },
                    { name: 'Microsoft Outlook', connected: false, icon: '📧' },
                    { name: 'Slack', connected: false, icon: '💬' },
                    { name: 'Discord', connected: true, icon: '🎮' },
                    { name: 'Zoom', connected: true, icon: '📹' },
                    { name: 'Microsoft Teams', connected: false, icon: '👥' },
                  ].map((integration, idx) => (
                    <div key={idx} className="bg-white/5 p-5 rounded-xl border border-white/10 flex items-center justify-between hover:bg-white/10 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#0B0E14] rounded-lg border border-[#1C202B] flex items-center justify-center text-xl">
                          {integration.icon}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-white">{integration.name}</p>
                          <p className={`text-xs ${integration.connected ? 'text-emerald-400' : 'text-[#8F9BB3]'}`}>
                            {integration.connected ? 'Connected' : 'Not Connected'}
                          </p>
                        </div>
                      </div>
                      <Button 
                        variant="outline" 
                        className={`text-xs h-8 px-3 ${integration.connected ? 'border-red-500/30 text-red-400 hover:bg-red-500/10' : 'border-[#00E5FF]/30 text-[#00E5FF] hover:bg-[#00E5FF]/10'}`}
                      >
                        {integration.connected ? 'Disconnect' : 'Connect'}
                      </Button>
                    </div>
                  ))}
                </div>
              </SectionWrapper>
            )}

            {/* 11. Organizer Preferences */}
            {activeTab === 'organizer' && (
              <SectionWrapper title="Organizer Preferences" description="Set your default values for creating new events.">
                <div className="bg-white/5 p-6 rounded-2xl border border-white/10 divide-y divide-[#1C202B]">
                  <div className="pb-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-[#8F9BB3]">Default Event Visibility</Label>
                      <select className="w-full bg-[#0B0E14] border border-[#1C202B] text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#00E5FF]" onChange={handleChange}>
                        <option>Public</option>
                        <option>Unlisted</option>
                        <option>Private</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[#8F9BB3]">Default Registration Status</Label>
                      <select className="w-full bg-[#0B0E14] border border-[#1C202B] text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#00E5FF]" onChange={handleChange}>
                        <option>Open</option>
                        <option>Invite Only</option>
                        <option>Closed</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[#8F9BB3]">Default Event Category</Label>
                      <select className="w-full bg-[#0B0E14] border border-[#1C202B] text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#00E5FF]" onChange={handleChange}>
                        <option>Social</option>
                        <option>Academic</option>
                        <option>Sports</option>
                        <option>Networking</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[#8F9BB3]">Default Venue</Label>
                      <select className="w-full bg-[#0B0E14] border border-[#1C202B] text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#00E5FF]" onChange={handleChange}>
                        <option>Main Auditorium</option>
                        <option>Student Union</option>
                        <option>Virtual (Zoom)</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="pt-4 space-y-1">
                    <Toggle label="Auto-approve volunteers" description="Automatically accept volunteer requests for your events." checked={false} onChange={handleChange} />
                    <Toggle label="Custom QR code colors" description="Apply event theme colors to check-in QR codes." checked={true} onChange={handleChange} />
                  </div>
                </div>
              </SectionWrapper>
            )}

            {/* 12. Danger Zone */}
            {activeTab === 'danger' && (
              <SectionWrapper title="Danger Zone" description="Irreversible actions regarding your account and data." isDanger={true}>
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-[#0B0E14] p-4 rounded-xl border border-[#1C202B]">
                    <div>
                      <h4 className="text-white font-medium">Reset all settings</h4>
                      <p className="text-xs text-[#8F9BB3] mt-1">Revert all preferences back to factory defaults.</p>
                    </div>
                    <Button variant="outline" className="mt-3 sm:mt-0 border-white/20 text-white hover:bg-white/10 shrink-0">Reset Settings</Button>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-[#0B0E14] p-4 rounded-xl border border-[#1C202B]">
                    <div>
                      <h4 className="text-white font-medium">Disconnect all integrations</h4>
                      <p className="text-xs text-[#8F9BB3] mt-1">Revoke access from all third-party connected apps.</p>
                    </div>
                    <Button variant="outline" className="mt-3 sm:mt-0 border-white/20 text-white hover:bg-white/10 shrink-0">Disconnect All</Button>
                  </div>

                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-[#0B0E14] p-4 rounded-xl border border-red-500/30 relative overflow-hidden">
                    <div className="absolute inset-0 bg-red-500/5" />
                    <div className="relative z-10">
                      <h4 className="text-red-400 font-bold">Delete Account</h4>
                      <p className="text-xs text-[#8F9BB3] mt-1">Permanently delete your account, events, and all data.</p>
                    </div>
                    <Button className="mt-3 sm:mt-0 bg-red-500 hover:bg-red-600 text-white font-bold relative z-10 shrink-0 border-none">
                      Delete Account
                    </Button>
                  </div>
                </div>
              </SectionWrapper>
            )}

          </div>
          
          {/* Bottom spacer so content isn't hidden behind save banner */}
          <div className="h-24"></div>
        </div>
      </main>
    </div>
  );
}

// Add simple Check icon since we didn't import it in lucide-react list above but used it
function Check({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
  );
}
