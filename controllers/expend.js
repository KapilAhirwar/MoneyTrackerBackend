const ExpendSchema = require('../models/Expend');


exports.AddExpend = async( req, res ) => {

    try{
        
        const { incomeName, amount, date, description, types } = req.body;
        const income =  await ExpendSchema.create({
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
            message: " server error in Add expend "
        })
    }
}

exports.GetExpend = async( req, res ) => {
    try{
        const incomes = await ExpendSchema.find().sort({createAt:-1});
        res.status(200).json({
            success:true,
            data: incomes,
            message:"Add expend successfully",
        })
    }catch(error){
        console.log(error.message);
        res.status(500).json({
            success:false,
            message: " server error in Add Income "
        })
    }
}

exports.DeleteExpend = async( req, res ) => {
    try{
        const { id } = req.params ;
        const data = await ExpendSchema.findByIdAndDelete(id);

        res.status(200).json({
            success:true,
            data:data,
            message:"Delete successfully"
        })

    }catch(error){
        console.log(error.message);
        res.status(500).json({
            success:false,
            message:"server in delete expend "
        })
    }
}