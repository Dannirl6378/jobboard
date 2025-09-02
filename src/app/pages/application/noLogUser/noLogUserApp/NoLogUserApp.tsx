"use client"
import { fetchCreateApplication, fetchCreateUser, fetchUserByEmail } from "@/app/hook/api";
import { useAppStore } from "@/app/hook/useAppStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";



export default function NoLogUserApp(){
    const selectedJobId = useAppStore((state) => state.selectedJobId);

	const [isEnable, setIsEnable] = useState(false);
	const [loading, setLoading] = useState(false);
	const [isCreated, setIsCreated] = useState(false);
	const [openDialog, setOpenDialog] = useState(false);

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [about, setAbout] = useState("");

	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");
	const router = useRouter();

	const handleSave = async () => {
		if (!name.trim() || !email.trim()) {
			setError("Jméno a email jsou povinné.");
			setSuccess("");
			return;
		}
		setLoading(true);
		setError("");
		setSuccess("");
		try {
			const updateData = {
				name,
				email,
				password: "",
				Phone: phone,
				about: about,
				CoverLetter: about,
				CV: "",
				role: "TEMPORAL" as const,
			};
			await fetchCreateUser(updateData);
			setSuccess("Uživatel byl úspěšně uložen.");
			setIsCreated(true);
			setIsEnable(false);
		} catch (error) {
			console.error("Nepovedlo se vytvořit tempUser:", error);
			setError("Chyba při ukládání uživatele.");
			setSuccess("");
		} finally {
			setLoading(false);
		}
	};
	useEffect(() => {
		if (isCreated) {
			handleApply();
		}
	}, [isCreated]);

	const handleApply = async () => {
		if (!email.trim()) {
			setError("Email je nutný pro podání přihlášky.");
			setSuccess("");
			return;
		}
		if (selectedJobId === null) {
			setError("Není vybrána žádná pracovní pozice.");
			setSuccess("");
			return;
		}

		setLoading(true);
		setError("");
		setSuccess("");
		try {
			const user = await fetchUserByEmail(email);
			if (!user?.id) {
				setError(
					"Uživatel s tímto emailem neexistuje, prosím nejdříve uložte profil."
				);
				setLoading(false);
				return;
			}
			const response = await fetchCreateApplication(user.id, selectedJobId);
			setSuccess("Přihláška byla úspěšně odeslána.");
			setOpenDialog(true);
		} catch (error) {
			console.error("Chyba při vytváření přihlášky:", error);
			setError("Nepodařilo se odeslat přihlášku.");
		} finally {
			setLoading(false);
		}
	};

	const phoneRegex = /^\+?[0-9]{9,15}$/; // + a 9-15 číslic bez mezer
	const isValidPhone = phoneRegex.test(phone);

	const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const input = e.target.value;
		// povolit pouze čísla a +
		if (/^[0-9+]*$/.test(input)) {
			setPhone(input);
		}
	};
    return{
        state:{isValidPhone,phone,name,email,about,isEnable,loading,openDialog,error,success,router},
        actions:{handleSave,setIsEnable,setName,setEmail,setAbout,setOpenDialog,handlePhoneChange,setPhone}
    }
}