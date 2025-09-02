import { Box, Button, Typography } from "@mui/material";

interface Props {
	page: number;
	totalPages: number;
	jobsPerPage: number;
	joby: any[];
	setPage: (page: number) => void;
};

export default function JobListControlsPage({
	page,
	totalPages,
	jobsPerPage,
	joby,
	setPage,
}: Props) {
	return (
		<>
			<Box
				sx={{ display: "flex", justifyContent: "center", mt: 1, mb: 1, pb: 5 }}
			>
				<Button
					variant='contained'
					disabled={page === 1}
					onClick={() => setPage(page - 1)}
					sx={{
						bgcolor: "#1976d2",
						color: "#fff",
						fontWeight: "bold",
						fontFamily: "Montserrat, Arial, sans-serif",
						"&:hover": { bgcolor: "#1565c0" },
						mr: 2,
					}}
				>
					Předchozí
				</Button>
				<Typography
					sx={{
						mx: 2,
						fontWeight: "bold",
						color: "#1976d2",
						fontFamily: "Montserrat, Arial, sans-serif",
					}}
				>
					Stránka {page} / {totalPages}
				</Typography>
				<Button
					variant='contained'
					disabled={page * jobsPerPage >= joby.length}
					onClick={() => setPage(page + 1)}
					sx={{
						bgcolor: "#1976d2",
						color: "#fff",
						fontWeight: "bold",
						fontFamily: "Montserrat, Arial, sans-serif",
						"&:hover": { bgcolor: "#1565c0" },
					}}
				>
					Další
				</Button>
			</Box>
		</>
	);
}
