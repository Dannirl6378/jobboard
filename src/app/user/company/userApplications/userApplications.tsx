import { useAppStore } from '@/store/useAppStore';
import { LogInFirm } from '@/app/login/LogInUser';
import { get } from 'http';
import { Box } from '@mui/material';




const userCompanyApplications = () => {
    const usersArray = Object.values(useAppStore((state) => state.users));
    const jobsArray = Object.values(useAppStore((state) => state.jobs));
    const applicationsArray = Object.values(useAppStore((state) => state.applications));
    
    // Ověření že users je pole
    const getCompany=() => usersArray?.find((user) => user.name === LogInFirm.name)
    const company = getCompany();
    
    const getCompanyJobs=(comapnyid:string) => jobsArray.filter((job) => job.companyid === company?.id);
    
    // Výběr uchazečů na zákl. jobId
    const getCompanyApplications=(companyJobs: any[]) => applicationsArray.filter((application) =>
        companyJobs.some((job) => job.id === application.jobid)
    );
    const companyJobs = company ? getCompanyJobs(company.id) : [];
  console.log("companyJobs", companyJobs);

  const companyApplications = getCompanyApplications(companyJobs);
  console.log("companyApplications", companyApplications);



  const getUserViaApplication = (applicationId: string) => {
    const application = companyApplications.find((application) => application.id === applicationId);
    if (application) {
      const user = usersArray.find((user) => user.id === application.userid);
      return user ? user.name : null;
    }
    return null;
  };
    console.log("companyApplications user IDs", companyApplications.map(application => application.userid));
    console.log("companyApplications user names", companyApplications.map(application => getUserViaApplication(application.id)));
    
    
const userViaApplication = companyApplications.map(application => getUserViaApplication(application.id));

    return (
    <Box>
        <h1>Uchazeči</h1>
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1,
                justifyContent: "center",
                ml: "-25%",
                width: "150%",
                border:1,
                borderColor: "gray",
                boxShadow: 5,
                p: 2,
                bgcolor: "#F5F5F5",
                opacity: 0.8,
                borderRadius: 2,
            }}
        >
            {userViaApplication.map((user, index) => (
                <div key={index}>{user}</div>
            ))}
        </Box>
    </Box>    
    );
}
export default userCompanyApplications;