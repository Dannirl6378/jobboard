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

import { Box, Button, Checkbox, ListItem, Typography } from "@mui/material";
import AdminCreateJob from "../AdminCreateJob/AdminCreateJob";
import { Job } from "@/types/job";



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
	setCreateJob,
}: CompanyJobsPanelProps) {
	return (
		<Box p={2}>
			<Typography>Jobs</Typography>
			<Button onClick={toggleAllJobs}>
				{selectedJobId && selectedJobId.length === companyJobs.length
					? "Odznačit vše"
					: "Vybrat vše"}
			</Button>
			{companyJobs.map((job) => (
				<ListItem key={job.id}>
					<Typography>{job.title}</Typography>
					<Typography>
						{": "}
						{job?.createdat
							? new Date(job.createdat).toLocaleDateString("cs-CZ")
							: ""}
					</Typography>
					<Checkbox
						checked={!!selectedJobId && selectedJobId.includes(job.id)}
						onChange={() => handleCheckboxChange(job.id)}
					/>
				</ListItem>
			))}
			{createJob && (
				<Box
					sx={{
						zIndex: 1,
						background: "rgba(255, 255, 255, 0)",
						position: "absolute",
						width: "70vw",
						right: "3%",
						top: "10%",
					}}
				>
					<AdminCreateJob
						email={selectedUserData.email || ""}
						setCreateJob={setCreateJob}
					/>
				</Box>
			)}
			<Button variant='contained' onClick={() => handleDeleteJob()}>
				Delete Job
			</Button>
			<Button variant='contained' onClick={() => handleCreateOpenJob()}>
				Create Job
			</Button>
			<Button variant='contained' onClick={() => handleEditJobs()}>
				Uprav Job
			</Button>
		</Box>
	);
}
