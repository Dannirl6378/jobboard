"use client";
import { useAppStore } from "@/store/useAppStore";
import { fetchDeleteJob } from "@/lib/api";

const AdminDeleteJob = async (jobId: string) => {
	if (!jobId) return { success: false, message: "Neplatné ID" };

	try {
		await fetchDeleteJob(jobId);
		const companyJobs = Object.values(useAppStore.getState().jobs);
		const updatedJobs = companyJobs.filter((job) => job.id !== jobId);
		useAppStore.getState().setJobs(updatedJobs);

		console.log("Job deleted successfully");
		return {
			success: true,
			message: "Pracovní nabídka byla úspěšně smazána.",
		};
	} catch (error) {
		console.error("Error deleting job:", error);
		return {
			success: false,
			message: "Chyba při mazání pracovní nabídky.",
		};
	}
};

export default AdminDeleteJob;
