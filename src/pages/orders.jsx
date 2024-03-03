import React, { Fragment, useState, useEffect } from "react";
import { Dialog, RadioGroup, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import YandexMapComponent from "./components/YandexMapComponent.jsx";
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';
import ProductGrid from './components/product_grid.jsx';



function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const formatNumber = (number) => {
  // Round down to the nearest thousand
  const roundedNumber = Math.floor(number / 1000) * 1000;

  // Format the number to have exactly two decimal places
  const formattedNumber = roundedNumber.toFixed(2);

  return parseFloat(formattedNumber).toLocaleString();
};

async function createOrder(orderData) {
  try {
    const formData = new FormData();
    formData.append("passport_image", orderData.passportImage);
    formData.append("full_name", orderData.fullName);
    formData.append("phone_number", orderData.phoneNumber);
    formData.append("longitude", orderData.longitude);
    formData.append("latitude", orderData.latitude);
    formData.append("adress", orderData.address);
    formData.append("quantity", orderData.quantity);
    formData.append("details", orderData.detailsId);

    const response = await fetch("http://linkbuy.uz/api/create_order/", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Order created successfully:", data);
    // You can handle the response data or perform additional actions here
  } catch (error) {
    console.error("Error creating order:", error.message);
    // Handle errors as needed
  }
}
export default function Example() {
  const { id: wheelId } = useParams();
  const { plan: planId } = useParams();
  const [data, setData] = useState();


  const [location, setLocation] = useState({});
  const [address, setAddress] = useState("");
  const [orderData, setOrderData] = useState({
    passportImage: null,
    fullName: "",
    phoneNumber: "+998",
    longitude: location.longitude,
    latitude: location.latitude,
    address: address,
    quantity: 1,
    detailsId: wheelId,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://linkbuy.uz/api/wheels/${wheelId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const jsonData = await response.json();
        setData(jsonData);
        console.log(jsonData)
        console.log(planId)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    setOrderData((prevData) => ({
      ...prevData,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  // Use useEffect to update the orderData when location or address changes
  useEffect(() => {
    setOrderData((prevData) => ({
      ...prevData,
      longitude: location.longitude,
      latitude: location.latitude,
      address: address,
    }));
  }, [location, address]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(address);
    console.log(orderData);
    createOrder(orderData);
  };

  return (
    <div className="relative flex w-full items-center overflow-hidden bg-white px-4 pb-8 pt-14 sm:px-6 sm:pt-8 md:p-6 lg:p-8">
      <Link
        to={"/"}
        className="absolute right-4 top-4 text-gray-400 hover:text-gray-500 sm:right-6 sm:top-8 md:right-6 md:top-6 lg:right-8 lg:top-8"
      >
        <span className="sr-only">Close</span>
        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
      </Link>

      <div className="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8">
        <section aria-labelledby="options-heading" className="mt-5">
          {data != null && (
        <li key={data.id}
          className="flex py-6 sm:py-10 relative"
          >
          <div className="flex-shrink-0">
            {data.images[0].image != null ? (
              <img
                src={data.images[0].image}
                alt={data.images[0].image}
                className="h-20 rounded-lg object-cover object-center sm:h-32 sm:w-32"
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
                  <h3 className="text-sm">
                    <p className="font-medium text-gray-700 hover:text-gray-800">
                      {data.name}
                    </p>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">Тип: {data.climate}</p>
                  {data.details[0].size ? <p className="mt-1 text-sm text-gray-500">Размер: {data.details[0].size}</p> : null}
                </div>

                <div className=''>
                  <p className="text-right text-sm font-medium text-gray-900">{formatNumber(planId == 0 ? data.details[0].month_3_price : data.details[0].month_6_price)} sum</p>
                  <p className="text-right text-sm font-medium text-gray-900">{planId == 0 ? "Рассрочка на 3 месяца" : "Рассрочка на 6 месяца"}</p>
                </div>
              </div> 
            </div>
          </div>
        </li>)}
    
          <div className=" rounded-lg w-full">
            <YandexMapComponent
              setLocationParent={setLocation}
              setAddressParent={setAddress}
            />
          </div>
          <form onSubmit={handleSubmit}>
            <div className="sm:col-span-3 mt-2">
              <label
                htmlFor="first-name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Полное имя
              </label>
              <div className="">
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={orderData.fullName}
                  onChange={handleInputChange}
                  className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3 mt-2">
              <label
                htmlFor="first-name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Номер телефона
              </label>
              <div className="">
                <input
                  type="text"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={orderData.phoneNumber}
                  onChange={handleInputChange}
                  className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>

              <div className="mt-3">
                <label
                  htmlFor="photo"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Удостоверение личности
                </label>
                <div className=" flex items-center gap-x-3">
                  <UserCircleIcon
                    className="h-12 w-12 text-gray-300"
                    aria-hidden="true"
                  />
                  <input
                    type="file"
                    id="passportImage"
                    name="passportImage"
                    onChange={handleInputChange}
                    className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  />
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-x-6">
              <button
                type="button"
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Save
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}
