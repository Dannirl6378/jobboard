"use client"
import { fetchUsers } from "@/app/hook/api";
import { useAppStore } from "@/app/hook/useAppStore";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";




export default function LoginApp(){
    const [chooseUser, setChooseUser] = useState(false);
	const [chooseCompany, setChooseCompany] = useState(false);
	const [openMasterLogin, setOpenMasterLogin] = useState(false);

	const { data, error, isLoading } = useQuery({
		queryKey: ["users"],
		queryFn: fetchUsers,
	});
	const setLogIn = useAppStore((state) => state.setLogIn);
	const setUsers = useAppStore((state) => state.setUsers);

	const router = useRouter();

	useEffect(() => {
		if (data) {
			setUsers(data); 
		}
	}, [data, setUsers]);
	const usersArray = Object.values(useAppStore((state) => state.users));

	const handleLogin = (userType: string) => {
		const user = usersArray?.find((user) => user.email === userType);
		console.log("userLogIn", user);
		if (user) {
			setLogIn(user);
			router.push("/");
		}
	};
	const roleUsers = usersArray?.filter((user) => user.role === "USER");
	

	const roleCompany = usersArray?.filter((user) => user.role === "COMPANY");
	
    return{
        state:{roleUsers,roleCompany,chooseUser,chooseCompany,openMasterLogin,isLoading,error},
        actions:{handleLogin,setChooseCompany,setChooseUser,setOpenMasterLogin}

    }
}