require('dotenv').config();
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: process.env.DB_USER,
    // This is a global variable for the env package
    password: process.env.DB_PASSWORD,
    database: 'todos_db',
}).promise();

module.exports = connection;