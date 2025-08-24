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
import { useAppStore } from "@/app/hook/useAppStore";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { User } from "@/types/user";
import { fetchUpdateUser } from "@/app/hook/api";

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
		} catch (error) {
			console.error("Error updating job:", error);
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
			setEditUserOpen(false);
		} else {
			console.error("User ID is undefined. Cannot update user.");
		}
	};

	return (
		<Box
			sx={{
				width: { xs: "95vw", sm: 400 },
				maxWidth: 500,
				bgcolor: "#f5f7fa",
				boxShadow: 6,
				borderRadius: 3,
				p: { xs: 2, sm: 4 },
				mx: "auto",
				mt: 4,
				display: "flex",
				flexDirection: "column",
				gap: 2,
				fontFamily: "Montserrat, Arial, sans-serif",
			}}
		>
			<Typography
				variant='h6'
				sx={{
					fontWeight: "bold",
					color: "#1976d2",
					mb: 2,
					textAlign: "center",
					fontFamily: "Montserrat, Arial, sans-serif",
				}}
			>
				Upravit uživatele
			</Typography>
			<TextField
				label='ID'
				disabled
				value={userData?.id ?? ""}
				variant='outlined'
				fullWidth
				sx={{ bgcolor: "white", borderRadius: 1 }}
			/>
			<TextField
				label='Jméno'
				value={userData?.name ?? ""}
				variant='outlined'
				fullWidth
				onChange={(e) =>
					setUserData((prev) =>
						prev ? { ...prev, name: e.target.value } : null
					)
				}
				sx={{ bgcolor: "white", borderRadius: 1 }}
			/>
			<TextField
				label='Email'
				value={userData?.email ?? ""}
				variant='outlined'
				fullWidth
				onChange={(e) =>
					setUserData((prev) =>
						prev ? { ...prev, email: e.target.value } : null
					)
				}
				sx={{ bgcolor: "white", borderRadius: 1 }}
			/>
			<TextField
				label='Telefon'
				value={userData?.Phone ?? ""}
				variant='outlined'
				fullWidth
				onChange={(e) =>
					setUserData((prev) =>
						prev ? { ...prev, Phone: e.target.value } : null
					)
				}
				sx={{ bgcolor: "white", borderRadius: 1 }}
			/>
			<Box
				sx={{
					display: "flex",
					gap: 2,
					mt: 2,
					justifyContent: "center",
				}}
			>
				<Button
					variant='contained'
					onClick={() => setOpen(true)}
					sx={{
						bgcolor: "#1976d2",
						color: "#fff",
						fontWeight: "bold",
						fontFamily: "Montserrat, Arial, sans-serif",
						"&:hover": { bgcolor: "#1565c0" },
					}}
				>
					Potvrdit změny
				</Button>
				<Button
					variant='contained'
					onClick={() => setEditUserOpen(false)}
					sx={{
						bgcolor: "#43a047",
						color: "#fff",
						fontWeight: "bold",
						fontFamily: "Montserrat, Arial, sans-serif",
						"&:hover": { bgcolor: "#2e7031" },
					}}
				>
					Zavřít
				</Button>
			</Box>
			<Dialog open={open} onClose={() => setOpen(false)}>
				<DialogTitle sx={{ color: "#1976d2", fontWeight: "bold" }}>
					Opravdu chcete upravit uživatele?
				</DialogTitle>
				<DialogContent>
					<Typography>
						Potvrďte, že chcete uložit změny uživatele <b>{userData?.name}</b>.
					</Typography>
				</DialogContent>
				<DialogActions>
					<Button onClick={() => setOpen(false)}>Zrušit</Button>
					<Button
						onClick={handleEdit}
						variant='contained'
						sx={{
							bgcolor: "#1976d2",
							color: "#fff",
							fontWeight: "bold",
							fontFamily: "Montserrat, Arial, sans-serif",
							"&:hover": { bgcolor: "#1565c0" },
						}}
					>
						Potvrdit
					</Button>
				</DialogActions>
			</Dialog>
		</Box>
	);
};
export default AdminEditUser;
