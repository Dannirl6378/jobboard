"use client";

import HeaderMainPage from "@/components/HeaderMainPage";
import { sanitizeHtml } from "@/lib/sanitizeHTML";
import { useAppStore } from "@/store/useAppStore";
import { Heading } from "@/styles/editTypoghraphy";
import { Box, Typography, TextField, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const JobDetail = () => {
	const router = useRouter()
  //tady pak načitam job a přihlašeneho uživatele 
	const selectedJobId = useAppStore((state) => state.selectedJobId);
	const jobs = useAppStore((state) => state.jobs);
	const job = selectedJobId ? jobs[selectedJobId] : null;
 const usersArray = useAppStore((state) => state.LogIn);
	const [purifyDescr, setPurifyDescr] = useState("");

	useEffect(() => {
		if (job?.description) {
			sanitizeHtml(job.description).then(setPurifyDescr);
		} else {
			setPurifyDescr("");
		}
	}, [job?.description]);

	if (!job) return <div>Žádná nabídka nevybrána</div>;

	console.log("jobdescrip", job.description);
	console.log("purify", purifyDescr);
	const handleApply = () => {
		router.push("/application/userLogIn");
	}

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
				<Box
					sx={{
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
					}}
				>
					<Heading>Práce</Heading>
					<Button
						variant='contained'
						color='primary'
						onClick={handleApply}
					>
						Apply
					</Button>
				</Box>

				<Box
					sx={{
						display: "flex",
						gap: "2%",
						flexDirection: "row",
						justifyContent: "space-between",
					}}
				>
					<Box>
						<Typography sx={{ color: "black" }}>Job Name:</Typography>
						<TextField
							id='title'
							variant='outlined'
							defaultValue={job?.title}
						/>
					</Box>
					<Box>
						<Typography sx={{ color: "black" }}>Job Salary:</Typography>
						<TextField
							id='salary'
							variant='outlined'
							defaultValue={job?.salary}
						/>
					</Box>
					<Box>
						<Typography sx={{ color: "black" }}>Job Location:</Typography>
						<TextField
							id='location'
							variant='outlined'
							defaultValue={job?.location}
						/>
					</Box>
				</Box>
				<Box
					sx={{
						display: "flex",
						width: "100%",
						height: "45vh",
						overflow: "auto",
						border: "1px solid black",
						borderRadius: "5px",
						color: "black",
						boxShadow: 5,
					}}
				>
					{/*toto pak se zobrazi jako profil při navšteve jineho uživatele */}
					<div
						className='rich-content'
						dangerouslySetInnerHTML={{ __html: purifyDescr ?? "" }}
					/>
				</Box>
			</form>
		</>
	);
};
export default JobDetail;
