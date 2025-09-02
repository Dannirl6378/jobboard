import { Typography } from "@mui/material";
import { Box } from "@mui/system";

interface Props {
    applicants: any[];
    handleWiewUserProfile: (userId: string) => void;
}

export default function UserCompanyApp({applicants, handleWiewUserProfile}:Props) {
    return(
        <>
        <Box mt={2}>
											<Typography
												variant='h6'
												sx={{ color: "#1976d2", fontWeight: 600 }}
											>
												Uchazeči:
											</Typography>
											{applicants.length > 0 ? (
												applicants.map((user) =>
													user ? (
														<Typography
															key={user.applicationId}
															sx={{
																cursor: "pointer",
																textDecoration: "underline",
																color: "#222",
																fontFamily: "Montserrat, Arial, sans-serif",
																"&:hover": { color: "#1976d2" },
															}}
															onClick={() => handleWiewUserProfile(user.id)}
														>
															{user.name}
														</Typography>
													) : null
												)
											) : (
												<Typography variant='body2' sx={{ color: "gray" }}>
													Žádní uchazeči
												</Typography>
											)}
										</Box>
        </>
    )
}