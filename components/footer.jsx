import React from 'react';
import { FaWallet, FaPaperPlane, FaHistory, FaBars } from 'react-icons/fa';

export const Footer = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-800 p-4 flex justify-around shadow-inner">
      <FaWallet className="text-2xl cursor-pointer text-green-500" />
      <FaPaperPlane className="text-2xl cursor-pointer text-blue-500" />
      <FaHistory className="text-2xl cursor-pointer text-yellow-500" />
      <FaBars className="text-2xl cursor-pointer text-gray-400" />
    </div>
  );
};

