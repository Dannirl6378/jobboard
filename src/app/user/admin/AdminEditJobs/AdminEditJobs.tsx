"use client";
import { Box, Button, TextField } from "@mui/material";
import { Job } from "@/types/job";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Heading, SubHeading, Text } from "@/styles/editTypoghraphy";
import { fetchUpdateJob } from "@/lib/api";
import { useAppStore } from "@/store/useAppStore";
import QuillEditor from "@/components/textEditor/textEditQuill";

type AdminEditJobsProps = {
	setEditJobsOpen: Dispatch<SetStateAction<boolean>>;
};

export default function AdminEditJobs({ setEditJobsOpen }: AdminEditJobsProps) {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [salary, setSalary] = useState("");
	const [location, setLocation] = useState("");
	const [about, setAbout] = useState<string>("");
	const [isEnable, setIsEnable] = useState<boolean>(true); // Set default as needed
	const [purifyAbout, setPurifyAbout] = useState<string>(""); //tady se zamyslet jestli budu toto potřebovat

	const selectedJobId = useAppStore((state) => state.selectedJobId);
	const jobs = useAppStore((state) => state.jobs);
	const job = selectedJobId ? jobs[selectedJobId] : null;

	//const job = selectJob(jobid);
	console.log("job", job);
	console.log("jobid", job?.id);

	useEffect(() => {
		if (job) {
			setTitle(job.title || "");
			setDescription(job.description || "");
			setSalary(job.salary?.toString() || "");
			setLocation(job.location || "");
		}
	}, [job]);

	const handleUpdateJob = async (jobid: string, updateData: Partial<Job>) => {
		console.log(updateData);
		console.log(jobid);
		try {
			const updatedJob = await fetchUpdateJob(jobid, updateData);
			console.log("Updated job:", updatedJob);
			// Zde můžete přidat další logiku, např. aktualizaci stavu nebo přesměrování
		} catch (error) {
			console.error("Error updating job:", error);
			// Zde můžete přidat další logiku pro zpracování chyby
		}
	};
	const handleSaveChanges = () => {
		if (!selectedJobId) return;
		const updateData = {
			title,
			description,
			salary,
			location,
		};
		handleUpdateJob(selectedJobId, updateData);
	};

	// Add missing state variables for about, isEnable, and purifyAbout

	useEffect(() => {
		if (job) {
			setAbout(job.description || "");
			setPurifyAbout(job.description || "");
		}
	}, [job]);

	return (
		<>
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					width: { xs: "95vw", sm: 500 },
					maxWidth: 600,
					mx: "auto",
					mt: 4,
					p: { xs: 2, sm: 4 },
					bgcolor: "#f5f7fa",
					borderRadius: 3,
					boxShadow: 6,
					overflow: "auto",
					zIndex: 10,
					fontFamily: "Montserrat, Arial, sans-serif",
					gap: 3,
				}}
			>
				<Heading
					sx={{
						color: "#1976d2",
						fontFamily: "Montserrat, Arial, sans-serif",
						fontWeight: "bold",
						textAlign: "center",
						mb: 2,
					}}
				>
					Upravit pracovní nabídku
				</Heading>
				<Box>
					<SubHeading sx={{ color: "#388e3c" }}>Název pozice:</SubHeading>
					<TextField
						id='title'
						variant='outlined'
						value={title}
						fullWidth
						onChange={(e) => setTitle(e.target.value)}
						sx={{ bgcolor: "white", borderRadius: 1 }}
					/>
				</Box>
				<Box>
					<SubHeading sx={{ color: "#388e3c" }}>Mzda:</SubHeading>
					<TextField
						id='salary'
						variant='outlined'
						value={salary}
						fullWidth
						onChange={(e) => setSalary(e.target.value)}
						sx={{ bgcolor: "white", borderRadius: 1 }}
					/>
				</Box>
				<Box>
					<SubHeading sx={{ color: "#388e3c" }}>Lokalita:</SubHeading>
					<TextField
						id='location'
						variant='outlined'
						value={location}
						fullWidth
						onChange={(e) => setLocation(e.target.value)}
						sx={{ bgcolor: "white", borderRadius: 1 }}
					/>
				</Box>
				<Box>
					<SubHeading sx={{ color: "#388e3c" }}>Popis pozice:</SubHeading>
					<QuillEditor value={about} onChange={setAbout} edit={isEnable} />
				</Box>
				<Box sx={{ display: "flex", gap: 2, justifyContent: "center", mt: 2 }}>
					<Button
						variant='contained'
						onClick={() => {
							handleSaveChanges();
						}}
						sx={{
							bgcolor: "#1976d2",
							color: "#fff",
							fontWeight: "bold",
							fontFamily: "Montserrat, Arial, sans-serif",
							"&:hover": { bgcolor: "#1565c0" },
						}}
					>
						Uložit změny
					</Button>
					<Button
						variant='contained'
						onClick={() => setEditJobsOpen(false)}
						sx={{
							bgcolor: "#43a047",
							color: "#fff",
							fontWeight: "bold",
							fontFamily: "Montserrat, Arial, sans-serif",
							"&:hover": { bgcolor: "#2e7031" },
						}}
					>
						Zavřít
					</Button>
				</Box>
			</Box>
		</>
	);
}
