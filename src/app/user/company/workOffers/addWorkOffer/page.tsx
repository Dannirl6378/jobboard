"use client";
import { useAppStore } from "@/store/useAppStore";
import { Heading, SubHeading, Text } from "@/styles/editTypoghraphy";
import { Box, Button, TextField, Typography } from "@mui/material";
import { LogInFirm } from "@/app/login/LogInUser";
import { useEffect, useState } from "react";
import HeaderMainPage from "@/components/HeaderMainPage";
import { useRouter } from "next/navigation";
import QuillEditor from "@/components/textEditor/textEditQuill";
import MenuItem from "@mui/material/MenuItem";
import { JobAtending, Jobtype } from "../../../../job/menuSelect";
import { fetchCreateJob } from "@/lib/api";

export default function AddWorkOffer() {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [location, setLocation] = useState("");
	const [salary, setSalary] = useState("");
	const [category, setCategory] = useState("");
	const [companyid, setCompanyid] = useState("");
	const [error, setError] = useState("");
	const [success, setSuccess] = useState(false);
	const [attending, setAttending] = useState("");

	const LogInFirm = useAppStore((state) => state.LogIn);
	const usersArray = Object.values(useAppStore((state) => state.users));
	const foundUser = usersArray.find((user) =>
		typeof LogInFirm === "string"
			? user.id === LogInFirm
			: user.id === LogInFirm?.id
	);
	const router = useRouter();

	useEffect(() => {
		if (foundUser) {
			setCompanyid(foundUser.id);
			setError("");
		} else {
			setError("nic sem nenašel");
		}
	}, [foundUser]);
	console.log("companyid", companyid);
	console.log("foundUser", foundUser);

	const validateForm = () => {
		if (
			!title.trim() ||
			!description.trim() ||
			!location.trim() ||
			!salary.trim() ||
			!category.trim() ||
			!companyid.trim() ||
			!attending.trim()
		) {
			setError("Všechna pole musí být vyplněna.");
			return false;
		}
		return true;
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!validateForm()) return;

		//nezpomen pracovat s companID!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!§
		try {
			setError("");
			const data = await fetchCreateJob({
				title,
				description,
				location,
				salary,
				category,
				companyid,
				Attendance: attending,
			});
			console.log("Job created:", data);
			setSuccess(true);
		} catch (error) {
			console.error("Error creating job:", error);
			setError("Failed to create job");
		}
	};
	const handleBack = () => {
		router.back(); // Použití useNavigate pro přesměrování
	};

	return (
		<>
			<HeaderMainPage />
			<Box
				sx={{
					minHeight: "100vh",
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
					onSubmit={handleSubmit}
					sx={{
						border: "2px solid #1976d2",
						boxShadow: 6,
						padding: { xs: 2, sm: 4 },
						background: "white",
						borderRadius: 3,
						maxHeight: "95vh",
						overflowY: "auto",
						width: { xs: "98vw", sm: 500 },
						maxWidth: 600,
						mx: "auto",
						mt: 4,
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
							mt: 5,
							mb: 2,
						}}
					>
						Nová nabídka práce
					</Heading>
					<Box>
						<SubHeading sx={{ color: "#388e3c" }}>Název pozice:</SubHeading>
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
							<Text sx={{ color: "#1976d2" }}>Lokalita:</Text>
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
							<Text sx={{ color: "#1976d2" }}>Mzda:</Text>
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
						<Text sx={{ color: "#1976d2" }}>Popis pozice:</Text>
						<QuillEditor
							value={description}
							onChange={setDescription}
							edit={true}
						/>
					</Box>
					<Box>
						{(error || success) && (
							<Box>
								<Typography
									sx={{
										color: error ? "#d32f2f" : "#43a047",
										fontWeight: "bold",
									}}
								>
									{error || "Práce byla vytvořena úspěšně!"}
								</Typography>
							</Box>
						)}
					</Box>
					<Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
						<Button
							variant='contained'
							type='submit'
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
					</Box>
				</Box>
			</Box>
		</>
	);
}
