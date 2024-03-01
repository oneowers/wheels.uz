import React from 'react';
import './ProductItem.css';
import { Link } from 'react-router-dom';

const ProductItem = ({ item }) => {
  return (
    <li key={item.id} className="relative flex sm:py-10 items-center justify-center overflow-hidden">
        <Link to={`/wheels/${item.id}`}>
      <div className="absolute z-10 w-full h-full flex items-center justify-center animate-road">
        <span className="text-black text-7xl font-bold">{item.name}</span>
      </div>
      
      <img
        src={item.image}
        alt={item.image}
        className="h-22 w-60 rounded-lg object-cover object-center relative z-10"
      />
      </Link>
    </li>
  );
};

export default ProductItem;
