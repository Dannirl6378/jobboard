"use client";
import { useAppStore } from "@/store/useAppStore";
import { Heading, SubHeading, Text } from "@/styles/editTypoghraphy";
import { Box, Button, TextField } from "@mui/material";
import { LogInFirm } from "@/app/login/LogInUser";
import { useEffect, useState } from "react";

export default function AddWorkOffer() {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [location, setLocation] = useState("");
	const [salary, setSalary] = useState("");
	const [category, setCategory] = useState("");
	const [companyid, setCompanyid] = useState("");
	const [error, setError] = useState("");
	const [success, setSuccess] = useState(false);

	const usersArray = Object.values(useAppStore((state) => state.users));
	const foundUser = usersArray.find((user) => user.id === LogInFirm.id);


useEffect(()=>{
	if (foundUser) {
		setCompanyid(foundUser.id);
	} else {
		setError("nic sem nenašel");
	}
},[foundUser])

	

	const handleSubmit = async (e: React.FormEvent) => {
		if (
			!title ||
			!description ||
			!location ||
			!salary ||
			!category ||
			!companyid
		) {
			setError("All fields are required");
			return;
		}
		e.preventDefault();
		setError("");
		setSuccess(false);
		//nezpomen pracovat s companID!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!§
		try {
			const response = await fetch("/api/job/addJob", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					title,
					description,
					location,
					salary,
					category,
					companyid,
				}),
			});

			if (!response.ok) {
				throw new Error("Failed to create job");
			}

			const data = await response.json();
			console.log("Job created:", data);
			setSuccess(true);
		} catch (error) {
			console.error("Error creating job:", error);
			setError("Failed to create job");
		}
	};
	return (
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
				marginLeft: "10%",
				display: "flex",
				flexDirection: "column",
				gap: "24px",
				justifyContent: "center",
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
			<Box>
				<Text>Description:</Text>
				<TextField
					value={description}
					onChange={(e) => setDescription(e.target.value)}
					required
				/>
			</Box>
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
					type='text'
					value={category}
					onChange={(e) => setCategory(e.target.value)}
					required
				/>
			</Box>
			{error && <p style={{ color: "red" }}>{error}</p>}
			{success && <p style={{ color: "green" }}>Job created successfully!</p>}
			<Button type='submit' onClick={handleSubmit}>
				Add Work Offer
			</Button>
		</form>
	);
}
// 				<TextField
