require('dotenv').config();
const mysql = require('mysql2');

let connection;


if(process.env.JAWSDB_URL) {
    connection = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        // This is a global variable for the env package
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    }).promise();

} else {
    connection = mysql.createConnection({
        host: 'localhost',
        user: process.env.DB_USER,
        // This is a global variable for the env package
        password: process.env.DB_PASSWORD,
        database: 'todos_db',
    }).promise();
}



module.exports = connection;