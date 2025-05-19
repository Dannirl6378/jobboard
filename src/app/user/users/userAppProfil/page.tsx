"use client";
import { Box, Button, Input, Typography } from "@mui/material";
import HeaderMainPage from "@/components/HeaderMainPage";
import { Heading, Text } from "@/styles/editTypoghraphy";
import { useEffect, useState } from "react";
import { useAppStore } from "@/store/useAppStore";
import { LogInUser } from "@/app/login/LogInUser";
import { User } from "@/types/user";
import updateUser from "../updateUser/updateUser";
import DOMPurify from "dompurify";
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

	const getUser = () =>
		usersArray?.find((user) => user.name === LogInUser.name);

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
					mt: "10%",
				}}
			>
				<Box>
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
					<Text>Heslo:</Text>
					<Input
						id='password'
						value={password}
						disabled={!isEnable}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</Box>
				{isEnable ? (
					<Box>
						<Text>Opakovat Heslo:</Text>
						<Input
							id='rePassword'
							value={isEnable ? rePassword : ""}
							disabled={!isEnable}
							onChange={(e) => setRePassword(e.target.value)}
						/>
					</Box>
				) : null}
				<Box>
					<Text>O mě </Text>
					{/*Toto musim jestě přidat do databaze */}
					<QuillEditor value={about} onChange={setAbout} edit={isEnable} />
					<Input
						id='about'
						value={about}
						disabled={!isEnable}
						onChange={(e) => setAbout(e.target.value)}
					/>
				</Box>
				<Box
					sx={{
						width: "50%",
						height: "15vh",
						overflow: "auto",
						border: "1px solid black",
						borderRadius: "5px",
						color: "black",
					}}
				>
					<div
						className='rich-content'
						dangerouslySetInnerHTML={{ __html: purifyAbout }}
					/>
				</Box>
				<Box>
					<Text>Přilož CV</Text>
				</Box>
				<Button variant='outlined' onClick={handleEdit}>
					Edit Info
				</Button>
				<Button variant='contained' onClick={handleSaveChanges}>
					Ulož
				</Button>
			</Box>
		</>
	);
}
