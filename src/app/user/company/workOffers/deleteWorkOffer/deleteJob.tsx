import { useAppStore } from "@/store/useAppStore";
import { LogInFirm } from "@/app/login/LogInUser";

//const { LogInFirm } = useAppStore.getState();

const deleteJob = async (jobId: string) => {
  try {
    const res = await fetch(`/api/job/deleteJob/${jobId}`, {
      method: "DELETE",
      headers: {
        "x-company-id": LogInFirm?.id || "", // firma musí být přihlášená
      },
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || "Failed to delete");
    }

    const deleted = await res.json();
    console.log("Deleted:", deleted);
  } catch (err) {
    console.error("Error deleting job:", err);
  }
};
export default deleteJob