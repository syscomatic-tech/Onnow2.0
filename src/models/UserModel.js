const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema(
  {
    name: { type: String, max: 30, required: true },
    email: { type: String, unique: true, required: true },
    phone_number: { type: String, max: [13, 'Must be a valid phone number'] },
    password: { type: String, max: 6 },

    role: {
      type: String,
      default: 'ACO',
      // ACO=Account Owner,BM=Brand Manager,OM=OutletManager
      enum: ['ACO', 'BM', 'OM'],
      required: true,
    },
  },
  { versionKey: false },
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
user.path('phone_number').validate(function (value) {
  const regex = /^\d{13}$/; // regular expression to match 11 digits
  return regex.test(value);
}, 'Must be a valid phone number');

const UserModel = mongoose.model('user', UserSchema);

module.exports = UserModel;
