const express = require("express");
const router = express.Router();

const { AddIncome, GetIncome, DeleteIncome } = require("../controllers/income");
const { AddExpend, GetExpend, DeleteExpend } = require("../controllers/expend");
const { Signup, Login } = require('../controllers/auth');

router.post( '/AddIncome', AddIncome);
router.get( '/Get/Incomes', GetIncome );
router.delete( '/DeleteIncome/:id',  DeleteIncome );

router.post( '/Add/Expend', AddExpend);
router.get( '/Get/Expend', GetExpend );
router.delete( '/Delete/Expend/:id',  DeleteExpend );


router.post('/signup', Signup);
router.post('/login', Login);

module.exports = router;