const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const cartSchema = new Schema({
    buyer: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    product: {
        type: Schema.Types.ObjectId,
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
    quantity: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Cart = mongoose.model('Cart', cartSchema);
module.exports = Cart;