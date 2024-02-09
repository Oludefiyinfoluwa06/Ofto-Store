const Wishlist = require('../models/wishlist');
const Product = require('../models/product');

const getWishlistItems = async (req, res) => {
    const wishlist = await Wishlist.find();

    if (!wishlist) {
        return res.json({ 'error': 'You have no items in your wishlist' });
    }

    return res.json({ 'wishlist': wishlist });
}

const addItem = async (req, res) => {
    const { productId, name, price, image } = req.body;

    const productDetails = await Product.findById(productId);

    if (!productDetails) {
        return res.json({ 'error': 'Product does not exist' });
    }

    const wishlistItem = await Wishlist.create({ productId: productDetails._id, buyer: req.buyer.id, name, price, quantity: 1, image });

    if (!wishlistItem) {
        return res.json({ 'error': 'An error occurred while adding to wishlist' });
    }

    return res.json({ 'message': 'Product added to wishlist successfully' });
}

const deleteWishlistItem = async (req, res) => {
    const id = req.params.id;

    const wishlistItem = await Wishlist.findByIdAndDelete(id);

    if (!wishlistItem) {
        return res.json({ 'error': 'An error occurred while trying to delete this item from the wishlist' });
    }

    return res.json({ 'message': 'Product deleted successfully' });
}

const clearWishlist = async (req, res) => {
    const buyerId = req.buyer.id;

    const wishlist = await Wishlist.deleteMany({ buyer: buyerId });

    if (!wishlist || wishlist.deletedCount === 0) {
        return res.json({ 'error': 'You have no item in your wishlist' });
    }

    return res.json({ 'message': 'wishlist cleared successfully' });
}

module.exports = {
    getWishlistItems,
    addItem,
    deleteWishlistItem,
    clearWishlist,
}