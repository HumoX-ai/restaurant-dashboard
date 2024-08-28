"use client";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { useAppDispatch } from "@/store/hooks";
import { deleteRestaurant, updateRestaurant } from "@/store/restaurantsSlice";
import { Trash2, Edit } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import RestaurantForm from "./RestaurantForm";
import { restaurantSchema } from "./schema";

interface RestaurantCardProps {
  restaurant: {
    _id: string;
    name: string;
    owner_id: string;
    description: string;
    location: string;
    open_hours: string;
  };
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant }) => {
  const route = useRouter();
  const dispatch = useAppDispatch();
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false); // State for managing the edit modal visibility
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await dispatch(deleteRestaurant(restaurant._id)).unwrap();
    } catch (error) {
      console.error("Restoranni o'chirishda xatolik yuz berdi:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleUpdate = (values: z.infer<typeof restaurantSchema>) => {
    setIsLoading(true);
    dispatch(
      updateRestaurant({
        ...values,
        _id: restaurant._id,
      })
    )
      .unwrap()
      .then(() => {
        setIsEditing(false);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  if (isDeleting) {
    return (
      <div className="border border-gray-300 rounded-lg shadow-md flex justify-center items-center h-64">
        <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-300 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col justify-between relative">
      <div className="absolute top-2 right-2 flex space-x-2">
        <button
          onClick={() => setIsEditing(true)} // Open the edit modal
          className="text-gray-500 hover:text-blue-500 transition-colors duration-300"
        >
          <Edit size={20} />
        </button>
        <button
          onDoubleClick={handleDelete}
          className="text-gray-500 hover:text-red-500 transition-colors duration-300"
        >
          <Trash2 size={20} />
        </button>
      </div>
      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-800">
          {restaurant.name}
        </h2>
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

      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent>
          <DialogTitle>Restoranni tahrirlash</DialogTitle>
          <RestaurantForm
            initialValues={{
              name: restaurant.name,
              owner_id: restaurant.owner_id,
              location: restaurant.location,
              description: restaurant.description,
              open_hours: restaurant.open_hours,
            }}
            onSubmit={handleUpdate}
            isLoading={isLoading}
            mode="update"
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RestaurantCard;
