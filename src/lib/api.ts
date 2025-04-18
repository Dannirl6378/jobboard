

interface Job {
  id: string;
  title: string;
  description: string;
}

export const fetchUsers = async () => {
    const res = await fetch('/api/user');  // Volání našeho API
    if (!res.ok) {
      throw new Error('Failed to fetch users');
    }
    return res.json();  // Vrátíme data jako JSON
  };

  export const fetchjobs = async () => {
    const res = await fetch('/api/job');  // Volání našeho API
    if (!res.ok) {
      throw new Error('Failed to fetch jobs');
    }
    return res.json();  // Vrátíme data jako JSON
  };
export const fetchApplication = async () => {
    const res = await fetch('/api/application');  // Volání našeho API
    if (!res.ok) {
      throw new Error('Failed to fetch users');
    }
    return res.json();  // Vrátíme data jako JSON
  };
 