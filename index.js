const express = require('express');
const cors = require('cors');
const app = express();
const DbConnect = require('./DBconnect/Dbconnect');
const route = require('./routes/route');
require('dotenv').config();

// CORS Configuration
const corsOptions = {
    origin: ['http://localhost:3000', 'https://money-tacker-frontend.vercel.app'],
    credentials: true, // Necessary for cookies/auth headers to be sent across origins
};

// Apply CORS middleware globally before defining routes
app.use(cors(corsOptions));
app.use(express.json()); // Middleware for parsing JSON bodies

// Database Connection
DbConnect.DbConnect();

// Routes
app.use('/api/v1', route);

app.get('/', (req, res) => {
    res.send('Hello App');
});

// Start Server
const PORT = process.env.PORT || 6000;
app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`);
});
