// models/StockMovement.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Point = require('./Point');
const Product = require('./Product');

const StockMovement = sequelize.define('StockMovement', {
    movementType: { // 'arrival', 'writeoff', 'transfer', 'evening_balance'
        type: DataTypes.ENUM('arrival', 'writeoff', 'transfer', 'evening_balance'),
        allowNull: false,
    },
    quantity: { type: DataTypes.INTEGER, allowNull: false },
    movementDate: { type: DataTypes.DATEONLY, allowNull: false },
});

StockMovement.belongsTo(Point);
StockMovement.belongsTo(Product);

module.exports = StockMovement;
