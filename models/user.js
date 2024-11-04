const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        require:true
    },
    password: {
        type: String,
        required: true,
    },
    // You can add more user fields here
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
