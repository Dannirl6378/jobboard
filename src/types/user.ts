export interface User {
	id: string;
	name: string;
	email: string;
	password: string;
	about: string;
	role: "admin" | "user" | "firm";
	createdAt: Date;
	updatedAt: Date;
}
