export interface User {
    id: string;
    name: string;
    email: string;
    passwordHash: string;
    role: 'admin' | 'user'| 'firm';
    createdAt: Date;
    updatedAt: Date;
}