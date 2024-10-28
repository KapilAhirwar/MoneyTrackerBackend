const mongoose = require('mongoose');
require('dotenv').config();

const DB_URL = process.env.DB_URL;

exports.DbConnect = () => {

    mongoose.connect( DB_URL, {
        // useNewUrlParser: true,
		// useUnifiedTopology: true,
    })
    .then( () => { console.log('Db connected ') } )
    .catch( (error) => {
        console.error(error);
        console.log('Db not connected');
        process.exit(1);
    })
    
}