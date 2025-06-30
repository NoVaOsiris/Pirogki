// client/src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import SellerPage from './SellerPage';
import AdminPage from './AdminPage';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Navigate to="/seller" replace />} />
            <Route path="/seller" element={<SellerPage />} />
            <Route path="/admin" element={<AdminPage />} />
            {/* Можно добавить страницу логина, ошибки и т.д. */}
        </Routes>
    </BrowserRouter>
);
