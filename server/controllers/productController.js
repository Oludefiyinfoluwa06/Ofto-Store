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

const sellerProducts = async (req, res) => {
    const products = await Product.find({ seller: req.seller.id }).sort({ updatedAt: -1 });

    if (!products) {
        return res.json({ 'error': 'You have no products' });
    }

    return res.json({ 'products': products });
}

const addProducts = async (req, res) => {
    const { name, price, description, quantity, image } = req.body;

    if (validator.isEmpty(name) || !validator.isNumeric(price, { no_symbols: true }) || validator.isEmpty(description) || !validator.isInt(quantity, { min: 0 }) || !validator.isURL(image)) {
        return res.json({ 'error': 'Invalid input fields' });
    }

    const product = await Product.create({ name, price, description, quantity, image });

    if (!product) {
        return res.json({ 'error': 'An error occurred, please try again later' });
    }

    return res.json({ 'message': 'Product added successfully' });
}

module.exports = {
    allProducts,
    productDetails,
    sellerProducts,
    addProducts,
}