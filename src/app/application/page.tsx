import {useState,useEffect} from "react";
import { fetchApplication } from "@/lib/api";
import { useQuery } from '@tanstack/react-query';
import { getUserJob } from "@/app/application/userJob";


const ApplicationPage=()=> {
    const [combinedData, setCombinedData] = useState<any[]>([]);
   
const { data, error, isLoading } = useQuery({
        queryKey: ['application'],
        queryFn: fetchApplication,
    });
    
    useEffect(() => {
        const fetchData = async () => {
          try {
            const result = await getUserJob();
            setCombinedData([result]);
          } catch (error) {
            console.error("Error:", error);
          }
        };
    
        fetchData();
      }, []); 

    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (error instanceof Error) return <div>Error: {error.message}</div>;

    return (
        <div>
            <h1>Application List</h1>
            <ul>
            {combinedData.map((item) => (
          <li key={`${item.id}`}>
            <strong>User:</strong> {item.userTest?.name??"Unknow user"}<br />
            <strong>Job:</strong> {item.job?.title ?? "Unknown job"}<br />
          </li>
        ))}
            </ul>
        </div>
    );
}
export default ApplicationPage;