"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const verifyToken = async () => {
      const token = Cookies.get("token");
      if (!token) {
        router.push("/login");
        return;
      }

      try {
        const response = await fetch("/api/auth/verify-token", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }),
        });

        if (response.ok) {
          const data = await response.json();
          if (data.valid) {
            setIsAuthenticated(true);
          } else {
            Cookies.remove("token");
            router.push("/login");
          }
        } else {
          Cookies.remove("token");
          router.push("/login");
        }
      } catch (error) {
        console.error("Token tekshirishda xato:", error);
        Cookies.remove("token");
        router.push("/login");
      }
    };

    verifyToken();
  }, [router]);

  if (!isAuthenticated) {
    return null; // Yoki loading ko'rsatish komponenti
  }

  return <main>{children}</main>;
};

export default AuthLayout;
