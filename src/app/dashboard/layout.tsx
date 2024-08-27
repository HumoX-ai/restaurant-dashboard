import React from "react";
import Sidebar from "../../components/dashboard/Sidebar";
import AuthLayout from "@/components/AuthLayout";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthLayout>
      <div className="flex flex-col h-screen">
        <Sidebar />
        <main className="flex-1 min-h-screen p-4 ">{children}</main>
      </div>
    </AuthLayout>
  );
};

export default DashboardLayout;
