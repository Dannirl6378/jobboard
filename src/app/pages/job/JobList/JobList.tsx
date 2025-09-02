"use client";
import { Box, Button, List, Typography } from "@mui/material";
import React from "react";
import JobListApp from "./JobListApp/page";
import JobListPgJobs from "./JobListPgJobs/page";
import JobListControlsPage from "./JobListControlsPage/page";

const JobList = () => {
	const {
		state: {
			page,
			jobsPerPage,
			joby,
			sanitizedDescriptions,
			loading,
			error,
			paginatedJobs,
			totalPages,
		},
		actions: { handleJobClick, setPage, setJoby, setSanitizedDescriptions },
	} = JobListApp();

	if (loading) {
		return (
			<Typography sx={{ color: "black", fontSize: "0.8rem", ml: 1 }}>
				Načítání...
			</Typography>
		);
	}

	if (error) {
		return (
			<Typography sx={{ color: "black", fontSize: "0.8rem", ml: 1 }}>
				{error}
			</Typography>
		);
	}

	if (joby.length === 0) {
		return (
			<Typography sx={{ color: "black", fontSize: "0.8rem", ml: 1 }}>
				Žádné nabídky práce nenalezeny
			</Typography>
		);
	}
	//JobBoard6378

	return (
		<>
			<List sx={{ width: "100%", maxWidth: 900, mx: "auto", mt: 3 }}>
				<JobListPgJobs
					paginatedJobs={paginatedJobs}
					sanitizedDescriptions={sanitizedDescriptions}
					handleJobClick={handleJobClick}
				/>
			</List>
			<JobListControlsPage
				page={page}
				totalPages={totalPages}
				jobsPerPage={jobsPerPage}
				joby={joby}
				setPage={setPage}
			/>
		</>
	);
};

export default JobList;
