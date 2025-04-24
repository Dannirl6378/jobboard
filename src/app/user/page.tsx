"use client";

import { fetchUsers } from "@/lib/api";
import { useQuery } from '@tanstack/react-query';
import { useAppStore } from "@/store/useAppStore";
import { useEffect } from "react";
import Firm from "./company/firm";
import HeaderMainPage from "@/components/HeaderMainPage";
import { Box } from "@mui/material";
import { LogInUser,LogInFirm } from "../login/LogInUser";
import MainPgFirm from "./company/MainPgFirm";


const UserPage = () => {
    const { data, error, isLoading } = useQuery({
        queryKey: ['users'],
        queryFn: fetchUsers,
    });
  
    const setUsers = useAppStore((state) => state.setUsers);

  useEffect(() => {
    if (data) {
      setUsers(data); // uložíme data do zustand
    }
  }, [data, setUsers]);

    if (isLoading) return <div>Loading...</div>;
    if (error instanceof Error) return <div>Error: {error.message}</div>;
    console.log("users", data);

    const LogInCompany: boolean = LogInFirm.role=== "FIRM"  ? true : false;//toto se upravi na zjistovani kdo je přihlašeny Firm User 
    console.log("LogInCompany", LogInCompany);
  
    return (
      <>
          {LogInCompany ? (<Box sx={{display:'flex',flexDirection:'column',alignItems:'center',mt:5,bgcolor:'#D5DEFF',width:'100vw',height:'100vh', color: "black",p:5}}> 
            <Firm/>
          </Box>):(<MainPgFirm/>)}      
      </>
    );
  };
  export default UserPage;  