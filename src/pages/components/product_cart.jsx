import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ProductModal from './ProductModal.jsx'; // Уточните путь к вашему файлу с модальным окном


const convertStringToNumber = (inputString) => {
    // Убираем пробелы и "сум" из строки
    const cleanedString = inputString.replace(/\s+/g, '').replace('сум', '');
  
    // Преобразуем строку в число
    const result = parseInt(cleanedString, 10);
  
    // Возвращаем результат
    return result;
  };

const convertNumberToString = (inputNumber) => {
  // Преобразуем число в строку и добавляем пробелы каждые три цифры с конца
  const formattedString = inputNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

  // Добавляем " сум" к отформатированной строке
  const resultString = `${formattedString} сум`;

  // Возвращаем результат
  return resultString;
};

const formatNumber = (number) => {
  // Round down to the nearest thousand
  const roundedNumber = Math.floor(number / 1000) * 1000;

  // Format the number to have exactly two decimal places
  const formattedNumber = roundedNumber.toFixed(2);

  return parseFloat(formattedNumber).toLocaleString();
};
  
  

const ProductItem = ({ item }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
    <li key={item.id}
      className="flex py-5 sm:py-10 relative 
      sm:border-none border-b
      "
      onClick={() => setIsModalOpen(true)}
      >
      <div className="flex-shrink-0">
        {item.image != null ? (
          <img
            src={item.image}
            alt={item.image}
            className="h-16 rounded-lg object-cover object-center sm:h-20 sm:w-20"
          />):
          (
            <div
              className="h-24 rounded-lg animate-pulse bg-gray-300 sm:h-32 sm:w-32"
            ></div>)
        } 
      </div>

      <div className="relative ml-4 flex flex-1 flex-col justify-between sm:ml-6">
        <div>
          <div className="flex justify-between sm:grid sm:grid-cols-2">
            <div className="pr-6">
              <h3 className="text-sm font-bold">
                <p className=" text-xs  text-gray-700 hover:text-gray-800">
                  {item.name}
                </p>
              </h3>
              <p className="mt-1 text-xs text-gray-500">Тип: {item.climate}</p>
              {item.details[0].size ? <p className="mt-1 text-xs text-gray-500">Размер: {item.details[0].size}</p> : null}
            </div>

            <div className=''>
              <p className="text-right text-xs font-medium text-gray-900">от {formatNumber(item.details[0].month_3_price)} сум</p>
            </div>
          </div> 
        </div>
      </div>
    </li>
     
    {isModalOpen && (
      <ProductModal
        item={item}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    )}
      </>
  );
};

export default ProductItem;
