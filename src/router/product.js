const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
    createProduct,
    getAllProducts,
    getProductById,
    updateProductById,
    deleteProductById
} = require('../controller/productController');
const { validateProduct } = require('../middleware/validation');

router.post('/', auth, validateProduct, createProduct);
router.get('/', auth, getAllProducts);
router.get('/:id', auth, getProductById);
router.put('/:id', auth, validateProduct, updateProductById);
router.delete('/:id', auth, deleteProductById);

module.exports = router;
