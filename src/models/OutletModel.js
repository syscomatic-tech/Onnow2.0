const mongoose = require('mongoose');
const OutLetSchema = new mongoose.Schema({
    brand: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'brand',
        required: [true, 'Must be select a brand']
    },
    outletName: {
        type: String,
        max: [15, 'Your Outlet Should be less then 16 character'],
        required: [true, 'Must included'],
    },
    outletAddress: {
        type: String,
        required: [true, 'Must be have an Address'],
        max: [400, 'your address should be less then 400'],

    },
    outletPhoneNumber: {
        required: [true, 'Must be a Phone number'],
        max: [13, 'Your Phone number must less then 14'],

    },
    deliveryCharge: {
        type: Number,
        max: [100, 'Your Charge must be less the 101'],
        default: 0,

    },
    averageDeliveryTime: {
        from: {
            type: Number,
            default: 0,
        },
        to: {
            type: Number,
            default: 5
        }
    },
    taxRate: {
        type: Number,
        default: 0,
        max: [100, 'Your tax value must be less then 101'],

    },
    taxStatus: {
        type: String,
        enum: ['inclusive', 'exclusive'],
        default: 'inclusive',

    },
    paymentMethod:{

    }
})


OutLetSchema.path('outletPhoneNumber').validate(function (value) {
    const regex = /^\d{13}$/; // regular expression to match 11 digits
    return regex.test(value);
}, 'Must be a valid phone number');
