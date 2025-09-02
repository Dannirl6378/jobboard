import QuillEditor from "@/components/textEditor/TextEditQuill";
import { Box, TextField, Typography } from "@mui/material";

type Props = {
	name: string;
	email: string;
	phone: string;
	about: string;
	isEnable?: boolean;
	loading?: boolean;
	isValidPhone?: boolean;
	setName: (name: string) => void;
	setEmail: (email: string) => void;
	setAbout: (about: string) => void;
	handlePhoneChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function NoLogUserCard({
	name,
	email,
	phone,
	about,
	isEnable,
	loading,
	isValidPhone,
	setEmail,
	setAbout,
	setName,
	handlePhoneChange,
}: Props) {
	return (
		<>
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
					label={
						isValidPhone ? "Telefon" : "Telefon (povolené pouze číslice a +)"
					}
					variant='outlined'
					value={phone}
					type='tel'
					disabled={!isEnable || loading}
					onChange={handlePhoneChange}
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
		</>
	);
}
