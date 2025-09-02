import { Button, Grid, IconButton, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

interface Props{
	handleSearch: () => void;
	handleClear: () => void;
	setShowMore: React.Dispatch<React.SetStateAction<boolean>>;
	showMore: boolean;
};

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
							bgcolor: "rgb(194, 176, 138)",
							color: "black",
							boxShadow: 2,
							":hover": { bgcolor: "#4338ca", color: "white" },
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
							bgcolor: "rgb(194, 176, 138)",
							color: "black",
							boxShadow: 2,
                            whiteSpace: "nowrap",
							":hover": { bgcolor: "#4338ca", color: "white" },
							px: 4,
							py: 0.8,
							fontSize: "0.8rem",
						}}
					>
						Vymazat filtr
					</Button>
				</Grid>

				<Grid size={{ xs: 12, sm: "auto" }}>
					<IconButton
						sx={{
							bgcolor: "rgba(117, 177, 39, 0.46)",
							borderRadius: 1,
							":hover": { bgcolor: "#4338ca", borderRadius: 1 },
						}}
						onClick={() => setShowMore(!showMore)}
					>
						<ExpandMoreIcon
							sx={{ fontSize: "1.5rem", color: "rgb(194, 176, 138)" }}
						/>
						<Typography
							sx={{
								color: "black",
								fontSize: "0.8rem",
								fontWeight: "bold",
								ml: 1,
							}}
							variant='body2'
						>
							{showMore ? "Zavřít" : "Více možností"}
						</Typography>
					</IconButton>
				</Grid>
			</Grid>
		</>
	);
}
