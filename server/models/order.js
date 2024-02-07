const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = new Schema({
    buyer: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    items: [
        {
            seller: {
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
            }
        }
    ],
    billingAddress: {
        type: String,
        required: true,
    },
    totalPrice: {
        type: Number,
        required: true,
    },
    paymentMethod: {
        type: String,
        required: true,
    },
    paymentStatus: {
        type: String,
        required: true,
    },
    deliveryStatus: {
        type: String,
        required: true,
    },
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;