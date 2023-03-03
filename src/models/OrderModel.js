const mongoose = require('mongoose');
const OrderSchema = new mongoose.Schema(
  {
    orderType: {
      type: String,
      enum: ['Delivery', 'Pickup', 'Dine in'],
      required: [true, 'Please select a delivery type'],
    },
    orderStatus: {
      type: String,
      enum: [
        'Pending',
        'Customer confirmed',
        'Rider confirmed',
        'In Kitchen',
        'Completed',
      ],
      default: 'Pending',
    },
    orderId: {
      type: String,
      required: [true, 'Please add an order Id'],
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'customer',
      required: [true, 'Must select a customer'],
    },
    outlet: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'outlet',
      required: [true, 'Must select an outlet'],
    },
    items: [
      {
        item: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'menuItem',
          required: [true, 'Must select a items'],
        },
        quantity: {
          type: Number,
        },
      },
    ],
    promoCode: {
      type: mongoose.Schema.Types.String,
      ref: 'discount',
    },
  },
  { timestamps: true }
);

//Live Order

const OrderModel = mongoose.model('order', OrderSchema);
module.exports = OrderModel;
