"use client";

import { fetchUsers } from "@/lib/api";
import { useQuery } from '@tanstack/react-query';
import { useAppStore } from "@/store/useAppStore";
import { useEffect } from "react";


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
  
    return (
      <div>
        <h1>Users</h1>
        <ul>
          {data?.map((user: { id: string; name: string }) => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      </div>
    );
    
  };
  export default UserPage;  