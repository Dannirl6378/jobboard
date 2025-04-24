"use client";

import { Grid, Box } from "@mui/material";
import JobFilterPanel from "./job/JobFilterPanel";
import HeaderMainPage from "@/components/HeaderMainPage";
import { useEffect, useState } from "react";
import JobsList from "@/app/job/JobsList";
import Head from "next/head";
//V jakékoli komponentě, kde budeš potřebovat např.
// jméno autora nabídky práce nebo název jobu, jednoduše použiješ:
//const user = useAppStore((state) => state.getUserById(application.userId));
//const job = useAppStore((state) => state.getJobById(application.jobId));

export default function Home() {
	const [mounted, setMounted] = useState(false);
	//tento kod je pro hdrytation error
	//kdybychom to nedali do useEffectu, tak by se to spustilo na serveru a
	//vytvořilo by to hydration error
	useEffect(() => {
		setMounted(true); // Tento kód se spustí až na klientovi
	}, []);

	if (!mounted) return null; // Nebude se renderovat, dokud komponenta není na klientovi
	return (
		<>
			<Head>
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<Box
				sx={{
					flexGrow: 1,
					bgcolor: "#f9fafb",
					height: "100vh",
					width: "100vw",
				}}
			>
				{/* <HeaderMainPage /> */}
				<Grid container spacing={2}>
					<Grid
						size={{ xs: 12 }}
						sx={{
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							mt: -4,
							maxWidth: "100vw",
							justifyContent: "center",
						}}
					>
						<Grid size={{ xs: 12, md: 12 }}>
							<HeaderMainPage />
						</Grid>
						<Grid size={{ xs: 12, md: 10 }}>
							<JobFilterPanel />
						</Grid>
					</Grid>
					<Grid
						size={{ xs: 12 }}
						sx={{
							display: "flex",
							flexDirection: "row",
							justifyContent: "center",
						}}
					>
						<Grid
							size={{ xs: 12, md: 6 }}
							sx={{ maxWidth: "120vw", minWidth: "80vw" }}
						>
							<JobsList />
						</Grid>
					</Grid>
				</Grid>
			</Box>
		</>
	);
}
