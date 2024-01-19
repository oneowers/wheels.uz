import { PhoneIcon, BellSlashIcon, CurrencyDollarIcon, TruckIcon, TagIcon, ShieldCheckIcon, Bars3Icon, ArrowPathIcon } from '@heroicons/react/24/outline';

const App = () => {
  return (
    <div className="p-8 mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 lg:py-10">
      <h1 className="text-3xl font-bold mb-6">Добро пожаловать в HiMarket - твой лучший выбор гаджетов!</h1>

      <p className="text-lg mb-6">HiMarket - это крупнейший интернет-магазин гаджетов в Узбекистане. Мы специализируемся на продаже телефонов, планшетов и других устройств от ведущих производителей, таких как Apple, Samsung и Xiaomi.</p>

      <p className="text-lg mb-6">Почему выбирают нас:</p>

      <ul className="list-disc pl-6 mb-6">
        <li className="mb-2 flex items-center"><PhoneIcon className="w-5 h-5 mr-2" /> Широкий ассортимент продукции от лучших производителей гаджетов.</li>
        <li className="mb-2 flex items-center"><ShieldCheckIcon className="w-5 h-5 mr-2" /> Гарантированное оригинальное качество от дистрибьютора Apple и других брендов.</li>
        <li className="mb-2 flex items-center"><CurrencyDollarIcon className="w-5 h-5 mr-2" /> Минимальные цены на телефоны и другие гаджеты без посредников.</li>
        <li className="mb-2 flex items-center"><BellSlashIcon className="w-5 h-5 mr-2" /> Возможность покупки в рассрочку на срок до 12 месяцев.</li>
        <li className="mb-2 flex items-center"><TruckIcon className="w-5 h-5 mr-2" /> Бесплатная доставка по всей территории Узбекистана.</li>
        <li className="mb-2 flex items-center"><TagIcon className="w-5 h-5 mr-2" /> Регулярные акции и скидки на продукцию в нашем каталоге.</li>
        <li className="mb-2 flex items-center"><Bars3Icon className="w-5 h-5 mr-2" /> Гарантийное обслуживание в нашем собственном сервис-центре.</li>
        <li className="mb-2 flex items-center"><ArrowPathIcon className="w-5 h-5 mr-2" /> Услуга Trade-in для обмена старых телефонов на новые модели.</li>
      </ul>

      <p className="text-lg mb-6">Наши консультанты всегда готовы помочь. Свяжитесь с нами по телефону или в Телеграм, и мы ответим на все ваши вопросы, поможем с выбором и заказом.</p>

      <p className="text-lg">Сделайте свою жизнь ярче с гаджетами от HiMarket!</p>
    </div>
  );
}

export default App;
