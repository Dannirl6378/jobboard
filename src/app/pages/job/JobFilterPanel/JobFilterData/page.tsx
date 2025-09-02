import {
	Autocomplete,
	filledInputClasses,
	Grid,
	InputAdornment,
	inputBaseClasses,
	MenuItem,
	TextField,
} from "@mui/material";
import { Jobtype } from "@/app/pages/job/menuSelect";

type Props = {
	filters: {
		jobName: string;
		category: string;
		location: string;
		salary: string;
		full: boolean;
		part: boolean;
		remote: boolean;
		hybrid: boolean;
	};
	Jobtype: { label: string; value: string }[];
	handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	setFilters: React.Dispatch<
		React.SetStateAction<{
			jobName: string;
			category: string;
			location: string;
			salary: string;
			full: boolean;
			part: boolean;
			remote: boolean;
			hybrid: boolean;
		}>
	>;
	locations: string[];
    
};

export default function JobFilterPanel({
	filters,
	handleChange,
	setFilters,
	Jobtype,
	locations,
}: Props) {
	return (
		<>
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
					onChange={(e) => setFilters({ ...filters, category: e.target.value })}
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
		</>
	);
}
