// routes/categoryRoutes.js
const express = require('express');
const { createIncomeCtrl, getAllIncomeCtrl, deleteIncomeCtrl } = require('../controllers/IncomeCtrl');
const router = express.Router();

router.post('/create', createIncomeCtrl);
router.get('/getAll/:id', getAllIncomeCtrl);
router.delete('/delete/:id', deleteIncomeCtrl);
module.exports = router;
