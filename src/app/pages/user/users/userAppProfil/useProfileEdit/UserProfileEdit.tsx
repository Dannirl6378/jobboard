import { Box, Button, Typography } from "@mui/material";

interface Props {
	handleEdit: () => void;
	isEnable: boolean;
	handleSaveChanges: () => void;
	LogIn: { role: string } | null;
};

export default function UserProfileEdit({
	handleEdit,
	isEnable,
	handleSaveChanges,
	LogIn,
}: Props) {
	return (
		<Box
			sx={{
				mt: 2,
				display: "flex",
				gap: 2,
				width: "100%",
				justifyContent: "center",
			}}
		>
			<Button
				variant='outlined'
				onClick={handleEdit}
				sx={{
					fontWeight: "bold",
					color: "#1976d2",
					borderColor: "#1976d2",
					"&:hover": { bgcolor: "#e3fcec", borderColor: "#1976d2" },
				}}
			>
				{!isEnable ? "Upravit" : "Konec"}
			</Button>
			<Button
				variant='contained'
				onClick={handleSaveChanges}
				sx={{
					bgcolor: "#43a047",
					color: "#fff",
					fontWeight: "bold",
					fontFamily: "Montserrat, Arial, sans-serif",
					"&:hover": { bgcolor: "#2e7031" },
				}}
			>
				Ulož
			</Button>
			{LogIn?.role === "COMPANY" ? null : (
				<Typography sx={{ color: "#1976d2", alignSelf: "center" }}>Přilož CV</Typography>
			)}
		</Box>
	);
}
