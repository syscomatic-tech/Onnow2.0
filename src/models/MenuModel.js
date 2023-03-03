const mongoose = require('mongoose');
const MenuSchema = new mongoose.Schema({
    menuName: {
        type: String,
        required: [true, 'Must set a menu name'],
        max: [20, 'Menu name cannot be greater than 20 characters'],
    },

    isActive: {
        type: Boolean,
        default: true,

    },
    offLineTime: {
        type: String,
        default: ''

    },


});

const MenuModel = mongoose.model('menu', MenuSchema);

module.exports = MenuModel;
