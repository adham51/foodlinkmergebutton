const express = require('express');
const app = express();
const port = 3003;


const conection = require('./database/db_conection');
const user = require('./routes/user.routes');
const food = require('./routes/food.routes');
const request = require('./routes/request.routes');


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(user);
app.use(food);
app.use(request);

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the application.' });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});