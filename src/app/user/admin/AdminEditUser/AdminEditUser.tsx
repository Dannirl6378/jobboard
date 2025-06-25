import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	TextField,
	Typography,
} from "@mui/material";
import { useAppStore } from "@/store/useAppStore";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { User } from "@/types/user";
import { fetchUpdateUser } from "@/lib/api";

//na přistě vytvoř close v boxu
type AdminEditUserProps = {
	setEditUserOpen: Dispatch<SetStateAction<boolean>>;
};

const AdminEditUser = ({ setEditUserOpen }: AdminEditUserProps) => {
	const [userData, setUserData] = useState<User | null>(null);
	const [open, setOpen] = useState(false);
	const selectedUserData = useAppStore((state) => state.selectedUserData);

	const { fetchAndSetUsers } = useAppStore();

	useEffect(() => {
		setUserData(selectedUserData);
	}, [selectedUserData]);

	const handleUpdateUser = async (userid: string, userData: Partial<User>) => {
		try {
			const updatedUser = await fetchUpdateUser(userid, userData);
			await fetchAndSetUsers(selectedUserData?.email || "");
			console.log("Updated job:", updatedUser);
			// Zde můžete přidat další logiku, např. aktualizaci stavu nebo přesměrování
		} catch (error) {
			console.error("Error updating job:", error);
			// Zde můžete přidat další logiku pro zpracování chyby
		}
	};

	const handleEdit = () => {
		const updateData: Partial<User> = {
			name: userData?.name,
			email: userData?.email,
			Phone: userData?.Phone,
		};
		if (userData?.id) {
			handleUpdateUser(userData?.id, updateData);

			setOpen(false);
		} else {
			console.error("User ID is undefined. Cannot update user.");
		}
	};

	return (
		<Box
			sx={{
				width: "25%",
				height: "50vh",
				border: "1px solid black",
				boxShadow: "0 0 10px rgba(0,0,0,0.1)",
				padding: "20px",
				margin: "auto",
				borderRadius: 5,
				zIndex: 1,
				display: "flex",
				flexDirection: "column",
				justifyContent: "space-around",
			}}
		>
			<TextField
				label='Id'
				disabled
				value={userData?.id ?? ""}
				variant='outlined'
			></TextField>
			<TextField
				label='Name'
				value={userData?.name ?? ""}
				variant='outlined'
				onChange={(e) =>
					setUserData((prev) =>
						prev ? { ...prev, name: e.target.value } : null
					)
				}
			></TextField>
			<TextField
				label='Email'
				value={userData?.email ?? ""}
				variant='outlined'
				onChange={(e) =>
					setUserData((prev) =>
						prev ? { ...prev, email: e.target.value } : null
					)
				}
			></TextField>
			<TextField
				label='Phone'
				value={userData?.Phone ?? ""}
				variant='outlined'
				onChange={(e) =>
					setUserData((prev) =>
						prev ? { ...prev, Phone: e.target.value } : null
					)
				}
			></TextField>
			<Button variant='outlined' onClick={() => setOpen(true)}>
				Potvrdit změny
			</Button>
			<Button variant='outlined' onClick={() => setEditUserOpen(false)}>
				Zavřít
			</Button>

			<Dialog open={open} onClose={() => setOpen(false)}>
				<DialogTitle>Opravdu chcete upravit uživatele?</DialogTitle>
				<DialogContent>
					<Typography>
						Potvrďte, že chcete uložit změny uživatele <b>{userData?.name}</b>.
					</Typography>
				</DialogContent>
				<DialogActions>
					<Button onClick={() => setOpen(false)}>Zrušit</Button>
					<Button onClick={handleEdit} variant='contained' color='primary'>
						Potvrdit
					</Button>
				</DialogActions>
			</Dialog>
		</Box>
	);
};
export default AdminEditUser;
