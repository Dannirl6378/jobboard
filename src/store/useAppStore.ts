// store/useAppStore.ts
import { create } from 'zustand';

type User = {
  id: string;
  name: string;
  email:string;
  role:string; 
};
type Job ={
    id: string;
    title: string;
    description: string;
    location: string;
    salary: string;
    company: string;
}

type AppState = {
    users: Record<string, User>;
    jobs: Record<string, Job>;
    setUsers: (users: User[]) => void;
    setJobs: (jobs: Job[]) => void;
    getUserById: (id: string) => User | undefined;
    getJobById: (id: string) => Job | undefined;
};

export const useAppStore = create<AppState>((set, get) => ({
  users: {},
  jobs: {},

  setUsers: (users) => {
    const userMap = users.reduce((acc, user) => {
      acc[user.id] = user;
      return acc;
    }, {} as Record<string, User>);
    set({ users: userMap });
  },
  setJobs: (jobs) => {
    const jobMap = jobs.reduce((acc, job) => {
      acc[job.id] = job;
      return acc;
    }, {} as Record<string, Job>);
    set({ jobs: jobMap });
  },
  getUserById: (id) => {
    return get().users[id];
  },

  getJobById: (id) => {
    return get().jobs[id];
  },
}));
