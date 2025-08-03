"use client";
import { Box, Typography, Divider, Paper, Button, Badge } from "@mui/material";
import React, { useEffect, useState, useMemo } from "react";

import { useAppStore } from "@/store/useAppStore";
import HeaderMainPage from "@/components/HeaderMainPage";
import { useRouter } from "next/navigation";
import { sanitizeHtml } from "@/lib/sanitizeHTML";
import { fetchDeleteJob } from "@/lib/api";

const Firm = () => {
	const router = useRouter();
	const [openApplicantsJobId, setOpenApplicantsJobId] = useState<string | null>(
		null
	);
	const [sanitizedDescriptions, setSanitizedDescriptions] = useState<
		Record<string, string>
	>({});

	const setSelectedUserId = useAppStore((state) => state.setSelectedUserId);
	const setSelectedJobId = useAppStore((state) => state.setSelectedJobId);
	const logIn = useAppStore((state) => state.LogIn);
	const usersArray = Object.values(useAppStore((state) => state.users));
	//const jobsArray = Object.values(useAppStore((state) => state.jobs));
	const applicationsArray = Object.values(
		useAppStore((state) => state.applications)
	);
	const jobs = useAppStore((state) => state.jobs);
	const jobsArray = useMemo(() => Object.values(jobs), [jobs]);

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

	const companyJobs = useMemo(
		() => (company ? getCompanyJobs(company.id) : []),
		[company, jobsArray]
	);

	const companyApplications = getCompanyApplications(companyJobs);

	const applicantsByJobId = useMemo(() => {
		const result: Record<string, any[]> = {};

		for (const job of companyJobs) {
			const applicants = applicationsArray
				.filter((app) => {
					const match = app.jobid === job.id;

					return match;
				})
				.map((application) => {
					const user = usersArray.find(
						(user) => user.id === application.userid
					);
					if (user) {
					}
					return user ? { ...user, applicationId: application.id } : null;
				})
				.filter(Boolean);

			result[job.id] = applicants;
		}
		return result;
	}, [companyJobs, applicationsArray, usersArray]);

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
	}, [companyJobs]);

	const handleDelete = (jobId: string) => {
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
		<Box
			sx={{
				minHeight: "100vh",
				bgcolor: "linear-gradient(135deg, #cee5fd 0%, #e3fcec 100%)",
				display: "flex",
				flexDirection: "column",
				width: "75%",
			}}
		>
			<HeaderMainPage />
			<Box
				sx={{
					maxWidth: "70vw",
					width: "100%",
					mx: "auto",
					mt: { xs: 2, md: 6 },
					p: { xs: 2, md: 4 },
					bgcolor: "white",
					borderRadius: 3,
					boxShadow: 6,
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					gap: 3,
				}}
			>
				<Typography
					variant='h4'
					sx={{
						fontWeight: "bold",
						color: "#1976d2",
						letterSpacing: 1,
						mb: 1,
						fontFamily: "Montserrat, Arial, sans-serif",
					}}
				>
					Profil firmy:{" "}
					<span style={{ color: "#388e3c" }}>{company?.name}</span>
				</Typography>
				<Box
					sx={{
						display: "flex",
						gap: 2,
						flexWrap: "wrap",
						justifyContent: "center",
					}}
				>
					<Button
						variant='contained'
						sx={{
							bgcolor: "#43a047",
							color: "#fff",
							fontWeight: "bold",
							fontFamily: "Montserrat, Arial, sans-serif",
							"&:hover": { bgcolor: "#2e7031" },
						}}
						onClick={handleAddWorkOffer}
					>
						Přidat pracovní nabídku
					</Button>
					<Button
						variant='contained'
						sx={{
							bgcolor: "#1976d2",
							color: "#fff",
							fontWeight: "bold",
							fontFamily: "Montserrat, Arial, sans-serif",
							"&:hover": { bgcolor: "#1565c0" },
						}}
						onClick={handleEditUser}
					>
						Upravit profil
					</Button>
				</Box>
				<Box
					sx={{
						width: "100%",
						bgcolor: "#f5f7fa",
						borderRadius: 2,
						boxShadow: 2,
						p: { xs: 1, md: 3 },
						mt: 2,
						display: "flex",
						flexDirection: "column",
						gap: 2,
					}}
				>
					<Typography
						variant='h6'
						sx={{
							fontWeight: 600,
							color: "#1976d2",
							fontFamily: "Montserrat, Arial, sans-serif",
						}}
					>
						Seznam pracovních nabídek
					</Typography>
					{companyJobs.length === 0 ? (
						<Typography variant='body2' sx={{ color: "gray" }}>
							Žádné pracovní nabídky nebyly nalezeny.
						</Typography>
					) : (
						companyJobs.map((job) => {
							const applicants = applicantsByJobId[job.id] || [];
							const isOpen = openApplicantsJobId === job.id;
							return (
								<Box
									key={job.id}
									sx={{
										border: 0,
										boxShadow: 5,
										p: 2,
										bgcolor: "#e3fcec",
										opacity: 0.97,
										gap: 2,
										borderRadius: 2,
										mb: 2,
										transition: "box-shadow 0.2s, transform 0.2s",
										color: "#222",
										fontFamily: "Montserrat, Arial, sans-serif",
										"&:hover": {
											boxShadow: 10,
											transform: "scale(1.01)",
											bgcolor: "#b2f2d7",
										},
									}}
								>
									<Typography
										variant='h5'
										sx={{
											fontWeight: "bold",
											color: "#1976d2",
											fontFamily: "Montserrat, Arial, sans-serif",
											mb: 1,
										}}
									>
										{job.title}
									</Typography>
									<Typography
										variant='body1'
										component='div'
										sx={{
											color: "#222",
											fontFamily: "Montserrat, Arial, sans-serif",
											mb: 1,
										}}
										dangerouslySetInnerHTML={{
											__html: sanitizedDescriptions[job.id] || "",
										}}
									/>
									<Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
										<Button
											variant='outlined'
											sx={{
												borderColor: "#1976d2",
												color: "#1976d2",
												fontWeight: "bold",
												fontFamily: "Montserrat, Arial, sans-serif",
												"&:hover": {
													bgcolor: "#1976d2",
													color: "#fff",
													borderColor: "#1976d2",
												},
											}}
											onClick={() => handleEditWorkOffer(job.id)}
										>
											Upravit
										</Button>
										<Button
											variant='outlined'
											sx={{
												borderColor: "#d32f2f",
												color: "#d32f2f",
												fontWeight: "bold",
												fontFamily: "Montserrat, Arial, sans-serif",
												"&:hover": {
													bgcolor: "#d32f2f",
													color: "#fff",
													borderColor: "#d32f2f",
												},
											}}
											onClick={() => handleDelete(job.id)}
										>
											Smazat
										</Button>
										<Button
											variant='contained'
											sx={{
												bgcolor: "#43a047",
												color: "#fff",
												fontWeight: "bold",
												fontFamily: "Montserrat, Arial, sans-serif",
												"&:hover": { bgcolor: "#2e7031" },
											}}
											onClick={() => {
												setOpenApplicantsJobId(isOpen ? null : job.id);
											}}
										>
											<Badge
												anchorOrigin={{
													vertical: "bottom",
													horizontal: "right",
												}}
												badgeContent={applicants.length}
												color='secondary'
											>
												{isOpen ? "Zavřít" : "Uchazeči"}
											</Badge>
										</Button>
									</Box>
									{isOpen ? (
										<Box mt={2}>
											<Typography
												variant='h6'
												sx={{ color: "#1976d2", fontWeight: 600 }}
											>
												Uchazeči:
											</Typography>
											{applicants.length > 0 ? (
												applicants.map((user) =>
													user ? (
														<Typography
															key={user.applicationId}
															sx={{
																cursor: "pointer",
																textDecoration: "underline",
																color: "#222",
																fontFamily: "Montserrat, Arial, sans-serif",
																"&:hover": { color: "#1976d2" },
															}}
															onClick={() => handleWiewUserProfile(user.id)}
														>
															{user.name}
														</Typography>
													) : null
												)
											) : (
												<Typography variant='body2' sx={{ color: "gray" }}>
													Žádní uchazeči
												</Typography>
											)}
										</Box>
									) : null}
								</Box>
							);
						})
					)}
				</Box>
			</Box>
		</Box>
	);
};

export default Firm;
