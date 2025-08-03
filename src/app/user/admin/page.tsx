"use client";

import { Heading } from "@/styles/editTypoghraphy";
import { useAppStore } from "@/store/useAppStore";
import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogTitle,
	FormControlLabel,
	Switch,
	Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Job } from "@/types/job";
import UserDetailBox from "./AdminPanelParts/UserDetailBox";
import HeaderMainPage from "@/components/HeaderMainPage";
import { sanitizeHtml } from "@/lib/sanitizeHTML";
import AdminSearchPanel from "./AdminSearchPanel/AdminSearchPanel";
import AdminCreateUser from "./AdminCreateUser/AdminCreateUser";
import { AdminDeleteUser } from "./AdminDeleteUser/AdminDeleteUser";
import AdminDeleteJob from "./AdminDeleteJob/AdminDeleteJob";
import AdminEditJobs from "./AdminEditJobs/AdminEditJobs";
import ApplicationJobList from "./AdminPanelParts/ApplicationJobList";
import UserActionsPanel from "./AdminPanelParts/UserActionPanel";
import CompanyJobsPanel from "./AdminPanelParts/CompanyJobsPanel";

//admiin hleda uživatele přes email ---check
//jak najde uživatele tak má možnosti ---check
//když je to user:
//uprav data user vypiš application smaž user vytvoř user ---check
//když je to Company:
//uprav data, uprav job, smaž company, smaž job, zobraz všechny joby ---check
//udělej pro každy job jestě tlačitko application kde bude seznam users a bude onHover kde bude jmeno Email---check
//tzn nazev job a rozbalovaci okno list user ---check
//jestě sem musim našroubovat datum vytvořeni uživatele jobu a application --check

