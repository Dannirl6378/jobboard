"use client";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useAppStore } from "@/app/hook/useAppStore";
import { useState } from "react";
import { useRouter } from "next/navigation";
import bcrypt from "bcryptjs";

type MasterLoginProps = {
	onClose: () => void;
};

const MasterLogin = ({ onClose }: MasterLoginProps) => {
	const user = useAppStore((state) => state.users);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const router = useRouter();

	//const usersArray = Object.values(user);

	const handleLoginMaster = async () => {
		if (email === "" || password === "") {
			alert("Vyplň všechny údaje");
			return;
		}

		const masterUser = Object.values(user).find(
			(u) => u.email.toLowerCase() === email.toLowerCase()
		);
		

		if (!masterUser) {
			alert("Uživatel nenalezen");
			return;
		}
		
		const isMatch = await bcrypt.compare(password, masterUser.password);

		if (isMatch) {
			useAppStore.getState().setLogIn(masterUser);
			router.push("/");
		} else {
			alert("Nesprávné heslo");
		}
	};

	return (
		<Box
			sx={{
				bgcolor: "linear-gradient(135deg, #cee5fd 0%, #e3fcec 100%)",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				fontFamily: "Montserrat, Arial, sans-serif",
			}}
		>
			<Box
				sx={{
					bgcolor: "white",
					borderRadius: 4,
					boxShadow: 8,
					p: { xs: 3, sm: 5 },
					width: "100%",
					maxWidth: 400,
					display: "flex",
					flexDirection: "column",
					gap: 3,
					alignItems: "center",
				}}
			>
				<Typography
					variant='h5'
					sx={{
						color: "#1976d2",
						fontWeight: "bold",
						mb: 2,
						fontFamily: "Montserrat, Arial, sans-serif",
						letterSpacing: 1,
					}}
				>
					Přihlášení správce
				</Typography>

				<TextField
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					type='email'
					label='Email'
					variant='outlined'
					fullWidth
					sx={{
						bgcolor: "#f5f7fa",
						borderRadius: 2,
						fontFamily: "Montserrat, Arial, sans-serif",
					}}
				/>

				<TextField
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					type='password'
					label='Heslo'
					variant='outlined'
					fullWidth
					sx={{
						bgcolor: "#f5f7fa",
						borderRadius: 2,
						fontFamily: "Montserrat, Arial, sans-serif",
					}}
				/>

				<Button
					onClick={handleLoginMaster}
					variant='contained'
					fullWidth
					sx={{
						bgcolor: "#1976d2",
						color: "#fff",
						fontWeight: "bold",
						fontFamily: "Montserrat, Arial, sans-serif",
						borderRadius: 2,
						py: 1.5,
						mt: 1,
						"&:hover": { bgcolor: "#1565c0" },
						boxShadow: 2,
						fontSize: 18,
					}}
				>
					Přihlásit se
				</Button>
				<Box sx={{ display: "flex", justifyContent: "flex-end" }}>
					<Button onClick={onClose} sx={{ mb: 2 }}>
						Zavřít
					</Button>
				</Box>
			</Box>
		</Box>
	);
};

export default MasterLogin;
