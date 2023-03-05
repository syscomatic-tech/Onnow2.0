const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

const OutletManagerSchema = new mongoose.Schema(
  {
    outlets: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'outlet',
        required: [true, 'Select a Brand Please'],
      },
    ],

    brands: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'brand',
        required: [true, 'Select a Brand Please'],
      },
    ],
    userAdmin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: [true, 'must be select an admin '],
    },

    userManager: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'brandManager',
      required: true,
    },

    ProfilePic: {
      type: String,
    },

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
    phoneNumber: { type: String, max: 13 },
    password: {
      type: String,
      max: [6, 'Your Password must be in 6 digits'],
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

OutletManagerSchema.pre('save', async function hashPassword(next) {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

OutletManagerSchema.methods = {
  async authenticate(password) {
    return await bcrypt.compare(password, this.password);
  },
};

// Phone Number Validation
OutletManagerSchema.path('phoneNumber').validate(function (value) {
  const regex = /^\d{13}$/; // regular expression to match 11 digits
  return regex.test(value);
}, 'Must be a valid phone number');

const OutletManagerModel = mongoose.model('outletManager', OutletManagerSchema);
module.exports = OutletManagerModel;
