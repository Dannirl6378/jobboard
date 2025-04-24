interface Application {
    id: string;
    jobId: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
    user: {
        id: string;
        name: string;
        email: string;
        role: 'admin' | 'user' | 'COMPANY';
        createdAt: Date;
        updatedAt: Date;
    };
    job: {
        id: string;
        title: string;
        description: string;
        location: string;
        salary: string;
        category: string;
        companyId: string;
        createdAt: Date;
        updatedAt: Date;
        company: {
            id: string;
            name: string;
            email: string;
            password: string;
            role: 'admin' | 'user' | 'COMPANY';
            createdAt: Date;
            updatedAt: Date;
        };}}


