import React from 'react';
import ProductGrid from './components/product_grid.jsx';
import { useLocation } from 'react-router-dom';

const Home = () => {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const page = parseInt(params.get('page'), 10); // Parse string to integer
  const category = parseInt(params.get('category'), 10); // Parse string to integer
  
  console.log(`page: ${page}`);
  console.log(`category: ${category}`);

  return (
    <>
      <ProductGrid productsCount={10} page={page} categoryId={category} link="/wheels/" name="Wheels" />
    </>
  );
};

export default Home;
