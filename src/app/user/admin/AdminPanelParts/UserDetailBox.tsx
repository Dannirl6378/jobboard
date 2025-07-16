import { Box, Typography } from "@mui/material";

export default function UserDetailBox({
	user,
	aboutHtml,
}: {
	user: any;
	aboutHtml: string;
}) {
	return (
		<Box
			sx={{
				p: { xs: 2, md: 4 },
				bgcolor: "#f5f7fa",
				borderRadius: 3,
				boxShadow: 3,
				fontFamily: "Montserrat, Arial, sans-serif",
				mb: 3,
				maxWidth: 500,
				mx: "auto",
			}}
		>
			<Typography
				variant='h6'
				sx={{
					fontWeight: "bold",
					color: "#1976d2",
					mb: 2,
					fontFamily: "Montserrat, Arial, sans-serif",
				}}
			>
				Detail uživatele
			</Typography>
			<Typography sx={{ color: "#222", mb: 0.5 }}>
				<b>ID:</b> {user?.id}
			</Typography>
			<Typography sx={{ color: "#222", mb: 0.5 }}>
				<b>Jméno:</b> {user?.name}
			</Typography>
			<Typography sx={{ color: "#222", mb: 0.5 }}>
				<b>Email:</b> {user?.email}
			</Typography>
			<Typography sx={{ color: "#388e3c", mb: 0.5 }}>
				<b>Role:</b> {user?.role}
			</Typography>
			<Typography sx={{ color: "#222", mb: 0.5 }}>
				<b>Telefon:</b> {user?.Phone}
			</Typography>
			<Typography sx={{ color: "#222", mb: 1 }}>
				<b>Profil vytvořen:</b>{" "}
				{user?.created_at
					? new Date(user.created_at).toLocaleDateString("cs-CZ")
					: ""}
			</Typography>
			{aboutHtml && (
				<Box
					mt={2}
					sx={{
						maxWidth: "100%",
						border: "1px solid #cee5fd",
						padding: "14px",
						borderRadius: "8px",
						boxShadow: 2,
						bgcolor: "#e3fcec",
					}}
				>
					<Typography
						variant='subtitle1'
						sx={{
							fontWeight: "bold",
							color: "#1976d2",
							mb: 1,
							fontFamily: "Montserrat, Arial, sans-serif",
						}}
					>
						O uživateli:
					</Typography>
					<div
						className='rich-content'
						style={{
							color: "#222",
							fontFamily: "Montserrat, Arial, sans-serif",
						}}
						dangerouslySetInnerHTML={{ __html: aboutHtml }}
					/>
				</Box>
			)}
		</Box>
	);
}
