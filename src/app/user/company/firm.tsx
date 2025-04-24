import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { useState, useEffect } from "react";
import { LogInFirm } from "../../login/LogInUser";
import { useQueries, useQuery } from "@tanstack/react-query";
import { fetchUsers } from "@/lib/api";
import { useAppStore } from "@/store/useAppStore";
import { fetchjobs } from "../../../lib/api";
import { Login } from "@mui/icons-material";

const Firm = () => {
	const { data, error, isLoading } = useQuery({
		queryKey: ["usersAndJobs"],
		queryFn: async () => {
			const [users, jobs] = await Promise.all([fetchUsers(), fetchjobs()]);
			return { users, jobs };
		},
	});

	const users = data?.users;
	const jobs = data?.jobs;

	const setUsers = useAppStore((state) => state.setUsers);

	useEffect(() => {
		if (users) {
			setUsers(users); // uložíme data do zustand
		}
	}, [data, setUsers]);

	const companys = users?.find(
		(user: { name: string }) => user.name === LogInFirm.name
	);
	console.log("company", companys);
	console.log("companyId", companys?.id);

	const companyJobs = jobs?.filter(
		(job: { companyid: string }) => job.companyid === companys?.id
	);
	console.log("companyJobs", companyJobs);

	if (isLoading) return <div>Loading...</div>;
	if (error instanceof Error) return <div>Error: {error.message}</div>;

	return (
		<Box>
			<Typography>Profil:{companys?.name}</Typography>
			<Box>
				<Button>Výpis pracovnich nabídek</Button>
				<Button>Výpis uchazečů</Button>
				<Button>Přidat pracovní nabídku</Button>
				<Box>
					<Typography>
						{/*zde se bdue menit nazev co se zobrazuje */}
					</Typography>
					{companyJobs?.map((job: { title: string }) => (
						<Box key={job.title}>
							<Typography>{job.title}</Typography>
							<Button>Upravit pracovni nabidku</Button>
							<Button>Info uchazeči</Button>
						</Box>
					))}
				</Box>
			</Box>
		</Box>
	);
};
export default Firm;
