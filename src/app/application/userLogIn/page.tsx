"use client";
import { useAppStore } from "@/store/useAppStore";
import HeaderMainPage from "@/components/HeaderMainPage";
import { Box, Button, TextField, Typography } from "@mui/material";
import QuillEditor from "@/components/textEditor/textEditQuill";
import { useEffect, useState } from "react";
import createApplication from "../userVsApplication/page";
import updateUser from "@/app/user/users/updateUser/updateUser";

const UserLogInPage = () => {
	const [isEnable, setIsEnable] = useState<boolean>(false);

	const user = useAppStore((state) => state.LogIn);
	const setUsers = useAppStore((state) => state.setUsers);
	const selectedUserId = useAppStore((state) => state.selectedUserId);
	const users = useAppStore((state) => state.users);
	const selectedJobId = useAppStore((state) => state.selectedJobId);
	const logIn = useAppStore((state) => state.LogIn);

	const dataUser = selectedUserId ? users[selectedUserId] : user;
	console.log("application userLogin",logIn)

	const [name, setName] = useState(logIn?.name || "");
	const [email, setEmail] = useState(logIn?.email || "");
	const [phone, setPhone] = useState(logIn?.Phone || "");
	const [about, setAbout] = useState(logIn?.CoverLetter || "");

	useEffect(() => {
		setName(logIn?.name || "");
		setEmail(logIn?.email || "");
		setPhone(logIn?.Phone || "");
		setAbout(logIn?.CoverLetter || "");
	}, [logIn]);

	console.log("jobId", selectedJobId);
	/*const handleEdit = () => {
		setIsEnable(true);
	};
	const handleApply = () => {
		if (!dataUser) return;
		const updatedUser = {
			...dataUser,
			name: name,
			email: email,
			Phone: phone,
			CoverLetter: about,
		};
	};*/
	const handleEdit = () => setIsEnable(true);
	const handleSave = async () => {
		setIsEnable(false);
		if (!logIn) return;
		const updateData = {
			name,
			email,
			Phone: phone,
			CoverLetter: about,
		};
		try {
			const updatedUser = await updateUser(logIn?.id, updateData);
			console.log("Updated job:", updatedUser);
			// Zde můžete přidat další logiku, např. aktualizaci stavu nebo přesměrování
		} catch (error) {
			console.error("Error updating job:", error);
			// Zde můžete přidat další logiku pro zpracování chyby
		}
	};
	const handleApply = async () => {
	if (!logIn?.id || selectedJobId === null) return;
	try {
		const response = await createApplication(logIn.id, selectedJobId);
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
						<QuillEditor
							value={dataUser?.CoverLetter || ""}
							onChange={setAbout}
							edit={true}
						/>
					</Box>

					<Box sx={{ display: "flex", alignItems: "center" }}>
						<TextField
							label='CV'
							variant='standard'
							value={dataUser?.CV || ""}
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
