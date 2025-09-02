import { User } from "@/types/user";
import { Button } from "@mui/material";

type Props ={
isLogin:User | null | undefined;
isRespondet:boolean;
handleApply:()=>void;
router:any;
};


export default function JobDetailReact({isLogin,isRespondet,handleApply,router}:Props){
    return(
        <>
        {/*ověřit */}
							{(isLogin?.role !== "COMPANY" && isLogin?.role !== "ADMIN" && !isRespondet) ? (
								<Button
									variant='contained'
									onClick={handleApply}
									sx={{
										bgcolor: "#1976d2",
										color: "#fff",
										fontWeight: "bold",
										fontFamily: "Montserrat, Arial, sans-serif",
										"&:hover": { bgcolor: "#1565c0" },
										px: 4,
										py: 1.5,
										borderRadius: 2,
										boxShadow: 2,
									}}
								>
									Odpovědět na nabídku
								</Button>
							) : (
								<Button
									variant='outlined'
									onClick={() => router.back()}
									sx={{
										bgcolor: "#43a047",
										color: "#fff",
										fontWeight: "bold",
										fontFamily: "Montserrat, Arial, sans-serif",
										"&:hover": { bgcolor: "#2e7031" },
										px: 4,
										py: 1.5,
										borderRadius: 2,
									}}
								>
									Zpět
								</Button>
							)}
        </>
    )
}