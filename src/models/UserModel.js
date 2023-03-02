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
        max: [6,'Your Password must be in 6 digits']
    },

    role: {
        type: String,
        default: "ACO",
        // ACO=Account Owner,BM=Brand Manager,OM=OutletManager
        enum: ["ACO", "BM", "OM"],
        required: true
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

const UserModel = mongoose.model('user', UserSchema)

module.exports = UserModel