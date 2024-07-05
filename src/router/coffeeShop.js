const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const coffeeShopController = require('../controller/coffeeShopController');
const { validateCoffeeShop } = require('../middleware/validation');

router.post('/', auth, validateCoffeeShop, coffeeShopController.createCoffeeShop);
router.get('/all', auth, coffeeShopController.getAllShopsWithLikedStatus);
router.get('/', auth, coffeeShopController.getAllCoffeeShops);
router.get('/:id', auth, coffeeShopController.getCoffeeShopById);

module.exports = router;
