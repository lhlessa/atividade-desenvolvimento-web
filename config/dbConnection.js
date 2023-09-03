const mysql = require('mysql');

const host = 'localhost';
const database = 'museu';
const user = 'root';
const password = '062577';

module.exports = () => mysql.createConnection({
    host: host,
    database: database,
    user: user,
    password: password
});
