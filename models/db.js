const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',      // Ganti sesuai dengan host database Anda
    user: 'root',           // Ganti dengan username database
    password: '',           // Ganti dengan password database
    database: 'mahasiwa' // Ganti dengan nama database Anda
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err);
        return;
    }
    console.log('Connected to the database.');
});

module.exports = db;
