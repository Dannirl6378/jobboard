import QuillEditor from "@/components/textEditor/TextEditQuill";
import { Box, Button, TextField, Typography } from "@mui/material";

interface Props {
	isEnable: boolean;
	handleEdit: () => void;
	handleSave: () => void;
	handleApply: () => void;
	name: string;
	email: string;
	phone: string;
	about: string;
	dataUser: any;
	setName: (name: string) => void;
	setEmail: (email: string) => void;
	setPhone: (phone: string) => void;
	setAbout: (about: string) => void;
};

export default function UserLoginCard({
	isEnable,
	handleEdit,
	handleSave,
	handleApply,
	name,
	email,
	phone,
	about,
	dataUser,
	setName,
	setEmail,
	setPhone,
	setAbout,
}: Props) {
	return (
		<>
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
					mt: 3,
					mb: 5,
				}}
			>
				<Typography
					color='#1976d2'
					variant='h5'
					sx={{
						mt: 2,
						fontWeight: "bold",
						width: "100%",
						textAlign: "center",
					}}
				>
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
					<Typography color='#1976d2' fontWeight='medium' mb={1}>
						Průvodní text
					</Typography>
					<QuillEditor value={about} onChange={setAbout} edit={isEnable} />
				</Box>

				<TextField
					label='CV (zatím nepodporováno)'
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
		</>
	);
}
