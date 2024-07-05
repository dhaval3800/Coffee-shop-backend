const mongoose = require('mongoose');
require('dotenv').config();
const uri = process.env.MONGODB_URI;

mongoose.connect(uri)
.then(() => {
  console.log("Successfully connected to MongoDB using Mongoose!");
})
.catch((err) => {
  console.error("Error connecting to MongoDB:", err);
});
