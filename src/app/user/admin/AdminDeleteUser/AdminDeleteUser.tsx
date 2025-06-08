import { fetchDeleteUser } from "@/lib/api";

export const AdminDeleteUser = async (
	id: string
): Promise<{ success: boolean; message: string }> => {
	if (!id || typeof id !== "string") {
		return { success: false, message: "Invalid user ID" };
	}

	try {
		await fetchDeleteUser(id);
		return { success: true, message: "User deleted successfully" };
	} catch (error: any) {
		console.error("Error deleting user:", error);
		return { success: false, message: error?.message || "Unknown error" };
	}
};
