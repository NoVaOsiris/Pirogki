// models/Point.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Point = sequelize.define('Point', {
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
});

module.exports = Point;
