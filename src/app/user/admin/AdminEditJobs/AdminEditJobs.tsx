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
		console.log(updateData)
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
					justifyContent: "space-between",
					flexDirection: "column",
					width: "50%",
					height: "fitContent",
					border: "0px solid",
					boxShadow: "5",
					borderRadius: "10",
					overflow:"auto",
					zIndex:1,
					marginLeft:"25%",
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
				<Button variant='contained' onClick={() => setEditJobsOpen(false)}>
					zavřít
				</Button>
			</Box>
		</>
	);
}
