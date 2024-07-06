const CoffeeShop = require('../model/coffeeShop');
const User = require('../model/user');


const signUp = async (req, res, next) => {
    const user = new User(req.body);
    try {
        await user.save();
        const token = await user.generateAuthToken();
        res.status(201).send({ user, token });
    } catch (e) {
        console.log("🚀 ~ file: userController.js:13 ~ signUp ~ e:", e)
        next(e);
    }
};


const login = async (req, res, next) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();
        res.send({ user, token });
    } catch (e) {
        next(e);
    }
};

const logOutUser = async (req, res, next) => {
    try {
      req.user.tokens = req.user.tokens.filter(
        (token) => token.token !== req.token
      );
      await req.user.save();
      res.send('You have successfully logged out!');
    } catch (e) {
      next(e);
    }
  };

  
const getProfile = async (req, res, next) => {
    try {
        res.send(req.user);
    } catch (e) {
        next(e); 
    }
};

const toggleShopStatus = async (req, res, next) => {
    try {
        const { shopId, actionType } = req.body;

        const shop = await CoffeeShop.findById(shopId);
        if (!shop) {
            return res.status(404).json({ message: 'Shop not found' });
        }

        const shopField = actionType === 'like' ? 'likedShops' : actionType === 'save' ? 'savedShops' : null;
        if (!shopField) {
            return res.status(400).json({ message: 'Invalid action type' });
        }

        const shopIndex = req.user[shopField].indexOf(shopId);
        const isActionApplied = shopIndex !== -1;

        if (isActionApplied) {
            req.user[shopField].splice(shopIndex, 1);
        } else {
            req.user[shopField].push(shopId);
        }

        await req.user.save();
        res.status(200).json({
            message: isActionApplied ? `Shop removed from ${shopField}` : `Shop ${actionType}d successfully`
        });
    } catch (error) {
        console.log("🚀 ~ file: userController.js:69 ~ toggleShopStatus ~ error:", error);
        next(error);
    }
};

const getUserWithSavedShops = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id).populate('savedShops');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ savedShops: user.savedShops });
    } catch (error) {
        console.log("🚀 ~ file: userController.js ~ getUserWithSavedShops ~ error:", error);
        next(error);
    }
};

const getUserWithLikedShops = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id).populate('likedShops');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ likedShops: user.likedShops });
    } catch (error) {
        console.log("🚀 ~ file: userController.js ~ getUserWithLikedShops ~ error:", error);
        next(error);
    }
};


const updateUser = async (req, res, next) => {
    const updates = Object.keys(req.body);
    try {
        updates.forEach(update => req.user[update] = req.body[update]);
        await req.user.save();
        res.send(req.user);
    } catch (e) {
        next(e); 
    }
};


const deleteUser = async (req, res, next) => {
    try {
        req.user.isDeleted = true;
        await req.user.save();
        res.send({ message: 'User deleted successfully' });
    } catch (e) {
        next(e);
    }
};

module.exports = {
    signUp,
    login,
    getProfile,
    toggleShopStatus,
    getUserWithSavedShops,
    getUserWithLikedShops,
    updateUser,
    deleteUser,
    logOutUser
};
