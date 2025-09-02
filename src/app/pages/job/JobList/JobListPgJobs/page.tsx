import { Job } from "@/types/job";
import { Box, ListItem, Typography } from "@mui/material";

type Props = {
	paginatedJobs: Job[];
	sanitizedDescriptions: { [key: string]: string };
	handleJobClick: (id: string) => void;
};

export default function JobListPgJobs({
	paginatedJobs,
	sanitizedDescriptions,
	handleJobClick,
}: Props) {
	return (
		<>
			{paginatedJobs.map((job: Job) => (
				<ListItem
					key={job.id}
					onClick={() => handleJobClick(job.id)}
					sx={{
						width: "100%",
						bgcolor: "#f5f7fa",
						borderRadius: 3,
						boxShadow: 4,
						p: { xs: 2, md: 3 },
						mb: 3,
						display: "flex",
						flexDirection: { xs: "column", sm: "row" },
						alignItems: { xs: "flex-start", sm: "center" },
						justifyContent: "space-between",
						gap: 2,
						cursor: "pointer",
						transition: "all 0.2s cubic-bezier(.4,0,.2,1)",
						border: "1.5px solid #cee5fd",
						"&:hover": {
							bgcolor: "#e3fcec",
							color: "#1976d2",
							boxShadow: 8,
							transform: "scale(1.01)",
							borderColor: "#43a047",
						},
						fontFamily: "Montserrat, Arial, sans-serif",
					}}
				>
					<Box sx={{ flex: 2, minWidth: 0 }}>
						<Typography
							variant='h6'
							sx={{
								color: "#1976d2",
								fontWeight: "bold",
								fontSize: "1.3rem",
								mb: 0.5,
								letterSpacing: 0.5,
								overflow: "hidden",
								textOverflow: "ellipsis",
								whiteSpace: "nowrap",
							}}
						>
							{job.title}
						</Typography>
						<Typography
							variant='body2'
							sx={{
								color: "#222",
								opacity: 0.95,
								fontSize: "1rem",
								mb: 1,
								overflow: "hidden",
								textOverflow: "ellipsis",
								whiteSpace: "nowrap",
							}}
							component='div'
							dangerouslySetInnerHTML={{
								__html: sanitizedDescriptions[job.id] || "",
							}}
						/>
						<Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
							<Typography
								variant='body2'
								sx={{ color: "#388e3c", fontWeight: 600 }}
							>
								{job.salary ? `${job.salary} €/měsíc` : "Mzda neuvedena"}
							</Typography>
							<Typography
								variant='body2'
								sx={{ color: "#1976d2", fontWeight: 600 }}
							>
								{job.location}
							</Typography>
							<Typography
								variant='body2'
								sx={{ color: "#43a047", fontWeight: 600 }}
							>
								{job.category}
							</Typography>
						</Box>
					</Box>
					<Box
						sx={{
							flex: 1,
							minWidth: 120,
							textAlign: { xs: "left", sm: "right" },
						}}
					>
						<Typography
							variant='body2'
							sx={{
								color: "#888",
								fontSize: "0.95rem",
								fontWeight: 500,
							}}
						>
							{new Date(job.createdat).toLocaleDateString()}
						</Typography>
					</Box>
				</ListItem>
			))}
		</>
	);
}
