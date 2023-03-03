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
    },

    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'customer',
        required: [true, 'Must select a customer']
    },
    outlet: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'outlet',
        required: [true, 'Must select an outlet']
    },

    items: [
        {
            item: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'menuItem',
                required: [true, 'Must select menuItems'],
            },
            quantity: {
                type: Number
            }
        }
    ]

})

const OrderModel = mongoose.model('order', OrderSchema)
module.exports = OrderModel

//Live Order