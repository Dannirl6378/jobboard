import { AppBar, Toolbar, Typography, Box, Button, Icon, Link } from "@mui/material";
import { useState } from "react";
import PageContainer from '@/components/PageContainer';



const HeaderMainPage = () => {
	const [isloggedin, setLoggedIn] = useState(false);
	return (
		<PageContainer>
			<AppBar sx={{width:'full-width',flexGrow:1}}>
				<Toolbar>					
					<Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
						<Link href="/" underline="none" color="inherit">
							JobBoard
						</Link>
					</Typography>
					<Button color='inherit' href='/jobs'>
						Brigády
					</Button>
					<Button color='inherit' href='/user'>
						Firmy
					</Button>
					<Button color='inherit' href='/profile'>
						Profil
					</Button>
					{isloggedin === true ? (
						<Button
							onClick={() => setLoggedIn(false)}
							color='inherit'
							href='logout'
						>
							Logout
						</Button>
					) : (
						<Button
							onClick={() => setLoggedIn(true)}
							color='inherit'
							href='/login'
						>
							Login
						</Button>
					)}
				</Toolbar>
			</AppBar>
		</PageContainer>
	);
};
export default HeaderMainPage;