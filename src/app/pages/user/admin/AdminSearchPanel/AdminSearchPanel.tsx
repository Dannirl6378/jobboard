import {
	Box,
	Button,
	Typography,
	TextField,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
} from "@mui/material";
import { useState } from "react";
import { useAppStore } from "@/app/hook/useAppStore";
import { fetchUserByEmail } from "@/app/hook/api";

interface AdminSearchPanelProps {
	setShowEnd: (value: boolean) => void;
	setHasSearched: (value: boolean) => void;
}

const AdminSearchPanel = ({
	setShowEnd,
	setHasSearched,
}: AdminSearchPanelProps) => {
	const [email, setEmail] = useState("");
	const [popUp, setPopUp] = useState(false);
	const [error, setErorr] = useState("");

	const isValid = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

	const setUserId = useAppStore((state) => state.getUserById);
	const setSelectedUserData = useAppStore((state) => state.setSelectedUserData);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setEmail(value);
		setErorr(
			value.length === 0 || isValid(value) ? "" : "Neplatný formát emailu"
		);
	};

	const handleFindUser = async (email: string) => {
		setHasSearched(true);
		if (email === "") {
			setPopUp(true);
			return;
		} else {
			try {
				const user = await fetchUserByEmail(email);
				setUserId(user.id);
				setSelectedUserData(user);
				setEmail(user.email);
				setShowEnd(true);
			} catch (error) {
				setErorr("Uživatel s tímto emailem nebyl nalezen.");
				setSelectedUserData(null);
			}
		}
	};

	return (
		<Box
			sx={{
				p: 3,
				bgcolor: "#f5f7fa",
				borderRadius: 3,
				boxShadow: 2,
				fontFamily: "Montserrat, Arial, sans-serif",
				mt: 2,
				display: "flex",
				flexDirection: "column",
				alignItems: "flex-start",
				gap: 2,
				maxWidth: 400,
			}}
		>
			<Typography
				variant='h6'
				sx={{
					fontWeight: "bold",
					color: "#1976d2",
					fontFamily: "Montserrat, Arial, sans-serif",
					mb: 1,
				}}
			>
				Najdi uživatele podle emailu
			</Typography>
			<TextField
				value={email}
				onChange={handleChange}
				type='email'
				label='Email'
				data-testid='email'
				variant='outlined'
				fullWidth
				sx={{
					bgcolor: "white",
					borderRadius: 1,
					fontFamily: "Montserrat, Arial, sans-serif",
				}}
				error={!!error}
				helperText={error}
			/>
			<Button
				variant='contained'
				onClick={() => handleFindUser(email)}
				sx={{
					bgcolor: "#1976d2",
					color: "#fff",
					fontWeight: "bold",
					fontFamily: "Montserrat, Arial, sans-serif",
					"&:hover": { bgcolor: "#1565c0" },
					mt: 1,
					width: "100%",
				}}
			>
				Najdi uživatele
			</Button>
			<Dialog open={popUp} onClose={() => setPopUp(false)}>
				<DialogTitle sx={{ color: "#d32f2f", fontWeight: "bold" }}>
					Chyba
				</DialogTitle>
				<DialogContent>
					<Typography sx={{ mt: 1, color: "#222" }}>
						Zadej prosím email.
					</Typography>
				</DialogContent>
				<DialogActions>
					<Button
						onClick={() => setPopUp(false)}
						variant='outlined'
						sx={{
							fontWeight: "bold",
							color: "#1976d2",
							borderColor: "#1976d2",
							"&:hover": { bgcolor: "#e3fcec", borderColor: "#1976d2" },
						}}
					>
						Zavřít
					</Button>
				</DialogActions>
			</Dialog>
		</Box>
	);
};
export default AdminSearchPanel;
