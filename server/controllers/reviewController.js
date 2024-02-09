const validator = require('validator');
const Review = require('../models/review');
const Buyer = require('../models/buyer');

const addReview = async (req, res) => {
    const productId = req.params.id;
    const buyerId = req.buyer.id;
    const { rating, comment } = req.body;

    if (validator.isEmpty(rating) || validator.isEmpty(comment)) {
        return res.json({ 'error': 'Input fields cannot be empty' });
    }

    if (rating < 1 || rating > 5) {
        return res.json({ 'error': 'The rating value must be between 1 and 5' });
    }

    const { firstname, lastname } = await Buyer.findById(buyerId);

    const review = await Review.create({ product: productId, buyer: buyerId, name: firstname + ' ' + lastname, rating, comment });

    if (!review) {
        return res.json({ 'error': 'An error occured while adding a review' });
    }

    return res.json({ 'message': 'Review has been added successfully'});
}

const getAllReviews = async (req, res) => {
    const productId = req.params.id;

    const reviews = await Review.find(productId);

    if (!reviews) {
        return res.json({ 'error': 'There are no reviews for this product' });
    }

    return res.json({ 'reviews': reviews });
}

const getSellerReviews = async (req, res) => {
    const productId = req.params.id;

    const reviews = await Review.find(productId);

    if (!reviews) {
        return res.json({ 'error': 'There are no reviews for this product' });
    }

    return res.json({ 'reviews': reviews });
}

module.exports = {
    addReview,
    getAllReviews,
    getSellerReviews
}