const mongoose = require('mongoose');
const {model} = require("mongoose");
const DiscountSchema = new mongoose.Schema({
    brand:{
      type:mongoose.Schema.Types.ObjectId,
        ref:'brand',
        required:[true,'Must be select a brand!']
    },
    discountTitle: {
        type: String,
        required: [true, 'Must be insert a discount title'],
        mex: [30, 'Your title must be less then 31']

    },
    promoCode: {
        type: String,
        required: [true, 'Must be insert a promo code'],
        max: [20, 'must be included less then 21']
    },
    discountAmount: {
        type: Number,
        required: [true, 'Must be include your discount amount'],
        max: [100, 'your amount cannot be greater than 100']
    },
    expiredDate: {
        type: Date,
        required: [true, 'Must be select a date'],


    },
    minSpend: {
        type: Number,
        required:[true,'must be selected a minimum amount']
    },
    maxSpend: {
        type: Number,
        required:[true,'must be selected a maximum amount']
    },



})

const DiscountModel=mongoose.model('discount',DiscountSchema);
module.exports=DiscountModel
