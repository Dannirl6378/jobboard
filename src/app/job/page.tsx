// components/JobsList.tsx
"use client";

import { Box } from "@mui/system";
import JobList from "./JobList";
import { Typography } from "@mui/material";

const JobsPage = () => {
	return (
		<Box
			position='relative'
			sx={{
				bgcolor: "#D5DEFF",
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
				sx={{ color: "black", display: "flex", justifyContent: "center" }}
			>
				Seznam nabídek
			</Typography>
			<JobList />
		</Box>
	);
};

export default JobsPage;
