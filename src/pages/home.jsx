import React, { useState, useEffect } from 'react';
import ProductGrid from './components/product_grid.jsx';
import FAQSection from './components/fAQSection.jsx';
import Description from './components/description.jsx';
import { useParams } from 'react-router-dom';

const App = ({ api }) => {
  const { id: params } = useParams();

  return (
    <>
      <ProductGrid productsCount={4} api={`https://corsproxy.io/?http://linkbuy.uz/api/wheels/?category_id=${params}`} params={useParams()} link="/wheels/" name="Wheels" />
      {/* <Description />
      <FAQSection /> */}
    </>
  );
};

export default App;
