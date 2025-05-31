const getUserByEmail = async (email: string) => {
  const response = await fetch("/api/user/findByEmail", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
  if (!response.ok) throw new Error("User not found");
  return await response.json();
};
export default getUserByEmail;