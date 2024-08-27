"use client";
import { useRouter } from "next/navigation";
import React from "react";

interface RestaurantCardProps {
  restaurant: {
    _id: string;
    name: string;
    description: string;
    location: string;
    open_hours: string;
  };
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant }) => {
  const route = useRouter();
  return (
    <div className="bg-white border border-gray-300 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-800">
          {restaurant.name}
        </h2>
        <p className="mt-2 text-gray-600">{restaurant.description}</p>
        <p className="mt-1 text-gray-500">{restaurant.location}</p>
        <p className="mt-1 text-gray-500">{restaurant.open_hours}</p>
      </div>
      <div className="bg-gray-100 p-4 rounded-b-lg">
        <button
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-300"
          onClick={() => route.push(`/dashboard/restaurants/${restaurant._id}`)}
        >
          Batafsil
        </button>
      </div>
    </div>
  );
};

export default RestaurantCard;
