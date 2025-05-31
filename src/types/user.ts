export interface User {
	id: string;
	name: string;
	email: string;
	password: string;
	about: string;
	Phone: string;
	CoverLetter: string;
	CV: string;
	role: "admin" | "user" | "firm"|"TEMPORAL";
	createdAt: Date;
	updatedAt: Date;
}
