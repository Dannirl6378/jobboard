import { Box, FormControl, FormHelperText, Input } from "@mui/material";
import { Text } from "@/styles/editTypoghraphy";

interface Props {
	name: string;
	email: string;
	phone: string;
	isEnable: boolean;
	isValidPhone: boolean;
	setEmail: (val: string) => void;
	setName: (val: string) => void;
	handlePhoneChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function UserProfileForm({
	name,
	email,
	phone,
	isEnable,
	setEmail,
	setName,
	handlePhoneChange,
	isValidPhone,
}: Props) {
	return (
		<>
			<Box sx={{ width: "100%" }}>
				<Text sx={{ color: "#1976d2", fontWeight: 600 }}>
					Uživatelské jméno:
				</Text>
				<Input
					id='userName'
					value={name}
					disabled={!isEnable}
					onChange={(e) => setName(e.target.value)}
					fullWidth
					sx={{
						bgcolor: "#f5f7fa",
						borderRadius: 2,
						mb: 1,
						fontFamily: "Montserrat, Arial, sans-serif",
						color: "#222",
						fontWeight: 500,
					}}
				/>
			</Box>
			<Box sx={{ width: "100%" }}>
				<Text sx={{ color: "#1976d2", fontWeight: 600 }}>Email:</Text>
				<Input
					id='email'
					value={email}
					disabled={!isEnable}
					onChange={(e) => setEmail(e.target.value)}
					fullWidth
					sx={{
						bgcolor: "#f5f7fa",
						borderRadius: 2,
						mb: 1,
						fontFamily: "Montserrat, Arial, sans-serif",
						color: "#222",
						fontWeight: 500,
					}}
				/>
			</Box>
			<Box sx={{ width: "100%" }}>
				<Text sx={{ color: "#1976d2", fontWeight: 600 }}>Telefon:</Text>
				<FormControl fullWidth>
					<Input
						id='Telefon'
						value={phone}
						disabled={!isEnable}
						onChange={handlePhoneChange}
						fullWidth
						sx={{
							bgcolor: "#f5f7fa",
							borderRadius: 2,
							mb: 1,
							fontFamily: "Montserrat, Arial, sans-serif",
							color: "#222",
							fontWeight: 500,
						}}
					/>
					{!isValidPhone && (
						<FormHelperText error>
							Zadejte platné telefonní číslo (číslice a +)
						</FormHelperText>
					)}
				</FormControl>
			</Box>
		</>
	);
}
