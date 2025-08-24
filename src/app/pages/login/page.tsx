"use client";
import { Box, Button, List, ListItem, Typography } from "@mui/material";
import { useAppStore } from "@/app/hook/useAppStore";
import HeaderMainPage from "@/components/HeaderMainPage";
import { useEffect, useState } from "react";
import { fetchUsers } from "@/app/hook/api";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import Dialog from "@mui/material/Dialog";
import MasterLogin from "./MasterLogin";

export default function SignIn() {
	const [chooseUser, setChooseUser] = useState(false);
	const [chooseCompany, setChooseCompany] = useState(false);
	const [openMasterLogin, setOpenMasterLogin] = useState(false);

	const { data, error, isLoading } = useQuery({
		queryKey: ["users"],
		queryFn: fetchUsers,
	});
	const setLogIn = useAppStore((state) => state.setLogIn);
	const setUsers = useAppStore((state) => state.setUsers);

	const router = useRouter();

	useEffect(() => {
		if (data) {
			setUsers(data); 
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
	const roleUsers = usersArray?.filter((user) => user.role === "USER");
	

	const roleCompany = usersArray?.filter((user) => user.role === "COMPANY");

	if (isLoading) return <div>Loading...</div>;
	if (error instanceof Error) return <div>Error: {error.message}</div>;
	

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
						onClick={() =>
							chooseUser ? setChooseUser(false) : setChooseUser(true)
						}
					>
						User
					</Button>
					{chooseUser ? (
						<List
							sx={{
								width: "100%",
								bgcolor: "background.paper",
								border: "1px solid #b6c8e6",
								borderRadius: 2,
								overflowY: "auto",
								maxHeight: 300,
							}}
						>
							{roleUsers?.map((user) => (
								<ListItem key={user.email}>
									<Button
										fullWidth
										variant='outlined'
										sx={{
											fontWeight: "bold",
											color: "#1976d2",
											borderColor: "#1976d2",
											":hover": { borderColor: "#1565c0" },
										}}
										onClick={() => handleLogin(user.email)}
									>
										{user.email}
									</Button>
								</ListItem>
							))}
						</List>
					) : null}

					<Button
						fullWidth
						variant='contained'
						sx={{
							fontWeight: "bold",
							bgcolor: "#43a047",
							":hover": { bgcolor: "#2e7031" },
						}}
						onClick={() =>
							chooseCompany ? setChooseCompany(false) : setChooseCompany(true)
						}
					>
						Firmy
					</Button>
					{chooseCompany ? (
						<List
							sx={{
								width: "100%",
								bgcolor: "background.paper",
								border: "1px solid #b6c8e6",
								borderRadius: 2,
								overflowY: "auto",
								maxHeight: 300,
							}}
						>
							{roleCompany?.map((user) => (
								<ListItem key={user.email}>
									<Button
										fullWidth
										variant='outlined'
										sx={{
											fontWeight: "bold",
											color: "#1976d2",
											borderColor: "#1976d2",
											":hover": { borderColor: "#1565c0" },
										}}
										onClick={() => handleLogin(user.email)}
									>
										{user.email}
									</Button>
								</ListItem>
							))}
						</List>
					) : null}

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
					<Button
						fullWidth
						variant='contained'
						sx={{
							fontWeight: "bold",
							bgcolor: "#fbc02d",
							color: "#222",
							":hover": { bgcolor: "#f9a825" },
						}}
						onClick={() => {
							setOpenMasterLogin(true);
							console.log("klik");
						}}
					>
						Master Admin
					</Button>
					<Dialog
						open={openMasterLogin}
						onClose={() => setOpenMasterLogin(false)}
					>
						<MasterLogin onClose={() => setOpenMasterLogin(false)} />
					</Dialog>
				</Box>
			</Box>
		</>
	);
}
