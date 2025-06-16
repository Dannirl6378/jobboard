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

type UserRole = "admin" | "user" | "TEMPORAL" | "COMPANY";

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

	const generatePassword = (delka = 6) => {
		const chars =
			"abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
		let password = "";
		for (let i = 0; i < delka; i++) {
			password += chars.charAt(Math.floor(Math.random() * chars.length));
			console.log("generovani uspěsně", password);
		}
		return password;
	};

	const handleGenerate = async () => {
		const updateData = {
			name,
			email,
			password,
			Phone: phone,
			about: "",
            CoverLetter: "",
            CV:"",
			role: role === "" ? undefined : role,
		};
		try {
			const user = await fetchCreateUser(updateData);
			setCreatedUser(user);
			console.log("User:", user);
			// Zde můžete přidat další logiku, např. aktualizaci stavu nebo přesměrování
		} catch (error) {
			console.error("nepovedlo se vytvoři User:", error);
			// Zde můžete přidat další logiku pro zpracování chyby
		}
	};

	return (
		<Box>
			<TextField
				variant='outlined'
				label='Jmeno a přijmeni'
				value={name}
				onChange={(e) => setName(e.target.value)}
			/>
			<TextField
				variant='outlined'
				label='email'
				value={email}
				onChange={(e) => setEmail(e.target.value)}
			/>
			<div>
				<TextField
					variant='outlined'
					label='heslo'
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<Button
					variant='outlined'
					onClick={() => setPassword(generatePassword())}
				>
					Vygenerovat Heslo
				</Button>
			</div>
			<TextField
				variant='outlined'
				label='Telefon'
				value={phone}
				onChange={(e) => setPhone(e.target.value)}
			/>
			<div>
				<FormControl sx={{ m: 1, minWidth: 120 }}>
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
			</div>
			<Button variant='outlined' onClick={handleGenerate}>
				Generate User
			</Button>

            {createdUser && success && (
				<Box mt={3} p={2} border={1} bgcolor='white' boxShadow={2}>
					<Typography variant='h6'>Uživatel vytvořen:</Typography>
					<Typography>Jméno: {createdUser.name}</Typography>
					<Typography>Email: {createdUser.email}</Typography>
					<Typography>Telefon: {createdUser.Phone}</Typography>
					<Typography>Heslo: {password}</Typography>
					<Button>Pošli email</Button>
				</Box>
			)}

			<Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError(null)}>
				<Alert severity="error" onClose={() => setError(null)}>
					{error}
				</Alert>
			</Snackbar>
		</Box>
	);
};
export default AdminCreateUser;
