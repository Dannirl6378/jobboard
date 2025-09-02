import { Box, Button, Typography } from "@mui/material";

interface Props {
    purifyCoverLetter: string;
    handleBack: () => void;
}


export default function UserProfileResume({purifyCoverLetter, handleBack}: Props) {
    return (
        <>
							<Typography
								color='#1976d2'
								variant='h5'
								sx={{ mt: 2, fontWeight: "bold", width: "100%" }}
							>
								Průvodní dopis
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
									dangerouslySetInnerHTML={{ __html: purifyCoverLetter }}
								/>
							</Box>
							<Button
								variant='contained'
								onClick={handleBack}
								sx={{
									bgcolor: "#43a047",
									color: "#fff",
									fontWeight: "bold",
									fontFamily: "Montserrat, Arial, sans-serif",
									"&:hover": { bgcolor: "#2e7031" },
								}}
							>
								Zpět
							</Button>
						</>
    )}