import { Fragment, useState } from 'react'
import { Dialog, RadioGroup, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { StarIcon } from '@heroicons/react/20/solid'
import Orders from './Orders.jsx'

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
  const [open, setOpen] = useState(false)
  const [selectedSize, setSelectedSize] = useState(product.sizes[2])
  const [selectedMemory, setSelectedMemory] = useState(product.memory[2])
  const [isModalOpen1, setIsModalOpen1] = useState(false);

  product.name = item.title;
  product.price = item.price;
  product.imageSrc = item.image;


  return (
    <>
    <Transition.Root show={isOpen}  as={Fragment}>
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
                <div className="fade-in-1  rounded-lg relative flex w-full items-center overflow-hidden bg-white px-4 pb-8 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
                  <button
                    type="button"
                    className="absolute right-4 top-4 text-gray-400 hover:text-gray-500 sm:right-6 sm:top-8 md:right-6 md:top-6 lg:right-8 lg:top-8"
                    onClick={onClose}
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>

                  <div className="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8">
                    <div className="aspect-h-3 aspect-w-2 overflow-hidden rounded-lg bg-white sm:col-span-4 lg:col-span-5">
                      <img src={item.images[0].image} alt={item.images[0].image} className="w-full h-full object-cover object-center" />
                    </div>
                    <div className="sm:col-span-8 lg:col-span-7">
                    

                      <h2 className="text-2xl font-bold text-gray-900 sm:pr-12">{item.name}</h2>

                      <section aria-labelledby="information-heading" className="mt-2">
                        <h3 id="information-heading" className="sr-only">
                          Product information
                        </h3>
                        <div className="my-1">
                        <div className="grid grid-cols-4 gap-4">
                          {product.memory.map((size) => (
                              <>
                                <p as="span" className='border border-gray-300 bg-gray-50 rounded-md p-2'>{size.name}</p>
                              </>
                          ))}
                        </div>
                    </div>


                        {/* Reviews */}
                        <div className="mt-4">
                          <h4 className="sr-only">Reviews</h4>
                          <div className="flex items-center">
                            <div className="flex items-center">
                              {[0, 1, 2, 3, 4].map((rating) => (
                                <StarIcon
                                  key={rating}
                                  className={classNames(
                                    product.rating > rating ? 'text-gray-900' : 'text-gray-200',
                                    'h-5 w-5 flex-shrink-0'
                                  )}
                                  aria-hidden="true"
                                />
                              ))}
                            </div>
                            <p className="sr-only">{product.rating} out of 5 stars</p>
                            <a href="#" className="ml-3 text-sm font-medium text-gray-600 hover:text-gray-500">
                              {product.reviewCount} reviews
                            </a>
                          </div>
                        </div>
                      </section>

                      <section aria-labelledby="options-heading" className="mt-5">

                        <form>
                          

                          {/* Memory */}
                          <div className="sm:flex sm:justify-between">
                            {/* Size selector */}
                            <RadioGroup onClick={() => setIsModalOpen1(true)} value={selectedSize} onChange={setSelectedSize}>
                              <RadioGroup.Label className="block text-sm font-medium text-gray-700">Рассрочка</RadioGroup.Label>
                              <div className="mt-1 grid grid-cols-1 gap-4 sm:grid-cols-2">
                                {product.sizes.map((size) => (
                                  <RadioGroup.Option
                                    as="div"
                                    key={size.name}
                                    value={size}
                                    className={({ active }) =>
                                      classNames(
                                        active ? 'ring-2 ring-gray-500' : '',
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
                                            checked ? 'border-gray-500' : 'border-transparent',
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
                        </form>
                      </section>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>

{isModalOpen1 && (
  <Orders
    item={item}
    isOpen={isModalOpen1}
    onClose={() => setIsModalOpen1(false)}
  />
)}

</>
  )
}
