import {
	AppBar,
	Toolbar,
	Typography,
	Box,
	Button,
	Icon,
	Link,
} from "@mui/material";
import PageContainer from "@/components/PageContainer";
import { useAppStore } from "@/store/useAppStore";
import { useRouter } from "next/navigation";


const HeaderMainPage = () => {
	const setSelectedUserId = useAppStore((state) => state.setSelectedUserId);
	const LogIn = useAppStore((state) => state.LogIn);
	const setLogIn = useAppStore((state) => state.setLogIn);
	const router = useRouter();

	const handleLogout = () => {
		setLogIn(null);
		router.push("/");
	};

	const handleLogin = () => {
		router.push("/login");
	};
    if(LogIn?.role === "COMPANY"){
        console.log("IsCompany",LogIn)
    }else{
        console.log("nocompany",LogIn?.role,LogIn)
    }
	const handleProfil =()=>{
		setSelectedUserId(null);
		router.push("/user/users/userAppProfil");
	}

	return (
		<PageContainer>
			<AppBar sx={{ width: "full-width", flexGrow: 1 }}>
				<Toolbar>
					<Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
						<Link href='/' underline='none' color='inherit'>
							JobBoard
						</Link>
					</Typography>
					<Button color='inherit' onClick={() => router.push("/jobs")}>
						Brigády
					</Button>
                    {LogIn === null || LogIn?.role === 'COMPANY'? <Button color='inherit' onClick={() => router.push("/user")}>
						Firmy
					</Button>:null }
					
					<Button
						color='inherit'
						onClick={handleProfil}
					>
						Profil
					</Button>
					{LogIn ? (
						<Button onClick={handleLogout} color='inherit'>
							Logout
						</Button>
					) : (
						<Button onClick={handleLogin} color='inherit'>
							Login
						</Button>
					)}
				</Toolbar>
			</AppBar>
		</PageContainer>
	);
};
export default HeaderMainPage;
