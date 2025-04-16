"use client";
import { useEffect, useState } from 'react';
import { fetchUsers } from '../lib/api';  // Importujeme naši funkci pro získání uživatelů

export default function Home() {
  const [users, setUsers] = useState<any[]>([]);  // Stav pro uživatele
  const [loading, setLoading] = useState(true);  // Stav pro načítání
  const [error, setError] = useState<string | null>(null);  // Stav pro chyby

  useEffect(() => {
    const getUsers = async () => {
      try {
        const data = await fetchUsers();  // Zavoláme naši funkci pro získání dat
        setUsers(data);  // Nastavíme data do stavu
      } catch (err) {
        setError('Failed to load users');  // Pokud se něco pokazí, nastavíme chybu
      } finally {
        setLoading(false);  // Konec načítání
      }
    };

    getUsers();
  }, []);  // Zavoláme funkci pouze při mountování komponenty

  if (loading) return <div>Loading...</div>;  // Pokud se data načítají, zobrazíme loading
  if (error) return <div>{error}</div>;  // Pokud nastala chyba, zobrazíme chybu
  console.log(users);  // Pro debugging, zobrazíme uživatele v konzoli

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>  // Zobrazíme jméno každého uživatele
        ))}
      </ul>
    </div>
  );
}
