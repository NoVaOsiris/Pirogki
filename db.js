// db.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('sales', 'username', 'password', {
    host: 'localhost',
    dialect: 'postgres',
    logging: false,
});

module.exports = sequelize;
