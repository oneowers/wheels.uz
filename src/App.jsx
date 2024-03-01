import React from 'react';
import { Route, Routes } from 'react-router-dom';
import 'font-awesome/css/font-awesome.min.css';
import './index.css';
import './App.css';

import HomePage from './pages/home.jsx';
import Orders from './pages/orders.jsx';
import Other from './pages/other.jsx';
import ProductList from './pages/productList.jsx';
import SignIn from './pages/signIn.jsx';
import FortuneWheel from './pages/fortuneWheel.jsx';
import View from './pages/view.jsx';
import Header from './pages/header.jsx';
import Footer from './pages/footer.jsx';

export default function App() {
  return (
    <>
    
    
      <Routes>
        <Route path="/" element={[<Header />, <ProductList />, <Footer />]} />
        <Route path="/wheels/:id" index element={[<Header />, <HomePage />, <Footer />]} />
        <Route path="/signin/" element={[<Header />, <SignIn />, <Footer />]} />
        <Route path="/orders/" element={[<Orders />]}/>
      </Routes>
    
    </>
  );
}