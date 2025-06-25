export interface User {
	id: string;
	name: string;
	email: string;
	password?: string;
	passwordHash?: string;
	about: string;
	Phone: string;
	CoverLetter: string;
	CV: string;
	role: "admin" | "USER" | "TEMPORAL" | "COMPANY";
	createdAt?: Date;
	updatedAt?: Date;
}
