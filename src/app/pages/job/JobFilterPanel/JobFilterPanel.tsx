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
	Autocomplete,
} from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import { filledInputClasses } from "@mui/material/FilledInput";
import { inputBaseClasses } from "@mui/material/InputBase";
import { useState, useEffect } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useAppStore } from "@/app/hook/useAppStore";
import JobsFilter from "./JobsFilter";
import MenuItem from "@mui/material/MenuItem";
import { Jobtype } from "@/app/pages/job/menuSelect";
import { Job } from "@/types/job";

export default function JobFilterPanel() {
	const [filters, setFilters] = useState({
		jobName: "",
		category: "",
		location: "",
		salary: "",
		full: false,
		part: false,
		remote: false,
		hybrid: false,
	});
	const [showMore, setShowMore] = useState(false);
	const [isSearch, setIsSearch] = useState(false);
	const [filteredJobs, setFilteredJobs] = useState<Job[] | null>(null);
	const jobsArray = useAppStore((state) => state.jobs);
	const filteredJobsStore = useAppStore((state) => state.filteredJobs);

	const locations = Array.from(
		new Set(
			Object.values(jobsArray)
				.map((job) => job.location)
				.filter(Boolean)
		)
	);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFilters({ ...filters, [e.target.name]: e.target.value });
		setIsSearch(false);
	};

	const handleCheckboxChange = (name: string, value: boolean) => {
		setFilters((prev) => ({ ...prev, [name]: value }));
		setIsSearch(false);
	};

	const handleSearch = () => {
		setIsSearch(true);
	};
	const handleClear = () => {
		setFilters({
			jobName: "",
			category: "",
			location: "",
			salary: "",
			full: false,
			part: false,
			remote: false,
			hybrid: false,
		});
		setIsSearch(false);
		setFilteredJobs(null);
	};

	return (
		<Box
			sx={{
				mt: 10,
				mb: 2,
				bgcolor: "#3b82f6",
				p: 2,
				right: "5%",
				left: "5%",
				borderRadius: 2,
				boxShadow: 2,
				minWidth: "80%",
			}}
		>
			<Grid container spacing={1}>
				{/* TextFieldy */}
				<Grid size={{ xs: 12, md: 3 }}>
					<TextField
						sx={{
							background:
								"linear-gradient(to right,rgb(217, 241, 236),rgb(165, 201, 247))",
							borderRadius: 1,
							boxShadow: 2,
							color: "black",
						}}
						fullWidth
						size='small'
						label='Název práce'
						name='jobName'
						variant='filled'
						value={filters.jobName}
						onChange={handleChange}
					/>
				</Grid>
				<Grid size={{ xs: 12, md: 3 }}>
					<TextField
						select
						fullWidth
						size='small'
						variant='filled'
						label='Kategorie'
						name='category'
						value={filters.category}
						onChange={(e) =>
							setFilters({ ...filters, category: e.target.value })
						}
						sx={{
							background:
								"linear-gradient(to right,rgb(217, 241, 236),rgb(165, 201, 247))",
							borderRadius: 1,
							boxShadow: 2,
						}}
					>
						{Jobtype.map((option) => (
							<MenuItem key={option.value} value={option.value}>
								{option.label}
							</MenuItem>
						))}
					</TextField>
				</Grid>
				<Grid size={{ xs: 12, md: 3 }}>
					<Autocomplete
						freeSolo
						options={locations}
						value={filters.location}
						onInputChange={(_, newValue) =>
							setFilters({ ...filters, location: newValue })
						}
						renderInput={(params) => (
							<TextField
								{...params}
								sx={{
									background:
										"linear-gradient(to right,rgb(217, 241, 236),rgb(165, 201, 247))",
									borderRadius: 1,
									boxShadow: 2,
								}}
								fullWidth
								size='small'
								label='Místo Práce'
								name='location'
								variant='filled'
							/>
						)}
					/>
				</Grid>
				<Grid size={{ xs: 12, md: 3 }}>
					<TextField
						sx={{
							background:
								"linear-gradient(to right,rgb(217, 241, 236),rgb(165, 201, 247))",
							borderRadius: 1,
							boxShadow: 2,
						}}
						fullWidth
						size='small'
						label='Plat'
						name='salary'
						variant='filled'
						value={filters.salary}
						onChange={handleChange}
						slotProps={{
							input: {
								endAdornment: (
									<InputAdornment
										position='start'
										sx={{
											alignSelf: "normal",
											opacity: 0,
											pointerEvents: "none",
											[`.${filledInputClasses.root} &`]: {
												marginBottom: "7.5px",
											},
											[`[data-shrink=true] ~ .${inputBaseClasses.root} > &`]: {
												opacity: 1,
											},
										}}
									>
										{"<"}
									</InputAdornment>
								),
							},
						}}
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
							":hover": { bgcolor: "#4338ca", color: "white" },
							px: 4,
							py: 0.8,
							fontSize: "0.8rem",
						}}
						onClick={handleSearch}
					>
						Vyhledat
					</Button>
					<Button
						onClick={handleClear}
						sx={{
							ml: 2,
							bgcolor: "rgb(194, 176, 138)",
							color: "black",
							boxShadow: 2,
							":hover": { bgcolor: "#4338ca", color: "white" },
							px: 4,
							py: 0.8,
							fontSize: "0.8rem",
						}}
					>
						Vymazat filtr
					</Button>
					<IconButton
						sx={{
							ml: 2,
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
								border: "1px solid #c7c2ba52",
								borderRadius: 1,
								background:
									"linear-gradient(to right,rgb(217, 241, 236),rgb(165, 201, 247))",
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								ml: "20%",
								maxWidth: "60%",
								gap: 1,
								px: 1,
								color: "black",
								"& .MuiFormControlLabel-root": {
									m: 0,
									fontSize: "0.75rem",
								},
							}}
						>
							<FormControlLabel
								control={
									<Checkbox
										size='small'
										checked={filters.full}
										onChange={(e) =>
											handleCheckboxChange("full", e.target.checked)
										}
									/>
								}
								label='Plný úvazek'
							/>
							<FormControlLabel
								control={
									<Checkbox
										size='small'
										checked={filters.part}
										onChange={(e) =>
											handleCheckboxChange("part", e.target.checked)
										}
									/>
								}
								label='Částečný'
							/>
							<FormControlLabel
								control={
									<Checkbox
										size='small'
										checked={filters.remote}
										onChange={(e) =>
											handleCheckboxChange("remote", e.target.checked)
										}
									/>
								}
								label='Z domu'
							/>
							<FormControlLabel
								control={
									<Checkbox
										size='small'
										checked={filters.hybrid}
										onChange={(e) =>
											handleCheckboxChange("hybrid", e.target.checked)
										}
									/>
								}
								label='Hybrid'
							/>
						</FormGroup>
					</Grid>
				</Collapse>
			</Grid>
			{isSearch && filteredJobsStore && filteredJobsStore.length === 0 && (
				<Typography
					sx={{
						mt: 2,
						color: "red",
						backgroundColor: "#f8d7da",
						padding: 2,
						borderRadius: 1,
					}}
				>
					Nic nenalezeno pro zadané parametry.
				</Typography>
			)}

			{/* TADY komponentu JobsFilter vykreslíme **pouze pokud isSearch === true** */}
			{isSearch && (
				<JobsFilter filter={filters} jobsArray={Object.values(jobsArray)} />
			)}
		</Box>
	);
}
