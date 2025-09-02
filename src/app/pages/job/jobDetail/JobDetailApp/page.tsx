"use client";
import { useAppStore } from "@/app/hook/useAppStore";
import { sanitizeHtml } from "@/lib/sanitizeHTML";
import { Job } from "@/types/job";
import { Box, Typography } from "@mui/material";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function JobDetailApp() {
	const params = useParams();
	const jobId = Array.isArray(params.id) ? params.id[0] : params.id;
	const router = useRouter();
	const reloadJobs = useAppStore((state) => state.reloadJobs);
	const jobs = useAppStore((state) => state.jobs);
	const isLogin = useAppStore((state) => state.LogIn);
	const Application = useAppStore((state) => state.applications);

	const [job, setJob] = useState<Job | null>(null);
	const [loading, setLoading] = useState(!job);
	const [error, setError] = useState<string | null>(null);
	const [purifyDescr, setPurifyDescr] = useState("");

	const isRespondet = Object.values(Application).some(
		(application: any) =>
			application.jobid === jobId && application.userid === isLogin?.id
	);

	const CompanyjobId = Object.values(jobs).find((j) => j.id === jobId);
	const CompanyData = useAppStore((state) =>
		CompanyjobId?.companyid
			? state.getUserById(CompanyjobId.companyid)
			: undefined
	);

	useEffect(() => {
		const fetchData = async () => {
			if (!jobId || typeof jobId !== "string") {
				setError("Chybí ID pozice.");
				return;
			}
			const currentJob: Job | null =
				Object.values(jobs).find((j) => j.id === jobId) ?? null;

			if (!currentJob) {
				setLoading(true);
				try {
					await reloadJobs();
					const updatedJob = useAppStore.getState().jobs[jobId];
					if (updatedJob) {
						setJob(updatedJob);
						if (updatedJob.description) {
							const clean = await sanitizeHtml(updatedJob.description);
							setPurifyDescr(clean);
						}
					} else {
						setError("Pozice nenalezena.");
						return;
					}
				} catch {
					setError("Chyba při načítání dat.");
				} finally {
					setLoading(false);
				}
			} else {
				setJob(currentJob);
				if (currentJob.description) {
					sanitizeHtml(currentJob.description).then(setPurifyDescr);
				}
				setLoading(false);
			}
		};
		fetchData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [jobId]);

	const handleApply = () => {
		if (!isLogin) {
			router.push("/pages/application/noLogUser");
			return;
		}
		router.push("/pages/application/userLogIn");
	};

	return {
		state: {
			job,
			purifyDescr,
            loading,
            error,
			isLogin,
			isRespondet,
			router,
			CompanyData,
		},
		actions: { handleApply },
	};
}
