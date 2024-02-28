// YandexMapComponent.js
import React, { useEffect, useState } from "react";
import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";

const YandexMapComponent = ({ setLocationParent, setAddressParent }) => {
  const [address, setAddress] = useState([]);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    const getLocation = async () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setLocation({ latitude, longitude });
            setLocationParent({ latitude, longitude });
          },
          (error) => {
            console.error("Error getting geolocation:", error);
          }
        );
      } else {
        console.error("Geolocation is not supported by your browser.");
      }
    };

    getLocation();
  }, []);

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        if (location && location.latitude && location.longitude) {
          const response = await fetch(
            `https://geocode-maps.yandex.ru/1.x/?format=json&apikey=128517410f-40c6-4c76-bd00-b686bbc252db&geocode=${location.longitude},${location.latitude}`
          );

          const data = await response.json();

          const featureMember =
            data.response.GeoObjectCollection.featureMember[0];

          if (featureMember) {
            const foundAddress =
              featureMember.GeoObject.metaDataProperty.GeocoderMetaData.text;
            const parts = foundAddress.split(",");
            const formattedParts = parts.map((part) => part.trim());
            setAddress(formattedParts);
            setAddressParent(formattedParts);
          }
        }
      } catch (error) {
        console.error("Error fetching address:", error);
      }
    };

    // Fetch the address only on component mount
    fetchAddress();
  }, []);

  return (
    <div>
      {address}
      {location ? (
        <YMaps>
          <Map
            defaultState={{
              center: [location.latitude, location.longitude],
              zoom: 15,
            }}
            width="100%"
            height="200px"
          >
            <Placemark geometry={[location.latitude, location.longitude]} />
          </Map>
        </YMaps>
      ) : (
        <p>Getting geolocation...</p>
      )}

      <div className="grid max-w-2xl gap-x-6 gap-y-4 mt-4 grid-cols-2">
        <div className="">
          <label
            htmlFor="city"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Город
          </label>
          <div className="mt-2">
            <input
              type="text"
              name="city"
              id="city"
              value={address[0]}
              onChange={(e) => {
                setAddress([
                  e.target.value,
                  address[1],
                  address[2],
                  address[3],
                ]);
                setAddressParent([
                  e.target.value,
                  address[1],
                  address[2],
                  address[3],
                ]);
              }}
              autoComplete="address-level2"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div className="">
          <label
            htmlFor="region"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Район
          </label>
          <div className="mt-2">
            <input
              type="text"
              name="region"
              id="region"
              value={address[1]}
              onChange={(e) => {
                setAddress([
                  address[0],
                  e.target.value,
                  address[2],
                  address[3],
                ]);
                setAddressParent([
                  address[0],
                  e.target.value,
                  address[2],
                  address[3],
                ]);
              }}
              autoComplete="address-level1"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div className="">
          <label
            htmlFor="postal-code"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Адресс
          </label>
          <div className="mt-2">
            <input
              type="text"
              name="postal-code"
              id="postal-code"
              value={address[2]}
              onChange={(e) => {
                setAddress([
                  address[0],
                  address[1],
                  e.target.value,
                  address[3],
                ]);
                setAddressParent([
                  address[0],
                  address[1],
                  e.target.value,
                  address[3],
                ]);
              }}
              autoComplete="postal-code"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div className="">
          <label
            htmlFor="postal-code"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Дом / Квартира
          </label>
          <div className="mt-2">
            <input
              type="text"
              name="postal-code"
              id="postal-code"
              value={address[3]}
              onChange={(e) => {
                setAddress([
                  address[0],
                  address[1],
                  address[2],
                  e.target.value,
                ]);
                setAddressParent([
                  address[0],
                  address[1],
                  address[2],
                  e.target.value,
                ]);
              }}
              autoComplete="postal-code"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default YandexMapComponent;
