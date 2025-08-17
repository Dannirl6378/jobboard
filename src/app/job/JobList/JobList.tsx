"use client";
import { fetchjobs } from "@/lib/api";
import { useAppStore } from "@/store/useAppStore";
import { useEffect, useState } from "react";
import { sanitizeHtml } from "@/lib/sanitizeHTML";
import { Box, Button, List, ListItem, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";
import { Job } from "@/types/job";

const JobList = () => {
	const [page, setPage] = useState(1);
	const jobsPerPage = 15;
	const router = useRouter();
	const setSelectedJobId = useAppStore((state) => state.setSelectedJobId);
	const setJobs = useAppStore((state) => state.setJobs);
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

	if (loading) {
		return (
			<Typography sx={{ color: "black", fontSize: "0.8rem", ml: 1 }}>
				Načítání...
			</Typography>
		);
	}

	if (error) {
		return (
			<Typography sx={{ color: "black", fontSize: "0.8rem", ml: 1 }}>
				{error}
			</Typography>
		);
	}

	if (joby.length === 0) {
		return (
			<Typography sx={{ color: "black", fontSize: "0.8rem", ml: 1 }}>
				Žádné nabídky práce nenalezeny
			</Typography>
		);
	}

	const handleJobClick = (id: string) => {
		setSelectedJobId(id);
		router.push(`/job/jobDetail/${id}`);
	};

	return (
		<>
			<List sx={{ width: "100%", maxWidth: 900, mx: "auto", mt: 3 }}>
				{paginatedJobs.map((job: Job) => (
					<ListItem
						key={job.id}
						onClick={() => handleJobClick(job.id)}
						sx={{
							width: "100%",
							bgcolor: "#f5f7fa",
							borderRadius: 3,
							boxShadow: 4,
							p: { xs: 2, md: 3 },
							mb: 3,
							display: "flex",
							flexDirection: { xs: "column", sm: "row" },
							alignItems: { xs: "flex-start", sm: "center" },
							justifyContent: "space-between",
							gap: 2,
							cursor: "pointer",
							transition: "all 0.2s cubic-bezier(.4,0,.2,1)",
							border: "1.5px solid #cee5fd",
							"&:hover": {
								bgcolor: "#e3fcec",
								color: "#1976d2",
								boxShadow: 8,
								transform: "scale(1.01)",
								borderColor: "#43a047",
							},
							fontFamily: "Montserrat, Arial, sans-serif",
						}}
					>
						<Box sx={{ flex: 2, minWidth: 0 }}>
							<Typography
								variant='h6'
								sx={{
									color: "#1976d2",
									fontWeight: "bold",
									fontSize: "1.3rem",
									mb: 0.5,
									letterSpacing: 0.5,
									overflow: "hidden",
									textOverflow: "ellipsis",
									whiteSpace: "nowrap",
								}}
							>
								{job.title}
							</Typography>
							<Typography
								variant='body2'
								sx={{
									color: "#222",
									opacity: 0.95,
									fontSize: "1rem",
									mb: 1,
									overflow: "hidden",
									textOverflow: "ellipsis",
									whiteSpace: "nowrap",
								}}
								component='div'
								dangerouslySetInnerHTML={{
									__html: sanitizedDescriptions[job.id] || "",
								}}
							/>
							<Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
								<Typography
									variant='body2'
									sx={{ color: "#388e3c", fontWeight: 600 }}
								>
									{job.salary ? `${job.salary} €/měsíc` : "Mzda neuvedena"}
								</Typography>
								<Typography
									variant='body2'
									sx={{ color: "#1976d2", fontWeight: 600 }}
								>
									{job.location}
								</Typography>
								<Typography
									variant='body2'
									sx={{ color: "#43a047", fontWeight: 600 }}
								>
									{job.category}
								</Typography>
							</Box>
						</Box>
						<Box
							sx={{
								flex: 1,
								minWidth: 120,
								textAlign: { xs: "left", sm: "right" },
							}}
						>
							<Typography
								variant='body2'
								sx={{
									color: "#888",
									fontSize: "0.95rem",
									fontWeight: 500,
								}}
							>
								{new Date(job.createdat).toLocaleDateString()}
							</Typography>
						</Box>
					</ListItem>
				))}
			</List>

			<Box
				sx={{ display: "flex", justifyContent: "center", mt: 1, mb: 1, pb: 5 }}
			>
				<Button
					variant='contained'
					disabled={page === 1}
					onClick={() => setPage(page - 1)}
					sx={{
						bgcolor: "#1976d2",
						color: "#fff",
						fontWeight: "bold",
						fontFamily: "Montserrat, Arial, sans-serif",
						"&:hover": { bgcolor: "#1565c0" },
						mr: 2,
					}}
				>
					Předchozí
				</Button>
				<Typography
					sx={{
						mx: 2,
						fontWeight: "bold",
						color: "#1976d2",
						fontFamily: "Montserrat, Arial, sans-serif",
					}}
				>
					Stránka {page} / {totalPages}
				</Typography>
				<Button
					variant='contained'
					disabled={page * jobsPerPage >= joby.length}
					onClick={() => setPage(page + 1)}
					sx={{
						bgcolor: "#1976d2",
						color: "#fff",
						fontWeight: "bold",
						fontFamily: "Montserrat, Arial, sans-serif",
						"&:hover": { bgcolor: "#1565c0" },
					}}
				>
					Další
				</Button>
			</Box>
		</>
	);
};

export default JobList;
