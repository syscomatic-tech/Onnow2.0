const mongoose = require('mongoose');

const brandSchema = new mongoose.Schema({
  owner: {
    owner_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, 'Owner Id is required'],
    },
    ownerName: {
      type: String,
      required: [true, 'Owner Name is required'],
    },
  },
  banner: {
    type: String,
    required: [true, 'Banner is required'],
  },
  logo: {
    type: String,
    required: [true, 'Logo is required'],
  },
  brandName: {
    type: String,
    required: [true, 'Brand Name is required'],
  },
  brandColor: {
    type: String,
    default: '#f1604a',
  },
  subDomain: {
    type: String,
    required: [true, 'Sub Domain is required'],
  },
});

const brandModel = mongoose.model('brand', brandSchema);

module.exports = brandModel;
