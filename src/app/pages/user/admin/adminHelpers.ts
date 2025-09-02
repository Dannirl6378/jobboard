export const getUsersForJob = (jobId: string, applicationsArray: any[], getUserById: (id: string) => any) => {
    const applicants = applicationsArray.filter((app) => app.jobid === jobId);
    return applicants
        .map((app) => getUserById(app.userid))
        .filter(Boolean);
};

export const getCopanyNameJobFormApplication = (jobId: string, jobsArray: any[], getUserById: (id: string) => any) => {
    const job = jobsArray.find((job) => job.id === jobId);
    if (job) {
        const company = getUserById(job.companyid);
        return company || null;
    }
    return null;
};