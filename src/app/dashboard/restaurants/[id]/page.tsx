import { Button } from "@/components/ui/button";
import { getRestaurantById } from "@/lib/data";
import { IRestaurant } from "@/models/Restaurant";
import Link from "next/link";
import React from "react";

export default async function Restaurant({
  params,
}: {
  params: { id: string };
}) {
  const restaurantId = params.id;
  const restaurant: IRestaurant = await getRestaurantById(restaurantId);
  return (
    <div className="p-4 lg:ml-64">
      <h1 className="text-3xl font-bold mb-4">{restaurant.name}</h1>
      <p className="mb-8">{restaurant.description}</p>
      <Link href={`/dashboard/restaurants/${restaurantId}/menus`}>
        <Button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Menular
        </Button>
      </Link>
    </div>
  );
}
