"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useAppDispatch } from "@/store/hooks";
import { fetchUsers } from "@/store/usersSlice";

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [isDirector, setIsDirector] = useState(false);
  const [isCustomer, setIsCustomer] = useState(false);

  // Initialize state based on search params
  useEffect(() => {
    setName(searchParams.get("name") || "");
    setPhone(searchParams.get("phone") || "");
    setIsDirector(
      searchParams.get("roles")?.includes("restaurant_owner") || false
    );
    setIsCustomer(searchParams.get("roles")?.includes("customer") || false);
  }, [searchParams]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const roles = [];
    if (isDirector) roles.push("restaurant_owner");
    if (isCustomer) roles.push("customer");

    const query = new URLSearchParams();
    if (name) query.set("name", name);
    if (phone) query.set("phone", phone);
    if (roles.length > 0) query.set("roles", roles.join(","));

    const queryString = query.toString();

    // Query stringni URL manziliga o'tkazish
    router.push(`/dashboard/users?${queryString}`);

    // Ma'lumotlarni darhol yangilash
    await dispatch(fetchUsers(queryString));
  };

  return (
    <Card className="max-w-md bg-[#00ced1] mx-auto p-4 shadow-lg mb-10">
      <CardHeader>
        <CardTitle>Foydalanuvchi qidirish</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSearch} className="space-y-4">
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ism bo'yicha qidirish..."
            className="w-full"
          />
          <Input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Telefon raqami bo'yicha qidirish..."
            className="w-full"
          />
          <div className="flex space-x-4">
            <label className="flex items-center space-x-2">
              <Checkbox
                checked={isDirector}
                onCheckedChange={(checked) => setIsDirector(checked as boolean)}
              />
              <span>Direktor</span>
            </label>
            <label className="flex items-center space-x-2">
              <Checkbox
                checked={isCustomer}
                onCheckedChange={(checked) => setIsCustomer(checked as boolean)}
              />
              <span>Mijoz</span>
            </label>
          </div>
          <Button type="submit" className="w-full">
            Qidirish
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
