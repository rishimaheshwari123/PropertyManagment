const incomeModel = require('../models/Income'); // Adjust the path as per your project structure

const createIncomeCtrl = async (req, res) => {
    const {
        ownerName, // Replace 'ownerName' with 'incomeName' if necessary
        months = {},
        categoryId

    } = req.body;

    try {
        // Validate required fields
        if (!ownerName) {
            return res.status(400).json({
                success: false,
                message: "Please provide the owner name",
            });
        }

        // Calculate totalAmount from months
        const totalAmount = Object.values(months).reduce((acc, curr) => acc + (curr || 0), 0);

        // Create the income entry
        const income = await incomeModel.create({
            ownerName,
            months,
            totalAmount,
            categoryId
        });

        // Respond with success
        return res.status(201).json({
            success: true,
            message: "Income created successfully!",
            income,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Error in create income API",
        });
    }
};


const deleteIncomeCtrl = async (req, res) => {
    const { id } = req.params;
    try {
        const deleteProperty = await incomeModel.findByIdAndDelete(id);
        if (!deleteProperty) {
            return res.status(404).json({ success: false, message: "Owner not found" });
        }
        res.status(200).json({
            success: true,
            message: "Income deleted successfully",
            property: deleteProperty,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};



const getAllIncomeCtrl = async (req, res) => {
    const { id } = req.params;
    try {
        const properties = await incomeModel.find({ categoryId: id });
        console.log(properties); // Check if data is being fetched

        res.json({
            success: true,
            properties,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "An error occurred while fetching income.",
            error: error.message,
        });
    }
};
const getIncomeCtrl = async (req, res) => {
    try {
        const properties = await incomeModel.find();
        console.log(properties); // Check if data is being fetched

        res.json({
            success: true,
            properties,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "An error occurred while fetching income.",
            error: error.message,
        });
    }
};

module.exports = { createIncomeCtrl, deleteIncomeCtrl, getAllIncomeCtrl, getIncomeCtrl };
