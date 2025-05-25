import { Job } from "@/types/job";


const updateJob = async (jobId: string, updateData: Partial<Job>) => {
    const response = await fetch(`/api/job/editJob/${jobId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify( updateData ),
    });
    console.log("response", response);
    // Check if the response is ok (status in the range 200-299)
    if (!response.ok) {
      throw new Error('Failed to update job');
    }
  
    const updatedJob = await response.json();
    return updatedJob;
  };
export default updateJob;  