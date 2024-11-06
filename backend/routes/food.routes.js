const food = require('express').Router();
const db = require('../database/db_conection');
const bcrypt = require('bcrypt');
const { query } = require('express');
const jwt = require('jsonwebtoken');




const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization'];  // Extracts the token from the 'Authorization' header

    if (!token) return res.json({ message: 'Token missing' });  // If no token is provided, respond with an error

    jwt.verify(token, 'secretkey', (err, user) => {  // Verify the token using the secret key
        if (err) return res.json({ message: 'Invalid token' });  // If the token is invalid, respond with an error

        req.user = user;  // If valid, attach the decoded token data (like user_id and user_type) to the request
        next();  // Call the next middleware or route handler
    });
};



// API to add a new food donation
food.post('/add', authenticateToken, (req, res) => {  // 'authenticateToken' middleware ensures only logged-in users can access this route
    const { food_name, quantity, description, expiration_date } = req.body;  // Extract food data from the request body
    const { user_id, user_type } = req.user;  // Extract user_id and user_type from the JWT token

    if (user_type !== 'donor') {  // Check if the user is a donor, only donors can add food
        return res.json({ message: 'You are not a donor' });
    }

    // Add food item with the user_id from the token
    db.query(`INSERT INTO foodlist (user_id, food_name, quantity, description, expiration_date, status) VALUES (${user_id}, '${food_name}', ${quantity}, '${description}', '${expiration_date}', 'available')`, (err, data) => {
        if (err) {
            res.json({ message: 'Error adding food item' });  // If there's an error, send a response with an error message
            console.log(err);  // Log the error for debugging purposes
        } else {
            res.json({ message: 'Food Added Successfully' });  // If successful, send a success message
        }
    });
});	

// API to get all available food items
food.get('/available',(req,res)=>{
    db.query(`select * from foodlist where status = 'available'` ,(err,data)=>{
        if(err)
        {
            res.json({message: 'Error'});
        }
        else
        {
            res.json(data);
        }
    });
});

// API to get all donations by a specific donor
food.get('/donor/:user_id',(req,res)=>{
    const user_id = req.params.user_id;
    db.query(`select * from foodlist where user_id = ${user_id}`,(err,data)=>{
        if(err)
            {
                res.json({message: 'Error'});
                console.log(err);
            }
            else
            {
                res.json(data);
            }
    });
});

food.delete('/deletefood/:food_id',(req,res)=>{
    const food_id = req.params.food_id;
    db.query(`delete from foodlist where food_id = ${food_id}` ,(err,data)=>{
        if(err)
            {
                res.json({message: 'Error'});
                console.log(err);
            }
            else
            {
                res.json({message: 'food deleted successfully'});
            }
    });
});




// Route to get food item details by food_id
food.get('/food/:food_id', (req, res) => {
    const { food_id } = req.params;

    db.query(`SELECT * FROM foodlist WHERE food_id = ${food_id}`, (err, data) => {
        if (err || data.length === 0) {
            res.json({ message: 'Food item not found' });
        } else {
            res.json(data[0]); // Return the food item details
        }
    });
});

// get user-id by food-id
food.get('/userID/:food_id',(req,res)=>{
    const food_id = req.params.food_id;
    db.query(`select user_id from foodlist where food_id = ${food_id}`,(err,data)=>{
        if(err)
        {
            res.json({message: 'Error'});
            console.log(err);
        }
        else
        {
            res.json(data[0]);
        }
    });
});

food.get('/getrequestid/:foodId', (req, res) => {
    const foodId = req.params.foodId;

    // Query to get the request_id from the requests table
    const query = `SELECT request_id FROM requests WHERE food_id = ?`;

    db.query(query, [foodId], (err, result) => {
        if (err) {
            console.error("Error fetching request ID:", err);
            return res.status(500).json({ message: 'Error fetching request ID' });
        }

        if (result.length > 0) {
            res.json({ requestId: result[0].request_id });
        } else {
            res.status(404).json({ message: 'Request not found' });
        }
    });
});


module.exports = food;