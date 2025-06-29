import { Box, Typography } from "@mui/material";

export default function UserDetailBox({ user, aboutHtml }: { user: any, aboutHtml: string }) {
    return (
        <Box p={5}>
            <Typography>ID: {user?.id}</Typography>
            <Typography>Name: {user?.name}</Typography>
            <Typography>Email: {user?.email}</Typography>
            <Typography>Role: {user?.role}</Typography>
            <Typography>Phone: {user?.Phone}</Typography>
            <Typography>
                Profil vytvořen:{" "}
                {user?.created_at
                    ? new Date(user.created_at).toLocaleDateString("cs-CZ")
                    : ""}
            </Typography>
            {aboutHtml && (
                <Box mt={2} sx={{ maxWidth: "50%" ,border: "1px solid #ccc", padding: "10px", borderRadius: "5px", boxShadow:2}}>
                    <Typography variant='h6'>O uživateli:</Typography>
                    <div className='rich-content' dangerouslySetInnerHTML={{ __html: aboutHtml }} />
                </Box>
            )}
        </Box>
    );
}