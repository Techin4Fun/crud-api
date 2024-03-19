require("dotenv").config();
const Pool = require("pg").Pool;

const pool = new Pool({
    // user: process.env.USERNAME,
    // password: process.env.PassWD,
    // database: process.env.DB,
    // host: process.env.HOST,
    // port: process.env.PORT
    user: "postgres",
    password: "aj201010",
    database: "api_jwt",
    host: "localhost",
    port: 5432
});

module.exports = pool;