const Joi = require('joi');
const { createValidator } = require('express-joi-validation');

const validator = new createValidator({passError: true});

// Define Joi schemas for validation
const userSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(7).required(),
    avatar: Joi.binary(),
    isDeleted: Joi.boolean(),
    tokens: Joi.array().items(Joi.object({
        token: Joi.string().required()
    })),
    createdAt: Joi.date(),
    updatedAt: Joi.date()
});

const updateUserSchema = Joi.object({
    name: Joi.string(),
    email: Joi.string().email(),
    password: Joi.string().min(7),
    avatar: Joi.binary()
});

const coffeeShopSchema = Joi.object({
    name: Joi.string().required(),
    details: Joi.string().required(),
    address: Joi.object({
        address: Joi.string().required(),
        city: Joi.string().required(),
        state: Joi.string().required(),
        postalCode: Joi.string().required(),
        country: Joi.string().required(),
        coordinates: Joi.object({
            latitude: Joi.number().required(),
            longitude: Joi.number().required()
        }).required()
    }).required(),
    ratings: Joi.object({
        average: Joi.number().min(0).max(5),
        numberOfRatings: Joi.number().min(0)
    }),
    images: Joi.array().items(Joi.string())
});

const productSchema = Joi.object({
    coffeeShopId: Joi.string().required(),
    name: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required().min(0),
    category: Joi.string().valid('coffee', 'drinks', 'food').required(),
    image: Joi.string().uri() // New image field
});

const validateUser = validator.body(userSchema);
const validateUpdateUser = validator.body(updateUserSchema);
const validateCoffeeShop = validator.body(coffeeShopSchema);
const validateProduct = validator.body(productSchema);


module.exports = {
    validateUser,
    validateUpdateUser,
    validateCoffeeShop,
    validateProduct
};
