import { Box, Button } from "@mui/material";


interface Props {
    isEnable:boolean;
    loading:boolean;
    handleSave:()=>void;
    setIsEnable:React.Dispatch<React.SetStateAction<boolean>>;
}

export default function NoLogUserEdit({isEnable,loading,handleSave,setIsEnable}:Props) {
    return(
        <>
        <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
					{!isEnable && (
						<Button
							variant='outlined'
							onClick={() => setIsEnable(true)}
							disabled={loading}
							sx={{
								color: "#1976d2",
								borderColor: "#1976d2",
								fontWeight: "700",
								px: 4,
								"&:hover": { borderColor: "#1565c0", color: "#1565c0" },
							}}
						>
							Upravit
						</Button>
					)}
					<Button
						variant='contained'
						color='success'
						onClick={handleSave}
						disabled={loading || !isEnable}
						sx={{ fontWeight: "700", px: 4 }}
					>
						{loading ? "Odesílám..." : "Přihlásit se"}
					</Button>
				</Box>
        </>
    )
}