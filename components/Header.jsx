"use client";
import React, { useState, useEffect } from 'react';
import { FaBars, FaHome } from 'react-icons/fa';
import { Sidebar } from './sidebar';
import Link from 'next/link';

const Header = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleOutsideClick = (event) => {
    if (!event.target.closest('.sidebar') && !event.target.closest('.menu-button')) {
      setSidebarOpen(false);
    }
  };

  useEffect(() => {
    if (sidebarOpen) {
      document.addEventListener('click', handleOutsideClick);
    } else {
      document.removeEventListener('click', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [sidebarOpen]);

  return (
    <>

<header className="flex justify-between items-center p-4 bg-gray-800 fixed top-0 left-0 right-0 z-10">    {/* Hamburger Menu Icon to toggle sidebar */}
        <FaBars
          className="w-6 h-6 text-white cursor-pointer menu-button"
          onClick={handleSidebarToggle}
        />
        
        {/* Home Icon */}
        <div className="flex items-center space-x-2">
          <Link href="/pages/home">
            <FaHome className="text-white w-6 h-6 cursor-pointer" />
          </Link>
        </div>
      </header>

      {/* Sidebar */}
      {sidebarOpen && <Sidebar onClose={handleSidebarToggle} />}
    </>
  );
};

export default Header;
