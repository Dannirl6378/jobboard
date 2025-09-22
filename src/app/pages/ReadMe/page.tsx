"use client";

import {
	Box,
	Button,
	Divider,
	List,
	ListItem,
	Paper,
	Typography,
} from "@mui/material";
import HeaderMainPage from "@/components/HeaderMainPage";
import { useRouter } from "next/navigation";

export default function ReadMe() {
	const router = useRouter();

	const handleBack = () => {
		router.back();
	};

	return (
		<>
			<HeaderMainPage />
			<Box
				sx={{
					maxWidth: "900px",
					mx: "auto",
					my: 6,
					p: 4,
				}}
			>
				<Paper elevation={4} sx={{ p: 4, borderRadius: 3 }}>
					{/* Hlavní nadpis */}
					<Typography variant='h3' fontWeight='bold' gutterBottom>
						JobBoard
					</Typography>
					<Typography variant='body1' paragraph>
						JobBoard je moderní pracovní portál vytvořený jako webová aplikace s
						administrativním rozhraním, který umožňuje správu pracovních
						nabídek, uživatelů a firem.
					</Typography>
					<Typography variant='body1' paragraph>
						Projekt je koncipován jako <strong>demoverze / sandbox</strong>,
						který jsem vytvořil pro účely portfolia (CV). Není tedy určen jako
						plně funkční produkční aplikace.
					</Typography>
					<Typography variant='body2' color='text.secondary' paragraph>
						Některá omezení: – Registrace uživatelů není aktivní, účty se
						vytvářejí výhradně přes administrátora. – Hesla slouží pouze k
						demonstračním účelům (neprobíhá žádné hashování ani zabezpečení). –
						Uživatel nemůže spravovat své reakce, pouze je zobrazit. – Původní
						Prisma ORM už v projektu není, místo něj je využit Supabase jako
						backend pro databázi a autentizaci.
					</Typography>

					<Divider sx={{ my: 3 }} />

					{/* Popis projektu */}
					<Typography variant='h5' gutterBottom>
						Popis projektu
					</Typography>
					<Typography variant='body1' gutterBottom>
						JobBoard nabízí:
					</Typography>

					<Typography variant='h6' mt={2}>
						Pro nepřihlášené uživatele:
					</Typography>
					<List dense>
						<ListItem>Prohlížení seznamu pracovních nabídek.</ListItem>
						<ListItem>Zobrazení detailu konkrétní pracovní pozice.</ListItem>
						<ListItem>
							Možnost reagovat na pracovní nabídku bez registrace (reakce jsou
							uloženy jako dočasní uživatelé v databázi).
						</ListItem>
					</List>

					<Typography variant='h6' mt={2}>
						Pro přihlášené uživatele:
					</Typography>
					<List dense>
						<ListItem>Vlastní uživatelský profil.</ListItem>
						<ListItem>Přehled pracovních nabídek, na které reagoval.</ListItem>
					</List>

					<Typography variant='h6' mt={2}>
						Pro firmy:
					</Typography>
					<List dense>
						<ListItem>
							Správa vlastních pracovních nabídek (vytváření, editace, mazání).
						</ListItem>
						<ListItem>
							Přístup k profilům uživatelů, kteří reagovali na jejich nabídky.
						</ListItem>
						<ListItem>Úprava vlastních firemních informací.</ListItem>
					</List>

					<Typography variant='h6' mt={2}>
						Pro administrátora:
					</Typography>
					<List dense>
						<ListItem>
							Kompletní správa všech uživatelů, firem a nabídek.
						</ListItem>
						<ListItem>
							Možnost vytvářet, upravovat a mazat uživatele i pracovní nabídky.
						</ListItem>
						<ListItem>
							Přístup k detailním informacím o uživatelích i firmách.
						</ListItem>
						<ListItem>
							Správa dočasných uživatelů (uživatelé bez registrace).
						</ListItem>
						<ListItem>
							Administrátorský účet je pouze jeden a slouží pro ukázkové účely.
						</ListItem>
					</List>

					<Typography variant='h6' mt={2}>
						Pro Master Admina:
					</Typography>
					<List dense>
						<ListItem>Má všechna práva jako administrátor.</ListItem>
						<ListItem>Může mazat demo data uložená v databázi.</ListItem>
						<ListItem>
							Tento přístup je určen výhradně pro autora projektu.
						</ListItem>
					</List>

					<Divider sx={{ my: 3 }} />

					{/* Použité technologie */}
					<Typography variant='h5' gutterBottom>
						Použité technologie
					</Typography>
					<List dense>
						<ListItem>Next.js – React framework pro SSR a routing.</ListItem>
						<ListItem>React – knihovna pro tvorbu UI.</ListItem>
						<ListItem>TypeScript – staticky typovaný JavaScript.</ListItem>
						<ListItem>Zustand – stavový management.</ListItem>
						<ListItem>Supabase – pro databázi a autentizace.</ListItem>
						<ListItem>MUI – komponentová knihovna UI.</ListItem>
						<ListItem>PostgreSQL – relační databáze.</ListItem>
					</List>

					<Divider sx={{ my: 3 }} />

					{/* Funkce */}
					<Typography variant='h5' gutterBottom>
						Funkce
					</Typography>
					<List dense>
						<ListItem>Uživatelská autentizace a role-based přístup.</ListItem>
						<ListItem>Správa pracovních nabídek a detailů.</ListItem>
						<ListItem>Ukládání reakcí uživatelů.</ListItem>
						<ListItem>Administrace uživatelů (včetně dočasných).</ListItem>
						<ListItem>Firemní profily a správa jejich nabídek.</ListItem>
						<ListItem>Master admin pro správu demo dat.</ListItem>
						<ListItem>
							Algoritmické vyhledávání pracovních nabídek podle procentuální
							shody mezi uživatelským profilem a nabídkami.
						</ListItem>
						<ListItem>
							Automatické mazání všech demo dat (s <code>isDemo: true</code>)
							každý den o půlnoci.
						</ListItem>
					</List>

					<Divider sx={{ my: 3 }} />

					{/* Struktura projektu */}
					<Typography variant='h5' gutterBottom>
						Struktura projektu
					</Typography>
					<List dense>
						<ListItem>/app – stránky aplikace (Next.js routing).</ListItem>
						<ListItem>/components – UI komponenty a panely.</ListItem>
						<ListItem>/store – Zustand store pro správu stavu.</ListItem>
						<ListItem>
							/lib – konfigurace Supabase klienta a helper funkce
						</ListItem>
						<ListItem>/api – API routes Next.js pro backend logiku.</ListItem>
					</List>

					<Divider sx={{ my: 3 }} />

					{/* Instalace */}
					<Typography variant='h5' gutterBottom>
						Instalace a spuštění
					</Typography>
					<Typography variant='body1' paragraph>
						1. Naklonujte repozitář:
					</Typography>

					<Box
						component='pre'
						sx={{
							bgcolor: "#f5f5f5",
							p: 2,
							borderRadius: 2,
							fontSize: "0.9rem",
							overflowX: "auto",
						}}
					>
						<code>
							git clone https://github.com/username/jobboard.git
							<br />
							cd jobboard
						</code>
					</Box>
					<Button variant='contained' onClick={handleBack}>
						Zpět
					</Button>
				</Paper>
			</Box>
		</>
	);
}
