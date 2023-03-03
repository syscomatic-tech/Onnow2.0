const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema({
  customerName: {
    type: String,
    max: [12, 'Your name length cannot be greater than 12 characters'],
    required: [true, 'Please enter your name'],
  },
  phoneNumber: {
    type: String,
    max: [13, 'Please enter a valid phone number'],
    required: [true, 'Please enter a phone number'],
  },
  password: {
    type: String,
    min: [6, 'Your password must be at least 6 characters'],
    required: [true, 'Please enter a password'],
  },
  usedPromoCodes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'discount',
    },
  ],
  addresses: [
    {
      label: {
        type: String,
        required: [
          true,
          'Please enter a address label (example: Home, Office)',
        ],
      },
      address: {
        type: String,
        required: [true, 'Please enter an address'],
      },
      deliveryInstruction: {
        type: String,
        default: '',
      },
    },
  ],
});

// Password Hash Function using Bycryptjs

CustomerSchema.pre('save', async function hashPassword(next) {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

CustomerSchema.methods = {
  async authenticate(password) {
    return await bcrypt.compare(password, this.password);
  },
};

//Validations
CustomerSchema.path('phoneNumber').validate(function (value) {
  const regex = /^\d{13}$/; // regular expression to match 11 digits
  return regex.test(value);
}, 'Please enter a valid phone number');

const CustomerModel = mongoose.model('customer', CustomerSchema);

module.exports = CustomerModel;
