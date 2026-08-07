import { create } from 'zustand';

// Generate some mock initial tasks for the directory view
const initialTasks = [
  { id: 'T001', title: 'Set up registration booth', description: 'Bring the tables and lanyards to the front entrance.', priority: 'High', completed: false, volunteerId: 'V002', eventId: 1 },
  { id: 'T002', title: 'Help with crowd flow', description: 'Guide attendees to the main hall after check-in.', priority: 'Medium', completed: true, volunteerId: 'V003', eventId: 1 },
  { id: 'T003', title: 'Test A/V equipment', description: 'Ensure all mics and speakers in Room B are working.', priority: 'High', completed: false, volunteerId: 'V007', eventId: 1 },
];

export const useTaskStore = create((set) => ({
  tasks: initialTasks,
  
  addTask: (task) => set((state) => ({
    tasks: [...state.tasks, { ...task, id: `T${String(state.tasks.length + 1).padStart(3, '0')}` }]
  })),

  toggleTaskCompletion: (taskId) => set((state) => ({
    tasks: state.tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    )
  })),

  removeTask: (taskId) => set((state) => ({
    tasks: state.tasks.filter(task => task.id !== taskId)
  }))
}));
