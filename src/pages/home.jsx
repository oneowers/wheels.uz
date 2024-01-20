import React, { useState, useEffect } from 'react';
import ProductGrid from './components/product_grid.jsx';
import FAQSection from './components/fAQSection.jsx';
import Description from './components/description.jsx';

const App = ({ api }) => {
  return (
    <>
      <section
        aria-labelledby="sale-heading"
        className="relative mx-auto flex max-w-7xl flex-col items-center px-4 pt-8 text-center sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <h2 id="sale-heading" className="text-3xl lg:text-6xl font-bold tracking-tight text-gray-900">
            Получите скидку 7% во время нашей единоразовой распродажи
          </h2>
          <p className=" text-sm lg:text-xl mx-auto mt-4 max-w-3xl text-gray-600">
            Большинство наших товаров - лимитированные выпуски, которые больше не появятся. Покупайте любимые товары, пока они в наличии.
          </p>
          <a
            href="#"
            className="mt-6 inline-block rounded-md border border-transparent bg-gray-900 px-8 py-3 font-medium text-white hover:bg-gray-800 sm:w-auto"
          >
            Получить доступ
          </a>
        </div>
      </section>
      <ProductGrid productsCount={4} api={"iphone"}  link="/mobile" name="iPhone" />
      <ProductGrid productsCount={4} api={"noutbuki"}  link="/laptops" name="MacBook" />
      <ProductGrid productsCount={4} api={"ipad-series"}  link="/tablets" name="iPad" />
      <ProductGrid productsCount={4} api={"monobloki"}  link="/desktop" name="iMac" />

      <Description />
      <FAQSection />
    </>
  );
};

export default App;
