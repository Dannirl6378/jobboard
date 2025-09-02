import { User } from "@/types/user";
import { Button, List, ListItem } from "@mui/material";

interface Props {
	chooseCompany: boolean;
	setChooseCompany: (chooseCompany: boolean) => void;
	roleCompany: User[];
	handleLogin: (email: string) => void;
};

export default function LoginFirm({
	chooseCompany,
	setChooseCompany,
	roleCompany,
	handleLogin,
}: Props) {
	return (
		<>
			<Button
				fullWidth
				variant='contained'
				sx={{
					fontWeight: "bold",
					bgcolor: "#43a047",
					":hover": { bgcolor: "#2e7031" },
				}}
				onClick={() =>
					chooseCompany ? setChooseCompany(false) : setChooseCompany(true)
				}
			>
				Firmy
			</Button>
			{chooseCompany ? (
				<List
					sx={{
						width: "100%",
						bgcolor: "background.paper",
						border: "1px solid #b6c8e6",
						borderRadius: 2,
						overflowY: "auto",
						maxHeight: 300,
					}}
				>
					{roleCompany?.map((user) => (
						<ListItem key={user.email}>
							<Button
								fullWidth
								variant='outlined'
								sx={{
									fontWeight: "bold",
									color: "#1976d2",
									borderColor: "#1976d2",
									":hover": { borderColor: "#1565c0" },
								}}
								onClick={() => handleLogin(user.email)}
							>
								{user.email}
							</Button>
						</ListItem>
					))}
				</List>
			) : null}
		</>
	);
}
