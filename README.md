# SuJu Botanica 🌱
# Online Nursery Website

## Introduction
Welcome to SuJu Botanica, an online nursery website where users can browse, filter, and search for plants and botanical products, add them to their cart, and securely pay online. The project is built using React, Redux, Node.js, Express.js, and Stripe.js for payment handling, making it a complete end-to-end e-commerce solution for plant lovers.

## Project Description
SuJu Botanica provides a user-friendly experience for customers to shop for a wide variety of plants. The platform supports features like category-wise browsing, product search, real-time stock management, and payment via Stripe. Users can manage their shopping cart, proceed to checkout, and complete their purchase securely online.

## Features
**Public Routes**:
All routes are accessible without authentication.

## Product Browsing:
Advanced filtering, pagination, sorting, and searching features for easier navigation. Users can view detailed product information.

## Shopping Cart:
Users can add items to their cart with quantity management, preventing stock depletion issues. The cart is persistent until checkout.

## Checkout and Payment:
Supports secure payments using Stripe.js and an option for Cash on Delivery (COD). The order creation process checks stock levels to prevent purchases of out-of-stock items.

## Debounced API Calls:
Search functionality uses debouncing to reduce unnecessary API calls.

## Technology Stack
- **Frontend**: React, Redux Toolkit, DaisyUI, TailwindCSS
- **Backend**: Node.js, Express.js, MongoDB
- **Payment**: Stripe.js
- **State Management**: Redux
- **Image Hosting**: Cloudinary or ImgBB
- **API Handling**: Redux Toolkit Query
  
## Installation Guideline
**Prerequisites**
Ensure you have the following installed:

- **Node.js** (v14 or higher)
- **npm or yarn**
- **MongoDB** (local or cloud)
- **Stripe Account** (for payment processing)

## Installation Steps
Clone the Repository:

```bash Copy code
git clone https://github.com/your-username/SuJu-Botanica-Client.git
git clone https://github.com/your-username/SuJu-Botanica-Server.git
```

## Install Dependencies:
```bash Copy code
npm install
```
## Backend Configuration:
Navigate to the backend folder:
```bash Copy code
cd SuJu-Botanica-Server
```

## Create .env File:
Create a .env file in the backend directory and add the following environment variables:
```plaintext Copy code
DB_USER=your_db_user
DB_PASS=your_db_pass
STRIPE_SECRET_KEY=your_stripe_secret_key
```

## Start the Backend Server:
```bash Copy code
npm start
```

## Frontend Configuration:
Navigate to the frontend folder:
```bash Copy code
cd SuJu-Botanica-Client
```
## Install Frontend Dependencies:
```bash Copy code
npm install
```

## Create .env File:
Create a .env file in the frontend directory and add:
```plaintext Copy code
VITE_IMAGE_HOSTING_KEY=your_vite_image_hosting_key
VITE_PAYMENT_GATEWAY_PK=your_vite_payment_gateway_pk
```
## Start the Frontend Development Server:
```bash Copy code
npm run dev
```
## Configuration
- For **image hosting**, configure ImgBB or Cloudinary API keys if using external image storage.
- Configure the **MongoDB** URI to your cloud-hosted or local MongoDB database.
- Set up your **Stripe API keys** for payment processing.

## Usage

### Browsing Products
Users can browse all available plants and products, filtered by category, sorted by price or popularity, and searched for by keywords. Pagination helps users navigate through a large selection of items.

### Adding Items to Cart
Users can add items to their cart and manage the quantities from the cart page. If an item is out of stock, it is not added to the cart. Users can proceed to checkout from the cart page.

### Payment
At checkout, users can choose to pay via Stripe or opt for Cash on Delivery (COD). The system ensures that no out-of-stock items are ordered.

## Key Features
- **Product Search, Filter, and Sort**: Allows users to easily find the products they want using advanced search options.
- **Add to Cart and Checkout**: A smooth and intuitive shopping cart experience, allowing users to adjust quantities and proceed to checkout securely.
