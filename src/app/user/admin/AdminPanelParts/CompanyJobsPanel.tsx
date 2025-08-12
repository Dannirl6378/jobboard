/*{selectedUserData?.role === "COMPANY" && (
    <CompanyJobsPanel
      companyJobs={companyJobs}
      selectedJobId={selectedJobId}
      onToggleAll={toggleAllJobs}
      onCheckboxChange={handleCheckboxChange}
      onDeleteJob={handleDeleteJob}
      onCreateJob={handleCreateOpenJob}
      onEditJobs={handleEditJobs}
      createJob={createJob}
      setCreateJob={setCreateJob}
      email={selectedUserData.email || ""}
    />
  )}*/

import {
	Box,
	Button,
	Checkbox,
	ListItem,
	Typography,
	List,
} from "@mui/material";
import AdminCreateJob from "../AdminCreateJob/AdminCreateJob";
import AdminEditJob from "../AdminEditJobs/AdminEditJobs";
import { Job } from "@/types/job";
import { Dispatch, SetStateAction } from "react";

interface CompanyJobsPanelProps {
	selectedUserData: any;
	companyJobs: Job[];
	selectedJobId: string[];
	toggleAllJobs: () => void;
	handleCheckboxChange: (jobId: string) => void;
	handleDeleteJob: () => void;
	handleCreateOpenJob: () => void;
	handleEditJobs: () => void;
	createJob: boolean;
	editJobsOpen: boolean;
	setEditJobsOpen: Dispatch<SetStateAction<boolean>>;
	setCreateJob: (value: boolean) => void;
}

export default function CompanyJobsPanel({
	selectedUserData,
	companyJobs,
	selectedJobId,
	toggleAllJobs,
	handleCheckboxChange,
	handleDeleteJob,
	handleCreateOpenJob,
	handleEditJobs,
	createJob,
	editJobsOpen,
	setEditJobsOpen,
	setCreateJob,
}: CompanyJobsPanelProps) {
	return (
		<Box
			sx={{
				p: { xs: 2, md: 3 },
				bgcolor: "#f5f7fa",
				borderRadius: 3,
				boxShadow: 3,
				fontFamily: "Montserrat, Arial, sans-serif",
				mt: 2,
			}}
		>
			<Typography
				variant='h5'
				sx={{
					fontWeight: "bold",
					color: "#1976d2",
					mb: 2,
					fontFamily: "Montserrat, Arial, sans-serif",
				}}
			>
				Pracovní pozice firmy
			</Typography>
			<Box sx={{display: "flex",
      flexDirection: { xs: "column", sm: "row" },
      gap: { xs: 1, sm: 2 },
      mb: 2, }}>
				<Button
					variant='outlined'
					onClick={toggleAllJobs}
					sx={{
						borderColor: "#43a047",
						color: "#43a047",
						fontWeight: "bold",
						fontFamily: "Montserrat, Arial, sans-serif",
						"&:hover": {
							bgcolor: "#e3fcec",
							borderColor: "#388e3c",
							color: "#388e3c",
						},
					}}
				>
					{selectedJobId && selectedJobId.length === companyJobs.length
						? "Odznačit vše"
						: "Vybrat vše"}
				</Button>
				<Button
					variant='contained'
					onClick={handleCreateOpenJob}
					sx={{
						bgcolor: "#43a047",
						color: "#fff",
						fontWeight: "bold",
						fontFamily: "Montserrat, Arial, sans-serif",
						"&:hover": { bgcolor: "#2e7031" },
					}}
				>
					Vytvořit pozici
				</Button>
				<Button
					variant='contained'
					onClick={handleEditJobs}
					sx={{
						bgcolor: "#1976d2",
						color: "#fff",
						fontWeight: "bold",
						fontFamily: "Montserrat, Arial, sans-serif",
						"&:hover": { bgcolor: "#1565c0" },
					}}
				>
					Upravit vybrané
				</Button>
				<Button
					variant='contained'
					onClick={handleDeleteJob}
					sx={{
						bgcolor: "#d32f2f",
						color: "#fff",
						fontWeight: "bold",
						fontFamily: "Montserrat, Arial, sans-serif",
						"&:hover": { bgcolor: "#b71c1c" },
					}}
				>
					Smazat vybrané
				</Button>
			</Box>
			<List sx={{ width: "100%" }}>
				{companyJobs.map((job) => (
					<ListItem
						key={job.id}
						sx={{
							bgcolor: "#e3fcec",
							borderRadius: 2,
							boxShadow: 1,
							mb: 1,
							display: "flex",
							alignItems: "center",
							justifyContent: "space-between",
							transition: "box-shadow 0.2s, transform 0.2s",
							"&:hover": {
								boxShadow: 4,
								bgcolor: "#b2f2d7",
								transform: "scale(1.01)",
							},
						}}
					>
						<Box>
							<Typography
								variant='subtitle1'
								sx={{
									fontWeight: "bold",
									color: "#1976d2",
									fontFamily: "Montserrat, Arial, sans-serif",
								}}
							>
								{job.title}
							</Typography>
							<Typography
								variant='body2'
								sx={{
									color: "#388e3c",
									fontFamily: "Montserrat, Arial, sans-serif",
								}}
							>
								Vytvořeno:{" "}
								{job?.createdat
									? new Date(job.createdat).toLocaleDateString("cs-CZ")
									: ""}
							</Typography>
						</Box>
						<Checkbox
							checked={!!selectedJobId && selectedJobId.includes(job.id)}
							onChange={() => handleCheckboxChange(job.id)}
							color='success'
							sx={{ ml: 2 }}
						/>
					</ListItem>
				))}
			</List>
			{createJob && (
				<Box
					sx={{
						zIndex: 10,
						background: "rgba(255, 255, 255, 0.7)",
						position: "fixed",
						width: "100vw",
						height: "100vh",
						left: 0,
						top: 0,
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
					}}
				>
					<AdminCreateJob
						email={selectedUserData.email || ""}
						setCreateJob={setCreateJob}
					/>
				</Box>
			)}
			{editJobsOpen && (
				<Box
					sx={{
						zIndex: 10,
						background: "rgba(255, 255, 255, 0.7)",
						position: "fixed",
						width: "100vw",
						height: "100vh",
						left: 0,
						top: 0,
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
					}}
				>
					<AdminEditJob
						setEditJobsOpen={setEditJobsOpen}
					/>
				</Box>
			)}
		</Box>
	);
}
