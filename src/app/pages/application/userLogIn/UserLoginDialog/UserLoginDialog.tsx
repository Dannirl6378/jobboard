"use client";
import {
	Alert,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Snackbar,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Props {
	openSnackbar: boolean;
	setOpenSnackbar: (openSnackbar: boolean) => void;
	openDialog: boolean;
	setOpenDialog: (openDialog: boolean) => void;
}

export default function UserLoginCard({
	openSnackbar,
	setOpenSnackbar,
	openDialog,
	setOpenDialog,
}: Props) {

	const router = useRouter();
const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

	return (
		<>
			<Snackbar
				open={openSnackbar}
				autoHideDuration={3000}
				onClose={() => setOpenSnackbar(false)}
				anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
			>
				<Alert
					onClose={() => setOpenSnackbar(false)}
					severity='success'
					sx={{ width: "100%" }}
				>
					Data byla úspěšně uložena.
				</Alert>
			</Snackbar>
			<Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
				<DialogTitle>Úspěch</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Vaše žádost byla úspěšně odeslána.
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button
						onClick={() => router.push("/")}
						color='primary'
						variant='contained'
					>
						Hlavní stránka
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
}
