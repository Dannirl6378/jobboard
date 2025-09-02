"use client";

import HeaderMainPage from "@/components/HeaderMainPage";
import { Heading } from "@/styles/editTypoghraphy";
import { Box, Typography } from "@mui/material";
import JobDetailReact from "../JobDetailReact/page";
import JobDetailCard from "../JobDetailCard/page";
import JobDetailDesc from "../JobDetailDesc/page";
import JobDetailCompany from "../JobDetailCompany/page";
import JobDetailApp from "../JobDetailApp/page";

const JobDetail = () => {
	const {
		state: {
			job,
			purifyDescr,
			isLogin,
			isRespondet,
			CompanyData,
			router,
			error,
		},
		actions: { handleApply },
	} = JobDetailApp();

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
							<JobDetailReact
								isLogin={isLogin}
								isRespondet={isRespondet}
								handleApply={handleApply}
								router={router}
							/>
						</Box>
						<JobDetailCard job={job ?? undefined} />
						<JobDetailDesc purifyDescr={purifyDescr} />
					</Box>
				</Box>
				<JobDetailCompany isLogin={isLogin} CompanyData={CompanyData} />
			</Box>
		</>
	);
};

export default JobDetail;
