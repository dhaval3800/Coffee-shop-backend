const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const auth = require('../middleware/auth');
const { validateUser, validateUpdateUser } = require('../middleware/validation');

router.post('/signup', validateUser, userController.signUp);
router.post('/login', userController.login);
router.get("/logout", auth, userController.logOutUser);
router.get('/me', auth, userController.getProfile);
router.patch('/me', auth, validateUpdateUser, userController.updateUser);
router.delete('/me', auth, userController.deleteUser);
router.post('/toggleStatus', auth, userController.toggleShopStatus);
router.get('/saved', auth, userController.getUserWithSavedShops);
router.get('/liked', auth, userController.getUserWithLikedShops);   

module.exports = router;
