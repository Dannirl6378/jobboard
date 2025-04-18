import { fetchjobs } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { useAppStore } from "@/store/useAppStore";
import { useEffect } from "react";

const JobPage = () => {
	const { data, error, isLoading } = useQuery({
		queryKey: ["jobs"],
		queryFn: fetchjobs,
	});

	useEffect(() => {
		if (data) {
			useAppStore.getState().setJobs(data);
		}
	}, [data]);
    //console pro oveřeni jobů
    console.log("Stored job example:", useAppStore.getState().getJobById("1fc055d8-33ee-4eb0-8d4d-e1f524042185"));

	if (isLoading) {
		return <div>Loading...</div>;
	}
	if (error instanceof Error) return <div>Error: {error.message}</div>;

	if (!data) {
		return <div>No jobs found</div>;
	}
	console.log(data);
	return (
		<div>
			<h1>Job List</h1>
			<ul>
				{data?.map((job: { id: string; title: string }) => (
					<li key={job.id}>{job.title}</li>
				))}
			</ul>
		</div>
	);
};
export default JobPage;
