const mongoose = require("mongoose")
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 7,

    },
    avatar: { type: Buffer },
    likedShops: [{ type: mongoose.Schema.Types.ObjectId, ref: 'CoffeeShop' }],
    savedShops: [{ type: mongoose.Schema.Types.ObjectId, ref: 'CoffeeShop' }],
    isDeleted: {
        type: Boolean,
        default: false
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
}, {
    timestamps: true
})


userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET)

    user.tokens = user.tokens.concat({ token })
    await user.save()

    return token
}

userSchema.methods.isMatch = async function (orgPassword, oldPassword) {
    const isMatch = await bcrypt.compare(oldPassword, orgPassword)
    return isMatch
}

userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens
    delete userObject.avatar
    delete userObject.createdAt
    delete userObject.updatedAt

    return userObject
}


userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email: email })
    if (!user) {
        throw new Error("invalid credential")
    }
    if (user?.isDeleted) {
        throw new Error('user is blocked or deleted')
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
        throw new Error("invalid credential")
    }
    return user
}

// Hashing the password
userSchema.pre('save', async function (next) {
    const user = this

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})


const User = mongoose.model('User', userSchema);
module.exports = User
