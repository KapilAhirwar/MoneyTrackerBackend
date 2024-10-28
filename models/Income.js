const mongoose = require('mongoose');

const IncomeSchema = new mongoose.Schema({
    incomeName:{
        type:String,
        required:true,
        trim:true
    },
    amount:{
        type:Number,
        required:true,
        trim:true,
    },
    date:{
        type:Date,
        required:true,
        trim:true
    },
    description:{
        type:String,
        required:true,
        trim:true,
    },
    types:{
        type:String,
        required:true,
    },
},{timestamps: true})

module.exports = mongoose.model('Income',IncomeSchema);