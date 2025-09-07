"use client";
import {
	Box,
	Button,
	Typography,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
} from "@mui/material";
import AdminEditUser from "../AdminEditUser/AdminEditUser";
import { Dispatch, SetStateAction, useState } from "react";

interface UserActionPanelProps {
	selectedUserData: any;
	onEdit: () => void;
	handleDelete: (id: string) => void;
	deleteStatus: { success: boolean; message: string } | null;
	setDeleteStatus: (
		status: { success: boolean; message: string } | null
	) => void;
	editUserOpen: boolean;
	setEditUserOpen: Dispatch<SetStateAction<boolean>>;
}
export default function UserActionPanel({
	selectedUserData,
	handleDelete,
	deleteStatus,
	setDeleteStatus,
	editUserOpen,
	setEditUserOpen,
}: UserActionPanelProps) {
	const [openDialog, setOpenDialog] = useState(false);

	return (
		<Box
			sx={{
				p: 3,
				bgcolor: "#f5f7fa",
				borderRadius: 3,
				boxShadow: 2,
				fontFamily: "Montserrat, Arial, sans-serif",
				mt: 2,
				ml: 50,
				display: "flex",
				flexDirection: "column",
				alignItems: "flex-start",
				width: { xs: "90vw", sm: "auto" },
				gap: 2,
				maxWidth: 400,
				mx: { xs: "auto", sm: 0 },
			}}
		>
			<Typography
				variant='h6'
				sx={{
					fontWeight: "bold",
					color: "#1976d2",
					mb: 2,
					fontFamily: "Montserrat, Arial, sans-serif",
				}}
			>
				Možnosti úprav
			</Typography>
			<Box sx={{ display: "flex", gap: 2, mb: 1 }}>
				<Button
					variant='contained'
					sx={{
						bgcolor: "#1976d2",
						color: "#fff",
						fontWeight: "bold",
						fontFamily: "Montserrat, Arial, sans-serif",
						"&:hover": { bgcolor: "#1565c0" },
					}}
					onClick={() => setEditUserOpen(true)}
				>
					Upravit uživatele
				</Button>
				<Button
					variant='contained'
					sx={{
						bgcolor: "#d32f2f",
						color: "#fff",
						fontWeight: "bold",
						fontFamily: "Montserrat, Arial, sans-serif",
						"&:hover": { bgcolor: "#b71c1c" },
					}}
					onClick={() => setOpenDialog(true)}
				>
					Smazat uživatele
				</Button>
			</Box>
			{/* Potvrzovací dialog */}
			<Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
				<DialogTitle sx={{ color: "#d32f2f", fontWeight: "bold" }}>
					Opravdu chcete smazat uživatele?
				</DialogTitle>
				<DialogContent>
					<Typography>
						Tato akce je nevratná. Opravdu chcete smazat uživatele{" "}
						<b>{selectedUserData?.name}</b>?
					</Typography>
				</DialogContent>
				<DialogActions>
					<Button onClick={() => setOpenDialog(false)}>Zrušit</Button>
					<Button
						onClick={() => {
							setOpenDialog(false);
							handleDelete(selectedUserData.id);
						}}
						variant='contained'
						sx={{
							bgcolor: "#d32f2f",
							color: "#fff",
							fontWeight: "bold",
							fontFamily: "Montserrat, Arial, sans-serif",
							"&:hover": { bgcolor: "#b71c1c" },
						}}
					>
						Smazat
					</Button>
				</DialogActions>
			</Dialog>
			{deleteStatus && (
				<Box
					sx={{
						border: "2px solid",
						borderColor: deleteStatus.success ? "#43a047" : "#d32f2f",
						boxShadow: 4,
						borderRadius: 2,
						background: "#fff",
						p: 2,
						mt: 2,
						width: "100%",
						textAlign: "center",
					}}
				>
					<Typography
						sx={{
							color: deleteStatus.success ? "#43a047" : "#d32f2f",
							fontWeight: "bold",
							mb: 1,
						}}
					>
						{deleteStatus.success
							? "Uživatel úspěšně smazán"
							: `Uživatel se nepovedl smazat: ${deleteStatus.message}`}
					</Typography>
					<Button
						variant='outlined'
						sx={{
							fontWeight: "bold",
							color: "#1976d2",
							borderColor: "#1976d2",
							"&:hover": { bgcolor: "#e3fcec", borderColor: "#1976d2" },
						}}
						onClick={() => setDeleteStatus(null)}
					>
						Zavřít
					</Button>
				</Box>
			)}
			{editUserOpen && (
				<Box sx={{ mt: 2, width: "90%",mx:{xs:"-8%"} }}>
					<AdminEditUser setEditUserOpen={setEditUserOpen} />
				</Box>
			)}
		</Box>
	);
}
