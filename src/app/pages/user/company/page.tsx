"use client";
import { Box, Typography } from "@mui/material";
import HeaderMainPage from "@/components/HeaderMainPage";
import UserCompanyProfile from "./useCompanyProfil/page";
import UserCopmanyEdit from "./useCompanyEdit/page";
import UserCompanyApp from "./useCompanyApp/page";
import UserCompany from "./useCompany/page";

const Firm = () => {
	const {
		state: {
			openApplicantsJobId,
			sanitizedDescriptions,
			company,
			companyJobs,
			applicantsByJobId,
		},
		actions: {
			setOpenApplicantsJobId,
			handleEditWorkOffer,
			handleAddWorkOffer,
			handleEditUser,
			handleWiewUserProfile,
			handleDelete,
		},
	} = UserCompany();

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
					mx: "20%",
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
				<UserCompanyProfile
					company={company}
					handleAddWorkOffer={handleAddWorkOffer}
					handleEditUser={handleEditUser}
				/>

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
									<UserCopmanyEdit
										handleEditWorkOffer={handleEditWorkOffer}
										handleDelete={handleDelete}
										applicants={applicants}
										isOpen={isOpen}
										job={job}
										setOpenApplicantsJobId={setOpenApplicantsJobId}
									/>

									{isOpen ? (
										<UserCompanyApp
											applicants={applicants}
											handleWiewUserProfile={handleWiewUserProfile}
										/>
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
