

const createApplication = async (userid: string, jobid:string) => {
    const response = await fetch(`/api/application/createApplication`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userid, jobid } ),
    });
    console.log("response", response);
    // Check if the response is ok (status in the range 200-299)
    if (!response.ok) {
      throw new Error('Failed to update User');
    }
  
    const updatedJob = await response.json();
    return updatedJob;
  };
export default createApplication;  