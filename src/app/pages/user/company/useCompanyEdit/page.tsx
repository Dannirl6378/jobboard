import { Badge, Box, Button, Typography } from "@mui/material";

type Props = {
	handleEditWorkOffer: (jobId: string) => void;
	handleDelete: (jobId: string) => void;
	applicants: any[];
	isOpen: boolean;
	job: { id: string };
	setOpenApplicantsJobId: (jobId: string | null) => void;
};

export default function UserCopmanyEdit({
	handleEditWorkOffer,
	handleDelete,
	applicants,
	isOpen,
	job,
	setOpenApplicantsJobId,
}: Props) {
	return (
		<>
			<Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
				<Button
					variant='outlined'
					sx={{
						borderColor: "#1976d2",
						color: "#1976d2",
						fontWeight: "bold",
						fontFamily: "Montserrat, Arial, sans-serif",
						"&:hover": {
							bgcolor: "#1976d2",
							color: "#fff",
							borderColor: "#1976d2",
						},
					}}
					onClick={() => handleEditWorkOffer(job.id)}
				>
					Upravit
				</Button>
				<Button
					variant='outlined'
					sx={{
						borderColor: "#d32f2f",
						color: "#d32f2f",
						fontWeight: "bold",
						fontFamily: "Montserrat, Arial, sans-serif",
						"&:hover": {
							bgcolor: "#d32f2f",
							color: "#fff",
							borderColor: "#d32f2f",
						},
					}}
					onClick={() => handleDelete(job.id)}
				>
					Smazat
				</Button>
				<Button
					variant='contained'
					sx={{
						bgcolor: "#43a047",
						color: "#fff",
						fontWeight: "bold",
						fontFamily: "Montserrat, Arial, sans-serif",
						"&:hover": { bgcolor: "#2e7031" },
					}}
					onClick={() => {
						setOpenApplicantsJobId(isOpen ? null : job.id);
					}}
				>
					<Badge
						anchorOrigin={{
							vertical: "bottom",
							horizontal: "right",
						}}
						badgeContent={applicants.length}
						color='secondary'
					>
						{isOpen ? "Zavřít" : "Uchazeči"}
					</Badge>
				</Button>
			</Box>
		</>
	);
}
