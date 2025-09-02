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
import { useAppStore } from "@/app/hook/useAppStore";
import { useRouter } from "next/navigation";

const HeaderMainPage = () => {
	const setSelectedUserId = useAppStore((state) => state.setSelectedUserId);
	const LogIn = useAppStore((state) => state.LogIn);
	const setLogIn = useAppStore((state) => state.setLogIn);
	const router = useRouter();

	const isAdmin = LogIn?.role === "ADMIN";
	const isCompany = LogIn?.role === "COMPANY";
	const isUser = LogIn?.role === "USER";
	const isLoggedIn = Boolean(LogIn);

	const handleLogout = () => {
		setLogIn(null);
		router.push("/");
	};

	const handleLogin = () => {
		router.push("/pages/login");
	};
	const handleProfil = () => {
		if (LogIn?.role === "ADMIN") {
			router.push("/pages/user/admin");
			return;
		}
		if (LogIn?.role === "COMPANY") {
			router.push("/pages/user/company");
			return;
		}
		setSelectedUserId(null);
		router.push("/pages/user/users/userAppProfil");
	};

	return (
		<PageContainer>
			<AppBar sx={{ width: "full-width", flexGrow: 1 }}>
				<Toolbar>
					<Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
						<Link
							href='/'
							underline='none'
							color='inherit'
							sx={{
								fontWeight: "bold",
								fontSize: { xs: 18, md: 28 },
								fontFamily: "Arial",
								letterSpacing: 2,
							}}
						>
							JobBoard
						</Link>
					</Typography>
					{/* --- ADMIN --- */}
					{isAdmin && (
						<>
							<Button
								color='inherit'
								onClick={handleProfil}
								sx={{
									fontWeight: "bold",
									fontSize: 16,
									fontFamily: "serif",
									"&:hover": {
										backgroundColor: "#e3fcec",
										color: "#1976d2",
									},
								}}
							>
								Profil
							</Button>
						</>
					)}
					{/* --- USER nebo COMPANY --- */}
					{(isUser || isCompany) && (
						<Button
							color='inherit'
							onClick={handleProfil}
							sx={{
								fontWeight: "bold",
								fontSize: 16,
								fontFamily: "serif",
								"&:hover": {
									backgroundColor: "#e3fcec",
									color: "#1976d2",
								},
							}}
						>
							Profil
						</Button>
					)}
					{/* --- NIKDO NEPŘIHLÁŠEN --- */}
					{!isLoggedIn && (
						<Button
							color='inherit'
							onClick={() => router.push("/pages/user")}
							sx={{
								fontWeight: "bold",
								fontSize: 16,
								fontFamily: "serif",
								"&:hover": {
									backgroundColor: "#e3fcec",
									color: "#1976d2",
								},
							}}
						>
							Firmy
						</Button>
					)}
					{/* --- LOGOUT/LOGIN --- */}
					{isLoggedIn ? (
						<Button
							role='button'
							onClick={handleLogout}
							color='inherit'
							sx={{
								fontWeight: "bold",
								fontSize: 16,
								fontFamily: "serif",
								"&:hover": {
									backgroundColor: "#e3fcec",
									color: "#1976d2",
								},
							}}
						>
							Odhlášení
						</Button>
					) : (
						<Button
							role='button'
							onClick={handleLogin}
							color='inherit'
							sx={{
								fontWeight: "bold",
								fontSize: 16,
								fontFamily: "serif",
								"&:hover": {
									backgroundColor: "#e3fcec",
									color: "#1976d2",
								},
							}}
						>
							Přihášení
						</Button>
					)}
				</Toolbar>
			</AppBar>
		</PageContainer>
	);
};
export default HeaderMainPage;
