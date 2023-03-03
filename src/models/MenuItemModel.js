const mongoose = require('mongoose');
const { models } = require('mongoose');

const MenuItemSchema = new mongoose.Schema({
  menu: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'menu',
    required: [true, 'Must select a menu'],
  },

  itemName: {
    type: String,
    required: [true, 'Must set a name'],
  },
  description: {
    type: String,
    max: [600, 'Your item description cannot be grater then 600'],
  },
  itemImage: {
    type: String,
    required: [true, 'Must  set a item image'],
  },
  itemPrice: {
    type: Number,
    max: [50000, 'Your item price  cannot be greater then 50000'],
  },
});
const MenuItemModel = mongoose.model('menuItem', MenuItemSchema);
module.exports = MenuItemModel;
