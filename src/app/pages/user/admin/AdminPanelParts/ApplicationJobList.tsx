import { Box, ListItem, Typography, List,} from "@mui/material";
import { getCopanyNameJobFormApplication, getUsersForJob } from '../adminHelpers';
import ToolTip from "@mui/material/Tooltip";

interface ApplicationJobListProps {
    selectedUserData: any,
    jobsFromApplications: any[],
    applicationsArray: any[],
    applicationJob: any[],
    jobsArray: any[],
    getUserById: (id: string) => any,
}

export default function ApplicationJobList({
    selectedUserData,
    jobsFromApplications,
    applicationsArray,
    applicationJob,
    jobsArray,
    getUserById,
}: ApplicationJobListProps) {
    return (
        <Box
            sx={{
                mt: 3,
                bgcolor: "#f5f7fa",
                borderRadius: 3,
                boxShadow: 2,
                p: 3,
                fontFamily: "Montserrat, Arial, sans-serif",
                maxWidth: 600,
                mx: "auto",
            }}
        >
            <Typography
                variant="h6"
                sx={{
                    fontWeight: "bold",
                    color: "#1976d2",
                    mb: 2,
                    fontFamily: "Montserrat, Arial, sans-serif",
                }}
            >
                {selectedUserData?.role === "COMPANY"
                    ? "Přihlášky na pracovní pozice"
                    : "Moje přihlášky"}
            </Typography>
            <List>
                {selectedUserData?.role === "COMPANY"
                    ? jobsFromApplications.map((job) => (
                        <ListItem
                            key={job?.id}
                            sx={{
                                bgcolor: "#e3fcec",
                                borderRadius: 2,
                                boxShadow: 1,
                                mb: 1,
                                transition: "box-shadow 0.2s, transform 0.2s",
                                "&:hover": {
                                    boxShadow: 4,
                                    bgcolor: "#b2f2d7",
                                    transform: "scale(1.01)",
                                },
                                fontFamily: "Montserrat, Arial, sans-serif",
                            }}
                        >
                            <ToolTip
                                title={(() => {
                                    const users = getUsersForJob(job?.id ?? "", applicationsArray, getUserById);
                                    return users.length > 0 ? (
                                        <Box sx={{ bgcolor: "#ffffffa1", p: 2, borderRadius: 1 }}>
                                            {users.map((user) => (
                                                <Box key={user?.id}>
                                                    <Typography sx={{ color: "#1976d2", fontWeight: "bold" }}>
                                                        Jméno: <span style={{ color: "#222" }}>{user?.name ?? ""}</span>
                                                    </Typography>
                                                    <Typography sx={{ color: "#19611cff" }}>
                                                        Email: <span style={{ color: "#222" }}>{user?.email ?? ""}</span>
                                                    </Typography>
                                                </Box>
                                            ))}
                                        </Box>
                                    ) : (
                                        "Žádný uchazeč"
                                    );
                                })()}
                                arrow
                            >
                                <Typography sx={{ fontWeight: "bold", color: "#1976d2" }}>
                                    {job?.title ?? ""}
                                </Typography>
                            </ToolTip>
                        </ListItem>
                    ))
                    : applicationJob.map((app) => (
                        <ListItem
                            key={app?.id}
                            sx={{
                                bgcolor: "#e3fcec",
                                borderRadius: 2,
                                boxShadow: 1,
                                mb: 1,
                                transition: "box-shadow 0.2s, transform 0.2s",
                                "&:hover": {
                                    boxShadow: 4,
                                    bgcolor: "#b2f2d7",
                                    transform: "scale(1.01)",
                                },
                                fontFamily: "Montserrat, Arial, sans-serif",
                            }}
                        >
                            <ToolTip
                                title={
                                    app && (() => {
                                        const company = getCopanyNameJobFormApplication(app.jobid, jobsArray, getUserById);
                                        if (company && typeof company === "object") {
                                            return (
                                                <Box sx={{ bgcolor: "#ffffffa1", p: 2, borderRadius: 1 }}>
                                                    <Typography sx={{ color: "#1976d2", fontWeight: "bold" }}>
                                                        Jméno: <span style={{ color: "#222" }}>{company.name ?? ""}</span>
                                                    </Typography>
                                                    <Typography sx={{ color: "#388e3c" }}>
                                                        Email: <span style={{ color: "#222" }}>{company.email ?? ""}</span>
                                                    </Typography>
                                                </Box>
                                            );
                                        }
                                        return "Žádná firma";
                                    })()
                                }
                                arrow
                            >
                                <Box>
                                    <Typography sx={{ fontWeight: "bold", color: "#1976d2" }}>
                                        {app?.JobTitle ?? ""}
                                    </Typography>
                                </Box>
                            </ToolTip>
                        </ListItem>
                    ))}
            </List>
        </Box>
    );
}