"use client";

import React from 'react';
import useStore from '../functions/main'; // Assuming this fetches the customer name and credentials
import { FaSignOutAlt } from 'react-icons/fa'; // Icon for logout button


export  function Sidebar () {
  const { state } = useStore();
  const customerName = state.customer?.name || "No Name"; // Placeholder name if customer data is missing
  const customerInitials = customerName
    .split(" ")
    .map((name) => name[0])
    .join("")
    .toUpperCase(); // Create initials from customer name

  const handleLogout = () => {
    // Add your logout logic here
    localStorage.clear();
    window.location.href = "/"
  };

  return (
    <div className="absolute left-0 top-0 h-full w-2/3 bg-gray-800 flex flex-col justify-between p-5 rounded-l-lg shadow-lg">
      
      {/* Logo and Name */}
      <div className="flex flex-col items-center">
        <div className="w-20 h-20 bg-gray-600 text-white flex items-center justify-center rounded-full text-2xl font-bold">
          {customerInitials}
        </div>
        <p className="mt-4 text-white font-semibold text-lg">{customerName}</p>
      </div>
      
      {/* Logout Button */}
      <div className="flex justify-center">
        <button
          className="bg-red-500 text-white px-6 py-2 rounded-full font-semibold flex items-center space-x-2 hover:bg-red-600 transition"
          onClick={handleLogout}
        >
          <FaSignOutAlt className="mr-2" />
          Logout
        </button>
      </div>
    </div>
  );
};

