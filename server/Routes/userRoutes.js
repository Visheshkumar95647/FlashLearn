// const express = require("express");
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const router = express.Router();
// const db = require("../index");

// router.post('/signup', async (req, res) => {
//     const { name, password, phonenumber } = req.body;

//     db.query('SELECT * FROM userdetail WHERE phonenumber = ?', [phonenumber], async (err, results) => {
//         if (err) {
//             return res.status(500).json({ error: 'Database error' });
//         }
//         if (results.length > 0) {
//             return res.status(400).json({ error: 'User already exists' });
//         }

//         const salt = await bcrypt.genSalt(10);
//         const secPass = await bcrypt.hash(password, salt);
//         const sql = 'INSERT INTO userdetail (name, password, phonenumber) VALUES (?, ?, ?)';
//         console.log("bhai qery generate hobgyi")
//         db.query(sql, [name, secPass, phonenumber], (err, result) => {
//             if (err) {
//                 console.log("erro after query generation");
//                 return res.status(500).json({ error: 'Failed to create user' });
//             } else {
//                 // const token = jwt.sign(
//                 //     { id: result.insertId },
//                 //     "Vishesh@123",
//                 //     { expiresIn: "24h" }
//                 // );
                
//                 res.status(201).json({ "result" : result });
//             }
//         });
//     });
// });

// module.exports = router;
