import { create } from 'zustand';
import { getToken, removeToken } from '@/lib/auth';

export const useUserStore = create((set) => ({
  user: null,
  loading: false,
  error: null,
  setUser: (user) => set({ user }),
  fetchUser: async () => {
    const token = getToken();
    if (!token) {
      set({ user: null, loading: false });
      return;
    }
    set({ loading: true, error: null });
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://eventflow-backend-0ctf.onrender.com'}/users/me`, {
        headers: {
          'Authorization': `bearer ${token}`
        }
      });
      if (!response.ok) {
        throw new Error('Failed to fetch user');
      }
      const data = await response.json();
      set({ user: data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false, user: null });
    }
  },
  logout: () => {
    removeToken();
    set({ user: null });
  }
}));
