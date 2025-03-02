const Sequelize = require('sequelize');
const sequelize = require('../../config/configSql');

const User = require('./userModel')(sequelize, Sequelize);

module.exports = { sequelize, User };
