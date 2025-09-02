"use client"
import { fetchUpdateUser, fetchCreateApplication } from "@/app/hook/api";
import { useAppStore } from "@/app/hook/useAppStore";
import { useState, useEffect } from "react";


export default function UserLoginApp(){
    const [isEnable, setIsEnable] = useState(false);
	const [openSnackbar, setOpenSnackbar] = useState(false);
	const [openDialog, setOpenDialog] = useState(false);


	const user = useAppStore((state) => state.LogIn);
	const users = useAppStore((state) => state.users);
	const selectedUserId = useAppStore((state) => state.selectedUserId);
	const selectedJobId = useAppStore((state) => state.selectedJobId);

	const dataUser = selectedUserId ? users[selectedUserId] : user;

	const [name, setName] = useState(dataUser?.name || "");
	const [email, setEmail] = useState(dataUser?.email || "");
	const [phone, setPhone] = useState(dataUser?.Phone || "");
	const [about, setAbout] = useState(dataUser?.CoverLetter || "");

	useEffect(() => {
		setName(dataUser?.name || "");
		setEmail(dataUser?.email || "");
		setPhone(dataUser?.Phone || "");
		setAbout(dataUser?.CoverLetter || "");
	}, [dataUser]);

	const handleEdit = () => setIsEnable(true);

	const handleSave = async () => {
		setIsEnable(false);
		if (!dataUser?.id) return;

		try {
			await fetchUpdateUser(dataUser.id, {
				name,
				email,
				Phone: phone,
				CoverLetter: about,
			});
			setOpenSnackbar(true);
		} catch (error) {
			console.error("Chyba při ukládání:", error);
		}
	};

	const handleApply = async () => {
		if (!dataUser?.id || !selectedJobId) return;
		try {
			await fetchCreateApplication(dataUser.id, selectedJobId);
			setOpenSnackbar(true);
			setOpenDialog(true);
		} catch (error) {
			console.error("Chyba při přihlášení na pozici:", error);
		}
	};

    return{
        state:{name,email,phone,about,isEnable,openSnackbar,openDialog,dataUser},
        actions:{handleApply,handleEdit,handleSave,setIsEnable,setOpenDialog,setOpenSnackbar,setName,setEmail,setPhone,setAbout},
    }
}