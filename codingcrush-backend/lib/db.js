// lib/db.js

const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'codingcrush',
  password: 'root'
});

connection.connect();
module.exports = connection;