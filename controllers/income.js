const { json } = require('express');
const IncomeSchema = require('../models/Income');

exports.AddIncome = async( req, res ) => {

    try{
        
        const { incomeName, amount, date, description, types } = req.body;
        const income =  await IncomeSchema.create({
            incomeName, amount, date, description, types
        })

        res.status(200).json({
            success:true,
            data: income,
            message:"Add income successfully",
        })

    }catch(error){
        console.log(error.message);
        res.status(500).json({
            success:false,
            message: " server error in Add Income "
        })
    }
}

exports.GetIncome = async( req, res ) => {
    try{
        const incomes = await IncomeSchema.find().sort({createAt:-1});
        res.status(200).json({
            success:true,
            data: incomes,
            message:"Add income successfully",
        })
    }catch(error){
        console.log(error.message);
        res.status(500).json({
            success:false,
            message: " server error in Add Income "
        })
    }
}

exports.DeleteIncome = async( req, res ) => {
    try{
        const { id } = req.params ;
        const data = await IncomeSchema.findByIdAndDelete(id);

        res.status(200).json({
            success:true,
            data:data,
            message:"Delete successfully"
        })

    }catch(error){
        console.log(error.message);
        res.status(500).json({
            success:false,
            message:"server in delete income "
        })
    }
}