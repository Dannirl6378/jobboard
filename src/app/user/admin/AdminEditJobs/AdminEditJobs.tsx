"use client";
import { Box, Button, TextField } from "@mui/material";
import { Job } from "@/types/job";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Heading, SubHeading, Text } from "@/styles/editTypoghraphy";
import { fetchUpdateJob } from "@/lib/api";
import { useAppStore } from "@/store/useAppStore";
import QuillEditor from "@/components/textEditor/textEditQuill";
import HeaderMainPage from "@/components/HeaderMainPage";

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
			<HeaderMainPage />
			<form
				noValidate
				autoComplete='off'
				style={{
					border: "2px solid #1976d2",
					boxShadow: "0px 4px 24px rgba(25, 118, 210, 0.10)",
					padding: "32px",
					background: "linear-gradient(135deg, #cee5fd 0%, #e3fcec 100%)",
					opacity: 0.98,
					borderRadius: "18px",
					maxHeight: "90vh",
					overflowY: "auto",
					width: "100%",
					maxWidth: 600,
					marginTop: "5%",
					marginRight: "25%",
					display: "flex",
					flexDirection: "column",
					gap: "20px",
					justifyContent: "center",
					fontFamily: "Montserrat, Arial, sans-serif",
				}}
			>
				<Heading
					sx={{
						color: "#1976d2",
						fontFamily: "Montserrat, Arial, sans-serif",
						fontWeight: "bold",
						textAlign: "center",
						mb: 2,
						mt: "35%",
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
			</form>
		</>
	);
}
