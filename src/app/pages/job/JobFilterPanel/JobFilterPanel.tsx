import { Box, Button, Grid, Typography } from "@mui/material";
import { useState } from "react";
import { useAppStore } from "@/app/hook/useAppStore";
import JobsFilter from "./JobsFilter";
import { Jobtype } from "@/app/pages/job/menuSelect";
import JobFilterData from "./JobFilterData/JobFilterData";
import JobFilterButton from "./JobFilterButton/JobFilterButton";
import JobFilterOptions from "./JobFilterOptions/JobFilterOptions";
import AIButtonExample from "@/components/findViaAi/page";
import { HoverHelp } from "@/components/onHover/onHover";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

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
	//const [filteredJobs, setFilteredJobs] = useState<Job[] | null>(null);
	const jobsArray = useAppStore((state) => state.jobs);
	const filteredJobsStore = useAppStore((state) => state.filteredJobs);
	const LogIn = useAppStore((state) => state.LogIn);
	const [controlFilters, setControlFilters] = useState<boolean>(false);
	const [open, setOpen] = useState<Boolean>(false);

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
		setControlFilters(true);
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
		handleSearch();
		//setFilteredJobs(null);
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
			<Grid container spacing={3} justifyContent='center' alignItems='center'>
				{/* TextFieldy */}
				<JobFilterData
					filters={filters}
					handleChange={handleChange}
					setFilters={setFilters}
					Jobtype={Jobtype}
					locations={locations}
				/>

				<Grid
					container
					spacing={20}
					justifyContent='center'
					alignContent={"center"}
					alignItems={"center"}
				>
					<JobFilterButton
						handleClear={handleClear}
						handleSearch={handleSearch}
						setShowMore={setShowMore}
						showMore={showMore}
					/>
				</Grid>

				<JobFilterOptions
					showMore={showMore}
					filters={filters}
					handleCheckboxChange={handleCheckboxChange}
				/>
			</Grid>
			{LogIn?.role ==="USER" && (
				<Box sx={{ zIndex: "10",mt:"2%" }}>
					<HoverHelp type='aiFind'>
						<Button
							variant='contained'
							sx={{ bgcolor: "grey" }}
							onClick={() => setOpen(!open)}
						>
							{open ? (
								"Zavřít"
							) : (
								<>
									<AutoAwesomeIcon />
								</>
							)}
						</Button>
					</HoverHelp>
				</Box>
			)}

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
			{open && <AIButtonExample />}
		</Box>
	);
}
