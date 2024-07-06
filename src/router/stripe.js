const express = require('express');
const auth = require('../middleware/auth');
const { createPaymentIntent, createCheckoutSession } = require('../controller/stripeController');
const router = express.Router();


router.post('/create-payment-intent', auth, createPaymentIntent)

router.post('/create-checkout-session', auth, createCheckoutSession )

module.exports = router;