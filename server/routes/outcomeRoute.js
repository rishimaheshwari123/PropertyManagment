// routes/categoryRoutes.js
const express = require('express');
const { createOutComeCtrl, getAllOutcomeCtrl, deleteOutcomeCtrl } = require('../controllers/outcomeCtrl');
const router = express.Router();

router.post('/create', createOutComeCtrl);
router.get('/getAll/:id', getAllOutcomeCtrl);
router.delete('/delete/:id', deleteOutcomeCtrl);
module.exports = router;
