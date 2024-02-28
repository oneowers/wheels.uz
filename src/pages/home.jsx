import React, { useState, useEffect } from 'react';
import ProductGrid from './components/product_grid.jsx';
import FAQSection from './components/fAQSection.jsx';
import Description from './components/description.jsx';

const App = ({ api }) => {
  return (
    <>
      <ProductGrid productsCount={4} api={"wheels"}  link="/wheels/" name="Wheels" />
      {/* <Description />
      <FAQSection /> */}
    </>
  );
};

export default App;
