import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { useState, useEffect } from "react";
import { LogInFirm } from "../../login/LogInUser";
import { useQueries, useQuery } from "@tanstack/react-query";
import { fetchUsers } from "@/lib/api";
import { useAppStore } from "@/store/useAppStore";
import { fetchjobs } from "../../../lib/api";
import { Login } from "@mui/icons-material";
import HeaderMainPage from "@/components/HeaderMainPage";

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
		(user: { name: string }) => user.name === LogInFirm.name//tady to taky musim změnit při přihlašeni
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
            <HeaderMainPage />
			<Typography>Profil:{companys?.name}</Typography>
			<Box>
				<Button>Výpis pracovnich nabídek</Button>
				<Button>Výpis uchazečů</Button>
				<Button>Přidat pracovní nabídku</Button>
				<Box sx={{
        display: "flex", // nebo "grid"
        flexDirection: "column", // Pro vertikální zarovnání
        gap: 1,
        justifyContent: "center",
        ml:"-25%",
        width:"150%" // Mezera mezi Boxy
    }}>
					<Typography>
						{/*zde se bdue menit nazev co se zobrazuje */}
					</Typography>
					{companyJobs?.map((job: { title: string,description:string }) => (
						<Box sx={{border:0,boxShadow:5,p:2,bgcolor:"#EE8A59",opacity:0.8,gap:2 }} key={job.title}>
							<Typography variant="h4" >{job.title}</Typography>
                            <Typography variant="h5">{job.description}</Typography>
							<Button variant="contained">Upravit pracovni nabidku</Button>
							<Button variant="contained">Info uchazeči</Button>
						</Box>
                        
					))}
				</Box>
			</Box>
		</Box>
	);
};
export default Firm;
