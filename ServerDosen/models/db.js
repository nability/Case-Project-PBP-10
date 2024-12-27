const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root', // sesuaikan dengan username MySQL masing-masing
  password: '', // sesuaikan dengan password MySQL masing-masing
  database: 'dosen',
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database:', err);
  } else {
    console.log('Connected to MySQL database');
  }
});

module.exports = connection;