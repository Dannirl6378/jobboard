"use client";
import { Box, Button, Input, Typography } from "@mui/material";
import HeaderMainPage from "@/components/HeaderMainPage";
import { Heading, Text } from "@/styles/editTypoghraphy";
import { useEffect, useState } from "react";
import { useAppStore } from "@/store/useAppStore";
import { User } from "@/types/user";
import updateUser from "../updateUser/updateUser";
import QuillEditor from "@/components/textEditor/textEditQuill";
import { sanitizeHtml } from "@/lib/sanitizeHTML";

export default function UserProfil(/*{
	params,
}: {
	params: Promise<{ id: string }>;
}*/) {
	const [isEnable, setIsEnable] = useState<boolean>(false);
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [rePassword, setRePassword] = useState("");
	const [about, setAbout] = useState("");
	const [purifyAbout, setPurifyAbout] = useState(about);

	//const { id: userid } = use(params);
	const usersArray = Object.values(useAppStore((state) => state.users));
	const LogIn = useAppStore((state) => state.LogIn);
	console.log("LogIn", LogIn);
	console.log("LogIn", LogIn?.name);

	const getUser = () =>
		usersArray?.find((user) => user.name === LogIn?.name);

	const user = getUser();
	console.log("editUser", user);
	console.log("about", about);

	useEffect(() => {
		sanitizeHtml(about).then(setPurifyAbout);
	}, [about]);

	useEffect(() => {
		if (user) {
			setName(user.name || "");
			setEmail(user.email || "");
			setPassword(user.passwordHash || "");
			setAbout(user.about || "");
		}
	}, [user]);

	const handleEdit = () => {
		setIsEnable(true);
		if (isEnable) {
			setIsEnable(false);
		}
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
		};
		if (user?.id) {
			handleUpdateUser(user.id, updateData);
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
				<Box>
					<Text>O mě </Text>
					{/*Toto se zobrazi jen když dám upravit profil */}
					{isEnable ? (
						
						
							<QuillEditor value={about} onChange={setAbout} edit={isEnable} />
					
						
					) : (
						<Box
							sx={{
								display:"flex",
								width: "150%",
								height: "45vh",
								overflow: "auto",
								border: "1px solid black",
								borderRadius: "5px",
								color: "black",
								ml: "-25%",
							}}
						>
							{/*toto pak se zobrazi jako profil při navšteve jineho uživatele */}
							<div
								className='rich-content'
								dangerouslySetInnerHTML={{ __html: purifyAbout }}
							/>
						</Box>
						
					)}
				</Box>

				{/*Toto se zobrazi jen když přihlašeny uživatel klikne na profil */}
				<Box>
					<Text>Přilož CV</Text>
				</Box>

				<Button variant='outlined' onClick={handleEdit}>
					{!isEnable ? "Upravit" : "Konec "}
				</Button>
				<Button variant='contained' onClick={handleSaveChanges}>
					Ulož
				</Button>
			</Box>
		</>
	);
}
