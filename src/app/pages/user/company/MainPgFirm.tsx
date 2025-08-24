import {
	Box,
	Typography,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Divider,
	Button,
} from "@mui/material";
import BusinessIcon from "@mui/icons-material/Business";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import { useRouter } from "next/navigation";

export default function ForCompaniesIntro() {
	const route = useRouter();
	return (
      <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: "#cee5fd", // volitelné pozadí stránky
            }}
        >
		<Box
			sx={{
				maxWidth: "75vw",
				p: 3,
				bgcolor: "white",
				borderRadius: 2,
				boxShadow: 2,
				fontFamily: "sans-serif",
			}}
		>
			<Typography variant='h5' gutterBottom>
				🏢 Hledáte spolehlivé zaměstnance? JobBoard je tu pro vás!
			</Typography>

			<Typography paragraph>
				JobBoard je moderní náborová platforma, která vám umožní efektivně
				zveřejňovat pracovní nabídky a oslovit uchazeče, kteří skutečně
				odpovídají vašim požadavkům.
			</Typography>

			<Divider sx={{ my: 2 }} />

			<Typography variant='h6' gutterBottom>
				🔧 Co můžete dělat jako registrovaná firma?
			</Typography>
			<List dense>
				<ListItem>
					<ListItemIcon>
						<BusinessIcon />
					</ListItemIcon>
					<ListItemText primary='📄 Vytvářet a spravovat pracovní inzeráty' />
				</ListItem>
				<ListItem>
					<ListItemIcon>
						<BusinessIcon />
					</ListItemIcon>
					<ListItemText primary='🎯 Cílit nabídky podle lokality, oboru nebo typu úvazku' />
				</ListItem>
				<ListItem>
					<ListItemIcon>
						<BusinessIcon />
					</ListItemIcon>
					<ListItemText primary='👀 Procházet profily přihlášených uchazečů' />
				</ListItem>
				<ListItem>
					<ListItemIcon>
						<BusinessIcon />
					</ListItemIcon>
					<ListItemText primary='🤖 Využít chytré filtrování a doporučení vhodných kandidátů' />
				</ListItem>
			</List>

			<Divider sx={{ my: 2 }} />

			<Typography variant='h6' gutterBottom>
				🚀 Proč se zaregistrovat?
			</Typography>
			<List dense>
				<ListItem>
					<ListItemIcon>
						<CheckCircleIcon color='success' />
					</ListItemIcon>
					<ListItemText primary='Získáte přístup k jednoduchému a rychlému náborovému nástroji' />
				</ListItem>
				<ListItem>
					<ListItemIcon>
						<CheckCircleIcon color='success' />
					</ListItemIcon>
					<ListItemText primary='Ušetříte čas díky automatizovanému třídění přihlášek' />
				</ListItem>
				<ListItem>
					<ListItemIcon>
						<CheckCircleIcon color='success' />
					</ListItemIcon>
					<ListItemText primary='Zlepšíte viditelnost své značky mezi uchazeči' />
				</ListItem>
				<ListItem>
					<ListItemIcon>
						<CheckCircleIcon color='success' />
					</ListItemIcon>
					<ListItemText primary='Budete mít přehled o všech přihlášených kandidátech na jednom místě' />
				</ListItem>
			</List>

			<Box sx={{ mt: 2 }}>
				<Typography fontWeight='bold'>
					Registrujte se ještě dnes a začněte hledat nové talenty bez zbytečného
					zdržování!
				</Typography>
        <Button
          variant="outlined"
          sx={{ ml: "5%" }}
          onClick={() => {
            route.push("/login")
          }}
        >
          <Typography>Registrace</Typography>
        </Button>
			</Box>
		</Box>
    </Box>
	);
}
