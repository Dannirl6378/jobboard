import { User } from "@/types/user";


const updateUser = async (id: string, updateData: Partial<User>) => {
    const response = await fetch(`/api/user/editUser/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify( updateData ),
    });
    console.log("response", response);
    // Check if the response is ok (status in the range 200-299)
    if (!response.ok) {
      throw new Error('Failed to update User');
    }
  
    const updatedJob = await response.json();
    return updatedJob;
  };
export default updateUser;  