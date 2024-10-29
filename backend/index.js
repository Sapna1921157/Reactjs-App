const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',    // Replace with your actual MySQL username
    password: '', // Replace with your actual MySQL password
    database: 'localhost'  // Replace with the actual name of your database
});

db.connect(err => {
    if (err) throw err;
    console.log('MySQL Connected!');
});

app.get('/api/users', (req, res) => {
    const query = 'SELECT species_name, COUNT(*) AS count FROM species GROUP BY species_name';
    db.query(query, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
