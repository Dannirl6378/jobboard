import { Box, ListItem, Typography } from "@mui/material";
import { getCopanyNameJobFormApplication, getUsersForJob } from '../adminHelpers';
import ToolTip from "@mui/material/Tooltip";

interface ApplicationJobListProps {
    selectedUserData:any,
    jobsFromApplications:any[],
    applicationsArray:any[],
    applicationJob:any[],
    jobsArray:any[],
    getUserById:(id:string)=>any,
}
    

export default function ApplicationJobList({
  selectedUserData,
  jobsFromApplications,
  applicationsArray,
  applicationJob,
  jobsArray,
  getUserById,

}: ApplicationJobListProps) {
	return (
		<Box>
			<Typography>ApplicationJobs:</Typography>
			{selectedUserData?.role === "COMPANY"
				? jobsFromApplications.map((job) => (
					<ListItem key={job?.id}>
						<ToolTip
							title={(() => {
								//zkontorolovat později???????????!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!§
								const users = getUsersForJob(job?.id ?? "",applicationsArray,getUserById);
								return users.length > 0 ? (
									<Box>
										{users.map((user) => (
											<Box key={user?.id}>
												<Typography>Jméno: {user?.name ?? ""}</Typography>
												<Typography>Email: {user?.email ?? ""}</Typography>
											</Box>
										))}
									</Box>
								) : (
									"Žádný uchazeč"
								);
							})()}
							arrow
						>
							<Typography>{job?.title ?? ""}</Typography>
						</ToolTip>
					</ListItem>
				))
				: applicationJob.map((app) => (
					<ListItem key={app?.id}>
						<ToolTip
							title={
								app && (() => {
									//zkontrolovat pozdeji???????????????!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
									const company = getCopanyNameJobFormApplication(app.jobid,jobsArray, getUserById);
									if (company && typeof company === "object") {
										return (
											<Box>
												<Typography>Jméno: {company.name ?? ""}</Typography>
												<Typography>Email: {company.email ?? ""}</Typography>
											</Box>
										);
									}
									return "Žádná firma";
								})()
							}
							arrow
						>
							<Box>
								<Typography>
									{app?.JobTitle ?? ""} {/* název jobu */}
								</Typography>
							</Box>
						</ToolTip>
					</ListItem>
				))}
		</Box>
	)}