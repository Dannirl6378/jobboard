import { User } from "@/types/user";
import { Job } from "@/types/job";
import { useAppStore } from './useAppStore';

const LogIn = () => useAppStore.getState().LogIn;

export const fetchUsers = async () => {
	const res = await fetch("/api/user/getUsers"); // Volání našeho API
	if (!res.ok) {
		throw new Error("Failed to fetch users");
	}
	return res.json(); // Vrátíme data jako JSON
};

export const fetchjobs = async () => {
	const res = await fetch("/api/job/getJob"); // Volání našeho API
	if (!res.ok) {
		throw new Error("Failed to fetch jobs");
	}
	return res.json(); // Vrátíme data jako JSON
};

export const fetchApplication = async () => {
	const res = await fetch("/api/application/getApplication"); // Volání našeho API
	if (!res.ok) {
		throw new Error("Failed to fetch users");
	}
	return res.json(); // Vrátíme data jako JSON
};

export const fetchUserByEmail = async (email: string) => {
	const response = await fetch("/api/user/findByEmail", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ email }),
	});
	if (!response.ok) throw new Error("User not found");
	return await response.json();
};

export const fetchCreateApplication = async (userid: string, jobid: string) => {
	const response = await fetch(`/api/application/createApplication`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ userid, jobid }),
	});
	console.log("response", response);
	// Check if the response is ok (status in the range 200-299)
	if (!response.ok) {
		throw new Error("Failed to update User");
	}

	const updatedJob = await response.json();
	return updatedJob;
};

export const fetchCreateUser = async (updateData: Partial<User>) => {
	const response = await fetch(`/api/user/generateUser`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(updateData),
	});
	console.log("response", response);
	// Check if the response is ok (status in the range 200-299)
	if (!response.ok) {
		throw new Error("Failed to update User");
	}
	const User = await response.json();
	return User;
};

export const fetchUpdateUser = async (
	id: string,
	updateData: Partial<User>
) => {
	const response = await fetch(`/api/user/editUser/${id}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(updateData),
	});
	console.log("response", response);
	// Check if the response is ok (status in the range 200-299)
	if (!response.ok) {
		throw new Error("Failed to update User");
	}
	const updatedJob = await response.json();
	return updatedJob;
};

export const fetchCreateJob = async (jobData: {
	title: string;
	description: string;
	location: string;
	salary: string;
	category: string;
	companyid: string;
	Attendance: string;
}) => {
	const response = await fetch("/api/job/addJob", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(jobData),
	});
	if (!response.ok) {
		throw new Error("Failed to create job");
	}
	return await response.json();
};

export const fetchDeleteUser = async (userid: string) => {
	try {
		const res = await fetch(`/api/user/deleteUser/${userid}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
		});
		if (!res.ok) {
			const errorData = await res.json();
			throw new Error(errorData.error || "Failed to delete");
		}
		const deleted = await res.json();
		console.log("Deleted:", deleted);
	} catch (err) {
		console.error("Error deleting job:", err);
	}
};

export const fetchDeleteJob = async (jobId: string) => {
	
	try {
		const login = LogIn();
		const res = await fetch(`/api/job/deleteJob/${jobId}`, {
			method: "DELETE",
			headers: {
				"x-company-id": LogIn()?.id ||"",
				"x-role": login?.role || "", 
			},
		});

		if (!res.ok) {
			const errorData = await res.json();
			throw new Error(errorData.error || "Failed to delete");
		}

		const deleted = await res.json();
		console.log("Deleted:", deleted);
	} catch (err) {
		console.error("Error deleting job:", err);
	}
};

export const fetchUpdateJob = async (
	jobId: string,
	updateData: Partial<Job>
) => {
	const response = await fetch(`/api/job/editJob/${jobId}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(updateData),
	});
	console.log("response", response);
	// Check if the response is ok (status in the range 200-299)
	if (!response.ok) {
		throw new Error("Failed to update job");
	}

	const updatedJob = await response.json();
	return updatedJob;
};
