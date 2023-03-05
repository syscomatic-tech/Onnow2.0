const mongoose = require('mongoose');
const BrandSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    banner: {
      type: String,
      required: [true, 'Must Be Upload your brand banner'],
    },
    logo: {
      type: String,
      required: [true, 'Must Be Upload Logo for your brand'],
    },
    brandName: {
      type: String,
      required: [true, 'Brand Name must be unique and its required'],
    },
    brandColor: {
      type: String,
      default: '#F15B25',
    },
    domainName: {
      type: String,
      unique: [true, 'Your brand subdomain must be unique'],
      max: [12, 'Your domain must be less then 13 character'],
      trim: true,
    },
  },
  { timestamps: true }
);

const BrandModel = mongoose.model('brand', BrandSchema);
module.exports = BrandModel;
