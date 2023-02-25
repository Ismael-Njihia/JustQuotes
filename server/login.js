const mysql = require('mysql2/promise');
const express = require('express');
const cors = require('cors');


const app = express();
const port = process.env.PORT || 8080;

//Enable CORS

app.use(cors());

//parse Json request bodies
app.use(express.json());

const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: '7507',
    database: 'Quotes'
}

app.post('/login', async (req, res)=>{
    //i want users to be able to login with either their username or email and password
    const {username, email, password} = req.body;
    const conn = await mysql.createConnection(dbConfig);
    const [rows ] = await conn.execute(
        `SELECT * FROM Users WHERE (username = ? OR email = ?) AND password = ?`,
        [username || null, email || null, password || null]
    );
    if(rows.length > 0){
        res.status(200).send(rows[0]);
        //user authenticated
    }else{
        res.status(400).send('Invalid username or password');
        //user not authenticated
    }
    //end the connection
    conn.end();

});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});