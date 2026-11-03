const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST']
}));
app.use(express.json());

// Temporary registration endpoint for testing deployment
app.post('/api/register', (req, res) => {
    const { full_name, dob, mobile, city, father_name, mother_name, gender } = req.body;
    console.log("Received student data:", { full_name, dob, mobile, city, father_name, mother_name, gender });
    
    // Simulate successful save
    res.status(201).json({ success: true, message: 'Student registered successfully (Test Mode)' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Backend server running on port ${PORT}`);
});
