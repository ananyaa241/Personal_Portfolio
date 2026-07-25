import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Generate some dummy questions
const generateDummyQuestions = (moduleName, count) => {
  return Array.from({ length: count }, (_, i) => ({
    id: `${moduleName}-${i + 1}`,
    text: `Sample question ${i + 1} for ${moduleName}`,
    module: moduleName
  }));
};

const useStore = create(
  persist(
    (set) => ({
      users: [
        { id: 1, username: 'admin', password: 'password', role: 'admin', assignedModules: [] }
      ],
      currentUser: null,
      modules: ['VIII CBSE', 'NEET'],
      availableQuestions: {
        'VIII CBSE': generateDummyQuestions('VIII CBSE', 20),
        'NEET': generateDummyQuestions('NEET', 20),
      },

      // Actions
      login: (username, password) => set((state) => {
        const user = state.users.find(u => u.username === username && u.password === password);
        if (user) {
          return { currentUser: user };
        }
        return {};
      }),

      logout: () => set({ currentUser: null }),

      addUser: (newUser) => set((state) => ({
        users: [...state.users, { ...newUser, id: Date.now() }]
      }))
    }),
    {
      name: 'question-bank-storage',
    }
  )
);

export default useStore;
