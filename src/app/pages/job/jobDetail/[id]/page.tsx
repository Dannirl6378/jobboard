"use client";

import HeaderMainPage from "@/components/HeaderMainPage";
import { sanitizeHtml } from "@/lib/sanitizeHTML";
import { useAppStore } from "@/app/hook/useAppStore";
import { Heading } from "@/styles/editTypoghraphy";
import { Box, Typography, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Job } from "@/types/job";

const JobDetail = () => {
	const params = useParams();
	const jobId = Array.isArray(params.id) ? params.id[0] : params.id;
	const router = useRouter();
	const reloadJobs = useAppStore((state) => state.reloadJobs);
	const jobs = useAppStore((state) => state.jobs);
	const isLogin = useAppStore((state) => state.LogIn);
	const Application = useAppStore((state) => state.applications);
	const [companyDescpSanitized, setCompanyDescpSanitized] = useState("");

	console.log("isLogin", isLogin);
	const [job, setJob] = useState<Job | null>(null);
	const [loading, setLoading] = useState(!job);
	const [error, setError] = useState<string | null>(null);
	const [purifyDescr, setPurifyDescr] = useState("");

	const isRespondet = Object.values(Application).some(
		(application: any) =>
			application.jobid === jobId && application.userid === isLogin?.id
	);

	const CompanyjobId = Object.values(jobs).find((j) => j.id === jobId);
	const CompanyData = useAppStore((state) =>
		CompanyjobId?.companyid
			? state.getUserById(CompanyjobId.companyid)
			: undefined
	);

	useEffect(() => {
		const fetchData = async () => {
			if (!jobId || typeof jobId !== "string") {
				setError("Chybí ID pozice.");
				return;
			}
			const currentJob: Job | null =
				Object.values(jobs).find((j) => j.id === jobId) ?? null;

			if (!currentJob) {
				setLoading(true);
				try {
					await reloadJobs();
					const updatedJob = useAppStore.getState().jobs[jobId];
					if (updatedJob) {
						setJob(updatedJob);
						if (updatedJob.description) {
							const clean = await sanitizeHtml(updatedJob.description);
							setPurifyDescr(clean);
						}
					} else {
						setError("Pozice nenalezena.");
						return;
					}
				} catch {
					setError("Chyba při načítání dat.");
				} finally {
					setLoading(false);
				}
			} else {
				setJob(currentJob);
				if (currentJob.description) {
					sanitizeHtml(currentJob.description).then(setPurifyDescr);
				}
				setLoading(false);
			}
		};
		fetchData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [jobId]);

	const handleApply = () => {
		if (!isLogin) {
			router.push("/application/noLogUser");
			return;
		}
		router.push("/application/userLogIn");
	};

	if (error) {
		return (
			<Box sx={{ p: 4, textAlign: "center", color: "#d32f2f" }}>
				<Typography variant='h6'>{error}</Typography>
			</Box>
		);
	}

	return (
		<>
			<HeaderMainPage />
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					gap: 2,
				}}
			>
				<Box
					sx={{
						minHeight: "fit-content",
						bgcolor: "linear-gradient(135deg, #cee5fd 0%, #e3fcec 100%)",
						display: "flex",
						justifyContent: "center",
						alignItems: "flex-start",
						py: 6,
					}}
				>
					<Box
						sx={{
							bgcolor: "white",
							borderRadius: 4,
							boxShadow: 8,
							maxWidth: 700,
							width: "100%",
							mx: "auto",
							p: { xs: 2, sm: 5 },
							display: "flex",
							flexDirection: "column",
							gap: 3,
							fontFamily: "Montserrat, Arial, sans-serif",
							mt: 4,
						}}
					>
						<Box
							sx={{
								display: "flex",
								justifyContent: "space-between",
								alignItems: { xs: "flex-start", sm: "center" },
								flexDirection: { xs: "column", sm: "row" },
								mb: 2,
								gap: 2,
							}}
						>
							<Heading
								sx={{
									color: "#1976d2",
									fontWeight: "bold",
									letterSpacing: 1,
									fontSize: { xs: 22, sm: 28 },
								}}
							>
								{job?.title || "Pracovní pozice"}
							</Heading>
							{isLogin?.role !== "COMPANY" && !isRespondet ? (
								<Button
									variant='contained'
									onClick={handleApply}
									sx={{
										bgcolor: "#1976d2",
										color: "#fff",
										fontWeight: "bold",
										fontFamily: "Montserrat, Arial, sans-serif",
										"&:hover": { bgcolor: "#1565c0" },
										px: 4,
										py: 1.5,
										borderRadius: 2,
										boxShadow: 2,
									}}
								>
									Odpovědět na nabídku
								</Button>
							) : (
								<Button
									variant='outlined'
									onClick={() => router.back()}
									sx={{
										bgcolor: "#43a047",
										color: "#fff",
										fontWeight: "bold",
										fontFamily: "Montserrat, Arial, sans-serif",
										"&:hover": { bgcolor: "#2e7031" },
										px: 4,
										py: 1.5,
										borderRadius: 2,
									}}
								>
									Zpět
								</Button>
							)}
						</Box>

						<Box
							sx={{
								display: "flex",
								flexWrap: "wrap",
								gap: 4,
								mb: 2,
							}}
						>
							<Box>
								<Typography
									sx={{ color: "#388e3c", fontWeight: 600, fontSize: 18 }}
								>
									Mzda:
								</Typography>
								<Typography
									sx={{ color: "#222", fontWeight: "bold", fontSize: 20 }}
								>
									{job?.salary ? `${job.salary} €` : "Neuvedeno"}
								</Typography>
							</Box>
							<Box>
								<Typography
									sx={{ color: "#388e3c", fontWeight: 600, fontSize: 18 }}
								>
									Lokalita:
								</Typography>
								<Typography
									sx={{ color: "#222", fontWeight: "bold", fontSize: 20 }}
								>
									{job?.location || "Neuvedeno"}
								</Typography>
							</Box>
							<Box>
								<Typography
									sx={{ color: "#388e3c", fontWeight: 600, fontSize: 18 }}
								>
									Kategorie:
								</Typography>
								<Typography
									sx={{ color: "#222", fontWeight: "bold", fontSize: 20 }}
								>
									{job?.category || "Neuvedeno"}
								</Typography>
							</Box>
							<Box>
								<Typography
									sx={{ color: "#388e3c", fontWeight: 600, fontSize: 18 }}
								>
									Typ úvazku:
								</Typography>
								<Typography
									sx={{ color: "#222", fontWeight: "bold", fontSize: 20 }}
								>
									{job?.Attendance || "Neuvedeno"}
								</Typography>
							</Box>
						</Box>

						<Box
							sx={{
								width: "100%",
								minHeight: 120,
								maxHeight: 350,
								overflow: "auto",
								border: "1.5px solid #cee5fd",
								borderRadius: 3,
								bgcolor: "#f5f7fa",
								color: "#222",
								p: 3,
								boxShadow: 2,
							}}
						>
							<Typography
								variant='h6'
								sx={{
									color: "#1976d2",
									fontWeight: "bold",
									mb: 2,
									fontFamily: "Montserrat, Arial, sans-serif",
								}}
							>
								Popis pracovní pozice
							</Typography>
							<div
								className='rich-content'
								dangerouslySetInnerHTML={{ __html: purifyDescr ?? "" }}
							/>
						</Box>
					</Box>
				</Box>

				{isLogin?.role !== "COMPANY" && (
					<Box
						sx={{
							bgcolor: "#f5f7fa",
							borderRadius: 4,
							boxShadow: 8,
							maxWidth: 550,
							width: "100%",
							mx: "auto",
							p: { xs: 2, sm: 5 },
							display: "flex",
							flexDirection: "column",
							gap: 2,
							fontFamily: "Montserrat, Arial, sans-serif",
							mb: 5,
							mt: { xs: 3, sm: 5, md: 6, lg: 8 },
						}}
					>
						<Typography
							sx={{
								textAlign: "center",
								color: "#1976d2",
								fontWeight: "bold",
								fontSize: 18,
								mt: 2,
							}}
						>
							{CompanyData?.name
								? `Profil firmy: ${CompanyData.name}`
								: "Profil firmy nenalezen"}
						</Typography>

						<Typography
							component='div'
							sx={{
								textAlign: "center",
								color: "#388e3c",
								fontSize: 16,
								mt: 1,
							}}
						>
							{CompanyData?.about ? (
								<div
									className='rich-content'
									dangerouslySetInnerHTML={{ __html: CompanyData.about }}
								/>
							) : (
								"Žádný popis firmy k dispozici."
							)}
						</Typography>
						<Typography
							sx={{
								textAlign: "center",
								color: "#388e3c",
								fontSize: 16,
								mt: 1,
							}}
						>
							{CompanyData?.Phone || "Telefon neuveden."}
						</Typography>
						<Typography
							sx={{
								textAlign: "center",
								color: "#388e3c",
								fontSize: 16,
								mt: 1,
							}}
						>
							{CompanyData?.email || "Email neuveden."}
						</Typography>
					</Box>
				)}
			</Box>
		</>
	);
};

export default JobDetail;
