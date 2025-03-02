# Product Manager App

## Overview
The **Product Manager App** is a web application that allows you to manage a list of products. It supports features such as creating, updating, deleting, and searching products. The app is built using Node.js, Express, Sequelize for MySQL, and Mongoose for MongoDB.

### Key Features:
- **Product Management**: Add, edit, and delete products.
- **Product Search**: Search products by name, price, description, or ID.
- **Pagination**: View products in a paginated format.
- **JWT Authentication**: Secure endpoints with JWT-based authentication.

## Technologies Used:
- **Node.js** with Express for the backend.
- **MySQL** for relational database management (Sequelize ORM).
- **MongoDB** for storing product data and other related information (Mongoose ODM).
- **JWT** for authentication and authorization.

## Installation & Setup

### 1. Clone the Repository:
```bash
git clone https://github.com/avshalom-ariel/gigsberg.git
cd gigsberg
```

### 2. Install Dependencies (Both in backend & frontend):
```bash
npm install
```

### 3. Configure the .env File in the backend directory:
You need to create a .env file in the root directory of your project with the following fields (make sure to replace the values with your own):
```bash
# MySQL variables
DB_DIALECT=mysql
DB_HOST=localhost
DB_USER=your_mysql_user
DB_PASSWORD=your_mysql_password
DB_NAME=Gigsberg

# MongoDB variables
MONGO_URI=mongodb+srv://your_mongo_user:your_mongo_password@your_mongo_cluster_url

# Server variables
PORT=3003
FRONTEND_URI=localhost:3000

# JWT variables
JWT_EXPIRATION=1h
JWT_SECRET=your_jwt_secret
ROUNDS=10
```
### 4. Run the Application:
```bash
npm start
```
