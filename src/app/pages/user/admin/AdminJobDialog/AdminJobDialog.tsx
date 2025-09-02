"use client"
import {
	Button,
	Dialog,
	DialogActions,
	DialogTitle,
	Typography,
} from "@mui/material";

interface Props {
	editDialogJobOpen: boolean;
	setEditDialogJobOpen: (open: boolean) => void;
	setEditJobError: (error: boolean) => void;
};

export default function AdminJobDialog({
	editDialogJobOpen,
	setEditDialogJobOpen,
	setEditJobError,
}: Props) {
	return (
		<>
			<Dialog
				open={editDialogJobOpen}
				onClose={() => setEditDialogJobOpen(false)}
			>
				<DialogTitle sx={{ color: "#d32f2f", fontWeight: "bold" }}>
					Chyba
				</DialogTitle>
				<DialogActions>
					<Typography sx={{ p: 2 }}>
						Vyberte právě jeden job pro úpravu!
					</Typography>
					<Button
						onClick={() => {
							setEditDialogJobOpen(false);
							setEditJobError(false);
						}}
					>
						Zrušit
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
}
