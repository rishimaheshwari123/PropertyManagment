// routes/categoryRoutes.js
const express = require('express');
const router = express.Router();
const {
    createPropertyCommitiCtrl,
    getAllPropertyCommitiCtrl,
    deletePropertyCommitiCtrl
} = require('../controllers/PropertyCommitiCtrl');

router.post('/create', createPropertyCommitiCtrl);
router.get('/getAll/:id', getAllPropertyCommitiCtrl);
router.delete('/delete/:id', deletePropertyCommitiCtrl);
module.exports = router;
