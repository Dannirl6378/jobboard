import { useState, useEffect, useRef } from "react";
import { useAppStore } from "@/app/hook/useAppStore";
import { sanitizeHtml } from "@/lib/sanitizeHTML";
import { fetchUpdateUser } from "@/app/hook/api";
import { User } from "@/types/user";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import  {Application}  from "@/types/application";


export default function useUserProfile() {
	const router = useRouter();
	const pathname = usePathname();
	const prevPath = useRef(pathname);
	const hasMounted = useRef(false);

	const [isEnable, setIsEnable] = useState(false);
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [phone, setPhone] = useState("");
	const [rePassword, setRePassword] = useState("");
	const [about, setAbout] = useState("");
	const [purifyAbout, setPurifyAbout] = useState("");
	const [purifyCoverLetter, setPurifyCoverLetter] = useState("");

	const [userApplications, setUserApplications] = useState<Application[]>([]);
	const [appliedJobs, setAppliedJobs] = useState<
		{
			application: { id: string; jobid: string };
			job?: { title?: string; id?: string };
		}[]
	>([]);
	const [mappedApplications, setMappedApplications] = useState<
		{ application: any; job: any | undefined }[]
	>([]);

	const LogIn = useAppStore((state) => state.LogIn);
	const jobs = useAppStore((state) => state.jobs);
	const applications = useAppStore((state) => state.applications);
	const setSelectedUserId = useAppStore((state) => state.setSelectedUserId);
	const selectedUserId = useAppStore((state) => state.selectedUserId);
	const users = useAppStore((state) => state.users);
	const userVsFirm = selectedUserId ? users[selectedUserId] : null;

	const profileUser = userVsFirm === null ? LogIn : userVsFirm;

	useEffect(() => {
		prevPath.current = pathname;
	}, [pathname]);

	useEffect(() => {
		if (!hasMounted.current) {
			hasMounted.current = true;
			return;
		}
		return () => {
			setSelectedUserId(null);
		};
	}, []);

	useEffect(() => {
		sanitizeHtml(about).then(setPurifyAbout);
		sanitizeHtml(purifyCoverLetter).then(setPurifyCoverLetter);
	}, [about, purifyCoverLetter]);

	useEffect(() => {
		console.log("Profile User changed:", profileUser);
		if (profileUser) {
			setName(profileUser.name || "");
			setEmail(profileUser.email || "");
			setPassword(profileUser.passwordHash || "");
			setAbout(profileUser.about || "");
			setPhone(profileUser.Phone || "");
			setPurifyCoverLetter(profileUser?.CoverLetter || "");
		}
	}, [profileUser]);

	useEffect(() => {
		if (
			!LogIn?.id ||
			Object.keys(jobs).length === 0 ||
			Object.keys(applications).length === 0
		) {
			return; // čekej, dokud nebude vše připravené
		}
		const filteredApps = Object.values(applications).filter(
			(app) => app.userid === LogIn.id
		);
		setUserApplications(filteredApps);
	}, [LogIn?.id, applications]);

	const isJobsReady = Object.keys(jobs).length > 0;
	const isUserApplicationsReady = userApplications.length > 0;

	useEffect(() => {
		if (!isJobsReady || !isUserApplicationsReady) {
			setMappedApplications([]);
			return;
		}

		const mapped = userApplications.map((app) => ({
			application: app,
			job: Object.values(jobs).find((job) => job.id === app.jobid), // může být undefined
		}));

		setMappedApplications(mapped);
	}, [userApplications, jobs]);

	useEffect(() => {
		if (mappedApplications.length === 0) {
			setAppliedJobs([]);
			return;
		}
		const filtered = mappedApplications.filter(
			(item) => item.job !== undefined
		);
		setAppliedJobs(filtered);
	}, [mappedApplications]);

	const handleEdit = () => {
		setIsEnable((prev) => !prev);
	};

	const handleUpdateUser = async (
		userid: string,
		updateData: Partial<User>
	) => {
		try {
			await fetchUpdateUser(userid, updateData);

			// Zde můžete přidat další logiku, např. aktualizaci stavu nebo přesměrování
		} catch (error) {
			console.error("Error updating job:", error);
			// Zde můžete přidat další logiku pro zpracování chyby
		}
	};

	const handleSaveChanges = async () => {
		const updateData = {
			name,
			email,
			password,
			about: about,
			Phone: phone,
		};
		if (LogIn?.id) {
			await handleUpdateUser(LogIn.id, updateData);
			setIsEnable(false);
		} else {
			console.error("User ID is undefined. Cannot update user.");
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

	const handleBack = () => {
		router.back(); // Použití useNavigate pro přesměrování
	};


    return {
    state: { 
    isEnable, 
    name, 
    email, 
    password, 
    phone, 
    rePassword, 
    about, 
    purifyAbout, 
    purifyCoverLetter, 
    appliedJobs, 
    LogIn, 
    userVsFirm, 
    profileUser,
    isValidPhone 
  }, actions: { 
    setName, 
    setEmail, 
    setPassword, 
    setRePassword, 
    setAbout, 
    handlePhoneChange, 
    handleEdit, 
    handleSaveChanges, 
    handleBack 
  }
  };
}
