"use client";

import { useAppStore } from "@/app/hook/useAppStore";
import { useEffect } from "react";
import Firm from "./company/page";
import HeaderMainPage from "@/components/HeaderMainPage";
import { Box } from "@mui/material";
import MainPgFirm from "./company/MainPgFirm";

const UserPage = () => {
	const LogIn = useAppStore((state) => state.LogIn);
	

	const LogInCompany: boolean = LogIn?.role === "COMPANY" ? true : false; //toto se upravi na zjistovani kdo je přihlašeny Firm User
	

	return (
		<>
			<HeaderMainPage />
			{LogInCompany || LogIn?.role === "ADMIN" ? (
				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						mt: 5,
						bgcolor: "#D5DEFF",
						width: "100vw",
						height: "100vh",
						color: "black",
						p: 5,
					}}
				>
					<Firm />
				</Box>
			) : (
				<MainPgFirm />
			)}
		</>
	);
};
export default UserPage;
