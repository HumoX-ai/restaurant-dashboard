import React, { useEffect, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../../ui/input";
import { Textarea } from "../../ui/textarea";
import { Button } from "../../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import axios from "axios";
import { restaurantSchema } from "./schema";

interface User {
  _id: string;
  name: string;
  phone: string;
  role: string;
}

interface RestaurantFormProps {
  initialValues?: z.infer<typeof restaurantSchema>;
  onSubmit: (values: z.infer<typeof restaurantSchema>) => void;
  isLoading?: boolean;
  mode: "create" | "update";
}

const RestaurantForm: React.FC<RestaurantFormProps> = ({
  initialValues = {
    name: "",
    owner_id: "",
    location: "",
    description: "",
    open_hours: "",
  },
  onSubmit,
  isLoading = false,
  mode,
}) => {
  const [users, setUsers] = useState<User[]>([]);
  const form = useForm<z.infer<typeof restaurantSchema>>({
    resolver: zodResolver(restaurantSchema),
    defaultValues: initialValues,
  });

  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/users`).then((res) => {
      setUsers(res.data.data);
    });
  }, []);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Restoran nomi</FormLabel>
              <FormControl>
                <Input placeholder="Restoran nomini kiriting" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="owner_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Restoran egasi</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Restoran egasini tanlang" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {users
                    .filter((user) => user.role === "restaurant_owner")
                    .map((user) => (
                      <SelectItem key={user._id} value={user._id}>
                        {user.name} - {user.phone}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Manzil</FormLabel>
              <FormControl>
                <Input placeholder="Restoran manzilini kiriting" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tavsif</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Restoran haqida qisqacha ma'lumot"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="open_hours"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ish vaqti</FormLabel>
              <FormControl>
                <Input placeholder="Masalan: 09:00 - 22:00" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading}>
          {mode === "create" ? "Saqlash" : "Yangilash"}
        </Button>
      </form>
    </Form>
  );
};

export default RestaurantForm;
