"use client";

import { fetchUsers } from "@/lib/api";
import { useQuery } from '@tanstack/react-query';
import { useAppStore } from "@/store/useAppStore";
import { useEffect } from "react";
import Firm from "./company/firm";
import HeaderMainPage from "@/components/HeaderMainPage";
import { Box } from "@mui/material";


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
  
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
         <HeaderMainPage/>
        <h1>Users: for company</h1>
        <ul>
          {data?.map((user: { id: string; name: string,role:string }) => (
            <li key={user.id}>{user.name} {user.role}</li>
          ))}
        </ul>
        <Firm/>
      </Box>
    );
    
  };
  export default UserPage;  