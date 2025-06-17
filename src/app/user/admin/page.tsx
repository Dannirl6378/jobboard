"use client";

import { Heading, Text } from "@/styles/editTypoghraphy";
import { useAppStore } from "@/store/useAppStore";
import {
	Box,
	Button,
	Checkbox,
	Input,
	ListItem,
	Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Job } from "@/types/job";
import HeaderMainPage from "@/components/HeaderMainPage";
import { sanitizeHtml } from "@/lib/sanitizeHTML";
import AdminSearchPanel from "./AdminSearchPanel/AdminSearchPanel";
import AdminCreateUser from "./AdminCreateUser/AdminCreateUser";
import { AdminDeleteUser } from "./AdminDeleteUser/AdminDeleteUser";
import AdminCreateJob from "./AdminCreateJob/AdminCreateJob";

//admiin hleda uživatele přes email ---check
//jak najde uživatele tak má možnosti ---check
//když je to user:
//uprav data user smaž application smaž user vytvoř user
//když je to Company:
//uprav data, uprav job, smaž company, smaž job, zobraz všechny application
//tzn nazev job a rozbalovaci okno list user
// když klinu na user vyskoci maly panel pro možnost upravy mazani a info
//jestě sem musim našroubovat datum vytvořeni uživatele jobu a application

