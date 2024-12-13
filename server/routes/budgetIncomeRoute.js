// routes/categoryRoutes.js
const express = require('express');
const { createBudgetIncomeCtrl, getAllBudgetIncomeCtrl, deleteBudgetIncomeCtrl } = require('../controllers/budgetIncome');
const router = express.Router();

router.post('/create', createBudgetIncomeCtrl);
router.get('/getAll/:id', getAllBudgetIncomeCtrl);
router.delete('/delete/:id', deleteBudgetIncomeCtrl);
module.exports = router;
