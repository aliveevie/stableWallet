"use client";

import React, { useState, useEffect } from 'react';
import { FaHome, FaPaperPlane, FaHistory, FaBars, FaHeadset } from 'react-icons/fa';
import { useRouter } from 'next/navigation'; // For navigation
import { Sidebar } from '@/components/sidebar';
import Link from 'next/link';

export const Footer = () => {


const [sidebarOpen, setSidebarOpen] = useState(false);
  const [hovered, setHovered] = useState(null); // State to track which icon is being hovered

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen); // Toggle the sidebar visibility
  };

  const handleOutsideClick = (event) => {
    if (sidebarOpen && !event.target.closest('.sidebar')) {
      setSidebarOpen(false); // Close the sidebar if clicking outside of it
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
      {/* Footer Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-800 p-4 flex justify-around shadow-inner">
        {/* Home Icon */}
        <div className="relative group">
          <Link href="/pages/home">
            <FaHome
              className="text-2xl cursor-pointer text-green-500"
              onMouseEnter={() => setHovered('Home')}
              onMouseLeave={() => setHovered(null)}
            />
          </Link>
          {hovered === 'Home' && (
            <div className="absolute bottom-10 text-sm bg-gray-900 text-white py-1 px-2 rounded">
              Home
            </div>
          )}
        </div>

        {/* Send Icon */}
        <div className="relative group">
          <Link href="/pages/send">
            <FaPaperPlane
              className="text-2xl cursor-pointer text-blue-500"
              onMouseEnter={() => setHovered('Send')}
              onMouseLeave={() => setHovered(null)}
            />
          </Link>
          {hovered === 'Send' && (
            <div className="absolute bottom-10 text-sm bg-gray-900 text-white py-1 px-2 rounded">
              Send
            </div>
          )}
        </div>

        {/* History Icon */}
        <div className="relative group">
          <Link href="/pages/transactions">
            <FaHistory
              className="text-2xl cursor-pointer text-yellow-500"
              onMouseEnter={() => setHovered('History')}
              onMouseLeave={() => setHovered(null)}
            />
          </Link>
          {hovered === 'History' && (
            <div className="absolute bottom-10 text-sm bg-gray-900 text-white py-1 px-2 rounded">
              History
            </div>
          )}
        </div>

        <div className="relative group">
          <Link href="/pages/support">
            <FaHeadset
              className="text-2xl cursor-pointer text-yellow-500"
              onMouseEnter={() => setHovered('Support')}
              onMouseLeave={() => setHovered(null)}
            />
          </Link>
          {hovered === 'Support' && (
            <div className="absolute bottom-10 text-sm bg-gray-900 text-white py-1 px-2 rounded">
              Support
            </div>
          )}
        </div>

        {/* Sidebar Toggle Icon */}
        <div className="relative group">
          <FaBars
            className="text-2xl cursor-pointer text-gray-400"
            onClick={handleSidebarToggle}
            onMouseEnter={() => setHovered('Menu')}
            onMouseLeave={() => setHovered(null)}
          />
          {hovered === 'Menu' && (
            <div className="absolute bottom-10 text-sm bg-gray-900 text-white py-1 px-2 rounded">
              Menu
            </div>
          )}
        </div>

        

      </div>

      {/* Sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50">
          <Sidebar onClose={() => setSidebarOpen(false)} />
        </div>
      )}
    </>
  );
};

