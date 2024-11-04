const { json } = require('express');
const IncomeSchema = require('../models/Income');

exports.AddIncome = async (req, res) => {
    try {
        const { user, name, amount, date, description, types } = req.body;
        // console.log("use data income ",user, name, amount, date, description, types);

        const income = await IncomeSchema.create({
            user,
            name,
            amount,
            date,
            description,
            types
        });

        res.status(200).json({
            success: true,
            data: income,
            message: "Income added successfully",
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            success: false,
            message: "Server error in AddIncome",
        });
    }
};
exports.GetIncome = async (req, res) => {
    try {
        const {userId} = req.query;
        // console.log("user id ",userId);
        const incomes = await IncomeSchema.find({user:userId}).sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            data: incomes,
            message: "Fetched incomes successfully",
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            success: false,
            message: "Server error in GetIncome",
        });
    }
};
exports.DeleteIncome = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedIncome = await IncomeSchema.findByIdAndDelete(id);

        if (!deletedIncome) {
            return res.status(404).json({
                success: false,
                message: "Income not found",
            });
        }

        res.status(200).json({
            success: true,
            data: deletedIncome,
            message: "Deleted income successfully",
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            success: false,
            message: "Server error in DeleteIncome",
        });
    }
};
