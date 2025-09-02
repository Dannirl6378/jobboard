"use client"
import { useAppStore } from "@/app/hook/useAppStore";
import { sanitizeHtml } from "@/lib/sanitizeHTML";
import { Job } from "@/types/job";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";



export default function JobListApp(){
    const [page, setPage] = useState(1);
	const jobsPerPage = 15;
	const router = useRouter();
	const setSelectedJobId = useAppStore((state) => state.setSelectedJobId);
	const filteredJobs = useAppStore((state) => state.filteredJobs);
	const jobs = useAppStore((state) => state.jobs);
	const [joby, setJoby] = useState<Job[]>([]);
	const [sanitizedDescriptions, setSanitizedDescriptions] = useState<
		Record<string, string>
	>({});

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const reloadJobs = useAppStore((state) => state.reloadJobs);

	useEffect(() => {
		const load = async () => {
			setLoading(true);
			setError(null);
			try {
				await reloadJobs(); // Zde voláš store metodu, která aktualizuje jobs a filteredJobs v store
			} catch (e) {
				setError("Nepodařilo se načíst nabídky práce.");
			} finally {
				setLoading(false);
			}
		};
		load();
	}, [reloadJobs]);

	useEffect(() => {
		if (filteredJobs.length > 0) {
			setJoby(filteredJobs);
		} else {
			setJoby(Object.values(jobs));
		}
	}, [filteredJobs, jobs]);

	useEffect(() => {
		const fetchSanitizedDescriptions = async () => {
			const descs: Record<string, string> = {};
			for (const job of joby) {
				const shortDesc =
					job.description.length > 25
						? job.description.slice(0, 25) + "..."
						: job.description;
				descs[job.id] = await sanitizeHtml(shortDesc);
			}
			setSanitizedDescriptions(descs);
		};
		fetchSanitizedDescriptions();
	}, [joby]);

	const sortedJobs = [...joby].sort((a, b) => {
		return new Date(b.createdat).getTime() - new Date(a.createdat).getTime();
	});

	const paginatedJobs = sortedJobs.slice(
		(page - 1) * jobsPerPage,
		page * jobsPerPage
	);
	const totalPages = Math.ceil(joby.length / jobsPerPage);

	//JobBoard6378
	const handleJobClick = (id: string) => {
		setSelectedJobId(id);
		router.push(`/pages/job/jobDetail/${id}`);
	};
    return{
        state:{page,jobsPerPage,joby,sanitizedDescriptions,loading,error,paginatedJobs,totalPages},
        actions:{handleJobClick,setPage, setJoby,setSanitizedDescriptions,}
    }
}