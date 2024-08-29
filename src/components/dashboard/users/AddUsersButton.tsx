"use client";
import { useAppDispatch } from "@/store/hooks";
import { addRestaurant } from "@/store/restaurantsSlice";
import { useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { usersSchema } from "./schema";
import UsersForm from "./UsersForm";
import { addUsers } from "@/store/usersSlice";

const AddUsersButton = () => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleCreate = (values: z.infer<typeof usersSchema>) => {
    setIsLoading(true);
    const usersData = {
      ...values,
      createdAt: new Date().toISOString(),
    };

    dispatch(addUsers(usersData))
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
      <Button onClick={() => setOpen(true)}>Foydalanuvchi qo&#39;shish</Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogTitle>Yangi foydalanuvchi qo&#39;shish</DialogTitle>
          <UsersForm
            onSubmit={handleCreate}
            isLoading={isLoading}
            mode="create"
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddUsersButton;
