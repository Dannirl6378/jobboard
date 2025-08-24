"use client";

import { useAppStore } from "@/app/hook/useAppStore";
import HeaderMainPage from "@/components/HeaderMainPage";
import QuillEditor from "@/components/textEditor/TextEditQuill";
import {
	Box,
	Button,
	Snackbar,
	TextField,
	Typography,
	Alert,
} from "@mui/material";
import { useEffect, useState } from "react";
import { fetchUpdateUser, fetchCreateApplication } from "@/app/hook/api";

const UserLogInPage = () => {
	const [isEnable, setIsEnable] = useState(false);
	const [openSnackbar, setOpenSnackbar] = useState(false);

	const user = useAppStore((state) => state.LogIn);
	const users = useAppStore((state) => state.users);
	const selectedUserId = useAppStore((state) => state.selectedUserId);
	const selectedJobId = useAppStore((state) => state.selectedJobId);

	const dataUser = selectedUserId ? users[selectedUserId] : user;

	const [name, setName] = useState(dataUser?.name || "");
	const [email, setEmail] = useState(dataUser?.email || "");
	const [phone, setPhone] = useState(dataUser?.Phone || "");
	const [about, setAbout] = useState(dataUser?.CoverLetter || "");

	useEffect(() => {
		setName(dataUser?.name || "");
		setEmail(dataUser?.email || "");
		setPhone(dataUser?.Phone || "");
		setAbout(dataUser?.CoverLetter || "");
	}, [dataUser]);

	const handleEdit = () => setIsEnable(true);

	const handleSave = async () => {
		setIsEnable(false);
		if (!dataUser?.id) return;

		try {
			await fetchUpdateUser(dataUser.id, {
				name,
				email,
				Phone: phone,
				CoverLetter: about,
			});
			setOpenSnackbar(true);
		} catch (error) {
			console.error("Chyba při ukládání:", error);
		}
	};

	const handleApply = async () => {
		if (!dataUser?.id || !selectedJobId) return;
		try {
			await fetchCreateApplication(dataUser.id, selectedJobId);
			setOpenSnackbar(true);
		} catch (error) {
			console.error("Chyba při přihlášení na pozici:", error);
		}
	};

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
				<Box
					component='form'
					noValidate
					autoComplete='off'
					sx={{
						width: "100%",
						maxWidth: 600,
						p: 4,
						bgcolor: "white",
						borderRadius: 3,
						boxShadow: 3,
						display: "flex",
						flexDirection: "column",
						gap: 3,
					}}
				>
					<Typography variant='h5' textAlign='center' fontWeight='bold'>
						Kontrola údajů
					</Typography>

					<TextField
						label='Jméno a příjmení'
						variant='outlined'
						value={name}
						onChange={(e) => setName(e.target.value)}
						disabled={!isEnable}
						fullWidth
					/>

					<TextField
						label='Email'
						variant='outlined'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						disabled={!isEnable}
						fullWidth
					/>

					<TextField
						label='Telefon'
						variant='outlined'
						value={phone}
						onChange={(e) => setPhone(e.target.value)}
						disabled={!isEnable}
						fullWidth
					/>

					<Box>
						<Typography fontWeight='medium' mb={1}>
							Průvodní text
						</Typography>
						<QuillEditor value={about} onChange={setAbout} edit={isEnable} />
					</Box>

					<TextField
						label='CV'
						variant='outlined'
						value={dataUser?.CV || ""}
						disabled
						fullWidth
					/>

					<Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
						{isEnable ? (
							<Button variant='contained' color='primary' onClick={handleSave}>
								Uložit
							</Button>
						) : (
							<Button variant='outlined' onClick={handleEdit}>
								Upravit
							</Button>
						)}
						<Button variant='contained' color='success' onClick={handleApply}>
							Přihlásit se
						</Button>
					</Box>
				</Box>
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
		</>
	);
};

export default UserLogInPage;
