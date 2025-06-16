import { Box, Button, Input, Typography } from "@mui/material";
import { useState } from "react";
import { useAppStore } from "@/store/useAppStore";
import { fetchUserByEmail } from "@/lib/api";
import { User } from "@/types/user";

const AdminSearchPanel = () => {
	const [email, setEmail] = useState("");
    const [popUp,setPopUp]= useState(false);
	const [error, setErorr] = useState("");

	const isValid = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

	const setUserId = useAppStore((state) => state.getUserById);
	const setSelectedUserData = useAppStore((state) => state.setSelectedUserData);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setEmail(value);
		setErorr(
			value.length === 0 || isValid(value) ? "" : "Neplatný formát emailu"
		);
	};

	const handleFindUser = async (email: string) => {
		if (email === "") {
             setPopUp(true);
			return console.error("email nezadán");
           
		}else{
		try {
			const user = await fetchUserByEmail(email);
			setUserId(user.id);
			setSelectedUserData(user);
			setEmail(user.email);
		} catch (error) {
			console.error("Error fetching user by email:", error);
			setSelectedUserData(null);
		}
    }
	};

	return (
		<Box p={2}>
			<Typography>Najdi ID podle emailu:</Typography>
			<Input value={email} onChange={handleChange} />
			<Button onClick={() => handleFindUser(email)}>Najdi uživatele</Button>
			{popUp ? (
				<Box
					sx={{
                        position:"absolute",
						border: "1px solid",
						boxShadow: "5",
						borderRadius: "15px",
						zIndex: "1",
						left:"45%",
						top: "15%",
                        maxWidth:"50vw",
                        height:"20vh",
                        minWidth:"15vw",
						width: "fitContent",
					}}
				>
                    <Typography >Erorr</Typography>
					<Typography sx={{paddingLeft:"5%",mt:"15%",top:"5%"}}>špatně zadany email</Typography>
					<Button onClick={() => setPopUp(false)}>Zavřít</Button>
				</Box>
			) : null}
		</Box>
	);
};
export default AdminSearchPanel;
