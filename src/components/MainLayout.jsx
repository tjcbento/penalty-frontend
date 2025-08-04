import React from "react";
import Header from "../components/Header";

export default function MainLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <main className="flex-grow flex flex-col items-center justify-start p-6">
        {/* This container constrains width and centers content */}
        <div className="w-full max-w-4xl space-y-10">{children}</div>
      </main>
    </div>
  );
}
