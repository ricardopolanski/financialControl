require("dotenv").config();
console.log("Loaded DB Config:", process.env.DB_USER, process.env.DB_PASSWORD); // Debugging
module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: "postgres", 
    logging: true
  }
};
