const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);



router.post('/create-payment-intent', auth, async (req, res) => {
    const { amount } = req.body;
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: "inr",
            payment_method_types: ['card'],
        });

        res.send({
            clientSecret: paymentIntent.client_secret,
        });
    } catch (error) {
        console.error('Error processing payment:', error);
        res.status(500).json({ error: 'Payment failed' });
    }
})

router.post('/create-checkout-session', auth, async (req, res) => {
    const { products } = req.body;

    const lineItems = products?.map(product => ({
        price_data: {
            currency: 'usd',
            product_data: {
                name: product.name,
                images: [product.image]
            },
            unit_amount: product.price * 100,
        },
        quantity: product.quantity,
    }))

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: 'http://localhost:3000/home',
            cancel_url: 'http://localhost:3000/cart',
        });

        res.json({ id: session.id });
    } catch (error) {
        console.error('Error processing payment:', error);
        res.status(500).json({ error: 'Payment failed' });
    }
})

module.exports = router;