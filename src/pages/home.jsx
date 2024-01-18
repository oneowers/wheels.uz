import React, { useState, useEffect } from 'react';
import Header from './header.jsx';
import Footer from './footer.jsx';

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/products/');
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array means this effect runs once when the component mounts

  return (
    <>
  <p class="flex h-12 items-center justify-center bg-gray-900 px-10 text-md font-medium text-white sm:px-15 lg:px-18">Nasiya 0% •  Купите телефон в рассрочку на 6 месяцев с 0% </p>

      <Header />

<section
  aria-labelledby="sale-heading"
  className="relative mx-auto flex max-w-7xl flex-col items-center px-4 pt-8 text-center sm:px-6 lg:px-8"
>
  <div className="mx-auto max-w-2xl lg:max-w-none">
    <h2 id="sale-heading" className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
      Получите скидку 7% во время нашей единоразовой распродажи
    </h2>
    <p className="mx-auto mt-4 max-w-3xl text-xl text-gray-600">
      Большинство наших товаров - лимитированные выпуски, которые больше не появятся. Покупайте любимые товары, пока они в наличии.
    </p>
    <a
      href="#"
      className="mt-6 inline-block w-full rounded-md border border-transparent bg-gray-900 px-8 py-3 font-medium text-white hover:bg-gray-800 sm:w-auto"
    >
      Получите доступ к нашей единоразовой распродаже
    </a>
  </div>
</section>



      <div className="bg-gray-100">
        <div className="bg-white">
          <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
            <h2 className="sr-only">Products</h2>

            <div id="content-container" className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
              {data.map((item, index) => index < data.length-3 && (
                <div key={index} className="group">
                  <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                    <img src={item.image} alt={item.title} className="h-full w-full object-cover object-center group-hover:opacity-75" />
                  </div>
                  <h3 className="mt-4 text-sm text-gray-700">{item.title}</h3>
                  <p className="mt-1 text-lg font-medium text-gray-900">{item.price}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default App;
