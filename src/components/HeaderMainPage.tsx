import { AppBar, Toolbar, Typography, Box, Button, Icon } from "@mui/material";
import { useState } from "react";
import PageContainer from '@/components/PageContainer';



const HeaderMainPage = () => {
	const [isloggedin, setLoggedIn] = useState(false);
	return (
		<PageContainer>
			<AppBar position='static'sx={{width:'100vw',ml:-3}}>
				<Toolbar>					
					<Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
						JobBoard
					</Typography>
					<Button color='inherit' href='/jobs'>
						Brigády
					</Button>
					<Button color='inherit' href='/companies'>
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