import { Job } from "@/types/job";


const updateJob = async (id: string, updateData: Partial<Job>) => {
    const response = await fetch(`/api/job/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ updateData }),
    });
  
    if (!response.ok) {
      throw new Error('Failed to update job');
    }
  
    const updatedJob = await response.json();
    return updatedJob;
  };
export default updateJob;  