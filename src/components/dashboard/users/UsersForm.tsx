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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import InputMask from "react-input-mask";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { usersSchema } from "./schema";

type UsersFormValues = z.infer<typeof usersSchema>;

interface UsersFormProps {
  initialValues?: Omit<UsersFormValues, "mode">;
  onSubmit: (values: UsersFormValues) => void;
  isLoading?: boolean;
  mode: "create" | "update";
}

const UsersForm: React.FC<UsersFormProps> = ({
  initialValues = {
    username: "",
    name: "",
    phone: "",
    password: "",
    role: "customer",
    address: "",
  },
  onSubmit,
  isLoading = false,
  mode,
}) => {
  const form = useForm<UsersFormValues>({
    resolver: zodResolver(usersSchema),
    defaultValues: { ...initialValues, mode },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Foydalanuvchi username</FormLabel>
              <FormControl>
                <Input placeholder="username kiriting" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel> Ism va familiya</FormLabel>
              <FormControl>
                <Input placeholder="Ism va familiya kiriting" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Telefon raqamingiz</FormLabel>
              <FormControl>
                <InputMask
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 bg-white"
                  mask="+998 99 999-99-99"
                  maskChar={null}
                  placeholder="+998 XX XXX-XX-XX"
                  value={field.value}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {mode === "update" ? "Parol (ixtiyoriy)" : "Parol"}
              </FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder={
                    mode === "update"
                      ? "Yangi parol kiriting (ixtiyoriy)"
                      : "Parol kiriting"
                  }
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Rol</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="customer" />
                    </FormControl>
                    <FormLabel className="font-normal">Foydalanuvchi</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="restaurant_owner" />
                    </FormControl>
                    <FormLabel className="font-normal">Direktor</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Manzil</FormLabel>
              <FormControl>
                <Input placeholder="Manzil(shart emas)" {...field} />
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

export default UsersForm;
