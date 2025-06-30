// server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sequelize = require('./db');
const Point = require('./models/Point');
const Product = require('./models/Product');
const Sale = require('./models/Sale');
const StockMovement = require('./models/StockMovement');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get('/api/points', async (req, res) => {
    const points = await Point.findAll();
    res.json(points);
});

app.get('/api/products', async (req, res) => {
    const products = await Product.findAll();
    res.json(products);
});

// �������� �������
app.post('/api/sales', async (req, res) => {
    const { sellerName, pointId, sales, saleDate } = req.body;
    try {
        for (const sale of sales) {
            await Sale.create({
                sellerName,
                PointId: pointId,
                ProductId: sale.productId,
                quantity: sale.quantity,
                saleDate,
            });
        }
        res.json({ message: '������� ���������' });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

// �������� �������� �� ������ (������, ��������, ������� � �.�.)
app.post('/api/stock-movements', async (req, res) => {
    const { pointId, movements, movementDate } = req.body;
    try {
        for (const move of movements) {
            await StockMovement.create({
                PointId: pointId,
                ProductId: move.productId,
                movementType: move.type,
                quantity: move.quantity,
                movementDate,
            });
        }
        res.json({ message: '�������� �� ������ ���������' });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

const PORT = process.env.PORT || 3000;

sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Server started on port ${PORT}`);
    });
});
