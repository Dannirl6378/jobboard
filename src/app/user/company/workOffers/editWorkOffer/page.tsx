"use client";
import { Box, Button, Input, TextField, Typography } from "@mui/material";
import selectJob from "../selectJob";
import { Job } from "@/types/job";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Heading, SubHeading, Text } from "@/styles/editTypoghraphy";
import updateJob from "./updateJob";
import { useAppStore } from "@/store/useAppStore";
import HeaderMainPage from "@/components/HeaderMainPage";
import deleteJob from "../deleteWorkOffer/deleteJob";
import QuillEditor from "@/components/textEditor/textEditQuill";

export default function EditWorkOffer() {
	const router = useRouter();
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [salary, setSalary] = useState("");
	const [location, setLocation] = useState("");
	const [about, setAbout] = useState<string>("");
	const [isEnable, setIsEnable] = useState<boolean>(true); // Set default as needed
	const [purifyAbout, setPurifyAbout] = useState<string>("");

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

	const handleBack = () => {
		router.push("/user"); // Použití useNavigate pro přesměrování
	};

	const handleUpdateJob = async (jobid: string, updateData: Partial<Job>) => {
		try {
			const updatedJob = await updateJob(jobid, updateData);
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

	const handleDelete = async () => {
		if (!selectedJobId) return;
		try {
			await deleteJob(selectedJobId);
		} catch (error) {
			console.error("nelze smazat", error);
		}
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
					border: "1px solid gray",
					boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.2)",
					padding: "16px",
					backgroundColor: "#F5F5F5",
					opacity: 0.8,
					borderRadius: "8px",
					maxHeight: "100vh",
					overflowY: "auto",
					width: "80%",
					marginTop: "10%",
					marginLeft: "10%",
					display: "flex",
					flexDirection: "column",
					gap: "24px",
					justifyContent: "center",
				}}
			>
				<Heading>Edit Work Offer</Heading>
				<Box>
					<SubHeading>Job Name: {job?.title}</SubHeading>
					<TextField
						id='title'
						variant='outlined'
						defaultValue={job?.title}
						fullWidth
						onChange={(e) => setTitle(e.target.value)}
					/>
				</Box>
				<Box>
					<Text>Job Salary:</Text>
					<TextField
						id='salary'
						variant='outlined'
						defaultValue={job?.salary}
						fullWidth
						onChange={(e) => setSalary(e.target.value)}
					/>
				</Box>
				<Box>
					<Text>Job Location:</Text>
					<TextField
						id='location'
						variant='outlined'
						defaultValue={job?.location}
						fullWidth
						onChange={(e) => setLocation(e.target.value)}
					/>
				</Box>
				<Box>
					<Text>Job Description</Text>
					{/*Toto se zobrazi jen když dám upravit profil */}
					
						
						
							<QuillEditor value={about} onChange={setAbout} edit={isEnable} />
					
						
					
						
				</Box>

				<Button
					variant='contained'
					onClick={() => {
						// Zde byste měli implementovat logiku pro uložení změn
						console.log("Changes saved");
						handleSaveChanges();
					}}
				>
					Uložit změny
				</Button>
				<Button variant='contained' onClick={handleBack}>
					zpět
				</Button>
				<Button variant='contained' onClick={handleDelete}>
					smazat nabidku
				</Button>
			</form>
		</>
	);
}
