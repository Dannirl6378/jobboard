import { User } from "@/types/user";


const tempUser = async (updateData: Partial<User>) => {
    const response = await fetch(`/api/user/generateUser`, {
      method: 'POST',
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
  
    const tempUser = await response.json();
    return tempUser;
  };
export default tempUser;  