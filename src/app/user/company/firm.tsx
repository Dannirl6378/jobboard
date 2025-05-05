import { Box, Button, Typography } from "@mui/material";
import React, { useState } from "react";
import { LogInFirm } from "../../login/LogInUser";
import { useAppStore } from "@/store/useAppStore";
import HeaderMainPage from "@/components/HeaderMainPage";
import ApplicationPage from "@/app/application/page";
import Badge from "@mui/material/Badge";
import { useRouter } from "next/navigation";

const Firm = () => {
	const router = useRouter();
	const [selectedJobId, setSelectedJobId] = useState<string | null>(null);

	const usersArray = Object.values(useAppStore((state) => state.users));
	const jobsArray = Object.values(useAppStore((state) => state.jobs));
	const applicationsArray = Object.values(
		useAppStore((state) => state.applications)
	);
	console.log("users", usersArray);
	console.log("applications", applicationsArray);
	console.log("jobs", jobsArray);

	// Ověření že users je pole
	const getCompany = () =>
		usersArray?.find((user) => user.name === LogInFirm.name);

	const getCompanyJobs = (comapnyid: string) =>
		jobsArray.filter((job) => job.companyid === company?.id);

	// Výběr uchazečů na zákl. jobId
	const getCompanyApplications = (companyJobs: any[]) =>
		applicationsArray.filter((application) =>
			companyJobs.some((job) => job.id === application.jobid)
		);

	const company = getCompany();
	console.log("company", company);

	const companyJobs = company ? getCompanyJobs(company.id) : [];
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
    router.push(`/user/company/workOffers/${jobId}`);
	};
const handleAddWorkOffer = ()=>{
  router.push(`/user/company/workOffers/addWorkOffer`);
}
const handleEditUser = ()=>{
	router.push(`/user/users/userAppProfil`);
}

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
						const isOpen = selectedJobId === job.id;
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
								<Typography variant='h5'>{job.description}</Typography>

								<Box sx={{ display: "flex", gap: 2 }}>
									<Button
										variant='contained'
										onClick={() => handleEditWorkOffer(job.id)}
									>
										Upravit pracovní nabídku
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
											applicants.map((user) => (
												<Typography key={user?.applicationId}>
													{user?.name}
												</Typography>
											))
										) : (
											<Typography variant='body2'>Žádní uchazeči</Typography>
										)}
									</Box>
								) : null}
							</Box>
						);
					})}
				</Box>
				<ApplicationPage />
			</Box>
		</Box>
	);
};

export default Firm;
