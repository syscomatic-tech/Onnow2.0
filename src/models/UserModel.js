const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
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

    role: {
        type: String,
        default: "ACO",
        // ACO=Account Owner,BM=Brand Manager,OM=OutletManager
        enum: ["ACO", "BM", "OM"],
        required: true
    },
    isActive: {
        type: Boolean, default: false
    },
    isVerified: {
        type: Boolean, default: false
    }

}, {versionKey: false}, {timestamps: true})




// Password Hash Function using Bycryptjs

UserSchema.pre('save', async function hashPassword(next) {
    if (this.isModified('password')) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
});

UserSchema.methods = {
    async authenticate(password) {
        return await bcrypt.compare(password, this.password);
    },
};


//Validations
UserSchema.path('phone_number').validate(function (value) {
    const regex = /^\d{13}$/; // regular expression to match 11 digits
    return regex.test(value);
}, 'Must be a valid phone number');

const UserModel = mongoose.model('user', UserSchema);

module.exports = UserModel;

