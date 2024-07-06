const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const createPaymentIntent = async (req, res, next) => {
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
        next(error);
    }
}

const createCheckoutSession = async (req, res, next) => {
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
            success_url: `${process.env.CLIENT_URI}/payment-success`,
            cancel_url: `${process.env.CLIENT_URI}/cart`,
        });

        res.json({ id: session.id });
    } catch (error) {
        console.error('Error processing payment:', error);
        next(error)
    }
}

module.exports = {
    createPaymentIntent,
    createCheckoutSession,
};
