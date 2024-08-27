"use client";
import { IMenu, IMenuItem } from "@/models/Menu";

const RestaurantMenus = ({ menus }: { menus: IMenu }) => {
  console.log(menus);

  return (
    <div className="p-4 lg:ml-64">
      <h1 className="text-3xl font-bold mb-4">Menular</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {menus?.items?.map((menu: IMenuItem) => (
          <div
            key={menu.name}
            className="bg-white border border-gray-300 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-800">
                {menu.name}
              </h2>
              <p className="mt-2 text-gray-600">{menu.description}</p>
              <p className="mt-2 text-gray-800 font-bold">
                {menu.price.toFixed(0)} so&#39;m
              </p>
              {menu.available ? (
                <span className="inline-block mt-2 px-2 py-1 text-sm font-semibold text-green-800 bg-green-200 rounded-full">
                  Mavjud
                </span>
              ) : (
                <span className="inline-block mt-2 px-2 py-1 text-sm font-semibold text-red-800 bg-red-200 rounded-full">
                  Mavjud emas
                </span>
              )}
            </div>
            <div className="bg-gray-100 p-4 rounded-b-lg">
              <button className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-300">
                Batafsil
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RestaurantMenus;
