"use client";
import { useAppStore } from "@/app/hook/useAppStore";
import { Heading, SubHeading, Text } from "@/styles/editTypoghraphy";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import HeaderMainPage from "@/components/HeaderMainPage";
import { useRouter } from "next/navigation";
import QuillEditor from "@/components/textEditor/TextEditQuill";
import MenuItem from "@mui/material/MenuItem";
import { JobAtending, Jobtype } from "../../../job/menuSelect";
import { fetchCreateJob } from "@/app/hook/api";

interface AdminCreateJobProps {
	email: string;
	setCreateJob: (value: boolean) => void;
}

const AdminCreateJob = ({ email, setCreateJob }: AdminCreateJobProps) => {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [location, setLocation] = useState("");
	const [salary, setSalary] = useState("");
	const [category, setCategory] = useState("");
	const [companyid, setCompanyid] = useState("");
	const [error, setError] = useState("");
	const [success, setSuccess] = useState(false);
	const [attending, setAttending] = useState("");

	const usersArray = Object.values(useAppStore((state) => state.users));
	const foundUser = usersArray.find((user) => user.email === email);
	const router = useRouter();

	useEffect(() => {
		if (foundUser) {
			setCompanyid(foundUser.id);
		} else {
			setError("nic sem nenašel");
		}
	}, [foundUser]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (
			!title ||
			!description ||
			!location ||
			!salary ||
			!category ||
			!companyid ||
			!attending
		) {
			setError("Všehcny pole jsou povinná");
			return;
		}

		setError("");
		setSuccess(false);
		//nezpomen pracovat s companID!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!§
		try {
			const data = await fetchCreateJob({
				title,
				description,
				location,
				salary,
				category,
				companyid,
				Attendance: attending,
			});
			setSuccess(true);
		} catch (error) {
			console.error("Error creating job:", error);
			setError("Failed to create job");
		}
	};

	return (
		<>
			<HeaderMainPage />
			<Box
				component='form'
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
					marginTop: { xs: "25%", md: "5%" },
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
						mt: { xs: "-5%", md: "20%" },
					}}
				>
					Nová nabídka práce
				</Heading>
				<Box>
					<SubHeading sx={{ color: "#388e3c" }}>Název Pozice:</SubHeading>
					<TextField
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						required
						fullWidth
						sx={{ bgcolor: "white", borderRadius: 1 }}
					/>
				</Box>
				<Box
					sx={{
						display: "flex",
						flexDirection: { xs: "column", sm: "row" },
						flexWrap: "wrap",
						gap: 2,
					}}
				>
					<Box sx={{ flex: 1 }}>
						<Text sx={{ color: "#1976d2" }}>Místo Práce:</Text>
						<TextField
							type='text'
							value={location}
							onChange={(e) => setLocation(e.target.value)}
							required
							fullWidth
							sx={{ bgcolor: "white", borderRadius: 1 }}
						/>
					</Box>
					<Box sx={{ flex: 1 }}>
						<Text sx={{ color: "#1976d2" }}>Plat:</Text>
						<TextField
							type='number'
							value={salary}
							onChange={(e) => setSalary(e.target.value)}
							required
							fullWidth
							sx={{ bgcolor: "white", borderRadius: 1 }}
						/>
					</Box>
				</Box>
				<Box
					sx={{
						display: "flex",
						flexDirection: { xs: "column", sm: "row" },
						flexWrap: "wrap",
						gap: 2,
					}}
				>
					<Box sx={{ flex: 1 }}>
						<Text sx={{ color: "#1976d2" }}>Kategorie:</Text>
						<TextField
							id='select-Type-Job'
							select
							type='list'
							value={category}
							onChange={(e) => setCategory(e.target.value)}
							required
							fullWidth
							sx={{ bgcolor: "white", borderRadius: 1 }}
						>
							{Jobtype.map((option) => (
								<MenuItem key={option.value} value={option.value}>
									{option.label}
								</MenuItem>
							))}
						</TextField>
					</Box>
					<Box sx={{ flex: 1 }}>
						<Text sx={{ color: "#1976d2" }}>Úvazek:</Text>
						<TextField
							id='select-Attend-Job'
							select
							type='list'
							value={attending}
							onChange={(e) => setAttending(e.target.value)}
							required
							fullWidth
							sx={{ bgcolor: "white", borderRadius: 1 }}
						>
							{JobAtending.map((option) => (
								<MenuItem key={option.value} value={option.value}>
									{option.label}
								</MenuItem>
							))}
						</TextField>
					</Box>
				</Box>
				<Box>
					<Text sx={{ color: "#1976d2" }}>Popis Pozice:</Text>
					<QuillEditor
						value={description}
						onChange={setDescription}
						edit={true}
					/>
				</Box>
				{error && (
					<Typography sx={{ color: "#d32f2f", fontWeight: "bold" }}>
						{error}
					</Typography>
				)}
				{success && (
					<Typography sx={{ color: "#43a047", fontWeight: "bold" }}>
						Prácovní nabídka byla úspěšně přidána!
					</Typography>
				)}
				<Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
					<Button
						variant='contained'
						type='button'
						onClick={handleSubmit}
						sx={{
							bgcolor: "#1976d2",
							color: "#fff",
							fontWeight: "bold",
							fontFamily: "Montserrat, Arial, sans-serif",
							"&:hover": { bgcolor: "#1565c0" },
						}}
					>
						Přidat nabídku
					</Button>
					<Button
						variant='contained'
						onClick={() => setCreateJob(false)}
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
};
export default AdminCreateJob;
