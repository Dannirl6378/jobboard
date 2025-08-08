"use client";
import { useAppStore } from "@/store/useAppStore";
import HeaderMainPage from "@/components/HeaderMainPage";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Typography } from "@mui/material";
import QuillEditor from "@/components/textEditor/textEditQuill";
import { useEffect, useState } from "react";
import {
	fetchCreateApplication,
	fetchCreateUser,
	fetchUserByEmail,
} from "@/lib/api";
import { useRouter} from "next/navigation";

const UserNoLogInPage = () => {
	const selectedJobId = useAppStore((state) => state.selectedJobId);

	const [isEnable, setIsEnable] = useState(false);
	const [loading, setLoading] = useState(false);
	const  [isCreated, setIsCreated] = useState(false);
	const [openDialog, setOpenDialog] = useState(false);

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [about, setAbout] = useState("");

	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");
	const router = useRouter();

	const handleSave = async () => {
		if (!name.trim() || !email.trim()) {
			setError("Jméno a email jsou povinné.");
			setSuccess("");
			return;
		}
		setLoading(true);
		setError("");
		setSuccess("");
		try {
			const updateData = {
				name,
				email,
				password: "",
				Phone: phone,
				about: about,
				CoverLetter: about,
				CV: "",
				role: "TEMPORAL" as const,
			};
			const temporaryUser = await fetchCreateUser(updateData);
			console.log("createTempUser:", temporaryUser);
			setSuccess("Uživatel byl úspěšně uložen.");
			setIsCreated(true);
			setIsEnable(false);
		} catch (error) {
			console.error("Nepovedlo se vytvořit tempUser:", error);
			setError("Chyba při ukládání uživatele.");
			setSuccess("");
		} finally {
			setLoading(false);
		}
	};
	useEffect(() => {
		if (isCreated) {
			handleApply();
		}
	}, [isCreated]);

	const handleApply = async () => {
		if (!email.trim()) {
			setError("Email je nutný pro podání přihlášky.");
			setSuccess("");
			return;
		}
		if (selectedJobId === null) {
			setError("Není vybrána žádná pracovní pozice.");
			setSuccess("");
			return;
		}
		
		setLoading(true);
		setError("");
		setSuccess("");
		try {
			const user = await fetchUserByEmail(email);
			if (!user?.id) {
				setError(
					"Uživatel s tímto emailem neexistuje, prosím nejdříve uložte profil."
				);
				setLoading(false);
				return;
			}
			const response = await fetchCreateApplication(user.id, selectedJobId);
			console.log("Application created:", response);
			setSuccess("Přihláška byla úspěšně odeslána.");
			setOpenDialog(true);
		} catch (error) {
			console.error("Chyba při vytváření přihlášky:", error);
			setError("Nepodařilo se odeslat přihlášku.");
		} finally {
			setLoading(false);
		}
	};

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
						mt:2,
					}}
				>
					Vyplňte základní údaje
				</Typography>

				<Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
					<TextField
						label='Jméno a příjmení'
						variant='outlined'
						value={name}
						disabled={!isEnable || loading}
						onChange={(e) => setName(e.target.value)}
						fullWidth
						required
						sx={{ bgcolor: "#f9fafb", borderRadius: 1 }}
					/>
					<TextField
						label='Email'
						variant='outlined'
						type='email'
						value={email}
						disabled={!isEnable || loading}
						onChange={(e) => setEmail(e.target.value)}
						fullWidth
						required
						sx={{ bgcolor: "#f9fafb", borderRadius: 1 }}
					/>
					<TextField
						label='Telefon'
						variant='outlined'
						value={phone}
						type='tel'
						disabled={!isEnable || loading}
						onChange={(e) => setPhone(e.target.value)}
						fullWidth
						sx={{ bgcolor: "#f9fafb", borderRadius: 1 }}
					/>
					<Box>
						<Typography sx={{ mb: 1, color: "#1976d2", fontWeight: "600" }}>
							Průvodní text
						</Typography>
						<QuillEditor value={about} onChange={setAbout} edit={true} />
					</Box>
					<TextField
						label='CV (zatím nepodporováno)'
						variant='outlined'
						value={""}
						disabled
						fullWidth
						sx={{ bgcolor: "#f0f0f0", borderRadius: 1 }}
					/>
				</Box>

				<Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
					{!isEnable && (
						<Button
							variant='outlined'
							onClick={() => setIsEnable(true)}
							disabled={loading}
							sx={{
								color: "#1976d2",
								borderColor: "#1976d2",
								fontWeight: "700",
								px: 4,
								"&:hover": { borderColor: "#1565c0", color: "#1565c0" },
							}}
						>
							Upravit
						</Button>
					)}
					<Button
						variant='contained'
						color='success'
						onClick={handleSave}
						disabled={loading || !isEnable}
						sx={{ fontWeight: "700", px: 4 }}
					>
						{loading ? "Odesílám..." : "Přihlásit se"}
					</Button>
				</Box>

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
            color="primary"
            variant="contained"
          >
            Hlavní stránka
          </Button>
        </DialogActions>
      </Dialog>
		</>
	);
};

export default UserNoLogInPage;
