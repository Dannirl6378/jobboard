import { fetchApplication } from "@/lib/api";
import { useAppStore } from "@/store/useAppStore";
import { LogInUser } from "../login/LogInUser";

export const getUserJob = async () => {
    // Získání ID uživatele z LogInUser
  // Předpokládáme, že LogInUser je objekt s informacemi o přihlášeném uživateli
  // a obsahuje id, name, email a role
  const userTest: { id: string; name: string; email: string; role: string } = {
    id: LogInUser.id,
    name: LogInUser.name,
    email: LogInUser.email,
    role: LogInUser.role,
  };


  try {
    // Zavolání API pro získání dat
    const applications = await fetchApplication();

    const userApplication = applications.find(
        (app: { userid: string; }) => app.userid === userTest.id
      );

      if (!userApplication) throw new Error("No application found for user");
    // Získání uživatele podle ID
    const job = useAppStore.getState().getJobById(userApplication.jobid); // Získání jobu podle ID aplikace

    return {userApplication, userTest, job }; // Vrácení dat
  } catch (error) {
    console.error("Error fetching user job:", error);
    throw error; // Propagace chyby
  }
};