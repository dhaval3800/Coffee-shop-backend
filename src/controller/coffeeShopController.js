const CoffeeShop = require('../model/coffeeShop');
const Product = require('../model/product');

const createCoffeeShop = async (req, res, next) => {
    try {
        const coffeeShop = new CoffeeShop(req.body);
        const savedShop = await coffeeShop.save();
        res.status(201).json(savedShop);
    } catch (error) {
        next(error);
    }
};

const getAllCoffeeShops = async (req, res, next) => {
    try {
        const coffeeShops = await CoffeeShop.find();
        res.status(200).json(coffeeShops);
    } catch (error) {
        next(error);
    }
};


const getAllShopsWithLikedStatus = async (req, res, next) => {
    try {
        console.log("🚀 ~ file: coffeeShopController.js:25 ~ getAllShopsWithLikedStatus ~ req:")
        const shops = await CoffeeShop.find();
        console.log("🚀 ~ file: coffeeShopController.js:27 ~ getAllShopsWithLikedStatus ~ shops:", shops)
        const likedShops = req.user.likedShops.map(shopId => shopId.toString());

        const shopsWithStatus = shops.map(shop => ({
            ...shop.toObject(),
            isLiked: likedShops.includes(shop._id.toString())
        }));

        res.status(200).json(shopsWithStatus);
    } catch (error) {
        next(error);
    }
};


const getCoffeeShopById = async (req, res, next) => {
    try {
        const coffeeShop = await CoffeeShop.findById(req.params.id).exec();
        if (!coffeeShop) {
            const error = new Error('Coffee shop not found');
            error.status = 404;
            return next(error);
        }

        const products = await Product.find({ coffeeShopId: req.params.id }).exec();

        res.status(200).json({
            ...coffeeShop.toObject(),
            products
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createCoffeeShop,
    getAllCoffeeShops,
    getCoffeeShopById,
    getAllShopsWithLikedStatus
};
