const bcrypt = require("bcryptjs");

console.log("Roy:", bcrypt.hashSync("password", 10));
console.log("Brian:", bcrypt.hashSync("password", 10));
console.log("Farmer:", bcrypt.hashSync("password", 10));
