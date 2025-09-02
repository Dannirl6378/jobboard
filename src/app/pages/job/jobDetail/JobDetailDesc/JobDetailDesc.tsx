import { Box, Typography } from "@mui/material";

interface Props {
    purifyDescr?: string;
};

export default function JobDetailDesc({purifyDescr}: Props) {
    return(
        <>
        <Box
							sx={{
								width: "100%",
								minHeight: 120,
								maxHeight: 350,
								overflow: "auto",
								border: "1.5px solid #cee5fd",
								borderRadius: 3,
								bgcolor: "#f5f7fa",
								color: "#222",
								p: 3,
								boxShadow: 2,
							}}
						>
							<Typography
								variant='h6'
								sx={{
									color: "#1976d2",
									fontWeight: "bold",
									mb: 2,
									fontFamily: "Montserrat, Arial, sans-serif",
								}}
							>
								Popis pracovní pozice
							</Typography>
							<div
								className='rich-content'
								dangerouslySetInnerHTML={{ __html: purifyDescr ?? "" }}
							/>
						</Box>
        </>
    )
}