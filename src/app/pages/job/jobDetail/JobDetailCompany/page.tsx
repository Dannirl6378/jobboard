import { Box, Typography } from "@mui/material";

type Props = {
	isLogin?: any;
	CompanyData?: any;
};

export default function JobDetailCompany({ isLogin, CompanyData }: Props) {
	return (
		<>
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
		</>
	);
}
