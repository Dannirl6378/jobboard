"use client";
import { Box, Button, Typography } from "@mui/material";
import HeaderMainPage from "@/components/HeaderMainPage";
import Dialog from "@mui/material/Dialog";
import MasterLogin from "./MasterLogin";
import LoginApp from "./LoginApp/LoginApp";
import LoginUser from "./LoginUser/LoginUser";
import LoginFirm from "./LoginFirm/LoginFirm";

export default function SignIn() {
	const {
		state: {
			roleUsers,
			roleCompany,
			chooseUser,
			chooseCompany,
			openMasterLogin,
			isLoading,
			error,
		},
		actions: {
			handleLogin,
			setChooseCompany,
			setChooseUser,
			setOpenMasterLogin,
		},
	} = LoginApp();

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
					<LoginUser
						chooseUser={chooseUser}
						roleUsers={roleUsers}
						setChooseUser={setChooseUser}
						handleLogin={handleLogin}
					/>
					<LoginFirm
						chooseCompany={chooseCompany}
						setChooseCompany={setChooseCompany}
						roleCompany={roleCompany}
						handleLogin={handleLogin}
					/>

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
