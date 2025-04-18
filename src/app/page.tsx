"use client";

import UserPage from "./user/page";
import JobPage from "./job/page";
import ApplicationPage from "./application/page";
//V jakékoli komponentě, kde budeš potřebovat např. 
// jméno autora nabídky práce nebo název jobu, jednoduše použiješ:
//const user = useAppStore((state) => state.getUserById(application.userId));
//const job = useAppStore((state) => state.getJobById(application.jobId));

export default function Home(){

    return(
        <div>
            <h1>Welcome to the Home Page</h1>
            <UserPage/>
            <br/>
            <JobPage/>
            <br/>
            <ApplicationPage/>
        </div>
    )  
}
