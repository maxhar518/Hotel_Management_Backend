const mongoose = require('mongoose')
const menuSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    taste: {
        type: String,
        required: true,
        enum: ['sweet', 'spicy', 'sour']
    },
    num_Sales: {
        default: 0,
        type: Number
    }
})
const Menu = mongoose.model('Menu', menuSchema);
module.exports = Menu;
