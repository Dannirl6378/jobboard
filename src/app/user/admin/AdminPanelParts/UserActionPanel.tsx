import { Box, Button, Typography } from "@mui/material";
import AdminEditUser from "../AdminEditUser/AdminEditUser";
import { Dispatch, SetStateAction } from "react";

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
	onEdit,
	handleDelete,
	deleteStatus,
	setDeleteStatus,
	editUserOpen,
	setEditUserOpen,
}: UserActionPanelProps) {
	return (
		<Box p={2}>
			<Typography>Možnosti uprav</Typography>
			<Button variant='contained' onClick={() => setEditUserOpen(true)}>
				Edit User
			</Button>
			<Button
				variant='contained'
				onClick={() => handleDelete(selectedUserData.id)}
			>
				Delete User
			</Button>
			{deleteStatus && (
				<Box
					sx={{
						border: "1px solid",
						zIndex: 1,
						margin: "auto",
						background: "white",
						top: "25%",
					}}
				>
					<Typography>
						{deleteStatus.success
							? "Uživatel úspěšně smazán"
							: `Uživatel se nepovedl smazat: ${deleteStatus.message}`}
					</Typography>
					<Button onClick={() => setDeleteStatus(null)}>Zavřít</Button>
				</Box>
			)}
			{editUserOpen && (
				<Box>
					<AdminEditUser setEditUserOpen={setEditUserOpen} />
				</Box>
			)}
		</Box>
	);
}
