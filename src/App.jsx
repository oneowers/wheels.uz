import React from 'react';
import { Route, Routes } from 'react-router-dom';
import 'font-awesome/css/font-awesome.min.css';
import './index.css';
import './App.css';

import Footer from './pages/footer.jsx';
import Header from './pages/header.jsx';
import ProductList from './pages/productList.jsx';
import HomePage from './pages/home.jsx';
import SignIn from './pages/signIn.jsx';
import Orders from './pages/orders.jsx';

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={[<Header />, <ProductList />, <Footer />]} />
        <Route path="/wheels/*" exact index element={[<Header />, <HomePage />, <Footer />]} />
        <Route path="/signin/" element={[<Header />, <SignIn />, <Footer />]} />
        <Route path="/order/:id/:plan" element={[<Orders />]}/>
      </Routes>
    </>
  );
}