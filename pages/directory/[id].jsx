import React, { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import OrganizerLayout from '@/components/dashboard/organizer/OrganizerLayout';
import { MOCK_EVENTS } from '@/lib/mockEvents';
import { Users, Mail, Phone, Calendar, Clock, CheckCircle2, MoreHorizontal, ArrowLeft, Download, Plus, ChevronDown, ChevronRight, ListTodo } from 'lucide-react';
import Link from 'next/link';
import { useTaskStore } from '@/store/taskStore';
import AssignTaskModal from '@/components/dashboard/organizer/AssignTaskModal';

// Mock Volunteer Data
const MOCK_VOLUNTEERS = [
  { id: 'V001', name: 'Alex Chen', role: 'Team Lead', status: 'Checked In', email: 'alex@example.com', phone: '(555) 012-3456', shift: 'Morning (08:00 - 14:00)', skills: ['Leadership', 'First Aid'] },
  { id: 'V002', name: 'Maria Nones', role: 'Registration', status: 'Pending', email: 'maria@example.com', phone: '(555) 234-5678', shift: 'Morning (08:00 - 14:00)', skills: ['Bilingual', 'Customer Service'] },
  { id: 'V003', name: 'Jack Doe', role: 'Crowd Control', status: 'Checked In', email: 'jack@example.com', phone: '(555) 345-6789', shift: 'Afternoon (14:00 - 20:00)', skills: ['Security', 'Crowd Management'] },
  { id: 'V004', name: 'Sarah Connor', role: 'Information Desk', status: 'Checked In', email: 'sarah@example.com', phone: '(555) 456-7890', shift: 'Morning (08:00 - 14:00)', skills: ['IT Support', 'Customer Service'] },
  { id: 'V005', name: 'David Kim', role: 'Logistics', status: 'Absent', email: 'david@example.com', phone: '(555) 567-8901', shift: 'Full Day (08:00 - 20:00)', skills: ['Heavy Lifting', 'Driving'] },
  { id: 'V006', name: 'Emily White', role: 'Speaker Liaison', status: 'Checked In', email: 'emily@example.com', phone: '(555) 678-9012', shift: 'Afternoon (14:00 - 20:00)', skills: ['Hospitality', 'Communication'] },
  { id: 'V007', name: 'James Wilson', role: 'Stage Crew', status: 'Pending', email: 'james@example.com', phone: '(555) 789-0123', shift: 'Evening (18:00 - 23:00)', skills: ['Audio/Visual', 'Stage Management'] },
];

export default function EventVolunteersDirectory() {
  const router = useRouter();
  const { id } = router.query;
  const eventId = Number(id);
  
  const event = MOCK_EVENTS.find(e => e.id === eventId);
  const { tasks, addTask } = useTaskStore();

  const [expandedRows, setExpandedRows] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVolunteer, setSelectedVolunteer] = useState(null);

  const toggleRow = (vId) => {
    setExpandedRows(prev => ({ ...prev, [vId]: !prev[vId] }));
  };

  const openAssignModal = (volunteer) => {
    setSelectedVolunteer(volunteer);
    setIsModalOpen(true);
  };

  const handleAssignTask = (taskData) => {
    addTask({ ...taskData, volunteerId: selectedVolunteer.id, eventId });
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Checked In': return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20';
      case 'Pending': return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
      case 'Absent': return 'bg-rose-500/10 text-rose-500 border-rose-500/20';
      default: return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
    }
  };

  if (!event && id) {
    return (
      <OrganizerLayout>
        <div className="flex items-center justify-center h-full text-gray-400">
          Event not found.
        </div>
      </OrganizerLayout>
    );
  }

  return (
    <OrganizerLayout>
      <Head>
        <title>{event ? `Volunteers: ${event.title}` : 'Loading...'} | EventFlow</title>
      </Head>

      <AssignTaskModal 
        isOpen={isModalOpen}
        onClose={() => { setIsModalOpen(false); setSelectedVolunteer(null); }}
        onAssign={handleAssignTask}
        volunteerName={selectedVolunteer?.name}
      />

      <div className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 custom-scrollbar scroll-smooth">
        <div className="max-w-7xl mx-auto space-y-6">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-vol-border/40 pb-6">
            <div>
              <Link href="/directory" className="flex items-center text-sm text-vol-accent2 hover:text-white transition-colors mb-4 w-fit">
                <ArrowLeft size={16} className="mr-1" /> Back to Directory
              </Link>
              <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-3">
                {event?.title || 'Loading...'}
              </h1>
              <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-gray-400">
                <div className="flex items-center gap-1.5"><Calendar size={14} className="text-vol-accent" /> {event ? new Date(event.startDate).toLocaleDateString() : ''}</div>
                <div className="flex items-center gap-1.5"><Clock size={14} className="text-vol-accent" /> {event ? new Date(event.startDate).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : ''}</div>
                <div className="flex items-center gap-1.5"><Users size={14} className="text-vol-accent" /> {MOCK_VOLUNTEERS.length} Volunteers</div>
              </div>
            </div>
            
            <div className="flex gap-3">
              <button className="flex items-center gap-2 bg-vol-card border border-vol-border hover:bg-vol-border/30 text-gray-200 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors">
                <Download size={16} /> Export
              </button>
            </div>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-vol-card rounded-xl border border-vol-border p-4">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Total Assigned</p>
              <p className="text-2xl font-bold text-white">{MOCK_VOLUNTEERS.length}</p>
            </div>
            <div className="bg-vol-card rounded-xl border border-vol-border p-4">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Checked In</p>
              <p className="text-2xl font-bold text-emerald-400">{MOCK_VOLUNTEERS.filter(v => v.status === 'Checked In').length}</p>
            </div>
            <div className="bg-vol-card rounded-xl border border-vol-border p-4">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Pending Arrival</p>
              <p className="text-2xl font-bold text-amber-400">{MOCK_VOLUNTEERS.filter(v => v.status === 'Pending').length}</p>
            </div>
            <div className="bg-vol-card rounded-xl border border-vol-border p-4">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Total Tasks</p>
              <p className="text-2xl font-bold text-vol-accent2">
                {tasks.filter(t => t.eventId === eventId).length}
              </p>
            </div>
          </div>

          {/* Table Container */}
          <div className="bg-vol-card border border-vol-border rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-vol-bg/50 border-b border-vol-border/40">
                    <th className="px-6 py-4 w-10"></th>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Volunteer Name</th>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Role & Shift</th>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Tasks</th>
                    <th className="px-6 py-4 text-right text-xs font-semibold text-gray-400 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-vol-border/40">
                  {MOCK_VOLUNTEERS.map((volunteer) => {
                    const volunteerTasks = tasks.filter(t => t.volunteerId === volunteer.id && t.eventId === eventId);
                    const completedTasks = volunteerTasks.filter(t => t.completed).length;
                    const isExpanded = expandedRows[volunteer.id];

                    return (
                      <React.Fragment key={volunteer.id}>
                        <tr className="hover:bg-vol-bg/30 transition-colors">
                          <td className="px-6 py-4">
                            <button onClick={() => toggleRow(volunteer.id)} className="text-gray-400 hover:text-white transition-colors">
                              {isExpanded ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                            </button>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 rounded-full bg-vol-accent/10 border border-vol-accent/30 flex items-center justify-center text-vol-accent2 font-bold text-sm shrink-0">
                                {volunteer.name.split(' ').map(n => n[0]).join('')}
                              </div>
                              <div>
                                <div className="text-sm font-semibold text-white">{volunteer.name}</div>
                                <div className="flex flex-col gap-1 mt-1">
                                  <a href={`mailto:${volunteer.email}`} className="text-[10px] text-gray-400 hover:text-vol-accent2 flex items-center gap-1 transition-colors">
                                    <Mail size={10} /> {volunteer.email}
                                  </a>
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm font-medium text-gray-300">{volunteer.role}</div>
                            <div className="text-xs text-gray-500 mt-0.5">{volunteer.shift}</div>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-medium border ${getStatusColor(volunteer.status)}`}>
                              {volunteer.status}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <ListTodo size={14} className="text-gray-400" />
                              <span className="text-xs font-medium text-gray-300">
                                {completedTasks}/{volunteerTasks.length} Done
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex justify-end gap-2">
                              <button 
                                onClick={() => openAssignModal(volunteer)}
                                className="px-3 py-1.5 text-xs font-medium bg-vol-accent/10 text-vol-accent2 hover:bg-vol-accent/20 border border-vol-accent/20 rounded-lg transition-colors flex items-center gap-1"
                              >
                                <Plus size={14} /> Assign Task
                              </button>
                            </div>
                          </td>
                        </tr>
                        
                        {/* Expanded Tasks Row */}
                        {isExpanded && (
                          <tr className="bg-black/20">
                            <td colSpan={6} className="px-6 py-4 border-t border-vol-border/30">
                              <div className="pl-12">
                                <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Assigned Tasks</h4>
                                {volunteerTasks.length === 0 ? (
                                  <p className="text-sm text-gray-500 italic">No tasks assigned to this volunteer.</p>
                                ) : (
                                  <div className="space-y-2">
                                    {volunteerTasks.map(task => (
                                      <div key={task.id} className="flex items-center justify-between bg-vol-bg/50 border border-vol-border/40 p-3 rounded-xl">
                                        <div className="flex items-center gap-3">
                                          <div className={`w-2 h-2 rounded-full ${task.priority === 'High' ? 'bg-red-400' : task.priority === 'Medium' ? 'bg-amber-400' : 'bg-emerald-400'}`} />
                                          <div>
                                            <p className={`text-sm font-medium ${task.completed ? 'line-through text-gray-500' : 'text-gray-200'}`}>{task.title}</p>
                                            {task.description && <p className="text-xs text-gray-500 mt-0.5">{task.description}</p>}
                                          </div>
                                        </div>
                                        <div>
                                          {task.completed ? (
                                            <span className="flex items-center gap-1 text-xs font-medium text-emerald-400 bg-emerald-400/10 px-2.5 py-1 rounded-full border border-emerald-400/20">
                                              <CheckCircle2 size={12} /> Finished
                                            </span>
                                          ) : (
                                            <span className="flex items-center gap-1 text-xs font-medium text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded-full border border-amber-400/20">
                                              <Clock size={12} /> Pending
                                            </span>
                                          )}
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          
        </div>
      </div>
    </OrganizerLayout>
  );
}
