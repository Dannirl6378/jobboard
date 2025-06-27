{selectedUserData?.role === "COMPANY" && (
    <CompanyJobsPanel
      companyJobs={companyJobs}
      selectedJobId={selectedJobId}
      onToggleAll={toggleAllJobs}
      onCheckboxChange={handleCheckboxChange}
      onDeleteJob={handleDeleteJob}
      onCreateJob={handleCreateOpenJob}
      onEditJobs={handleEditJobs}
      createJob={createJob}
      setCreateJob={setCreateJob}
      email={selectedUserData.email || ""}
    />
  )}