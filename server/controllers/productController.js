const validator = require('validator');
const Product = require('../models/product');

const allProducts = async (req, res) => {
    const products = await Product.find();

    if (!products) {
        return res.json({ 'error': 'There are no products' });
    }

    return res.json({ 'products': products });
}

const productDetails = async (req, res) => {
    const id = req.params.id;

    const product = await Product.findById(id);

    if (!product) {
        return res.json({ 'error': 'Product could not be found' });
    }

    return res.json({ 'product': product });
}

const searchProducts = async (req, res) => {
    const { query } = req.query;

    const products = await Product.find({
        $or: [
            { name: { $regex: query, $options: 'i' } },
            { category: { $regex: query, $options: 'i' } },
        ]
    });

    if (!products) {
        return res.json({ 'error': 'There are no products with that name or category' });
    }

    return res.json({ 'products': products });
}

const sellerProducts = async (req, res) => {
    const products = await Product.find({ seller: req.seller.id }).sort({ updatedAt: -1 });

    if (!products) {
        return res.json({ 'error': 'You have no products' });
    }

    return res.json({ 'products': products });
}

const addProducts = async (req, res) => {
    const { name, price, description, quantity, category, image } = req.body;

    if (validator.isEmpty(name) || !validator.isNumeric(price, { no_symbols: true }) || validator.isEmpty(description) || !validator.isInt(quantity, { min: 0 }) || validator.isEmpty(category) || !validator.isURL(image)) {
        return res.json({ 'error': 'Invalid input fields' });
    }

    const product = await Product.create({ seller: req.seller.id, name, price, description, quantity, category, image });

    if (!product) {
        return res.json({ 'error': 'An error occurred, please try again later' });
    }

    return res.json({ 'message': 'Product added successfully' });
}

const updateProduct = async (req, res) => {
    const productId = req.params.id;

    const { name, price, description, quantity, category, image } = req.nody;

    if (validator.isEmpty(name) || !validator.isNumeric(price, { no_symbols: true }) || validator.isEmpty(description) || !validator.isInt(quantity, { min: 0 }) || validator.isEmpty(category) || !validator.isURL(image)) {
        return res.json({ 'error': 'Invalid input fields' });
    }

    const product = await Product.findByIdAndUpdate(productId, { name, price, description, quantity, category, image }, { new: true });

    if (!product) {
        return res.json({ 'error': 'Product could not be found' });
    }

    return res.json({ 'message': 'Product updated successfully' });
}

const deleteProduct = async (req, res) => {
    const productId = req.params.id;

    const product = await Product.findByIdAndDelete(productId);

    if (!product) {
        return res.json({ 'error': 'Product could not be found' });
    }

    return res.json({ 'message': 'Product deleted successfully' });
}

module.exports = {
    allProducts,
    productDetails,
    searchProducts,
    sellerProducts,
    addProducts,
    updateProduct,
    deleteProduct,
}