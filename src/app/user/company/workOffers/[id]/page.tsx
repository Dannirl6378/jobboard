"use client";
import { Box, Button, Input, TextField, Typography } from "@mui/material";
import selectJob from "../selectJob";
import { Job } from "@/types/job";
import { use } from "react";
import { useRouter } from "next/navigation";
import { Heading, SubHeading, Text } from "@/styles/editTypoghraphy";
import updateJob from "../updateJob";

export default function EditWorkOffer({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id: jobid } = use(params);
	const router = useRouter();

	const job = selectJob(jobid);
	console.log("job", job);
	console.log("jobid", job?.id);

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
		const title = document.getElementById("title") as HTMLInputElement;
		const description = document.getElementById(
			"description"
		) as HTMLInputElement;
		const salary = document.getElementById("salary") as HTMLInputElement;
		const location = document.getElementById("location") as HTMLInputElement;
		const updateData = {
			title: title.value,
			description: description.value,
			salary: salary.value,
			location: location.value,
		};
		handleUpdateJob(jobid, updateData);
	};

	return (
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
				/>
			</Box>
			<Box>
				<Text>Job Salary:</Text>
				<TextField
					id='salary'
					variant='outlined'
					defaultValue={job?.salary}
					fullWidth
				/>
			</Box>
			<Box>
				<Text>Job Location:</Text>
				<TextField
					id='location'
					variant='outlined'
					defaultValue={job?.location}
					fullWidth
				/>
			</Box>
			<Box>
				<Text>Job Description</Text>
				<TextField
					id='description'
					variant='outlined'
					multiline
					rows={6}
					defaultValue={job?.description}
					fullWidth
				/>
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
		</form>
	);
}
