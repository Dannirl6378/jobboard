"use client";
import { Box, Button, Input, Typography } from "@mui/material";
import { usePathname } from "next/navigation";
import HeaderMainPage from "@/components/HeaderMainPage";
import { Heading, Text } from "@/styles/editTypoghraphy";
import { useEffect, useRef, useState } from "react";
import { useAppStore } from "@/store/useAppStore";
import { User } from "@/types/user";
import updateUser from "../updateUser/updateUser";
import QuillEditor from "@/components/textEditor/textEditQuill";
import { sanitizeHtml } from "@/lib/sanitizeHTML";
import { getUserJob } from "@/app/application/userJob";
import { useRouter } from "next/navigation";

export default function UserProfil(/*{
	params,
}: {
	params: Promise<{ id: string }>;
}*/) {
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
	const [appliedJobs, setAppliedJobs] = useState<{ application: { id: string }, job?: { title?: string,jobId?:string } }[]>([]);

	const pathname = usePathname();
	const prevPath = useRef(pathname);

	//const { id: userid } = use(params);
	const usersArray = Object.values(useAppStore((state) => state.users));
	const LogIn = useAppStore((state) => state.LogIn);
	console.log("LogIn", LogIn);
	console.log("LogIn", LogIn?.name);

	const setSelectedUserId = useAppStore((state) => state.setSelectedUserId);
	const selectedUserId = useAppStore((state) => state.selectedUserId);
	const users = useAppStore((state) => state.users);
	const userVsFirm = selectedUserId ? users[selectedUserId] : null;
	const hasMounted = useRef(false);

	const profileUser = userVsFirm === null ? LogIn : userVsFirm;

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
		getUserJob().then(setAppliedJobs);
	}, []);
	const jobIds = appliedJobs.map(({ job }) => job?.jobId);
	console.log("appliedJobsMap", appliedJobs.map((job) => job.job?.jobId));

	const handleEdit = () => {
		setIsEnable((prev) => !prev);
	};

	const handleUpdateUser = async (
		userid: string,
		updateData: Partial<User>
	) => {
		try {
			const updatedUser = await updateUser(userid, updateData);
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
			about,
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
					bgcolor: "white",
					display: "flex",
					alignContent: "center",
					flexDirection: "column",
					alignItems: "center",
					mt: "3%",
				}}
			>
				<Box sx={{ paddingTop: "4%" }}>
					<Heading>Profil uživatele</Heading>
				</Box>
				<Box>
					<Text>Email:</Text>
					<Input
						id='email'
						value={email}
						disabled={!isEnable}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</Box>
				<Box>
					<Text>Uživatelské Jméno</Text>
					<Input
						id='userName'
						value={name}
						disabled={!isEnable}
						onChange={(e) => setName(e.target.value)}
					/>
				</Box>
				<Box>
					<Text>Telefon</Text>
					<Input
						id='Telefon'
						value={phone}
						disabled={!isEnable}
						onChange={(e) => setName(e.target.value)}
					/>
				</Box>

				{isEnable ? (
					<>
						<Box>
							<Text>Heslo:</Text>
							<Input
								id='password'
								value={password}
								disabled={!isEnable}
								onChange={(e) => setPassword(e.target.value)}
							/>
						</Box>
						<Box>
							<Text>Opakovat Heslo:</Text>
							<Input
								id='rePassword'
								value={isEnable ? rePassword : ""}
								disabled={!isEnable}
								onChange={(e) => setRePassword(e.target.value)}
							/>
						</Box>
					</>
				) : null}
				{userVsFirm && purifyCoverLetter !== null ? (
					<>
						<Text>Cover Letter </Text>
						<Box
							sx={{
								display: "flex",
								width: "50%",
								height: "45vh",
								overflow: "auto",
								border: "1px solid black",
								borderRadius: "5px",
								color: "black",
							}}
						>
							{/*toto pak se zobrazi jako profil při navšteve jineho uživatele */}

							<div
								className='rich-content'
								dangerouslySetInnerHTML={{ __html: purifyCoverLetter }}
							/>
						</Box>{" "}
					</>
				) : null}
				<Text>O mě </Text>
				{/*Toto se zobrazi jen když dám upravit profil */}
				{isEnable ? (
					<QuillEditor value={about} onChange={setAbout} edit={isEnable} />
				) : (
					<Box
						sx={{
							display: "flex",
							width: "75%",
							height: "45vh",
							overflow: "auto",
							border: "1px solid black",
							borderRadius: "5px",
							color: "black",
						}}
					>
						{/*toto pak se zobrazi jako profil při navšteve jineho uživatele */}
						<div
							className='rich-content'
							dangerouslySetInnerHTML={{ __html: purifyAbout }}
						/>
					</Box>
				)}
				<Typography>Apply Job List</Typography>
				<Box
					sx={{
						display: "flex",
						border: "1px solid black",
						borderRadius: "15px",
						width: "25%",
						height: "15vh",
						overflow: "auto",
					}}
				>
					{appliedJobs.map(({ application, job, }) => (
      <Box sx={{paddingLeft:"5%"}} key={application.id}>
		<Typography sx={{ cursor: "pointer", color: "blue" }} onClick={()=>router.push(`/job/jobDetail${jobIds}`)} >{job?.title || "Neznámá pozice"}</Typography>
        
      </Box>
    ))}
				</Box>
				{/*Toto se zobrazi jen když přihlašeny uživatel klikne na profil */}
				{userVsFirm === null ? (
					<Box>
						<Button variant='outlined' onClick={handleEdit}>
							{!isEnable ? "Upravit" : "Konec "}
						</Button>
						<Button variant='contained' onClick={handleSaveChanges}>
							Ulož
						</Button>
						<Text>Přilož CV</Text>
					</Box>
				) : null}
			</Box>
		</>
	);
}
