"use client";
import { fetchCreateUser } from "@/lib/api";
import { useAppStore } from "@/store/useAppStore";
import {
	Alert,
	Box,
	Button,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	Snackbar,
	TextField,
	Typography,
} from "@mui/material";
import { useState } from "react";

type UserRole = "ADMIN" | "USER" | "TEMPORAL" | "COMPANY";

const AdminCreateUser = () => {
	const users = useAppStore((state) => state.users);

	const [success, setSuccess] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [role, setRole] = useState<UserRole | "">("");
	const [password, setPassword] = useState("");
	const [createdUser, setCreatedUser] = useState<any>(null);

	const generatePassword = (delka = 8) => {
		const chars =
			"abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
		let password = "";
		for (let i = 0; i < delka; i++) {
			password += chars.charAt(Math.floor(Math.random() * chars.length));
		}
		return password;
	};

	const handleGenerate = async () => {
		if (!name || !email || !password || !role) {
			setError("Vyplňte všechna pole včetně role a hesla.");
			return;
		}
		const updateData = {
			name,
			email,
			password,
			Phone: phone,
			about: "",
			CoverLetter: "",
			CV: "",
			role: role  ? role : undefined,
		};
		try {
			const user = await fetchCreateUser(updateData);
			setCreatedUser(user);
			setSuccess(true);
			setError(null);
		} catch (error) {
			setError("Nepovedlo se vytvořit uživatele.");
			setSuccess(false);
		}
	};

	const phoneRegex = /^\+?[0-9]{9,15}$/; // + a 9-15 číslic bez mezer

const isValidPhone = phoneRegex.test(phone);

	const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const input = e.target.value;
  // povolit pouze čísla a +
  if (/^[0-9+]*$/.test(input)) {
    setPhone(input);
  }
};

	return (
		<Box
			sx={{
				p: 3,
				bgcolor: "#f5f7fa",
				borderRadius: 3,
				boxShadow: 3,
				fontFamily: "Montserrat, Arial, sans-serif",
				mt: 2,
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				gap: 2,
				maxWidth: 400,
				mx: "auto",
				overflowY: "auto",
				maxHeight: "65vh",
			}}
		>
			<Typography
				variant='h5'
				sx={{
					fontWeight: "bold",
					color: "#1976d2",
					mb: 2,
					fontFamily: "Montserrat, Arial, sans-serif",
				}}
			>
				Vytvořit nového uživatele
			</Typography>
			<TextField
				variant='outlined'
				label='Jméno a příjmení'
				value={name}
				onChange={(e) => setName(e.target.value)}
				fullWidth
				sx={{ bgcolor: "white", borderRadius: 1 }}
			/>
			<TextField
				variant='outlined'
				label='Email'
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				fullWidth
				sx={{ bgcolor: "white", borderRadius: 1 }}
			/>
			<Box sx={{ display: "flex", gap: 1, width: "100%" }}>
				<TextField
					variant='outlined'
					label='Heslo'
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					fullWidth
					sx={{ bgcolor: "white", borderRadius: 1 }}
				/>
				<Button
					variant='outlined'
					onClick={() => setPassword(generatePassword())}
					sx={{
						fontWeight: "bold",
						color: "#43a047",
						borderColor: "#43a047",
						"&:hover": {
							bgcolor: "#e3fcec",
							borderColor: "#388e3c",
							color: "#388e3c",
						},
						minWidth: 120,
					}}
				>
					Vygenerovat
				</Button>
			</Box>
			<TextField
				variant='outlined'
				label={isValidPhone?'Telefon': 'Telefon (povolené pouze číslice a +)'}
				value={phone}
				onChange={handlePhoneChange}
				fullWidth
				sx={{ bgcolor: "white", borderRadius: 1 }}
			/>
			<FormControl fullWidth sx={{ bgcolor: "white", borderRadius: 1 }}>
				<InputLabel id='Role'>Role</InputLabel>
				<Select
					labelId='Role'
					id='Role'
					value={role}
					label='Role'
					onChange={(e) => setRole(e.target.value as UserRole)}
				>
					<MenuItem value={"ADMIN"}>Admin</MenuItem>
					<MenuItem value={"COMPANY"}>Company</MenuItem>
					<MenuItem value={"USER"}>User</MenuItem>
					<MenuItem value={"TEMPORAL"}>Temporal</MenuItem>
				</Select>
			</FormControl>
			<Button
				variant='contained'
				onClick={handleGenerate}
				sx={{
					bgcolor: "#1976d2",
					color: "#fff",
					fontWeight: "bold",
					fontFamily: "Montserrat, Arial, sans-serif",
					"&:hover": { bgcolor: "#1565c0" },
					width: "100%",
				}}
			>
				Vytvořit uživatele
			</Button>

			{createdUser && success && (
				<Box
					mt={3}
					p={2}
					border={1}
					bgcolor='#e3fcec'
					boxShadow={2}
					borderRadius={2}
					width='100%'
				>
					<Typography
						variant='h6'
						sx={{ color: "#1976d2", fontWeight: "bold" }}
					>
						Uživatel vytvořen:
					</Typography>
					<Typography sx={{ color: "#222" }}>
						Jméno: {createdUser.name}
					</Typography>
					<Typography sx={{ color: "#222" }}>
						Email: {createdUser.email}
					</Typography>
					<Typography sx={{ color: "#222" }}>
						Telefon: {createdUser.Phone}
					</Typography>
					<Typography sx={{ color: "#222" }}>Heslo: {password}</Typography>
					<Button
						variant='outlined'
						sx={{
							mt: 1,
							fontWeight: "bold",
							color: "#43a047",
							borderColor: "#43a047",
							"&:hover": {
								bgcolor: "#e3fcec",
								borderColor: "#388e3c",
								color: "#388e3c",
							},
						}}
					>
						Pošli email
					</Button>
				</Box>
			)}

			<Snackbar
				open={!!error}
				autoHideDuration={6000}
				onClose={() => setError(null)}
			>
				<Alert severity='error' onClose={() => setError(null)}>
					{error}
				</Alert>
			</Snackbar>
		</Box>
	);
};
export default AdminCreateUser;
