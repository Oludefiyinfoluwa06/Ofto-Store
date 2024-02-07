const validator = require("validator");
const Product = require("../models/product");
const Order = require("../models/order");

const createOrder = async (req, res) => {
    const { items, billingAddress, totalPrice, paymentMethod, paymentStatus } = req.body;

    if (validator.isEmpty(billingAddress) || validator.isEmpty(paymentMethod)) { 
        return res.json({ 'error': 'Invalid input fields' });
    }

    if (paymentMethod !== 'payment on delivery') {
        paymentStatus = 'Paid';
    } else {
        paymentStatus = 'Pending';
    }

    const itemsWithSellerId = await Promise.all(items.map(async item => {
        const product = await Product.findById(item.productId);

        if (!product) {
            return res.json({ 'error': 'Product could not be found' });
        }

        item.seller = product.seller;
        return item;
    }));

    const order = await Order.create({ buyer: req.buyer.id, items: itemsWithSellerId, billingAddress, totalPrice, paymentMethod, paymentStatus, deliveryStatus: 'Pending' });

    if (!order) {
        return res.json({ 'error': 'An error occurred while try to place order' });
    }

    return res.json({ 'message': 'Order placed successfully' });
}

const getBuyerOrder = async (req, res) => {
    const buyerId = req.buyer.id;

    const orders = await Order.find({ buyer: buyerId });

    return res.json({ 'orders': orders });
}

const getSellerOrder = async (req, res) => {
    const sellerId = req.seller.id;

    const orders = await Order.find({ 'items.seller': sellerId });

    return res.json({ 'orders': orders });
}

module.exports = {
    createOrder,
    getBuyerOrder,
    getSellerOrder,
}