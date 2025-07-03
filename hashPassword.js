const bcrypt = require('bcryptjs');

const password = "12905225"; 
const saltRounds = 10;

const hashedPassword = bcrypt.hashSync(password, saltRounds);
console.log("Hashed Password:", hashedPassword);
