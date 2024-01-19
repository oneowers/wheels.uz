import React, { useState, useEffect } from 'react';
import Header from './header.jsx';
import Footer from './footer.jsx';
import ProductGrid from './components/product_grid.jsx';
import FAQSection from './components/fAQSection.jsx';
import Description from './components/description.jsx';

const App = ({ api }) => {
  return (
    <><Header />

      <ProductGrid productsCount={4} api={"ochki-virtualnoj-realnosti"} name="Очки виртуальной реальности" />
      <ProductGrid productsCount={4} api={"igrovye-pristavki"} name="Игровые приставки" />
      <ProductGrid productsCount={4} api={"dyson"} name="Dyson" />
      <ProductGrid productsCount={4} api={"roborock"}  name="Roborock" />
      
      <Footer />
    </>
  );
};

export default App;
