const Sequelize = require('sequelize');
const sequelize = require('../../config/configSql');

const Product = require('./productModel')(sequelize, Sequelize);

module.exports = { sequelize, Product };
