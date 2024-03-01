import React, { Fragment, useState, useEffect } from "react";
import { Dialog, RadioGroup, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import YandexMapComponent from "./components/YandexMapComponent.jsx";
import { Link } from "react-router-dom";

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
  const [location, setLocation] = useState({});
  const [address, setAddress] = useState("");
  const [orderData, setOrderData] = useState({
    passportImage: null,
    fullName: "John Doe",
    phoneNumber: "+998",
    longitude: location.longitude,
    latitude: location.latitude,
    address: address,
    quantity: 1,
    detailsId: 1,
  });

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
