/*
import { useAppStore } from "@/app/hook/useAppStore";

const selectJob = (jobid: string) => {
	const usersArray = Object.values(useAppStore((state) => state.users));
	const jobsArray = Object.values(useAppStore((state) => state.jobs));

	const getCompany = () =>
		usersArray?.find((user) => user.name === LogInFirm.name);

	const getCompanyJobs = (companyid: string) =>
		jobsArray.filter((job) => job.companyid === companyid);

	const company = getCompany();
	const companyJobs = company ? getCompanyJobs(company.id) : [];
	const Job = companyJobs.find((job) => job.id === jobid);
	return Job;
};
export default selectJob;
*/