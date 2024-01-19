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
  
  

const ProductItem = ({ item }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);


  return (
    <>
    <button 
      className="group relative"
      onClick={() => setIsModalOpen(true)} 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute top-2 left-2 z-10 rounded-md text-white font-semibold bg-gray-900/50 px-2 py-1">-7%</div>
      <div className={`aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7 transition-opacity ease-in-out duration-300 ${isHovered ? 'opacity-0' : 'opacity-100'}`}>
        <img src={item.image} alt={item.title} className="fade-in-4 duration-150 h-full w-full object-cover object-center" />
      </div>
      <div className={`aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7 absolute top-0 left-0 transition-opacity ease-in-out duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
        <img src={item.image1} alt={item.title} className="h-full w-full object-cover object-center" />
      </div>
      <h3 className="text-center mt-4 text-sm text-gray-700">{item.title}</h3>
      <p className="text-center mt-2 text-sm font-sm text-gray-800 line-through">{item.price}</p>
      <p className="text-center text-lg font-medium text-gray-900">{convertNumberToString((convertStringToNumber(item.price) / 100) * (100 - 7))}</p>
    </button>
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