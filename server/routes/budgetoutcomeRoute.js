// routes/categoryRoutes.js
const express = require('express');
const { createbudgetOutComeCtrl, getAllBudgetOutcomeCtrl, deletebudOutcomeCtrl } = require('../controllers/budgetoutcomeCtrl');
const router = express.Router();

router.post('/create', createbudgetOutComeCtrl);
router.get('/getAll/:id', getAllBudgetOutcomeCtrl);
router.delete('/delete/:id', deletebudOutcomeCtrl);
module.exports = router;
