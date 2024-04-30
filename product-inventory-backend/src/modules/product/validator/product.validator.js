const commonHelper = require("../../../helpers/common.helper")
const mongoose = require("mongoose");
const productModel = require("../../../models/product.model");
const ObjectId = mongoose.Types.ObjectId;

const productValidator = {

    async createProduct(req, res, next) {
        const { name, description, discount, imageUrl } = req.body;

        const validationErrors = [];

        if (!name) validationErrors.push("name is required");
        if (!description) validationErrors.push("description is required");
        if (!discount) validationErrors.push("discount is required");
        if (!imageUrl) validationErrors.push("imageUrl is required");

        if (!isNaN(discount)) {
            req.body.discount = parseFloat(discount);
        } else {
            if (isNaN(discount)) validationErrors.push("discount should be a number");
        }

        if (validationErrors.length > 0) {
            return res.status(400).json({ error: validationErrors[0] });
        }

        next();
    },

    async updateProduct(req, res, next) {
        const { name, description, discount, imageUrl, productId } = req.body;

        try {
            const existingProduct = await productModel.findById({ _id: ObjectId(productId) });

            if (!existingProduct) {
                return res.status(404).json({ error: "Product not found" });
            }

            const validationErrors = [];

            if (name === existingProduct.name && description === existingProduct.description &&
                 discount === existingProduct.discount &&
                imageUrl === existingProduct.imageUrl) {
                validationErrors.push("All fields are the same, no update needed");
            }

            if (name && !commonHelper.validateNameString(name)) {
                validationErrors.push("Name should only contain alphabets and spaces");
            }

            if (description && !commonHelper.validateNameString(description)) {
                validationErrors.push("Description should only contain alphabets and spaces");
            }

            if (!isNaN(discount)) {
                req.body.discount = parseFloat(discount);
            } else {
                if (isNaN(discount)) validationErrors.push("discount should be a number");
            }

            if (validationErrors.length > 0) {
                return res.status(400).json({ error: validationErrors[0] });
            }

            next();
        } catch (error) {
            return res.status(500).json({ error: "Internal server error", message: error.message });
        }
    }

};

module.exports = productValidator;
