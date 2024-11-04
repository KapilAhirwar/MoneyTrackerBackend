const mongoose = require('mongoose');

const IncomeSchema = new mongoose.Schema({
    user: { // Reference to the User model
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    amount: {
        type: Number,
        required: true,
        trim: true,
    },
    date: {
        type: Date,
        required: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    types: {
        type: String,
        required: true,
    },
}, { timestamps: true });

module.exports = mongoose.model('Income', IncomeSchema);
