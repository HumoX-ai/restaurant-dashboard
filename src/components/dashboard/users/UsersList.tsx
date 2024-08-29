import { useAppDispatch } from "@/store/hooks";
import { deleteUsers, updateUsers, Users } from "@/store/usersSlice";
import { Edit, Trash2 } from "lucide-react";
import React, { useCallback, useState } from "react";
import { usersSchema } from "./schema";
import { z } from "zod";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import UsersForm from "./UsersForm";

const UsersList = ({ user }: { user: Users }) => {
  const dispatch = useAppDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = useCallback(
    async (id: string) => {
      setIsLoading(true);
      try {
        await dispatch(deleteUsers(id)).unwrap();
        setIsLoading(false);
      } catch (error) {
        console.error("Foydalanuvchini o'chirishda xatolik yuz berdi:", error);
        setIsLoading(false);
      }
    },
    [dispatch]
  );

  const handleUpdate = (values: z.infer<typeof usersSchema>) => {
    setIsLoading(true);
    dispatch(updateUsers({ ...values, _id: user._id }))
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

  return (
    <div>
      <ul>
        <li
          key={user._id}
          className="shadow rounded-lg p-4 bg-[#ffa07a] relative"
        >
          <div className="absolute top-2 right-2 flex space-x-2">
            <button
              onClick={() => setIsEditing(true)} // Open the edit modal
              className="text-gray-500 hover:text-blue-500 transition-colors duration-300"
            >
              <Edit size={20} />
            </button>
            <button
              onClick={() => handleDelete(user._id)}
              className="text-gray-500 hover:text-red-500 transition-colors duration-300"
            >
              <Trash2 size={20} />
            </button>
          </div>
          <h3 className="font-bold">{user.name}</h3>
          <p>{user.phone}</p>
          <p>{user.role}</p>
          <p>{new Date(user.createdAt).toLocaleString()}</p>
        </li>
      </ul>
      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent>
          <DialogTitle>Foydalanuvchini tahrirlash</DialogTitle>
          <UsersForm
            initialValues={{
              username: user.username,
              name: user.name,
              phone: user.phone,
              password: "",
              role: user.role,
              address: user.address,
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

export default UsersList;
