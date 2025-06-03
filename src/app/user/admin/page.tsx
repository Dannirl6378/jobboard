"use client";
import { Heading, Text } from "@/styles/editTypoghraphy";
import { useAppStore } from "@/store/useAppStore";
import { Box, Button, Input, ListItem, Typography } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { fetchUserByEmail } from "@/lib/api";
import { User } from "@/types/user";
import { Job } from "@/types/job";
import HeaderMainPage from "@/components/HeaderMainPage";
import { sanitizeHtml } from "@/lib/sanitizeHTML";

const adminMainPage = () => {
	const [email, setEmail] = useState("");
	const [userId, setUserId] = useState("");
	const [copmanyJobs, setCompanyJobs] = useState<Job[]>([]);
	const [aboutHtml, setAboutHtml] = useState<string>("");

	const jobs = useAppStore((state) => state.jobs);
	const setSelectedUserData = useAppStore((state) => state.setSelectedUserData);
	const selectedUserData = useAppStore((state) => state.selectedUserData);
	const jobsArray = Object.values(useAppStore((state) => state.jobs));
	const applicationsArray = Object.values(
		useAppStore((state) => state.applications)
	);
	const JobById = useAppStore((state) => state.getJobById);

	useEffect(() => {
		if (selectedUserData?.about) {
			sanitizeHtml(selectedUserData.about).then(setAboutHtml);
		} else {
			setAboutHtml("");
		}
	}, [selectedUserData?.about]);

	useEffect(() => {
		if (selectedUserData?.role === "COMPANY") {
			const getCompanyJobs = (comapnyid: string) =>
				jobsArray.filter((job) => job.companyid === selectedUserData?.id);
			const companyJobs = getCompanyJobs(selectedUserData.id);

			setCompanyJobs(companyJobs);
		}
	}, [userId]);

	const getApplicantsForJob = () => {
		return applicationsArray
			.filter((app) => app.userid === selectedUserData?.id)
			.map((application) => {
				const job = jobsArray.find((job) => job.id === application.jobid);
				return job ? { ...application, JobTitle: job.title } : null;
			})
			.filter(Boolean); // Odstraní `null` hodnoty
	};
	const applicationJob = getApplicantsForJob();
	const jobsFromApplications = applicationJob
		.map((app) => jobsArray.find((job) => job.id === app?.jobid))
		.filter(Boolean); // Odstraní undefined, pokud nějaký job nenajdeš
	console.log(
		"allJobs",
		jobsFromApplications.map((job) => {
			job?.id, job?.title;
		})
	);
	console.log("aplicationJob", applicationJob);

	const handleFindUser = async (email: string) => {
		return fetchUserByEmail(email)
			.then((user) => {
				setUserId(user.id);
				setSelectedUserData(user);
				setEmail(user.email);
			})
			.catch((error) => {
				console.error("Error fetching user by email:", error);
				setSelectedUserData(null);
			});
	};

	console.log("foundUser", selectedUserData);
	return (
		<>
			<HeaderMainPage />
			<Box
				sx={{
					padding: "2%",
					border: "1px solid #ccc",
					boxShadow: 3,
					backgroundColor: "#f9f9f9",
				}}
			>
				<Box sx={{ paddingTop: "4%" }}>
					<Heading>Admin Page</Heading>
				</Box>
				<Box sx={{ padding: "2%" }}>
					<Typography>Welcome to the Admin Dashboard</Typography>
				</Box>
				<Box sx={{ padding: "2%", gap: "10px" }}>
					<Box sx={{ padding: "2%", gap: "10px" }}>
						<Typography>Njadi ID podle emailu:</Typography>
						<Input
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						></Input>
						<Button onClick={() => handleFindUser(email)}>
							Najdi uživatele
						</Button>
					</Box>
					<Box sx={{ padding: "2%", gap: "10px" }}>
						<Typography>Přidej si ID pro spravu:</Typography>
						<Input></Input>
						<Button>Konec</Button>
					</Box>
				</Box>
				<Box>
					<Typography>Výsledky hledání:</Typography>
					{selectedUserData ? (
						<Box sx={{ padding: "5%", gap: "10px" }}>
							<Typography>ID: {selectedUserData?.id}</Typography>
							<Typography>Name: {selectedUserData?.name}</Typography>
							<Typography>Email: {selectedUserData?.email}</Typography>
							<Typography>Role: {selectedUserData?.role}</Typography>
							<Typography>Phone:{selectedUserData.Phone}</Typography>
                            <Typography>ApplicationJobs:</Typography>
                            {jobsFromApplications.map((job) => (
										<ListItem key={job?.id}>
											<Typography>{job?.title}</Typography>
										</ListItem>
									))}

							{aboutHtml && (
								<Box sx={{ mt: 2 }}>
									<Typography variant='h6'>O uživateli:</Typography>
									<div
										className='rich-content'
										dangerouslySetInnerHTML={{ __html: aboutHtml }}
									/>
								</Box>
							)}
							<Box sx={{ padding: "2%", gap: "10px" }}>
								<Typography>Možnosti uprav</Typography>
								<Button>Edit User</Button>
								<Button>Delete User</Button>
								<Button>Applications</Button>
								<Button>Jobs</Button>
							</Box>
							{selectedUserData?.role === "COMPANY" ? (
								<Box sx={{ padding: "2%" }}>
									{copmanyJobs.map((job) => (
										<ListItem key={job.id}>
											<Typography>{job.title}</Typography>
										</ListItem>
									))}
									<Typography>Jobs</Typography>
									
									<Button>Uprav Jobs</Button>
								</Box>
							) : null}
						</Box>
					) : (
						<Typography>No user found with this email.</Typography>
					)}
				</Box>
			</Box>
		</>
	);
};
export default adminMainPage;
//firma@example.com
