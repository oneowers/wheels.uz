import { Disclosure } from '@headlessui/react';
import { PlusIcon, MinusIcon } from '@heroicons/react/24/outline';


const faqs = [
    {
      question: 'Вы продаете только оригинальные телефоны?',
      answer: 'Да. Компания представляет бренд Apple на территории Узбекистана и реализует исключительно оригинальную продукцию. Кроме того, мы предоставляем гарантийное сервисное обслуживание покупателям смартфонов, ноутбуков, планшетов и другой электроники из нашего интернет-магазина.',
    },
    {
      question: 'Возможны ли какие-то дополнительные расходы, кроме тех, которые указаны при подтверждении заказа?',
      answer: 'Нет. Сумма к оплате, указанная при оформлении заявки, является окончательной. В нее включена стоимость, а также дополнительные затраты (доставка) или льготы (акции, скидки).',
    },
    {
      question: 'Предусмотрен ли у вас возврат товара?',
      answer: 'Возврата нет. В случаях, если клиент не удовлетворен устройством и считает, что оно ненадлежащего качества, он имеет право на обмен товара в течение трех рабочих дней с момента покупки товара, с условием отправки заказа обратно в Bro за свой счет, в неповрежденном виде, с наличием всей комплектации товара.',
    },
    {
      question: 'Почему на одни и те же модели могут быть разные цены?',
      answer: 'Мобильные гаджеты одной марки могут различаться между собой цветом, языковыми пакетами, объемом памяти, клавиатурой и другими спецификациями. Это и является причиной различия в цене.',
    },
    {
      question: 'Какие бренды гаджетов у вас представлены?',
      answer: 'Мы являемся дистрибьюторами Apple, Samsung и Xiaomi в Узбекистане. Наши продукты отвечают стандартам качества и поддерживаются гарантийными обязательствами от производителей.',
    },
    {
      question: 'Как долго осуществляется доставка?',
      answer: 'Сроки доставки зависят от вашего местоположения. В общем, мы стремимся осуществить доставку в течение 2-5 рабочих дней. Дополнительные сведения о доставке можно найти на нашем сайте.',
    },
    // Добавьте еще вопросы и ответы по необходимости
  ];

  

const FaqSection = () => {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8  lg:py-10">
        <div className="divide-y divide-gray-900/10">
          <h2 className="text-2xl font-bold leading-10 tracking-tight text-gray-900">Frequently asked questions</h2>
          <dl className="mt-10 space-y-6 divide-y divide-gray-900/10">
            {faqs.map((faq) => (
              <Disclosure as="div" key={faq.question} className="pt-6">
                {({ open }) => (
                  <>
                    <dt>
                      <Disclosure.Button className="flex w-full items-start justify-between text-left text-gray-900">
                        <span className="text-base font-semibold leading-7">{faq.question}</span>
                        <span className="ml-6 flex h-7 items-center">
                          {open ? (
                            <MinusIcon className="h-6 w-6" aria-hidden="true" />
                          ) : (
                            <PlusIcon className="h-6 w-6" aria-hidden="true" />
                          )}
                        </span>
                      </Disclosure.Button>
                    </dt>
                    <Disclosure.Panel as="dd" className="mt-2 pr-12">
                      <p className="text-base leading-7 text-gray-600">{faq.answer}</p>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};

export default FaqSection;
