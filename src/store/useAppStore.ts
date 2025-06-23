// store/useAppStore.ts
import { fetchUserByEmail, fetchUsers } from "@/lib/api";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type User = {
	id: string;
	name: string;
	email: string;
	role: "admin" | "user" | "TEMPORAL" | "COMPANY";
	passwordHash: string;
	about: string;
	Phone: string;
	CoverLetter: string;
	CV: string;
	created_at: Date;
};
type Job = {
	id: string;
	title: string;
	description: string;
	location: string;
	salary: string;
	companyid: string;
	Attendance: string;
	category: string;
	createdat: Date;
};
type Application = {
	id: string;
	jobid: string;
	userid: string;
	createdAt: Date;
	updatedAt: Date;
};
type AppState = {
	users: Record<string, User>;
	applications: Record<string, Application>;
	jobs: Record<string, Job>;
	LogIn: User | null;
	selectedUserData: User | null; // Přidáno pro uložení dat vybraného uživatele
	selectedJobId: string | null;
	selectedUserId: string | null; // Přidáno pro uložení ID vybraného uživatele
	setSelectedUserData: (user: User | null) => void; // Přidáno pro setter dat vybraného uživatele
	setSelectedUserId: (id: string | null) => void; // Přidáno pro setter ID vybraného uživatele
	setSelectedJobId: (id: string | null) => void;
	setUsers: (users: User[]) => void;
	setJobs: (jobs: Job[]) => void;
	getUserById: (id: string) => User | undefined;
	getJobById: (id: string) => Job | undefined;
	setApplications: (applications: Application[]) => void;
	getApplicationById: (id: string) => Application | undefined;
	setLogIn: (user: User | null) => void;
	fetchAndSetUsers: (email:string) => Promise<void>;
};

export const useAppStore = create<AppState>()(
	persist(
		(set, get) => ({
			users: {},
			jobs: {},
			applications: {},
			LogIn: null,
			selectedJobId: null, // ← přidat výchozí hodnotu
			selectedUserId: null, // Přidáno pro uložení ID vybraného uživatele
			selectedUserData: null,
			setSelectedUserId: (id) => set({ selectedUserId: id }), // Přidáno pro setter ID vybraného uživatele
			setSelectedJobId: (id) => set({ selectedJobId: id }), // ← přidat setter
			setSelectedUserData: (user) => set({ selectedUserData: user }), // Přidáno pro setter dat vybraného uživatele

			setApplications: (applications) => {
				const applicationMap = applications.reduce(
					(acc, application) => {
						acc[application.id] = application;
						return acc;
					},
					{} as Record<string, Application>
				);
				set({ applications: applicationMap });
			},

			setLogIn: (user) => set({ LogIn: user }),

			setUsers: (users) => {
				const userMap = users.reduce(
					(acc, user) => {
						acc[user.id] = user;
						return acc;
					},
					{} as Record<string, User>
				);
				set({ users: userMap });
			},
			setJobs: (jobs) => {
				const jobMap = jobs.reduce(
					(acc, job) => {
						acc[job.id] = job;
						return acc;
					},
					{} as Record<string, Job>
				);
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
			fetchAndSetUsers: async (email:string) => {
				const selectedUserData = await fetchUserByEmail(email);
				set({ selectedUserData }); // nebo jak ukládáš uživatele do store
			},
		}),
		{
			name: "app-storage", // unique name for localStorage
		}
	)
);
