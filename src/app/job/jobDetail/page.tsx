"use client";

import HeaderMainPage from "@/components/HeaderMainPage";
import { sanitizeHtml } from "@/lib/sanitizeHTML";
import { useAppStore } from "@/store/useAppStore";
import { Heading } from "@/styles/editTypoghraphy";
import { Box, Typography, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const JobDetail = () => {
	const router = useRouter();
	const selectedJobId = useAppStore((state) => state.selectedJobId);
	const jobs = useAppStore((state) => state.jobs);
	const job = selectedJobId ? jobs[selectedJobId] : null;
	const isLogin = useAppStore((state) => state.LogIn);
	const usersArray = useAppStore((state) => state.LogIn);
	const [purifyDescr, setPurifyDescr] = useState("");

	useEffect(() => {
		if (job?.description) {
			sanitizeHtml(job.description).then(setPurifyDescr);
		} else {
			setPurifyDescr("");
		}
	}, [job?.description]);

	const handleApply = () => {
		if (usersArray === null) {
			router.push("/application/noLogUser");
			return;
		} else {
			router.push("/application/userLogIn");
		}
	};

	return (
		<>
			<HeaderMainPage />
			<Box
				sx={{
					minHeight: "100vh",
					bgcolor: "linear-gradient(135deg, #cee5fd 0%, #e3fcec 100%)",
					display: "flex",
					justifyContent: "center",
					alignItems: "flex-start",
					py: 6,
				}}
			>
				<Box
					sx={{
						bgcolor: "white",
						borderRadius: 4,
						boxShadow: 8,
						maxWidth: 700,
						width: "100%",
						mx: "auto",
						p: { xs: 2, sm: 5 },
						display: "flex",
						flexDirection: "column",
						gap: 3,
						fontFamily: "Montserrat, Arial, sans-serif",
					}}
				>
					<Box
						sx={{
							display: "flex",
							justifyContent: "space-between",
							alignItems: "center",
							mb: 2,
						}}
					>
						<Heading
							sx={{
								color: "#1976d2",
								fontWeight: "bold",
								letterSpacing: 1,
							}}
						>
							{job?.title || "Pracovní pozice"}
						</Heading>
						{isLogin?.role !== "COMPANY" && (
							<Button
								variant='contained'
								onClick={handleApply}
								sx={{
									bgcolor: "#1976d2",
									color: "#fff",
									fontWeight: "bold",
									fontFamily: "Montserrat, Arial, sans-serif",
									"&:hover": { bgcolor: "#1565c0" },
									px: 4,
									py: 1.5,
									borderRadius: 2,
									boxShadow: 2,
								}}
							>
								Odpovědět na nabídku
							</Button>
						)}
					</Box>

					<Box
						sx={{
							display: "flex",
							flexWrap: "wrap",
							gap: 4,
							mb: 2,
						}}
					>
						<Box>
							<Typography
								sx={{
									color: "#388e3c",
									fontWeight: 600,
									fontSize: 18,
								}}
							>
								Mzda:
							</Typography>
							<Typography
								sx={{
									color: "#222",
									fontWeight: "bold",
									fontSize: 20,
								}}
							>
								{job?.salary ? `${job.salary} Kč` : "Neuvedeno"}
							</Typography>
						</Box>
						<Box>
							<Typography
								sx={{
									color: "#388e3c",
									fontWeight: 600,
									fontSize: 18,
								}}
							>
								Lokalita:
							</Typography>
							<Typography
								sx={{
									color: "#222",
									fontWeight: "bold",
									fontSize: 20,
								}}
							>
								{job?.location || "Neuvedeno"}
							</Typography>
						</Box>
						<Box>
							<Typography
								sx={{
									color: "#388e3c",
									fontWeight: 600,
									fontSize: 18,
								}}
							>
								Kategorie:
							</Typography>
							<Typography
								sx={{
									color: "#222",
									fontWeight: "bold",
									fontSize: 20,
								}}
							>
								{job?.category || "Neuvedeno"}
							</Typography>
						</Box>
						<Box>
							<Typography
								sx={{
									color: "#388e3c",
									fontWeight: 600,
									fontSize: 18,
								}}
							>
								Typ úvazku:
							</Typography>
							<Typography
								sx={{
									color: "#222",
									fontWeight: "bold",
									fontSize: 20,
								}}
							>
								{job?.Attendance|| "Neuvedeno"}
							</Typography>
						</Box>
					</Box>

					<Box
						sx={{
							width: "100%",
							minHeight: 120,
							maxHeight: 350,
							overflow: "auto",
							border: "1.5px solid #cee5fd",
							borderRadius: 3,
							bgcolor: "#f5f7fa",
							color: "#222",
							p: 3,
							boxShadow: 2,
						}}
					>
						<Typography
							variant='h6'
							sx={{
								color: "#1976d2",
								fontWeight: "bold",
								mb: 2,
								fontFamily: "Montserrat, Arial, sans-serif",
							}}
						>
							Popis pracovní pozice
						</Typography>
						<div
							className='rich-content'
							dangerouslySetInnerHTML={{ __html: purifyDescr ?? "" }}
						/>
					</Box>
				</Box>
			</Box>
		</>
	);
};

export default JobDetail;
