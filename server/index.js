const express = require("express");
const app = express();
const mysql = require("mysql");
const dotenv = require("dotenv");
dotenv.config();

const db = mysql.createConnection({
    host: "localhost",
    user: process.env.USER,
    password:process.env.PASS,
    database:process.env.DATABASE
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
