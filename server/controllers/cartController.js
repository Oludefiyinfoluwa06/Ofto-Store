const validator = require('validator');
const Cart = require('../models/cart');
const Product = require('../models/product');

const getCartItems = async (req, res) => {
    const cart = await Cart.find();

    if (!cart) {
        return res.json({ 'error': 'No cart item stored' });
    }

    return res.json({ 'cart': cart });
}

const addItem = async (req, res) => {
    const { productId, name, price, image } = req.body;

    const productDetails = await Product.findById(productId);

    if (!productDetails) {
        return res.json({ 'error': 'Product does not exist' });
    }

    const cartItem = await Cart.create({ productId: productDetails._id, buyer: req.buyer.id, name, price, quantity: 1, image });

    if (!cartItem) {
        return res.json({ 'error': 'An error occurred while adding to cart' });
    }

    return res.json({ 'message': 'Product added to cart successfully' });
}

const updateCartItem = async (req, res) => {
    const id = req.params.id;
    const { productId, name, price, quantity, image } = req.body;

    if (validator.isEmpty(product) || validator.isEmpty(name) || !validator.isNumeric(price, { no_symbols: true }) || validator.isEmpty(description) || !validator.isInt(quantity, { min: 0 }) || !validator.isURL(image)) {
        return res.json({ 'error': 'Invalid input fields' });
    }

    const productDetails = await Product.findById(productId);

    if (!productDetails) {
        return res.json({ 'error': 'Product does not exist' });
    }

    const cartItem = await Cart.findByIdAndUpdate(id, { productId, name, price, quantity, image }, { new: true });

    if (!cartItem) {
        return res.json({ 'error': 'Product could not be found' });
    }

    return res.json({ 'message': 'Product updated in cart successfully' });
}

const deleteCartItem = async (req, res) => {
    const id = req.params.id;

    const cartItem = await Cart.findByIdAndDelete(id);

    if (!cartItem) {
        return res.json({ 'error': 'An error occurred while trying to delete this item from the cart' });
    }

    return res.json({ 'message': 'Product deleted successfully' });
}

const clearCart = async (req, res) => {
    const buyerId = req.buyer.id;

    const cart = await Cart.deleteMany({ buyer: buyerId });

    if (!cart || cart.deletedCount === 0) {
        return res.json({ 'error': 'You have no item in your cart' });
    }

    return res.json({ 'message': 'Cart cleared successfully' });
}

module.exports = {
    getCartItems,
    addItem,
    updateCartItem,
    deleteCartItem,
    clearCart,
}