import { fetchjobs } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { useAppStore } from "@/store/useAppStore";
import { useEffect, useState } from "react";
import { sanitizeHtml } from "@/lib/sanitizeHTML";
import { Box, List, ListItem, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";
import { Job } from "@/types/job";

const JobList = () => {
	const router = useRouter();
	const setSelectedJobId = useAppStore((state) => state.setSelectedJobId);
	const [joby, setJoby] = useState<Job[]>([]);
	const [sanitizedDescriptions, setSanitizedDescriptions] = useState<
		Record<string, string>
	>({});
	const { data, error, isLoading } = useQuery({
		queryKey: ["jobs"],
		queryFn: fetchjobs,
	});

	useEffect(() => {
		if (data) {
			useAppStore.getState().setJobs(data);
			setJoby(data);
		}
	}, [data]);

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
		<List>
			{joby?.map((job: Job) => (
				<ListItem
					key={job.id}
					onClick={() => handleJobClick(job.id)}
					sx={{
						color: "black",
						flexDirection: "column", // důležité pro vertikální rozložení
						alignItems: "flex-start",
						gap: 1,
						boxShadow: 3,
						borderRadius: 2,
						p: 2,
						mb: 2,
						maxHeight: "17vh",
						transition: "background 0.2s, box-shadow 0.2s",
						cursor: "pointer",
						"&:hover": {
							backgroundColor: "#e3e8f0",
							boxShadow: 6,
						},
					}}
				>
					<Typography variant='h6' sx={{ color: "black", fontSize: "1.4rem" }}>
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
							{job.createdAt instanceof Date
								? job.createdAt.toLocaleDateString()
								: new Date(job.createdAt).toLocaleDateString()}
						</Typography>
					</Box>
				</ListItem>
			))}
		</List>
	);
};
export default JobList;
