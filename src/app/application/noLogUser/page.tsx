"use client";
import { useAppStore } from "@/store/useAppStore";
import HeaderMainPage from "@/components/HeaderMainPage";
import { Box, Button, TextField, Typography } from "@mui/material";
import QuillEditor from "@/components/textEditor/textEditQuill";
import { useEffect, useState } from "react";
import createApplication from "../userVsApplication/page";
import tempUser from "@/app/user/users/createUser/tempUser";
import getUserByEmail from './temporalUser';


const UserLogInPage = () => {
	const [isEnable, setIsEnable] = useState<boolean>(true);

	const users = useAppStore((state) => state.users);
	const selectedJobId = useAppStore((state) => state.selectedJobId);


	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [about, setAbout] = useState("");

	console.log("jobId", selectedJobId);
    

	const handleEdit = () => setIsEnable(true);
	const handleSave = async () => {
		setIsEnable(false);
		const updateData = {
			name,
			email,
			password: "",
			Phone: phone,
            about:"",
			CoverLetter: about,
			role: "TEMPORAL" as const, // Předpokládám, že role by měla zůstat stejná
		};
		try {
			const temporaryUser = await tempUser(updateData);
			console.log("createTempUser:", temporaryUser);
			// Zde můžete přidat další logiku, např. aktualizaci stavu nebo přesměrování
		} catch (error) {
			console.error("nepovedlo se vytvoři tempUser:", error);
			// Zde můžete přidat další logiku pro zpracování chyby
		}
	};
	const handleApply = async () => {
		if (selectedJobId === null) return;
		try {
            const user = await getUserByEmail(email);
            const userId = user.id;
			const response = await createApplication(userId, selectedJobId);
			console.log("Application created:", response);
			// případně další logika (např. přesměrování, notifikace)
		} catch (error) {
			console.error("Error creating application:", error);
		}
	};
	return (
		<>
			<HeaderMainPage />
			<form
				noValidate
				autoComplete='off'
				style={{
					border: "1px solid gray",
					boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.2)",
					padding: "16px",
					backgroundColor: "#F5F5F5",
					opacity: 0.8,
					borderRadius: "8px",
					maxHeight: "100vh",
					overflowY: "auto",
					width: "80%",
					marginTop: "10%",
					marginLeft: "10%",
					display: "flex",
					flexDirection: "column",
					gap: "24px",
					justifyContent: "center",
					color: "black",
				}}
			>
				<Box>
					<Typography variant='h4' sx={{ textAlign: "center", mb: 2 }}>
						Kontola udaju
					</Typography>
				</Box>
				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						gap: 2,
						border: 1,
						p: 2,
						boxShadow: 5,
						bgcolor: "#D5DEFF",
						opacity: 0.8,
						borderRadius: 2,
					}}
				>
					<Box sx={{ display: "flex", alignItems: "center" }}>
						<TextField
							label='Jméno a příjmení'
							variant='standard'
							value={name}
							disabled={!isEnable}
							onChange={(e) => setName(e.target.value)}
							fullWidth
						/>
					</Box>
					<Box sx={{ display: "flex", alignItems: "center" }}>
						<TextField
							label='Email'
							variant='standard'
							value={email}
							disabled={!isEnable}
							onChange={(e) => setEmail(e.target.value)}
							fullWidth
						/>
					</Box>
					<Box sx={{ display: "flex", alignItems: "center" }}>
						<TextField
							label='Telefon'
							variant='standard'
							value={phone}
							disabled={!isEnable}
							onChange={(e) => setPhone(e.target.value)}
							fullWidth
						/>
					</Box>
					<Box
						sx={{
							display: "flex",
							flexDirection: "column",
							gap: 1,
							width: "50%",
						}}
					>
						<Typography>Pruvodni text :</Typography>
						<QuillEditor value={about} onChange={setAbout} edit={true} />
					</Box>

					<Box sx={{ display: "flex", alignItems: "center" }}>
						<TextField
							label='CV'
							variant='standard'
							value={ ""}
							disabled={true}
							fullWidth
						/>
					</Box>
					{isEnable ? (
						<Button onClick={handleSave}>Save</Button>
					) : (
						<Button onClick={handleEdit}>Edit</Button>
					)}
					<Button onClick={handleApply}>Apply</Button>
				</Box>
			</form>
		</>
	);
};
export default UserLogInPage;
