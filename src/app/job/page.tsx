// components/JobsList.tsx
"use client";

import { Box } from "@mui/system";
import JobList from "./JobList/JobList";
import { Typography } from "@mui/material";

const JobsPage = () => {
	return (
		<Box
			position='relative'
			sx={{
				bgcolor: "#cee5fdff",
				p: 2,
				borderRadius: 2,
				maxHeight: "90vh",
				minHeight: "70vh",
				width: "80%",
				ml: "10%",
			}}
		>
			<Typography
				variant='h6'
				sx={{ color: "black", display: "flex", justifyContent: "center",fontFamily:"serif", fontWeight: "bold", mb: 1,fontSize: "1.5rem"	}}
			>
				Nabídky práce
			</Typography>
			<JobList />
		</Box>
	);
};

export default JobsPage;
