const mongoose = require('mongoose');
const Seller = require('./seller');

const Schema = mongoose.Schema;

const productSchema = new Schema({
    seller: {
        type: Schema.Types.ObjectId,
        ref: Seller,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);
module.exports = Product;