"use client";
import HeaderMainPage from "@/components/HeaderMainPage";
import {
	Box,
	Button,
	Snackbar,
	Alert,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
	DialogActions,
} from "@mui/material";
import UserLoginApp from "./UserLoginApp/page";
import UserLoginCard from "./UserLoginCard/page";

const UserLogInPage = () => {
	const {
		state: {
			name,
			email,
			phone,
			about,
			isEnable,
			openSnackbar,
			openDialog,
			dataUser,
			router,
		},
		actions: {
			handleApply,
			handleEdit,
			handleSave,
			setName,
			setOpenDialog,
			setOpenSnackbar,
			setEmail,
			setPhone,
			setAbout,
		},
	} = UserLoginApp();

	return (
		<>
			<HeaderMainPage />
			<Box
				sx={{
					display: "flex",
					justifyContent: "center",
					mt: 8,
					px: 2,
				}}
			>
				<UserLoginCard
					isEnable={isEnable}
					handleEdit={handleEdit}
					handleSave={handleSave}
					handleApply={handleApply}
					name={name}
					email={email}
					phone={phone}
					about={about}
					dataUser={dataUser}
					setName={setName}
					setEmail={setEmail}
					setPhone={setPhone}
					setAbout={setAbout}
				/>
			</Box>

			<Snackbar
				open={openSnackbar}
				autoHideDuration={3000}
				onClose={() => setOpenSnackbar(false)}
				anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
			>
				<Alert
					onClose={() => setOpenSnackbar(false)}
					severity='success'
					sx={{ width: "100%" }}
				>
					Data byla úspěšně uložena.
				</Alert>
			</Snackbar>
			<Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
				<DialogTitle>Úspěch</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Vaše žádost byla úspěšně odeslána.
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button
						onClick={() => router.push("/")}
						color='primary'
						variant='contained'
					>
						Hlavní stránka
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};

export default UserLogInPage;
