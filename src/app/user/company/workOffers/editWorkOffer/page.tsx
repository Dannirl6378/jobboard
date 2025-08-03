"use client";
import { Box, Button, Input, TextField, Typography } from "@mui/material";
import selectJob from "../selectJob*/selectJob";
import { Job } from "@/types/job";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Heading, SubHeading, Text } from "@/styles/editTypoghraphy";
import { fetchUpdateJob } from "@/lib/api";
import { useAppStore } from "@/store/useAppStore";
import HeaderMainPage from "@/components/HeaderMainPage";
import { fetchDeleteJob } from "@/lib/api";
import QuillEditor from "@/components/textEditor/textEditQuill";

export default function EditWorkOffer() {
	const router = useRouter();
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [salary, setSalary] = useState("");
	const [location, setLocation] = useState("");
	const [about, setAbout] = useState<string>("");
	const [isEnable, setIsEnable] = useState<boolean>(true); // Set default as needed
	const [purifyAbout, setPurifyAbout] = useState<string>(""); //tady se zamyslet jestli budu toto potřebovat
	const [successMessage, setSuccessMessage] = useState<string | null>(null);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);

	const selectedJobId = useAppStore((state) => state.selectedJobId);
	const jobs = useAppStore((state) => state.jobs);
	const job = selectedJobId
		? Object.values(jobs).find((j) => j.id === selectedJobId)
		: null;

	useEffect(() => {
		if (job) {
			setTitle(job.title || "");
			setDescription(job.description || "");
			setSalary(job.salary?.toString() || "");
			setLocation(job.location || "");
		}
	}, [job]);

	const handleBack = () => {
		router.push("/user"); // Použití useNavigate pro přesměrování
	};

	const handleUpdateJob = async (jobid: string, updateData: Partial<Job>) => {
		setSuccessMessage(null);
		setErrorMessage(null);
		try {
			const updatedJob = await fetchUpdateJob(jobid, updateData);
			console.log("Updated job:", updatedJob);
			setSuccessMessage("Změny byly úspěšně uloženy do databáze.");
			// Zde můžete přidat další logiku, např. aktualizaci stavu nebo přesměrování
		} catch (error) {
			console.error("Error updating job:", error);
			setErrorMessage("Nepodařilo se uložit změny.");
			// Zde můžete přidat další logiku pro zpracování chyby
		}
	};
	const handleSaveChanges = () => {
		if (!selectedJobId) return;
		const updateData = {
			title,
			description: about,
			salary,
			location,
		};
		handleUpdateJob(selectedJobId, updateData);
	};

	const handleDelete = async () => {
		if (!selectedJobId) return;
		try {
			await fetchDeleteJob(selectedJobId);
		} catch (error) {
			console.error("nelze smazat", error);
		}
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
				sx={{
					minHeight: "70vh",
					bgcolor: "linear-gradient(135deg, #cee5fd 0%, #e3fcec 100%)",
					display: "flex",
					justifyContent: "center",
					alignItems: "flex-start",
					py: 4,
				}}
			>
				<Box
					component='form'
					noValidate
					autoComplete='off'
					sx={{
						border: "2px solid #1976d2",
						boxShadow: 6,
						padding: { xs: 2, sm: 4 },
						background: "white",
						borderRadius: 3,
						maxHeight: "80vh",
						overflowY: "auto",
						width: { xs: "98vw", sm: 500 },
						maxWidth: 600,
						mt: "5%",
						display: "flex",
						flexDirection: "column",
						gap: 3,
						justifyContent: "center",
						fontFamily: "Montserrat, Arial, sans-serif",
					}}
				>
					<Heading
						sx={{
							color: "#1976d2",
							fontFamily: "Montserrat, Arial, sans-serif",
							fontWeight: "bold",
							textAlign: "center",
							mb: 2,
							mt:30,
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
						{successMessage && (
							<Typography
								sx={{
									color: "#388e3c",
									textAlign: "center",
									mt: 2,
									fontWeight: "bold",
								}}
							>
								{successMessage}
							</Typography>
						)}

						{errorMessage && (
							<Typography
								sx={{
									color: "#d32f2f",
									textAlign: "center",
									mt: 2,
									fontWeight: "bold",
								}}
							>
								{errorMessage}
							</Typography>
						)}
					</Box>
					<Box
						sx={{ display: "flex", gap: 2, justifyContent: "center", mt: 2 }}
					>
						<Button
							variant='contained'
							onClick={handleSaveChanges}
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
						<Button
							variant='contained'
							onClick={handleBack}
							sx={{
								bgcolor: "#43a047",
								color: "#fff",
								fontWeight: "bold",
								fontFamily: "Montserrat, Arial, sans-serif",
								"&:hover": { bgcolor: "#2e7031" },
							}}
						>
							Zpět
						</Button>
						<Button
							variant='contained'
							onClick={handleDelete}
							sx={{
								bgcolor: "#d32f2f",
								color: "#fff",
								fontWeight: "bold",
								fontFamily: "Montserrat, Arial, sans-serif",
								"&:hover": { bgcolor: "#b71c1c" },
							}}
						>
							Smazat nabídku
						</Button>
					</Box>
				</Box>
			</Box>
		</>
	);
}
