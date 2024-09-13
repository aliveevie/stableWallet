"use client";

import React, { useState, useEffect } from 'react';
import { FaWallet, FaPaperPlane, FaHistory, FaBars } from 'react-icons/fa';
import { Sidebar } from '@/components/sidebar';

export const Footer = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen); // Toggle the sidebar visibility
  };

  const handleOutsideClick = (event) => {
    const target = event.target;
    if (!target.closest(".sidebar")) {
      setSidebarOpen(false); // Close sidebar if clicking outside of it
    }
  };

  useEffect(() => {
    if (sidebarOpen) {
      document.addEventListener("click", handleOutsideClick);
    } else {
      document.removeEventListener("click", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [sidebarOpen]);

  return (
    <>
      {/* Footer Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-800 p-4 flex justify-around shadow-inner">
        <FaWallet className="text-2xl cursor-pointer text-green-500" />
        <FaPaperPlane className="text-2xl cursor-pointer text-blue-500" />
        <FaHistory className="text-2xl cursor-pointer text-yellow-500" />
        <FaBars 
          className="text-2xl cursor-pointer text-gray-400" 
          onClick={handleSidebarToggle} 
        />
      </div>

      {/* Sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50">
          <Sidebar />
        </div>
      )}
    </>
  );
};
