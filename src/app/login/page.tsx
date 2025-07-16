"use client";
import { Box, Button, Typography } from "@mui/material";
import { useAppStore } from "@/store/useAppStore";
import HeaderMainPage from "@/components/HeaderMainPage";
import { useEffect } from "react";
import { fetchUsers } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export default function SignIn() {
	const { data, error, isLoading } = useQuery({
		queryKey: ["users"],
		queryFn: fetchUsers,
	});
	const setLogIn = useAppStore((state) => state.setLogIn);
	const setUsers = useAppStore((state) => state.setUsers);
	const router = useRouter();

	useEffect(() => {
		if (data) {
			setUsers(data); // uložíme data do zustand
			console.log("whichUser", data);
		}
	}, [data, setUsers]);
	const usersArray = Object.values(useAppStore((state) => state.users));

	const handleLogin = (userType: string) => {
		const user = usersArray?.find((user) => user.email === userType);
		console.log("userLogIn", user);
		if (user) {
			setLogIn(user);
			router.push("/");
		}
	};

	if (isLoading) return <div>Loading...</div>;
	if (error instanceof Error) return <div>Error: {error.message}</div>;
	console.log("users", data);

	return (
		<>
			<HeaderMainPage />
			<Box
				sx={{
					minHeight: "100vh",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					bgcolor: "#cee5fd",
				}}
			>
				<Box
					sx={{
						width: { xs: "90vw", sm: 400 },
						bgcolor: "white",
						borderRadius: 3,
						boxShadow: 6,
						p: { xs: 3, sm: 4 },
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						gap: 3,
						border: "1px solid #b6c8e6",
						fontFamily: "Arial, sans-serif",
					}}
				>
					<Typography
						variant='h5'
						sx={{ fontWeight: "bold", mb: 2, color: "#1976d2" }}
					>
						Přihlášení
					</Typography>
					<Button
						fullWidth
						variant='contained'
						sx={{
							fontWeight: "bold",
							bgcolor: "#1976d2",
							":hover": { bgcolor: "#1565c0" },
						}}
						onClick={() => handleLogin("example@example.com")}
					>
						User
					</Button>
					<Button
						fullWidth
						variant='contained'
						sx={{
							fontWeight: "bold",
							bgcolor: "#43a047",
							":hover": { bgcolor: "#2e7031" },
						}}
						onClick={() => handleLogin("firma@example.com")}
					>
						Firm
					</Button>
					<Button
						fullWidth
						variant='contained'
						sx={{
							fontWeight: "bold",
							bgcolor: "#fbc02d",
							color: "#222",
							":hover": { bgcolor: "#f9a825" },
						}}
						onClick={() => handleLogin("admin@admin.com")}
					>
						Admin
					</Button>
				</Box>
			</Box>
		</>
	);
}
