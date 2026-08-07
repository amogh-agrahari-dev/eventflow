import React, { useState } from 'react';
import { X, Check, MapPin, AlertCircle, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AssignTaskModal({
  isOpen,
  onClose,
  onAssign,
  volunteer,
  volunteerName,
  eventId,
  onTaskCreated,
}) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [importance, setImportance] = useState('medium');
  const [location, setLocation] = useState('');
  const [status, setStatus] = useState('pending');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  if (!isOpen) return null;

  const targetVolunteerName = volunteer?.name || volunteerName || 'Volunteer';
  const targetUserId = volunteer?.id || volunteer?.user_id;

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setImportance('medium');
    setLocation('');
    setStatus('pending');
    setErrorMessage(null);
    setIsSubmitting(false);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    setIsSubmitting(true);
    setErrorMessage(null);

    const payload = {
      title: title.trim(),
      status: status || 'pending',
      description: description.trim() || null,
      importance: (importance || 'medium').toLowerCase(),
      location: location.trim() || null,
      event_id: eventId ? Number(eventId) : null,
      user_id: targetUserId ? Number(targetUserId) : null,
    };

    try {
      const headers = {
        'Content-Type': 'application/json',
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/tasks/create`,
        {
          method: 'POST',
          headers,
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        let errDetail = `Server responded with status ${response.status}`;
        try {
          const errData = await response.json();
          if (errData.detail) {
            errDetail = typeof errData.detail === 'string' ? errData.detail : JSON.stringify(errData.detail);
          } else if (errData.message) {
            errDetail = errData.message;
          }
        } catch {
          // ignore json parse error
        }
        throw new Error(errDetail);
      }

      const createdTask = await response.json();
      console.log('Task created successfully:', createdTask);

      if (onTaskCreated) {
        onTaskCreated(createdTask || payload);
      }

      if (onAssign) {
        onAssign({
          ...payload,
          id: createdTask?.id || Date.now(),
          completed: payload.status === 'completed',
        });
      }

      handleClose();
    } catch (err) {
      console.error('Error creating task:', err);
      setErrorMessage(err.message || 'Failed to create task. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="bg-vol-card border border-vol-border w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden"
        >
          <div className="flex items-center justify-between p-5 border-b border-vol-border/60">
            <div>
              <h2 className="text-lg font-bold text-white tracking-tight">Assign Volunteer Task</h2>
              <p className="text-xs text-gray-400 mt-0.5">
                Assigning to: <span className="text-vol-accent2 font-semibold">{targetVolunteerName}</span>
                {targetUserId && <span className="text-gray-500 ml-1">(ID #{targetUserId})</span>}
              </p>
            </div>
            <button
              onClick={handleClose}
              disabled={isSubmitting}
              className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-vol-border/50 transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          {errorMessage && (
            <div className="mx-5 mt-4 p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl flex items-start gap-2.5 text-xs text-rose-300">
              <AlertCircle size={16} className="shrink-0 text-rose-400 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="p-5 space-y-4">
            {/* Task Title */}
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5 uppercase tracking-wider">
                Task Title <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Stage Equipment Setup"
                className="w-full bg-vol-bg border border-vol-border rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-vol-accent2 transition-colors"
              />
            </div>

            {/* Location */}
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5 uppercase tracking-wider">
                Location (Optional)
              </label>
              <div className="relative">
                <MapPin size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Auditorium Front Gate / Booth 3"
                  className="w-full bg-vol-bg border border-vol-border rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-vol-accent2 transition-colors"
                />
              </div>
            </div>

            {/* Importance */}
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5 uppercase tracking-wider">
                Importance Level
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { key: 'low', label: 'Low', color: 'hover:border-emerald-500/50', active: 'bg-emerald-500/15 border-emerald-500/40 text-emerald-400' },
                  { key: 'medium', label: 'Medium', color: 'hover:border-amber-500/50', active: 'bg-amber-500/15 border-amber-500/40 text-amber-400' },
                  { key: 'high', label: 'High', color: 'hover:border-rose-500/50', active: 'bg-rose-500/15 border-rose-500/40 text-rose-400' },
                ].map((item) => (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => setImportance(item.key)}
                    className={`py-2 rounded-xl text-xs font-semibold border transition-all ${
                      importance === item.key
                        ? item.active
                        : `bg-vol-bg border-vol-border text-gray-400 ${item.color}`
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5 uppercase tracking-wider">
                Description (Optional)
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Specify requirements, safety guidelines, or instructions..."
                rows={3}
                className="w-full bg-vol-bg border border-vol-border rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-vol-accent2 transition-colors resize-none"
              />
            </div>

            {/* Action Buttons */}
            <div className="pt-3 flex gap-3">
              <button
                type="button"
                onClick={handleClose}
                disabled={isSubmitting}
                className="flex-1 py-2.5 rounded-xl text-sm font-medium text-gray-300 hover:text-white hover:bg-vol-border/50 border border-vol-border transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting || !title.trim()}
                className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white bg-vol-accent hover:bg-vol-accent2 shadow-glow transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Creating Task...
                  </>
                ) : (
                  <>
                    <Check size={16} />
                    Assign Task
                  </>
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
