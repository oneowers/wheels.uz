import React, { Fragment, useState, useEffect } from 'react';
import { Dialog, RadioGroup, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { StarIcon } from '@heroicons/react/20/solid'
import YandexMapComponent from './YandexMapComponent.jsx';

const product = {
  rating: 3.9,
  reviewCount: 117,
  sizes: [
    { name: '299 000 сум', description: 'Рассрочка на 3 месяцов' },
    { name: '999 000 сум', description: 'Рассрочка на 6 месяцов' },
  ],
  memory: [
    { name: '140 см', inStock: true },
    { name: '160 см', inStock: true },
    { name: '320 см', inStock: true },
  ],
}

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const formatNumber = (number) => {
  // Round down to the nearest thousand
  const roundedNumber = Math.floor(number / 1000) * 1000;

  // Format the number to have exactly two decimal places
  const formattedNumber = roundedNumber.toFixed(2);

  return parseFloat(formattedNumber).toLocaleString();
};


export default function Example({ item, isOpen, onClose }) {
  const [open, setOpen] = useState(true);
  const [selectedSize, setSelectedSize] = useState(product.sizes[2]);
  const [selectedMemory, setSelectedMemory] = useState(product.memory[2]);

  product.name = item.title;
  product.price = item.price;
  product.imageSrc = item.image;

  const handleModalClick = (e) => {
    // Prevent the click event from propagating to the modal background
    e.stopPropagation();
  };


  return (
    <Transition.Root show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10 " onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fade-in-3 fixed inset-0 hidden bg-gray-500 bg-opacity-75 transition-opacity md:block" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
              enterTo="opacity-100 translate-y-0 md:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 md:scale-100"
              leaveTo="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
            >
              <Dialog.Panel className="flex w-full transform text-left text-base transition md:my-8 md:max-w-2xl md:px-4 lg:max-w-4xl">


              

              <div
            className="fade-in-1 rounded-lg relative flex w-full items-center overflow-hidden bg-white px-4 pb-8 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8"
            
          >
            <button
              type="button"
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-500 sm:right-6 sm:top-8 md:right-6 md:top-6 lg:right-8 lg:top-8"
              onClick={onClose}
            >
              <span className="sr-only">Close</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>

                  <div className="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8">


                  <div className=' rounded-lg w-full'>
                
                  <div>
                    <YandexMapComponent />
                  </div>
                
              </div>
                  


                  <section aria-labelledby="options-heading" className="mt-5">
                    <form>
                      <div className="sm:flex sm:justify-between">
                        {/* Size selector */}
                        <RadioGroup value={selectedSize} onChange={setSelectedSize}>
                          <RadioGroup.Label className="block text-sm font-medium text-gray-700">Рассрочка</RadioGroup.Label>
                          <div className="mt-1 grid grid-cols-1 gap-4 sm:grid-cols-2">
                            {product.sizes.map((size) => (
                              <RadioGroup.Option
                                as="div"
                                key={size.name}
                                value={size}
                                className={({ active }) =>
                                  classNames(
                                    active ? 'ring-2 ring-indigo-500' : '',
                                    'relative block cursor-pointer rounded-lg border border-gray-300 p-4 focus:outline-none'
                                  )
                                }
                              >
                                {({ active, checked }) => (
                                  <>
                                    <RadioGroup.Label as="p" className="text-base font-medium text-gray-900">
                                      {size.name}
                                    </RadioGroup.Label>
                                    <RadioGroup.Description as="p" className="mt-1 text-sm text-gray-500">
                                      {size.description}
                                    </RadioGroup.Description>
                                    <div
                                      className={classNames(
                                        active ? 'border' : 'border-2',
                                        checked ? 'border-indigo-500' : 'border-transparent',
                                        'pointer-events-none absolute -inset-px rounded-lg'
                                      )}
                                      aria-hidden="true"
                                    />
                                  </>
                                )}
                              </RadioGroup.Option>
                            ))}
                          </div>
                        </RadioGroup>
                      </div>
                      <button
                        type="submit"
                        className="mt-6 flex w-full items-center justify-center rounded-md border border-transparent bg-gray-600 px-8 py-3 text-base font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                      >
                        Add to bag
                      </button>
                    </form>
                  </section>
                    </div>
                  </div>


              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
