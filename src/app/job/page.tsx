import { fetchjobs } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { useAppStore } from "@/store/useAppStore";
import { useEffect, useState } from "react";
import {
	Box,
	Divider,
	List,
	ListItem,
	ListItemText,
	Typography,
} from "@mui/material";
import React from "react";

const JobPage = () => {
	const [joby, setJoby] = useState([]);
	const { data, error, isLoading } = useQuery({
		queryKey: ["jobs"],
		queryFn: fetchjobs,
	});

	useEffect(() => {
		if (data) {
			useAppStore.getState().setJobs(data);
			setJoby(data);
		}
	}, [data]);
	//console pro oveřeni jobů
	console.log(
		"Stored job example:",
		useAppStore.getState().getJobById("1fc055d8-33ee-4eb0-8d4d-e1f524042185")
	);

	if (isLoading) {
		return (
			<Typography
				sx={{
					color: "black",
					fontSize: "0.8rem",
					ml: 1,
				}}
			>
				Loading...
			</Typography>
		);
	}
	if (error instanceof Error)
		return (
			<Typography
				sx={{
					color: "black",
					fontSize: "0.8rem",
					ml: 1,
				}}
			>
				Error: ...{error.message}
			</Typography>
		);

	if (!data) {
		return (
			<Typography
				sx={{
					color: "black",
					fontSize: "0.8rem",
					ml: 1,
				}}
			>
				No Job found
			</Typography>
		);
	}
	console.log(data);
	return (
		<List>
			{joby?.map(
				(job: {
					id: string;
					title: string;
					description: string;
					salary: string;
					location: string;
					createdat: string;
				}) => (
					<ListItem key={job.id} sx={{ color: "black", display: "inline" }}>
						<ListItemText
							sx={{
								disply: "inline",
								border: 0,
								borderRadius: 2,
								boxShadow: 3,
							}}
							primary={
								<Typography
									variant='h6'
									sx={{ color: "black", fontSize: "1.4rem", ml: 2 }}
								>
									{job.title}
								</Typography>
							}
							secondary={
								<React.Fragment>
									<Typography
										variant='body2'
										component='span'
										sx={{
											display: "block",
											color: "black",
											opacity: 0.9,
											fontSize: "0.8rem",
											ml: 4,
										}}
									>
										{job.description}
									</Typography>
									<Typography
										variant='body2'
										component='span'
										sx={{
											display: "block",
											color: "black",
											opacity: 0.9,
											fontSize: "0.8rem",
											ml: 6,
										}}
									>
										{job.salary}/měsic
									</Typography>
									<Typography
										variant='body2'
										component='span'
										sx={{
											color: "black",
											opacity: 0.7,
											fontSize: "0.8rem",
											ml: 8,
										}}
									>
										{job.location}
									</Typography>
									<Box
										sx={{
											width: "100%",
											display: "flex",
											justifyContent: "flex-end",
											pr: "5%", // přizpůsob dle vzhledu
										}}
									>
										<Typography
											variant='body2'
											component='div'
											sx={{
												color: "black",
												opacity: 0.9,
												fontSize: "0.8rem",
											}}
										>
											{new Date(job.createdat).toLocaleDateString()}
										</Typography>
									</Box>
								</React.Fragment>
							}
						/>
					</ListItem>
				)
			)}
		</List>
	);
};
export default JobPage;
