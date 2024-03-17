import React, { useState, useEffect } from "react";
import ProductCart from "./product_cart.jsx";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const ProductItem = ({ productsCount, link, page, name, categoryId }) => {

  const [data, setData] = useState(null);
  const [categoryData, setCategoryData] = useState(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://linkbuy.uz/api/categories/${categoryId}/`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
  
        const jsonData = await response.json();
        setCategoryData(jsonData);
  
        // Check if jsonData.sizes exists before mapping over it
        if (jsonData && jsonData.sizes) {
          const promises = jsonData.sizes.map(async (size) => {
            const response1 = await fetch(
              `https://linkbuy.uz/api/wheels/?details_size=${size}&page=${page}`,
              {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );
  
            return response1.json();
          });
  
          const results = await Promise.all(promises);
          setData(results);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
  }, [categoryId, page]);
  

  return (
    <>
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 sm:py-6 lg:max-w-7xl lg:px-8">
          {data ? (
            data.length > 0 ? (
              <>
                <div className="pt-7 pb-5 sm:pt-7">
                  <div className="flex justify-between space-x-4 items-center">
                    <h2
                      className={classNames(
                        "text-xl font-medium text-gray-900"
                      )}
                    >
                      Шины для {categoryData.name}
                    </h2>
                    {link && (
                      <a
                        href="/"
                        className={classNames(
                          "cursor-pointer whitespace-nowrap text-sm font-medium text-gray-600 hover:text-gray-900"
                        )}
                      >
                        View all
                        <span aria-hidden="true"> &rarr;</span>
                      </a>
                    )}
                  </div>
                </div>
                <div
                  id="content-container"
                  className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 xl:gap-x-8"
                >
                  {data.map((dataItem, dataIndex) => dataItem.results && (
                    dataItem.results.map((item, itemIndex) => (
                      <ProductCart key={item.id} item={item} />
                    ))
                  ))}
                </div>
                <div className="my-4 flex justify-center">
                  <a
                    href={`http://localhost:3000/wheels/?category=1&page=${page+1}`}
                    className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Load More
                  </a>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-20">
                <p className="text-gray-500 mb-4">
                  Нет подходящих шин для этого автомобиля.
                </p>
                <a
                  href="/"
                  className="text-blue-500 underline hover:text-blue-700"
                >
                  Вернуться на главную страницу
                </a>
              </div>
            )
          ) : (
            <div
              id="content-container"
              className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8"
            >
              {[...Array(productsCount)].map((_, index) => (
                <div
                  key={index}
                  className="group h-20 w-full animate-pulse bg-gray-300 rounded-lg"
                ></div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductItem;
