const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 8080;

//Create MYSQL connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '7507',
    database: 'Quotes'
});

//Connect to MYSQL
connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to MYSQL database');
});

//Create the users table if it doesn't exist
const createUserTableQuery = `CREATE TABLE IF NOT EXISTS Users (
    username VARCHAR(255) NOT NULL PRIMARY KEY,
    firstName VARCHAR(255) NOT NULL,
    lastName VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
)`;

connection.query(createUserTableQuery, (err, result) => {
    if (err) {
        console.error("Error creating users table: " + err.message);
        return;
    }
    console.log('Users table created or already exists');
});

//Enable CORS
app.use(cors({
    origin: 'http://localhost:3000'
}));

//middleware to parse request body
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//Handle Post request to /signup
app.post('/signup', (req, res) => {
    const {firstName, lastName, email, password} = req.body;

    // Check if required fields are present and contain valid data
  if (!firstName || !lastName || !email || !password) {
    res.status(400).send('Missing required fields');
    return;
  }
  if (!validateEmail(email)) {
    res.status(400).send('Invalid email');
    return;
  }

    //generate a random 6 digit number
    const randomNumber = Math.floor(100000 + Math.random() * 900000);
    
    //Create a username by combining first name and random number
    const username = `${firstName}${randomNumber}`;

    //insert the user data into the users table
    const insertUserQuery = `INSERT INTO Users (username, firstName, lastName, email, password) VALUES ('${username}', '${firstName}', '${lastName}', '${email}', '${password}')`;
    connection.query(insertUserQuery, (err, result) => {
        if (err) {
            console.error("Error inserting user: " + err.message);
            res.status(500).send("Error inserting user");
            return;
        }
        console.log('User inserted');
        res.status(200).send("User inserted");
        res.send(`User inserted with username: ${username}`)
    });
});

// Validate email address
function validateEmail(email) {
    // Regular expression to validate email address
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

//start the server
app.listen(port, () => {
    console.log(`Server running on Port: ${port}`)
});