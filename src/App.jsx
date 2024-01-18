import { Route, Routes } from 'react-router-dom';
import 'font-awesome/css/font-awesome.min.css';
import './index.css';
import './App.css';

import HomePage from './pages/home';
import React from "react";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </>
  );
}
