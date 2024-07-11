const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A product must have a name']
    },
    quantity: {
        type: Number,
        required: [true, 'A product must have a quantity'],
        min: [1, 'Minimum quantity must be greater than zero'],
        max: 1000
    },
    price: {
        type: Number,
        required: [true, 'A product must have a price']
    },
    user: {
        type: String,
        ref: 'User',
        required: true
    },
    description: {
        type: String,
        trim: true
      }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;