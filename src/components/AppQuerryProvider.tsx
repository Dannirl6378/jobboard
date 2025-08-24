"use client";
import { useQuery } from "@tanstack/react-query";
import { fetchjobs, fetchUsers, fetchApplication } from "@/app/hook/api";
import { useAppStore } from "@/app/hook/useAppStore";
import { useEffect } from "react";

const AppDataFetcher = () => {
	const { setJobs, setUsers, setApplications } = useAppStore();

	const { data: jobs } = useQuery({ queryKey: ["jobs"], queryFn: fetchjobs });
	const { data: users } = useQuery({
		queryKey: ["users"],
		queryFn: fetchUsers,
	});
	const { data: applications } = useQuery({
		queryKey: ["applications"],
		queryFn: fetchApplication,
	});

	useEffect(() => {
		if (jobs) setJobs(jobs);
		if (users) setUsers(users);
		if (applications) setApplications(applications);
	}, [jobs, users, applications]);

	return null; // nic nevykresluje, jen fetchuje a ukládá
};

export default AppDataFetcher;
