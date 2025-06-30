// SellerPage.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function SellerPage() {
    const [points, setPoints] = useState([]);
    const [selectedPoint, setSelectedPoint] = useState(null);
    const [sellerName, setSellerName] = useState('');
    const [products, setProducts] = useState([]);
    const [sales, setSales] = useState({}); // productId => quantity

    useEffect(() => {
        axios.get('/api/points').then(res => setPoints(res.data));
        axios.get('/api/products').then(res => setProducts(res.data));
    }, []);

    const incrementSale = (productId) => {
        setSales(prev => ({
            ...prev,
            [productId]: (prev[productId] || 0) + 1,
        }));
    };

    const submitSales = () => {
        if (!sellerName || !selectedPoint) {
            alert('Введите имя и выберите точку');
            return;
        }
        const salesArray = Object.entries(sales).map(([productId, quantity]) => ({
            productId: Number(productId),
            quantity,
        }));
        axios.post('/api/sales', {
            sellerName,
            pointId: selectedPoint,
            sales: salesArray,
            saleDate: new Date().toISOString().slice(0, 10),
        }).then(() => {
            alert('Продажи отправлены');
            setSales({});
        });
    };

    return (
        <div>
            <h2>Продавец: Ввод продаж</h2>
            <input
                placeholder="Ваше имя"
                value={sellerName}
                onChange={e => setSellerName(e.target.value)}
            />
            <select onChange={e => setSelectedPoint(e.target.value)} defaultValue="">
                <option value="" disabled>Выберите точку</option>
                {points.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
            </select>

            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {products.map(product => (
                    <div
                        key={product.id}
                        onClick={() => incrementSale(product.id)}
                        style={{
                            border: '1px solid black',
                            padding: '10px',
                            margin: '5px',
                            cursor: 'pointer',
                            minWidth: '150px',
                        }}
                    >
                        <div>{product.name}</div>
                        <div>Цена: {product.price}р</div>
                        <div>Кол-во: {sales[product.id] || 0}</div>
                    </div>
                ))}
            </div>

            <button onClick={submitSales}>Отправить продажи</button>
        </div>
    );
}
