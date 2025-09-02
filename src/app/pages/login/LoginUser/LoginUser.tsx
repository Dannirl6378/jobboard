import { Button, List, ListItem } from "@mui/material";
import { User } from "@/types/user";

interface Props {
	chooseUser: boolean;
	roleUsers: User[];
	setChooseUser: (chooseUser: boolean) => void;
	handleLogin: (email: string) => void;
};

export default function LoginUser({
	chooseUser,
	roleUsers,
	setChooseUser,
	handleLogin,
}: Props) {
	return (
		<>
			<Button
				fullWidth
				variant='contained'
				sx={{
					fontWeight: "bold",
					bgcolor: "#1976d2",
					":hover": { bgcolor: "#1565c0" },
				}}
				onClick={() =>
					chooseUser ? setChooseUser(false) : setChooseUser(true)
				}
			>
				User
			</Button>
			{chooseUser ? (
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
					{roleUsers?.map((user) => (
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
