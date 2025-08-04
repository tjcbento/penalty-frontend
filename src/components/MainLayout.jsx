import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";

export default function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <main className="flex-grow flex flex-col items-center justify-start p-6">
        <div className="w-full max-w-4xl space-y-10">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
