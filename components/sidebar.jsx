import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaWallet, FaPaperPlane, FaHistory, FaBars, FaHeadset } from 'react-icons/fa';


export const Sidebar = () => {
    const [hovered, setHovered] = useState(null);
    const router = useRouter(); // For navigation
  
    const menuItems = [
      { name: 'Wallet', icon: <FaWallet />, path: '/wallet' },
      { name: 'Send', icon: <FaPaperPlane />, path: '/send' },
      { name: 'History', icon: <FaHistory />, path: '/transactions' },
      { name: 'Support', icon: <FaHeadset />, path: '/support' },
    ];
  
    const handleNavigation = (path) => {
      router.push(path); // Navigate to the respective path
    };
  
    return (
      <div className="fixed top-0 left-0 h-full w-2/3 bg-gray-900 p-6 shadow-lg flex flex-col items-start sidebar">
        <div className="flex flex-col items-center mb-12">
          {/* Customer Initials */}
          <div className="bg-blue-500 rounded-full w-16 h-16 flex items-center justify-center text-2xl text-white mb-2">
            S.W
          </div>
          <p className="text-white font-bold text-xl">No Name</p>
        </div>
  
        {/* Menu Items */}
        <ul className="space-y-6 w-full">
          {menuItems.map((item, index) => (
            <li
              key={index}
              className="flex items-center space-x-4 cursor-pointer"
              onMouseEnter={() => setHovered(index)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => handleNavigation(item.path)}
            >
              <span className="text-white text-2xl">{item.icon}</span>
              <span className={`text-white font-semibold transition-all duration-300 ${hovered === index ? 'opacity-100 ml-2' : 'opacity-0 ml-0'}`}>
                {item.name}
              </span>
            </li>
          ))}
        </ul>
  
        {/* Logout Button */}
        <div className="mt-auto w-full flex justify-center">
          <button className="bg-red-500 text-white py-2 px-6 rounded-md w-full font-semibold hover:bg-red-600 transition duration-300">
            Logout
          </button>
        </div>
      </div>
    );
  };
  
  