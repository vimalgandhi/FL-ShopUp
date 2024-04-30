const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            unique: true
        },
        description: {
            type: String,
            required: true
        },
        discount: {
            type: Number,
            required: true
        },
        imageUrl: {
            type: String,
            required: true
        },
        categoryId : {
            type: String,
            unique: true
        },
        redirectUrl: {
            type: String        }
    },
    {
        timestamps: true
    }
);

const productModel = mongoose.model("product", productSchema);

module.exports = productModel;
