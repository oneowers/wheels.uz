import React, { Fragment, useState, useEffect } from "react";
import { Dialog, RadioGroup, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
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

export default function Example() {
  const [location, setLocation] = useState({});
  const [adress, setAddress] = useState("");

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
          <form>
            <div className=" rounded-lg w-full">
              <div>
                <YandexMapComponent
                  setLocationParent={setLocation}
                  setAddressParent={setAddress}
                />
              </div>
            </div>
            
            
            <button
              type="submit"
              className="mt-6 flex w-full items-center justify-center rounded-md border border-transparent bg-gray-600 px-8 py-3 text-base font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              Оформить заказ
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}
