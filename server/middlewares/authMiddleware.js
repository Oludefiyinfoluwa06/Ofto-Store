const jwt = require('jsonwebtoken');

const Buyer = require('../models/buyer');
const Seller = require('../models/seller');

const protectRoute = async (req, res, next) => {
    if (req.headers.authorization) {
        try {
            token = req.headers.authorization;

            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.buyer = await Buyer.findById(decoded.id).select('-password');
            next();
        } catch (error) {
            res.json({ 'error': 'Buyer is not authorized, try logging in again' });
        }
    } else {
        res.json({ 'error': 'Buyer is not authorized and no token, try logging in' });
    }
}

const protectSellerRoute = async (req, res, next) => {
    if (req.headers.authorization) {
        try {
            token = req.headers.authorization;

            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.seller = await Seller.findById(decoded.id).select('-password');
            next();
        } catch (error) {
            res.json({ 'error': 'Seller is not authorized, try logging in again' });
        }
    } else {
        res.json({ 'error': 'Seller is not authorized and no token, try logging in' });
    }
}

module.exports = {
    protectRoute,
    protectSellerRoute,
}