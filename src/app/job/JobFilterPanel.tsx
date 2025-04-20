import {
	Box,
	Button,
	Grid,
	TextField,
	Typography,
	Collapse,
	FormControlLabel,
	Checkbox,
	FormGroup,
	IconButton,
} from "@mui/material";
import { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"; // Ikona pro více možností

export default function JobFilterPanel() {
	const [filters, setFilters] = useState({
		jobName: "",
		category: "",
		location: "",
		salary: "",
	});
	const [showMore, setShowMore] = useState(false);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFilters({ ...filters, [e.target.name]: e.target.value });
	};

	const handleSearch = () => {
		console.log("Searching with filters:", filters);
	};

	return (
		<Box
			sx={{
				mb: 2,
				bgcolor: "#F9FAFB",
				p: 1,
				borderRadius: 2,
				boxShadow: 1,
			}}
		>
			<Typography
				variant='subtitle2'
				sx={{ mb: 1, textAlign: "center", color: "#1f2937" }}
			>
				Filtr nabídek práce
			</Typography>

			<Grid container spacing={1}>
				<Grid size={{ xs: 12, md: 3 }}>
					<TextField
						fullWidth
						size='small'
						label='Job Name'
						name='jobName'
						value={filters.jobName}
						onChange={handleChange}
					/>
				</Grid>
				<Grid size={{ xs: 12, md: 3 }}>
					<TextField
						fullWidth
						size='small'
						label='Category'
						name='category'
						value={filters.category}
						onChange={handleChange}
					/>
				</Grid>
				<Grid size={{ xs: 12, md: 3 }}>
					<TextField
						fullWidth
						size='small'
						label='Location'
						name='location'
						value={filters.location}
						onChange={handleChange}
					/>
				</Grid>
				<Grid size={{ xs: 12, md: 3 }}>
					<TextField
						fullWidth
						size='small'
						label='Salary'
						name='salary'
						value={filters.salary}
						onChange={handleChange}
					/>
				</Grid>

				<Grid size={{ xs: 12 }} sx={{ textAlign: "center", mt: 1 }}>
					<Button
						variant='contained'
						size='small'
						sx={{
							bgcolor: "#4f46e5",
							color: "white",
							":hover": { bgcolor: "#4338ca" },
							px: 4,
							py: 0.8,
							fontSize: "0.8rem",
						}}
						onClick={handleSearch}
					>
						Search
					</Button>

					<IconButton sx={{ ml: 2 }} onClick={() => setShowMore(!showMore)}>
						<ExpandMoreIcon sx={{ fontSize: "1.2rem", color: "#4f46e5" }} />
					</IconButton>
				</Grid>

				<Collapse
					in={showMore}
					timeout='auto'
					unmountOnExit
					style={{ width: "100%" }}
				>
					<Grid size={{ xs: 12 }} sx={{ mt: 1 }}>
						<FormGroup
							row
							sx={{
								justifyContent: "center",
								gap: 1,
								px: 1,
								"& .MuiFormControlLabel-root": {
									m: 0,
									fontSize: "0.75rem",
								},
							}}
						>
							<FormControlLabel
								control={<Checkbox size='small' />}
								label='Plný úvazek'
							/>
							<FormControlLabel
								control={<Checkbox size='small' />}
								label='Částečný'
							/>
							<FormControlLabel
								control={<Checkbox size='small' />}
								label='Z domu'
							/>
							<FormControlLabel
								control={<Checkbox size='small' />}
								label='Hybrid'
							/>
						</FormGroup>
					</Grid>
				</Collapse>
			</Grid>
		</Box>
	);
}
