"use client";
import { useAppStore } from "@/app/hook/useAppStore";
import { Job } from "@/types/job";
import { useEffect, useRef } from "react";

const filterFns = {
	jobName: (job: Job, value: string) =>
		job.title.toLowerCase().includes(value.toLowerCase()),
	category: (job: Job, value: string) => job.category === value,
	location: (job: Job, value: string) => job.location === value,
	salary: (job: Job, value: string) =>
		!value || Number(job.salary?.toString()) >= Number(value),

	full: (job: Job, value: boolean) => !value || job.Attendance === "Full",
	part: (job: Job, value: boolean) => !value || job.Attendance === "partTime",
	remote: (job: Job, value: boolean) =>
		!value || job.Attendance === "HomeOffice",
	hybrid: (job: Job, value: boolean) => !value || job.Attendance === "Hybrid",
} as const;

type Filter = {
	[K in keyof typeof filterFns]?: Parameters<(typeof filterFns)[K]>[1];
};

interface JobsFilterProps {
	filter: Filter;
	jobsArray: Job[];
}

function applyFilters<
	T,
	Fns extends Record<string, (item: T, value: any) => boolean>,
>(
	items: T[],
	filters: Partial<{ [K in keyof Fns]: Parameters<Fns[K]>[1] }>,
	filterFns: Fns
): T[] {
	return items.filter((item) =>
		(
			Object.entries(filters) as [keyof Fns, Parameters<Fns[keyof Fns]>[1]][]
		).every(([key, value]) =>
			value === undefined || value === null || value === ""
				? true
				: filterFns[key](item, value)
		)
	);
}

export default function JobsFilter({ filter, jobsArray }: JobsFilterProps) {
	const setFilteredJobs = useAppStore((state) => state.setFilteredJobs);
	const prevFilteredRef = useRef<Job[]>([]);

	useEffect(() => {
		const filtered = applyFilters(jobsArray, filter, filterFns);

		// jednoduchá kontrola, jestli se změnil obsah (porovnej délku a ID)
		const prev = prevFilteredRef.current;
		const isSame =
			prev.length === filtered.length &&
			prev.every((job, i) => job.id === filtered[i].id);

		if (!isSame) {
			setFilteredJobs(filtered);
			prevFilteredRef.current = filtered;
		}
	}, [filter, jobsArray, setFilteredJobs]);

	return null;
}
