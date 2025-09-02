import { Box, Typography } from "@mui/material"
import { useRouter } from "next/navigation";

type Props={
appliedJobs: {application: {id: string , jobid:string}, job?: {id?: string, title?: string} | null}[];
}

export default function UserProfileApp({appliedJobs}: Props) {
    const router = useRouter();
    return(
        <>
							<Typography sx={{ color: "#388e3c", fontWeight: 600, mt: 2 }}>
								Moje přihlášky
							</Typography>
							<Box
								sx={{
									width: "100%",
									minHeight: 60,
									maxHeight: 180,
									overflow: "auto",
									border: "1px solid #cee5fd",
									borderRadius: 2,
									bgcolor: "#f5f7fa",
									p: 2,
									mb: 2,
									display: "flex",
									flexWrap: "wrap",
									gap: 2,
								}}
							>
								{appliedJobs.map(({ application, job }) => (
									<Box sx={{ minWidth: 120 }} key={application.id}>
										<Typography
											sx={{
												cursor: "pointer",
												color: "#1976d2",
												fontWeight: "bold",
												"&:hover": { textDecoration: "underline" },
											}}
											onClick={() =>
												router.push(
													`/pages/job/jobDetail${job?.id ? `/${job.id}` : ""}`
												)
											}
										>
											{job?.title || "Neznámá pozice"}
										</Typography>
									</Box>
								))}
							</Box>
						</>
    )
}