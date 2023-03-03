const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

const BrandManagerSchema = new mongoose.Schema({
    brands: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'brand',
            required: [true, 'Select a Brand Please']
        },

    ],
    userAdmin:{
      type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:[true,'must be select an admin ']
    },

    userManager:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'brandManager',
        required: true
    },


    ProfilePic: {
        type: String
    },

    name: {
        type: String,
        max: [30, 'Please Input Your Name'],
        required: [true, 'Must be required your name']
    },
    email: {
        type: String,
        unique: [true, 'your email must be unique/used already'],
        required: [true, 'email must be required']
    },
    phone_number: {type: String, max: 13},

    password: {
        type: String,
        max: [6, 'Your Password must be in 6 digits']
    },


    isActive: {
        type: Boolean, default: false
    },
    isVerified: {
        type: Boolean, default: false
    }

}, {versionKey: false}, {timestamps: true})

BrandManagerSchema.pre('save', async function hashPassword(next) {
    if (this.isModified('password')) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
});

BrandManagerSchema.methods = {
    async authenticate(password) {
        return await bcrypt.compare(password, this.password);
    },
};

// Phone Number Validation
BrandManagerSchema.path('phone_number').validate(function (value) {
    const regex = /^\d{13}$/; // regular expression to match 11 digits
    return regex.test(value);
}, 'Must be a valid phone number');

const BrandMangerModel=mongoose.model('brandManger',BrandManagerSchema)
module.exports=BrandMangerModel