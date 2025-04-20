import { fetchjobs } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { useAppStore } from "@/store/useAppStore";
import { useEffect } from "react";
import { List, ListItem } from "@mui/material";

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
        <List>
            {data?.map((job: { id: string; title: string }) => (
                <ListItem key={job.id} sx={{color:'#1f2937'}}>{job.title}</ListItem>
            ))}
        </List>
	);
};
export default JobPage;
