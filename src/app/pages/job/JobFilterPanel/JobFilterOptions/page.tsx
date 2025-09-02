import {
	Checkbox,
	Collapse,
	FormControlLabel,
	FormGroup,
	Grid,
} from "@mui/material";

type Props = {
	showMore: boolean;
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
	handleCheckboxChange: (name: string, value: boolean) => void;
};

export default function JobFilterOptions({
	showMore,
	filters,
	handleCheckboxChange,
}: Props) {
	return (
		<>
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
		</>
	);
}
