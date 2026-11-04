const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
require('dotenv').config();

const app = express();

// CORS configuration so your frontend can communicate with your backend
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST']
}));
app.use(express.json());

// Database Connection (Configured for Aiven Cloud MySQL with SSL)
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 3306,
    ssl: {
        rejectUnauthorized: false
    }
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err);
        return;
    }
    console.log('Connected to Aiven MySQL Database.');

    // Automatically ensure the students table exists
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS students (
            id INT AUTO_INCREMENT PRIMARY KEY,
            full_name VARCHAR(100) NOT NULL,
            dob DATE NOT NULL,
            mobile VARCHAR(15) NOT NULL,
            city VARCHAR(50) NOT NULL,
            father_name VARCHAR(100) NOT NULL,
            mother_name VARCHAR(100) NOT NULL,
            gender VARCHAR(10) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    `;
    db.query(createTableQuery, (tableErr) => {
        if (tableErr) {
            console.error('Error creating table:', tableErr);
        } else {
            console.log('Students table is ready.');
        }
    });
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
