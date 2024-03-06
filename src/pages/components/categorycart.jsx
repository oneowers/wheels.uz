import React from "react";
import "./ProductItem.css";
import { Link } from "react-router-dom";
import {StarIcon} from '@heroicons/react/20/solid';

const formatNumber = (number) => {
    // Round down to the nearest thousand
    const roundedNumber = Math.floor(number / 1000) * 1000;
  
    // Format the number to have exactly two decimal places
    const formattedNumber = roundedNumber.toFixed(2);
  
    return parseFloat(formattedNumber).toLocaleString();
  };

const ProductItem = ({ item }) => {
  return (
    <>
      <li
        key={item.id}
        className="sm:bg-red-500 lg:hidden md:hidden relative flex sm:py-10 items-center justify-center overflow-hidden"
      >
        <Link to={`/wheels/${item.id}`}>
          <div className="absolute z-10 w-full h-full flex items-center justify-center animate-road">
            <span className="text-black text-7xl  font-bold">{item.name}</span>
          </div>

          <img
            src={item.image}
            alt={item.image}
            className="h-22 w-60 rounded-lg object-cover object-center relative z-10"
          />
        </Link>
      </li>

      <div className="hidden sm:hidden lg:block md:block ">
            <div key={item.id} className="group p-1 sm:p-2 fade-in">
              <div
                className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg"
              >
                <Link to={"/wheels/" + item.id}>
                  <img
                    src={item.image}
                    alt={item.image}
                    className="w-full h-90 object-cover bg-center"
                  />
                </Link>
              </div>
              <div className="pb-4 pt-5">
                <div className="text-base text-gray-900 bg-gray-100 rounded-lg p-2 text-center">
                  <Link to={"/wheels/" + item.id}>
                    Шины для {item.name}
                    <span className="placeholder col-6"></span>
                  </Link>
                </div>
              </div>
            </div>
      </div>
    </>
  );
};

export default ProductItem;
