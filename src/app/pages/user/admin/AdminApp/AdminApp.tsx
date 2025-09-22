"use client";
import { useAppStore } from "@/app/hook/useAppStore";
import { useEffect, useState } from "react";
import { Job } from "@/types/job";
import { sanitizeHtml } from "@/lib/sanitizeHTML";
import { AdminDeleteUser } from "../AdminDeleteUser/AdminDeleteUser";
import AdminDeleteJob from "../AdminDeleteJob/AdminDeleteJob";

export default function AdminApp() {
	const [companyJobs, setCompanyJobs] = useState<Job[]>([]);
	const [aboutHtml, setAboutHtml] = useState<string>("");
	const [isCreateEnable, setIsCreateEnable] = useState<boolean>(false);
	const [createJob, setCreateJob] = useState<boolean>(false);
	const [editJob, setEditJob] = useState<boolean>(false);
	const [selectedJobId, setSelectedJobId] = useState<string[]>([]);
	const [editUserOpen, setEditUserOpen] = useState<boolean>(false);
	const [editJobsOpen, setEditJobsOpen] = useState<boolean>(false);
	const [editJobError, setEditJobError] = useState<boolean>(false);
	const [editDialogJobOpen, setEditDialogJobOpen] = useState<boolean>(false);
	const [showSwitch, setShowSwitch] = useState<boolean>(false);
	const [showEnd, setShowEnd] = useState<boolean>(false);
	const [deleteDemoChecked, setDeleteDemoChecked] = useState(false);
	const [hasSearched, setHasSearched] = useState<boolean>(false);
	const [companyDatatApp, setCompanyDatatApp] = useState<any[]>([]);
	const [deleteStatus, setDeleteStatus] = useState<null | {
		success: boolean;
		message: string;
	}>(null);
	const setSelectedJobsId = useAppStore((state) => state.setSelectedJobId);
	const selectedUserData = useAppStore((state) => state.selectedUserData);
	const jobsArray = Object.values(useAppStore((state) => state.jobs));
	const getUserById = useAppStore((state) => state.getUserById);
	const applicationsArray = Object.values(
		useAppStore((state) => state.applications)
	);
	const usersArray = Object.values(useAppStore((state) => state.users));
	const LoginUser = useAppStore((state) => state.LogIn);

	useEffect(() => {
		if (LoginUser?.name === "Master Admin") {
			setShowSwitch(true);
		}
	}, [LoginUser]);

	const toggleAllJobs = () => {
		if (selectedJobId.length === companyJobs.length) {
			setSelectedJobId([]); // vše zruší
		} else {
			setSelectedJobId(companyJobs.map((job) => job.id)); // vše vybere
		}
	};

	const handleDelete = async (id: string) => {
		const result = await AdminDeleteUser(id);
		setDeleteStatus(result);
		if (result.success) {
			// Optionally, you can reset the selected user data or perform other actions
			useAppStore.getState().setSelectedUserData(null);
		}
	};
	const handleDeleteJob = async () => {
		for (const jobId of selectedJobId) {
			const result = await AdminDeleteJob(jobId);
		}
		setSelectedJobId([]);
	};

	const handleCheckboxChange = (jobId: string) => {
		setSelectedJobId(
			(prev) =>
				prev.includes(jobId)
					? prev.filter((id) => id !== jobId) // odškrtnutí
					: [...prev, jobId] // zaškrtnutí
		);
	};

	const handleEditJobs = () => {
		if (selectedJobId.length !== 1) {
			setEditJobError(true);
			setEditJobsOpen(true);
			setEditJob(true);
			return;
		}
		setSelectedJobsId(selectedJobId[0]);
		setEditJobsOpen(true);
	};

	const handleEnd = () => {
		useAppStore.getState().setSelectedUserData(null);
		setIsCreateEnable(false);
		setDeleteStatus(null);
		setAboutHtml("");
		setShowEnd(false);
	};

	useEffect(() => {
		if (selectedUserData?.about) {
			sanitizeHtml(selectedUserData.about).then(setAboutHtml);
		} else {
			setAboutHtml("");
		}
	}, [selectedUserData?.about]);

	useEffect(() => {
		if (selectedUserData?.role === "COMPANY") {
			const Jobs = jobsArray.filter(
				(job) => job.companyid === selectedUserData?.id
			);
			setCompanyJobs(Jobs);
		}
		if (selectedUserData !== null) {
			setShowEnd(true);
		}
	}, [selectedUserData]);

	const jobsCompany = jobsArray.filter(
		(app) => app.companyid === selectedUserData?.id
	);
	const jobsIdCompany = jobsCompany.map((job) => job.id);

	const getApplicantsForJob = () => {
		return applicationsArray
			.filter((app) => app.userid === selectedUserData?.id)
			.map((application) => {
				const job = jobsArray.find((job) => job.id === application.jobid);
				return job ? { ...application, JobTitle: job.title } : null;
			})
			.filter(Boolean);
	};
	const handleCreateOpenJob = () => {
		setCreateJob(true);
	};

	const applicationJob = getApplicantsForJob();

	useEffect(() => {
		if (selectedUserData?.role === "COMPANY") {
			const jobsCompany = jobsArray.filter(
				(app) => app.companyid === selectedUserData?.id
			);
			//const jobsIdCompany = jobsCompany.map((job) => job.id);
			const jobsFromApplications = [
				...new Map(
					applicationsArray
						.map((app) => jobsCompany.find((job) => job.id === app?.jobid))
						.filter(Boolean)
						.map((job) => [job?.id, job])
				).values(),
			];

			setCompanyDatatApp(jobsFromApplications);
		}
	}, [selectedUserData]);

	const jobsFromApplications = [
		...new Map(
			applicationsArray
				.map((app) => jobsArray.find((job) => job.id === app?.jobid))
				.filter(Boolean)
				.map((job) => [job?.id, job])
		).values(),
	];

	const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setDeleteDemoChecked(event.target.checked);
	};

	const handleConfirmDeleteDemo = async () => {
		if (!deleteDemoChecked) {
			alert("Musíš nejdřív zapnout přepínač");
			return;
		}
		for (const job of jobsArray) {
			if (job.isDemo) {
				await AdminDeleteJob(job.id);
			}
		}
		for (const user of usersArray) {
			if (user.isDemo) {
				await AdminDeleteUser(user.id);
			}
		}

	};
	return {
		state: {
			companyJobs,
			aboutHtml,
			isCreateEnable,
			createJob,
			selectedJobId,
			editUserOpen,
			editJobsOpen,
			editJobError,
			editDialogJobOpen,
			showSwitch,
			showEnd,
			deleteDemoChecked,
			hasSearched,
			companyDatatApp,
			deleteStatus,
			LoginUser,
			selectedUserData,
			jobsFromApplications,
			jobsArray,
			applicationsArray,
			applicationJob,
		},
		actions: {
			setIsCreateEnable,
			setCreateJob,
			setEditUserOpen,
			setEditJobsOpen,
			setEditJobError,
			setEditDialogJobOpen,
			setShowEnd,
			setHasSearched,
			setDeleteStatus,
			toggleAllJobs,
			handleDelete,
			handleDeleteJob,
			handleCheckboxChange,
			handleEditJobs,
			handleEnd,
			handleCreateOpenJob,
			handleSwitchChange,
			handleConfirmDeleteDemo,
			getUserById,
		},
	};
}
