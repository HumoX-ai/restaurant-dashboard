import SkeletonLoader from "@/components/skleton/RestaurantsLoading";
import RestaurantsList from "@/components/dashboard/RestaurantsList";
import { getAllRestaurants } from "@/lib/data";
import { Suspense } from "react";

export default async function RestaurantsPage() {
  const restaurants = await getAllRestaurants();
  return (
    <div className="p-4 lg:ml-64">
      <h1 className="text-3xl font-bold mb-4">Restoranlar</h1>
      <p className="mb-8">Bu yerda restoranlar haqida malumotlar boladi.</p>

      <Suspense fallback={<SkeletonLoader />}>
        <RestaurantsList restaurants={restaurants} />
      </Suspense>
    </div>
  );
}
