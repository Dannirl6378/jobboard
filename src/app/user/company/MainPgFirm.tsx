import HeaderMainPage from "@/components/HeaderMainPage"
import { Box, Button, Typography } from "@mui/material"


const MainPgFirm = () => {

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
                ml:'10%'
            }}>
                <Typography>Informace pro firmy</Typography>
                <Box>
                    <Typography>{/*zde vložím nějake blablabla jestě nevim musim nastudovat
                    asi něco jako jak dlouho to bude registrace poplatek za zveřejnění prac nabidky  nejaky premium 
                    prostě firmy podojit tak do cenu zjistim nejake kontakni ifo jako email admin a 
                    co dělat a podobně neco z toho se zobrazi po registraci  */}</Typography>
                    <Button>Registrace</Button>
                </Box>
            </Box>
        </Box>
    )
}
export default MainPgFirm