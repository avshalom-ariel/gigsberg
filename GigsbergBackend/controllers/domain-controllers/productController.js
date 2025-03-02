const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');
const { User } = require("../../models/auth-models");
const { Product } = require("../../models/domain-models");
const MongoProduct = require("../../models/mongo-models/productShcema");

// Post Product
exports.postProducts = async (req, res) => {
    try {
        const { id, email } = req.user;
        const { name, description, price } = req.body;

        const user = await User.findByPk(id);
        console.log(user.email, email, id);
        if (!user || email !== user.email) {
            return res.status(400).send({
                error: 'Invalid user',
            })
        }

        if (!name || !price || price < 0) {
            return res.status(400).json({message: 'Invalid product details'});
        }

        const product = await Product.create({
            name,
            description,
            price,
        });

        if (!product) {
            return res.status(400).json({ message: 'Please provide a valid product data' });
        }

        const newProduct = new MongoProduct({
            id: product.id,
            name: product.name,
            price: product.price,
            description: product.description,

        });
        if (!newProduct) {
            return res.status(400).json({ message: 'Please provide a valid product data' });
        }

        const savedProduct = await newProduct.save();
        if (!savedProduct) {
            return res.status(400).json({ message: 'Please provide a valid product data' });
        }

        res.status(201).json({
            message: 'Product successfully registered',
            product: product,
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

// Get Product
exports.getProducts = async (req, res) => {
    console.log("post products request received");
    try {
        const { id, email } = req.user;
        const page = parseInt(req.query.page) || 1; // Get page from query params
        const pageSize = parseInt(req.query.pageSize) || 10; // Get page size from query params
        const offset = (page - 1) * pageSize;

        const user = await User.findByPk(id);
        console.log(user.email, email, id);
        if (!user || email !== user.email) {
            return res.status(400).send({
                error: 'Invalid user',
            })
        }

        const { count, rows } = await Product.findAndCountAll({
            limit: pageSize,
            offset: offset,
        });
        if (!rows) {
            return res.status(404).json({ message: 'Something went wrong' });
        }

        res.status(200).json({
            message: 'Products successfully retrieved',
            total: count,
            totalPages: Math.ceil(count / pageSize),
            currentPage: page,
            pageSize: pageSize,
            products: rows,
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Something went wrong' });
    }
}

exports.putProducts = async (req, res) => {
    console.log("put products request received");

    try {
        const { id, email } = req.user;
        const { name, description, price } = req.body; // Get the updated data from the body
        const productId = req.params.id;

        const user = await User.findByPk(id);
        console.log(user.email, email, id);
        if (!user || email !== user.email) {
            return res.status(400).send({
                error: 'Invalid user',
            })
        }

        const product = await Product.findByPk(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        // Update the product with the new values
        product.name = name || product.name;
        product.description = description || product.description;
        product.price = price || product.price;

        // Save the updated product
        await product.save();

        // Return the updated product
        res.status(200).json({
            message: "Product updated successfully",
            product
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error updating product" });
    }
}

exports.deleteProducts = async (req, res) => {
    console.log("delete products request received");
    try {
        const { id, email } = req.user;
        const productId = req.params.id;

        const user = await User.findByPk(id);
        console.log(user.email, email, id);
        if (!user || email !== user.email) {
            return res.status(400).send({
                error: 'Invalid user',
            })
        }

        const product = await Product.findByPk(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        // Delete the product
        await product.destroy();

        // Return a success message
        res.status(200).json({
            message: "Product deleted successfully",
            productId: productId
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error deleting product" });
    }
}

exports.searchProducts = async (req, res) => {
    console.log("search products request received");
    const { name, price, description } = req.query;

    let filter = {};

    if (name) {
        filter.name = { $regex: name, $options: 'i' };  // Using case-insensitive regex for name
    }
    if (price) {
        filter.price = price;
    }
    if (description) {
        filter.description = { $regex: description, $options: 'i' };  // Using case-insensitive regex for description
    }

    try {
        const products = await MongoProduct.find(filter);

        if (products.length === 0) {
            console.log("NO products found");
            return res.status(404).json({ message: "No products found matching the search criteria." });
        }
        console.log("products found: " + products);

        res.status(200).json({products: products});
    } catch(error) {
        return res.status(400).json({})
    }
}

const validateUser = async (id, email) => {
    const user = await User.findByPk(id);
    if (!user || email !== user.email) {
        return false;
    } else {
        console.log(user.email, email, id);
        return true;
    }
}