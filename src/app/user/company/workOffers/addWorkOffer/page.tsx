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
import { JobAtending, Jobtype } from "./menuSelect";
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

	const usersArray = Object.values(useAppStore((state) => state.users));
	const foundUser = usersArray.find((user) => user.id === LogInFirm.id);
	const router = useRouter();

	useEffect(() => {
		if (foundUser) {
			setCompanyid(foundUser.id);
		} else {
			setError("nic sem nenašel");
		}
	}, [foundUser]);

	const handleSubmit = async (e: React.FormEvent) => {
		if (
			!title ||
			!description ||
			!location ||
			!salary ||
			!category ||
			!companyid ||
			!attending
		) {
			setError("All fields are required");
			return;
		}
		e.preventDefault();
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
			console.log("Job created:", data);
			setSuccess(true);
		} catch (error) {
			console.error("Error creating job:", error);
			setError("Failed to create job");
		}
	};
	const handleBack = () => {
		router.push("/user"); // Použití useNavigate pro přesměrování
	};

	return (
		<>
			<HeaderMainPage />
			<form
				noValidate
				autoComplete='off'
				style={{
					border: "1px solid gray",
					boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.2)",
					padding: "16px",
					backgroundColor: "#F5F5F5",
					opacity: 0.8,
					borderRadius: "8px",
					maxHeight: "100vh",
					overflowY: "auto",
					width: "80%",
					marginTop: "10%",
					marginLeft: "10%",
					display: "flex",
					flexDirection: "column",
					gap: "24px",
					justifyContent: "center",
					paddingTop: "10%",
				}}
			>
				<Heading>Nová nabídka práce</Heading>
				<Box>
					<SubHeading>Title:</SubHeading>
					<TextField
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						required
					/>
				</Box>
				<Box
					sx={{
						display: "flex",
						flexDirection: "row",
						flexWrap: "wrap",
						gap: "2%",
					}}
				>
					<Box>
						<Text>Location:</Text>
						<TextField
							type='text'
							value={location}
							onChange={(e) => setLocation(e.target.value)}
							required
						/>
					</Box>
					<Box>
						<Text>Salary:</Text>
						<TextField
							type='number'
							value={salary}
							onChange={(e) => setSalary(e.target.value)}
							required
						/>
					</Box>
					<Box>
						<Text>Category:</Text>
						<TextField
							id='select-Type-Job'
							select
							type='list'
							value={category}
							onChange={(e) => setCategory(e.target.value)}
							required
							sx={{ width: "26ch" }}
						>
							{Jobtype.map((option) => (
								<MenuItem key={option.value} value={option.value}>
									{option.label}
								</MenuItem>
							))}
						</TextField>
					</Box>
					<Box>
						<Text>Úvazek:</Text>
						<TextField
							id='select-Attend-Job'
							select
							type='list'
							value={attending}
							onChange={(e) => setAttending(e.target.value)}
							required
							sx={{ width: "26ch" }}
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
					<Text>Description:</Text>
					<>
						<QuillEditor
							value={description}
							onChange={setDescription}
							edit={true}
						/>
					</>
				</Box>

				{error && <p style={{ color: "red" }}>{error}</p>}
				{success && <p style={{ color: "green" }}>Job created successfully!</p>}
				<Button variant='contained' type='submit' onClick={handleSubmit}>
					Add Work Offer
				</Button>
				<Button variant='contained' onClick={handleBack}>
					zpět
				</Button>
			</form>
		</>
	);
}
// 				<TextField