const AdminMainPage = () => {
	const [companyJobs, setCompanyJobs] = useState<Job[]>([]);
	const [aboutHtml, setAboutHtml] = useState<string>("");
	const [isCreateEnable, setIsCreateEnable] = useState<boolean>(false);
	const [createJob,setCreateJob] = useState<boolean>(false);
	const [email,setEmail] = useState<string>("");
	const [deleteStatus, setDeleteStatus] = useState<null | {
		success: boolean;
		message: string;
	}>(null);

	const selectedUserData = useAppStore((state) => state.selectedUserData);
	const jobsArray = Object.values(useAppStore((state) => state.jobs));
	const applicationsArray = Object.values(
		useAppStore((state) => state.applications)
	);

	const handleDelete = async (id: string) => {
		const result = await AdminDeleteUser(id);
		setDeleteStatus(result);
		if (result.success) {
			// Optionally, you can reset the selected user data or perform other actions
			useAppStore.getState().setSelectedUserData(null);
		}
	};

	const handleEnd = () => {
		useAppStore.getState().setSelectedUserData(null);
		console.log("End of admin page reached");
		setIsCreateEnable(false);
		setDeleteStatus(null);
		setAboutHtml("");
		
		
	};

	useEffect(() => {
		if (selectedUserData?.about) {
			sanitizeHtml(selectedUserData.about).then(setAboutHtml);
		} else {
			setAboutHtml("");
		}
	}, [selectedUserData?.about]);

	useEffect(() => {
		if (selectedUserData?.role === "COMPANY") {
			const Jobs = jobsArray.filter(
				(job) => job.companyid === selectedUserData?.id
			);
			setCompanyJobs(Jobs);
		}
	}, [selectedUserData]);

	const getApplicantsForJob = () => {
		return applicationsArray
			.filter((app) => app.userid === selectedUserData?.id)
			.map((application) => {
				const job = jobsArray.find((job) => job.id === application.jobid);
				return job ? { ...application, JobTitle: job.title } : null;
			})
			.filter(Boolean);
	};
	const handleCreateOpenJob = () => {
		setCreateJob(true);};

	const applicationJob = getApplicantsForJob();
	const jobsFromApplications = applicationJob
		.map((app) => jobsArray.find((job) => job.id === app?.jobid))
		.filter(Boolean);

	console.log("selectedUser", selectedUserData);
	console.log("companyJob", companyJobs);
	return (
		<>
			<HeaderMainPage />
			<Box sx={{ padding: 2, border: 1, boxShadow: 3, bgcolor: "#f9f9f9" }}>
				<Box pt={4}>
					<Heading>Admin Page</Heading>
				</Box>
				<Box py={2}>
					<Typography>Welcome to the Admin Dashboard</Typography>
				</Box>
				<Box sx={{ display: "flex", gap: 2, mb: 2 }}>
					<Button variant='contained' onClick={() => setIsCreateEnable(true)}>
						Vytvoř Uživatele
					</Button>
					
				</Box>
				{isCreateEnable ? (
					<Box
						sx={{
							zIndex: 1,
							position: "absolute",
							right: "50%",
							top: "50",
							background: "white",
							border: "2px solid",
						}}
					>
						<AdminCreateUser />
						<Button onClick={() => setIsCreateEnable(false)}>Close</Button>
					</Box>
				) : null}

				<AdminSearchPanel />

				<Box>
					<Typography>Výsledky hledání:</Typography>
					{selectedUserData ? (
						<Box p={5}>
							<Typography>ID: {selectedUserData?.id}</Typography>
							<Typography>Name: {selectedUserData?.name}</Typography>
							<Typography>Email: {selectedUserData?.email}</Typography>
							<Typography>Role: {selectedUserData?.role}</Typography>
							<Typography>Phone: {selectedUserData.Phone}</Typography>
							<Typography>
								Profil vytvořen:{" "}
								{selectedUserData?.created_at
									? new Date(selectedUserData.created_at).toLocaleDateString(
											"cs-CZ"
										)
									: ""}
							</Typography>

							<Typography>ApplicationJobs:</Typography>
							{jobsFromApplications.map((job) => (
								<ListItem key={job?.id}>
									<Typography>{job?.title}</Typography>
								</ListItem>
							))}

							{aboutHtml && (
								<Box mt={2}>
									<Typography variant='h6'>O uživateli:</Typography>
									<div
										className='rich-content'
										dangerouslySetInnerHTML={{ __html: aboutHtml }}
									/>
								</Box>
							)}

							<Box p={2}>
								<Typography>Možnosti uprav</Typography>
								<Button>Edit User</Button>
								<Button
									variant='contained'
									onClick={() => handleDelete(selectedUserData.id)}
								>
									Delete User
								</Button>
								{deleteStatus && (
									<Box
										sx={{
											border: "1px solid",
											zIndex: 1,
											margin: "auto",
											background: "white",
											top: "25%",
										}}
									>
										<Typography>
											{deleteStatus.success
												? "Uživatel úspěšně smazán"
												: `Uživatel se nepovedl smazat: ${deleteStatus.message}`}
										</Typography>
										<Button onClick={() => setDeleteStatus(null)}>
											Zavřít
										</Button>
									</Box>
								)}
								<Button>Applications</Button>
								<Button>Jobs</Button>
							</Box>

							{selectedUserData?.role === "COMPANY" && (
								<Box p={2}>
									<Typography>Jobs</Typography>
									{companyJobs.map((job) => (
										<ListItem key={job.id}>
											<Typography>{job.title}</Typography>
											<Typography>
												{": "}
												{job?.createdat
													? new Date(job.createdat).toLocaleDateString("cs-CZ")
													: ""}
											</Typography>
											<Checkbox />
										</ListItem>
									))}
									{createJob && (
										<Box
											sx={{
												zIndex: 1,
												background:"rgba(255, 255, 255, 0)",
												position: "absolute",
												width: "70vw",
												right: "3%",
												top: "10%",

											}}
										>
											<AdminCreateJob email={selectedUserData.email||""}setCreateJob={setCreateJob}/>
										</Box>
									)}
									<Button>Delete Job</Button>
									<Button variant="contained" onClick={()=>handleCreateOpenJob()}>Create Job</Button>
									<Button>Uprav Jobs</Button>
								</Box>
							)}
						</Box>
					) : (
						<Typography>No user found with this email.</Typography>
					)}
					<Button variant='contained' onClick={() => handleEnd()}>
						Konec
					</Button>
				</Box>
			</Box>
		</>
	);
};

export default AdminMainPage;
