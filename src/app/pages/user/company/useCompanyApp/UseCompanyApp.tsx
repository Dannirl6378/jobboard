"use client"
import { useAppStore } from "@/app/hook/useAppStore";
import { useRouter } from "next/navigation";
import { sanitizeHtml } from "@/lib/sanitizeHTML";
import { fetchDeleteJob } from "@/app/hook/api";
import { useEffect, useMemo, useState } from "react";




export default function UserCompany() {
const router = useRouter();
	const [openApplicantsJobId, setOpenApplicantsJobId] = useState<string | null>(
		null
	);
	const [sanitizedDescriptions, setSanitizedDescriptions] = useState<
		Record<string, string>
	>({});

	const setSelectedUserId = useAppStore((state) => state.setSelectedUserId);
	const setSelectedJobId = useAppStore((state) => state.setSelectedJobId);
	const logIn = useAppStore((state) => state.LogIn);
	const usersArray = Object.values(useAppStore((state) => state.users));
	//const jobsArray = Object.values(useAppStore((state) => state.jobs));
	const applicationsArray = Object.values(
		useAppStore((state) => state.applications)
	);
	const jobs = useAppStore((state) => state.jobs);
	const jobsArray = useMemo(() => Object.values(jobs), [jobs]);

	// Ověření že users je pole
	const getCompany = () =>
		usersArray?.find((user) => user.name === logIn?.name);

	const getCompanyJobs = (companyid: string) =>
		jobsArray.filter((job) => job.companyid === companyid);

	// Výběr uchazečů na zákl. jobId
	/*const getCompanyApplications = (companyJobs: any[]) =>
		applicationsArray.filter((application) =>
			companyJobs.some((job) => job.id === application.jobid)
		);*/

	const company = getCompany();

	const companyJobs = useMemo(
		() => (company ? getCompanyJobs(company.id) : []),
		[company, jobsArray]
	);

	//const companyApplications = getCompanyApplications(companyJobs);

	const applicantsByJobId = useMemo(() => {
		const result: Record<string, any[]> = {};

		for (const job of companyJobs) {
			const applicants = applicationsArray
				.filter((app) => {
					const match = app.jobid === job.id;

					return match;
				})
				.map((application) => {
					const user = usersArray.find(
						(user) => user.id === application.userid
					);
					if (user) {
					}
					return user ? { ...user, applicationId: application.id } : null;
				})
				.filter(Boolean);

			result[job.id] = applicants;
		}
		return result;
	}, [companyJobs, applicationsArray, usersArray]);

	const handleEditWorkOffer = (jobId: string) => {
		setSelectedJobId(jobId);
		router.push(`/pages/user/company/workOffers/editWorkOffer`);
	};
	const handleAddWorkOffer = () => {
		router.push(`/pages/user/company/workOffers/addWorkOffer`);
	};
	const handleEditUser = () => {
		router.push(`/pages/user/users/userAppProfil`);
	};

	const handleWiewUserProfile = (userId: string) => {
		setSelectedUserId(userId);
		router.push(`/pages/user/users/userAppProfil/`);
	};

	useEffect(() => {
		const fetchSanitizedDescriptions = async () => {
			const descs: Record<string, string> = {};
			for (const job of companyJobs) {
				const shortDesc =
					job.description.length > 25
						? job.description.slice(0, 25) + "..."
						: job.description;
				descs[job.id] = await sanitizeHtml(shortDesc);
			}
			setSanitizedDescriptions(descs);
		};
		fetchSanitizedDescriptions();
	}, [companyJobs]);

	const handleDelete = (jobId: string) => {
		if (!jobId) return;
		const updatedJobs = companyJobs.filter((job) => job.id !== jobId);
		useAppStore.getState().setJobs(updatedJobs);
		fetchDeleteJob(jobId)
			.then(() => {
				alert("Pracovní nabídka byla úspěšně smazána.");
			})
			.catch((error) => {
				console.error("Error deleting job:", error);
				alert("Chyba při mazání pracovní nabídky.");
			});
	};
    return{
        state:{
            openApplicantsJobId,
            sanitizedDescriptions,
            company,
            companyJobs,
            applicantsByJobId
        },
        actions:{
            setOpenApplicantsJobId,
            handleEditWorkOffer,
            handleAddWorkOffer,
            handleEditUser,
            handleWiewUserProfile,
            handleDelete
        }
    }
}