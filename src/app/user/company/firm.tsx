import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { LogInFirm } from '../../login/LogInUser';
import { useAppStore } from "@/store/useAppStore";
import HeaderMainPage from "@/components/HeaderMainPage";
import { log } from "console";

const Firm = () => {
    const usersArray = Object.values(useAppStore((state) => state.users));
    const jobsArray = Object.values(useAppStore((state) => state.jobs));
    const applicationsArray = Object.values(useAppStore((state) => state.applications));
  console.log("users", usersArray);
  console.log("applications", applicationsArray);
  console.log("jobs", jobsArray);

  // Ověření že users je pole
  const company = usersArray?.find((user) => user.name === LogInFirm.name)
    
    console.log("company", company);

  const companyJobs = jobsArray.filter((job) => job.companyid === company?.id);
console.log("companyJobs", companyJobs);
  // Výběr uchazečů na zákl. jobId
  const companyApplications = applicationsArray.filter((application) =>
    companyJobs.some((job) => job.id === application.jobid)
  );
  
        
      console.log("companyApplications", companyApplications);
      console.log("hledam id", company?.id,applicationsArray.map((app) => app.jobid));

  return (
    <Box>
      <HeaderMainPage />
      <Typography>Profil: {company?.name}</Typography>
      <Box>
        <Button>Výpis pracovnich nabídek</Button>
        <Button>Výpis uchazečů</Button>
        <Button>Přidat pracovní nabídku</Button>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
            justifyContent: "center",
            ml: "-25%",
            width: "150%",
          }}
        >
          <Typography>{/* Dynamický nadpis */}</Typography>
          {companyJobs?.map((job) => (
            <Box
              sx={{
                border: 0,
                boxShadow: 5,
                p: 2,
                bgcolor: "#EE8A59",
                opacity: 0.8,
                gap: 2,
              }}
              key={job.id}
            >
              <Typography variant="h4">{job.title}</Typography>
              <Typography variant="h5">{job.description}</Typography>
              <Button variant="contained">Upravit pracovní nabídku</Button>
              <Button variant="contained">Seznam uchazečů</Button>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Firm;
