const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const outcomeSchema = new Schema({
    type: {
        type: String,
        required: true,
    },
    amount: {
        type: String,
        required: true,
    },


    categoryId: {
        type: Schema.Types.ObjectId,
        ref: "Category",
        required: true,
    },
}, { timestamps: true });

const outcome = mongoose.model(
    "Outcome",
    outcomeSchema
);

module.exports = outcome;
