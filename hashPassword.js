const bcrypt = require("bcryptjs");

const password = "masterpassword123";
const saltRounds = 10;

bcrypt
	.hash(password, saltRounds)
	.then((hash) => {
		console.log("Hash:", hash);
	})
	.catch((err) => {
		console.error("Error hashing password:", err);
	});
