import { Job } from "@/types/job";

// Zkopíruj filterFns a applyFilters z JobsFilter.ts (nebo je exportuj)
const filterFns = {
  jobName: (job: Job, value: string) =>
    job.title.toLowerCase().includes(value.toLowerCase()),
  category: (job: Job, value: string) => job.category === value,
  location: (job: Job, value: string) => job.location === value,
  salary: (job: Job, value: string) => !value || Number(job.salary?.toString()) >= Number(value),
  full: (job: Job, value: boolean) => !value || job.Attendance === "Full",
  part: (job: Job, value: boolean) => !value || job.Attendance === "partTime",
  remote: (job: Job, value: boolean) => !value || job.Attendance === "HomeOffice",
  hybrid: (job: Job, value: boolean) => !value || job.Attendance === "Hybrid",
} as const;

function applyFilters<T, Fns extends Record<string, (item: T, value: any) => boolean>>(
  items: T[],
  filters: Partial<{ [K in keyof Fns]: Parameters<Fns[K]>[1] }>,
  filterFns: Fns
): T[] {
  return items.filter((item) =>
    (Object.entries(filters) as [keyof Fns, Parameters<Fns[keyof Fns]>[1]][]).every(
      ([key, value]) =>
        value === undefined || value === null || value === ""
          ? true
          : filterFns[key](item, value)
    )
  );
}
const salary: string = String(50000);
describe("applyFilters", () => {
  const jobs: Job[] = [
    {
        id: "1",
        title: "Frontend Developer",
        category: "IT",
        location: "Praha",
        salary: String(50000),
        Attendance: "Full",
        description: "",
        companyid: "",
        createdat: new Date()
    },
    {
      id: "2",
      title: "Backend Developer",
      category: "IT",
      location: "Brno",
      salary: String(40000),
      Attendance: "partTime",
      description: "",
      companyid: "",
      createdat: new Date()
    },
  ];

  it("filtruje podle názvu", () => {
    const result = applyFilters(jobs, { jobName: "front" }, filterFns);
    expect(result).toHaveLength(1);
    expect(result[0].title).toBe("Frontend Developer");
  });

  it("filtruje podle platu", () => {
    const result = applyFilters(jobs, { salary: "45000" }, filterFns);
    expect(result).toHaveLength(1);
    expect(result[0].title).toBe("Frontend Developer");
  });

  it("filtruje podle typu úvazku", () => {
    const result = applyFilters(jobs, { part: true }, filterFns);
    expect(result).toHaveLength(1);
    expect(result[0].Attendance).toBe("partTime");
  });
});