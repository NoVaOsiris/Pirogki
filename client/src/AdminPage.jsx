// AdminPage.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function AdminPage() {
    const [products, setProducts] = useState([]);
    const [points, setPoints] = useState([]);
    const [newProductName, setNewProductName] = useState('');
    const [newProductPrice, setNewProductPrice] = useState('');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        axios.get('/api/products').then(res => setProducts(res.data));
        axios.get('/api/points').then(res => setPoints(res.data));
    };

    const addProduct = () => {
        axios.post('/api/products', { name: newProductName, price: parseFloat(newProductPrice) })
            .then(() => {
                setNewProductName('');
                setNewProductPrice('');
                fetchData();
            });
    };

    return (
        <div>
            <h2>�������: ���������� ��������</h2>

            <input
                placeholder="�������� ������"
                value={newProductName}
                onChange={e => setNewProductName(e.target.value)}
            />
            <input
                type="number"
                placeholder="����"
                value={newProductPrice}
                onChange={e => setNewProductPrice(e.target.value)}
            />
            <button onClick={addProduct}>�������� �����</button>

            <ul>
                {products.map(p => (
                    <li key={p.id}>{p.name} � {p.price}�</li>
                ))}
            </ul>

            {/* ���������� ����� �������� ���������� �������, ������ � �.�. */}
        </div>
    );
}
