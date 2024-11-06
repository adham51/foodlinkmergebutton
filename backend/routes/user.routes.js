const user = require('express').Router();

const db = require('../database/db_conection');

const bcrypt = require('bcrypt');
const { use } = require('bcrypt/promises');

const jwt = require('jsonwebtoken');



// Register a new user (Donor or Charity)

user.post('/registerdonor', async (req, res) => {

    const { name, email, password } = req.body;

    const hach = await bcrypt.hash(password, 7)



    db.query(`select * from users where email = '${email}'`, (err, data) => {

        if (data.length) {

            res.json({ message: 'User already exists, Login instead of register' });

        }

        else {

            db.query(`INSERT INTO users (name, email, password, user_type) VALUES ('${name}', '${email}', '${hach}' , 'donor')`, (err, data) => {

                if (err) {

                    res.json({ message: 'Error' });

                    console.log(err);

                }

                else {

                    res.json({ message: 'User registered successfully' });

                }

            });

        }

    });

});

user.post('/registercharity', async (req, res) => {
    const { name, email, password } = req.body;

    // Hash the password with bcrypt
    const hashedPassword = await bcrypt.hash(password, 7);

    // Check if the user already exists
    db.query(`SELECT * FROM users WHERE email = '${email}'`, (err, data) => {
        if (data.length) {
            res.json({ message: 'User already exists, Login instead of registering' });
        } else {
            // Insert new user into the database
            db.query(`INSERT INTO users (name, email, password, user_type) VALUES ('${name}', '${email}', '${hashedPassword}', 'charity')`, (err, result) => {
                if (err) {
                    res.json({ message: 'Error registering user' });
                    console.log(err);
                } else {
                    // After inserting, retrieve the inserted user's ID
                    db.query(`SELECT user_id FROM users WHERE email = '${email}'`, (err, data) => {
                        if (err) {
                            res.json({ message: 'Error retrieving user ID' });
                        } else {
                            const userId = data[0].user_id; // Get the user_id (charity_id)
                            res.json({ message: 'User registered successfully', charity_id: userId });
                        }
                    });
                }
            });
        }
    });
});




// User login

user.post('/login', (req, res) => {

    const { email, password } = req.body;

    db.query(`select * from users where email = '${email}'`, async (err, data) => {

        if (err) {

            res.json({ message: 'Error' });

            console.log(err);

        }

        else {

            if (data.length) {

                const validPassword = await bcrypt.compare(password, data[0].password);

                if (validPassword) {

                    const token = jwt.sign({ user_type: data[0].user_type, user_id: data[0].user_id }, 'secretkey');

                    res.json({ message: 'User logged in', token, data });

                }

                else {

                    res.json({ message: 'Invalid password' });

                }

            }

            else {

                res.json({ message: 'User not found' });

            }

        }



    });

});



// Get user profile by ID

user.get('/user/:id', (req, res) => {

    const user_id = req.params.id;

    db.query(`select * from users where user_id = ${user_id}`, (err, data) => {

        if (data.length) {

            res.json(data);

        }

        else if (err) {

            res.json({ message: 'Error' });

        }

        else {

            res.json({ message: 'User not found' });

        }

    });

});



// Update user profile (name or email)                      
user.put('/updateUser/:userId',(req,res)=>{
    const userId = req.params.userId;
    const { name , email } = req.body;
    db.query(`select * from users where user_id = ${userId} and email = '${email}'`,(err,data)=>{
        if(err)
        {
            res.json({message: 'Error'});
        }
        else
        {
            if(data.length)
            {
                db.query(`update users set name = '${name}' , email = '${email}' where user_id = ${userId}`,(err,data)=>{
                    if(err)
                    {
                        res.json({message: 'Error'});
                    }
                    else
                    {
                        res.json({message: 'the information updated'});
                    }
                });
            }
            else
            {
                res.json({message: 'user not found'});
            }
        }
    });
});


// Forgot password
user.post('/forgotpassword',async(req,res)=>{
    const {email , password} = req.body;
    const hach = await bcrypt.hash(password,7);
    db.query(`update users set password = '${hach}' where email = '${email}'`,(err,data)=>{
        if(err)
        {
            res.json({message: 'Error'});
        }
        else
        {
            res.json({message: 'password changed'});
        }
    });
});


// request.routes.js
user.get('/donorinfo/:donorId', (req, res) => {
    const donorId = req.params.donorId;
    
    const query = `
        SELECT name, email
        FROM users
        WHERE user_id = ?
    `;

    db.query(query, [donorId], (err, data) => {
        if (err) {
            res.status(500).json({ message: 'Error fetching donor info' });
        } else {
            res.json(data[0]); // Assuming you want the first result
        }
    });
});





module.exports = user;