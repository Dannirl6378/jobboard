"use client";
import { fetchjobs } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
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
	const [joby, setJoby] = useState<Job[]>([]);
	const [sanitizedDescriptions, setSanitizedDescriptions] = useState<
		Record<string, string>
	>({});
	const { data, error, isLoading } = useQuery<Job[]>({
		queryKey: ["jobs"],
		queryFn: fetchjobs,
	});
	const filteredJobs = useAppStore((state) => state.filteredJobs);
	const paginatedJobs = joby.slice(
		(page - 1) * jobsPerPage,
		page * jobsPerPage
	);
	const totalPages = Math.ceil(joby.length / jobsPerPage);
	useEffect(() => {
		if (data) {
			useAppStore.getState().setJobs(data); // předpokládám, že chceš uložit všechny joby
			if (filteredJobs && filteredJobs.length > 0) {
				setJoby(filteredJobs);
			} else {
				setJoby(data);
			}
		}
	}, [data, filteredJobs]);

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
	if (isLoading) {
		return (
			<Typography
				sx={{
					color: "black",
					fontSize: "0.8rem",
					ml: 1,
				}}
			>
				Loading...
			</Typography>
		);
	}
	if (error instanceof Error)
		return (
			<Typography
				sx={{
					color: "black",
					fontSize: "0.8rem",
					ml: 1,
				}}
			>
				Error: ...{error.message}
			</Typography>
		);

	if (!data) {
		return (
			<Typography
				sx={{
					color: "black",
					fontSize: "0.8rem",
					ml: 1,
				}}
			>
				No Job found
			</Typography>
		);
	}

	const handleJobClick = (id: string) => {
		// např. router.push(`/job/${id}`)
		setSelectedJobId(id);
		router.push(`/job/jobDetail`);
	};

	return (
		<>
			<List>
				{paginatedJobs?.map((job: Job) => (
					<ListItem
						key={job.id}
						onClick={() => handleJobClick(job.id)}
						sx={{
							color: "#222222",
							backgroundColor: "#f5f7fa",
							flexDirection: "column", // důležité pro vertikální rozložení
							alignItems: "flex-start",
							gap: 1,
							boxShadow: 3,
							borderRadius: 2,
							p: { xs: 1, md: 2 },
							mb: 2,
							maxHeight: "17vh",
							transition: "all 0.2s cubic-bezier(.4,0,.2,1)",
							cursor: "pointer",
							"&:hover": {
								backgroundColor: "#8ffdb79a",
								color: "#1976d2",
								boxShadow: 8,
								transform: "scale(1.01)",
							},
						}}
					>
						<Typography
							variant='h6'
							sx={{
								color: "black",
								fontSize: "1.4rem",
								textDecoration: "underline",
							}}
						>
							{job.title}
						</Typography>

						<Typography
							variant='body2'
							sx={{
								color: "black",
								opacity: 0.9,
								fontSize: "0.8rem",
								ml: 2,
							}}
							component='div'
							dangerouslySetInnerHTML={{
								__html: sanitizedDescriptions[job.id] || "",
							}}
						/>

						<Typography
							variant='body2'
							sx={{
								color: "black",
								opacity: 0.9,
								fontSize: "0.8rem",
								ml: 4,
							}}
						>
							{job.salary}/měsíc
						</Typography>

						<Typography
							variant='body2'
							sx={{
								color: "black",
								opacity: 0.7,
								fontSize: "0.8rem",
								ml: 6,
							}}
						>
							{job.location}
						</Typography>

						<Box
							sx={{
								width: "100%",
								display: "flex",
								justifyContent: "flex-end",
								pr: "5%",
							}}
						>
							<Typography
								variant='body2'
								component='div'
								sx={{
									color: "black",
									opacity: 0.9,
									fontSize: "0.8rem",
									mt: -5,
								}}
							>
								{job.createdat instanceof Date
									? job.createdat.toLocaleDateString()
									: new Date(job.createdat).toLocaleDateString()}
							</Typography>
						</Box>
					</ListItem>
				))}
			</List>
			<Box
				sx={{
					border: "0px solid",
					display: "flex",
					justifyContent: "center",
					mt: 1,
					mb: 1,
					pb: 5,
				}}
			>
				<Button
					variant='contained'
					disabled={page === 1}
					onClick={() => setPage(page - 1)}
					sx={{ mr: 2 }}
				>
					Předchozí
				</Button>
				<Typography sx={{ mx: 2, fontWeight: "bold", color: "black" }}>
					Stránka {page} / {totalPages}
				</Typography>
				<Button
					variant='contained'
					disabled={page * jobsPerPage >= joby.length}
					onClick={() => setPage(page + 1)}
				>
					Další
				</Button>
			</Box>
		</>
	);
};
export default JobList;
