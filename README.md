# Coffee Shop App Backend

## Introduction
This project is the backend service for the Coffee Shop App. It is built with Node.js and Express, and it interacts with a MongoDB database. Follow the steps below to set up and run the backend service on your local machine.

## Prerequisites
- Node.js (v18.x or higher)
- npm (v6.x or higher)
- MongoDB Atlas

## Installation

1. **Clone the repository:**
    ```bash
    git clone https://github.com/dhaval3800/Coffee-shop-backend.git
    ```

2. **Navigate to the project directory:**
    ```bash
    cd Coffee-shop-backend
    ```

3. **Install the dependencies:**
    ```bash
    npm install
    ```

4. **Add the .env file:**
    - Create a `.env` file in the root directory of the project.
    - Use the `.env.example` file as a reference for the required environment variables.
    - Add the following environment variables:
        ```plaintext
        PORT=5000
        MONGODB_URI=<your-mongo-db-uri>
        JWT_SECRET=<your-jwt-secret>
        STRIPE_SECRET_KEY=<your-stripe-secret-key>
        CLIENT_URI=<frontrnd-url>
        ```
 

5. **Start the project:**
    ```bash
    npm start
    ```

## Features

- **User Authentication:** Login and signup functionality using JWT.
- **Coffee Shops API:** Endpoints to create, read, update, and delete coffee shops.
- **Wishlist Management:** Endpoints to add and remove coffee shops from the user's wishlist.
- **SHop Product:** Endpoints to add and remove coffee shops product.
- **User Profile:** Endpoints to view and update user profile information.
- **Stripe:** Endpoints to create payment intent for stripe.



## Technologies Used

- Node.js
- Express
- MongoDB
- Mongoose
- JSON Web Tokens (JWT)
- bcrypt (for password hashing)
- Joi (for request validation)
- Stripe (for Payments)
