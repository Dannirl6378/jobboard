import { Box, Button, Typography } from "@mui/material";
import React, { useEffect, useState, useMemo } from "react";

import { useAppStore } from "@/store/useAppStore";
import HeaderMainPage from "@/components/HeaderMainPage";
import Badge from "@mui/material/Badge";
import { useRouter } from "next/navigation";
import { sanitizeHtml } from "@/lib/sanitizeHTML";
import { fetchDeleteJob } from "@/lib/api";

const Firm = () => {
	const router = useRouter();

	const [sanitizedDescriptions, setSanitizedDescriptions] = useState<
		Record<string, string>
	>({});

	const setSelectedUserId = useAppStore((state) => state.setSelectedUserId);
	const setSelectedJobId = useAppStore((state) => state.setSelectedJobId);
	const logIn = useAppStore((state) => state.LogIn);
	const usersArray = Object.values(useAppStore((state) => state.users));
	const jobsArray = Object.values(useAppStore((state) => state.jobs));
	const applicationsArray = Object.values(
		useAppStore((state) => state.applications)
	);
	console.log("users", usersArray);
	console.log("applications", applicationsArray);
	console.log("jobs", jobsArray);
	console.log("LogIn", logIn);

	// Ověření že users je pole
	const getCompany = () =>
		usersArray?.find((user) => user.name === logIn?.name);

	const getCompanyJobs = (companyid: string) =>
		jobsArray.filter((job) => job.companyid === companyid);

	// Výběr uchazečů na zákl. jobId
	const getCompanyApplications = (companyJobs: any[]) =>
		applicationsArray.filter((application) =>
			companyJobs.some((job) => job.id === application.jobid)
		);

	const company = getCompany();
	console.log("company", company);

	const companyJobs = useMemo(
		() => (company ? getCompanyJobs(company.id) : []),
		[company, jobsArray]
	);
	console.log("companyJobs", companyJobs);

	const companyApplications = getCompanyApplications(companyJobs);
	console.log("companyApplications", companyApplications);
	console.log(
		"companyApplications user IDs",
		companyApplications.map((application) => application.userid)
	);
	const companyAppUser = companyApplications.map((application) => {
		application.userid;
	});

	const getApplicantsForJob = (jobId: string) => {
		return applicationsArray
			.filter((app) => app.jobid === jobId)
			.map((application) => {
				const user = usersArray.find((user) => user.id === application.userid);
				return user ? { ...user, applicationId: application.id } : null;
			})
			.filter(Boolean); // Odstraní `null` hodnoty
	};

	const handleEditWorkOffer = (jobId: string) => {
		setSelectedJobId(jobId);
		router.push(`/user/company/workOffers/editWorkOffer`);
	};
	const handleAddWorkOffer = () => {
		router.push(`/user/company/workOffers/addWorkOffer`);
	};
	const handleEditUser = () => {
		router.push(`/user/users/userAppProfil`);
	};

	const handleWiewUserProfile = (userId: string) => {
		setSelectedUserId(userId);
		router.push(`/user/users/userAppProfil/`);
	};

	useEffect(() => {
		const fetchSanitizedDescriptions = async () => {
			const descs: Record<string, string> = {};
			for (const job of companyJobs) {
				const shortDesc =
					job.description.length > 25
						? job.description.slice(0, 25) + "..."
						: job.description;
				descs[job.id] = await sanitizeHtml(shortDesc);
			}
			setSanitizedDescriptions(descs);
		};
		fetchSanitizedDescriptions();
	}, []);

	const handleDelete = (jobId: string) => {
		console.log("jobIdDelte", jobId);
		if (!jobId) return;
		const updatedJobs = companyJobs.filter((job) => job.id !== jobId);
		useAppStore.getState().setJobs(updatedJobs);
		fetchDeleteJob(jobId)
			.then(() => {
				console.log("Job deleted successfully");
			})
			.catch((error) => {
				console.error("Error deleting job:", error);
				alert("Chyba při mazání pracovní nabídky.");
			});
	};

	return (
		<Box>
			<HeaderMainPage />
			<Typography>Profil: {company?.name}</Typography>
			<Box>
				<Button onClick={handleEditUser}>Upravit profil</Button>
				<Button onClick={handleAddWorkOffer}>Přidat pracovní nabídku</Button>
				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						gap: 1,
						justifyContent: "center",
						ml: "-25%",
						width: "150%",
						border: 1,
						borderColor: "gray",
						boxShadow: 5,
						p: 2,
						bgcolor: "#F5F5F5",
						opacity: 0.8,
						borderRadius: 2,
						maxHeight: "100vh",
						overflowY: "auto",
						"&::-webkit-scrollbar": {
							width: "8px",
							backgroundColor: "#F5F5F5",
							borderRadius: "4px",
							opacity: 0.5,
						},
						"&::-webkit-scrollbar-thumb": {
							backgroundColor: "#EE8A59",
							borderRadius: "4px",
							opacity: 0.5,
						},
						"&::-webkit-scrollbar-thumb:hover": {
							backgroundColor: "#EE8A59",
							opacity: 0.8,
							borderRadius: "4px",
						},
					}}
				>
					<Typography>{/* Dynamický nadpis */}</Typography>
					{companyJobs.map((job) => {
						const applicants = getApplicantsForJob(job.id);
						const isOpen = null === job.id ? false : true;
						return (
							<Box
								key={job.id}
								sx={{
									border: 0,
									boxShadow: 5,
									p: 2,
									bgcolor: "#EE8A59",
									opacity: 0.8,
									gap: 2,
								}}
							>
								<Typography variant='h4'>{job.title}</Typography>
								<Typography
									variant='h5'
									component='div'
									dangerouslySetInnerHTML={{
										__html: sanitizedDescriptions[job.id] || "",
									}}
								/>

								<Box sx={{ display: "flex", gap: 2 }}>
									<Button
										variant='contained'
										onClick={() => handleEditWorkOffer(job.id)}
									>
										Upravit pracovní nabídku
									</Button>
									<Button
										variant='contained'
										onClick={() => handleDelete(job.id)}
									>
										Delete Job
									</Button>
									<Button
										variant='contained'
										onClick={() => setSelectedJobId(isOpen ? null : job.id)}
									>
										<Badge
											anchorOrigin={{
												vertical: "bottom",
												horizontal: "right",
											}}
											sx={{}}
											badgeContent={applicants.length}
											color='secondary'
										>
											{isOpen ? "zavřít" : "Uchazeči"}
										</Badge>
									</Button>
								</Box>
								{isOpen ? (
									<Box mt={2}>
										<Typography variant='h6'>Uchazeči:</Typography>
										{applicants.length > 0 ? (
											applicants.map((user) =>
												user ? (
													<Typography
														key={user.applicationId}
														sx={{
															cursor: "pointer",
															textDecoration: "underline",
														}}
														onClick={() => handleWiewUserProfile(user.id)}
													>
														{user.name}
													</Typography>
												) : null
											)
										) : (
											<Typography variant='body2'>Žádní uchazeči</Typography>
										)}
									</Box>
								) : null}
							</Box>
						);
					})}
				</Box>
			</Box>
		</Box>
	);
};

export default Firm;
