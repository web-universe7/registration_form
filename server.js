const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Crucial: CORS configuration so your frontend can talk to your backend from a different URL
app.use(cors({
    origin: '*', // For development. Later you can restrict this to your frontend URL
    methods: ['GET', 'POST']
}));
app.use(express.json());
/*
// Database Connection (Render provides remote MySQL or you can use cloud DB like Aiven/PlanetScale)
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 3306
});
*/
db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err);
        return;
    }
    console.log('Connected to MySQL Database.');
});

// Registration Endpoint
app.post('/api/register', (req, res) => {
    const { full_name, dob, mobile, city, father_name, mother_name, gender } = req.body;

    const query = `INSERT INTO students (full_name, dob, mobile, city, father_name, mother_name, gender) VALUES (?, ?, ?, ?, ?, ?, ?)`;

    db.query(query, [full_name, dob, mobile, city, father_name, mother_name, gender], (err, result) => {
        if (err) {
            console.error('Error inserting data:', err);
            return res.status(500).json({ success: false, message: 'Database error' });
        }
        res.status(201).json({ success: true, message: 'Student registered successfully' });
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
