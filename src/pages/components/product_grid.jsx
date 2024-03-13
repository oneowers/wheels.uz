import React, { useState, useEffect } from "react";
import ProductCart from "./product_cart.jsx";
import { Link } from "react-router-dom";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const ProductItem = ({ productsCount, api, link, name }) => {
  const [data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(api, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4  sm:px-6 sm:py-6 lg:max-w-7xl lg:px-8">
          {data ? (
            data.count > 0 ? (
              <>
                <div className="pt-7 pb-5 sm:pt-7">
                  <div className="flex justify-between space-x-4 items-center">
                    <h2
                      className={classNames(
                        "text-xl font-medium text-gray-900"
                      )}
                    >
                      Шины для {data.results[0].category.name}
                    </h2>
                    {link && (
                      <Link
                        to={"/"}
                        className={classNames(
                          "cursor-pointer whitespace-nowrap text-sm font-medium text-gray-600 hover:text-gray-900"
                        )}
                      >
                        View all
                        <span aria-hidden="true"> &rarr;</span>
                      </Link>
                    )}
                  </div>
                </div>
                <div
                  id="content-container"
                  className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 xl:gap-x-8"
                >
                  {data.results.map(
                      (item, index) =>
                        index < productsCount && (
                          <>
                            {console.log(item)}
                            <ProductCart item={item} />
                          </>
                        )
                    )}
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-20">
                <p className="text-gray-500 mb-4">
                  Нет подходящих шин для этого автомобиля.
                </p>
                <Link
                  to="/"
                  className="text-blue-500 underline hover:text-blue-700"
                >
                  Вернуться на главную страницу
                </Link>
              </div>
            )
          ) : (
            <div
              id="content-container"
              className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8"
            >
              {[0, 1, 2, 3, 4, 5, 6, 7].map(() => (
                <div className="group h-20 w-full animate-pulse bg-gray-300 rounded-lg"></div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductItem;
// Используйте ProductItem в вашем компоненте, где вы рендерите список продуктов
