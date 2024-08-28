"use client";
import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import SkeletonLoader from "@/components/skleton/RestaurantsLoading";
import RestaurantsList from "@/components/dashboard/RestaurantsList";
import { fetchRestaurants } from "@/store/restaurantsSlice";
import AddRestaurantButton from "@/components/dashboard/AddRestaurantButton";

const RestaurantsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const {
    list: restaurants,
    status,
    error,
  } = useAppSelector((state) => state.restaurants);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchRestaurants());
    }
  }, [status, dispatch]);

  return (
    <div className="p-4 lg:ml-64">
      <div className="block lg:flex justify-between mb-10 lg:mb-0">
        <div>
          <h1 className="text-3xl font-bold mb-4">Restoranlar</h1>
          <p className="mb-8">Bu yerda restoranlar haqida malumotlar boladi.</p>
        </div>
        <AddRestaurantButton />
      </div>
      {status === "loading" ? (
        <SkeletonLoader />
      ) : status === "failed" ? (
        <div>Error: {error}</div>
      ) : (
        <RestaurantsList restaurants={restaurants} />
      )}
    </div>
  );
};

export default RestaurantsPage;
