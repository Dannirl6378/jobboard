"use client";
import HeaderMainPage from "@/components/HeaderMainPage";
import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Typography,
} from "@mui/material";
import NoLogUserApp from "./noLogUserApp/page";
import NoLogUserCard from "./NoLogUserCard/page";
import NoLogUserEdit from "./NoLogUserEdit/page";

const UserNoLogInPage = () => {
	const {
		state: {
			isValidPhone,
			phone,
			name,
			email,
			about,
			isEnable,
			loading,
			openDialog,
			error,
			success,
			router,
		},
		actions: {
			handleSave,
			setIsEnable,
			setName,
			setEmail,
			setAbout,
			setOpenDialog,
			handlePhoneChange,
		},
	} = NoLogUserApp();

	return (
		<>
			<HeaderMainPage />
			<Box
				component='form'
				noValidate
				autoComplete='off'
				sx={{
					maxWidth: 600,
					maxHeight: "95%",
					border: "2px solid #1976d2",
					mx: "auto",
					mt: 10,
					px: { xs: 2, sm: 4 },
					pb: 6,
					bgcolor: "white",
					borderRadius: 3,
					boxShadow: 6,
					fontFamily: "'Montserrat', Arial, sans-serif",
					display: "flex",
					flexDirection: "column",
					gap: 4,
				}}
			>
				<Typography
					variant='h4'
					sx={{
						color: "#1976d2",
						fontWeight: "700",
						textAlign: "center",
						mb: 1,
						mt: 2,
					}}
				>
					Vyplňte základní údaje
				</Typography>
				<NoLogUserCard
					name={name}
					email={email}
					phone={phone}
					about={about}
					isEnable={isEnable}
					loading={loading}
					isValidPhone={isValidPhone}
					setEmail={setEmail}
					setAbout={setAbout}
					setName={setName}
					handlePhoneChange={handlePhoneChange}
				/>
				<NoLogUserEdit
					isEnable={isEnable}
					loading={loading}
					handleSave={handleSave}
					setIsEnable={setIsEnable}
				/>
				{(error || success) && (
					<Typography
						sx={{
							textAlign: "center",
							fontWeight: "700",
							color: error ? "#d32f2f" : "#43a047",
							mt: 2,
							mb: 1,
						}}
					>
						{error || success}
					</Typography>
				)}
			</Box>
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

export default UserNoLogInPage;
