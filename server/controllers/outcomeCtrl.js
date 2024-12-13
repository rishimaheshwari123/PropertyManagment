const outcomeModle = require("../models/outcomeModel");

const createOutComeCtrl = async (req, res) => {
    const {
        propertyData: { type, amount, categoryId },
    } = req.body;


    try {
        if (!type || !amount) {
            return res.status(400).json({
                success: false,
                message: "Please Provide All Fields",
            });
        }


        const property = await outcomeModle.create({
            type, amount, categoryId
        });

        return res.status(201).json({
            success: true,
            message: "Outcome created successfully!",
            property,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Error in create units API",
        });
    }
};


const deleteOutcomeCtrl = async (req, res) => {
    const { id } = req.params;
    try {
        const deleteProperty = await outcomeModle.findByIdAndDelete(id);
        if (!deleteProperty) {
            return res.status(404).json({ success: false, message: "Outcome not found" });
        }
        res.status(200).json({
            success: true,
            message: "Outcome deleted successfully",
            property: deleteProperty,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};



const getAllOutcomeCtrl = async (req, res) => {
    const { id } = req.params;
    try {
        const properties = await outcomeModle.find({ categoryId: id });
        res.json({
            success: true,
            properties,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "An error occurred while fetching property outcome.",
            error: error.message,
        });
    }
};
const getOutcomeCtrl = async (req, res) => {
    try {
        const properties = await outcomeModle.find();
        res.json({
            success: true,
            properties,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "An error occurred while fetching property outcome.",
            error: error.message,
        });
    }
};



















module.exports = {
    createOutComeCtrl,
    deleteOutcomeCtrl,
    getAllOutcomeCtrl,
    getOutcomeCtrl
};
