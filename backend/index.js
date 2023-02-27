const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors'); 
const mongodbConnection = require("./db.js");
const app = express();
mongodbConnection();

app.use(cors());



app.use(express.json());

app.use('/api', require('./Routes/CreateUser'));
app.use('/api', require('./Routes/DisplayData'));
app.use('/api', require('./Routes/OrderData'));

app.get('/', (req, res) => {
    res.send("hello world")
});



app.listen(8000, () => {
    console.log("server started on 8000");
});