// models/Sale.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Point = require('./Point');
const Product = require('./Product');

const Sale = sequelize.define('Sale', {
    sellerName: { type: DataTypes.STRING, allowNull: false },
    quantity: { type: DataTypes.INTEGER, allowNull: false },
    saleDate: { type: DataTypes.DATEONLY, allowNull: false },
});

Sale.belongsTo(Point);
Sale.belongsTo(Product);

module.exports = Sale;
