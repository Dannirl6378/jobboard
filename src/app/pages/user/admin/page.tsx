"use client";
import { Box, Button, Typography } from "@mui/material";
import UserDetailBox from "./AdminPanelParts/UserDetailBox";
import HeaderMainPage from "@/components/HeaderMainPage";
import AdminSearchPanel from "./AdminSearchPanel/AdminSearchPanel";
import AdminCreateUser from "./AdminCreateUser/AdminCreateUser";
import ApplicationJobList from "./AdminPanelParts/ApplicationJobList";
import UserActionsPanel from "./AdminPanelParts/UserActionPanel";
import CompanyJobsPanel from "./AdminPanelParts/CompanyJobsPanel";
import AdminApp from "./AdminApp/AdminApp";
import AdminMaster from "./AdminMaster/AdminMaster";
import AdminJobDialog from "./AdminJobDialog/AdminJobDialog";

const AdminMainPage = () => {
	const {
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
			applicationJob,
			applicationsArray,
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
	} = AdminApp();

	return (
		<>
			{LoginUser?.role === "ADMIN" && (
				<>
					<HeaderMainPage />
					<Box
						sx={{
							minHeight: "100vh",
							bgcolor: "linear-gradient(135deg, #cee5fd 0%, #e3fcec 100%)",
							py: { xs: 2, md: 4 },
							px: { xs: 1, md: 4 },
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
						}}
					>
						<Box
							sx={{
								width: "100%",
								maxWidth: 950,
								bgcolor: "white",
								borderRadius: 3,
								boxShadow: 6,
								p: { xs: 2, md: 4 },
								mb: 4,
								fontFamily: "Montserrat, Arial, sans-serif",
							}}
						>
							<Box pt={2} pb={1}>
								<Typography
									variant='h3'
									sx={{
										fontWeight: "bold",
										color: "#1976d2",
										fontFamily: "Montserrat, Arial, sans-serif",
										letterSpacing: 1,
										mb: 1,
									}}
								>
									Admin Page
								</Typography>
								{showSwitch && (
									<AdminMaster
										deleteDemoChecked={deleteDemoChecked}
										handleSwitchChange={handleSwitchChange}
										handleConfirmDeleteDemo={handleConfirmDeleteDemo}
									/>
								)}
								<Typography sx={{ color: "#388e3c", fontWeight: 500, mb: 2 }}>
									Toto je admin stránka, kde můžeš spravovat uživatele a jejich
									data.
								</Typography>
							</Box>
							<Box sx={{ display: "flex", gap: 2, mb: 3, ml: "25%" }}>
								<Button
									variant='contained'
									sx={{
										bgcolor: "#1976d2",
										color: "#fff",
										fontWeight: "bold",
										fontFamily: "Montserrat, Arial, sans-serif",
										"&:hover": { bgcolor: "#1565c0" },
									}}
									onClick={() => setIsCreateEnable(true)}
								>
									Vytvoř Uživatele
								</Button>
							</Box>
							{isCreateEnable && (
								<Box
									sx={{
										zIndex: 10,
										position: "fixed",

										width: "100vw",
										height: "100vh",
										bgcolor: "rgba(0,0,0,0.15)",
										display: "flex",
										alignItems: "center",
										justifyContent: "center",
									}}
								>
									<Box
										sx={{
											bgcolor: "white",
											border: "2px solid #1976d2",
											borderRadius: 3,
											boxShadow: 10,
											p: 4,
											minWidth: 320,
											maxWidth: "95vw",
											fontFamily: "Montserrat, Arial, sans-serif",
											display: "flex",
											flexDirection: "column",
											alignItems: "center",
											gap: 2,
										}}
									>
										<AdminCreateUser />
										<Button
											variant='outlined'
											color='error'
											sx={{ mt: 2, fontWeight: "bold" }}
											onClick={() => setIsCreateEnable(false)}
										>
											Zavřít
										</Button>
									</Box>
								</Box>
							)}
							<Box sx={{ ml: "1%" }}>
								<AdminSearchPanel
									setShowEnd={setShowEnd}
									setHasSearched={setHasSearched}
								/>
							</Box>

							{showEnd && (
								<Box sx={{ mt: 3 }}>
									<Typography
										variant='h6'
										sx={{ color: "#1976d2", fontWeight: "bold", mb: 2 }}
									>
										Výsledky hledání:
									</Typography>
								</Box>
							)}
							<Box sx={{ mt: 3 }}>
								{selectedUserData ? (
									<Box>
										<Box
											sx={{
												p: 2,
												bgcolor: "#f5f7fa",
												borderRadius: 2,
												display: "flex",
												flexDirection: { xs: "column", md: "row" },
												gap: 2,
												alignItems: { xs: "stretch", md: "center" },
											}}
										>
											<UserDetailBox
												user={selectedUserData}
												aboutHtml={aboutHtml}
											/>
											<ApplicationJobList
												selectedUserData={selectedUserData}
												jobsFromApplications={
													selectedUserData?.role === "COMPANY"
														? companyDatatApp
														: jobsFromApplications
												}
												applicationsArray={applicationsArray}
												applicationJob={applicationJob}
												jobsArray={jobsArray}
												getUserById={getUserById}
											/>
										</Box>
										{editJobError && (
											<AdminJobDialog
												editDialogJobOpen={editDialogJobOpen}
												setEditDialogJobOpen={setEditDialogJobOpen}
												setEditJobError={setEditJobError}
											/>
										)}
										{selectedUserData?.role === "COMPANY" && (
											<Box p={2}>
												<CompanyJobsPanel
													selectedUserData={selectedUserData}
													companyJobs={companyJobs}
													selectedJobId={selectedJobId}
													toggleAllJobs={toggleAllJobs}
													handleCheckboxChange={handleCheckboxChange}
													setCreateJob={setCreateJob}
													createJob={createJob}
													editJobsOpen={editJobsOpen}
													setEditJobsOpen={setEditJobsOpen}
													handleDeleteJob={handleDeleteJob}
													handleCreateOpenJob={handleCreateOpenJob}
													handleEditJobs={handleEditJobs}
												/>
											</Box>
										)}
										<Box
											sx={{
												mb: 2,
												ml: { xs: 0, md: "25%" },

												width: { xs: "100%", md: "100%" },
											}}
										>
											<UserActionsPanel
												selectedUserData={selectedUserData}
												onEdit={() => setEditUserOpen(true)}
												handleDelete={() => handleDelete(selectedUserData.id)}
												deleteStatus={deleteStatus}
												setDeleteStatus={setDeleteStatus}
												editUserOpen={editUserOpen}
												setEditUserOpen={setEditUserOpen}
											/>
										</Box>
									</Box>
								) : hasSearched ? (
									<Typography sx={{ color: "#d32f2f" }}>
										No user found with this email.
									</Typography>
								) : null}
								{showEnd && (
									<Button
										variant='contained'
										sx={{
											mt: 3,
											bgcolor: "#43a047",
											color: "#fff",
											fontWeight: "bold",
											fontFamily: "Montserrat, Arial, sans-serif",
											"&:hover": { bgcolor: "#2e7031" },
										}}
										onClick={handleEnd}
									>
										Konec
									</Button>
								)}
							</Box>
						</Box>
					</Box>
				</>
			)}
		</>
	);
};

export default AdminMainPage;
