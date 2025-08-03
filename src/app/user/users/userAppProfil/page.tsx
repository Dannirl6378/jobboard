"use client";
import { Box, Button, Input, Typography } from "@mui/material";
import { usePathname } from "next/navigation";
import HeaderMainPage from "@/components/HeaderMainPage";
import { Heading, Text } from "@/styles/editTypoghraphy";
import { useEffect, useRef, useState } from "react";
import { useAppStore } from "@/store/useAppStore";
import { User } from "@/types/user";
import { fetchUpdateUser } from "@/lib/api";
import QuillEditor from "@/components/textEditor/textEditQuill";
import { sanitizeHtml } from "@/lib/sanitizeHTML";
import { getUserJob } from "@/app/user/users/userJob/userJob";
import { useRouter } from "next/navigation";

export default function UserProfil() {
	const router = useRouter();
	const [isEnable, setIsEnable] = useState<boolean>(false);
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [phone, setPhone] = useState("");
	const [rePassword, setRePassword] = useState("");
	const [about, setAbout] = useState("");
	const [purifyAbout, setPurifyAbout] = useState(about);
	const [purifyCoverLetter, setPurifyCoverLetter] = useState<string>("");

	const [appliedJobs, setAppliedJobs] = useState<
		{ application: { id: string }; job?: { title?: string; jobId?: string } }[]
	>([]);

	const pathname = usePathname();
	const prevPath = useRef(pathname);

	//const { id: userid } = use(params);
	const usersArray = Object.values(useAppStore((state) => state.users));
	const LogIn = useAppStore((state) => state.LogIn);
	const jobs = useAppStore((state) => state.jobs);
	console.log("LogIn", LogIn);
	console.log("LogIn", LogIn?.role);
	console.log("Jobs", jobs);

	const applications = useAppStore((state) => state.applications);
	const setSelectedUserId = useAppStore((state) => state.setSelectedUserId);
	const selectedUserId = useAppStore((state) => state.selectedUserId);
	const users = useAppStore((state) => state.users);
	const userVsFirm = selectedUserId ? users[selectedUserId] : null;
	const hasMounted = useRef(false);

	const profileUser = userVsFirm === null ? LogIn : userVsFirm;
	console.log("profileUser", profileUser?.role);

	useEffect(() => {
		prevPath.current = pathname;
	}, [pathname]);

	useEffect(() => {
		if (!hasMounted.current) {
			hasMounted.current = true;
			console.log("hasMounted", hasMounted.current);
			return;
		}
		return () => {
			setSelectedUserId(null);
		};
	}, []);

	useEffect(() => {
		sanitizeHtml(about).then(setPurifyAbout);
		sanitizeHtml(purifyCoverLetter).then(setPurifyCoverLetter);
	}, [about, purifyCoverLetter]);

	useEffect(() => {
		if (profileUser) {
			setName(profileUser.name || "");
			setEmail(profileUser.email || "");
			setPassword(profileUser.passwordHash || "");
			setAbout(profileUser.about || "");
			setPhone(profileUser.Phone || "");
			setPurifyCoverLetter(profileUser?.CoverLetter || "");
		}
	}, [profileUser]);

	useEffect(() => {
		if (
			!LogIn?.id ||
			Object.keys(jobs).length === 0 ||
			Object.keys(applications).length === 0
		) {
			return; // čekej, dokud nebude vše připravené
		}

		const userApplications = Object.values(applications).filter(
			(app) => app.userid === LogIn.id
		);
		console.log("userApplications", userApplications);
		const applied = userApplications
			.map((app) => ({
				application: app,
				job: jobs[app.jobid],
			}))
			.filter((item) => item.job !== undefined);
		console.log("appliedJobs", applied);
		setAppliedJobs(applied);
	}, [LogIn?.id, jobs, applications]);

	//const jobIds = appliedJobs.map(({ job }) => job?.jobId);
	console.log(
		"jobsIds",
		appliedJobs.map(({ job }) => job?.jobId)
	);
	console.log(
		"appliedJobsMap",
		appliedJobs.map((job) => job.job?.jobId)
	);

	const handleEdit = () => {
		setIsEnable((prev) => !prev);
	};

	const handleUpdateUser = async (
		userid: string,
		updateData: Partial<User>
	) => {
		try {
			const updatedUser = await fetchUpdateUser(userid, updateData);
			console.log("Updated job:", updatedUser);
			// Zde můžete přidat další logiku, např. aktualizaci stavu nebo přesměrování
		} catch (error) {
			console.error("Error updating job:", error);
			// Zde můžete přidat další logiku pro zpracování chyby
		}
	};

	const handleSaveChanges = () => {
		const updateData = {
			name,
			email,
			password,
			about: about,
			Phone: phone,
		};
		if (LogIn?.id) {
			handleUpdateUser(LogIn.id, updateData);
			setIsEnable(false);
		} else {
			console.error("User ID is undefined. Cannot update user.");
		}
	};

	return (
		<>
			<HeaderMainPage />
			<Box
				sx={{
					bgcolor: "linear-gradient(135deg, #cee5fd 0%, #e3fcec 100%)",
					minHeight: "100vh",
					display: "flex",
					justifyContent: "center",
					alignItems: "flex-start",
					overflow: "auto",
					py: 4,
				}}
			>
				<Box
					sx={{
						bgcolor: "white",
						borderRadius: 3,
						boxShadow: 6,
						width: { xs: "98vw", sm: 600 },
						maxWidth: 700,
						mx: "auto",
						p: { xs: 2, sm: 4 },
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						gap: 2,
						fontFamily: "Montserrat, Arial, sans-serif",
					}}
				>
					<Box sx={{ width: "100%", textAlign: "center", mb: 2 }}>
						<Heading
							sx={{ color: "#1976d2", fontWeight: "bold", letterSpacing: 1 }}
						>
							Profil uživatele
						</Heading>
					</Box>
					<Box sx={{ width: "100%" }}>
						<Text sx={{ color: "#1976d2", fontWeight: 600 }}>Email:</Text>
						<Input
							id='email'
							value={email}
							disabled={!isEnable}
							onChange={(e) => setEmail(e.target.value)}
							fullWidth
							sx={{
								bgcolor: "#f5f7fa",
								borderRadius: 2,
								mb: 1,
								fontFamily: "Montserrat, Arial, sans-serif",
								color: "#222",
								fontWeight: 500,
							}}
						/>
					</Box>
					<Box sx={{ width: "100%" }}>
						<Text sx={{ color: "#1976d2", fontWeight: 600 }}>
							Uživatelské jméno:
						</Text>
						<Input
							id='userName'
							value={name}
							disabled={!isEnable}
							onChange={(e) => setName(e.target.value)}
							fullWidth
							sx={{
								bgcolor: "#f5f7fa",
								borderRadius: 2,
								mb: 1,
								fontFamily: "Montserrat, Arial, sans-serif",
								color: "#222",
								fontWeight: 500,
							}}
						/>
					</Box>
					<Box sx={{ width: "100%" }}>
						<Text sx={{ color: "#1976d2", fontWeight: 600 }}>Telefon:</Text>
						<Input
							id='Telefon'
							value={phone}
							disabled={!isEnable}
							onChange={(e) => setPhone(e.target.value)}
							fullWidth
							sx={{
								bgcolor: "#f5f7fa",
								borderRadius: 2,
								mb: 1,
								fontFamily: "Montserrat, Arial, sans-serif",
								color: "#222",
								fontWeight: 500,
							}}
						/>
					</Box>
					{isEnable && (
						<>
							<Box sx={{ width: "100%" }}>
								<Text sx={{ color: "#1976d2", fontWeight: 600 }}>Heslo:</Text>
								<Input
									id='password'
									type='password'
									value={password}
									disabled={!isEnable}
									onChange={(e) => setPassword(e.target.value)}
									fullWidth
									sx={{
										bgcolor: "#f5f7fa",
										borderRadius: 2,
										mb: 1,
										fontFamily: "Montserrat, Arial, sans-serif",
										color: "#222",
										fontWeight: 500,
									}}
								/>
							</Box>
							<Box sx={{ width: "100%" }}>
								<Text sx={{ color: "#1976d2", fontWeight: 600 }}>
									Opakovat heslo:
								</Text>
								<Input
									id='rePassword'
									type='password'
									value={isEnable ? rePassword : ""}
									disabled={!isEnable}
									onChange={(e) => setRePassword(e.target.value)}
									fullWidth
									sx={{
										bgcolor: "#f5f7fa",
										borderRadius: 2,
										mb: 1,
										fontFamily: "Montserrat, Arial, sans-serif",
										color: "#222",
										fontWeight: 500,
									}}
								/>
							</Box>
						</>
					)}
					{userVsFirm && purifyCoverLetter !== null && (
						<>
							<Text sx={{ color: "#388e3c" }}>Cover Letter</Text>
							<Box
								sx={{
									width: "100%",
									minHeight: 120,
									maxHeight: 250,
									overflow: "auto",
									border: "1px solid #cee5fd",
									borderRadius: 2,
									bgcolor: "#e3fcec",
									color: "#222",
									p: 2,
									mb: 2,
								}}
							>
								<div
									className='rich-content'
									dangerouslySetInnerHTML={{ __html: purifyCoverLetter }}
								/>
							</Box>
						</>
					)}
					{isEnable && profileUser ? (
						<Box>
							<Typography
								color='#1976d2'
								variant='h5'
								sx={{ mt: 2, fontWeight: "bold", width: "100%" }}
							>
								O mě
							</Typography>
							<QuillEditor value={about} onChange={setAbout} edit={isEnable} />
						</Box>
					) : profileUser?.role !== "TEMPORAL" ? (
						<>
							<Typography
								color='#1976d2'
								variant='h5'
								sx={{ mt: 2, fontWeight: "bold", width: "100%" }}
							>
								O mě
							</Typography>
							<Box
								sx={{
									width: "100%",
									minHeight: 120,
									maxHeight: 250,
									overflow: "auto",
									border: "1px solid #cee5fd",
									borderRadius: 2,
									bgcolor: "#e3fcec",
									color: "#222",
									p: 2,
									mb: 2,
								}}
							>
								<div
									className='rich-content'
									dangerouslySetInnerHTML={{ __html: purifyAbout }}
								/>
							</Box>
						</>
					) : null}
					{LogIn?.role === "COMPANY" ? null : (
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
													`/job/jobDetail${job?.jobId ? `/${job.jobId}` : ""}`
												)
											}
										>
											{job?.title || "Neznámá pozice"}
										</Typography>
									</Box>
								))}
							</Box>
						</>
					)}
					{userVsFirm === null && (
						<Box
							sx={{
								mt: 2,
								display: "flex",
								gap: 2,
								width: "100%",
								justifyContent: "center",
							}}
						>
							<Button
								variant='outlined'
								onClick={handleEdit}
								sx={{
									fontWeight: "bold",
									color: "#1976d2",
									borderColor: "#1976d2",
									"&:hover": { bgcolor: "#e3fcec", borderColor: "#1976d2" },
								}}
							>
								{!isEnable ? "Upravit" : "Konec "}
							</Button>
							<Button
								variant='contained'
								onClick={handleSaveChanges}
								sx={{
									bgcolor: "#43a047",
									color: "#fff",
									fontWeight: "bold",
									fontFamily: "Montserrat, Arial, sans-serif",
									"&:hover": { bgcolor: "#2e7031" },
								}}
							>
								Ulož
							</Button>
							{LogIn?.role === "COMPANY" ? null : (
								<Text sx={{ color: "#1976d2", alignSelf: "center" }}>
									Přilož CV
								</Text>
							)}
						</Box>
					)}
				</Box>
			</Box>
		</>
	);
}
