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
				mt:10,
				mb: 2,
				bgcolor: "#3b82f6",
				p: 2,
				right:'5%',
				left:'5%',
				borderRadius: 2,
				boxShadow: 2,
				minWidth:"80%",
			}}
		>
			<Grid container spacing={1}>
				<Grid size={{ xs: 12, md: 3 }}>
					<TextField
					sx={{background: "linear-gradient(to right,rgb(217, 241, 236),rgb(165, 201, 247))",
						borderRadius: 1,boxShadow: 2}}
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
					sx={{background: "linear-gradient(to right,rgb(217, 241, 236),rgb(165, 201, 247))",
						borderRadius: 1,boxShadow: 2}}
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
					sx={{background: "linear-gradient(to right,rgb(217, 241, 236),rgb(165, 201, 247))",
						borderRadius: 1,
						boxShadow: 2}}
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
					sx={{background: "linear-gradient(to right,rgb(217, 241, 236),rgb(165, 201, 247))",
						borderRadius: 1,boxShadow: 2}}
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
							bgcolor: "rgb(194, 176, 138)",
							color: "black",
							boxShadow: 2,
							":hover": { bgcolor: "#4338ca",color: "white" },
							px: 4,
							py: 0.8,
							fontSize: "0.8rem",
						}}
						onClick={handleSearch}
					>
						Search
					</Button>

					<IconButton sx={{ ml: 2,bgcolor:"transparent", borderRadius:0,":hover": { bgcolor: "#4338ca",borderRadius:1, } }} onClick={() => setShowMore(!showMore)}>
						<ExpandMoreIcon sx={{ fontSize: "1.2rem", color: "rgb(194, 176, 138)" }} />
						<Typography
							sx={{
								color: "black",
								fontSize: "0.8rem",
								ml: 1,
							}}
							variant='body2'
						>
							{showMore ? "Zavřít" : "Více možností"}
						</Typography>
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
								color:"black",
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