const AdminMainPage = () => {
	const [companyJobs, setCompanyJobs] = useState<Job[]>([]);
	const [aboutHtml, setAboutHtml] = useState<string>("");
	const [isCreateEnable, setIsCreateEnable] = useState<boolean>(false);
	const [createJob, setCreateJob] = useState<boolean>(false);
	const [selectedJobId, setSelectedJobId] = useState<string[]>([]);
	const [editUserOpen, setEditUserOpen] = useState<boolean>(false);
	const [editJobsOpen, setEditJobsOpen] = useState<boolean>(false);
	const [editJobError, setEditJobError] = useState<boolean>(false);
	const [editDialogJobOpen, setEditDialogJobOpen] = useState<boolean>(false);
	const [showSwitch, setShowSwitch] = useState<boolean>(false);
	const [showEnd, setShowEnd] = useState<boolean>(false);
	const [deleteDemoChecked, setDeleteDemoChecked] = useState(false);
	const [hasSearched, setHasSearched] = useState<boolean>(false);
	const [deleteStatus, setDeleteStatus] = useState<null | {
		success: boolean;
		message: string;
	}>(null);
	const setSelectedJobsId = useAppStore((state) => state.setSelectedJobId);
	const selectedUserData = useAppStore((state) => state.selectedUserData);
	const jobsArray = Object.values(useAppStore((state) => state.jobs));
	const getUserById = useAppStore((state) => state.getUserById);
	const applicationsArray = Object.values(
		useAppStore((state) => state.applications)
	);
	const usersArray = Object.values(useAppStore((state) => state.users));
	const LoginUser = useAppStore((state) => state.LogIn);

	useEffect(() => {
		if (LoginUser?.name === "Master Admin") {
			setShowSwitch(true);
		}
	}, [LoginUser]);

	const toggleAllJobs = () => {
		if (selectedJobId.length === companyJobs.length) {
			setSelectedJobId([]); // vše zruší
		} else {
			setSelectedJobId(companyJobs.map((job) => job.id)); // vše vybere
		}
	};

	const handleDelete = async (id: string) => {
		const result = await AdminDeleteUser(id);
		setDeleteStatus(result);
		if (result.success) {
			// Optionally, you can reset the selected user data or perform other actions
			useAppStore.getState().setSelectedUserData(null);
		}
	};
	const handleDeleteJob = async () => {
		for (const jobId of selectedJobId) {
			const result = await AdminDeleteJob(jobId);
			console.log(result.message);
		}
		setSelectedJobId([]);
	};

	const handleCheckboxChange = (jobId: string) => {
		setSelectedJobId(
			(prev) =>
				prev.includes(jobId)
					? prev.filter((id) => id !== jobId) // odškrtnutí
					: [...prev, jobId] // zaškrtnutí
		);
	};

	const handleEditJobs = () => {
		if (selectedJobId.length !== 1) {
			setEditJobError(true);
			setEditDialogJobOpen(true);
			return;
		}
		setSelectedJobsId(selectedJobId[0]);
		setEditJobsOpen(true);
	};

	const handleEnd = () => {
		useAppStore.getState().setSelectedUserData(null);
		setIsCreateEnable(false);
		setDeleteStatus(null);
		setAboutHtml("");
		setShowEnd(false);
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
		if (selectedUserData !== null) {
			setShowEnd(true);
		}
	}, [selectedUserData]);

	const getApplicantsForJob = () => {
		return applicationsArray
			.filter((app) => app.userid === selectedUserData?.id)
			.map((application) => {
				const job = jobsArray.find((job) => job.id === application.jobid);
				console.log("job", job);
				return job ? { ...application, JobTitle: job.title } : null;
			})
			.filter(Boolean);
	};
	const handleCreateOpenJob = () => {
		setCreateJob(true);
	};

	const applicationJob = getApplicantsForJob();
	const jobsFromApplications = [
		...new Map(
			applicationsArray
				.map((app) => jobsArray.find((job) => job.id === app?.jobid))
				.filter(Boolean)
				.map((job) => [job?.id, job])
		).values(),
	];

	const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setDeleteDemoChecked(event.target.checked);
	};

	const handleConfirmDeleteDemo = async () => {
		if (!deleteDemoChecked) {
			alert("Musíš nejdřív zapnout přepínač");
			return;
		}
		for (const job of jobsArray) {
			if (job.isDemo) {
				await AdminDeleteJob(job.id);
			}
		}
		for (const user of usersArray) {
			if (user.isDemo) {
				await AdminDeleteUser(user.id);
			}
		}
		console.log("Mazání demo dat...");
	};

	return (
		<>
			{LoginUser?.role === "ADMIN" && (
				<>
					<HeaderMainPage />
					<Box
						sx={{
							minHeight: "100vh",
							bgcolor: "linear-gradient(135deg, #cee5fd 0%, #e3fcec 100%)",
							py: 4,
							px: { xs: 1, md: 4 },
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
						}}
					>
						<Box
							sx={{
								width: "100%",
								maxWidth: 950,
								bgcolor: "white",
								borderRadius: 3,
								boxShadow: 6,
								p: { xs: 2, md: 4 },
								mb: 4,
								fontFamily: "Montserrat, Arial, sans-serif",
							}}
						>
							<Box pt={2} pb={1}>
								<Typography
									variant='h3'
									sx={{
										fontWeight: "bold",
										color: "#1976d2",
										fontFamily: "Montserrat, Arial, sans-serif",
										letterSpacing: 1,
										mb: 1,
									}}
								>
									Admin Page
								</Typography>
								{showSwitch && (
									<Box
										sx={{
											display: "flex",
											flexDirection: "column",
											gap: 1,
											mb: 2,
											border: "1px solid #ccc",
											p: 2,
											borderRadius: 2,
											bgcolor: "#f5f7fa",
										}}
									>
										<FormControlLabel
											control={
												<Switch
													checked={deleteDemoChecked}
													onChange={handleSwitchChange}
													color='warning'
												/>
											}
											label='Smazat Demo Data'
										/>
										<Button
											variant='contained'
											color='error'
											disabled={!deleteDemoChecked}
											onClick={handleConfirmDeleteDemo}
										>
											Potvrdit smazání
										</Button>
									</Box>
								)}
								<Typography sx={{ color: "#388e3c", fontWeight: 500, mb: 2 }}>
									Welcome to the Admin Dashboard
								</Typography>
							</Box>
							<Box sx={{ display: "flex", gap: 2, mb: 3 }}>
								<Button
									variant='contained'
									sx={{
										bgcolor: "#1976d2",
										color: "#fff",
										fontWeight: "bold",
										fontFamily: "Montserrat, Arial, sans-serif",
										"&:hover": { bgcolor: "#1565c0" },
									}}
									onClick={() => setIsCreateEnable(true)}
								>
									Vytvoř Uživatele
								</Button>
							</Box>
							{isCreateEnable && (
								<Box
									sx={{
										zIndex: 10,
										position: "fixed",
										left: 0,
										top: 0,
										width: "100vw",
										height: "100vh",
										bgcolor: "rgba(0,0,0,0.15)",
										display: "flex",
										alignItems: "center",
										justifyContent: "center",
									}}
								>
									<Box
										sx={{
											bgcolor: "white",
											border: "2px solid #1976d2",
											borderRadius: 3,
											boxShadow: 10,
											p: 4,
											minWidth: 320,
											maxWidth: "95vw",
											fontFamily: "Montserrat, Arial, sans-serif",
											display: "flex",
											flexDirection: "column",
											alignItems: "center",
											gap: 2,
										}}
									>
										<AdminCreateUser />
										<Button
											variant='outlined'
											color='error'
											sx={{ mt: 2, fontWeight: "bold" }}
											onClick={() => setIsCreateEnable(false)}
										>
											Zavřít
										</Button>
									</Box>
								</Box>
							)}

							<AdminSearchPanel
								setShowEnd={setShowEnd}
								setHasSearched={setHasSearched}
							/>
							{showEnd &&(
								<Box sx={{mt:3}}>
								<Typography
									variant='h6'
									sx={{ color: "#1976d2", fontWeight: "bold", mb: 2 }}
								>
									Výsledky hledání:
								</Typography>
								</Box>
							)}
							<Box sx={{ mt: 3 }}>
								{selectedUserData ? (
									<Box>
										<Box sx={{ mb: 2, ml: 25 }}>
											<UserActionsPanel
												selectedUserData={selectedUserData}
												onEdit={() => setEditUserOpen(true)}
												handleDelete={() => handleDelete(selectedUserData.id)}
												deleteStatus={deleteStatus}
												setDeleteStatus={setDeleteStatus}
												editUserOpen={editUserOpen}
												setEditUserOpen={setEditUserOpen}
											/>
										</Box>
										<Box
											sx={{
												p: 2,
												bgcolor: "#f5f7fa",
												borderRadius: 2,
												display: "flex",
												alignItems: "center",
												flexDirection: "row",
												gap: 2,
											}}
										>
											<UserDetailBox
												user={selectedUserData}
												aboutHtml={aboutHtml}
											/>
											<ApplicationJobList
												selectedUserData={selectedUserData}
												jobsFromApplications={jobsFromApplications}
												applicationsArray={applicationsArray}
												applicationJob={applicationJob}
												jobsArray={jobsArray}
												getUserById={getUserById}
											/>
										</Box>

										{editJobsOpen && (
											<AdminEditJobs setEditJobsOpen={setEditJobsOpen} />
										)}
										{editJobError && (
											<Dialog
												open={editDialogJobOpen}
												onClose={() => setEditDialogJobOpen(false)}
											>
												<DialogTitle
													sx={{ color: "#d32f2f", fontWeight: "bold" }}
												>
													Chyba
												</DialogTitle>
												<DialogActions>
													<Typography sx={{ p: 2 }}>
														Vyberte právě jeden job pro úpravu!
													</Typography>
													<Button
														onClick={() => {
															setEditDialogJobOpen(false);
															setEditJobError(false);
														}}
													>
														Zrušit
													</Button>
												</DialogActions>
											</Dialog>
										)}
										{selectedUserData?.role === "COMPANY" && (
											<Box p={2}>
												<CompanyJobsPanel
													selectedUserData={selectedUserData}
													companyJobs={companyJobs}
													selectedJobId={selectedJobId}
													toggleAllJobs={toggleAllJobs}
													handleCheckboxChange={handleCheckboxChange}
													setCreateJob={setCreateJob}
													createJob={createJob}
													handleDeleteJob={handleDeleteJob}
													handleCreateOpenJob={handleCreateOpenJob}
													handleEditJobs={handleEditJobs}
												/>
											</Box>
										)}
									</Box>
								) : hasSearched ? (
									<Typography sx={{ color: "#d32f2f" }}>
										No user found with this email.
									</Typography>
								) : null}
								{showEnd && (
									<Button
										variant='contained'
										sx={{
											mt: 3,
											bgcolor: "#43a047",
											color: "#fff",
											fontWeight: "bold",
											fontFamily: "Montserrat, Arial, sans-serif",
											"&:hover": { bgcolor: "#2e7031" },
										}}
										onClick={handleEnd}
									>
										Konec
									</Button>
								)}
							</Box>
						</Box>
					</Box>
				</>
			)}
		</>
	);
};

export default AdminMainPage;
