import { Box, Button, Typography } from "@mui/material";

interface Props {
	company?: { id: string; name: string };
	handleAddWorkOffer: () => void;
	handleEditUser: () => void;
};

export default function UserCompanyProfile({
	company,
	handleAddWorkOffer,
	handleEditUser,
}: Props) {
	return (
		<>
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
				Profil firmy: <span style={{ color: "#388e3c" }}>{company?.name}</span>
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
		</>
	);
}
