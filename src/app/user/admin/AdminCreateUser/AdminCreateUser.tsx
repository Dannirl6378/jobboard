"use client";
import { fetchCreateUser } from "@/lib/api";
import { useAppStore } from "@/store/useAppStore";
import {
	Box,
	Button,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	TextField,
	Typography,
} from "@mui/material";
import { useState } from "react";

type UserRole = "admin" | "user" | "TEMPORAL" | "COMPANY";

const AdminCreateUser = () => {
	const users = useAppStore((state) => state.users);

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
            console.log("Odesílám data:", updateData);
			const user = await fetchCreateUser(updateData);
			setCreatedUser(user);
			console.log("User:", user);
			return (
				<Box
					sx={{
						border: "1px solid",
						boxShadow: "6",
						zIndex: 1,
						position: "fixed",
						right: "50%",
						top: "50%",
						alignContent: "center",
					}}
				>
					<Typography>Jmeno: {createdUser.name}</Typography>
					<Typography>email: {createdUser.email}</Typography>
					<Typography>Phone: {createdUser.phone}</Typography>
					<Typography>Generovane Heslo: {createdUser.password}</Typography>
					<Button>Pošli email</Button>
				</Box>
			);
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
		</Box>
	);
};
export default AdminCreateUser;
