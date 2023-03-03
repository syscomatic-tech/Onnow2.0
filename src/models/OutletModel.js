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
    paymentMethod: {
        cashOnDelivery: {
            type: Boolean,
            default: true
        },
        digitalPayment: {
            type: Boolean,
            default: false
        }
    },
    deliveryArea: [
        {
            type: String,
            required: [true, "Must be selected one area please"]
        }
    ],
    tableNumber: [
        {
            type: Number,
        }
    ],

    outletOwner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: [true, 'Must be select a User']
    },

    outletStatus: {
        type: String,
        enum: ['Open', 'Closed', 'Paused'],
        default: 'Open'
    },
    isApprove: {
        type: Boolean,
        default: false
    },

    shift: [
        {
            day: {
                type: String,
                enum: ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'],
                required: [true, 'must be select a day']
            },

            isOpen: {
                type: Boolean,
                default: true
            },
            startHour: {
                type: String,
                required:[true,'must be select a starting hour']
            },
            endHour: {
                type: String,
                required:[true,'must be select a end hour']

            }
        }
    ]
})


OutLetSchema.path('outletPhoneNumber').validate(function (value) {
    const regex = /^\d{13}$/; // regular expression to match 11 digits
    return regex.test(value);
}, 'Must be a valid phone number');
