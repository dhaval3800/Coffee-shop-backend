const Product = require('../model/product');
const CoffeeShop = require('../model/coffeeShop');

// Create a new product
const createProduct = async (req, res, next) => {
    try {
        const coffeeShop = await CoffeeShop.findById(req.body.coffeeShopId);
        if (!coffeeShop) {
            const error = new Error('Coffee shop not found');
            error.status = 404;
            return next(error);
        }
        const product = new Product(req.body);
        const savedProduct = await product.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        next(error);
    }
};

// Get all products
const getAllProducts = async (req, res, next) => {
    try {
        const products = await Product.find().populate('coffeeShopId');
        res.status(200).json(products);
    } catch (error) {
        next(error);
    }
};

// Get a product by ID
const getProductById = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id).populate('coffeeShopId');
        if (!product) {
            const error = new Error('Product not found');
            error.status = 404;
            return next(error);
        }
        res.status(200).json(product);
    } catch (error) {
        next(error);
    }
};

// Update a product by ID
const updateProductById = async (req, res, next) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updatedProduct) {
            const error = new Error('Product not found');
            error.status = 404;
            return next(error);
        }
        res.status(200).json(updatedProduct);
    } catch (error) {
        next(error);
    }
};

// Delete a product by ID
const deleteProductById = async (req, res, next) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) {
            const error = new Error('Product not found');
            error.status = 404;
            return next(error);
        }
        res.status(200).json({ message: 'Product deleted' });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProductById,
    deleteProductById
};
