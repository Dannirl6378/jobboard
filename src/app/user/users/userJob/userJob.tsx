import { fetchApplication } from "@/lib/api";
import { useAppStore } from "@/store/useAppStore";
import { User } from "@/types/user";

export const getUserJob = async () => {
	// Získání ID uživatele z LogInUser
	// Předpokládáme, že LogInUser je objekt s informacemi o přihlášeném uživateli
	// a obsahuje id, name, email a role

	try {
		// Zavolání API pro získání dat
		const applications = await fetchApplication();
    const LogIn = useAppStore.getState().LogIn; // Získání přihlášeného uživatele z globálního stavu
	const job = useAppStore.getState().jobs; 
    console.log("applicationsUserJob", applications);
    console.log("LogInUserUserJob", LogIn);
	console.log("JobsUserJob", job);

		const userApplications = applications.filter(
			(app: { userid: string }) => app.userid === LogIn?.id
		);
    console.log("userApplications", userApplications);

		if (!userApplications) throw new Error("No application found for user");
		// Získání uživatele podle ID
		// Získání jobu podle ID aplikace

		return userApplications.map((app: any) => ({
			application: app,
			job: job[app.jobid],
		}));
	} catch (error) {
		console.error("Error fetching user job:", error);
		throw error; // Propagace chyby
	}
};
