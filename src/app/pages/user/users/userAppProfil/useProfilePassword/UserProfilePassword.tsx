import { Box, FormControl, FormHelperText, Input } from "@mui/material";
import { Text } from "@/styles/editTypoghraphy";

interface Props {
    password: string;
    rePassword: string;
    isEnable: boolean;
    setPassword: (val: string) => void;
    setRePassword: (val: string) => void;
};

export default function UserProfilePassword({password , isEnable,rePassword ,setPassword, setRePassword, }: Props) {
    return (
        <>
							<Box sx={{ width: "100%" }}>
								<Text sx={{ color: "#1976d2", fontWeight: 600 }}>Heslo:</Text>
								<Input
									id='password'
									type='password'
									value={password}
									disabled={!isEnable}
									onChange={(e) => setPassword(e.target.value)}
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
								<Text sx={{ color: "#1976d2", fontWeight: 600 }}>
									Opakovat heslo:
								</Text>
								<Input
									id='rePassword'
									type='password'
									value={isEnable ? rePassword : ""}
									disabled={!isEnable}
									onChange={(e) => setRePassword(e.target.value)}
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
						</>
		);
	
	}
