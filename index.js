const express = require('express');
const cors = require('cors');
const app =  express();
const DbConnect = require('./DBconnect/Dbconnect');
const route = require('./routes/route');
require('dotenv').config();
// middleware
app.use(express.json());
app.use(cors())


const PORT = process.env.PORT || 6000;

app.use('/api/v1', route);

app.get('/', (req, res) => {
    res.send('Hello App')
})

app.listen( PORT, () => {
    console.log(`app is listeing on Port No ${PORT}`)
})

DbConnect.DbConnect();