const mongoose = require('mongoose');
const {models} = require("mongoose");
const OrderSchema = new mongoose.Schema({
    orderStatus: {
        type: String,
        enum: ['Pending', 'Customer confirmed', 'Rider confirmed', 'In Kitchen', 'Completed'],
        default: 'Pending'
    },
    orderId: {
        type: String,
        required: true,
    }
})

const OrderModel = mongoose.model('order', OrderSchema)
modele.exports = OrderModel