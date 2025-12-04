import { Button, Grid, IconButton, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { HoverHelp } from "../../../../../components/onHover/onHover";

interface Props {
	handleSearch: () => void;
	handleClear: () => void;
	setShowMore: React.Dispatch<React.SetStateAction<boolean>>;
	showMore: boolean;
}

export default function JobFilterButton({
	handleSearch,
	handleClear,
	setShowMore,
	showMore,
}: Props) {
	return (
		<>
			<Grid container spacing={2} justifyContent='center' sx={{ mt: 1 }}>
				<Grid size={{ xs: 6, sm: "auto" }}>
					<Button
						variant='contained'
						size='small'
						sx={{
							bgcolor: "#1976d2",
							color: "white",
							boxShadow: 2,
							":hover": { bgcolor: "#1565c0", color: "black" },
							px: 4,
							py: 0.8,
							fontSize: "0.8rem",
						}}
						onClick={handleSearch}
					>
						Vyhledat
					</Button>
				</Grid>
				<Grid size={{ xs: 6, sm: "auto" }}>
					<Button
						onClick={handleClear}
						sx={{
							bgcolor: "#1976d2",
							color: "white",
							boxShadow: 2,
							whiteSpace: "nowrap",
							":hover": { bgcolor: "#1565c0", color: "black" },
							px: 4,
							py: 0.8,
							fontSize: "0.8rem",
						}}
					>
						Vymazat filtr
					</Button>
				</Grid>

				<Grid size={{ xs: 12, sm: "auto" }}>
					<HoverHelp type='filterOptions'>
						<IconButton
							sx={{
								bgcolor: "rgba(25, 118, 210, 0.20)",
								borderRadius: 1,
								":hover": { bgcolor: "#1976d2", borderRadius: 1, color:"white" },
							}}
							onClick={() => setShowMore(!showMore)}
						>
							<ExpandMoreIcon sx={{ fontSize: "1.2rem", color: "#1976d2" }} />
							<Typography
								sx={{
									color: "black",
									fontSize: "0.8rem",
									fontWeight: "bold",
									ml: 0.5,
								}}
								variant='body2'
							>
								{showMore ? "Zavřít" : "Možnosti"}
							</Typography>
						</IconButton>
					</HoverHelp>
				</Grid>
			</Grid>
		</>
	);
}
