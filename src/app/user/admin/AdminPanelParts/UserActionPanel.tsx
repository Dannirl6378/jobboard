<UserActionsPanel
    selectedUserData={selectedUserData}
    onEdit={() => setEditUserOpen(true)}
    onDelete={() => handleDelete(selectedUserData.id)}
    deleteStatus={deleteStatus}
    setDeleteStatus={setDeleteStatus}
    editUserOpen={editUserOpen}
    setEditUserOpen={setEditUserOpen}
  />