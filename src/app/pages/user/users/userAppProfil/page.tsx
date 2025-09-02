"use client";
import { Box, Typography } from "@mui/material";

import HeaderMainPage from "@/components/HeaderMainPage";
import { Heading, Text } from "@/styles/editTypoghraphy";
import QuillEditor from "@/components/textEditor/TextEditQuill";
import UserProfileForm from "./useProfileForm/UserProfileForm";
import UserProfilePassword from "./useProfilePassword/UserProfilePassword";
import UserProfileResume from "./useProfileResume/UserProfileResume";
import UserProfileApp from "./useProfileApplication/UserProfileApplication";
import UserProfileEdit from "./useProfileEdit/UserProfileEdit";
import useUserProfile from "./useProfileApp/UserProfileApp";

export default function UserProfil() {
	const {
		state: {
			isEnable,
			name,
			email,
			password,
			phone,
			rePassword,
			about,
			purifyAbout,
			purifyCoverLetter,
			appliedJobs,
			LogIn,
			userVsFirm,
			profileUser,
			isValidPhone,
		},
		actions: {
			setName,
			setEmail,
			setPassword,
			setRePassword,
			setAbout,
			handlePhoneChange,
			handleEdit,
			handleSaveChanges,
			handleBack,
		},
	} = useUserProfile();

	return (
		<>
			<HeaderMainPage />
			<Box
				sx={{
					bgcolor: "linear-gradient(135deg, #cee5fd 0%, #e3fcec 100%)",
					minHeight: "100vh",
					display: "flex",
					justifyContent: "center",
					alignItems: "flex-start",
					overflow: "auto",
					py: 4,
				}}
			>
				<Box
					sx={{
						bgcolor: "white",
						borderRadius: 3,
						boxShadow: 6,
						width: { xs: "98vw", sm: 600 },
						maxWidth: 700,
						mx: "auto",
						p: { xs: 2, sm: 4 },
						display: "flex",
						mt: "5%",
						flexDirection: "column",
						alignItems: "center",
						gap: 2,
						fontFamily: "Montserrat, Arial, sans-serif",
					}}
				>
					<Box sx={{ width: "100%", textAlign: "center", mb: 2 }}>
						<Heading
							sx={{ color: "#1976d2", fontWeight: "bold", letterSpacing: 1 }}
						>
							Profil uživatele
						</Heading>
					</Box>
					<UserProfileForm
						name={name}
						email={email}
						phone={phone}
						isEnable={isEnable}
						setName={setName}
						setEmail={setEmail}
						handlePhoneChange={handlePhoneChange}
						isValidPhone={isValidPhone}
					/>

					{isEnable && (
						<>
							<UserProfilePassword
								password={password}
								rePassword={rePassword}
								setPassword={setPassword}
								setRePassword={setRePassword}
								isEnable={isEnable}
							/>
						</>
					)}
					{userVsFirm && purifyCoverLetter !== null && (
						<>
							<UserProfileResume
								handleBack={handleBack}
								purifyCoverLetter={purifyCoverLetter}
							/>
						</>
					)}
					{isEnable && profileUser ? (
						<Box>
							<Typography
								color='#1976d2'
								variant='h5'
								sx={{ mt: 2, fontWeight: "bold", width: "100%" }}
							>
								O mně
							</Typography>
							<QuillEditor value={about} onChange={setAbout} edit={isEnable} />
						</Box>
					) : profileUser?.role !== "TEMPORAL" ? (
						<>
							<Typography
								color='#1976d2'
								variant='h5'
								sx={{ mt: 2, fontWeight: "bold", width: "100%" }}
							>
								O mně
							</Typography>
							<Box
								sx={{
									width: "100%",
									minHeight: 120,
									maxHeight: 250,
									overflow: "auto",
									border: "1px solid #cee5fd",
									borderRadius: 2,
									bgcolor: "#e3fcec",
									color: "#222",
									p: 2,
									mb: 2,
								}}
							>
								<div
									className='rich-content'
									dangerouslySetInnerHTML={{ __html: purifyAbout }}
								/>
							</Box>
						</>
					) : null}
					{LogIn?.role === "COMPANY" ? null : (
						<>
							<UserProfileApp appliedJobs={appliedJobs} />
						</>
					)}
					{userVsFirm === null && (
						<>
							<UserProfileEdit
								handleEdit={handleEdit}
								isEnable={isEnable}
								handleSaveChanges={handleSaveChanges}
								LogIn={LogIn}
							/>
						</>
					)}
				</Box>
			</Box>
		</>
	);
}
