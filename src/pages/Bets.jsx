import React from "react";

export default function ComingSoon() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 p-8">
      <h1 className="text-5xl font-extrabold text-gray-800 mb-6">Coming Soon</h1>
      <p className="text-gray-600 mb-12 text-center max-w-md">
        We're hard at work bringing something awesome your way. Stay tuned!
      </p>
      <div className="w-64 h-64">
        {/* SVG cartoonish animal working */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 64 64"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-full h-full text-purple-700"
        >
          {/* Head */}
          <circle cx="32" cy="20" r="12" fill="#fbbf24" stroke="#b45309" />
          {/* Eyes */}
          <circle cx="26" cy="18" r="3" fill="#fff" />
          <circle cx="38" cy="18" r="3" fill="#fff" />
          <circle cx="26" cy="18" r="1" fill="#000" />
          <circle cx="38" cy="18" r="1" fill="#000" />
          {/* Mouth */}
          <path d="M24 28 Q32 36 40 28" stroke="#b45309" strokeWidth="2" fill="none" />
          {/* Body */}
          <ellipse cx="32" cy="46" rx="20" ry="16" fill="#fde68a" stroke="#b45309" />
          {/* Arms working on laptop */}
          <rect x="14" y="38" width="8" height="8" fill="#fbbf24" stroke="#b45309" />
          <rect x="42" y="38" width="8" height="8" fill="#fbbf24" stroke="#b45309" />
          {/* Laptop */}
          <rect x="22" y="44" width="20" height="8" fill="#4c1d95" rx="2" ry="2" />
          <rect x="24" y="46" width="16" height="4" fill="#7c3aed" />
          {/* Desk */}
          <rect x="8" y="52" width="48" height="6" fill="#6b7280" rx="1" ry="1" />
        </svg>
      </div>
    </div>
  );
}
