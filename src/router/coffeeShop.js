const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { createCoffeeShop, getAllShopsWithLikedStatus, getCoffeeShopById, getAllCoffeeShops} = require('../controller/coffeeShopController')
const { validateCoffeeShop } = require('../middleware/validation');

router.post('/', auth, validateCoffeeShop, createCoffeeShop);
router.get('/all', auth, getAllShopsWithLikedStatus);
router.get('/', auth, getAllCoffeeShops);
router.get('/:id', auth, getCoffeeShopById);

module.exports = router;
