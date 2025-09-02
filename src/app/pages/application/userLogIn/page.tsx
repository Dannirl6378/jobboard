"use client";
import HeaderMainPage from "@/components/HeaderMainPage";
import {
	Box,
} from "@mui/material";
import UserLoginApp from "./UserLoginApp/UserLoginApp";
import UserLoginCard from "./UserLoginCard/UserLoginCard";
import UserLoginDialog from "./UserLoginDialog/UserLoginDialog";

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
				<UserLoginDialog  openSnackbar={openSnackbar} openDialog={openDialog}
				setOpenSnackbar={setOpenSnackbar} setOpenDialog={setOpenDialog}
				/>
		</>
	);
};

export default UserLogInPage;
