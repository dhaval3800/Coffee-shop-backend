
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    coffeeShopId: { type: Schema.Types.ObjectId, ref: 'CoffeeShop', required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    category: { type: String, enum: ['coffee', 'drinks', 'food'], required: true },
    image: { type: String } 
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
``