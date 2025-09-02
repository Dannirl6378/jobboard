import { Box, Typography } from "@mui/material";
import { Job } from "@/types/job";

interface Props {
	job?: Job | undefined;
};

export default function JobDetailCard({ job }: Props) {
	return (
		<>
			<Box
				sx={{
					display: "flex",
					flexWrap: "wrap",
					gap: 4,
					mb: 2,
				}}
			>
				<Box>
					<Typography sx={{ color: "#388e3c", fontWeight: 600, fontSize: 18 }}>
						Mzda:
					</Typography>
					<Typography sx={{ color: "#222", fontWeight: "bold", fontSize: 20 }}>
						{job?.salary ? `${job.salary} €` : "Neuvedeno"}
					</Typography>
				</Box>
				<Box>
					<Typography sx={{ color: "#388e3c", fontWeight: 600, fontSize: 18 }}>
						Lokalita:
					</Typography>
					<Typography sx={{ color: "#222", fontWeight: "bold", fontSize: 20 }}>
						{job?.location || "Neuvedeno"}
					</Typography>
				</Box>
				<Box>
					<Typography sx={{ color: "#388e3c", fontWeight: 600, fontSize: 18 }}>
						Kategorie:
					</Typography>
					<Typography sx={{ color: "#222", fontWeight: "bold", fontSize: 20 }}>
						{job?.category || "Neuvedeno"}
					</Typography>
				</Box>
				<Box>
					<Typography sx={{ color: "#388e3c", fontWeight: 600, fontSize: 18 }}>
						Typ úvazku:
					</Typography>
					<Typography sx={{ color: "#222", fontWeight: "bold", fontSize: 20 }}>
						{job?.Attendance || "Neuvedeno"}
					</Typography>
				</Box>
			</Box>
		</>
	);
}
