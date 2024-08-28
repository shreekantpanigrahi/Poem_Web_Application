const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

dotenv.config();  // Load environment variables from a .env file
const app = express();
app.use(express.json());  // Middleware to parse JSON bodies
app.use(bodyParser.json());


app.post('/send-email', (req, res) => {
    const { name, email, subject, description } = req.body;

    let transporter = nodemailer.createTransport({
        service: 'gmail',  // Use your email service (e.g., Gmail)
        auth: {
            user: 'lightp0008@gmail.com',  // Replace with your email
            pass: process.env.EMAIL_PASS    // Replace with your email password or app-specific password
        }
    });

    let mailOptions = {
        from: email,
        to: 'light@gmail.com',  // Replace with your email
        subject: subject,
        text: `Name: ${name}\nEmail: ${email}\nDescription: ${description}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send({ success: false, error: error.message });
        }
        res.status(200).send({ success: true, message: 'Email sent successfully!' });
    });
});

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log("Connected to MongoDB"))
.catch(err => console.error("Failed to connect to MongoDB", err));

// Start the server
app.listen(3000, () => {
    console.log("Server running on port 3000");
});
