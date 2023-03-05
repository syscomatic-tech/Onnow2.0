const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      max: [30, 'Please Input Your Name'],
      required: [true, 'Must be required your name'],
    },
    email: {
      type: String,
      unique: [true, 'your email must be unique/used already'],
      required: [true, 'email must be required'],
    },
    phoneNumber: {
        type: String,
        max:[13,'Phone Number must be less then 14'],
        unique: [true,'Your Phone Number Must be Unique/Already Used!']
    },

    password: {
      type: String,
      max: [6, 'Your Password must be in 6 digits'],
    },
    otp: {
      type: Number,
    },
    role: {
      type: String,
      //ACO -> AccountOwner
      default: 'ACO',
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },

  { timestamps: true }
);

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
UserSchema.path('phoneNumber').validate(function (value) {
  const regex = /^\d{13}$/; // regular expression to match 11 digits
  return regex.test(value);
}, 'Must be a valid phone number');

const UserModel = mongoose.model('user', UserSchema);

module.exports = UserModel;
