"use client";

import { Grid, Box } from "@mui/material";
import JobFilterPanel from "./job/JobFilterPanel";
import HeaderMainPage from "@/components/HeaderMainPage";
import { useState } from "react";
import LeftCheckBoxs from "@/components/LeftCheckBoxs";
import JobsList from "@/components/JobsList";
//V jakékoli komponentě, kde budeš potřebovat např.
// jméno autora nabídky práce nebo název jobu, jednoduše použiješ:
//const user = useAppStore((state) => state.getUserById(application.userId));
//const job = useAppStore((state) => state.getJobById(application.jobId));

export default function Home() {
	const [isloggedin, setLoggedIn] = useState(false);
	return (
		<Box sx={{ flexGrow: 1, bgcolor: "#f9fafb", p: 2,height:'100vh' }}>
      {/* <HeaderMainPage /> */}
			<Grid container spacing={2}>
				<Grid
					size={{ xs: 12 }}
					sx={{
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
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
					
					<Grid size={{ xs: 12, md: 6 }}sx={{ml:0,maxWidth:'120vw',minWidth:'80vw'}}>
						<JobsList />
					</Grid>
				</Grid>
			</Grid>
		</Box>
	);
}


