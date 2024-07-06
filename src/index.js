const express = require("express")
require("./db/index")
const stripeRouter = require('./router/stripe')
const userRouter = require('./router/user')
const coffeeShopRouter = require('./router/coffeeShop');
const productRouter = require('./router/product');
const errorHandler = require("./middleware/errorHandler")
const cors = require("cors");


const app = express()
const port = process.env.PORT || 5000

app.use(cors({ origin: "*" }));
app.use(express.json())

app.use(stripeRouter)
app.use(userRouter)
app.use('/shop', coffeeShopRouter)
app.use('/product', productRouter)

app.use((req, res, next) => {
    res.status(404).send({ error: "Route not found" });
})

app.use(errorHandler)

app.listen(port, ()=>{
    console.log("Server is up on port " + port)
})
