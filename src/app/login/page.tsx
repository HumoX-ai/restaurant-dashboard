"use client";
import Image from "next/image";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import InputMask from "react-input-mask";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { LoginSchema } from "./schema";
import Cookies from "js-cookie";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  // 1. Define your form.
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      phone: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof LoginSchema>) {
    setIsLoading(true);
    axios
      .post("/api/auth/login", values)
      .then((response) => {
        if (response.data.success) {
          Cookies.set("token", response.data.token);

          if (response.data.user.role === "admin") {
            router.push("/dashboard");
          } else if (response.data.user.role === "customer") {
            router.push("/home");
          } else {
            router.push("/restaurant");
          }
        } else {
          // Xatolik yuz bersa, uni ko'rsatish
          console.error("Xatolik yuz berdi:", response.data.error);
          toast({
            title: "Xatolik yuz berdi",
            description: response.data,
            variant: "destructive",
          });
        }
      })
      .catch((error) => {
        console.error("Xatolik yuz berdi:", error);
        toast({
          title: "Xatolik yuz berdi",
          description: error.response.data.error,
          variant: "destructive",
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  }
  return (
    <div className="h-full lg:h-screen py-4 items-center grid grid-cols-1 lg:grid-cols-2 px-8 bg-gradient-to-br from-orange-100 to-red-50">
      <div className="place-self-center">
        <Image src="/login.png" alt="login" width={800} height={800} />
      </div>
      <div className="place-self-center justify-self-center max-w-96 w-full flex flex-col justify-center px-4 py-8 bg-white rounded-lg shadow-xl">
        <h2 className="text-3xl text-center font-bold mb-6 text-orange-600">
          Xush kelibsiz!
        </h2>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 text-black"
          >
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-orange-700">
                    Telefon raqamingiz
                  </FormLabel>
                  <FormControl>
                    <InputMask
                      className="border-orange-300 focus:border-orange-500 focus:ring-orange-500 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 bg-white"
                      mask="+999 99 999-99-99"
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
                  <FormLabel className="text-orange-700">Parol</FormLabel>
                  <FormControl>
                    <Input
                      className="border-orange-300 focus:border-orange-500 focus:ring-orange-500 bg-white"
                      type="password"
                      placeholder="Parol kiriting"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            <p className="text-xs">
              Hisob mavjud emasmi? Unda{" "}
              <span
                onClick={() => router.push("/register")}
                className="text-orange-600 cursor-pointer"
              >
                ro&#39;yxatdan o&#39;tish
              </span>
              ni bosing
            </p>
            <Button
              className="w-full bg-gradient-to-r from-orange-400 to-red-500 hover:from-orange-500 hover:to-red-600 text-white font-bold py-3 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Yuklanmoqda..." : "Kirish"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Login;
