"use client";
import { Box, Button, Typography } from "@mui/material";
import { useAppStore } from "@/store/useAppStore";
import HeaderMainPage from "@/components/HeaderMainPage";
import { useEffect } from "react";
import { fetchUsers } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export default function SignIn() {
	const { data, error, isLoading } = useQuery({
		queryKey: ["users"],
		queryFn: fetchUsers,
	});
	const setLogIn = useAppStore((state) => state.setLogIn);
	const setUsers = useAppStore((state) => state.setUsers);

	useEffect(() => {
		if (data) {
			setUsers(data); // uložíme data do zustand
		}
	}, [data, setUsers]);
	const usersArray = Object.values(useAppStore((state) => state.users));
	const handleLogin = (userType: string) => {
		const user = usersArray?.find((user) => user.email === userType);
		console.log("userLogIn", user);
		if (user) {
			setLogIn(user);
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
					mt: "5%",
					pt: "5%",
					textAlign: "center",
					border: 1,
					borderColor: "gray",
					boxShadow: 5,
					p: 2,
				}}
			>
				<Button
					variant='contained'
					onClick={() => handleLogin("exaple@example.com")}
				>
					User
				</Button>
				<Button
					variant='contained'
					onClick={() => handleLogin("firma@example.com")}
				>
					Firm
				</Button>
				<Button
					variant='contained'
					onClick={() => handleLogin("admin@admin.com")}
				>
					Admin
				</Button>
			</Box>
		</>
	);
}
