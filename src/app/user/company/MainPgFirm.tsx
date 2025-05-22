import HeaderMainPage from "@/components/HeaderMainPage"
import { Box, Button, Typography } from "@mui/material"
import { useRouter } from "next/navigation";




const MainPgFirm = () => {
const route = useRouter();
    return (
        <Box>
        <HeaderMainPage/>
        <Box
            position='relative'
            sx={{
                bgcolor: "#D5DEFF",
                p: 2,
                borderRadius: 2,
                maxHeight: "90vh",
                minHeight: "70vh",
                width: "80%",
                ml:'10%',
                mt: "15%",
            }}>
                <Typography sx={{color:"black"}}>Informace pro firmy</Typography>
                <Box>
                    <Typography sx={{color:'black'}}>Tady bdue nějake pokecani o vyhodach pro firmy a nebo zakladni přestaveni a podobně </Typography>
                  <Button>
                    <Typography>Registrace</Typography>
                  </Button>
                  <Button sx={{ml:"5%"}} onClick={()=>{route.push('/login')}}>
                    <Typography>Přihlášení</Typography>
                  </Button>
                </Box>
            </Box>
        </Box>
    )
}
export default MainPgFirm