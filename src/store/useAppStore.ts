// store/useAppStore.ts
import { create } from 'zustand';

type User = {
  id: string;
  name: string;
  email:string;
  role:string; 
  passwordHash:string;
  about:string;
};
type Job ={
    id: string;
    title: string;
    description: string;
    location: string;
    salary: string;
    companyid: string;
}
type Application = {
    id: string;
    jobid: string;
    userid: string;
    createdAt: Date;
    updatedAt: Date;
}
type AppState = {
    users: Record<string, User>;
    applications: Record<string, Application>;
    jobs: Record<string, Job>;
    setUsers: (users: User[]) => void;
    setJobs: (jobs: Job[]) => void;
    getUserById: (id: string) => User | undefined;
    getJobById: (id: string) => Job | undefined;
    setApplications: (applications: Application[]) => void;
    getApplicationById: (id: string) => Application | undefined;
   
};

export const useAppStore = create<AppState>((set, get) => ({
  users: {},
  jobs: {},
  applications: {},

  setApplications: (applications) => {
    const applicationMap = applications.reduce((acc, application) => {
      acc[application.id] = application;
      return acc;
    }, {} as Record<string, Application>);
    set({ applications: applicationMap });
  },
 

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
  getApplicationById: (id) => {
    return get().applications[id];
  },
}));
