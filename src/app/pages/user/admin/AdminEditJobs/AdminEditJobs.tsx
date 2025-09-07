"use client";
import { Alert, Box, Button, Snackbar, TextField } from "@mui/material";
import { Job } from "@/types/job";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Heading, SubHeading, Text } from "@/styles/editTypoghraphy";
import { fetchUpdateJob } from "@/app/hook/api";
import { useAppStore } from "@/app/hook/useAppStore";
import QuillEditor from "@/components/textEditor/TextEditQuill";
import HeaderMainPage from "@/components/HeaderMainPage";

type AdminEditJobsProps = {
	setEditJobsOpen: Dispatch<SetStateAction<boolean>>;
};

export default function AdminEditJobs({ setEditJobsOpen }: AdminEditJobsProps) {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [salary, setSalary] = useState("");
	const [location, setLocation] = useState("");
	const [about, setAbout] = useState<string>("");
	const [isEnable, setIsEnable] = useState<boolean>(true); // Set default as needed
	const [purifyAbout, setPurifyAbout] = useState<string>(""); //tady se zamyslet jestli budu toto potřebovat
	const [openSnackbar, setOpenSnackbar] = useState(false);

	const selectedJobId = useAppStore((state) => state.selectedJobId);
	const jobs = useAppStore((state) => state.jobs);
	const job = selectedJobId ? Object.values(jobs).filter((job)=>job.id===selectedJobId)[0] : null;


	useEffect(() => {
		if (job) {
			setTitle(job.title || "");
			setDescription(job.description || "");
			setSalary(job.salary?.toString() || "");
			setLocation(job.location || "");
		}
	}, [job]);

	const handleUpdateJob = async (jobid: string, updateData: Partial<Job>) => {
		
		try {
			const updatedJob = await fetchUpdateJob(jobid, updateData);
			setOpenSnackbar(true);
			// Zde můžete přidat další logiku, např. aktualizaci stavu nebo přesměrování
		} catch (error) {
			console.error("Error updating job:", error);
			// Zde můžete přidat další logiku pro zpracování chyby
		}
	};
	const handleSaveChanges = () => {
		if (!selectedJobId) return;
		const updateData = {
			title,
			description,
			salary,
			location,
		};
		handleUpdateJob(selectedJobId, updateData);
		
	};

	// Add missing state variables for about, isEnable, and purifyAbout

	useEffect(() => {
		if (job) {
			setAbout(job.description || "");
			setPurifyAbout(job.description || "");
		}
	}, [job]);

	return (
		<>
			<HeaderMainPage />
			<Box
			component="form"
				noValidate
				autoComplete='off'
				style={{
					border: "2px solid #1976d2",
					boxShadow: "0px 4px 24px rgba(25, 118, 210, 0.10)",
					padding: "32px",
					background: "linear-gradient(135deg, #cee5fd 0%, #e3fcec 100%)",
					opacity: 0.98,
					borderRadius: "18px",
					overflowY: "auto",
					display: "flex",
					flexDirection: "column",
					gap: "20px",
					fontFamily: "Montserrat, Arial, sans-serif",
				}}
				sx={{
					width: { xs: "1500%", sm: "80%", md: "100%" },
					maxWidth: "100%",
					marginRight: { xs: "10%", md: "25%" },
					height: "90vh",
					maxHeight: { xs: "75%", md: "100%" },
					marginTop: { xs: "-25%", md: "5%" },
					justifyContent: { xs: "flex-start", md: "center" },
				}}
			>
				<Heading
					sx={{
						color: "#1976d2",
						fontFamily: "Montserrat, Arial, sans-serif",
						fontWeight: "bold",
						textAlign: "center",
						mb: 2,
						mt: {sx:"-5%",mb:"35%"},
					}}
				>
					Upravit pracovní nabídku
				</Heading>
				<Box>
					<SubHeading sx={{ color: "#388e3c" }}>Název pozice:</SubHeading>
					<TextField
						id='title'
						variant='outlined'
						value={title}
						fullWidth
						onChange={(e) => setTitle(e.target.value)}
						sx={{ bgcolor: "white", borderRadius: 1 }}
					/>
				</Box>
				<Box>
					<SubHeading sx={{ color: "#388e3c" }}>Mzda:</SubHeading>
					<TextField
						id='salary'
						variant='outlined'
						value={salary}
						fullWidth
						onChange={(e) => setSalary(e.target.value)}
						sx={{ bgcolor: "white", borderRadius: 1 }}
					/>
				</Box>
				<Box>
					<SubHeading sx={{ color: "#388e3c" }}>Lokalita:</SubHeading>
					<TextField
						id='location'
						variant='outlined'
						value={location}
						fullWidth
						onChange={(e) => setLocation(e.target.value)}
						sx={{ bgcolor: "white", borderRadius: 1 }}
					/>
				</Box>
				<Box>
					<SubHeading sx={{ color: "#388e3c" }}>Popis pozice:</SubHeading>
					<QuillEditor value={about} onChange={setAbout} edit={isEnable} />
				</Box>
				<Box sx={{ display: "flex", gap: 2, justifyContent: "center", mt: 2 }}>
					<Button
						variant='contained'
						onClick={() => {
							handleSaveChanges();
						}}
						sx={{
							bgcolor: "#1976d2",
							color: "#fff",
							fontWeight: "bold",
							fontFamily: "Montserrat, Arial, sans-serif",
							"&:hover": { bgcolor: "#1565c0" },
						}}
					>
						Uložit změny
					</Button>
					<Snackbar
				open={openSnackbar}
				autoHideDuration={3000}
				onClose={() => setOpenSnackbar(false)}
				anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
			>
				<Alert
					onClose={() => setOpenSnackbar(false)}
					severity='success'
					sx={{ width: "100%" }}
				>
					Data byla úspěšně uložena.
				</Alert>
			</Snackbar>
					<Button
						variant='contained'
						onClick={() => setEditJobsOpen(false)}
						sx={{
							bgcolor: "#43a047",
							color: "#fff",
							fontWeight: "bold",
							fontFamily: "Montserrat, Arial, sans-serif",
							"&:hover": { bgcolor: "#2e7031" },
						}}
					>
						Zavřít
					</Button>
				</Box>
			</Box>
		</>
	);
}
