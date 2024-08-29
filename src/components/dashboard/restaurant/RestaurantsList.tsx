// components/RestaurantsList.tsx
import React from "react";
import RestaurantCard from "./RestaurantCard";

interface RestaurantsListProps {
  restaurants: Array<{
    _id: string;
    name: string;
    owner_id: string;
    description: string;
    location: string;
    open_hours: string;
  }>;
}

const RestaurantsList: React.FC<RestaurantsListProps> = ({ restaurants }) => {
  if (restaurants.length === 0) {
    return (
      <p className="col-span-full text-center text-gray-500">
        Restoranlar topilmadi.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-6 items-stretch">
      {restaurants.map((restaurant) => (
        <RestaurantCard key={restaurant._id} restaurant={restaurant} />
      ))}
    </div>
  );
};

export default RestaurantsList;
