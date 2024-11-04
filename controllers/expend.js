const ExpendSchema = require('../models/Expend');


exports.AddExpend = async (req, res) => {
    try {
        const { user, name, amount, date, description, types } = req.body;
        
        // console.log("use data -> ",user, name, amount, date, description, types);
        
        const expend = await ExpendSchema.create({
            user,
            name,
            amount,
            date,
            description,
            types
        });
        
        res.status(200).json({
            success: true,
            data: expend,
            message: "Added expenditure successfully",
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            success: false,
            message: "Server error in AddExpend",
        });
    }
};

exports.GetExpend = async (req, res) => {
    try {
        const {userId} = req.query;
        const expenditures = await ExpendSchema.find({user:userId}).sort({ createdAt: -1 });
        
        res.status(200).json({
            success: true,
            data: expenditures,
            message: "Fetched expenditures successfully",
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            success: false,
            message: "Server error in GetExpend",
        });
    }
};

exports.DeleteExpend = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedExpend = await ExpendSchema.findByIdAndDelete(id);

        if (!deletedExpend) {
            return res.status(404).json({
                success: false,
                message: "Expenditure not found",
            });
        }

        res.status(200).json({
            success: true,
            data: deletedExpend,
            message: "Deleted expenditure successfully",
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            success: false,
            message: "Server error in DeleteExpend",
        });
    }
};
