import { useAppDispatch } from "@/store/hooks";
import { addRestaurant } from "@/store/restaurantsSlice";
import { useState } from "react";
import { z } from "zod";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import RestaurantForm from "./RestaurantForm";
import { restaurantSchema } from "./schema";

const AddRestaurantButton = () => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleCreate = (values: z.infer<typeof restaurantSchema>) => {
    setIsLoading(true);
    const restaurantData = {
      ...values,
      location: values.location || "",
    };

    dispatch(addRestaurant(restaurantData))
      .unwrap()
      .then(() => {
        setOpen(false);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div>
      <Button onClick={() => setOpen(true)}>Restoran qo&#39;shish</Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogTitle>Yangi restoran qo&#39;shish</DialogTitle>
          <RestaurantForm
            onSubmit={handleCreate}
            isLoading={isLoading}
            mode="create"
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddRestaurantButton;
