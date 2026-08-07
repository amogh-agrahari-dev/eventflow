import React, { useState } from 'react';
import { X, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AssignTaskModal({ isOpen, onClose, onAssign, volunteerName }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Medium');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    
    onAssign({ title, description, priority, completed: false });
    setTitle('');
    setDescription('');
    setPriority('Medium');
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-vol-card border border-vol-border w-full max-w-md rounded-2xl shadow-xl overflow-hidden"
        >
          <div className="flex items-center justify-between p-4 border-b border-vol-border">
            <h2 className="text-lg font-semibold text-white">Assign Task</h2>
            <button onClick={onClose} className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-vol-border/50 transition-colors">
              <X size={20} />
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="p-4 space-y-4">
            {volunteerName && (
              <p className="text-sm text-gray-400">
                Assigning to: <span className="text-vol-accent2 font-semibold">{volunteerName}</span>
              </p>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Task Title *</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Set up registration booth"
                className="w-full bg-vol-bg border border-vol-border rounded-xl px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-vol-accent2 transition-colors"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Description (Optional)</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Add any extra details here..."
                rows={3}
                className="w-full bg-vol-bg border border-vol-border rounded-xl px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-vol-accent2 transition-colors resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Priority</label>
              <div className="flex gap-2">
                {['Low', 'Medium', 'High'].map(p => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setPriority(p)}
                    className={`flex-1 py-2 text-sm font-medium rounded-lg border transition-colors ${
                      priority === p 
                        ? 'bg-vol-accent/20 border-vol-accent2 text-vol-accent2' 
                        : 'bg-vol-bg border-vol-border text-gray-400 hover:text-white hover:border-gray-500'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-4 flex gap-3">
              <button 
                type="button" 
                onClick={onClose}
                className="flex-1 py-2 rounded-xl text-sm font-medium text-gray-300 hover:text-white hover:bg-vol-border/50 border border-transparent transition-colors"
              >
                Cancel
              </button>
              <button 
                type="submit"
                className="flex-1 py-2 rounded-xl text-sm font-medium text-white bg-vol-accent hover:bg-vol-accent2 shadow-glow transition-colors flex items-center justify-center gap-2"
              >
                <Check size={16} /> Assign Task
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
