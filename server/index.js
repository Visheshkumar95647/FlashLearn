const express = require("express");
const app = express();
const mysql = require("mysql");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
app.use(express.json());
app.use(cors());

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const db = mysql.createConnection({
    host: "localhost",
    user: process.env.USER,
    password: process.env.PASS,
    database: process.env.DATABASE
});

db.connect((err) => {
    if (err) {
        console.error("Error connecting to database:", err);
        return;
    }
    console.log("Database Connected");
    app.listen(process.env.PORT || 5000, () => {
        console.log(`Server is running on PORT ${process.env.PORT || 5000}`);
    });
});

app.post('/signup', async (req, res) => {
    const { name, username, password, phonenumber } = req.body;

    db.query('SELECT * FROM userdetail WHERE phonenumber = ? OR username = ?', [phonenumber, username], async (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }
        if (results.length > 0) {
            return res.status(400).json({ error: 'User already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(password, salt);
        const sql = 'INSERT INTO userdetail (name, username, password, phonenumber) VALUES (?, ?, ?, ?)';
        db.query(sql, [name, username, secPass, phonenumber], (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to create user' });
            } else {
                const token = jwt.sign(
                    { id: result.insertId },
                    process.env.KEY,
                    { expiresIn: "24h" }
                );
                res.status(201).json({ token: token });
            }
        });
    });
});

app.post("/login", async (req, res) => {
    const { username, password } = req.body;

    const q = 'SELECT * FROM userdetail WHERE username = ?';

    db.query(q, [username], async (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }

        if (result.length === 0) {
            return res.status(400).json({ error: 'User not found' });
        }

        const user = result[0];
        const pass = await bcrypt.compare(password, user.password);

        if (!pass) {
            return res.status(400).json({ error: 'Incorrect Password' });
        }

        const data = {
            user: {
                id: user.id,
            },
        };

        const authToken = jwt.sign(data, process.env.KEY, { expiresIn: '24h' });

        return res.status(200).json({ token: authToken });
    });
});
