const mongoose = require('mongoose');
const MenuSchema = new mongoose.Schema({
  menuName: {
    type: String,
    required: [true, 'Must set a menu name'],
    max: [20, 'Menu name cannot be greater than 20 characters'],
  },
  items: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'menutItem',
    },
  ],
});

const MenuModel = mongoose.model('Menu', MenuSchema);

module.exports = MenuModel;
