import React from 'react';
import { Route, Routes } from 'react-router-dom';
import 'font-awesome/css/font-awesome.min.css';
import './index.css';
import './App.css';

import HomePage from './pages/home.jsx';
import Other from './pages/other.jsx';
import ProductList from './pages/productList.jsx';
import SignIn from './pages/signIn.jsx';
import FortuneWheel from './pages/fortuneWheel.jsx';
import View from './pages/view.jsx';

export default function App() {
  return (
    <>
    
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:id" index element={<View />} />
        <Route path="/discounts" element={<FortuneWheel />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/apple" element={<ProductList productsCount={100} api="https://brostore.uz/collections/apple" />} />
        <Route path="/xiaomi" element={<ProductList productsCount={100} api="https://brostore.uz/collections/xiaomi" />} />
        <Route path="/samsung" element={<ProductList productsCount={100} api="https://brostore.uz/collections/smartfony-samsung" />} />
        <Route path="/desktop" element={<ProductList productsCount={100} api="https://brostore.uz/collections/monobloki" />} />
        <Route path="/laptops" element={<ProductList productsCount={100} api="https://brostore.uz/collections/noutbuki" />} />
        <Route path="/mobile" element={<ProductList productsCount={100} api="https://brostore.uz/collections/iphone" />} />
        <Route path="/tablets" element={<ProductList productsCount={100} api="https://brostore.uz/collections/ipad-series" />} />
        <Route path="/headphones" element={<ProductList productsCount={100} api="https://brostore.uz/collections/besprovodnye-naushniki-apple" />} />
        <Route path="/other" element={<Other />} />
        
      </Routes>
    </>
  );
}