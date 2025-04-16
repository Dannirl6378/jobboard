


export const fetchUsers = async () => {
    const res = await fetch('/api/user');  // Volání našeho API
    if (!res.ok) {
      throw new Error('Failed to fetch users');
    }
    return res.json();  // Vrátíme data jako JSON
  };
  